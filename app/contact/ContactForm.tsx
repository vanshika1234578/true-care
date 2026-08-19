"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Button from "@/components/Button";

type Status = "idle" | "submitting" | "success" | "error";

type FormState = {
  name: string;
  email: string;
  phone: string;
  country: string;
  treatment: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  country: "",
  treatment: "",
  message: "",
};

function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!form.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!form.phone.trim()) errors.phone = "Please enter a phone number, with country code.";
  if (!form.message.trim()) errors.message = "Please describe your medical concern briefly.";
  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        key="success"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center rounded-2xl border border-teal-200 bg-teal-50 p-10 text-center dark:border-teal-500/20 dark:bg-teal-500/10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 15 }}
        >
          <CheckCircle2 size={40} className="text-teal-600 dark:text-teal-300" />
        </motion.div>
        <h3 className="mt-4 font-display text-lg font-semibold text-navy-500 dark:text-white">
          Thank you — we've received your message
        </h3>
        <p className="mt-2 max-w-sm text-sm text-navy-300 dark:text-white/60">
          A care coordinator will reach out within 24 hours. If your inquiry is urgent, please
          use WhatsApp for a faster response.
        </p>
        <Button className="mt-6" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.form
      key="form"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-5"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          <input
            type="text"
            value={form.name}
            onChange={handleChange("name")}
            className={inputClass(!!errors.name)}
            placeholder="Your full name"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            className={inputClass(!!errors.email)}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Phone (with country code)" error={errors.phone}>
          <input
            type="tel"
            value={form.phone}
            onChange={handleChange("phone")}
            className={inputClass(!!errors.phone)}
            placeholder="+880 1XXXXXXXXX"
          />
        </Field>
        <Field label="Country">
          <input
            type="text"
            value={form.country}
            onChange={handleChange("country")}
            className={inputClass(false)}
            placeholder="Bangladesh, Iraq, Kenya..."
          />
        </Field>
      </div>

      <Field label="Treatment you're inquiring about">
        <input
          type="text"
          value={form.treatment}
          onChange={handleChange("treatment")}
          className={inputClass(false)}
          placeholder="Cardiology, Orthopedics, IVF..."
        />
      </Field>

      <Field label="Briefly describe your medical concern" error={errors.message}>
        <textarea
          value={form.message}
          onChange={handleChange("message")}
          rows={5}
          className={inputClass(!!errors.message)}
          placeholder="Share symptoms, prior diagnosis, or questions you have..."
        />
      </Field>

      {status === "error" && serverError && (
        <div className="flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-300">
          <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        icon={status === "submitting" ? <Loader2 size={18} className="animate-spin" /> : undefined}
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </Button>

      <p className="text-xs text-navy-300 dark:text-white/50">
        Your information is used only to coordinate your care and is never shared with third
        parties for marketing purposes.
      </p>
    </motion.form>
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
      <span className="mb-1.5 block text-sm font-medium text-navy-500 dark:text-white/80">
        {label}
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
