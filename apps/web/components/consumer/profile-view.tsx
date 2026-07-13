"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Download,
  Eye,
  FileText,
  GraduationCap,
  MapPin,
  Pencil,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { type ReactNode, useEffect, useState } from "react";
import { type ConsumerProfile, profileCompleteness } from "../../lib/profile";
import { mergeProfile, useAccountStore } from "../../store/account";
import { Reveal } from "../marketing/reveal";

type Tab = "overview" | "jobs" | "freelance";

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="flex items-center gap-2.5"
      aria-pressed={on}
    >
      <span className={`relative h-5 w-9 rounded-full transition ${on ? "bg-emerald-500/80" : "bg-white/[.1]"}`}>
        <span className={`absolute top-0.5 size-4 rounded-full bg-white transition-all ${on ? "left-[18px]" : "left-0.5"}`} />
      </span>
      <span className={`text-[9px] font-semibold ${on ? "text-emerald-300" : "text-white/40"}`}>{label}</span>
    </button>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[20px] border border-white/[.06] bg-[#121217] p-5 sm:p-6">
      <h3 className="text-[11px] font-semibold text-white/55">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-full border border-white/[.06] bg-white/[.02] px-2.5 py-1.5 text-[8px] text-white/40">
          {item}
        </span>
      ))}
    </div>
  );
}

export function ProfileView({ profile: baseProfile }: { profile: ConsumerProfile }) {
  const overrides = useAccountStore((state) => state.profile);
  const updateJobSeeker = useAccountStore((state) => state.updateJobSeeker);
  const updateFreelancer = useAccountStore((state) => state.updateFreelancer);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const profile = mounted ? mergeProfile(baseProfile, overrides) : baseProfile;

  const [tab, setTab] = useState<Tab>("overview");
  const [editing, setEditing] = useState<null | "jobs" | "freelance">(null);
  const openToWork = profile.jobSeeker.openToWork;
  const acceptingWork = profile.freelancer.acceptingWork;
  const completeness = profileCompleteness(profile);

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: "overview", label: "Overview" },
    { id: "jobs", label: "Job seeker" },
    { id: "freelance", label: "Freelancer" },
  ];

  return (
    <div>
      {/* Header */}
      <Reveal>
        <div className="rounded-[24px] border border-white/[.06] bg-gradient-to-br from-violet-500/[.06] to-[#121217] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="grid size-20 shrink-0 place-items-center rounded-[22px] border border-white/[.1] bg-[#121217] text-[24px] font-semibold text-violet-200">
              {profile.initials}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-[26px] font-semibold tracking-[-.04em] text-white/90 sm:text-[32px]">{profile.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-[9px] text-white/30">
                <span>{profile.email}</span>
                <span className="flex items-center gap-1"><MapPin className="size-3" />{profile.location}</span>
                <span>{profile.memberSince}</span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-5">
                <Toggle on={openToWork} onChange={(v) => updateJobSeeker({ openToWork: v })} label="Open to work" />
                <Toggle on={acceptingWork} onChange={(v) => updateFreelancer({ acceptingWork: v })} label="Accepting freelance" />
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-center gap-3 sm:items-end">
              <div className="text-center sm:text-right">
                <div className="text-[24px] font-semibold text-violet-200">{completeness}%</div>
                <p className="text-[8px] text-white/30">Profile complete</p>
              </div>
              <Link
                href="/profile/preview"
                className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/[.08] px-3.5 text-[8px] font-semibold text-white/50 transition hover:text-white/85"
              >
                <Eye className="size-3" /> View public profile
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Tabs */}
      <div className="mt-6 flex gap-1 rounded-2xl border border-white/[.06] bg-[#121217] p-1">
        {tabs.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`flex-1 rounded-xl py-2.5 text-[9px] font-semibold transition ${tab === item.id ? "bg-violet-400/12 text-violet-200" : "text-white/32 hover:text-white/60"}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {tab === "overview" ? (
          <>
            <Reveal>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[20px] border border-sky-400/12 bg-gradient-to-br from-sky-500/[.06] to-[#121217] p-5">
                  <div className="flex items-center justify-between">
                    <span className="grid size-9 place-items-center rounded-xl bg-sky-400/10 text-sky-200"><BriefcaseBusiness className="size-4" /></span>
                    <span className={`rounded-full px-2 py-1 text-[7px] font-semibold ${openToWork ? "bg-emerald-400/10 text-emerald-300" : "bg-white/[.05] text-white/30"}`}>{openToWork ? "Open to work" : "Not looking"}</span>
                  </div>
                  <h3 className="mt-4 text-[13px] font-semibold text-white/70">{profile.jobSeeker.headline}</h3>
                  <p className="mt-2 text-[9px] leading-5 text-white/28">{profile.jobSeeker.availability} · {profile.jobSeeker.locationPref}</p>
                  <button onClick={() => setTab("jobs")} className="mt-4 flex items-center gap-1 text-[8px] font-semibold text-sky-300">View job profile <ArrowUpRight className="size-3" /></button>
                </div>
                <div className="rounded-[20px] border border-amber-300/12 bg-gradient-to-br from-amber-400/[.06] to-[#121217] p-5">
                  <div className="flex items-center justify-between">
                    <span className="grid size-9 place-items-center rounded-xl bg-amber-300/10 text-amber-100"><Zap className="size-4" /></span>
                    <span className={`rounded-full px-2 py-1 text-[7px] font-semibold ${acceptingWork ? "bg-emerald-400/10 text-emerald-300" : "bg-white/[.05] text-white/30"}`}>{acceptingWork ? "Available" : "Booked out"}</span>
                  </div>
                  <h3 className="mt-4 text-[13px] font-semibold text-white/70">{profile.freelancer.headline}</h3>
                  <p className="mt-2 text-[9px] leading-5 text-white/28">{profile.freelancer.hourlyRate} · {profile.freelancer.availability}</p>
                  <button onClick={() => setTab("freelance")} className="mt-4 flex items-center gap-1 text-[8px] font-semibold text-amber-200">View freelancer profile <ArrowUpRight className="size-3" /></button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="flex flex-col items-start justify-between gap-4 rounded-[20px] border border-violet-400/12 bg-[#121217] p-5 sm:flex-row sm:items-center">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 size-4 text-violet-300" />
                  <div>
                    <p className="text-[11px] font-semibold text-white/62">One profile, everywhere you apply.</p>
                    <p className="mt-1 text-[9px] text-white/26">Your details auto-fill when you apply for jobs or pitch for freelance briefs.</p>
                  </div>
                </div>
                <Link href="/applications" className="inline-flex h-9 shrink-0 items-center gap-2 rounded-xl border border-white/[.08] px-4 text-[8px] font-semibold text-white/55 transition hover:text-white/85">View applications <ArrowUpRight className="size-3" /></Link>
              </div>
            </Reveal>
          </>
        ) : null}

        {tab === "jobs" ? (
          <>
            <div className="flex justify-end">
              <button
                onClick={() => setEditing("jobs")}
                className="inline-flex h-9 items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-400/10 px-4 text-[8px] font-semibold text-violet-200 transition hover:bg-violet-400/15"
              >
                <Pencil className="size-3" /> Edit job profile
              </button>
            </div>
            <Reveal><Section title="Headline & summary">
              <p className="text-[13px] font-semibold text-white/68">{profile.jobSeeker.headline}</p>
              <p className="mt-3 text-[10px] leading-6 text-white/32">{profile.jobSeeker.summary}</p>
            </Section></Reveal>
            <Reveal delay={0.04}><Section title="Skills"><Chips items={profile.jobSeeker.skills} /></Section></Reveal>
            <Reveal delay={0.06}><Section title="Experience">
              <div className="space-y-4">
                {profile.jobSeeker.experience.map((exp) => (
                  <div key={exp.role} className="flex gap-3">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-sky-400/10 text-sky-200"><BriefcaseBusiness className="size-3.5" /></span>
                    <div>
                      <p className="text-[11px] font-semibold text-white/62">{exp.role}</p>
                      <p className="text-[8px] text-white/30">{exp.company} · {exp.period}</p>
                      <p className="mt-1.5 text-[9px] leading-5 text-white/28">{exp.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section></Reveal>
            <Reveal delay={0.08}><Section title="Education">
              {profile.jobSeeker.education.map((ed) => (
                <div key={ed.qualification} className="flex gap-3">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-white/[.04] text-white/40"><GraduationCap className="size-3.5" /></span>
                  <div>
                    <p className="text-[11px] font-semibold text-white/62">{ed.qualification}</p>
                    <p className="text-[8px] text-white/30">{ed.institution} · {ed.period}</p>
                  </div>
                </div>
              ))}
            </Section></Reveal>
            <Reveal delay={0.1}><Section title="Preferences & resume">
              <div className="grid gap-3 sm:grid-cols-2">
                <div><p className="text-[8px] text-white/28">Availability</p><p className="mt-1 text-[10px] font-medium text-white/55">{profile.jobSeeker.availability}</p></div>
                <div><p className="text-[8px] text-white/28">Location</p><p className="mt-1 text-[10px] font-medium text-white/55">{profile.jobSeeker.locationPref}</p></div>
                <div className="sm:col-span-2"><p className="text-[8px] text-white/28">Open to roles</p><div className="mt-2"><Chips items={profile.jobSeeker.desiredRoles} /></div></div>
              </div>
              <button className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl border border-white/[.08] px-4 text-[9px] font-semibold text-white/55 transition hover:text-white/85">
                <FileText className="size-3.5" /> {profile.jobSeeker.resumeFileName} <Download className="size-3.5" />
              </button>
            </Section></Reveal>
          </>
        ) : null}

        {tab === "freelance" ? (
          <>
            <div className="flex justify-end">
              <button
                onClick={() => setEditing("freelance")}
                className="inline-flex h-9 items-center gap-2 rounded-xl border border-amber-300/20 bg-amber-300/10 px-4 text-[8px] font-semibold text-amber-100 transition hover:bg-amber-300/15"
              >
                <Pencil className="size-3" /> Edit freelancer profile
              </button>
            </div>
            <Reveal><Section title="Headline & bio">
              <p className="text-[13px] font-semibold text-white/68">{profile.freelancer.headline}</p>
              <p className="mt-3 text-[10px] leading-6 text-white/32">{profile.freelancer.bio}</p>
              <div className="mt-4 flex flex-wrap gap-4 border-t border-white/[.05] pt-4 text-[9px]">
                <div><span className="text-white/28">Rate</span> <span className="font-semibold text-white/60">{profile.freelancer.hourlyRate}</span></div>
                <div><span className="text-white/28">Availability</span> <span className="font-semibold text-white/60">{profile.freelancer.availability}</span></div>
              </div>
            </Section></Reveal>
            <Reveal delay={0.04}><Section title="Skills"><Chips items={profile.freelancer.skills} /></Section></Reveal>
            <Reveal delay={0.06}><Section title="Services offered"><Chips items={profile.freelancer.services} /></Section></Reveal>
            <Reveal delay={0.08}><Section title="Portfolio">
              <div className="grid gap-3 sm:grid-cols-3">
                {profile.freelancer.portfolio.map((item) => (
                  <a key={item.title} href={item.link} className="group rounded-[16px] border border-white/[.06] bg-white/[.015] p-4 transition hover:border-white/[.12]">
                    <div className="grid h-16 place-items-center rounded-lg bg-gradient-to-br from-violet-500/25 to-indigo-400/15 text-white/40"><Zap className="size-5" /></div>
                    <p className="mt-3 text-[10px] font-semibold text-white/60">{item.title}</p>
                    <p className="mt-0.5 text-[8px] text-white/26">{item.category}</p>
                  </a>
                ))}
              </div>
            </Section></Reveal>
          </>
        ) : null}
      </div>

      <p className="mt-6 flex items-center gap-1.5 text-[7px] text-white/18">
        <Check className="size-2.5 text-emerald-300/60" /> Edits are saved on this device — they'll sync to your account
        once profiles go live.
      </p>

      <AnimatePresence>
        {editing ? (
          <ProfileEditModal
            mode={editing}
            profile={profile}
            onClose={() => setEditing(null)}
            onSaveJobs={(patch) => {
              updateJobSeeker(patch);
              setEditing(null);
            }}
            onSaveFreelance={(patch) => {
              updateFreelancer(patch);
              setEditing(null);
            }}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const modalField =
  "mt-2 h-11 w-full rounded-xl border border-white/[.075] bg-white/[.03] px-3.5 text-[10px] text-white/72 outline-none transition placeholder:text-white/18 focus:border-violet-400/35 focus:bg-white/[.045] focus:ring-4 focus:ring-violet-500/10";
const modalArea =
  "mt-2 w-full rounded-xl border border-white/[.075] bg-white/[.03] px-3.5 py-3 text-[10px] text-white/72 outline-none transition placeholder:text-white/18 focus:border-violet-400/35 focus:bg-white/[.045] focus:ring-4 focus:ring-violet-500/10";

function ProfileEditModal({
  mode,
  profile,
  onClose,
  onSaveJobs,
  onSaveFreelance,
}: {
  mode: "jobs" | "freelance";
  profile: ConsumerProfile;
  onClose: () => void;
  onSaveJobs: (patch: Partial<ConsumerProfile["jobSeeker"]>) => void;
  onSaveFreelance: (patch: Partial<ConsumerProfile["freelancer"]>) => void;
}) {
  const isJobs = mode === "jobs";
  const [headline, setHeadline] = useState(isJobs ? profile.jobSeeker.headline : profile.freelancer.headline);
  const [body, setBody] = useState(isJobs ? profile.jobSeeker.summary : profile.freelancer.bio);
  const [skills, setSkills] = useState(
    (isJobs ? profile.jobSeeker.skills : profile.freelancer.skills).join(", "),
  );
  const [availability, setAvailability] = useState(
    isJobs ? profile.jobSeeker.availability : profile.freelancer.availability,
  );
  const [extra, setExtra] = useState(isJobs ? profile.jobSeeker.locationPref : profile.freelancer.hourlyRate);

  function save() {
    const skillList = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
    if (isJobs) {
      onSaveJobs({ headline, summary: body, skills: skillList, availability, locationPref: extra });
    } else {
      onSaveFreelance({ headline, bio: body, skills: skillList, availability, hourlyRate: extra });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/60 p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-[24px] border border-white/[.09] bg-[#131318] p-6 shadow-[0_40px_120px_rgba(0,0,0,.6)]"
      >
        <div className="flex items-start justify-between">
          <h3 className="text-[15px] font-semibold text-white/82">
            {isJobs ? "Edit job-seeker profile" : "Edit freelancer profile"}
          </h3>
          <button
            onClick={onClose}
            className="grid size-7 place-items-center rounded-lg text-white/30 transition hover:bg-white/[.05] hover:text-white/70"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <label className="block text-[9px] font-medium text-white/34">
            Headline
            <input value={headline} onChange={(e) => setHeadline(e.target.value)} className={modalField} />
          </label>
          <label className="block text-[9px] font-medium text-white/34">
            {isJobs ? "Summary" : "Bio"}
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={3} className={modalArea} />
          </label>
          <label className="block text-[9px] font-medium text-white/34">
            Skills <span className="text-white/18">(comma separated)</span>
            <input value={skills} onChange={(e) => setSkills(e.target.value)} className={modalField} />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-[9px] font-medium text-white/34">
              Availability
              <input value={availability} onChange={(e) => setAvailability(e.target.value)} className={modalField} />
            </label>
            <label className="block text-[9px] font-medium text-white/34">
              {isJobs ? "Location preference" : "Hourly rate"}
              <input value={extra} onChange={(e) => setExtra(e.target.value)} className={modalField} />
            </label>
          </div>
        </div>

        <button
          onClick={save}
          className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-violet-500 text-[10px] font-semibold text-white shadow-[0_14px_38px_rgba(108,92,231,.22)] transition hover:-translate-y-px"
        >
          <Check className="size-3.5" /> Save changes
        </button>
      </motion.div>
    </motion.div>
  );
}
