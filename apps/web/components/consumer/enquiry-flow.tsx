"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Listing } from "../../lib/listings";
import { getModule } from "../../lib/modules";
import { useAccountStore } from "../../store/account";

type Step = "details" | "confirm" | "success";

const inputClass =
  "mt-2 h-11 w-full rounded-xl border border-white/[.075] bg-white/[.03] px-3.5 text-[10px] text-white/72 outline-none transition placeholder:text-white/18 focus:border-violet-400/35 focus:bg-white/[.045] focus:ring-4 focus:ring-violet-500/10";

/**
 * Generic consumer request flow for the non-services modules — Apply / Hire /
 * Reserve / RSVP / Connect. Visual-only: it fakes a submit and shows a success
 * state. No persistence or AI. The copy adapts to the module's action verb.
 */
export function EnquiryFlow({ listing }: { listing: Listing }) {
  const module = getModule(listing.module);
  const [step, setStep] = useState<Step>("details");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "" });
  const submitApplication = useAccountStore((state) => state.submitApplication);
  const submitRequest = useAccountStore((state) => state.submitRequest);

  if (!module) return null;
  const { accent, actionVerb } = module;
  const canContinue = form.name.trim().length > 1 && form.email.includes("@");

  const isApplication = listing.module === "jobs" || listing.module === "freelancing";
  const trackHref = isApplication ? "/applications" : "/requests";
  const trackLabel = isApplication ? "Track in Applications" : "Track in Requests";

  function submit() {
    setLoading(true);
    setTimeout(() => {
      if (isApplication) {
        submitApplication({
          module: listing.module as "jobs" | "freelancing",
          listingId: listing.id,
          title: listing.title,
          org: listing.subtitle,
          location: listing.location,
          pay: listing.price ?? "—",
          ...(form.note.trim() ? { note: `Your note: ${form.note.trim()}` } : {}),
        });
      } else {
        submitRequest({
          module: listing.module,
          title: `${actionVerb} — ${listing.title}`,
          summary: form.note.trim() || `${listing.subtitle} · ${listing.location}`,
          provider: listing.subtitle,
        });
      }
      setLoading(false);
      setStep("success");
    }, 900);
  }

  return (
    <div className="rounded-[24px] border border-white/[.07] bg-[#121217] p-5 shadow-[0_28px_100px_rgba(0,0,0,.4)] sm:p-6">
      <div className="flex items-center gap-2">
        <span className={`inline-flex size-8 items-center justify-center rounded-xl ${accent.bg} ${accent.text}`}>
          <module.icon className="size-4" />
        </span>
        <div>
          <p className="text-[8px] font-semibold uppercase tracking-[.14em] text-white/28">{module.name}</p>
          <p className={`text-[11px] font-semibold ${accent.text}`}>{actionVerb}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === "details" ? (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <h3 className="mt-5 text-[15px] font-semibold text-white/72">Your details</h3>
            <p className="mt-1 text-[9px] text-white/24">
              We'll pass this to {listing.subtitle}. In the full release your Echelon profile fills this in automatically.
            </p>
            {isApplication ? (
              <Link href="/profile" className="mt-3 flex items-center gap-2 rounded-xl border border-violet-400/12 bg-violet-400/[.05] px-3 py-2.5 text-[8px] text-white/45 transition hover:text-white/70">
                <Sparkles className="size-3 text-violet-300" /> Applying with your Echelon {listing.module === "jobs" ? "job-seeker" : "freelancer"} profile
                <span className="ml-auto font-semibold text-violet-300">Review →</span>
              </Link>
            ) : null}

            <div className="mt-5 space-y-4">
              <label className="block text-[9px] font-medium text-white/34">
                Full name
                <div className="relative">
                  <UserRound className="absolute left-3 top-[calc(50%+4px)] size-3.5 -translate-y-1/2 text-white/18" />
                  <input
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    placeholder="Your name"
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </label>
              <label className="block text-[9px] font-medium text-white/34">
                Email
                <div className="relative">
                  <Mail className="absolute left-3 top-[calc(50%+4px)] size-3.5 -translate-y-1/2 text-white/18" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    placeholder="you@email.com"
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </label>
              <label className="block text-[9px] font-medium text-white/34">
                Phone <span className="text-white/18">(optional)</span>
                <div className="relative">
                  <Phone className="absolute left-3 top-[calc(50%+4px)] size-3.5 -translate-y-1/2 text-white/18" />
                  <input
                    value={form.phone}
                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                    placeholder="04xx xxx xxx"
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </label>
              <label className="block text-[9px] font-medium text-white/34">
                Message
                <textarea
                  value={form.note}
                  onChange={(event) => setForm({ ...form, note: event.target.value })}
                  placeholder={`A short note about your ${listing.module === "jobs" ? "application" : "request"}…`}
                  rows={3}
                  className="mt-2 w-full rounded-xl border border-white/[.075] bg-white/[.03] px-3.5 py-3 text-[10px] text-white/72 outline-none transition placeholder:text-white/18 focus:border-violet-400/35 focus:bg-white/[.045] focus:ring-4 focus:ring-violet-500/10"
                />
              </label>
            </div>

            <button
              type="button"
              disabled={!canContinue}
              onClick={() => setStep("confirm")}
              className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-violet-500 text-[10px] font-semibold text-white shadow-[0_14px_38px_rgba(108,92,231,.22)] transition hover:-translate-y-px disabled:translate-y-0 disabled:opacity-35"
            >
              Review <ArrowRight className="size-3.5" />
            </button>
          </motion.div>
        ) : null}

        {step === "confirm" ? (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <h3 className="mt-5 text-[15px] font-semibold text-white/72">Confirm your {actionVerb.toLowerCase()}</h3>
            <div className="mt-4 space-y-3 rounded-2xl border border-white/[.06] bg-white/[.02] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold text-white/62">{listing.title}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[8px] text-white/26">
                    <MapPin className="size-2.5" /> {listing.subtitle} · {listing.location}
                  </p>
                </div>
                {listing.price ? <span className="text-[11px] font-semibold text-white/60">{listing.price}</span> : null}
              </div>
              <div className="grid grid-cols-2 gap-2 border-t border-white/[.05] pt-3 text-[8px]">
                <div>
                  <p className="text-white/22">Name</p>
                  <p className="mt-0.5 text-white/55">{form.name}</p>
                </div>
                <div>
                  <p className="text-white/22">Email</p>
                  <p className="mt-0.5 truncate text-white/55">{form.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setStep("details")}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[.08] px-4 text-[9px] font-semibold text-white/50 transition hover:text-white/80"
              >
                <ArrowLeft className="size-3.5" /> Back
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={loading}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-violet-500 text-[10px] font-semibold text-white shadow-[0_14px_38px_rgba(108,92,231,.22)] disabled:opacity-45"
              >
                {loading ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" />}
                {loading ? "Sending…" : `Send ${actionVerb.toLowerCase()}`}
              </button>
            </div>
          </motion.div>
        ) : null}

        {step === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-4 text-center"
          >
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-400/10 text-emerald-300">
              <CheckCircle2 className="size-7" />
            </span>
            <h3 className="mt-5 text-[16px] font-semibold text-white/78">
              {isApplication ? "Application sent." : "You're all set."}
            </h3>
            <p className="mx-auto mt-2 max-w-xs text-[9px] leading-5 text-white/26">
              {listing.subtitle} has received your {actionVerb.toLowerCase()}.{" "}
              {isApplication
                ? "We'll notify you when they respond — follow it in Applications."
                : "The Concierge is on it — follow progress in Requests."}{" "}
              This is a preview, so nothing was actually sent.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Link
                href={trackHref}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-500 text-[10px] font-semibold text-white"
              >
                {trackLabel} <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href={`/explore/${listing.module}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[.08] text-[9px] font-semibold text-white/50 transition hover:text-white/80"
              >
                Back to {module.name}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {step !== "success" ? (
        <p className="mt-5 flex items-center gap-1.5 border-t border-white/[.05] pt-4 text-[7px] text-white/18">
          <Sparkles className="size-2.5 text-violet-300/60" /> Preview experience — no message is sent yet.
        </p>
      ) : null}
    </div>
  );
}
