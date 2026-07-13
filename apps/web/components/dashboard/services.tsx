"use client";

import { motion } from "framer-motion";
import { Check, Clock3, Copy, Grid2X2, List, MoreHorizontal, Plus, Search, Sparkles, Trash2, TrendingUp, Wrench } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { services as initialServices } from "./data";
import { consumeDashboardIntent } from "./actions";
import { EmptyState, fadeUp, PageHeader, stagger } from "./page";

type Service = (typeof initialServices)[number];

const emptyService: Service = { name: "", category: "Strategy", duration: "60 min", price: "$2,400", bookings: 0, revenue: "$0", active: true };

export function PremiumServicesPage() {
  const [items, setItems] = useState<Service[]>(initialServices);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [editing, setEditing] = useState<Service | null>(null);
  const [draft, setDraft] = useState<Service>(emptyService);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toast, setToast] = useState("");
  const categories = ["All", ...Array.from(new Set(items.map((service) => service.category)))];
  const filtered = useMemo(() => items.filter((service) => (category === "All" || service.category === category) && service.name.toLowerCase().includes(search.toLowerCase())), [category, items, search]);
  const announce = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2200); };

  useEffect(() => {
    if (consumeDashboardIntent("service")) openCreate();
  }, []);

  const openCreate = () => { setEditing(null); setDraft(emptyService); setDialogOpen(true); };
  const openEdit = (service: Service) => { setEditing(service); setDraft(service); setDialogOpen(true); };
  const save = () => {
    if (!draft.name.trim()) return;
    setItems((current) => editing ? current.map((service) => service.name === editing.name ? draft : service) : [draft, ...current]);
    setDialogOpen(false);
    announce(editing ? "Service updated" : "Service created");
  };
  const duplicate = (service: Service) => { const copy = { ...service, name: `${service.name} copy`, bookings: 0, revenue: "$0" }; setItems((current) => [copy, ...current]); announce("Service duplicated"); };
  const remove = (service: Service) => { setItems((current) => current.filter((item) => item.name !== service.name)); announce("Service removed"); };
  const toggle = (name: string, active: boolean) => setItems((current) => current.map((service) => service.name === name ? { ...service, active } : service));

  return (
    <>
      <PageHeader eyebrow="Catalogue · 5 active offers" title="Services" description="Package WS Labs expertise into clear, valuable and easy-to-book engagements." action={<Button onClick={openCreate}><Plus className="size-4" /> Add service</Button>} />

      <div className="mb-4 grid gap-3 sm:grid-cols-3"><Card><CardContent className="p-4"><p className="text-[8px] font-semibold uppercase tracking-[.13em] text-white/20">Service revenue</p><p className="mt-2 text-2xl font-semibold tracking-[-.04em] text-violet-200">$510,600</p><p className="mt-1 text-[9px] text-white/24">+24.2% this quarter</p></CardContent></Card><Card><CardContent className="p-4"><p className="text-[8px] font-semibold uppercase tracking-[.13em] text-white/20">Bookings</p><p className="mt-2 text-2xl font-semibold tracking-[-.04em] text-sky-200">141</p><p className="mt-1 text-[9px] text-white/24">Across all service lines</p></CardContent></Card><Card className="border-violet-400/10 bg-gradient-to-r from-violet-500/[.065] to-transparent"><CardContent className="flex items-start gap-3 p-4"><Sparkles className="mt-0.5 size-4 text-violet-300" /><div><p className="text-[10px] font-semibold text-white/62">AI opportunity</p><p className="mt-1 text-[9px] leading-4 text-white/28">Recurring AI advisory could become your highest-margin offer.</p></div></CardContent></Card></div>

      <div className="mb-4 flex flex-col gap-3 rounded-[18px] border border-white/[.06] bg-white/[.018] p-3 sm:flex-row sm:items-center"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/18" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search services…" className="h-9 pl-8 text-[10px]" /></div><div className="flex items-center gap-2 overflow-x-auto"><div className="flex gap-1">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[8px] font-semibold transition ${category === item ? "bg-white/[.08] text-white/70" : "text-white/22 hover:bg-white/[.035] hover:text-white/48"}`}>{item}</button>)}</div><div className="h-5 w-px bg-white/[.06]" /><div className="flex rounded-lg border border-white/[.06] p-0.5"><button onClick={() => setLayout("grid")} aria-label="Grid layout" className={`grid size-7 place-items-center rounded-md ${layout === "grid" ? "bg-white/[.08] text-white/65" : "text-white/20"}`}><Grid2X2 className="size-3.5" /></button><button onClick={() => setLayout("list")} aria-label="List layout" className={`grid size-7 place-items-center rounded-md ${layout === "list" ? "bg-white/[.08] text-white/65" : "text-white/20"}`}><List className="size-3.5" /></button></div></div></div>

      {filtered.length ? layout === "grid" ? <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((service) => <motion.div variants={fadeUp} key={service.name}><Card className="group h-full overflow-hidden transition hover:-translate-y-1 hover:border-white/[.11] hover:shadow-[0_26px_80px_rgba(0,0,0,.32)]"><div className="h-px bg-gradient-to-r from-transparent via-violet-300/25 to-transparent opacity-0 transition group-hover:opacity-100" /><CardContent className="p-5"><div className="flex items-start justify-between"><span className="grid size-10 place-items-center rounded-xl border border-violet-400/10 bg-violet-400/10 text-violet-300"><Wrench className="size-4" /></span><div className="flex items-center gap-2"><Switch checked={service.active} onCheckedChange={(active) => toggle(service.name, active)} label={`Toggle ${service.name}`} /><Button variant="ghost" size="icon" className="size-8" onClick={() => openEdit(service)}><MoreHorizontal className="size-4" /></Button></div></div><Badge className="mt-5" tone="purple">{service.category}</Badge><h3 className="mt-3 text-sm font-semibold tracking-[-.02em] text-white/72">{service.name}</h3><div className="mt-2 flex items-center gap-3 text-[9px] text-white/26"><span className="flex items-center gap-1"><Clock3 className="size-3" />{service.duration}</span><span className="font-semibold text-white/58">{service.price}</span></div><div className="mt-5 grid grid-cols-2 border-t border-white/[.055] pt-4"><div><p className="text-[8px] text-white/18">Bookings</p><p className="mt-1 text-[10px] font-semibold text-white/58">{service.bookings}</p></div><div className="border-l border-white/[.055] pl-4"><p className="text-[8px] text-white/18">Revenue</p><p className="mt-1 text-[10px] font-semibold text-white/58">{service.revenue}</p></div></div><div className="mt-4 flex gap-2"><Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(service)}>Edit</Button><Button variant="ghost" size="icon" className="size-8" onClick={() => duplicate(service)} aria-label={`Duplicate ${service.name}`}><Copy className="size-3.5" /></Button></div></CardContent></Card></motion.div>)}</motion.div> : <Card className="overflow-hidden"><div className="divide-y divide-white/[.05]">{filtered.map((service) => <div key={service.name} className="flex flex-col gap-4 p-4 transition hover:bg-white/[.02] sm:flex-row sm:items-center"><span className="grid size-9 place-items-center rounded-xl bg-violet-400/10 text-violet-300"><Wrench className="size-4" /></span><div className="min-w-0 flex-1"><p className="text-[11px] font-semibold text-white/68">{service.name}</p><p className="mt-1 text-[8px] text-white/22">{service.category} · {service.duration}</p></div><div className="grid grid-cols-3 gap-8 text-[9px]"><div><p className="text-white/18">Price</p><p className="mt-1 font-semibold text-white/58">{service.price}</p></div><div><p className="text-white/18">Bookings</p><p className="mt-1 font-semibold text-white/58">{service.bookings}</p></div><div><p className="text-white/18">Revenue</p><p className="mt-1 font-semibold text-white/58">{service.revenue}</p></div></div><Switch checked={service.active} onCheckedChange={(active) => toggle(service.name, active)} label={`Toggle ${service.name}`} /><Button variant="ghost" size="icon" onClick={() => openEdit(service)}><MoreHorizontal className="size-4" /></Button></div>)}</div></Card> : <EmptyState icon={Wrench} title="No services found" description="Try another search or create a new service offer." action={<Button size="sm" onClick={openCreate}><Plus className="size-3.5" /> Add service</Button>} />}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title={editing ? "Edit service" : "Add service"} description="Define the positioning, delivery and commercial model." footer={<><Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>{editing ? <Button variant="destructive" onClick={() => { remove(editing); setDialogOpen(false); }}><Trash2 className="size-3.5" /> Delete</Button> : null}<Button onClick={save} disabled={!draft.name.trim()}>{editing ? "Save changes" : "Create service"}</Button></>}><div className="grid gap-4 sm:grid-cols-2"><label className="text-[10px] font-medium text-white/42 sm:col-span-2">Service name<Input autoFocus value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="e.g. Product Strategy Sprint" className="mt-2" /></label><label className="text-[10px] font-medium text-white/42">Category<Input value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} className="mt-2" /></label><label className="text-[10px] font-medium text-white/42">Duration<Input value={draft.duration} onChange={(event) => setDraft({ ...draft, duration: event.target.value })} className="mt-2" /></label><label className="text-[10px] font-medium text-white/42">Price<Input value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} className="mt-2" /></label><div className="flex items-end"><div className="flex h-10 w-full items-center justify-between rounded-xl border border-white/[.075] bg-white/[.035] px-3"><span className="text-[10px] text-white/38">Available for booking</span><Switch checked={draft.active} onCheckedChange={(active) => setDraft({ ...draft, active })} label="Service availability" /></div></div><div className="sm:col-span-2 rounded-xl border border-white/[.055] bg-white/[.02] p-4"><div className="flex items-center gap-2 text-[9px] text-white/28"><TrendingUp className="size-3.5 text-emerald-300" /> Forecast</div><p className="mt-2 text-[10px] leading-5 text-white/38">At the current conversion rate, this service can contribute approximately $64k per quarter.</p></div></div></Dialog>

      {toast ? <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-5 right-5 z-[120] flex items-center gap-2 rounded-xl border border-emerald-400/15 bg-[#15191a] px-4 py-3 text-[10px] font-medium text-emerald-200 shadow-2xl"><Check className="size-3.5" /> {toast}</motion.div> : null}
    </>
  );
}
