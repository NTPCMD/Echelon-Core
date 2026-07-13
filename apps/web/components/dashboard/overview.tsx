"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  CalendarCheck,
  ChevronRight,
  Clock3,
  DollarSign,
  ExternalLink,
  FileText,
  MessageSquare,
  Plus,
  Sparkles,
  Star,
  TrendingUp,
  UserPlus,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Input } from "../ui/input";
import { downloadTextFile } from "./actions";
import { bookings, chartData, customers, reviews } from "./data";
import { fadeUp, PageHeader, SectionHeading, stagger } from "./page";

type RevenuePeriod = "12 months" | "30 days";
type OverviewAction = "proposal" | "automation" | null;

const kpis = [
  { label: "Today’s revenue", value: "$18,420", change: "+24.8%", detail: "$14,760 this time last Friday", icon: DollarSign, accent: "violet" },
  { label: "Bookings", value: "14", change: "+16.7%", detail: "11 confirmed · 3 pending", icon: CalendarCheck, accent: "blue" },
  { label: "Active customers", value: "1,429", change: "+8.4%", detail: "96 new this quarter", icon: Users, accent: "emerald" },
  { label: "Client rating", value: "4.96", change: "+0.08", detail: "386 verified reviews", icon: Star, accent: "amber" },
  { label: "Unread messages", value: "7", change: "3 urgent", detail: "Median reply time · 8m", icon: MessageSquare, accent: "rose" },
];

const accentStyles = {
  violet: "from-violet-400/20 to-violet-500/[.04] text-violet-300 ring-violet-400/15",
  blue: "from-sky-400/15 to-blue-500/[.035] text-sky-300 ring-sky-400/15",
  emerald: "from-emerald-400/15 to-emerald-500/[.035] text-emerald-300 ring-emerald-400/15",
  amber: "from-amber-300/15 to-amber-500/[.03] text-amber-200 ring-amber-300/15",
  rose: "from-rose-400/15 to-rose-500/[.03] text-rose-300 ring-rose-400/15",
};

function RevenueChart({ period, onInspect }: { period: RevenuePeriod; onInspect: (label: string, value: number) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const values = period === "12 months" ? chartData : chartData.slice(-8);
  const labels = period === "12 months"
    ? ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    : ["18 May", "22 May", "26 May", "30 May", "3 Jun", "7 Jun", "11 Jun", "14 Jun"];
  const maximum = Math.max(...values);

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[34px] font-semibold tracking-[-.055em] text-white">{period === "12 months" ? "$486,240" : "$68,240"}</p>
          <div className="mt-2 flex items-center gap-2"><Badge tone="success"><ArrowUpRight className="mr-1 size-3" />{period === "12 months" ? "22.4%" : "18.6%"}</Badge><span className="text-[10px] text-white/28">vs. previous period</span></div>
        </div>
        <div className="flex items-end gap-6"><div><p className="text-[9px] uppercase tracking-[.14em] text-white/20">Forecast</p><p className="mt-1 text-sm font-semibold text-white/70">{period === "12 months" ? "$542.8k" : "$74.5k"}</p></div><div><p className="text-[9px] uppercase tracking-[.14em] text-white/20">Target</p><p className="mt-1 text-sm font-semibold text-white/70">{period === "12 months" ? "$520k" : "$72k"}</p></div></div>
      </div>
      <div className="relative mt-8 flex h-56 items-end gap-2 sm:gap-3">
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">{Array.from({ length: 4 }).map((_, index) => <span key={index} className="border-t border-white/[.05]" />)}</div>
        {values.map((value, index) => {
          const active = hovered === index;
          const label = labels[index] ?? "Period";
          return (
            <button
              key={label}
              onClick={() => onInspect(label, value)}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              aria-label={`${label} revenue $${value * 4200}`}
              className="group relative z-10 flex h-full flex-1 items-end outline-none"
            >
              {active ? <motion.span layoutId="chart-tooltip" className="absolute left-1/2 z-20 -translate-x-1/2 rounded-lg border border-white/10 bg-[#1b1a21] px-2 py-1.5 text-[9px] font-semibold text-white shadow-2xl" style={{ bottom: `${(value / maximum) * 82 + 7}%` }}>${(value * 4.2).toFixed(1)}k</motion.span> : null}
              <motion.span initial={{ height: 0 }} animate={{ height: `${(value / maximum) * 82}%` }} transition={{ delay: index * .035, duration: .6, ease: [.22, 1, .36, 1] }} className={`w-full rounded-t-[6px] border-t transition-all duration-200 ${active ? "border-violet-300/60 bg-gradient-to-t from-violet-600/45 to-violet-300/85 shadow-[0_0_28px_rgba(124,108,248,.22)]" : "border-white/[.08] bg-gradient-to-t from-violet-600/20 to-violet-400/55 group-hover:from-violet-600/35 group-hover:to-violet-300/75"}`} />
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex justify-between text-[8px] font-medium uppercase tracking-[.08em] text-white/18">{labels.map((label) => <span key={label}>{label}</span>)}</div>
    </div>
  );
}

const schedule = [
  { time: "9:30", period: "AM", name: "Northstar Capital", service: "Product strategy", lead: "Rav", color: "bg-violet-400" },
  { time: "11:30", period: "AM", name: "Atlas Logistics", service: "AI workflow audit", lead: "Maya", color: "bg-sky-400" },
  { time: "1:30", period: "PM", name: "Form House", service: "Brand system review", lead: "Sofia", color: "bg-amber-300" },
  { time: "3:00", period: "PM", name: "Aperture Group", service: "Technical advisory", lead: "Daniel", color: "bg-emerald-400" },
];

const activities = [
  { icon: DollarSign, title: "Invoice WS-1048 was paid", detail: "Northstar Capital · $24,800", time: "4 min", color: "text-emerald-300 bg-emerald-400/10" },
  { icon: UserPlus, title: "New enterprise lead", detail: "Eleanor Grant from Meridian Health", time: "18 min", color: "text-violet-300 bg-violet-400/10" },
  { icon: Star, title: "New 5-star review", detail: "“Exceptional strategic clarity.”", time: "2h", color: "text-amber-200 bg-amber-300/10" },
  { icon: FileText, title: "Proposal viewed", detail: "Lumen Health · Experience transformation", time: "3h", color: "text-sky-300 bg-sky-400/10" },
];

export function OverviewDashboard() {
  const [period, setPeriod] = useState<RevenuePeriod>("12 months");
  const [activeAction, setActiveAction] = useState<OverviewAction>(null);
  const [actionDraft, setActionDraft] = useState({ client: "", detail: "" });
  const [toast, setToast] = useState("");
  const router = useRouter();

  const announce = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const downloadBrief = () => {
    downloadTextFile(
      "ws-labs-daily-brief.txt",
      [
        "WS Labs — Daily Business Brief",
        "",
        "Revenue today: $18,420 (+24.8%)",
        "Bookings: 14 (11 confirmed, 3 pending)",
        "Active customers: 1,429",
        "Client rating: 4.96",
        "",
        "AI signal: Enterprise conversion is accelerating. Packaging strategy workshops into recurring advisory could add approximately $86.4k per quarter.",
      ].join("\n"),
    );
    announce("Daily brief downloaded");
  };

  const completeAction = () => {
    const message = activeAction === "proposal" ? `Proposal draft created for ${actionDraft.client}` : "Automation run queued";
    setActiveAction(null);
    setActionDraft({ client: "", detail: "" });
    announce(message);
  };

  const quickActions = [
    { icon: Plus, label: "New booking", onClick: () => router.push("/business-dashboard/bookings?create=booking") },
    { icon: UserPlus, label: "Add client", onClick: () => router.push("/business-dashboard/customers?create=customer") },
    { icon: FileText, label: "Create proposal", onClick: () => setActiveAction("proposal") },
    { icon: Zap, label: "Run automation", onClick: () => setActiveAction("automation") },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Command centre · Friday, 14 June"
        title="Good morning, Rav"
        description="WS Labs is performing ahead of plan. Here’s the signal behind today’s momentum."
        action={<div className="flex gap-2"><Button variant="outline" onClick={downloadBrief}>Download brief</Button><Button onClick={() => router.push("/business-dashboard/bookings?create=booking")}><Plus className="size-4" /> New engagement</Button></div>}
      />

      <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {kpis.map((kpi) => <motion.div key={kpi.label} variants={fadeUp}><Card className="group relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/[.11] hover:shadow-[0_26px_80px_rgba(0,0,0,.34)]"><div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition group-hover:opacity-100" /><CardContent className="p-[18px]"><div className="flex items-start justify-between"><div className={`grid size-9 place-items-center rounded-xl bg-gradient-to-br ring-1 ${accentStyles[kpi.accent as keyof typeof accentStyles]}`}><kpi.icon className="size-4" /></div><span className="rounded-full bg-white/[.035] px-2 py-1 text-[8px] font-semibold text-white/35">{kpi.change}</span></div><p className="mt-5 text-[9px] font-medium uppercase tracking-[.12em] text-white/24">{kpi.label}</p><motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 }} className="mt-1.5 text-[25px] font-semibold tracking-[-.045em] text-white/92">{kpi.value}</motion.p><p className="mt-1.5 text-[9px] text-white/25">{kpi.detail}</p></CardContent></Card></motion.div>)}
      </motion.div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.75fr)_minmax(340px,.75fr)]">
        <Card className="overflow-hidden"><CardHeader className="border-b border-white/[.055] pb-4"><SectionHeading title="Revenue performance" description="Recognised revenue across all client engagements" /><div className="flex rounded-lg border border-white/[.06] bg-white/[.025] p-0.5 text-[9px] font-semibold">{(["12 months", "30 days"] as RevenuePeriod[]).map((item) => <button key={item} onClick={() => setPeriod(item)} className={`rounded-md px-2.5 py-1.5 transition ${period === item ? "bg-white/[.08] text-white/70 shadow-sm" : "text-white/25 hover:text-white/50"}`}>{item}</button>)}</div></CardHeader><CardContent><RevenueChart period={period} onInspect={(label, value) => announce(`${label} revenue: $${(value * 4.2).toFixed(1)}k`)} /></CardContent></Card>
        <Card><CardHeader><SectionHeading title="Today’s agenda" description="4 sessions · $6,400 booked" action={<Button variant="ghost" size="sm" onClick={() => router.push("/business-dashboard/calendar")}>Calendar <ChevronRight className="size-3.5" /></Button>} /></CardHeader><CardContent className="space-y-1 pt-3">{schedule.map((item, index) => <motion.button onClick={() => router.push("/business-dashboard/calendar")} key={item.time} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .12 + index * .06 }} className="group flex w-full items-center gap-3 rounded-xl px-1 py-3 text-left transition hover:bg-white/[.02]"><div className="w-10 text-right"><p className="text-[11px] font-semibold text-white/75">{item.time}</p><p className="text-[8px] text-white/22">{item.period}</p></div><span className={`h-9 w-px rounded-full ${item.color} shadow-[0_0_10px_currentColor]`} /><div className="min-w-0 flex-1"><p className="truncate text-[11px] font-semibold text-white/72">{item.name}</p><p className="mt-0.5 truncate text-[9px] text-white/25">{item.service} · {item.lead}</p></div><ChevronRight className="size-3.5 text-white/15 transition group-hover:translate-x-0.5 group-hover:text-white/50" /></motion.button>)}<div className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-white/[.055] bg-white/[.022] py-2.5 text-[9px] font-medium text-white/28"><Clock3 className="size-3.5" /> Focus block begins at 4:15 PM</div></CardContent></Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,.72fr)_minmax(300px,.62fr)]">
        <Card><CardHeader><SectionHeading title="Upcoming bookings" description="High-value sessions requiring attention" action={<Button variant="ghost" size="sm" onClick={() => router.push("/business-dashboard/bookings")}>View all <ChevronRight className="size-3.5" /></Button>} /></CardHeader><CardContent className="overflow-x-auto px-0 pb-2"><table className="w-full min-w-[620px] text-left"><thead><tr className="border-b border-white/[.055] text-[8px] font-semibold uppercase tracking-[.12em] text-white/18"><th className="px-5 py-3">Client</th><th className="px-3 py-3">Engagement</th><th className="px-3 py-3">Status</th><th className="px-5 py-3 text-right">Value</th></tr></thead><tbody>{bookings.slice(0, 4).map((booking, index) => <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .16 + index * .05 }} key={booking.id} tabIndex={0} onClick={() => router.push("/business-dashboard/bookings")} onKeyDown={(event) => { if (event.key === "Enter") router.push("/business-dashboard/bookings"); }} className="cursor-pointer border-b border-white/[.045] last:border-0 hover:bg-white/[.025]"><td className="px-5 py-3"><div className="flex items-center gap-2.5"><Avatar initials={booking.initials} className="size-8" /><div><p className="text-[10px] font-semibold text-white/72">{booking.customer}</p><p className="text-[8px] text-white/20">{booking.id}</p></div></div></td><td className="px-3 py-3 text-[10px] text-white/38">{booking.service}</td><td className="px-3 py-3"><Badge tone={booking.status === "Confirmed" ? "success" : booking.status === "Pending" ? "warning" : "neutral"}>{booking.status}</Badge></td><td className="px-5 py-3 text-right text-[10px] font-semibold text-white/68">{booking.amount}</td></motion.tr>)}</tbody></table></CardContent></Card>

        <Card className="relative overflow-hidden border-violet-400/15 bg-gradient-to-br from-violet-500/[.1] via-[#121217] to-indigo-500/[.045]"><div className="absolute -right-12 -top-12 size-36 rounded-full bg-violet-500/15 blur-3xl" /><CardContent className="relative p-5"><div className="flex items-center justify-between"><span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.12em] text-violet-200/70"><Sparkles className="size-4" /> AI intelligence</span><span className="size-1.5 animate-pulse rounded-full bg-violet-300 shadow-[0_0_10px_rgba(196,181,253,.8)]" /></div><p className="mt-5 text-lg font-medium leading-7 tracking-[-.025em] text-white/90">Enterprise conversion is accelerating.</p><p className="mt-2 text-[11px] leading-5 text-white/38">Your strategy workshops convert to retained engagements at 72%—nearly 2× the studio benchmark.</p><div className="mt-5 rounded-xl border border-white/[.06] bg-black/15 p-3"><div className="flex items-center justify-between"><span className="text-[9px] text-white/30">Potential quarterly upside</span><span className="text-sm font-semibold text-violet-200">+$86.4k</span></div></div><Button className="mt-4 w-full" size="sm" onClick={() => router.push("/business-dashboard/analytics")}><WandSparkles className="size-3.5" /> Explore recommendation</Button></CardContent></Card>

        <Card><CardHeader><SectionHeading title="Quick actions" description="Move the business forward" /></CardHeader><CardContent className="grid grid-cols-2 gap-2 pt-3">{quickActions.map((action) => <motion.button onClick={action.onClick} whileHover={{ y: -2 }} whileTap={{ scale: .97 }} key={action.label} className="group rounded-xl border border-white/[.055] bg-white/[.02] p-3 text-left transition hover:border-violet-400/20 hover:bg-violet-400/[.06]"><action.icon className="size-4 text-white/28 transition group-hover:text-violet-300" /><span className="mt-3 block text-[9px] font-medium text-white/48 group-hover:text-white/75">{action.label}</span></motion.button>)}</CardContent></Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card><CardHeader><SectionHeading title="Recent activity" description="Live across WS Labs" /></CardHeader><CardContent className="space-y-1 pt-3">{activities.map((activity) => <div key={activity.title} className="flex items-center gap-3 rounded-xl py-2.5"><span className={`grid size-8 shrink-0 place-items-center rounded-xl ${activity.color}`}><activity.icon className="size-3.5" /></span><div className="min-w-0 flex-1"><p className="truncate text-[10px] font-semibold text-white/66">{activity.title}</p><p className="mt-0.5 truncate text-[8px] text-white/24">{activity.detail}</p></div><span className="text-[8px] text-white/18">{activity.time}</span></div>)}</CardContent></Card>

        <Card><CardHeader><SectionHeading title="Recent reviews" description="Client sentiment · 4.96 average" action={<Button variant="ghost" size="sm" onClick={() => router.push("/business-dashboard/reviews")}>All reviews <ChevronRight className="size-3.5" /></Button>} /></CardHeader><CardContent className="space-y-4 pt-4">{reviews.slice(0, 2).map((review) => <button onClick={() => router.push("/business-dashboard/reviews")} key={review.customer} className="w-full border-b border-white/[.05] pb-4 text-left last:border-0 last:pb-0"><div className="flex items-center gap-2"><Avatar initials={review.initials} className="size-7" /><div className="flex-1"><p className="text-[9px] font-semibold text-white/64">{review.customer}</p><p className="text-[8px] text-white/20">{review.service}</p></div><div className="flex gap-0.5 text-amber-200">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-2.5 fill-current" />)}</div></div><p className="mt-2 line-clamp-2 text-[9px] leading-4 text-white/32">{review.text}</p></button>)}</CardContent></Card>

        <div className="space-y-4"><Card><CardHeader><SectionHeading title="Recent customers" description="Highest engagement this week" /></CardHeader><CardContent className="space-y-1 pt-3">{customers.slice(0, 3).map((customer) => <button onClick={() => router.push("/business-dashboard/customers")} key={customer.email} className="flex w-full items-center gap-3 rounded-xl py-2 text-left transition hover:bg-white/[.02]"><Avatar initials={customer.initials} className="size-8" /><div className="min-w-0 flex-1"><p className="truncate text-[10px] font-semibold text-white/64">{customer.name}</p><p className="truncate text-[8px] text-white/22">{customer.email}</p></div><p className="text-[9px] font-semibold text-white/44">{customer.spent}</p></button>)}</CardContent></Card><Card className="border-sky-400/10 bg-gradient-to-r from-sky-400/[.055] to-transparent"><CardContent className="flex items-start gap-3 p-4"><span className="grid size-8 shrink-0 place-items-center rounded-xl bg-sky-400/10 text-sky-300"><TrendingUp className="size-3.5" /></span><div><p className="text-[10px] font-semibold text-white/65">Quarterly planning</p><p className="mt-1 text-[9px] leading-4 text-white/28">FY27 strategy review opens Monday. Three inputs still need approval.</p><button onClick={() => router.push("/business-dashboard/settings")} className="mt-2 flex items-center gap-1 text-[9px] font-semibold text-sky-300/75 hover:text-sky-200">Review inputs <ExternalLink className="size-3" /></button></div></CardContent></Card></div>
      </div>

      <Dialog
        open={Boolean(activeAction)}
        onClose={() => setActiveAction(null)}
        title={activeAction === "proposal" ? "Create proposal" : "Run automation"}
        description={activeAction === "proposal" ? "Start a polished commercial draft for a client." : "Queue a repeatable workflow across the WS Labs workspace."}
        footer={<><Button variant="ghost" onClick={() => setActiveAction(null)}>Cancel</Button><Button onClick={completeAction} disabled={activeAction === "proposal" && !actionDraft.client.trim()}>{activeAction === "proposal" ? "Create draft" : "Run automation"}</Button></>}
      >
        {activeAction === "proposal" ? <div className="grid gap-4"><label className="text-[10px] font-medium text-white/42">Client<Input autoFocus value={actionDraft.client} onChange={(event) => setActionDraft({ ...actionDraft, client: event.target.value })} placeholder="Client or company" className="mt-2" /></label><label className="text-[10px] font-medium text-white/42">Opportunity<Input value={actionDraft.detail} onChange={(event) => setActionDraft({ ...actionDraft, detail: event.target.value })} placeholder="e.g. AI transformation roadmap" className="mt-2" /></label></div> : <div className="space-y-3">{["Follow up with pending bookings", "Prepare the Monday performance brief", "Request reviews after completed work"].map((automation, index) => <label key={automation} className="flex items-center gap-3 rounded-xl border border-white/[.055] bg-white/[.02] p-3 text-[10px] text-white/42"><input type="radio" name="automation" defaultChecked={index === 0} />{automation}</label>)}</div>}
      </Dialog>

      {toast ? <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-5 right-5 z-[120] flex items-center gap-2 rounded-xl border border-emerald-400/15 bg-[#15191a] px-4 py-3 text-[10px] font-medium text-emerald-200 shadow-2xl"><CalendarCheck className="size-3.5" /> {toast}</motion.div> : null}
    </>
  );
}
