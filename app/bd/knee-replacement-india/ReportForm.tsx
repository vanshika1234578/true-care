"use client";

import { useRef, useState, FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle, Upload, X, FileText } from "lucide-react";
import Button from "@/components/Button";
import type { Lang } from "./content";
import { content } from "./content";

type Status = "idle" | "submitting" | "success" | "error";

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_TYPES = ".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx";

export default function ReportForm({ lang, whatsappNumber }: { lang: Lang; whatsappNumber: string }) {
  const t = content[lang].reportForm;
  const [name, setName] = useState("");
  const [country, setCountry] = useState("Bangladesh");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [condition, setCondition] = useState("");
  const [timeline, setTimeline] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const combined = [...files, ...selected].slice(0, MAX_FILES);
    setFiles(combined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = t.errors.name;
    if (!country.trim()) errs.country = t.errors.country;
    if (!whatsapp.trim()) errs.whatsapp = t.errors.whatsapp;
    if (!condition.trim()) errs.condition = t.errors.condition;
    for (const f of files) {
      if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        errs.files = t.errors.fileSize.replace("{name}", f.name);
      }
    }
    return errs;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("country", country);
      formData.append("whatsapp", whatsapp);
      formData.append("email", email);
      formData.append("age", age);
      formData.append("condition", condition);
      formData.append("timeline", timeline);
      formData.append("source", "knee-replacement-india-bd");
      files.forEach((f) => formData.append("reports", f));

      const res = await fetch("/api/report-submission", { method: "POST", body: formData });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? t.errors.generic);
      }

      // Analytics event — no-ops safely if no analytics tool is configured.
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
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.fields.name} error={fieldErrors.name}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass(!!fieldErrors.name)}
            placeholder={t.placeholders.name}
          />
        </Field>
        <Field label={t.fields.country} error={fieldErrors.country}>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={inputClass(!!fieldErrors.country)}
            placeholder={t.placeholders.country}
          />
        </Field>
        <Field label={t.fields.whatsapp} error={fieldErrors.whatsapp}>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
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

      <Field label={t.fields.condition} error={fieldErrors.condition}>
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
          />
        </label>
        {fieldErrors.files && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.files}</p>}

        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                className="flex items-center justify-between rounded-lg border border-navy-100/70 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
              >
                <span className="flex items-center gap-2 truncate text-navy-500 dark:text-white/80">
                  <FileText size={15} className="flex-shrink-0 text-primary-500" />
                  <span className="truncate">{f.name}</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  aria-label="Remove file"
                  className="flex-shrink-0 rounded-full p-1 text-navy-300 hover:bg-navy-50 hover:text-red-500 dark:text-white/40 dark:hover:bg-white/10"
                >
                  <X size={14} />
                </button>
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
        icon={status === "submitting" ? <Loader2 size={18} className="animate-spin" /> : undefined}
      >
        {status === "submitting" ? t.submitting : t.submit}
      </Button>

      <p className="text-xs text-navy-300 dark:text-white/50">{t.disclaimer}</p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy-500 dark:text-white/80">{label}</span>
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
