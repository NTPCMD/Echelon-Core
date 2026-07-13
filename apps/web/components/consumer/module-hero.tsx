import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ConsumerModule } from "../../lib/modules";
import { GlowOrb, Reveal } from "../marketing/reveal";

/** Consistent hero band for a module landing page under /explore. */
export function ModuleHero({ module }: { module: ConsumerModule }) {
  const Icon = module.icon;
  return (
    <section className="relative isolate overflow-hidden border-b border-white/[.055] px-5 pb-14 pt-12 sm:px-8 sm:pb-16 sm:pt-16 lg:px-12">
      <div className="echelon-grid absolute inset-0 -z-20 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <GlowOrb className={`-left-24 top-8 -z-10 size-[360px] ${module.accent.bg}`} />

      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-[8px] font-semibold text-white/25 transition hover:text-white/60"
          >
            <ArrowLeft className="size-3.5" /> All modules
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-6 flex items-center gap-3">
            <span
              className={`inline-flex size-11 items-center justify-center rounded-2xl border ${module.accent.border} ${module.accent.bg} ${module.accent.text}`}
            >
              <Icon className="size-5" />
            </span>
            <span
              className={`rounded-full border px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[.12em] ${
                module.status === "live"
                  ? "border-emerald-400/12 bg-emerald-400/10 text-emerald-300"
                  : `${module.accent.border} ${module.accent.bg} ${module.accent.text}`
              }`}
            >
              {module.status === "live" ? "Live" : "Preview"}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-6 max-w-3xl text-[34px] font-semibold leading-[1.02] tracking-[-.05em] text-white/92 sm:text-[52px]">
            {module.hero.title}
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-5 max-w-xl text-[12px] leading-6 text-white/28">{module.hero.description}</p>
        </Reveal>
      </div>
    </section>
  );
}
