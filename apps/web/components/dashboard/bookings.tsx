"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowDownUp,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Filter,
  Mail,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  UserRound,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { bookings as initialBookings } from "./data";
import { consumeDashboardIntent, downloadTextFile, rowsToCsv } from "./actions";
import { EmptyState, PageHeader } from "./page";

type Booking = (typeof initialBookings)[number];
type BookingStatus = Booking["status"];
type StatusFilter = "All" | BookingStatus;

const statusTone = (status: BookingStatus) => status === "Confirmed" || status === "Completed" ? "success" as const : status === "Pending" ? "warning" as const : "danger" as const;
const selectClass = "h-10 w-full rounded-xl border border-white/[.075] bg-white/[.035] px-3 text-[11px] text-white/80 outline-none focus:border-violet-400/45";

export function PremiumBookingsPage() {
  const [items, setItems] = useState<Booking[]>(initialBookings);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("All");
  const [staffFilter, setStaffFilter] = useState("All team");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [detail, setDetail] = useState<Booking | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [draft, setDraft] = useState({ customer: "", service: "Product Strategy Sprint", staff: "Rav Singh", date: "2026-06-16", time: "09:00", amount: "2400", status: "Confirmed" as BookingStatus });
  const router = useRouter();
  const pageSize = 4;

  const filtered = useMemo(() => items.filter((booking) => (filter === "All" || booking.status === filter) && (staffFilter === "All team" || booking.staff === staffFilter) && `${booking.customer} ${booking.service} ${booking.id}`.toLowerCase().includes(search.toLowerCase())).sort((left, right) => sortAsc ? left.customer.localeCompare(right.customer) : right.customer.localeCompare(left.customer)), [filter, items, search, sortAsc, staffFilter]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleBookings = filtered.slice((page - 1) * pageSize, page * pageSize);
  const announce = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2200); };
  const toggleSelection = (id: string) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const refresh = () => { setLoading(true); window.setTimeout(() => { setLoading(false); announce("Bookings refreshed"); }, 650); };

  useEffect(() => {
    const parameters = consumeDashboardIntent("booking");
    if (!parameters) return;
    const customer = parameters.get("customer");
    if (customer) setDraft((current) => ({ ...current, customer }));
    setCreateOpen(true);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filter, search, staffFilter]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const exportBookings = () => {
    const csv = rowsToCsv([
      ["Booking ID", "Customer", "Service", "Team member", "Date", "Status", "Value"],
      ...filtered.map((booking) => [booking.id, booking.customer, booking.service, booking.staff, booking.date, booking.status, booking.amount]),
    ]);
    downloadTextFile("ws-labs-bookings.csv", csv, "text/csv;charset=utf-8");
    announce("Booking export downloaded");
  };

  const createBooking = () => {
    if (!draft.customer.trim()) return;
    const booking: Booking = { id: `WS-${2842 + items.length}`, customer: draft.customer, initials: draft.customer.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase(), service: draft.service, staff: draft.staff, date: `${draft.date === "2026-06-16" ? "Tue, 16 Jun" : draft.date}, ${new Date(`2026-06-16T${draft.time}`).toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit" })}`, duration: "60 min", amount: `$${Number(draft.amount).toLocaleString("en-AU")}`, status: draft.status };
    setItems((current) => [booking, ...current]);
    setCreateOpen(false);
    setDraft({ customer: "", service: "Product Strategy Sprint", staff: "Rav Singh", date: "2026-06-16", time: "09:00", amount: "2400", status: "Confirmed" });
    announce("Booking created");
  };

  const updateStatus = (id: string, status: BookingStatus) => {
    setItems((current) => current.map((booking) => booking.id === id ? { ...booking, status } : booking));
    setDetail((current) => current?.id === id ? { ...current, status } : current);
    announce(`Booking marked ${status.toLowerCase()}`);
  };

  const bulkComplete = () => {
    setItems((current) => current.map((booking) => selected.includes(booking.id) ? { ...booking, status: "Completed" } : booking));
    setSelected([]);
    announce("Selected bookings completed");
  };

  return (
    <>
      <PageHeader eyebrow="Operations · $24,700 pipeline" title="Bookings" description="Manage client sessions, approvals and commercial value from one operating view." action={<div className="flex gap-2"><Button variant="outline" onClick={exportBookings}><Download className="size-3.5" /> Export</Button><Button onClick={() => setCreateOpen(true)}><Plus className="size-4" /> New booking</Button></div>} />

      <div className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">{[{ label: "Today", value: "14", note: "11 confirmed", color: "text-violet-300" }, { label: "This week", value: "68", note: "+16.7% week-on-week", color: "text-sky-300" }, { label: "Pending approval", value: "6", note: "$14,600 at risk", color: "text-amber-200" }, { label: "Completion rate", value: "96.8%", note: "+2.4% this quarter", color: "text-emerald-300" }].map((item) => <Card key={item.label} className="group transition hover:-translate-y-0.5 hover:border-white/[.1]"><CardContent className="p-4"><p className="text-[8px] font-semibold uppercase tracking-[.13em] text-white/20">{item.label}</p><p className={`mt-2 text-2xl font-semibold tracking-[-.04em] ${item.color}`}>{item.value}</p><p className="mt-1 text-[9px] text-white/24">{item.note}</p></CardContent></Card>)}</div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-white/[.055] p-3 sm:flex-row sm:items-center sm:p-4"><div className="relative min-w-0 flex-1 sm:max-w-sm"><Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/18" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search clients, services or booking ID…" className="h-9 pl-8 text-[10px]" /></div><div className="flex items-center gap-2 overflow-x-auto"><div className="flex rounded-xl border border-white/[.06] bg-white/[.02] p-0.5">{(["All", "Confirmed", "Pending", "Completed", "Cancelled"] as StatusFilter[]).map((status) => <button key={status} onClick={() => setFilter(status)} className={`rounded-[9px] px-3 py-1.5 text-[8px] font-semibold transition ${filter === status ? "bg-white/[.08] text-white/72" : "text-white/22 hover:text-white/50"}`}>{status}</button>)}</div><Button variant="outline" size="icon" className="size-9" onClick={() => setFilterOpen(true)} aria-label="Advanced booking filters"><Filter className="size-3.5" /></Button><Button variant="ghost" size="icon" className="size-9" onClick={refresh} aria-label="Refresh bookings"><RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} /></Button></div></div>

        {selected.length ? <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex items-center gap-3 border-b border-violet-400/10 bg-violet-400/[.055] px-4 py-2.5"><span className="text-[9px] font-semibold text-violet-200">{selected.length} selected</span><Button size="sm" onClick={bulkComplete}><Check className="size-3.5" /> Mark complete</Button><Button variant="ghost" size="sm" onClick={() => { const booking = items.find((item) => selected.includes(item.id)); router.push(`/business-dashboard/messages?create=message${booking ? `&name=${encodeURIComponent(booking.customer)}` : ""}`); }}><Mail className="size-3.5" /> Message</Button><Button variant="ghost" size="sm" className="ml-auto" onClick={() => setSelected([])}>Clear</Button></motion.div> : null}

        {loading ? <div className="space-y-2 p-4">{Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-14 w-full" />)}</div> : filtered.length ? <div className="overflow-x-auto"><table className="w-full min-w-[980px] text-left"><thead><tr className="text-[8px] font-semibold uppercase tracking-[.12em] text-white/18"><th className="w-10 px-5 py-3"><input type="checkbox" aria-label="Select visible bookings" checked={visibleBookings.length > 0 && visibleBookings.every((booking) => selected.includes(booking.id))} onChange={() => setSelected(visibleBookings.every((booking) => selected.includes(booking.id)) ? selected.filter((id) => !visibleBookings.some((booking) => booking.id === id)) : Array.from(new Set([...selected, ...visibleBookings.map((booking) => booking.id)])))} /></th><th className="px-3 py-3"><button onClick={() => setSortAsc((value) => !value)} className="flex items-center gap-1.5">Customer <ArrowDownUp className="size-3" /></button></th><th className="px-3 py-3">Service</th><th className="px-3 py-3">Team member</th><th className="px-3 py-3">Date & time</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Value</th><th className="w-10 px-4 py-3" /></tr></thead><tbody>{visibleBookings.map((booking, index) => <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * .025 }} key={booking.id} onClick={() => setDetail(booking)} className="cursor-pointer border-t border-white/[.045] transition hover:bg-white/[.022]"><td className="px-5 py-4" onClick={(event) => event.stopPropagation()}><input type="checkbox" aria-label={`Select ${booking.id}`} checked={selected.includes(booking.id)} onChange={() => toggleSelection(booking.id)} /></td><td className="px-3 py-4"><div className="flex items-center gap-2.5"><Avatar initials={booking.initials} className="size-8" /><div><p className="text-[10px] font-semibold text-white/68">{booking.customer}</p><p className="text-[8px] text-white/18">{booking.id}</p></div></div></td><td className="px-3 py-4"><p className="text-[10px] font-medium text-white/48">{booking.service}</p><p className="mt-0.5 text-[8px] text-white/18">{booking.duration}</p></td><td className="px-3 py-4 text-[10px] text-white/36">{booking.staff}</td><td className="px-3 py-4 text-[10px] text-white/36">{booking.date}</td><td className="px-3 py-4"><Badge tone={statusTone(booking.status)}>{booking.status}</Badge></td><td className="px-3 py-4 text-[10px] font-semibold text-white/62">{booking.amount}</td><td className="px-4" onClick={(event) => event.stopPropagation()}><Button variant="ghost" size="icon" className="size-8" onClick={() => setDetail(booking)} aria-label={`Open ${booking.id}`}><MoreHorizontal className="size-4" /></Button></td></motion.tr>)}</tbody></table></div> : <div className="p-6"><EmptyState icon={CalendarDays} title="No bookings found" description="Try another search, clear your filters or create a booking." action={<Button size="sm" onClick={() => setCreateOpen(true)}><Plus className="size-3.5" /> New booking</Button>} /></div>}

        <div className="flex items-center justify-between border-t border-white/[.055] px-5 py-3 text-[8px] text-white/22"><span>Showing {filtered.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filtered.length)} of {filtered.length} bookings</span><div className="flex items-center gap-2"><span>Page {page} of {totalPages}</span><Button variant="outline" size="icon" className="size-8" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} aria-label="Previous booking page"><ChevronLeft className="size-3.5" /></Button><Button variant="outline" size="icon" className="size-8" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages} aria-label="Next booking page"><ChevronRight className="size-3.5" /></Button></div></div>
      </Card>

      <Dialog open={createOpen} onClose={() => setCreateOpen(false)} title="New booking" description="Add a confirmed or pending client session." footer={<><Button variant="ghost" onClick={() => setCreateOpen(false)}>Cancel</Button><Button onClick={createBooking} disabled={!draft.customer.trim()}>Create booking</Button></>}><div className="grid gap-4 sm:grid-cols-2"><label className="text-[10px] font-medium text-white/42 sm:col-span-2">Customer<Input autoFocus value={draft.customer} onChange={(event) => setDraft({ ...draft, customer: event.target.value })} placeholder="Customer name" className="mt-2" /></label><label className="text-[10px] font-medium text-white/42 sm:col-span-2">Service<Input value={draft.service} onChange={(event) => setDraft({ ...draft, service: event.target.value })} className="mt-2" /></label><label className="text-[10px] font-medium text-white/42">Team member<select value={draft.staff} onChange={(event) => setDraft({ ...draft, staff: event.target.value })} className={selectClass}>{["Rav Singh", "Maya Chen", "Sofia Reed", "Daniel Cole"].map((staff) => <option key={staff}>{staff}</option>)}</select></label><label className="text-[10px] font-medium text-white/42">Status<select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as BookingStatus })} className={selectClass}><option>Confirmed</option><option>Pending</option></select></label><label className="text-[10px] font-medium text-white/42">Date<Input type="date" value={draft.date} onChange={(event) => setDraft({ ...draft, date: event.target.value })} className="mt-2" /></label><label className="text-[10px] font-medium text-white/42">Time<Input type="time" value={draft.time} onChange={(event) => setDraft({ ...draft, time: event.target.value })} className="mt-2" /></label><label className="text-[10px] font-medium text-white/42 sm:col-span-2">Value<Input value={draft.amount} onChange={(event) => setDraft({ ...draft, amount: event.target.value })} className="mt-2" /></label></div></Dialog>

      <Dialog open={filterOpen} onClose={() => setFilterOpen(false)} title="Booking filters" description="Narrow the operating view by owner and status." footer={<><Button variant="ghost" onClick={() => { setFilter("All"); setStaffFilter("All team"); }}>Clear</Button><Button onClick={() => setFilterOpen(false)}>Apply filters</Button></>}><div className="grid gap-4 sm:grid-cols-2"><label className="text-[10px] font-medium text-white/42">Team member<select value={staffFilter} onChange={(event) => setStaffFilter(event.target.value)} className={selectClass}><option>All team</option>{["Rav Singh", "Maya Chen", "Sofia Reed", "Daniel Cole"].map((staff) => <option key={staff}>{staff}</option>)}</select></label><label className="text-[10px] font-medium text-white/42">Status<select value={filter} onChange={(event) => setFilter(event.target.value as StatusFilter)} className={selectClass}>{["All", "Confirmed", "Pending", "Completed", "Cancelled"].map((status) => <option key={status}>{status}</option>)}</select></label></div></Dialog>

      <Dialog open={Boolean(detail)} onClose={() => setDetail(null)} title={detail?.customer ?? "Booking details"} {...(detail ? { description: `${detail.id} · ${detail.date}` } : {})} footer={detail ? <><Button variant="destructive" onClick={() => { setItems((current) => current.filter((booking) => booking.id !== detail.id)); setDetail(null); announce("Booking deleted"); }}><Trash2 className="size-3.5" /> Delete</Button>{detail.status !== "Completed" ? <Button onClick={() => updateStatus(detail.id, "Completed")}><Check className="size-3.5" /> Complete</Button> : null}</> : null}>{detail ? <div><div className="flex items-center gap-3"><Avatar initials={detail.initials} className="size-11" /><div><p className="text-sm font-semibold text-white/75">{detail.service}</p><p className="mt-1 text-[9px] text-white/25">Managed by {detail.staff}</p></div><Badge tone={statusTone(detail.status)} className="ml-auto">{detail.status}</Badge></div><div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-white/[.055] bg-white/[.025] p-3"><Clock3 className="size-3.5 text-white/25" /><p className="mt-2 text-[10px] font-medium text-white/58">{detail.date}</p><p className="mt-1 text-[8px] text-white/22">{detail.duration}</p></div><div className="rounded-xl border border-white/[.055] bg-white/[.025] p-3"><UserRound className="size-3.5 text-white/25" /><p className="mt-2 text-[10px] font-medium text-white/58">{detail.staff}</p><p className="mt-1 text-[8px] text-white/22">Team member</p></div></div><div className="mt-4 flex items-center justify-between rounded-xl border border-violet-400/10 bg-violet-400/[.045] p-4"><span className="text-[9px] text-white/30">Engagement value</span><span className="text-lg font-semibold text-violet-200">{detail.amount}</span></div><div className="mt-4 flex flex-wrap gap-2">{(["Confirmed", "Pending", "Cancelled"] as BookingStatus[]).map((status) => <Button key={status} variant={detail.status === status ? "secondary" : "ghost"} size="sm" onClick={() => updateStatus(detail.id, status)}>{status}</Button>)}</div></div> : null}</Dialog>

      {toast ? <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-5 right-5 z-[120] flex items-center gap-2 rounded-xl border border-emerald-400/15 bg-[#15191a] px-4 py-3 text-[10px] font-medium text-emerald-200 shadow-2xl"><Check className="size-3.5" /> {toast}</motion.div> : null}
    </>
  );
}
