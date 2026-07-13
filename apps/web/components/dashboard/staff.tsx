"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Filter,
  Mail,
  MapPin,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { staff as staffSeed } from "./data";
import { consumeDashboardIntent } from "./actions";
import { EmptyState, fadeUp, PageHeader, SectionHeading, stagger } from "./page";

type TeamStatus = "Available" | "In session" | "Focus time" | "Offline" | "Invited";
type Tone = "violet" | "blue" | "green" | "amber" | "rose";

type TeamMember = {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: string;
  status: TeamStatus;
  schedule: string;
  bookings: number;
  rating: number;
  revenue: string;
  utilization: number;
  bookedHours: number;
  nextSession: string;
  location: string;
  permission: "Owner" | "Admin" | "Member";
  skills: string[];
  workingDays: string[];
  tone: Tone;
};

const profileDetails: Record<
  string,
  Omit<
    TeamMember,
    "id" | "name" | "initials" | "role" | "bookings" | "rating" | "revenue" | "tone"
  >
> = {
  "Rav Singh": {
    email: "rav@wslabs.com.au",
    status: "In session",
    schedule: "Strategy session until 11:00 AM",
    utilization: 82,
    bookedHours: 34.5,
    nextSession: "Northstar Capital · 1:30 PM",
    location: "Perth studio",
    permission: "Owner",
    skills: ["Product strategy", "Commercial", "AI transformation"],
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
  "Maya Chen": {
    email: "maya@wslabs.com.au",
    status: "Available",
    schedule: "Open until 1:30 PM",
    utilization: 76,
    bookedHours: 31,
    nextSession: "Atlas Logistics · 1:30 PM",
    location: "Perth studio",
    permission: "Admin",
    skills: ["AI systems", "Automation", "Operations"],
    workingDays: ["Mon", "Tue", "Wed", "Thu"],
  },
  "Sofia Reed": {
    email: "sofia@wslabs.com.au",
    status: "In session",
    schedule: "Client workshop until 12:30 PM",
    utilization: 88,
    bookedHours: 36,
    nextSession: "Form House · 2:00 PM",
    location: "Remote · Sydney",
    permission: "Admin",
    skills: ["Product design", "Brand systems", "Research"],
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
  "Daniel Cole": {
    email: "daniel@wslabs.com.au",
    status: "Focus time",
    schedule: "Deep work until 2:00 PM",
    utilization: 67,
    bookedHours: 25,
    nextSession: "Aperture Group · 3:00 PM",
    location: "Remote · Melbourne",
    permission: "Member",
    skills: ["Engineering", "Architecture", "Technical advisory"],
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
};

const initialTeam: TeamMember[] = staffSeed.map((member, index) => ({
  id: `team-${index + 1}`,
  ...member,
  ...profileDetails[member.name],
})) as TeamMember[];

const statusTone = (status: TeamStatus) => {
  if (status === "Available") return "success" as const;
  if (status === "In session" || status === "Focus time") return "purple" as const;
  if (status === "Invited") return "warning" as const;
  return "neutral" as const;
};

const statusDot: Record<TeamStatus, string> = {
  Available: "bg-emerald-400",
  "In session": "bg-violet-400",
  "Focus time": "bg-sky-400",
  Offline: "bg-white/25",
  Invited: "bg-amber-300",
};

const selectClass =
  "mt-2 h-10 w-full rounded-xl border border-white/[.075] bg-white/[.035] px-3 text-[11px] text-white/80 outline-none transition focus:border-violet-400/45 focus:ring-4 focus:ring-violet-500/10";

const workingDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function PremiumStaffPage() {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Available" | "Busy">("All");
  const [selected, setSelected] = useState<TeamMember | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [scheduleExpanded, setScheduleExpanded] = useState(false);
  const [toast, setToast] = useState("");
  const [invite, setInvite] = useState({
    name: "",
    email: "",
    role: "Consultant",
    permission: "Member" as TeamMember["permission"],
  });
  const [editDraft, setEditDraft] = useState<TeamMember | null>(null);
  const router = useRouter();

  const filtered = useMemo(
    () =>
      team.filter((member) => {
        const matchesSearch = `${member.name} ${member.email} ${member.role}`
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesFilter =
          filter === "All" ||
          (filter === "Available" && member.status === "Available") ||
          (filter === "Busy" && ["In session", "Focus time"].includes(member.status));
        return matchesSearch && matchesFilter;
      }),
    [filter, search, team],
  );

  const totalHours = team.reduce((sum, member) => sum + member.bookedHours, 0);
  const averageUtilization = Math.round(
    team.reduce((sum, member) => sum + member.utilization, 0) / Math.max(team.length, 1),
  );

  const announce = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  useEffect(() => {
    if (consumeDashboardIntent("staff")) setInviteOpen(true);
  }, []);

  const sendInvite = () => {
    if (!invite.name.trim() || !invite.email.trim()) return;
    const member: TeamMember = {
      id: `team-${Date.now()}`,
      name: invite.name,
      initials: invite.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      email: invite.email,
      role: invite.role,
      status: "Invited",
      schedule: "Invitation pending",
      bookings: 0,
      rating: 0,
      revenue: "$0",
      utilization: 0,
      bookedHours: 0,
      nextSession: "No sessions scheduled",
      location: "Not set",
      permission: invite.permission,
      skills: [],
      workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      tone: "amber",
    };
    setTeam((current) => [...current, member]);
    setInviteOpen(false);
    setInvite({ name: "", email: "", role: "Consultant", permission: "Member" });
    announce(`Invite sent to ${member.email}`);
  };

  const openEdit = (member: TeamMember) => {
    setEditDraft({ ...member });
    setEditOpen(true);
  };

  const saveMember = () => {
    if (!editDraft) return;
    setTeam((current) =>
      current.map((member) => (member.id === editDraft.id ? editDraft : member)),
    );
    setSelected((current) => (current?.id === editDraft.id ? editDraft : current));
    setEditOpen(false);
    announce("Team profile updated");
  };

  const toggleWorkingDay = (day: string) => {
    if (!editDraft) return;
    setEditDraft({
      ...editDraft,
      workingDays: editDraft.workingDays.includes(day)
        ? editDraft.workingDays.filter((item) => item !== day)
        : [...editDraft.workingDays, day],
    });
  };

  return (
    <>
      <PageHeader
        eyebrow="Team · WS Labs studio"
        title="Staff"
        description="Balance capacity, client delivery and team availability from one calm operating view."
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setScheduleExpanded((value) => !value)}>
              <CalendarDays className="size-3.5" />
              Team schedule
            </Button>
            <Button onClick={() => setInviteOpen(true)}>
              <UserPlus className="size-4" />
              Invite member
            </Button>
          </div>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          {
            label: "Team members",
            value: team.length.toString(),
            note: `${team.filter((member) => member.status === "Available").length} available now`,
            icon: Users,
            tone: "text-violet-200",
          },
          {
            label: "Booked hours",
            value: `${totalHours.toFixed(1)}h`,
            note: "Across this week",
            icon: Clock3,
            tone: "text-sky-200",
          },
          {
            label: "Utilisation",
            value: `${averageUtilization}%`,
            note: "+5.4% from last month",
            icon: TrendingUp,
            tone: "text-emerald-200",
          },
          {
            label: "Client rating",
            value: "4.93",
            note: "386 verified reviews",
            icon: Star,
            tone: "text-amber-100",
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
              <p className={`mt-2 text-2xl font-semibold tracking-[-.04em] ${metric.tone}`}>
                {metric.value}
              </p>
              <p className="mt-1 text-[9px] text-white/24">{metric.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {scheduleExpanded ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="mb-4 overflow-hidden">
              <CardHeader className="border-b border-white/[.055] pb-4">
                <SectionHeading
                  title="Team capacity · 16–22 June"
                  description="A lightweight view of booked delivery and protected focus time."
                  action={<Badge tone="success">Healthy capacity</Badge>}
                />
              </CardHeader>
              <CardContent className="overflow-x-auto p-0">
                <div className="min-w-[760px]">
                  <div className="grid grid-cols-[180px_repeat(5,1fr)] border-b border-white/[.045] px-4 py-3 text-[8px] font-semibold uppercase tracking-[.12em] text-white/18">
                    <span>Team member</span>
                    {["Mon 16", "Tue 17", "Wed 18", "Thu 19", "Fri 20"].map((day) => (
                      <span key={day} className="text-center">
                        {day}
                      </span>
                    ))}
                  </div>
                  {team.slice(0, 4).map((member, memberIndex) => (
                    <div
                      key={member.id}
                      className="grid grid-cols-[180px_repeat(5,1fr)] items-center border-b border-white/[.045] px-4 py-3 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar initials={member.initials} tone={member.tone} className="size-7 text-[9px]" />
                        <span className="truncate text-[9px] font-medium text-white/48">
                          {member.name}
                        </span>
                      </div>
                      {Array.from({ length: 5 }).map((_, dayIndex) => {
                        const load = [72, 88, 55, 64, 42][(memberIndex + dayIndex) % 5] ?? 50;
                        return (
                          <div key={dayIndex} className="px-2">
                            <div className="h-7 rounded-lg border border-white/[.045] bg-white/[.018] p-1">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${load}%` }}
                                className={`h-full rounded-md ${
                                  load > 80
                                    ? "bg-rose-400/35"
                                    : load > 65
                                      ? "bg-violet-400/35"
                                      : "bg-emerald-400/25"
                                }`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mb-4 flex flex-col gap-3 rounded-[18px] border border-white/[.06] bg-white/[.018] p-3 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/18" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search team members…"
            className="h-9 pl-8 text-[10px]"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="flex rounded-xl border border-white/[.06] bg-white/[.02] p-0.5">
            {(["All", "Available", "Busy"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-[9px] px-3 py-1.5 text-[8px] font-semibold transition ${
                  filter === item
                    ? "bg-white/[.08] text-white/72"
                    : "text-white/22 hover:text-white/50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="size-9"
            aria-label="Cycle team filter"
            onClick={() => {
              const nextFilter = filter === "All" ? "Available" : filter === "Available" ? "Busy" : "All";
              setFilter(nextFilter);
              announce(`${nextFilter} team filter applied`);
            }}
          >
            <Filter className="size-3.5" />
          </Button>
        </div>
      </div>

      {filtered.length ? (
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3"
        >
          {filtered.map((member) => (
            <motion.div key={member.id} variants={fadeUp}>
              <Card className="group h-full overflow-hidden transition hover:-translate-y-1 hover:border-white/[.11] hover:shadow-[0_26px_80px_rgba(0,0,0,.32)]">
                <div className="h-px bg-gradient-to-r from-transparent via-violet-300/25 to-transparent opacity-0 transition group-hover:opacity-100" />
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <span className="relative">
                      <Avatar initials={member.initials} tone={member.tone} className="size-11" />
                      <span
                        className={`absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-[#121217] ${statusDot[member.status]}`}
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate text-[12px] font-semibold text-white/72">
                          {member.name}
                        </h3>
                        {member.permission === "Owner" ? (
                          <ShieldCheck className="size-3.5 text-violet-300/70" />
                        ) : null}
                      </div>
                      <p className="mt-0.5 truncate text-[9px] text-white/26">{member.role}</p>
                      <p className="mt-1 truncate text-[8px] text-white/18">{member.email}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => openEdit(member)}
                      aria-label={`Edit ${member.name}`}
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </div>

                  <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[.05] bg-white/[.022] px-3 py-2.5">
                    <div className="min-w-0">
                      <Badge tone={statusTone(member.status)}>{member.status}</Badge>
                      <p className="mt-1.5 truncate text-[8px] text-white/22">{member.schedule}</p>
                    </div>
                    <Clock3 className="ml-3 size-3.5 shrink-0 text-white/18" />
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-[8px]">
                      <span className="text-white/20">Weekly utilisation</span>
                      <span className="font-semibold text-white/52">{member.utilization}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[.055]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${member.utilization}%` }}
                        transition={{ duration: 0.65 }}
                        className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-300"
                      />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 divide-x divide-white/[.055] border-t border-white/[.055] pt-4">
                    <div>
                      <p className="text-[8px] text-white/18">Bookings</p>
                      <p className="mt-1 text-[10px] font-semibold text-white/58">{member.bookings}</p>
                    </div>
                    <div className="pl-4">
                      <p className="text-[8px] text-white/18">Rating</p>
                      <p className="mt-1 text-[10px] font-semibold text-white/58">
                        {member.rating ? `★ ${member.rating}` : "—"}
                      </p>
                    </div>
                    <div className="pl-4">
                      <p className="text-[8px] text-white/18">Revenue</p>
                      <p className="mt-1 text-[10px] font-semibold text-white/58">{member.revenue}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelected(member)}
                    className="mt-4 flex w-full items-center justify-between rounded-xl border border-white/[.055] bg-white/[.018] px-3 py-2.5 text-left transition hover:border-violet-400/15 hover:bg-violet-400/[.045]"
                  >
                    <span>
                      <span className="block text-[8px] text-white/18">Next session</span>
                      <span className="mt-1 block text-[9px] font-medium text-white/48">
                        {member.nextSession}
                      </span>
                    </span>
                    <ChevronRight className="size-3.5 text-white/18" />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyState
          icon={Users}
          title="No team members found"
          description="Try another search or invite someone new to the WS Labs workspace."
          action={
            <Button size="sm" onClick={() => setInviteOpen(true)}>
              <UserPlus className="size-3.5" />
              Invite member
            </Button>
          }
        />
      )}

      <Dialog
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Invite team member"
        description="Give someone secure access to the WS Labs workspace."
        footer={
          <>
            <Button variant="ghost" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={sendInvite}
              disabled={!invite.name.trim() || !invite.email.trim()}
            >
              <Mail className="size-3.5" />
              Send invite
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-[10px] font-medium text-white/42">
            Full name
            <Input
              autoFocus
              value={invite.name}
              onChange={(event) => setInvite({ ...invite, name: event.target.value })}
              placeholder="Team member name"
              className="mt-2"
            />
          </label>
          <label className="text-[10px] font-medium text-white/42">
            Work email
            <Input
              type="email"
              value={invite.email}
              onChange={(event) => setInvite({ ...invite, email: event.target.value })}
              placeholder="name@wslabs.com.au"
              className="mt-2"
            />
          </label>
          <label className="text-[10px] font-medium text-white/42">
            Role
            <Input
              value={invite.role}
              onChange={(event) => setInvite({ ...invite, role: event.target.value })}
              className="mt-2"
            />
          </label>
          <label className="text-[10px] font-medium text-white/42">
            Permission
            <select
              value={invite.permission}
              onChange={(event) =>
                setInvite({
                  ...invite,
                  permission: event.target.value as TeamMember["permission"],
                })
              }
              className={selectClass}
            >
              <option>Member</option>
              <option>Admin</option>
            </select>
          </label>
          <div className="sm:col-span-2 rounded-xl border border-violet-400/10 bg-violet-400/[.045] p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 size-4 text-violet-300" />
              <div>
                <p className="text-[10px] font-semibold text-white/58">Smart onboarding</p>
                <p className="mt-1 text-[9px] leading-4 text-white/27">
                  Echelon will prepare a personalised workspace checklist based on this role.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.name ?? "Team member"}
        {...(selected ? { description: selected.role } : {})}
        footer={
          selected ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setSelected(null);
                  router.push(`/business-dashboard/messages?create=message&name=${encodeURIComponent(selected.name)}&email=${encodeURIComponent(selected.email)}`);
                }}
              >
                <Mail className="size-3.5" />
                Message
              </Button>
              <Button onClick={() => openEdit(selected)}>Edit profile</Button>
            </>
          ) : null
        }
      >
        {selected ? (
          <div>
            <div className="flex items-center gap-3">
              <span className="relative">
                <Avatar initials={selected.initials} tone={selected.tone} className="size-12" />
                <span
                  className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-[#121217] ${statusDot[selected.status]}`}
                />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white/75">{selected.name}</p>
                  <Badge tone={statusTone(selected.status)}>{selected.status}</Badge>
                </div>
                <p className="mt-1 text-[9px] text-white/25">{selected.email}</p>
              </div>
              <Badge tone="purple">{selected.permission}</Badge>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/[.055] bg-white/[.022] p-3">
                <CalendarDays className="size-3.5 text-violet-300/70" />
                <p className="mt-2 text-[9px] text-white/22">Next session</p>
                <p className="mt-1 text-[10px] font-medium text-white/58">{selected.nextSession}</p>
              </div>
              <div className="rounded-xl border border-white/[.055] bg-white/[.022] p-3">
                <MapPin className="size-3.5 text-sky-300/70" />
                <p className="mt-2 text-[9px] text-white/22">Work location</p>
                <p className="mt-1 text-[10px] font-medium text-white/58">{selected.location}</p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-white/[.055] bg-white/[.018] p-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold text-white/58">Performance</p>
                <span className="text-[8px] text-emerald-300">On track</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div>
                  <p className="text-[8px] text-white/18">Booked hours</p>
                  <p className="mt-1 text-sm font-semibold text-white/68">{selected.bookedHours}h</p>
                </div>
                <div>
                  <p className="text-[8px] text-white/18">Utilisation</p>
                  <p className="mt-1 text-sm font-semibold text-white/68">{selected.utilization}%</p>
                </div>
                <div>
                  <p className="text-[8px] text-white/18">Revenue</p>
                  <p className="mt-1 text-sm font-semibold text-white/68">{selected.revenue}</p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-[9px] font-medium text-white/30">Capabilities</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selected.skills.length ? (
                  selected.skills.map((skill) => (
                    <Badge key={skill} tone="neutral">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-[9px] text-white/18">Skills will appear after onboarding.</span>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </Dialog>

      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit team profile"
        description="Update access, availability and working preferences."
        footer={
          <>
            <Button variant="ghost" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveMember} disabled={!editDraft?.name.trim()}>
              Save changes
            </Button>
          </>
        }
      >
        {editDraft ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-[10px] font-medium text-white/42">
              Full name
              <Input
                value={editDraft.name}
                onChange={(event) => setEditDraft({ ...editDraft, name: event.target.value })}
                className="mt-2"
              />
            </label>
            <label className="text-[10px] font-medium text-white/42">
              Role
              <Input
                value={editDraft.role}
                onChange={(event) => setEditDraft({ ...editDraft, role: event.target.value })}
                className="mt-2"
              />
            </label>
            <label className="text-[10px] font-medium text-white/42">
              Status
              <select
                value={editDraft.status}
                onChange={(event) =>
                  setEditDraft({ ...editDraft, status: event.target.value as TeamStatus })
                }
                className={selectClass}
              >
                <option>Available</option>
                <option>In session</option>
                <option>Focus time</option>
                <option>Offline</option>
              </select>
            </label>
            <label className="text-[10px] font-medium text-white/42">
              Permission
              <select
                value={editDraft.permission}
                disabled={editDraft.permission === "Owner"}
                onChange={(event) =>
                  setEditDraft({
                    ...editDraft,
                    permission: event.target.value as TeamMember["permission"],
                  })
                }
                className={selectClass}
              >
                {editDraft.permission === "Owner" ? <option>Owner</option> : null}
                <option>Admin</option>
                <option>Member</option>
              </select>
            </label>
            <label className="text-[10px] font-medium text-white/42 sm:col-span-2">
              Location
              <Input
                value={editDraft.location}
                onChange={(event) => setEditDraft({ ...editDraft, location: event.target.value })}
                className="mt-2"
              />
            </label>
            <div className="sm:col-span-2">
              <p className="text-[10px] font-medium text-white/42">Working days</p>
              <div className="mt-2 grid grid-cols-7 gap-1.5">
                {workingDays.map((day) => {
                  const active = editDraft.workingDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleWorkingDay(day)}
                      className={`h-9 rounded-lg border text-[8px] font-semibold transition ${
                        active
                          ? "border-violet-400/20 bg-violet-400/12 text-violet-200"
                          : "border-white/[.055] bg-white/[.02] text-white/20"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="sm:col-span-2 flex items-center justify-between rounded-xl border border-white/[.055] bg-white/[.02] p-3">
              <div>
                <p className="text-[10px] font-medium text-white/48">Accept new bookings</p>
                <p className="mt-1 text-[8px] text-white/20">Include this member in scheduling.</p>
              </div>
              <Switch
                label="Accept new bookings"
                checked={editDraft.status !== "Offline"}
                onCheckedChange={(checked) =>
                  setEditDraft({
                    ...editDraft,
                    status: checked ? "Available" : "Offline",
                  })
                }
              />
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
