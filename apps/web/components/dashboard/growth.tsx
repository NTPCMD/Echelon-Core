"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Check,
  ChevronRight,
  CreditCard,
  ExternalLink,
  Globe2,
  Link2,
  LockKeyhole,
  Mail,
  MapPin,
  Plug,
  Save,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Webhook,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { chartData, services } from "./data";
import { EmptyState, PageHeader, SectionHeading } from "./page";

function Bars({ values, color = "from-violet-600/35 to-violet-300/80" }: { values: number[]; color?: string }) {
  const max = Math.max(...values);
  return (
    <div className="flex h-40 items-end gap-2">
      {values.map((value, index) => (
        <div key={index} className="group relative flex h-full flex-1 items-end">
          <motion.div initial={{ height: 0 }} animate={{ height: `${(value / max) * 100}%` }} transition={{ delay: index * .035, duration: .5 }} className={`w-full min-h-1 rounded-t-[5px] bg-gradient-to-t ${color} opacity-70 transition group-hover:opacity-100`} />
          <span className="absolute left-1/2 z-10 hidden -translate-x-1/2 rounded-lg border border-white/10 bg-[#1b1a21] px-2 py-1 text-[8px] text-white shadow-xl group-hover:block" style={{ bottom: `${(value / max) * 100 + 5}%` }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

export function AnalyticsPage() {
  const topServices = services.slice(0, 4);
  return (
    <>
      <PageHeader eyebrow="Intelligence" title="Analytics" description="Commercial performance, demand signals and customer behaviour in one decision layer." action={<div className="flex gap-2"><Button variant="outline">Last 12 months</Button><Button>Export report</Button></div>} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Gross revenue", value: "$486,240", change: "+22.4%", icon: CreditCard },
          { label: "Engagements", value: "284", change: "+16.5%", icon: BarChart3 },
          { label: "New customers", value: "96", change: "+21.4%", icon: Users },
          { label: "Conversion rate", value: "18.4%", change: "+3.2%", icon: Zap },
        ].map((item) => (
          <Card key={item.label} className="group transition hover:-translate-y-0.5 hover:border-white/[.1]">
            <CardContent className="p-5"><div className="flex items-center justify-between"><span className="grid size-9 place-items-center rounded-xl border border-violet-400/10 bg-violet-400/10 text-violet-300"><item.icon className="size-4" /></span><Badge tone="success"><ArrowUpRight className="mr-1 size-3" />{item.change}</Badge></div><p className="mt-5 text-[9px] font-medium uppercase tracking-[.13em] text-white/22">{item.label}</p><p className="mt-1.5 text-[26px] font-semibold tracking-[-.05em] text-white/90">{item.value}</p></CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.65fr_1fr]">
        <Card><CardHeader className="border-b border-white/[.055] pb-4"><SectionHeading title="Revenue performance" description="Recognised revenue by month" /><div className="flex gap-3 text-[8px] font-medium text-white/28"><span className="flex items-center gap-1.5"><i className="size-1.5 rounded-full bg-violet-400" />Current</span><span className="flex items-center gap-1.5"><i className="size-1.5 rounded-full bg-white/15" />Previous</span></div></CardHeader><CardContent><div className="mt-3 grid grid-cols-2 gap-5"><div><p className="text-[30px] font-semibold tracking-[-.05em] text-white/90">$486.2k</p><p className="mt-1 text-[9px] text-white/25">Year to date</p></div><div><p className="text-[30px] font-semibold tracking-[-.05em] text-white/90">$542.8k</p><p className="mt-1 text-[9px] text-white/25">Forecast</p></div></div><div className="relative mt-7"><div className="pointer-events-none absolute inset-0 flex flex-col justify-between">{Array.from({ length: 4 }).map((_, index) => <span key={index} className="border-t border-white/[.05]" />)}</div><Bars values={chartData} /></div><div className="mt-2 flex justify-between text-[8px] uppercase tracking-wider text-white/16">{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => <span key={month}>{month}</span>)}</div></CardContent></Card>
        <Card><CardHeader><SectionHeading title="Top service lines" description="By recognised revenue this quarter" /></CardHeader><CardContent className="space-y-5">{topServices.map((service, index) => { const share = [92, 74, 58, 42][index] ?? 35; return <div key={service.name}><div className="mb-2 flex items-center justify-between text-[10px]"><span className="font-medium text-white/55">{service.name}</span><span className="font-semibold text-white/72">{service.revenue}</span></div><div className="h-1.5 rounded-full bg-white/[.055]"><motion.div initial={{ width: 0 }} animate={{ width: `${share}%` }} transition={{ duration: .7, delay: index * .06 }} className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-300 shadow-[0_0_14px_rgba(124,108,248,.18)]" /></div></div>; })}</CardContent></Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card><CardHeader><SectionHeading title="Customer retention" description="Customers returning within 90 days" /></CardHeader><CardContent><div className="flex items-end gap-2"><p className="text-[30px] font-semibold tracking-[-.05em] text-white/90">78.4%</p><Badge tone="success">+6.2%</Badge></div><div className="mt-6"><Bars values={[50, 52, 54, 58, 57, 61, 66, 70, 74, 78]} color="from-emerald-600/25 to-emerald-300/75" /></div></CardContent></Card>
        <Card><CardHeader><SectionHeading title="Acquisition channels" description="How high-value customers discover WS Labs" /></CardHeader><CardContent className="space-y-4">{[{ label: "Founder network", value: 38, color: "bg-violet-400" }, { label: "Client referrals", value: 31, color: "bg-sky-400" }, { label: "Organic search", value: 19, color: "bg-emerald-400" }, { label: "Partnerships", value: 12, color: "bg-amber-300" }].map((source) => <div key={source.label}><div className="mb-1.5 flex justify-between text-[10px]"><span className="text-white/38">{source.label}</span><span className="font-semibold text-white/65">{source.value}%</span></div><div className="h-1.5 rounded-full bg-white/[.055]"><div className={`h-full rounded-full ${source.color}`} style={{ width: `${source.value}%` }} /></div></div>)}</CardContent></Card>
        <Card className="relative overflow-hidden border-violet-400/15 bg-gradient-to-br from-violet-500/[.1] to-indigo-500/[.035]"><div className="absolute -right-10 -top-10 size-28 rounded-full bg-violet-500/15 blur-3xl" /><CardContent className="relative p-5"><Sparkles className="size-5 text-violet-300" /><h3 className="mt-5 text-lg font-medium tracking-[-.025em] text-white/88">Your next growth opportunity</h3><p className="mt-2 text-[10px] leading-5 text-white/35">Packaging AI automation into a recurring advisory layer could add an estimated $184k in annual revenue.</p><Button size="sm" className="mt-5">Explore recommendation</Button></CardContent></Card>
      </div>
    </>
  );
}

const integrations = [
  { name: "Stripe", description: "Payments, deposits and invoices", icon: CreditCard, tone: "from-indigo-500/25 to-indigo-500/5 text-indigo-200", connected: true },
  { name: "GoHighLevel", description: "CRM, workflows and lifecycle", icon: Zap, tone: "from-emerald-500/20 to-emerald-500/5 text-emerald-200", connected: false },
  { name: "Google Calendar", description: "Two-way calendar sync", icon: Globe2, tone: "from-sky-500/20 to-sky-500/5 text-sky-200", connected: true },
  { name: "Mailchimp", description: "Campaigns and audience segments", icon: Mail, tone: "from-amber-400/20 to-amber-400/5 text-amber-100", connected: false },
  { name: "Google Business", description: "Reviews and business profile", icon: MapPin, tone: "from-rose-500/20 to-rose-500/5 text-rose-200", connected: true },
  { name: "Zapier", description: "Connect thousands of applications", icon: Link2, tone: "from-orange-500/20 to-orange-500/5 text-orange-200", connected: false },
];

export function IntegrationsPage() {
  const [connections, setConnections] = useState<Record<string, boolean>>(() => Object.fromEntries(integrations.map((item) => [item.name, item.connected])));
  const [search, setSearch] = useState("");
  const filtered = integrations.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      <PageHeader eyebrow="Ecosystem" title="Integrations" description="Connect Echelon to the systems that run WS Labs." />
      <div className="relative mb-5 max-w-md"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/22" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search integrations…" className="pl-9" /></div>
      {filtered.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((integration, index) => { const connected = connections[integration.name] ?? false; return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .05 }} key={integration.name}><Card className="group h-full transition hover:-translate-y-1 hover:border-white/[.11] hover:shadow-[0_24px_70px_rgba(0,0,0,.32)]"><CardContent className="p-5"><div className="flex items-start justify-between"><span className={`grid size-11 place-items-center rounded-xl bg-gradient-to-br ring-1 ring-white/[.06] ${integration.tone}`}><integration.icon className="size-5" /></span>{connected ? <Badge tone="success"><Check className="mr-1 size-3" />Connected</Badge> : <Badge>Available</Badge>}</div><h3 className="mt-5 text-sm font-semibold text-white/78">{integration.name}</h3><p className="mt-1 text-[10px] text-white/28">{integration.description}</p><div className="mt-5 flex items-center justify-between border-t border-white/[.055] pt-4"><Button variant={connected ? "outline" : "default"} size="sm" onClick={() => setConnections((current) => ({ ...current, [integration.name]: !connected }))}>{connected ? "Manage" : "Connect"}</Button><button className="text-white/20 transition hover:text-violet-300" aria-label={`Learn more about ${integration.name}`}><ExternalLink className="size-4" /></button></div></CardContent></Card></motion.div>; })}</div> : <EmptyState icon={Plug} title="No integrations found" description="Try a different search or browse available categories." />}
      <Card className="mt-5"><CardContent className="flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center"><span className="grid size-11 place-items-center rounded-xl border border-violet-400/10 bg-violet-400/10 text-violet-300"><Webhook className="size-5" /></span><div className="flex-1"><h3 className="text-sm font-semibold text-white/75">Build a custom integration</h3><p className="mt-1 text-[10px] text-white/28">Use webhooks and the Echelon API to connect your own systems.</p></div><Button variant="outline">Developer docs <ChevronRight className="size-4" /></Button></CardContent></Card>
    </>
  );
}

function SettingsRow({ icon: Icon, title, description, children }: { icon: React.ComponentType<{ className?: string }>; title: string; description: string; children: React.ReactNode }) {
  return <div className="flex flex-col gap-4 border-b border-white/[.055] py-5 last:border-0 sm:flex-row sm:items-center"><span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/[.055] bg-white/[.03] text-white/35"><Icon className="size-4" /></span><div className="flex-1"><p className="text-[11px] font-semibold text-white/68">{title}</p><p className="mt-1 text-[9px] leading-4 text-white/26">{description}</p></div>{children}</div>;
}

export function BusinessSettingsPage() {
  const [activeTab, setActiveTab] = useState("Business");
  const [notifications, setNotifications] = useState({ booking: true, review: true, marketing: false });
  const tabs = ["Business", "Bookings", "Notifications", "Payments", "Security"];
  return (
    <>
      <PageHeader eyebrow="Workspace" title="Settings" description="Control WS Labs’ profile, preferences and security." action={<Button><Save className="size-4" /> Save changes</Button>} />
      <div className="grid gap-5 lg:grid-cols-[210px_1fr]">
        <Card className="h-fit p-2"><nav>{tabs.map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[10px] font-medium transition ${activeTab === tab ? "bg-violet-400/10 text-violet-200" : "text-white/30 hover:bg-white/[.035] hover:text-white/65"}`}>{tab === "Business" ? <Settings2 className="size-4" /> : tab === "Bookings" || tab === "Payments" ? <CreditCard className="size-4" /> : tab === "Notifications" ? <Bell className="size-4" /> : <LockKeyhole className="size-4" />}{tab}</button>)}</nav></Card>
        <div>{activeTab === "Business" ? <Card><CardHeader><SectionHeading title="Business profile" description="This information appears across your Echelon workspace." /></CardHeader><CardContent><div className="flex flex-col gap-5 sm:flex-row"><div className="grid size-20 shrink-0 place-items-center rounded-[20px] border border-violet-400/15 bg-gradient-to-br from-violet-500/20 to-indigo-500/5 text-xl font-semibold text-violet-200 shadow-[0_18px_40px_rgba(0,0,0,.25)]">WS</div><div className="grid flex-1 gap-4 sm:grid-cols-2"><label className="text-[10px] font-medium text-white/46">Business name<Input defaultValue="WS Labs" className="mt-2" /></label><label className="text-[10px] font-medium text-white/46">Category<Input defaultValue="Digital product studio" className="mt-2" /></label><label className="text-[10px] font-medium text-white/46 sm:col-span-2">Public description<textarea defaultValue="An AI-first digital product studio helping ambitious companies design, build and scale category-defining experiences." rows={4} className="mt-2 w-full resize-none rounded-xl border p-3 text-sm outline-none" /></label><label className="text-[10px] font-medium text-white/46">Email<Input defaultValue="hello@wslabs.com.au" className="mt-2" /></label><label className="text-[10px] font-medium text-white/46">Phone<Input defaultValue="+61 8 6112 8400" className="mt-2" /></label><label className="text-[10px] font-medium text-white/46 sm:col-span-2">Address<Input defaultValue="Perth, Western Australia" className="mt-2" /></label></div></div></CardContent></Card> : activeTab === "Notifications" ? <Card><CardHeader><SectionHeading title="Notification preferences" description="Choose how and when Echelon contacts you." /></CardHeader><CardContent><SettingsRow icon={CreditCard} title="Booking activity" description="New, changed and cancelled sessions."><Switch label="Booking notifications" checked={notifications.booking} onCheckedChange={(booking) => setNotifications((current) => ({ ...current, booking }))} /></SettingsRow><SettingsRow icon={Star} title="New reviews" description="Receive an alert whenever a customer leaves feedback."><Switch label="Review notifications" checked={notifications.review} onCheckedChange={(review) => setNotifications((current) => ({ ...current, review }))} /></SettingsRow><SettingsRow icon={Sparkles} title="Growth intelligence" description="AI-powered recommendations and commercial signals."><Switch label="Marketing notifications" checked={notifications.marketing} onCheckedChange={(marketing) => setNotifications((current) => ({ ...current, marketing }))} /></SettingsRow></CardContent></Card> : <Card><CardContent className="p-6"><EmptyState icon={activeTab === "Security" ? ShieldCheck : activeTab === "Payments" ? CreditCard : Settings2} title={`${activeTab} settings`} description={`Configure your ${activeTab.toLowerCase()} preferences. This frontend state is ready to connect to your backend.`} action={<Button size="sm">Configure {activeTab.toLowerCase()}</Button>} /></CardContent></Card>}</div>
      </div>
    </>
  );
}
