"use client";

import type { Business } from "@echelon/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Loader2,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useAccountStore } from "../../store/account";
import { useBookingsStore } from "../../store/bookings";

type Step = "service" | "datetime" | "details" | "confirm" | "success";

const steps: Array<{ id: Exclude<Step, "success">; label: string }> = [
  { id: "service", label: "Service" },
  { id: "datetime", label: "Date & time" },
  { id: "details", label: "Details" },
  { id: "confirm", label: "Confirm" },
];

function formatPrice(cents: number) {
  if (cents === 0) return "Free";
  return `$${(cents / 100).toFixed(0)}`;
}

function makeDates(todayIso: string) {
  const start = new Date(todayIso);
  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);
    return {
      value: date.toISOString().split("T")[0] ?? "",
      day: new Intl.DateTimeFormat("en-AU", { weekday: "short", timeZone: "UTC" }).format(date),
      date: date.getUTCDate().toString(),
      month: new Intl.DateTimeFormat("en-AU", { month: "short", timeZone: "UTC" }).format(date),
      label: index === 0 ? "Today" : new Intl.DateTimeFormat("en-AU", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(date),
    };
  });
}

const inputClass =
  "mt-2 h-11 w-full rounded-xl border border-white/[.075] bg-white/[.03] px-3.5 text-[10px] text-white/72 outline-none transition placeholder:text-white/18 focus:border-violet-400/35 focus:bg-white/[.045] focus:ring-4 focus:ring-violet-500/10";

export function BookingFlow({ business, todayIso }: { business: Business; todayIso: string }) {
  const addBooking = useBookingsStore((state) => state.addBooking);
  const notify = useAccountStore((state) => state.notify);
  const earnPoints = useAccountStore((state) => state.earnPoints);
  const searchParams = useSearchParams();
  const preselectedServiceId = searchParams.get("service");
  const validPreselection = business.services.some((service) => service.id === preselectedServiceId)
    ? preselectedServiceId
    : null;
  const [step, setStep] = useState<Step>(validPreselection ? "datetime" : "service");
  const [selectedServiceId, setSelectedServiceId] = useState(validPreselection ?? "");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [error, setError] = useState("");

  const selectedService = business.services.find((service) => service.id === selectedServiceId);
  const dates = useMemo(() => makeDates(todayIso), [todayIso]);
  const stepIndex = step === "success" ? steps.length : steps.findIndex((item) => item.id === step);
  const selectedDateLabel = dates.find((date) => date.value === selectedDate)?.label ?? selectedDate;

  const selectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setSelectedDate("");
    setSelectedTime("");
    setStep("datetime");
  };

  const confirmBooking = async () => {
    if (!selectedService) return;
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId: business.id,
          serviceId: selectedServiceId,
          date: selectedDate,
          time: selectedTime,
          customerName: name,
          customerEmail: email,
          customerNotes: notes,
        }),
      });
      if (!response.ok) throw new Error("Booking could not be completed");
      const booking = (await response.json()) as { id?: string };
      const reference = `ECH-${Date.now().toString(36).toUpperCase().slice(-5)}`;
      const id = booking.id ?? reference.toLowerCase();
      setBookingId(id);

      // Persist into the client bookings store so it shows in /bookings + dashboard.
      const picked = dates.find((date) => date.value === selectedDate);
      const [hh = 0, mm = 0] = selectedTime.split(":").map(Number);
      const period = hh >= 12 ? "PM" : "AM";
      const hour12 = hh % 12 === 0 ? 12 : hh % 12;
      addBooking({
        id,
        business: business.name,
        slug: business.slug,
        service: selectedService.name,
        when: `${picked?.label ?? selectedDate} · ${hour12}:${String(mm).padStart(2, "0")} ${period}`,
        dateChip: { day: picked?.day ?? "—", date: picked?.date ?? "—" },
        duration: `${selectedService.durationMinutes} min`,
        durationMinutes: selectedService.durationMinutes,
        startLocal: `${selectedDate}T${selectedTime}:00`,
        suburb: business.suburb,
        address: `${business.suburb}, ${business.city} WA`,
        price: formatPrice(selectedService.priceCents),
        reference,
        status: "confirmed",
      });
      notify({
        kind: "booking",
        title: "Booking confirmed",
        body: `${selectedService.name} at ${business.name} — ${picked?.label ?? selectedDate}, ${selectedTime}.`,
        href: `/bookings/${id}`,
      });
      earnPoints(25, `Booking: ${selectedService.name}`);
      setStep("success");
    } catch {
      setError("We could not confirm the booking yet. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-72px)] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
      <div className="echelon-grid pointer-events-none absolute inset-0 -z-10 opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/businesses/${business.slug}`}
            className="inline-flex items-center gap-2 text-[9px] font-semibold text-white/28 transition hover:text-white/62"
          >
            <ArrowLeft className="size-3.5" /> {business.name}
          </Link>

          {step !== "success" ? (
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {steps.map((item, index) => {
                const complete = index < stepIndex;
                const active = index === stepIndex;
                return (
                  <div key={item.id} className="flex items-center gap-1.5">
                    <div className={`flex items-center gap-2 rounded-xl px-2.5 py-2 ${active ? "border border-violet-400/12 bg-violet-400/[.065]" : ""}`}>
                      <span className={`grid size-5 place-items-center rounded-full text-[7px] font-semibold ${complete ? "bg-emerald-400 text-[#07140e]" : active ? "bg-violet-500 text-white" : "bg-white/[.055] text-white/22"}`}>
                        {complete ? <Check className="size-2.5" /> : index + 1}
                      </span>
                      <span className={`hidden whitespace-nowrap text-[8px] font-medium sm:block ${active ? "text-white/55" : "text-white/18"}`}>
                        {item.label}
                      </span>
                    </div>
                    {index < steps.length - 1 ? <span className="h-px w-3 bg-white/[.07] sm:w-5" /> : null}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        {step === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl rounded-[28px] border border-emerald-400/12 bg-gradient-to-br from-emerald-500/[.055] to-[#121217] p-7 text-center shadow-[0_34px_110px_rgba(0,0,0,.4)] sm:p-12"
          >
            <span className="mx-auto grid size-16 place-items-center rounded-[22px] border border-emerald-400/15 bg-emerald-400/10 text-emerald-300 shadow-[0_0_45px_rgba(52,211,153,.12)]">
              <CheckCircle2 className="size-7" />
            </span>
            <p className="mt-7 text-[8px] font-semibold uppercase tracking-[.16em] text-emerald-300">Booking confirmed</p>
            <h1 className="mt-3 text-[34px] font-semibold tracking-[-.05em] text-white/85 sm:text-[46px]">You’re all set.</h1>
            <p className="mx-auto mt-4 max-w-md text-[10px] leading-5 text-white/26">
              {business.name} has received your booking for {selectedService?.name}. Confirmation has been sent to {email}.
            </p>
            <div className="mx-auto mt-7 max-w-md rounded-2xl border border-white/[.055] bg-white/[.025] p-4 text-left">
              <div className="flex items-center justify-between text-[8px]"><span className="text-white/20">When</span><span className="font-medium text-white/48">{selectedDateLabel} · {selectedTime}</span></div>
              <div className="mt-3 flex items-center justify-between text-[8px]"><span className="text-white/20">Reference</span><span className="font-mono text-violet-200">{bookingId}</span></div>
            </div>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={`/bookings/${bookingId}`} className="inline-flex h-11 items-center justify-center rounded-xl bg-violet-500 px-5 text-[9px] font-semibold text-white">Manage this booking</Link>
              <Link href="/services" className="inline-flex h-11 items-center justify-center rounded-xl border border-white/[.08] px-5 text-[9px] font-semibold text-white/44">Discover more services</Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0 overflow-hidden rounded-[26px] border border-white/[.07] bg-[#121217] shadow-[0_30px_100px_rgba(0,0,0,.36),inset_0_1px_0_rgba(255,255,255,.025)]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.24 }}
                  className="p-5 sm:p-7"
                >
                  {step === "service" ? (
                    <div>
                      <p className="text-[8px] font-semibold uppercase tracking-[.15em] text-violet-300/65">Step 1 of 4</p>
                      <h1 className="mt-3 text-[28px] font-semibold tracking-[-.045em] text-white/82 sm:text-[34px]">Choose a service.</h1>
                      <p className="mt-2 text-[9px] text-white/22">Select the experience that best fits what you need.</p>
                      <div className="mt-7 space-y-3">
                        {business.services.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => selectService(service.id)}
                            className="group flex w-full flex-col gap-4 rounded-[18px] border border-white/[.06] bg-white/[.018] p-4 text-left transition hover:border-violet-400/20 hover:bg-violet-400/[.045] sm:flex-row sm:items-center sm:p-5"
                          >
                            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-violet-400/10 text-violet-300">
                              <Sparkles className="size-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[11px] font-semibold text-white/56">{service.name}</span>
                              <span className="mt-1.5 block text-[8px] leading-4 text-white/20">{service.description}</span>
                              <span className="mt-2 flex items-center gap-1.5 text-[7px] text-white/18"><Clock3 className="size-2.5" />{service.durationMinutes} minutes</span>
                            </span>
                            <span className="flex items-center justify-between gap-4 sm:block sm:text-right">
                              <span className="block text-[15px] font-semibold text-white/62">{formatPrice(service.priceCents)}</span>
                              <span className="mt-0 flex items-center gap-1 text-[7px] font-semibold text-violet-300 sm:mt-2">Select <ArrowRight className="size-3" /></span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {step === "datetime" && selectedService ? (
                    <div>
                      <p className="text-[8px] font-semibold uppercase tracking-[.15em] text-violet-300/65">Step 2 of 4</p>
                      <h1 className="mt-3 text-[28px] font-semibold tracking-[-.045em] text-white/82 sm:text-[34px]">Choose a time.</h1>
                      <p className="mt-2 text-[9px] text-white/22">Live availability for {selectedService.name}.</p>

                      <div className="mt-7">
                        <p className="text-[9px] font-semibold text-white/38">Date</p>
                        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
                          {dates.map((date) => (
                            <button
                              key={date.value}
                              onClick={() => {
                                setSelectedDate(date.value);
                                setSelectedTime("");
                              }}
                              className={`rounded-xl border p-2.5 text-center transition ${selectedDate === date.value ? "border-violet-400/25 bg-violet-500 text-white shadow-[0_10px_28px_rgba(108,92,231,.2)]" : "border-white/[.06] bg-white/[.02] hover:border-white/[.12]"}`}
                            >
                              <span className={`block text-[7px] font-medium ${selectedDate === date.value ? "text-white/70" : "text-white/20"}`}>{date.day}</span>
                              <span className={`mt-1 block text-[14px] font-semibold ${selectedDate === date.value ? "text-white" : "text-white/52"}`}>{date.date}</span>
                              <span className={`mt-0.5 block text-[7px] ${selectedDate === date.value ? "text-white/60" : "text-white/16"}`}>{date.month}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mt-7">
                        <div className="flex items-center justify-between">
                          <p className="text-[9px] font-semibold text-white/38">Available times</p>
                          {selectedDate ? <span className="text-[7px] text-emerald-300">Updated live</span> : null}
                        </div>
                        {selectedDate ? (
                          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                            {selectedService.availability.map((time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`h-10 rounded-xl border text-[9px] font-semibold transition ${selectedTime === time ? "border-violet-400/25 bg-violet-400/12 text-violet-200" : "border-white/[.06] bg-white/[.018] text-white/34 hover:border-violet-400/15 hover:text-white/58"}`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-3 grid min-h-28 place-items-center rounded-xl border border-dashed border-white/[.07] text-center">
                            <div><CalendarDays className="mx-auto size-4 text-white/18" /><p className="mt-2 text-[8px] text-white/18">Choose a date to see available times.</p></div>
                          </div>
                        )}
                      </div>

                      <div className="mt-8 flex items-center justify-between border-t border-white/[.055] pt-5">
                        <button onClick={() => setStep("service")} className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/[.07] px-4 text-[8px] font-semibold text-white/35"><ArrowLeft className="size-3.5" /> Back</button>
                        <button onClick={() => setStep("details")} disabled={!selectedDate || !selectedTime} className="inline-flex h-10 items-center gap-2 rounded-xl bg-violet-500 px-4 text-[8px] font-semibold text-white disabled:opacity-30">Continue <ArrowRight className="size-3.5" /></button>
                      </div>
                    </div>
                  ) : null}

                  {step === "details" ? (
                    <div>
                      <p className="text-[8px] font-semibold uppercase tracking-[.15em] text-violet-300/65">Step 3 of 4</p>
                      <h1 className="mt-3 text-[28px] font-semibold tracking-[-.045em] text-white/82 sm:text-[34px]">Tell us who’s coming.</h1>
                      <p className="mt-2 text-[9px] text-white/22">We’ll send the booking confirmation to these details.</p>
                      <div className="mt-7 grid gap-4 sm:grid-cols-2">
                        <label className="text-[9px] font-medium text-white/34">
                          Full name
                          <div className="relative">
                            <UserRound className="absolute left-3 top-[23px] size-3.5 text-white/18" />
                            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className={`${inputClass} pl-9`} />
                          </div>
                        </label>
                        <label className="text-[9px] font-medium text-white/34">
                          Email
                          <div className="relative">
                            <Mail className="absolute left-3 top-[23px] size-3.5 text-white/18" />
                            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@email.com" className={`${inputClass} pl-9`} />
                          </div>
                        </label>
                        <label className="text-[9px] font-medium text-white/34 sm:col-span-2">
                          Notes for {business.name} <span className="text-white/15">(optional)</span>
                          <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Share anything that will help the business prepare…" rows={5} className="mt-2 w-full resize-none rounded-xl border border-white/[.075] bg-white/[.03] p-3.5 text-[10px] leading-5 text-white/72 outline-none transition placeholder:text-white/18 focus:border-violet-400/35 focus:ring-4 focus:ring-violet-500/10" />
                        </label>
                      </div>
                      <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-400/10 bg-emerald-400/[.035] p-4">
                        <ShieldCheck className="mt-0.5 size-4 text-emerald-300" /><div><p className="text-[9px] font-semibold text-white/42">Your details stay protected.</p><p className="mt-1 text-[8px] leading-4 text-white/19">They are shared with {business.name} only to manage this booking.</p></div>
                      </div>
                      <div className="mt-8 flex items-center justify-between border-t border-white/[.055] pt-5">
                        <button onClick={() => setStep("datetime")} className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/[.07] px-4 text-[8px] font-semibold text-white/35"><ArrowLeft className="size-3.5" /> Back</button>
                        <button onClick={() => setStep("confirm")} disabled={!name.trim() || !email.trim()} className="inline-flex h-10 items-center gap-2 rounded-xl bg-violet-500 px-4 text-[8px] font-semibold text-white disabled:opacity-30">Review booking <ArrowRight className="size-3.5" /></button>
                      </div>
                    </div>
                  ) : null}

                  {step === "confirm" && selectedService ? (
                    <div>
                      <p className="text-[8px] font-semibold uppercase tracking-[.15em] text-violet-300/65">Step 4 of 4</p>
                      <h1 className="mt-3 text-[28px] font-semibold tracking-[-.045em] text-white/82 sm:text-[34px]">Review and confirm.</h1>
                      <p className="mt-2 text-[9px] text-white/22">Everything looks right? Complete the booking below.</p>
                      <div className="mt-7 overflow-hidden rounded-[18px] border border-white/[.065]">
                        {[
                          ["Business", business.name],
                          ["Service", selectedService.name],
                          ["Date", selectedDateLabel],
                          ["Time", selectedTime],
                          ["Duration", `${selectedService.durationMinutes} minutes`],
                          ["Customer", name],
                          ["Email", email],
                        ].map(([label, value]) => (
                          <div key={label} className="flex items-start justify-between gap-5 border-b border-white/[.05] px-4 py-3.5 last:border-0">
                            <span className="text-[8px] text-white/20">{label}</span>
                            <span className="text-right text-[9px] font-medium text-white/45">{value}</span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between border-t border-violet-400/10 bg-violet-400/[.045] px-4 py-4">
                          <span className="text-[9px] font-semibold text-white/32">Total</span>
                          <span className="text-[18px] font-semibold text-violet-200">{formatPrice(selectedService.priceCents)}</span>
                        </div>
                      </div>

                      {error ? <p className="mt-4 rounded-xl border border-rose-400/10 bg-rose-400/[.045] p-3 text-[8px] text-rose-200">{error}</p> : null}

                      <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[.055] bg-white/[.02] p-4">
                        <ShieldCheck className="mt-0.5 size-4 text-violet-300" /><div><p className="text-[9px] font-semibold text-white/40">Secure confirmation</p><p className="mt-1 text-[8px] leading-4 text-white/18">Payment collection will be available through Stripe. This booking request is confirmed directly with the business.</p></div>
                      </div>
                      <div className="mt-8 flex items-center justify-between border-t border-white/[.055] pt-5">
                        <button onClick={() => setStep("details")} className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/[.07] px-4 text-[8px] font-semibold text-white/35"><ArrowLeft className="size-3.5" /> Back</button>
                        <button onClick={confirmBooking} disabled={submitting} className="inline-flex h-10 items-center gap-2 rounded-xl bg-violet-500 px-4 text-[8px] font-semibold text-white disabled:opacity-45">{submitting ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" />}{submitting ? "Confirming…" : "Confirm booking"}</button>
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>

            <aside className="h-fit rounded-[22px] border border-white/[.065] bg-[#111116] p-5 lg:sticky lg:top-24">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-violet-400/10 text-[10px] font-semibold text-violet-200">
                  {business.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] font-semibold text-white/52">{business.name}</p>
                  <p className="mt-1 flex items-center gap-1 text-[8px] text-white/18"><MapPin className="size-2.5" />{business.suburb}, {business.city}</p>
                  <p className="mt-1 flex items-center gap-1 text-[8px] text-amber-100"><Star className="size-2.5 fill-current" />{business.rating} <span className="text-white/16">· {business.reviewCount} reviews</span></p>
                </div>
              </div>

              {selectedService ? (
                <div className="mt-5 border-t border-white/[.055] pt-5">
                  <p className="text-[7px] uppercase tracking-[.12em] text-white/16">Selected service</p>
                  <p className="mt-2 text-[10px] font-semibold text-white/45">{selectedService.name}</p>
                  <div className="mt-3 flex items-center justify-between text-[8px]"><span className="flex items-center gap-1 text-white/20"><Clock3 className="size-3" />{selectedService.durationMinutes} min</span><span className="font-semibold text-white/48">{formatPrice(selectedService.priceCents)}</span></div>
                </div>
              ) : (
                <div className="mt-5 rounded-xl border border-dashed border-white/[.06] p-4 text-center text-[8px] text-white/18">Select a service to begin.</div>
              )}

              {selectedDate && selectedTime ? (
                <div className="mt-4 rounded-xl border border-violet-400/10 bg-violet-400/[.045] p-3">
                  <p className="flex items-center gap-1.5 text-[8px] font-medium text-violet-200"><CalendarDays className="size-3" />{selectedDateLabel}</p>
                  <p className="mt-1 pl-[18px] text-[8px] text-white/22">{selectedTime}</p>
                </div>
              ) : null}

              <div className="mt-5 space-y-2.5 border-t border-white/[.055] pt-5">
                {["Verified business", "Transparent pricing", "Secure confirmation"].map((item) => (
                  <p key={item} className="flex items-center gap-2 text-[7px] text-white/20"><Check className="size-3 text-emerald-300" />{item}</p>
                ))}
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
