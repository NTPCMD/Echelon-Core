"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowDownUp,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  HeartPulse,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Sparkles,
  Tag,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Input } from "../ui/input";
import { customers as customerSeed } from "./data";
import { consumeDashboardIntent } from "./actions";
import { EmptyState, PageHeader } from "./page";

type CustomerSegment = "Enterprise" | "Retainer" | "High value" | "New" | "At risk";
type SortMode = "Value" | "Recent" | "A–Z";

type Customer = {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  company: string;
  visits: number;
  spent: string;
  spentValue: number;
  lastVisit: string;
  lastVisitOrder: number;
  tag: CustomerSegment;
  health: number;
  joined: string;
  nextBooking: string;
  owner: string;
  source: string;
  notes: string;
};

const details = [
  {
    phone: "+61 412 884 201",
    company: "Northstar Capital",
    health: 96,
    joined: "March 2024",
    nextBooking: "Product Strategy Sprint · Today, 9:30 AM",
    owner: "Rav Singh",
    source: "Founder network",
    notes: "Preparing phase two roadmap. Leadership team values concise commercial recommendations.",
  },
  {
    phone: "+61 401 337 884",
    company: "Form House",
    health: 92,
    joined: "August 2024",
    nextBooking: "Brand System Review · Today, 1:30 PM",
    owner: "Sofia Reed",
    source: "Client referral",
    notes: "Brand and product design retainer. Quarterly executive review is due in July.",
  },
  {
    phone: "+61 422 715 190",
    company: "Lumen Health",
    health: 89,
    joined: "January 2025",
    nextBooking: "Digital Experience Workshop · 18 Jun",
    owner: "Rav Singh",
    source: "Partnership",
    notes: "Fast-growing health platform. COO is joining the next experience workshop.",
  },
  {
    phone: "+61 433 082 614",
    company: "Atlas Logistics",
    health: 78,
    joined: "May 2026",
    nextBooking: "AI Workflow Audit · Today, 11:30 AM",
    owner: "Maya Chen",
    source: "Organic search",
    notes: "New relationship with strong automation potential across operations and finance.",
  },
  {
    phone: "+61 407 621 485",
    company: "Aperture Group",
    health: 84,
    joined: "November 2023",
    nextBooking: "Technical Advisory · 20 Jun",
    owner: "Daniel Cole",
    source: "Founder network",
    notes: "Long-standing technical advisory client. Architecture review runs every six weeks.",
  },
];

const initialCustomers: Customer[] = customerSeed.map((customer, index) => {
  const spentValue = Number(customer.spent.replace(/[$,]/g, ""));
  return {
    ...customer,
    id: `CUS-${1429 - index}`,
    tag: customer.tag as CustomerSegment,
    spentValue,
    lastVisitOrder: index,
    ...details[index],
  } as Customer;
});

const segmentTone = (segment: CustomerSegment) => {
  if (["Enterprise", "High value"].includes(segment)) return "purple" as const;
  if (segment === "New") return "success" as const;
  if (segment === "At risk") return "danger" as const;
  return "neutral" as const;
};

const healthTone = (health: number) => {
  if (health >= 90) return "bg-emerald-400";
  if (health >= 75) return "bg-violet-400";
  return "bg-amber-300";
};

const selectClass =
  "mt-2 h-10 w-full rounded-xl border border-white/[.075] bg-white/[.035] px-3 text-[11px] text-white/80 outline-none transition focus:border-violet-400/45 focus:ring-4 focus:ring-violet-500/10";

export function PremiumCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState<"All" | CustomerSegment>("All");
  const [sortMode, setSortMode] = useState<SortMode>("Value");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [detail, setDetail] = useState<Customer | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [campaignOpen, setCampaignOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [draft, setDraft] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    tag: "New" as CustomerSegment,
    owner: "Rav Singh",
  });
  const [campaign, setCampaign] = useState({
    audience: "Selected customers",
    subject: "A new WS Labs insight for your team",
    message:
      "We have prepared a short strategic update based on the patterns we are seeing across ambitious product teams.",
  });
  const router = useRouter();
  const pageSize = 4;

  const filtered = useMemo(() => {
    const result = customers.filter(
      (customer) =>
        (segment === "All" || customer.tag === segment) &&
        `${customer.name} ${customer.email} ${customer.company}`
          .toLowerCase()
          .includes(search.toLowerCase()),
    );

    return result.sort((left, right) => {
      if (sortMode === "A–Z") return left.name.localeCompare(right.name);
      if (sortMode === "Recent") return left.lastVisitOrder - right.lastVisitOrder;
      return right.spentValue - left.spentValue;
    });
  }, [customers, search, segment, sortMode]);

  const selectedCustomers = customers.filter((customer) => selectedIds.includes(customer.id));
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleCustomers = filtered.slice((page - 1) * pageSize, page * pageSize);

  const announce = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  useEffect(() => {
    if (consumeDashboardIntent("customer")) setCreateOpen(true);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, segment, sortMode]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const toggleSelection = (id: string) =>
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  const createCustomer = () => {
    if (!draft.name.trim() || !draft.email.trim()) return;
    const customer: Customer = {
      id: `CUS-${1430 + customers.length}`,
      name: draft.name,
      initials: draft.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      email: draft.email,
      phone: draft.phone || "Not provided",
      company: draft.company || "Independent",
      visits: 0,
      spent: "$0",
      spentValue: 0,
      lastVisit: "Never",
      lastVisitOrder: -1,
      tag: draft.tag,
      health: 72,
      joined: "June 2026",
      nextBooking: "No booking scheduled",
      owner: draft.owner,
      source: "Manually added",
      notes: "New relationship. Add context after the first conversation.",
    };
    setCustomers((current) => [customer, ...current]);
    setCreateOpen(false);
    setDraft({
      name: "",
      email: "",
      phone: "",
      company: "",
      tag: "New",
      owner: "Rav Singh",
    });
    announce("Customer added");
  };

  const applyHighValueTag = () => {
    setCustomers((current) =>
      current.map((customer) =>
        selectedIds.includes(customer.id) ? { ...customer, tag: "High value" } : customer,
      ),
    );
    setSelectedIds([]);
    announce("Customer segment updated");
  };

  const saveNotes = (notes: string) => {
    if (!detail) return;
    const updated = { ...detail, notes };
    setDetail(updated);
    setCustomers((current) =>
      current.map((customer) => (customer.id === updated.id ? updated : customer)),
    );
  };

  const sendCampaign = () => {
    setCampaignOpen(false);
    setSelectedIds([]);
    announce(
      `Campaign queued for ${campaign.audience === "Selected customers" ? Math.max(selectedCustomers.length, 1) : 1429} customers`,
    );
  };

  return (
    <>
      <PageHeader
        eyebrow="Relationships · 1,429 clients"
        title="Customers"
        description="Understand every relationship, spot commercial momentum and deliver more thoughtful follow-up."
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setCampaignOpen(true)}>
              <Mail className="size-3.5" />
              Send campaign
            </Button>
            <Button onClick={() => setCreateOpen(true)}>
              <UserPlus className="size-4" />
              Add customer
            </Button>
          </div>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          {
            label: "Total customers",
            value: "1,429",
            note: "+96 this month",
            icon: Users,
            color: "text-violet-200",
          },
          {
            label: "Returning rate",
            value: "68%",
            note: "+4.2% this quarter",
            icon: TrendingUp,
            color: "text-emerald-200",
          },
          {
            label: "Avg. client value",
            value: "$28.6k",
            note: "Across 6.2 engagements",
            icon: ArrowUpRight,
            color: "text-sky-200",
          },
          {
            label: "Needs attention",
            value: "34",
            note: "No contact in 90 days",
            icon: HeartPulse,
            color: "text-amber-100",
          },
        ].map((metric) => (
          <Card
            key={metric.label}
            className="group transition hover:-translate-y-0.5 hover:border-white/[.1]"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-[8px] font-semibold uppercase tracking-[.13em] text-white/20">
                  {metric.label}
                </p>
                <metric.icon className="size-3.5 text-white/18 transition group-hover:text-violet-300/60" />
              </div>
              <p className={`mt-2 text-2xl font-semibold tracking-[-.04em] ${metric.color}`}>
                {metric.value}
              </p>
              <p className="mt-1 text-[9px] text-white/24">{metric.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-4 grid gap-3 xl:grid-cols-[1fr_300px]">
        <Card className="overflow-hidden">
          <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-violet-400/12 bg-violet-400/10 text-violet-300">
              <Sparkles className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold text-white/62">Relationship intelligence</p>
              <p className="mt-1 text-[9px] leading-4 text-white/27">
                12 high-value clients show strong expansion signals. A personalised strategy review could
                unlock an estimated $186k pipeline.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setSegment("High value")}>
              View opportunity
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[.12em] text-white/18">
                Portfolio health
              </p>
              <p className="mt-2 text-xl font-semibold tracking-[-.04em] text-white/72">91 / 100</p>
            </div>
            <div className="relative grid size-14 place-items-center rounded-full bg-[conic-gradient(#8b7cf8_0_91%,rgba(255,255,255,.06)_91%)]">
              <span className="grid size-11 place-items-center rounded-full bg-[#121217] text-[9px] font-semibold text-violet-200">
                91%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-white/[.055] p-3 sm:p-4 xl:flex-row xl:items-center">
          <div className="relative min-w-0 flex-1 xl:max-w-sm">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/18" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search clients, companies or email…"
              className="h-9 pl-8 text-[10px]"
            />
          </div>
          <div className="flex min-w-0 items-center gap-2 overflow-x-auto">
            <div className="flex rounded-xl border border-white/[.06] bg-white/[.02] p-0.5">
              {(["All", "Enterprise", "Retainer", "High value", "New", "At risk"] as const).map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => setSegment(item)}
                    className={`whitespace-nowrap rounded-[9px] px-2.5 py-1.5 text-[8px] font-semibold transition ${
                      segment === item
                        ? "bg-white/[.08] text-white/72"
                        : "text-white/22 hover:text-white/50"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
            <label className="sr-only" htmlFor="customer-sort">
              Sort customers
            </label>
            <select
              id="customer-sort"
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className="h-9 rounded-xl border border-white/[.07] bg-white/[.03] px-3 text-[8px] font-semibold text-white/42 outline-none"
            >
              <option>Value</option>
              <option>Recent</option>
              <option>A–Z</option>
            </select>
            <Button
              variant="outline"
              size="icon"
              className="size-9"
              aria-label="Cycle customer segment"
              onClick={() => {
                const segments: Array<"All" | CustomerSegment> = ["All", "Enterprise", "Retainer", "High value", "New", "At risk"];
                const currentIndex = segments.indexOf(segment);
                const nextSegment = segments[(currentIndex + 1) % segments.length] ?? "All";
                setSegment(nextSegment);
                announce(`${nextSegment} customer segment applied`);
              }}
            >
              <Filter className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-9"
              aria-label="Export customers"
              onClick={() => announce("Customer export prepared")}
            >
              <Download className="size-3.5" />
            </Button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {selectedIds.length ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap items-center gap-2 border-b border-violet-400/10 bg-violet-400/[.055] px-4 py-2.5">
                <span className="mr-1 text-[9px] font-semibold text-violet-200">
                  {selectedIds.length} selected
                </span>
                <Button size="sm" onClick={() => setCampaignOpen(true)}>
                  <Send className="size-3.5" />
                  Campaign
                </Button>
                <Button variant="ghost" size="sm" onClick={applyHighValueTag}>
                  <Tag className="size-3.5" />
                  Tag high value
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto"
                  onClick={() => setSelectedIds([])}
                >
                  Clear
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {filtered.length ? (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[980px] text-left">
                <thead>
                  <tr className="text-[8px] font-semibold uppercase tracking-[.12em] text-white/18">
                    <th className="w-10 px-5 py-3">
                      <input
                        type="checkbox"
                        aria-label="Select visible customers"
                        checked={visibleCustomers.length > 0 && visibleCustomers.every((customer) => selectedIds.includes(customer.id))}
                        onChange={() =>
                          setSelectedIds(
                            visibleCustomers.every((customer) => selectedIds.includes(customer.id))
                              ? selectedIds.filter((id) => !visibleCustomers.some((customer) => customer.id === id))
                              : Array.from(new Set([...selectedIds, ...visibleCustomers.map((customer) => customer.id)])),
                          )
                        }
                      />
                    </th>
                    <th className="px-3 py-3">Customer</th>
                    <th className="px-3 py-3">Segment</th>
                    <th className="px-3 py-3">Health</th>
                    <th className="px-3 py-3">Engagements</th>
                    <th className="px-3 py-3">
                      <span className="flex items-center gap-1.5">
                        Lifetime value <ArrowDownUp className="size-3" />
                      </span>
                    </th>
                    <th className="px-3 py-3">Last visit</th>
                    <th className="px-3 py-3">Owner</th>
                    <th className="w-10 px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {visibleCustomers.map((customer, index) => (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.025 }}
                      key={customer.id}
                      onClick={() => setDetail(customer)}
                      className="cursor-pointer border-t border-white/[.045] transition hover:bg-white/[.022]"
                    >
                      <td className="px-5 py-4" onClick={(event) => event.stopPropagation()}>
                        <input
                          type="checkbox"
                          aria-label={`Select ${customer.name}`}
                          checked={selectedIds.includes(customer.id)}
                          onChange={() => toggleSelection(customer.id)}
                        />
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2.5">
                          <Avatar initials={customer.initials} className="size-8" />
                          <div className="min-w-0">
                            <p className="truncate text-[10px] font-semibold text-white/68">
                              {customer.name}
                            </p>
                            <p className="mt-0.5 truncate text-[8px] text-white/18">
                              {customer.company} · {customer.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <Badge tone={segmentTone(customer.tag)}>{customer.tag}</Badge>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-12 overflow-hidden rounded-full bg-white/[.055]">
                            <div
                              className={`h-full rounded-full ${healthTone(customer.health)}`}
                              style={{ width: `${customer.health}%` }}
                            />
                          </div>
                          <span className="text-[8px] font-semibold text-white/38">
                            {customer.health}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-[10px] text-white/38">{customer.visits}</td>
                      <td className="px-3 py-4 text-[10px] font-semibold text-white/62">
                        {customer.spent}
                      </td>
                      <td className="px-3 py-4 text-[10px] text-white/32">{customer.lastVisit}</td>
                      <td className="px-3 py-4 text-[10px] text-white/32">{customer.owner}</td>
                      <td className="px-4 py-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          aria-label={`Open ${customer.name}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            setDetail(customer);
                          }}
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-white/[.05] md:hidden">
              {visibleCustomers.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => setDetail(customer)}
                  className="w-full p-4 text-left transition hover:bg-white/[.02]"
                >
                  <div className="flex items-start gap-3">
                    <Avatar initials={customer.initials} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-[11px] font-semibold text-white/68">
                          {customer.name}
                        </p>
                        <p className="text-[10px] font-semibold text-white/62">{customer.spent}</p>
                      </div>
                      <p className="mt-1 truncate text-[8px] text-white/20">
                        {customer.company} · {customer.email}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge tone={segmentTone(customer.tag)}>{customer.tag}</Badge>
                        <span className="text-[8px] text-white/20">Health {customer.health}</span>
                        <span className="ml-auto text-[8px] text-white/20">
                          {customer.visits} engagements
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="p-6">
            <EmptyState
              icon={Users}
              title="No customers found"
              description="Try another search, clear the segment filter or add a new relationship."
              action={
                <Button size="sm" onClick={() => setCreateOpen(true)}>
                  <Plus className="size-3.5" />
                  Add customer
                </Button>
              }
            />
          </div>
        )}

        <div className="flex items-center justify-between border-t border-white/[.055] px-5 py-3 text-[8px] text-white/22">
          <span>
            Showing {filtered.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filtered.length)} of {filtered.length} customers
          </span>
          <div className="flex gap-1">
            <Button variant="outline" size="icon" className="size-8" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} aria-label="Previous customer page">
              <ChevronLeft className="size-3.5" />
            </Button>
            <Button variant="outline" size="icon" className="size-8" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages} aria-label="Next customer page">
              <ChevronRight className="size-3.5" />
            </Button>
          </div>
        </div>
      </Card>

      <Dialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Add customer"
        description="Create a relationship record for WS Labs."
        footer={
          <>
            <Button variant="ghost" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={createCustomer}
              disabled={!draft.name.trim() || !draft.email.trim()}
            >
              Add customer
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-[10px] font-medium text-white/42">
            Full name
            <Input
              autoFocus
              value={draft.name}
              onChange={(event) => setDraft({ ...draft, name: event.target.value })}
              placeholder="Customer name"
              className="mt-2"
            />
          </label>
          <label className="text-[10px] font-medium text-white/42">
            Company
            <Input
              value={draft.company}
              onChange={(event) => setDraft({ ...draft, company: event.target.value })}
              placeholder="Company name"
              className="mt-2"
            />
          </label>
          <label className="text-[10px] font-medium text-white/42">
            Email
            <Input
              type="email"
              value={draft.email}
              onChange={(event) => setDraft({ ...draft, email: event.target.value })}
              placeholder="name@company.com"
              className="mt-2"
            />
          </label>
          <label className="text-[10px] font-medium text-white/42">
            Phone
            <Input
              value={draft.phone}
              onChange={(event) => setDraft({ ...draft, phone: event.target.value })}
              placeholder="+61 …"
              className="mt-2"
            />
          </label>
          <label className="text-[10px] font-medium text-white/42">
            Segment
            <select
              value={draft.tag}
              onChange={(event) =>
                setDraft({ ...draft, tag: event.target.value as CustomerSegment })
              }
              className={selectClass}
            >
              <option>New</option>
              <option>Enterprise</option>
              <option>Retainer</option>
              <option>High value</option>
              <option>At risk</option>
            </select>
          </label>
          <label className="text-[10px] font-medium text-white/42">
            Relationship owner
            <select
              value={draft.owner}
              onChange={(event) => setDraft({ ...draft, owner: event.target.value })}
              className={selectClass}
            >
              <option>Rav Singh</option>
              <option>Maya Chen</option>
              <option>Sofia Reed</option>
              <option>Daniel Cole</option>
            </select>
          </label>
        </div>
      </Dialog>

      <Dialog
        open={campaignOpen}
        onClose={() => setCampaignOpen(false)}
        title="Create customer campaign"
        description="Prepare a thoughtful update for the right relationships."
        footer={
          <>
            <Button variant="ghost" onClick={() => setCampaignOpen(false)}>
              Save draft
            </Button>
            <Button onClick={sendCampaign} disabled={!campaign.subject.trim()}>
              <Send className="size-3.5" />
              Queue campaign
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <label className="block text-[10px] font-medium text-white/42">
            Audience
            <select
              value={campaign.audience}
              onChange={(event) => setCampaign({ ...campaign, audience: event.target.value })}
              className={selectClass}
            >
              <option>Selected customers</option>
              <option>High-value customers</option>
              <option>All active customers</option>
              <option>At-risk relationships</option>
            </select>
          </label>
          <label className="block text-[10px] font-medium text-white/42">
            Subject
            <Input
              value={campaign.subject}
              onChange={(event) => setCampaign({ ...campaign, subject: event.target.value })}
              className="mt-2"
            />
          </label>
          <label className="block text-[10px] font-medium text-white/42">
            Message
            <textarea
              value={campaign.message}
              onChange={(event) => setCampaign({ ...campaign, message: event.target.value })}
              rows={6}
              className="mt-2 w-full resize-none rounded-xl border border-white/[.075] bg-white/[.035] p-3 text-[11px] leading-5 text-white/72 outline-none transition focus:border-violet-400/45 focus:ring-4 focus:ring-violet-500/10"
            />
          </label>
          <div className="rounded-xl border border-violet-400/10 bg-violet-400/[.045] p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 size-4 text-violet-300" />
              <div>
                <p className="text-[10px] font-semibold text-white/58">AI send-time insight</p>
                <p className="mt-1 text-[9px] leading-4 text-white/27">
                  Tuesday at 8:45 AM is predicted to produce the strongest response rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
        title={detail?.name ?? "Customer details"}
        {...(detail ? { description: `${detail.company} · ${detail.id}` } : {})}
        className="max-w-2xl"
        footer={
          detail ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setDetail(null);
                  router.push(`/business-dashboard/messages?create=message&name=${encodeURIComponent(detail.name)}&email=${encodeURIComponent(detail.email)}&company=${encodeURIComponent(detail.company)}`);
                }}
              >
                <MessageSquare className="size-3.5" />
                Message
              </Button>
              <Button onClick={() => {
                setDetail(null);
                router.push(`/business-dashboard/bookings?create=booking&customer=${encodeURIComponent(detail.name)}`);
              }}>
                <CalendarDays className="size-3.5" />
                New booking
              </Button>
            </>
          ) : null
        }
      >
        {detail ? (
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Avatar initials={detail.initials} className="size-14 text-sm" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-base font-semibold text-white/78">{detail.name}</p>
                  <Badge tone={segmentTone(detail.tag)}>{detail.tag}</Badge>
                </div>
                <p className="mt-1 text-[9px] text-white/25">
                  {detail.email} · {detail.phone}
                </p>
                <p className="mt-1 text-[8px] text-white/18">
                  Customer since {detail.joined} · Owner {detail.owner}
                </p>
              </div>
              <div className="rounded-xl border border-white/[.055] bg-white/[.022] px-4 py-3 text-center">
                <p className="text-xl font-semibold text-emerald-200">{detail.health}</p>
                <p className="mt-0.5 text-[8px] text-white/20">Health score</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Lifetime value", value: detail.spent },
                { label: "Engagements", value: detail.visits.toString() },
                { label: "Acquisition", value: detail.source },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/[.055] bg-white/[.022] p-3"
                >
                  <p className="text-[8px] text-white/18">{item.label}</p>
                  <p className="mt-1.5 text-[10px] font-semibold text-white/58">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-violet-400/10 bg-violet-400/[.045] p-4">
              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 size-4 text-violet-300" />
                <div>
                  <p className="text-[8px] text-white/20">Next booking</p>
                  <p className="mt-1 text-[10px] font-medium text-white/58">{detail.nextBooking}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_220px]">
              <label className="text-[9px] font-medium text-white/30">
                Relationship notes
                <textarea
                  value={detail.notes}
                  onChange={(event) => saveNotes(event.target.value)}
                  rows={5}
                  className="mt-2 w-full resize-none rounded-xl border border-white/[.065] bg-white/[.025] p-3 text-[10px] leading-5 text-white/48 outline-none focus:border-violet-400/30"
                />
              </label>
              <div>
                <p className="text-[9px] font-medium text-white/30">Recent activity</p>
                <div className="mt-3 space-y-3 border-l border-white/[.07] pl-4">
                  <div className="relative">
                    <span className="absolute -left-[19px] top-1 size-2 rounded-full bg-violet-400" />
                    <p className="text-[9px] font-medium text-white/48">Strategy brief shared</p>
                    <p className="mt-1 text-[8px] text-white/18">2 hours ago</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[19px] top-1 size-2 rounded-full bg-sky-400" />
                    <p className="text-[9px] font-medium text-white/48">Booking confirmed</p>
                    <p className="mt-1 text-[8px] text-white/18">Yesterday</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[19px] top-1 size-2 rounded-full bg-white/20" />
                    <p className="text-[9px] font-medium text-white/48">Invoice paid</p>
                    <p className="mt-1 text-[8px] text-white/18">8 June</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Dialog>

      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-5 right-5 z-[120] flex items-center gap-2 rounded-xl border border-emerald-400/15 bg-[#15191a] px-4 py-3 text-[10px] font-medium text-emerald-200 shadow-2xl"
        >
          <Check className="size-3.5" />
          {toast}
        </motion.div>
      ) : null}
    </>
  );
}
