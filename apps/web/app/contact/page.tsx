import type { Metadata } from "next";
import { ArrowUpRight, Building2, Handshake, HelpCircle, Mail, MapPin, Newspaper, Sparkles, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "../../components/marketing/contact-form";
import { MarketingPageHero } from "../../components/marketing/page-sections";
import { Reveal } from "../../components/marketing/reveal";
import { MarketingShell } from "../../components/marketing/site-shell";

export const metadata: Metadata = {
  title: "Contact Echelon",
  description: "Talk to Echelon about early access, partnerships, integrations or the future of local commerce.",
};

export default function ContactPage() {
  return (
    <MarketingShell>
      <main>
        <MarketingPageHero
          eyebrow="Contact Echelon"
          title={
            <>
              Let’s build a simpler
              <span className="block bg-gradient-to-r from-white via-violet-200 to-indigo-300 bg-clip-text text-transparent">
                local economy together.
              </span>
            </>
          }
          description="Whether you run a business, want early access, have a partnership in mind or simply see the same opportunity we do—we would like to hear from you."
        />

        <section className="border-y border-white/[.055] bg-[#0b0b0f] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">The right conversation</p>
                <h2 className="mt-4 text-[34px] font-semibold leading-[1.06] tracking-[-.048em] text-white/88 sm:text-[44px]">Tell us where you fit into Echelon’s next chapter.</h2>
                <p className="mt-5 text-[11px] leading-6 text-white/27">Share enough context for us to make the reply useful. No generic sales sequence, no noise.</p>

                <div className="mt-9 space-y-3">
                  {([
                    [Building2, "Businesses", "Early access, multi-location needs and operational fit."],
                    [Handshake, "Partners", "Local networks, ecosystems, distribution and integration ideas."],
                    [Newspaper, "Media", "Company context, product direction and commentary."],
                    [HelpCircle, "General", "Product feedback, support and everything else."],
                  ] as Array<[LucideIcon, string, string]>).map(([Icon, title, description]) => (
                    <div key={title} className="flex items-start gap-3 rounded-xl border border-white/[.045] bg-white/[.015] p-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/[.035] text-violet-300"><Icon className="size-3.5" /></span>
                      <div><p className="text-[9px] font-semibold text-white/42">{title}</p><p className="mt-1 text-[8px] leading-4 text-white/18">{description}</p></div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-white/[.055] pt-6">
                  <div className="flex items-center gap-2 text-[9px] text-white/28"><MapPin className="size-3.5 text-violet-300" /> Perth, Western Australia</div>
                  <a href="mailto:hello@echelonapp.net" className="mt-3 flex items-center gap-2 text-[9px] text-white/28 transition hover:text-violet-300"><Mail className="size-3.5 text-violet-300" /> hello@echelonapp.net</a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <ContactForm />
            </Reveal>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1180px]">
            <Reveal className="text-center"><p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">Before you write</p><h2 className="mt-4 text-[32px] font-semibold tracking-[-.045em] text-white/88 sm:text-[44px]">The quickest paths into Echelon.</h2></Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                { icon: Sparkles, title: "Try the customer experience", description: "Use Echelon AI or browse live local services across Perth.", label: "Explore services", href: "/services" },
                { icon: Building2, title: "See the business product", description: "Open the complete WS Labs dashboard demonstration.", label: "View live demo", href: "/business-dashboard" },
                { icon: Handshake, title: "Understand the direction", description: "See the platform architecture and connected-market thesis.", label: "Explore platform", href: "/platform" },
              ].map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05}>
                  <Link href={item.href} className="group block h-full rounded-[22px] border border-white/[.06] bg-[#121217] p-6 transition hover:-translate-y-1 hover:border-white/[.11]">
                    <item.icon className="size-4 text-violet-300" /><h3 className="mt-6 text-[14px] font-semibold text-white/62">{item.title}</h3><p className="mt-3 text-[9px] leading-5 text-white/23">{item.description}</p><span className="mt-6 inline-flex items-center gap-1.5 text-[8px] font-semibold text-violet-300">{item.label}<ArrowUpRight className="size-3" /></span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
