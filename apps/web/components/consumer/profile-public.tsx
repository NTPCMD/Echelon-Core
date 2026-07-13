"use client";

import {
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  MessageSquareText,
  Star,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type ConsumerProfile } from "../../lib/profile";
import { mergeProfile, useAccountStore } from "../../store/account";
import { Reveal } from "../marketing/reveal";

/**
 * The employer/client-facing view of a consumer's profile — what a business
 * sees when this person applies for a role or pitches for a brief.
 */
export function ProfilePublic({ profile: baseProfile }: { profile: ConsumerProfile }) {
  const overrides = useAccountStore((state) => state.profile);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const profile = mounted ? mergeProfile(baseProfile, overrides) : baseProfile;

  return (
    <div className="mx-auto max-w-[760px]">
      <div className="flex items-center justify-between">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-[9px] font-semibold text-white/30 transition hover:text-white/65"
        >
          <ArrowLeft className="size-3.5" /> Back to your profile
        </Link>
        <span className="rounded-full border border-violet-400/15 bg-violet-400/[.07] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[.12em] text-violet-200">
          Public preview
        </span>
      </div>

      <Reveal>
        <div className="mt-6 rounded-[26px] border border-white/[.07] bg-gradient-to-br from-violet-500/[.06] to-[#121217] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="grid size-20 shrink-0 place-items-center rounded-[22px] border border-white/[.1] bg-[#121217] text-[24px] font-semibold text-violet-200">
              {profile.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[26px] font-semibold tracking-[-.04em] text-white/90">{profile.name}</h1>
                <span className="flex items-center gap-1 rounded-full border border-emerald-400/10 bg-emerald-400/10 px-2.5 py-1 text-[8px] font-semibold text-emerald-300">
                  <BadgeCheck className="size-3" /> Verified
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-[9px] text-white/30">
                <span className="flex items-center gap-1">
                  <MapPin className="size-3" />
                  {profile.location}
                </span>
                <span>{profile.memberSince}</span>
                <span className="flex items-center gap-1 text-amber-100">
                  <Star className="size-3 fill-current" /> 4.9 on Echelon
                </span>
              </div>
            </div>
            <button className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-[9px] font-semibold text-white">
              <MessageSquareText className="size-3.5" /> Contact
            </button>
          </div>
        </div>
      </Reveal>

      <div className="mt-5 space-y-4">
        {profile.jobSeeker.openToWork ? (
          <Reveal>
            <section className="rounded-[22px] border border-sky-400/12 bg-[#121217] p-6">
              <div className="flex items-center gap-2">
                <span className="grid size-9 place-items-center rounded-xl bg-sky-400/10 text-sky-200">
                  <BriefcaseBusiness className="size-4" />
                </span>
                <div>
                  <h2 className="text-[13px] font-semibold text-white/72">{profile.jobSeeker.headline}</h2>
                  <p className="text-[8px] text-white/28">
                    {profile.jobSeeker.availability} · {profile.jobSeeker.locationPref}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[10px] leading-6 text-white/32">{profile.jobSeeker.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.jobSeeker.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-white/[.06] bg-white/[.02] px-2.5 py-1.5 text-[8px] text-white/40">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-5 space-y-3 border-t border-white/[.05] pt-4">
                {profile.jobSeeker.experience.map((exp) => (
                  <div key={exp.role} className="flex gap-3">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-white/[.04] text-white/35">
                      <BriefcaseBusiness className="size-3" />
                    </span>
                    <div>
                      <p className="text-[10px] font-semibold text-white/58">{exp.role}</p>
                      <p className="text-[8px] text-white/26">
                        {exp.company} · {exp.period}
                      </p>
                    </div>
                  </div>
                ))}
                {profile.jobSeeker.education.map((ed) => (
                  <div key={ed.qualification} className="flex gap-3">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-white/[.04] text-white/35">
                      <GraduationCap className="size-3" />
                    </span>
                    <div>
                      <p className="text-[10px] font-semibold text-white/58">{ed.qualification}</p>
                      <p className="text-[8px] text-white/26">
                        {ed.institution} · {ed.period}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        ) : null}

        {profile.freelancer.acceptingWork ? (
          <Reveal delay={0.05}>
            <section className="rounded-[22px] border border-amber-300/12 bg-[#121217] p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="grid size-9 place-items-center rounded-xl bg-amber-300/10 text-amber-100">
                    <Zap className="size-4" />
                  </span>
                  <div>
                    <h2 className="text-[13px] font-semibold text-white/72">{profile.freelancer.headline}</h2>
                    <p className="text-[8px] text-white/28">{profile.freelancer.availability}</p>
                  </div>
                </div>
                <span className="text-[16px] font-semibold text-white/72">{profile.freelancer.hourlyRate}</span>
              </div>
              <p className="mt-4 text-[10px] leading-6 text-white/32">{profile.freelancer.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.freelancer.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-white/[.06] bg-white/[.02] px-2.5 py-1.5 text-[8px] text-white/40">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-5 grid gap-3 border-t border-white/[.05] pt-4 sm:grid-cols-3">
                {profile.freelancer.portfolio.map((item) => (
                  <div key={item.title} className="rounded-[14px] border border-white/[.06] bg-white/[.015] p-3">
                    <div className="grid h-12 place-items-center rounded-lg bg-gradient-to-br from-violet-500/25 to-indigo-400/15 text-white/40">
                      <Zap className="size-4" />
                    </div>
                    <p className="mt-2 text-[9px] font-semibold text-white/58">{item.title}</p>
                    <p className="text-[7px] text-white/24">{item.category}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        ) : null}
      </div>

      <p className="mt-6 text-center text-[7px] text-white/16">
        This is how businesses see you when you apply. Contact details stay private until you share them.
      </p>
    </div>
  );
}
