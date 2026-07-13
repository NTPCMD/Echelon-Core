"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "../../components/dashboard/brand-logo";
import { consumerModules } from "../../lib/modules";

const cities = ["Perth", "Fremantle", "Joondalup", "Mandurah", "Rockingham"];

export default function WelcomePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [city, setCity] = useState("Perth");
  const [interests, setInterests] = useState<string[]>(["services"]);

  function toggleInterest(slug: string) {
    setInterests((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  }

  const steps = ["Location", "Interests", "Ready"];

  return (
    <main className="dark echelon-site relative min-h-screen overflow-hidden bg-[#08080b] px-5 py-6 text-white sm:px-8 lg:px-12">
      <div className="echelon-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      <div className="pointer-events-none absolute -left-32 top-10 size-[430px] rounded-full bg-violet-600/18 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-[380px] rounded-full bg-indigo-600/14 blur-[110px]" />

      <div className="relative mx-auto flex max-w-[1180px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Echelon home">
          <BrandLogo compact />
          <span className="text-[12px] font-semibold uppercase tracking-[.2em] text-white/72">Echelon</span>
        </Link>
        <Link href="/dashboard" className="text-[8px] font-semibold text-white/25 transition hover:text-white/60">
          Skip for now
        </Link>
      </div>

      <div className="relative mx-auto mt-10 w-full max-w-[560px] sm:mt-16">
        {/* Progress */}
        <div className="flex items-center gap-2">
          {steps.map((label, index) => (
            <div key={label} className="flex flex-1 items-center gap-2">
              <div
                className={`h-1 flex-1 rounded-full transition ${
                  index <= step ? "bg-violet-500" : "bg-white/[.08]"
                }`}
              />
            </div>
          ))}
        </div>
        <p className="mt-3 text-[8px] font-semibold uppercase tracking-[.16em] text-violet-300/70">
          Step {step + 1} of {steps.length} · {steps[step]}
        </p>

        <div className="mt-6 rounded-[26px] border border-white/[.07] bg-[#121217] p-6 shadow-[0_30px_100px_rgba(0,0,0,.38)] sm:p-8">
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div key="location" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <h1 className="text-[26px] font-semibold tracking-[-.045em] text-white/82">Where are you based?</h1>
                <p className="mt-2 text-[10px] text-white/26">We'll surface what's local to you first.</p>
                <div className="mt-6 space-y-2">
                  {cities.map((option) => {
                    const active = option === city;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setCity(option)}
                        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left text-[11px] font-semibold transition ${
                          active
                            ? "border-violet-400/30 bg-violet-400/10 text-violet-100"
                            : "border-white/[.07] bg-white/[.02] text-white/45 hover:text-white/75"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className="size-3.5" /> {option}, WA
                        </span>
                        {active ? <Check className="size-4 text-violet-300" /> : null}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : null}

            {step === 1 ? (
              <motion.div key="interests" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <h1 className="text-[26px] font-semibold tracking-[-.045em] text-white/82">What are you here for?</h1>
                <p className="mt-2 text-[10px] text-white/26">Pick a few — you can change these anytime.</p>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {consumerModules.map((module) => {
                    const Icon = module.icon;
                    const active = interests.includes(module.slug);
                    return (
                      <button
                        key={module.slug}
                        type="button"
                        onClick={() => toggleInterest(module.slug)}
                        className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition ${
                          active
                            ? `${module.accent.border} ${module.accent.bg}`
                            : "border-white/[.07] bg-white/[.02] hover:border-white/[.12]"
                        }`}
                      >
                        <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${module.accent.bg} ${module.accent.text}`}>
                          <Icon className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={`block text-[10px] font-semibold ${active ? "text-white/80" : "text-white/50"}`}>
                            {module.name}
                          </span>
                        </span>
                        {active ? <Check className={`size-3.5 ${module.accent.text}`} /> : null}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : null}

            {step === 2 ? (
              <motion.div key="ready" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-violet-400/10 text-violet-200">
                  <Sparkles className="size-7" />
                </span>
                <h1 className="mt-5 text-[26px] font-semibold tracking-[-.045em] text-white/82">You're all set.</h1>
                <p className="mx-auto mt-2 max-w-xs text-[10px] leading-5 text-white/28">
                  We've tuned Echelon to {city} and {interests.length} interest{interests.length === 1 ? "" : "s"}. Services
                  is live now — the rest are on the way.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-1.5">
                  {interests.map((slug) => {
                    const module = consumerModules.find((item) => item.slug === slug);
                    if (!module) return null;
                    return (
                      <span
                        key={slug}
                        className={`rounded-full border ${module.accent.border} ${module.accent.bg} px-2.5 py-1 text-[8px] font-semibold ${module.accent.text}`}
                      >
                        {module.name}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="mt-7 flex gap-2">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((value) => value - 1)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[.08] px-4 text-[9px] font-semibold text-white/50 transition hover:text-white/80"
              >
                <ArrowLeft className="size-3.5" /> Back
              </button>
            ) : null}
            {step < 2 ? (
              <button
                type="button"
                disabled={step === 1 && interests.length === 0}
                onClick={() => setStep((value) => value + 1)}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-violet-500 text-[10px] font-semibold text-white shadow-[0_14px_38px_rgba(108,92,231,.22)] disabled:opacity-40"
              >
                Continue <ArrowRight className="size-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-violet-500 text-[10px] font-semibold text-white shadow-[0_14px_38px_rgba(108,92,231,.22)]"
              >
                Go to my dashboard <ArrowRight className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
