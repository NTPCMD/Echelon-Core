"use client";

import { motion } from "framer-motion";
import { Bell, Check, CreditCard, Eye, LockKeyhole, Mail, Plus, Save, ShieldCheck, UserRound, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

type Tab = "Profile" | "Notifications" | "Privacy" | "Payments";
type NotificationPreferences = {
  booking: boolean;
  reminders: boolean;
  recommendations: boolean;
  marketing: boolean;
};
type PrivacyPreferences = {
  personalisation: boolean;
  location: boolean;
  history: boolean;
};

const notificationOptions: Array<{
  key: keyof NotificationPreferences;
  title: string;
  description: string;
}> = [
  { key: "booking", title: "Booking updates", description: "Confirmations, changes and cancellations." },
  { key: "reminders", title: "Appointment reminders", description: "Helpful reminders before an upcoming booking." },
  { key: "recommendations", title: "Useful recommendations", description: "Relevant services and local opportunities." },
  { key: "marketing", title: "Product news", description: "Occasional Echelon launches and announcements." },
];

const privacyOptions: Array<{
  key: keyof PrivacyPreferences;
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  { key: "personalisation", icon: Eye, title: "Personalised results", description: "Use account context to improve relevance." },
  { key: "location", icon: LockKeyhole, title: "Location context", description: "Use your saved area to prioritise nearby options." },
  { key: "history", icon: ShieldCheck, title: "Activity history", description: "Remember completed actions and saved preferences." },
];

export function CustomerSettings() {
  const [tab, setTab] = useState<Tab>("Profile");
  const [dirty, setDirty] = useState(false);
  const [toast, setToast] = useState("");
  const [profile, setProfile] = useState({ name: "Rav Singh", email: "rav@example.com", location: "Perth, Western Australia" });
  const [notifications, setNotifications] = useState<NotificationPreferences>({ booking: true, reminders: true, recommendations: true, marketing: false });
  const [privacy, setPrivacy] = useState<PrivacyPreferences>({ personalisation: true, location: true, history: true });

  const save = () => {
    setDirty(false);
    setToast("Preferences saved");
    window.setTimeout(() => setToast(""), 2200);
  };

  return (
    <>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">Your account</p><h1 className="mt-3 text-[38px] font-semibold tracking-[-.052em] text-white/90 sm:text-[52px]">Settings</h1><p className="mt-3 text-[11px] text-white/26">Manage your identity, notifications and personalisation controls.</p></div>
        <div className="flex items-center gap-3">{dirty ? <span className="text-[8px] text-amber-200">Unsaved changes</span> : null}<Button onClick={save} disabled={!dirty}><Save className="size-3.5" />Save changes</Button></div>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav className="flex h-fit gap-1 overflow-x-auto rounded-[20px] border border-white/[.06] bg-[#121217] p-2 lg:block">
          {([
            ["Profile", UserRound],
            ["Notifications", Bell],
            ["Privacy", ShieldCheck],
            ["Payments", CreditCard],
          ] as const).map(([label, Icon]) => (
            <button key={label} onClick={() => setTab(label)} className={`flex min-w-36 items-center gap-2 rounded-xl px-3 py-2.5 text-[9px] font-medium transition lg:mb-1 lg:w-full ${tab === label ? "bg-violet-400/10 text-violet-200" : "text-white/24 hover:bg-white/[.03] hover:text-white/50"}`}><Icon className="size-3.5" />{label}</button>
          ))}
        </nav>

        <motion.section key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-[24px] border border-white/[.06] bg-[#121217] p-5 sm:p-7">
          {tab === "Profile" ? (
            <div><div className="flex items-center gap-3 border-b border-white/[.055] pb-5"><span className="grid size-10 place-items-center rounded-full bg-violet-400/10 text-[10px] font-semibold text-violet-200">RS</span><div><h2 className="text-[13px] font-semibold text-white/58">Profile information</h2><p className="mt-1 text-[8px] text-white/18">Used across your Echelon account.</p></div></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-[9px] font-medium text-white/34">Full name<Input value={profile.name} onChange={(event) => { setProfile({ ...profile, name: event.target.value }); setDirty(true); }} className="mt-2" /></label><label className="text-[9px] font-medium text-white/34">Email<Input value={profile.email} type="email" onChange={(event) => { setProfile({ ...profile, email: event.target.value }); setDirty(true); }} className="mt-2" /></label><label className="text-[9px] font-medium text-white/34 sm:col-span-2">Home location<Input value={profile.location} onChange={(event) => { setProfile({ ...profile, location: event.target.value }); setDirty(true); }} className="mt-2" /></label></div><div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[.055] bg-white/[.02] p-4"><Mail className="mt-0.5 size-4 text-violet-300" /><div><p className="text-[9px] font-semibold text-white/40">Email verification</p><p className="mt-1 text-[8px] text-emerald-300">Verified and ready for booking confirmations.</p></div></div></div>
          ) : null}

          {tab === "Notifications" ? (
            <div><div className="border-b border-white/[.055] pb-5"><h2 className="text-[13px] font-semibold text-white/58">Notification preferences</h2><p className="mt-1 text-[8px] text-white/18">Choose what deserves your attention.</p></div><div className="mt-2 divide-y divide-white/[.05]">{notificationOptions.map((option) => <div key={option.key} className="flex items-center gap-4 py-5"><div className="min-w-0 flex-1"><p className="text-[10px] font-semibold text-white/42">{option.title}</p><p className="mt-1 text-[8px] text-white/18">{option.description}</p></div><Switch checked={notifications[option.key]} onCheckedChange={(checked) => { setNotifications({ ...notifications, [option.key]: checked }); setDirty(true); }} label={option.title} /></div>)}</div></div>
          ) : null}

          {tab === "Privacy" ? (
            <div><div className="border-b border-white/[.055] pb-5"><h2 className="text-[13px] font-semibold text-white/58">Privacy and personalisation</h2><p className="mt-1 text-[8px] text-white/18">Control how context improves your Echelon experience.</p></div><div className="mt-2 divide-y divide-white/[.05]">{privacyOptions.map((option) => <div key={option.key} className="flex items-center gap-4 py-5"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/[.03] text-violet-300"><option.icon className="size-3.5" /></span><div className="min-w-0 flex-1"><p className="text-[10px] font-semibold text-white/42">{option.title}</p><p className="mt-1 text-[8px] text-white/18">{option.description}</p></div><Switch checked={privacy[option.key]} onCheckedChange={(checked) => { setPrivacy({ ...privacy, [option.key]: checked }); setDirty(true); }} label={option.title} /></div>)}</div><div className="mt-6 rounded-xl border border-emerald-400/10 bg-emerald-400/[.035] p-4"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 size-4 text-emerald-300" /><div><p className="text-[9px] font-semibold text-white/40">Your context remains controllable.</p><p className="mt-1 text-[8px] leading-4 text-white/18">You can change these settings or request eligible account data at any time.</p></div></div></div></div>
          ) : null}

          {tab === "Payments" ? (
            <div>
              <div className="border-b border-white/[.055] pb-5">
                <h2 className="text-[13px] font-semibold text-white/58">Payment methods</h2>
                <p className="mt-1 text-[8px] text-white/18">Cards for fast, secure checkout across every module.</p>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  { brand: "Visa", last4: "4242", expiry: "08/28", isDefault: true, tone: "from-violet-500/30 to-indigo-500/15" },
                  { brand: "Mastercard", last4: "8210", expiry: "11/27", isDefault: false, tone: "from-amber-400/25 to-rose-500/15" },
                ].map((card) => (
                  <div key={card.last4} className="flex items-center gap-4 rounded-[18px] border border-white/[.06] bg-white/[.015] p-4">
                    <span className={`grid h-10 w-14 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${card.tone} text-[8px] font-semibold text-white/80`}>
                      {card.brand}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold text-white/55">•••• •••• •••• {card.last4}</p>
                      <p className="mt-0.5 text-[8px] text-white/20">Expires {card.expiry}</p>
                    </div>
                    {card.isDefault ? (
                      <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[7px] font-semibold text-emerald-300">Default</span>
                    ) : (
                      <button className="text-[8px] font-semibold text-white/28 transition hover:text-white/60">Make default</button>
                    )}
                  </div>
                ))}
                <button
                  disabled
                  className="flex w-full items-center justify-center gap-2 rounded-[18px] border border-dashed border-white/[.09] py-4 text-[9px] font-semibold text-white/25"
                >
                  <Plus className="size-3.5" /> Add payment method
                </button>
              </div>
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[.055] bg-white/[.02] p-4">
                <LockKeyhole className="mt-0.5 size-4 text-violet-300" />
                <div>
                  <p className="text-[9px] font-semibold text-white/40">Powered by Stripe at launch.</p>
                  <p className="mt-1 text-[8px] leading-4 text-white/18">
                    Card details are stored with our payment provider, never on Echelon. This is a preview — no cards are charged.
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </motion.section>
      </div>

      {toast ? <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 rounded-xl border border-emerald-400/15 bg-[#15191a] px-4 py-3 text-[9px] font-medium text-emerald-200 shadow-2xl"><Check className="size-3.5" />{toast}</motion.div> : null}
    </>
  );
}
