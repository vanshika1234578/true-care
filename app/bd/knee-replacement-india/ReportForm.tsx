"use client";

import { useRef, useState, FormEvent } from "react";
import { upload } from "@vercel/blob/client";
import { Loader2, CheckCircle2, AlertCircle, Upload, X, FileText, CheckCircle } from "lucide-react";
import Button from "@/components/Button";
import type { Lang } from "./content";
import { content } from "./content";

type Status = "idle" | "uploading" | "submitting" | "success" | "error";
type FileState = {
  file: File;
  progress: number; // 0–100
  url: string | null;
  error: string | null;
};

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 50;
const ACCEPTED_TYPES =
  ".pdf,.jpg,.jpeg,.png,.webp,.heic,.heif,.tiff,.tif,.doc,.docx,.xls,.xlsx";

export default function ReportForm({
  lang,
  whatsappNumber,
  onDetectBangladeshNumber,
}: {
  lang: Lang;
  whatsappNumber: string;
  onDetectBangladeshNumber?: () => void;
}) {
  const t = content[lang].reportForm;
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [condition, setCondition] = useState("");
  const [timeline, setTimeline] = useState("");
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleWhatsappChange = (value: string) => {
    setWhatsapp(value);
    // Free, instant detection based on the number's calling code — no external
    // service involved. Bangladesh's country calling code is 880.
    const digitsOnly = value.replace(/[^\d]/g, "");
    const looksLikeBangladesh =
      value.trim().startsWith("+880") || (!value.trim().startsWith("+") && digitsOnly.startsWith("880"));
    if (looksLikeBangladesh) {
      onDetectBangladeshNumber?.();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const combined = [...fileStates, ...selected.map((file) => ({ file, progress: 0, url: null, error: null }))].slice(
      0,
      MAX_FILES
    );
    setFileStates(combined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFileStates((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = t.errors.name;
    if (!whatsapp.trim()) errs.whatsapp = t.errors.whatsapp;
    if (!condition.trim()) errs.condition = t.errors.condition;
    for (const fs of fileStates) {
      if (fs.file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        errs.files = t.errors.fileSize.replace("{name}", fs.file.name);
      }
    }
    return errs;
  };

  const uploadAllFiles = async (): Promise<string[]> => {
    const urls: string[] = [];
    for (let i = 0; i < fileStates.length; i++) {
      const fs = fileStates[i];
      if (fs.url) {
        urls.push(fs.url);
        continue;
      }
      try {
        const blob = await upload(fs.file.name, fs.file, {
          access: "public",
          handleUploadUrl: "/api/report-upload",
          onUploadProgress: ({ percentage }) => {
            setFileStates((prev) => {
              const next = [...prev];
              if (next[i]) next[i] = { ...next[i], progress: percentage };
              return next;
            });
          },
        });
        setFileStates((prev) => {
          const next = [...prev];
          if (next[i]) next[i] = { ...next[i], progress: 100, url: blob.url };
          return next;
        });
        urls.push(blob.url);
      } catch (err) {
        const message = err instanceof Error ? err.message : t.errors.uploadFailed;
        setFileStates((prev) => {
          const next = [...prev];
          if (next[i]) next[i] = { ...next[i], error: message };
          return next;
        });
        throw new Error(t.errors.uploadFailed.replace("{name}", fs.file.name));
      }
    }
    return urls;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setError(null);

    try {
      let reportUrls: string[] = [];
      if (fileStates.length > 0) {
        setStatus("uploading");
        reportUrls = await uploadAllFiles();
      }

      setStatus("submitting");

      const res = await fetch("/api/report-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsapp,
          email,
          age,
          condition,
          timeline,
          country: "Bangladesh",
          source: "knee-replacement-india-bd",
          reportUrls,
          lang,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? t.errors.generic);
      }

      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({ event: "report_form_submitted" });
        (window as any).dataLayer.push({ event: "qualified_report_submission" });
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t.errors.generic);
    }
  };

  const whatsappMessage = encodeURIComponent(t.whatsappPrefill.replace("{name}", name || "—"));
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center dark:border-teal-500/20 dark:bg-teal-500/10 sm:p-10">
        <CheckCircle2 size={40} className="text-teal-600 dark:text-teal-300" />
        <h3 className="mt-4 font-display text-lg font-semibold text-navy-500 dark:text-white">
          {t.successTitle}
        </h3>
        <p className="mt-2 max-w-sm text-sm text-navy-300 dark:text-white/60">{t.successBody}</p>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (typeof window !== "undefined" && (window as any).dataLayer) {
              (window as any).dataLayer.push({ event: "whatsapp_click", location: "report_form_success" });
            }
          }}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:bg-teal-600"
        >
          {t.continueOnWhatsapp}
        </a>
      </div>
    );
  }

  const isBusy = status === "uploading" || status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={() => {
        if (typeof window !== "undefined" && (window as any).dataLayer) {
          (window as any).dataLayer.push({ event: "report_form_started" });
        }
      }}
      className="space-y-5"
      noValidate
    >
      <p className="text-xs text-navy-300 dark:text-white/50">{t.requiredLegend}</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.fields.name} error={fieldErrors.name} required>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass(!!fieldErrors.name)}
            placeholder={t.placeholders.name}
          />
        </Field>
        <Field label={t.fields.whatsapp} error={fieldErrors.whatsapp} required>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => handleWhatsappChange(e.target.value)}
            className={inputClass(!!fieldErrors.whatsapp)}
            placeholder={t.placeholders.whatsapp}
          />
        </Field>
        <Field label={t.fields.email}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass(false)}
            placeholder={t.placeholders.email}
          />
        </Field>
        <Field label={t.fields.age}>
          <input
            type="number"
            min={0}
            max={120}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={inputClass(false)}
            placeholder={t.placeholders.age}
          />
        </Field>
        <Field label={t.fields.timeline}>
          <input
            type="text"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className={inputClass(false)}
            placeholder={t.placeholders.timeline}
          />
        </Field>
      </div>

      <Field label={t.fields.condition} error={fieldErrors.condition} required>
        <textarea
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          rows={4}
          className={inputClass(!!fieldErrors.condition)}
          placeholder={t.placeholders.condition}
        />
      </Field>

      <div>
        <span className="mb-1.5 block text-sm font-medium text-navy-500 dark:text-white/80">
          {t.fields.reports}
        </span>
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-navy-100 bg-navy-50/40 px-4 py-8 text-center transition-colors hover:border-primary-300 dark:border-white/10 dark:bg-white/5">
          <Upload size={22} className="text-primary-500" />
          <span className="text-sm font-medium text-navy-500 dark:text-white/80">{t.uploadLabel}</span>
          <span className="text-xs text-navy-300 dark:text-white/50">{t.uploadHint}</span>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={ACCEPTED_TYPES}
            onChange={handleFileSelect}
            className="hidden"
            disabled={isBusy}
          />
        </label>
        {fieldErrors.files && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.files}</p>}

        {fileStates.length > 0 && (
          <ul className="mt-3 space-y-2">
            {fileStates.map((fs, i) => (
              <li
                key={`${fs.file.name}-${i}`}
                className="rounded-lg border border-navy-100/70 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-2 truncate text-navy-500 dark:text-white/80">
                    {fs.url ? (
                      <CheckCircle size={15} className="flex-shrink-0 text-teal-500" />
                    ) : (
                      <FileText size={15} className="flex-shrink-0 text-primary-500" />
                    )}
                    <span className="truncate">{fs.file.name}</span>
                    <span className="flex-shrink-0 text-xs text-navy-300 dark:text-white/40">
                      ({(fs.file.size / (1024 * 1024)).toFixed(1)} MB)
                    </span>
                  </span>
                  {!isBusy && (
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      aria-label="Remove file"
                      className="flex-shrink-0 rounded-full p-1 text-navy-300 hover:bg-navy-50 hover:text-red-500 dark:text-white/40 dark:hover:bg-white/10"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
                {status === "uploading" && !fs.url && !fs.error && (
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-navy-50 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-primary-500 transition-all"
                      style={{ width: `${fs.progress}%` }}
                    />
                  </div>
                )}
                {fs.error && <p className="mt-1.5 text-xs text-red-500">{fs.error}</p>}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-2 text-xs text-navy-300 dark:text-white/50">{t.privacyNotice}</p>
      </div>

      {status === "error" && error && (
        <div className="flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-300">
          <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        icon={isBusy ? <Loader2 size={18} className="animate-spin" /> : undefined}
      >
        {status === "uploading" ? t.uploading : status === "submitting" ? t.submitting : t.submit}
      </Button>

      <p className="text-xs text-navy-300 dark:text-white/50">{t.disclaimer}</p>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy-500 dark:text-white/80">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-500">{error}</span>}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy-500 outline-none transition-colors placeholder:text-navy-200 focus:border-primary-400 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30 ${
    hasError ? "border-red-400" : "border-navy-100 dark:border-white/10"
  }`;
}
