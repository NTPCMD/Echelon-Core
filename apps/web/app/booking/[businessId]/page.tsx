"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Clock, Star, Loader2 } from "lucide-react";
import { businesses } from "../../../lib/seed";
import { notFound } from "next/navigation";

function formatPrice(cents: number) {
  if (cents === 0) return "Free";
  return `$${(cents / 100).toFixed(0)}`;
}

function getTodayDates() {
  const dates: { label: string; value: string }[] = [];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const iso = d.toISOString().split("T")[0]!;
    dates.push({
      label: i === 0 ? "Today" : `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`,
      value: iso,
    });
  }
  return dates;
}

type Step = "service" | "datetime" | "details" | "confirm" | "success";

export default function BookingPage({ params }: { params: Promise<{ businessId: string }> }) {
  const resolvedParams = React.use(params);
  const searchParams = useSearchParams();
  const biz = businesses.find((b) => b.id === resolvedParams.businessId || b.slug === resolvedParams.businessId);
  if (!biz) notFound();

  const preselectedServiceId = searchParams.get("service");
  const [step, setStep] = useState<Step>(preselectedServiceId ? "datetime" : "service");
  const [selectedServiceId, setSelectedServiceId] = useState(preselectedServiceId ?? "");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [booking, setBooking] = useState<Record<string, unknown> | null>(null);

  const selectedService = biz.services.find((s) => s.id === selectedServiceId);
  const dates = getTodayDates();

  const STEPS: Step[] = ["service", "datetime", "details", "confirm", "success"];
  const stepIdx = STEPS.indexOf(step);

  async function handleConfirm() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId: biz!.id,
          serviceId: selectedServiceId,
          date: selectedDate,
          time: selectedTime,
          customerName: name,
          customerEmail: email,
          customerNotes: notes,
        }),
      });
      const data = await res.json();
      setBooking(data);
      setStep("success");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen px-6 py-8 sm:px-10">
      <nav className="mx-auto flex max-w-2xl items-center justify-between pb-8">
        <b className="text-xl tracking-tight">Echelon</b>
        <Link
          href={`/businesses/${biz.slug}`}
          className="flex items-center gap-1.5 text-sm text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
        >
          <ArrowLeft className="size-4" /> {biz.name}
        </Link>
      </nav>

      <div className="mx-auto max-w-2xl">
        {/* Progress */}
        {step !== "success" && (
          <div className="mb-8 flex items-center gap-2">
            {(["service", "datetime", "details", "confirm"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`flex size-7 items-center justify-center rounded-full text-xs font-bold transition ${
                    STEPS.indexOf(s) < stepIdx
                      ? "bg-done text-white"
                      : STEPS.indexOf(s) === stepIdx
                      ? "bg-brand text-white"
                      : "bg-black/10 text-black/40 dark:bg-white/10 dark:text-white/30"
                  }`}
                >
                  {STEPS.indexOf(s) < stepIdx ? <Check className="size-3.5" /> : i + 1}
                </div>
                <span
                  className={`hidden text-xs sm:block ${
                    STEPS.indexOf(s) === stepIdx ? "font-semibold text-ink dark:text-white" : "text-black/40 dark:text-white/30"
                  }`}
                >
                  {({ service: "Service", datetime: "Date & Time", details: "Your details", confirm: "Confirm" } as Record<string, string>)[s]}
                </span>
                {i < 3 && <div className="h-px w-8 bg-black/10 dark:bg-white/10" />}
              </div>
            ))}
          </div>
        )}

        <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-white/5">
          {/* Step 1: Service */}
          {step === "service" && (
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Choose a service</h1>
              <p className="mt-1 text-sm text-black/50 dark:text-white/40">{biz.name}</p>
              <div className="mt-6 grid gap-3">
                {biz.services.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => { setSelectedServiceId(svc.id); setStep("datetime"); }}
                    className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition hover:border-brand hover:bg-brand/5 ${
                      selectedServiceId === svc.id ? "border-brand bg-brand/5" : "border-black/10 dark:border-white/10"
                    }`}
                  >
                    <div>
                      <p className="font-semibold">{svc.name}</p>
                      <p className="mt-1 text-sm text-black/50 dark:text-white/40">{svc.description}</p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-black/40 dark:text-white/30">
                        <Clock className="size-3.5" />
                        {svc.durationMinutes} min
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 text-right">
                      <p className="text-xl font-bold">{formatPrice(svc.priceCents)}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === "datetime" && selectedService && (
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Pick a date & time</h1>
              <p className="mt-1 text-sm text-black/50 dark:text-white/40">{selectedService.name}</p>

              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold">Select date</p>
                <div className="flex flex-wrap gap-2">
                  {dates.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setSelectedDate(d.value)}
                      className={`rounded-2xl border px-4 py-2.5 text-sm font-medium transition ${
                        selectedDate === d.value
                          ? "border-brand bg-brand text-white"
                          : "border-black/10 hover:border-brand dark:border-white/10"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div className="mt-6">
                  <p className="mb-3 text-sm font-semibold">Select time</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.availability.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`rounded-2xl border px-4 py-2.5 text-sm font-semibold transition ${
                          selectedTime === t
                            ? "border-brand bg-brand text-white"
                            : "border-black/10 hover:border-brand dark:border-white/10"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setStep("service")}
                  className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold dark:border-white/10"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep("details")}
                  disabled={!selectedDate || !selectedTime}
                  className="rounded-full bg-ink px-8 py-3 text-sm font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-ink"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {step === "details" && (
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Your details</h1>
              <p className="mt-1 text-sm text-black/50 dark:text-white/40">We'll send your confirmation here.</p>
              <div className="mt-6 grid gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">Full name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-black/10 bg-transparent p-4 outline-none focus:border-brand dark:border-white/10"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-2xl border border-black/10 bg-transparent p-4 outline-none focus:border-brand dark:border-white/10"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">Notes (optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Anything we should know?"
                    rows={3}
                    className="w-full resize-none rounded-2xl border border-black/10 bg-transparent p-4 outline-none focus:border-brand dark:border-white/10"
                  />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setStep("datetime")}
                  className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold dark:border-white/10"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep("confirm")}
                  disabled={!name.trim() || !email.trim()}
                  className="rounded-full bg-ink px-8 py-3 text-sm font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-ink"
                >
                  Review booking
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === "confirm" && selectedService && (
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Confirm booking</h1>
              <div className="mt-6 divide-y divide-black/5 rounded-2xl border border-black/10 dark:divide-white/5 dark:border-white/10">
                {[
                  { label: "Business", value: biz.name },
                  { label: "Service", value: selectedService.name },
                  { label: "Duration", value: `${selectedService.durationMinutes} min` },
                  { label: "Date", value: selectedDate },
                  { label: "Time", value: selectedTime },
                  { label: "Name", value: name },
                  { label: "Email", value: email },
                  {
                    label: "Total",
                    value: formatPrice(selectedService.priceCents),
                    bold: true,
                  },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between px-5 py-3.5 text-sm">
                    <span className="text-black/50 dark:text-white/40">{row.label}</span>
                    <span className={row.bold ? "text-base font-bold" : "font-medium"}>{row.value}</span>
                  </div>
                ))}
              </div>

              <p className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-xs text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                Payment powered by Stripe — coming soon. Your booking will be confirmed by the business directly.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setStep("details")}
                  className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold dark:border-white/10"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={submitting}
                  className="flex items-center gap-2 rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {submitting && <Loader2 className="size-4 animate-spin" />}
                  Confirm booking
                </button>
              </div>
            </div>
          )}

          {/* Success */}
          {step === "success" && (
            <div className="py-6 text-center">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-done/15">
                <Check className="size-8 text-done" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Booking confirmed!</h1>
              <p className="mt-3 text-black/55 dark:text-white/50">
                We've sent a confirmation to <strong>{email}</strong>.
              </p>
              {booking && (
                <p className="mt-1 font-mono text-xs text-black/30 dark:text-white/20">
                  Ref: {booking.id as string}
                </p>
              )}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/dashboard"
                  className="rounded-full bg-ink px-8 py-3 text-sm font-semibold text-white dark:bg-white dark:text-ink"
                >
                  View my bookings
                </Link>
                <Link
                  href="/"
                  className="rounded-full border border-black/10 px-8 py-3 text-sm font-semibold dark:border-white/10"
                >
                  Back to home
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Business info strip */}
        {step !== "success" && (
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 dark:border-white/5 dark:bg-white/5">
            <div className="size-10 flex-shrink-0 rounded-xl bg-gradient-to-br from-brand to-fuchsia-300" />
            <div>
              <p className="text-sm font-semibold">{biz.name}</p>
              <p className="text-xs text-black/40 dark:text-white/30">
                {biz.suburb} · <Star className="inline size-3 fill-amber-400 text-amber-400" /> {biz.rating}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
