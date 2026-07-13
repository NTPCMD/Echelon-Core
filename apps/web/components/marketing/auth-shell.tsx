import { ArrowLeft, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLogo } from "../dashboard/brand-logo";

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="dark echelon-site relative min-h-screen overflow-hidden bg-[#08080b] px-5 py-6 text-white sm:px-8 lg:px-12">
      <div className="echelon-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      <div className="pointer-events-none absolute -left-32 top-10 size-[430px] rounded-full bg-violet-600/18 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-[380px] rounded-full bg-indigo-600/14 blur-[110px]" />

      <div className="relative mx-auto flex max-w-[1280px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Echelon home">
          <BrandLogo compact />
          <span className="text-[12px] font-semibold uppercase tracking-[.2em] text-white/72">Echelon</span>
        </Link>
        <Link href="/" className="inline-flex items-center gap-2 text-[8px] font-semibold text-white/25 transition hover:text-white/60">
          <ArrowLeft className="size-3.5" /> Back to home
        </Link>
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-96px)] max-w-[1180px] items-center gap-16 py-12 lg:grid-cols-[.9fr_1.1fr]">
        <section className="hidden lg:block">
          <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">{eyebrow}</p>
          <h1 className="mt-5 max-w-xl text-[54px] font-semibold leading-[1.02] tracking-[-.055em] text-white/92">{title}</h1>
          <p className="mt-6 max-w-md text-[12px] leading-6 text-white/28">{description}</p>
          <div className="mt-9 space-y-3">
            {["One identity across the Echelon platform", "Secure, clear and easy to control", "Customer and business experiences connected"].map((item) => (
              <p key={item} className="flex items-center gap-2 text-[9px] text-white/27">
                <span className="grid size-5 place-items-center rounded-full bg-emerald-400/10 text-emerald-300"><Check className="size-3" /></span>
                {item}
              </p>
            ))}
          </div>
          <div className="mt-10 flex items-start gap-3 rounded-2xl border border-violet-400/10 bg-violet-400/[.045] p-4">
            <Sparkles className="mt-0.5 size-4 text-violet-300" />
            <div><p className="text-[9px] font-semibold text-white/42">Echelon early access</p><p className="mt-1 text-[8px] leading-4 text-white/18">Join the community shaping a more intelligent local economy.</p></div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[520px]">{children}</section>
      </div>
    </main>
  );
}
