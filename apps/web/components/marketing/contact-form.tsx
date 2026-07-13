"use client";

import { motion } from "framer-motion";
import { Check, Loader2, Send, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";

const inputClass =
  "mt-2 h-11 w-full rounded-xl border border-white/[.075] bg-white/[.03] px-3.5 text-[10px] text-white/72 outline-none transition placeholder:text-white/18 focus:border-violet-400/35 focus:bg-white/[.045] focus:ring-4 focus:ring-violet-500/10";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    interest: "Business early access",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 700);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid min-h-[520px] place-items-center rounded-[26px] border border-emerald-400/10 bg-emerald-400/[.035] p-8 text-center"
      >
        <div>
          <span className="mx-auto grid size-14 place-items-center rounded-2xl border border-emerald-400/15 bg-emerald-400/10 text-emerald-300">
            <Check className="size-6" />
          </span>
          <h2 className="mt-6 text-[24px] font-semibold tracking-[-.04em] text-white/78">Message received.</h2>
          <p className="mx-auto mt-3 max-w-sm text-[10px] leading-5 text-white/27">
            Thanks, {form.name.split(" ")[0]}. The Echelon team will review your note and respond to {form.email}.
          </p>
          <button
            onClick={() => {
              setSent(false);
              setForm({ name: "", email: "", company: "", interest: "Business early access", message: "" });
            }}
            className="mt-6 inline-flex h-10 items-center rounded-xl border border-white/[.08] px-4 text-[9px] font-semibold text-white/46 transition hover:bg-white/[.04]"
          >
            Send another message
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[26px] border border-white/[.07] bg-[#121217] p-5 shadow-[0_30px_100px_rgba(0,0,0,.34),inset_0_1px_0_rgba(255,255,255,.025)] sm:p-7">
      <div className="flex items-center gap-3 border-b border-white/[.055] pb-5">
        <span className="grid size-10 place-items-center rounded-xl bg-violet-400/10 text-violet-300">
          <Sparkles className="size-4" />
        </span>
        <div>
          <p className="text-[11px] font-semibold text-white/58">Start a conversation</p>
          <p className="mt-1 text-[8px] text-white/20">Usually answered within one business day.</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-[9px] font-medium text-white/35">
          Name
          <input
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Your name"
            className={inputClass}
            required
          />
        </label>
        <label className="text-[9px] font-medium text-white/35">
          Work email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="you@company.com"
            className={inputClass}
            required
          />
        </label>
        <label className="text-[9px] font-medium text-white/35">
          Company
          <input
            value={form.company}
            onChange={(event) => setForm({ ...form, company: event.target.value })}
            placeholder="Company or project"
            className={inputClass}
          />
        </label>
        <label className="text-[9px] font-medium text-white/35">
          I’m interested in
          <select
            value={form.interest}
            onChange={(event) => setForm({ ...form, interest: event.target.value })}
            className={inputClass}
          >
            <option>Business early access</option>
            <option>Customer early access</option>
            <option>Partnerships</option>
            <option>Integrations</option>
            <option>Media and general</option>
          </select>
        </label>
        <label className="text-[9px] font-medium text-white/35 sm:col-span-2">
          How can we help?
          <textarea
            value={form.message}
            onChange={(event) => setForm({ ...form, message: event.target.value })}
            placeholder="Tell us what you are building, looking for or hoping Echelon can solve…"
            rows={7}
            className="mt-2 w-full resize-none rounded-xl border border-white/[.075] bg-white/[.03] p-3.5 text-[10px] leading-5 text-white/72 outline-none transition placeholder:text-white/18 focus:border-violet-400/35 focus:bg-white/[.045] focus:ring-4 focus:ring-violet-500/10"
            required
          />
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-white/[.055] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[7px] leading-4 text-white/16">
          By sending this form, you agree that Echelon can use these details to respond to your enquiry.
        </p>
        <button
          type="submit"
          disabled={sending || !form.name.trim() || !form.email.trim() || !form.message.trim()}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#7c6cf8] to-[#6354dd] px-5 text-[10px] font-semibold text-white shadow-[0_14px_36px_rgba(108,92,231,.22)] transition hover:-translate-y-px disabled:translate-y-0 disabled:opacity-35"
        >
          {sending ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
          {sending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
