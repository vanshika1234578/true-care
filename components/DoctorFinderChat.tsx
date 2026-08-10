"use client";

import { useRef, useState, FormEvent } from "react";
import { Paperclip, Send, Loader2, X, FileText, AlertCircle, ShieldAlert } from "lucide-react";
import DoctorCard from "@/components/DoctorCard";
import type { Doctor } from "@/lib/data";

type Message = {
  role: "user" | "assistant";
  text: string;
  fileName?: string;
  recommendedDoctors?: Doctor[];
};

const ACCEPTED_TYPES = "application/pdf,image/png,image/jpeg,image/webp";

export default function DoctorFinderChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [reportSent, setReportSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      setError("That file is too large (max 15MB).");
      return;
    }
    setError(null);
    setPendingFile(file);
  };

  const submit = async () => {
    const trimmed = input.trim();
    if (!trimmed && !pendingFile) return;

    setError(null);
    const userMessage: Message = {
      role: "user",
      text: trimmed || "Please review this report and let me know which specialists would be relevant.",
      fileName: pendingFile?.name,
    };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("message", trimmed);
      formData.append(
        "history",
        JSON.stringify(messages.map((m) => ({ role: m.role, text: m.text })))
      );
      if (pendingFile && !reportSent) {
        formData.append("file", pendingFile);
      }

      const res = await fetch("/api/find-doctor", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      if (pendingFile && !reportSent) setReportSent(true);
      setPendingFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          text: data.reply,
          recommendedDoctors: data.recommendedDoctors ?? [],
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <div className="flex flex-col rounded-2xl border border-navy-100/70 bg-white shadow-card dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-2 border-b border-navy-100/60 px-5 py-4 dark:border-white/10">
        <ShieldAlert size={16} className="flex-shrink-0 text-primary-500" />
        <p className="text-xs text-navy-300 dark:text-white/50">
          This tool helps match you to the right specialist — it does not diagnose. Your treating
          doctor confirms everything after a real consultation.
        </p>
      </div>

      <div className="flex min-h-[360px] max-h-[520px] flex-col gap-4 overflow-y-auto px-5 py-6">
        {messages.length === 0 && (
          <div className="m-auto max-w-sm text-center">
            <FileText size={32} className="mx-auto mb-3 text-primary-300" />
            <p className="text-sm text-navy-300 dark:text-white/50">
              Upload a lab report, scan, or prior diagnosis letter, or just type a question —
              we'll help point you to the right specialist.
            </p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                m.role === "user"
                  ? "bg-primary-500 text-white"
                  : "bg-surface-soft text-navy-500 dark:bg-white/10 dark:text-white/90"
              }`}
            >
              {m.fileName && (
                <span className="mb-1.5 flex items-center gap-1.5 text-xs opacity-80">
                  <Paperclip size={12} /> {m.fileName}
                </span>
              )}
              <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>

              {m.recommendedDoctors && m.recommendedDoctors.length > 0 && (
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {m.recommendedDoctors.map((d) => (
                    <div key={d.slug} className="[&>div]:shadow-none">
                      <DoctorCard doctor={d} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl bg-surface-soft px-4 py-3 text-sm text-navy-300 dark:bg-white/10 dark:text-white/50">
              <Loader2 size={14} className="animate-spin" /> Reviewing...
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mx-5 mb-2 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-600 dark:bg-red-500/10 dark:text-red-300">
          <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {pendingFile && (
        <div className="mx-5 mb-2 flex items-center justify-between rounded-xl bg-primary-50 px-3 py-2 text-xs text-primary-700 dark:bg-primary-500/10 dark:text-primary-300">
          <span className="flex items-center gap-1.5 truncate">
            <Paperclip size={13} /> {pendingFile.name}
          </span>
          <button
            type="button"
            onClick={() => {
              setPendingFile(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            aria-label="Remove attached file"
            className="ml-2 flex-shrink-0 text-primary-500 hover:text-primary-700"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t border-navy-100/60 p-4 dark:border-white/10">
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_TYPES}
          onChange={handleFileSelect}
          className="hidden"
          id="report-upload"
        />
        <label
          htmlFor="report-upload"
          className="flex h-11 w-11 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-navy-100 text-navy-400 transition-colors hover:border-primary-300 hover:text-primary-600 dark:border-white/10 dark:text-white/50"
          title="Attach a report (PDF, PNG, JPEG, WEBP — max 15MB)"
        >
          <Paperclip size={18} />
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          rows={1}
          placeholder={
            reportSent
              ? "Ask a follow-up question..."
              : "Describe your concern, or attach a report and press send..."
          }
          className="flex-1 resize-none rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy-500 outline-none focus:border-primary-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
        <button
          type="submit"
          disabled={loading || (!input.trim() && !pendingFile)}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-primary-600 disabled:opacity-40"
          aria-label="Send"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </button>
      </form>
    </div>
  );
}
