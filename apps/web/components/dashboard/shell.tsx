"use client";

import { OrganizationSwitcher, useOrganization, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Bell,
  CalendarDays,
  CalendarPlus,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Command,
  Contact,
  CreditCard,
  ExternalLink,
  FilePlus2,
  Globe2,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Plus,
  Plug,
  Search,
  Settings,
  Sparkles,
  Star,
  UserPlus,
  Users,
  UserRound,
  WandSparkles,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";
import { BrandLogo } from "./brand-logo";

const navigation = [
  { label: "Overview", href: "/business-dashboard", icon: LayoutDashboard },
  { label: "Calendar", href: "/business-dashboard/calendar", icon: CalendarDays },
  { label: "Bookings", href: "/business-dashboard/bookings", icon: CreditCard, count: 6 },
  { label: "Services", href: "/business-dashboard/services", icon: Wrench },
  { label: "Staff", href: "/business-dashboard/staff", icon: UserRound },
  { label: "Customers", href: "/business-dashboard/customers", icon: Users },
  { label: "Reviews", href: "/business-dashboard/reviews", icon: Star, count: 3 },
  { label: "Messages", href: "/business-dashboard/messages", icon: MessageSquare, count: 3 },
];

const secondary = [
  { label: "Analytics", href: "/business-dashboard/analytics", icon: BarChart3 },
  { label: "Integrations", href: "/business-dashboard/integrations", icon: Plug },
  { label: "Settings", href: "/business-dashboard/settings", icon: Settings },
];

const quickCreateItems = [
  { label: "Booking", description: "Add a client session", icon: CreditCard, href: "/business-dashboard/bookings?create=booking" },
  { label: "Calendar event", description: "Block time or schedule work", icon: CalendarPlus, href: "/business-dashboard/calendar?create=event" },
  { label: "Customer", description: "Create a relationship", icon: Contact, href: "/business-dashboard/customers?create=customer" },
  { label: "Service", description: "Publish a new offer", icon: Wrench, href: "/business-dashboard/services?create=service" },
  { label: "Team member", description: "Invite someone to your team", icon: UserPlus, href: "/business-dashboard/staff?create=staff" },
  { label: "Message", description: "Start a client conversation", icon: MessageSquare, href: "/business-dashboard/messages?create=message" },
];

const notificationSeed = [
  { id: 1, title: "Three bookings need approval", detail: "$14,600 in pending work", href: "/business-dashboard/bookings", read: false },
  { id: 2, title: "New client review", detail: "Grace Mitchell left five stars", href: "/business-dashboard/reviews", read: false },
  { id: 3, title: "Calendar capacity signal", detail: "Friday is now 92% allocated", href: "/business-dashboard/calendar", read: false },
];

interface DashboardIdentity {
  businessName: string;
  businessDescription: string;
  businessInitials: string;
  userName: string;
  userEmail: string;
  userInitials: string;
  membershipLabel: string;
}

const demoIdentity: DashboardIdentity = {
  businessName: "WS Labs",
  businessDescription: "Digital product studio",
  businessInitials: "WS",
  userName: "Rav Singh",
  userEmail: "rav@wslabs.com.au",
  userInitials: "RS",
  membershipLabel: "Owner",
};

function initialsFor(value: string, fallback: string): string {
  const initials = value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
  return initials || fallback;
}

function Navigation({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  const renderLink = (item: (typeof navigation)[number]) => {
    const active = pathname === item.href;
    return (
      <Link
        key={item.href}
        href={item.href}
        title={collapsed ? item.label : undefined}
        {...(onNavigate ? { onClick: onNavigate } : {})}
        className={cn(
          "group relative flex h-10 items-center rounded-xl text-[13px] font-medium outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-violet-400/45",
          collapsed ? "mx-auto w-10 justify-center" : "gap-3 px-3",
          active
            ? "bg-white/[.075] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.04)]"
            : "text-white/38 hover:bg-white/[.045] hover:text-white/80",
        )}
      >
        {active ? <motion.span layoutId="dashboard-active-nav" className="absolute -left-[9px] h-5 w-0.5 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(139,124,255,.9)]" /> : null}
        <motion.span whileHover={{ scale: 1.08, rotate: active ? 0 : -2 }} transition={{ type: "spring", stiffness: 380, damping: 22 }}>
          <item.icon className="size-[17px]" strokeWidth={active ? 2.1 : 1.7} />
        </motion.span>
        {!collapsed ? <span className="flex-1">{item.label}</span> : null}
        {!collapsed && item.count ? <span className={cn("min-w-5 rounded-full px-1.5 py-0.5 text-center text-[9px] font-bold", active ? "bg-violet-400/15 text-violet-200" : "bg-white/[.055] text-white/35")}>{item.count}</span> : null}
        {collapsed && item.count ? <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-violet-400 ring-2 ring-[#0e0e13]" /> : null}
      </Link>
    );
  };

  return (
    <nav className={cn("flex flex-1 flex-col gap-1", collapsed ? "px-2" : "px-3")}>
      {!collapsed ? <p className="mb-1 px-3 text-[9px] font-semibold uppercase tracking-[.18em] text-white/20">Workspace</p> : <div className="mb-2 h-px bg-white/[.06]" />}
      {navigation.map(renderLink)}
      <div className="my-3 h-px bg-white/[.06]" />
      {!collapsed ? <p className="mb-1 px-3 text-[9px] font-semibold uppercase tracking-[.18em] text-white/20">System</p> : null}
      {secondary.map(renderLink)}
    </nav>
  );
}

function SidebarContent({
  collapsed,
  onNavigate,
  onCollapse,
  onWorkspace,
  onAi,
  onSettings,
  pageKey,
  identity,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
  onCollapse?: () => void;
  onWorkspace: () => void;
  onAi: () => void;
  onSettings: () => void;
  pageKey: string;
  identity: DashboardIdentity;
}) {
  return (
    <>
      <div className={cn("flex h-[76px] items-center", collapsed ? "justify-center px-3" : "gap-3 px-4")}>
        <BrandLogo key={pageKey} compact={collapsed} />
        {!collapsed ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-w-0 flex-1"><p className="text-[11px] font-semibold uppercase tracking-[.2em] text-white/88">Echelon</p><p className="mt-0.5 text-[9px] uppercase tracking-[.12em] text-white/25">Business OS</p></motion.div> : null}
        {onCollapse ? <button onClick={onCollapse} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className="grid size-8 place-items-center rounded-lg text-white/25 transition hover:bg-white/[.05] hover:text-white/70">{collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}</button> : null}
      </div>

      <div className="mb-4 px-3">
        <button onClick={onWorkspace} aria-label="Open workspace switcher" className={cn("group flex w-full items-center rounded-2xl border border-white/[.065] bg-white/[.025] text-left shadow-[inset_0_1px_0_rgba(255,255,255,.025)] transition hover:border-white/[.11] hover:bg-white/[.045]", collapsed ? "justify-center p-2" : "gap-3 p-2.5")}>
          <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-400/25 to-indigo-500/10 text-[10px] font-bold text-violet-200 ring-1 ring-violet-300/15">{identity.businessInitials}</span>
          {!collapsed ? <><span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold text-white/82">{identity.businessName}</span><span className="mt-0.5 block truncate text-[9px] text-white/28">{identity.businessDescription}</span></span><ChevronDown className="size-3.5 text-white/25 transition group-hover:text-white/60" /></> : null}
        </button>
      </div>

      <Navigation collapsed={collapsed} {...(onNavigate ? { onNavigate } : {})} />

      {!collapsed ? (
        <motion.div whileHover={{ y: -2 }} className="relative m-3 overflow-hidden rounded-[18px] border border-violet-400/15 bg-gradient-to-br from-violet-500/[.11] via-white/[.035] to-indigo-500/[.07] p-3.5 shadow-[0_18px_50px_rgba(0,0,0,.2)]">
          <div className="absolute -right-4 -top-4 size-16 rounded-full bg-violet-500/20 blur-2xl" />
          <div className="relative flex items-center gap-2 text-[11px] font-semibold text-violet-200"><Sparkles className="size-3.5" /> Echelon AI</div>
          <p className="relative mt-2 text-[10px] leading-4 text-white/38">Project revenue is tracking 22% above your quarterly target.</p>
          <button onClick={onAi} className="relative mt-3 text-[10px] font-semibold text-violet-300 transition hover:text-violet-200">Open intelligence →</button>
        </motion.div>
      ) : <button onClick={onAi} aria-label="Open Echelon AI" title="Echelon AI" className="mx-auto mb-3 grid size-10 place-items-center rounded-xl border border-violet-400/15 bg-violet-500/10 text-violet-300"><Sparkles className="size-4" /></button>}

      <div className={cn("flex items-center border-t border-white/[.055]", collapsed ? "justify-center p-3" : "gap-3 p-3.5")}>
        <Avatar initials={identity.userInitials} className="size-8 ring-1 ring-white/10" />
        {!collapsed ? <><div className="min-w-0 flex-1"><p className="truncate text-[11px] font-semibold text-white/75">{identity.userName}</p><p className="truncate text-[9px] text-white/28">{identity.membershipLabel} · {identity.businessName}</p></div><button onClick={onSettings} aria-label="Account settings" className="grid size-8 place-items-center rounded-lg text-white/25 transition hover:bg-white/[.05] hover:text-white/65"><Settings className="size-3.5" /></button></> : null}
      </div>
    </>
  );
}

function TopAction({ label, children, indicator, onClick }: { label: string; children: React.ReactNode; indicator?: boolean; onClick: () => void }) {
  return <button onClick={onClick} aria-label={label} title={label} className="relative grid size-9 place-items-center rounded-xl border border-transparent text-white/38 transition-all hover:border-white/[.07] hover:bg-white/[.045] hover:text-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/45">{children}{indicator ? <span className="absolute right-2 top-2 size-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,124,255,.9)] ring-2 ring-[#0d0d11]" /> : null}</button>;
}

function DashboardShellView({
  children,
  identity,
  authEnabled,
}: {
  children: React.ReactNode;
  identity: DashboardIdentity;
  authEnabled: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [preferencesReady, setPreferencesReady] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationSeed);
  const [profileOpen, setProfileOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [toast, setToast] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const allNavigation = useMemo(() => [...navigation, ...secondary], []);
  const commandResults = useMemo(
    () => allNavigation.filter((item) => item.label.toLowerCase().includes(commandQuery.toLowerCase())),
    [allNavigation, commandQuery],
  );
  const unreadNotifications = notifications.filter((item) => !item.read).length;

  const announce = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const navigate = (href: string) => {
    setCommandOpen(false);
    setCommandQuery("");
    setQuickCreateOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
    setWorkspaceOpen(false);
    router.push(href);
  };

  useEffect(() => {
    setCollapsed(window.localStorage.getItem("echelon-sidebar-collapsed") === "true");
    setPreferencesReady(true);
  }, []);

  useEffect(() => {
    if (preferencesReady) window.localStorage.setItem("echelon-sidebar-collapsed", String(collapsed));
  }, [collapsed, preferencesReady]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const sidebarProps = {
    onWorkspace: () => setWorkspaceOpen(true),
    onAi: () => setAiOpen(true),
    onSettings: () => navigate("/business-dashboard/settings"),
    pageKey: pathname,
    identity,
  };

  return (
    <div className="echelon-dashboard min-h-screen bg-[#09090c] text-white/90">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_68%_-10%,rgba(109,91,230,.09),transparent_32%),radial-gradient(circle_at_15%_85%,rgba(63,53,130,.05),transparent_30%)]" />
      <aside className={cn("fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-white/[.055] bg-[#0d0d11]/95 shadow-[20px_0_60px_rgba(0,0,0,.12)] backdrop-blur-2xl transition-[width] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] lg:flex", collapsed ? "w-[84px]" : "w-[248px]")}>
        <SidebarContent collapsed={collapsed} onCollapse={() => setCollapsed((value) => !value)} {...sidebarProps} />
      </aside>

      <AnimatePresence>
        {mobileOpen ? <><motion.button aria-label="Close navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md lg:hidden" /><motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", stiffness: 320, damping: 30 }} className="fixed inset-y-0 left-0 z-[60] flex w-[272px] flex-col border-r border-white/[.07] bg-[#0d0d11] shadow-2xl lg:hidden"><button aria-label="Close navigation" onClick={() => setMobileOpen(false)} className="absolute right-3 top-3 z-20 grid size-8 place-items-center rounded-lg text-white/35 hover:bg-white/[.06] hover:text-white"><X className="size-4" /></button><SidebarContent collapsed={false} onNavigate={() => setMobileOpen(false)} {...sidebarProps} /></motion.aside></> : null}
      </AnimatePresence>

      <div className={cn("relative transition-[padding] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]", collapsed ? "lg:pl-[84px]" : "lg:pl-[248px]")}>
        <header className="sticky top-0 z-30 flex h-[72px] items-center gap-3 border-b border-white/[.055] bg-[#0b0b0f]/78 px-4 backdrop-blur-2xl sm:px-6 lg:px-7">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu className="size-5" /></Button>
          <div className="relative hidden w-full max-w-[420px] sm:block">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/25" />
            <Input value={commandQuery} onChange={(event) => setCommandQuery(event.target.value)} onFocus={() => setCommandOpen(true)} className="h-9 rounded-xl border-white/[.055] bg-white/[.025] pl-9 pr-16 text-xs hover:bg-white/[.04] focus:bg-white/[.05]" placeholder="Search workspace, clients, projects…" />
            <span className="pointer-events-none absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md border border-white/[.07] bg-white/[.035] px-1.5 py-1 text-[8px] font-medium text-white/25"><Command className="size-2.5" /> K</span>
          </div>
          <div className="ml-auto flex items-center gap-0.5">
            <TopAction label="AI assistant" onClick={() => setAiOpen(true)}><WandSparkles className="size-[17px]" /></TopAction>
            <TopAction label="Messages" indicator onClick={() => navigate("/business-dashboard/messages")}><MessageSquare className="size-[17px]" /></TopAction>
            <TopAction label="Notifications" indicator={unreadNotifications > 0} onClick={() => setNotificationsOpen(true)}><Bell className="size-[17px]" /></TopAction>
            <div className="mx-2 hidden h-5 w-px bg-white/[.07] sm:block" />
            <button onClick={() => setProfileOpen(true)} aria-label="Open profile menu" className="hidden items-center gap-2 rounded-xl px-2 py-1.5 text-left transition hover:bg-white/[.045] sm:flex"><Avatar initials={identity.userInitials} className="size-7" /><span><span className="block text-[10px] font-semibold text-white/72">{identity.userName}</span><span className="block text-[8px] text-white/25">{identity.businessName}</span></span><ChevronDown className="size-3 text-white/25" /></button>
            <Button size="sm" className="ml-1.5 h-9" onClick={() => setQuickCreateOpen(true)} aria-label="Quick create"><Plus className="size-3.5" /> <span className="hidden sm:inline">Quick create</span></Button>
          </div>
        </header>
        <main className="relative mx-auto w-full max-w-[1680px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8"><motion.div key={pathname} initial={{ opacity: 0, y: 6, filter: "blur(3px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: .32, ease: [.22, 1, .36, 1] }}>{children}</motion.div></main>
      </div>

      <Dialog open={commandOpen} onClose={() => setCommandOpen(false)} title="Search Echelon" description="Jump to any workspace or start an action." className="max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/25" />
          <Input autoFocus value={commandQuery} onChange={(event) => setCommandQuery(event.target.value)} placeholder="Search pages and actions…" className="h-11 pl-10" />
        </div>
        <div className="mt-4 grid gap-1">
          {commandResults.map((item) => <button key={item.href} onClick={() => navigate(item.href)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-white/[.045]"><span className="grid size-8 place-items-center rounded-lg bg-white/[.035] text-white/38"><item.icon className="size-4" /></span><span className="text-[11px] font-medium text-white/62">{item.label}</span><ChevronRight className="ml-auto size-3.5 text-white/18" /></button>)}
          {!commandResults.length ? <div className="rounded-xl border border-dashed border-white/[.07] p-6 text-center text-[10px] text-white/28">No matching workspace. Try “bookings”, “customers” or “settings”.</div> : null}
          <div className="my-2 h-px bg-white/[.055]" />
          <button onClick={() => { setCommandOpen(false); setQuickCreateOpen(true); }} className="flex items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-violet-400/[.06]"><span className="grid size-8 place-items-center rounded-lg bg-violet-400/10 text-violet-300"><Plus className="size-4" /></span><span className="text-[11px] font-medium text-white/62">Quick create</span><span className="ml-auto text-[8px] text-white/20">New booking, client or service</span></button>
        </div>
      </Dialog>

      <Dialog open={quickCreateOpen} onClose={() => setQuickCreateOpen(false)} title="Quick create" description="Start the next piece of work without losing momentum." className="max-w-2xl">
        <div className="grid gap-2 sm:grid-cols-2">
          {quickCreateItems.map((item) => <button key={item.label} onClick={() => navigate(item.href)} className="group flex items-center gap-3 rounded-2xl border border-white/[.06] bg-white/[.02] p-4 text-left transition hover:-translate-y-0.5 hover:border-violet-400/20 hover:bg-violet-400/[.055]"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-violet-400/10 text-violet-300 transition group-hover:bg-violet-400/15"><item.icon className="size-4" /></span><span><span className="block text-[11px] font-semibold text-white/68">{item.label}</span><span className="mt-1 block text-[9px] text-white/24">{item.description}</span></span><ChevronRight className="ml-auto size-3.5 text-white/16 transition group-hover:translate-x-0.5 group-hover:text-violet-300" /></button>)}
        </div>
      </Dialog>

      <Dialog open={aiOpen} onClose={() => setAiOpen(false)} title="Echelon intelligence" description="Ask about revenue, clients, delivery or capacity." footer={<><Button variant="ghost" onClick={() => { setAiPrompt(""); setAiAnswer(""); }}>Clear</Button><Button onClick={() => setAiAnswer(aiPrompt.trim() ? `${identity.businessName} is 22% ahead of quarterly plan. The strongest next move is converting strategy workshops into recurring advisory retainers while protecting Friday delivery capacity.` : "Ask a question first.")}><Sparkles className="size-3.5" /> Analyse</Button></>}>
        <div className="rounded-2xl border border-violet-400/12 bg-violet-400/[.045] p-4">
          <p className="text-[9px] font-semibold uppercase tracking-[.13em] text-violet-200/65">Live signal</p>
          <p className="mt-2 text-[11px] leading-5 text-white/42">Enterprise conversion is accelerating, with an estimated quarterly upside of $86.4k.</p>
        </div>
        <label className="mt-4 block text-[10px] font-medium text-white/42">Ask Echelon<Input autoFocus value={aiPrompt} onChange={(event) => setAiPrompt(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") setAiAnswer(`${identity.businessName} is 22% ahead of quarterly plan. Focus next on recurring advisory and Friday capacity.`); }} placeholder="What should I focus on this week?" className="mt-2" /></label>
        <div className="mt-3 flex flex-wrap gap-2">{["Where is revenue growing?", "Which clients need attention?", "Show capacity risk"].map((prompt) => <button key={prompt} onClick={() => setAiPrompt(prompt)} className="rounded-lg border border-white/[.06] px-2.5 py-1.5 text-[8px] text-white/32 transition hover:border-violet-400/20 hover:text-violet-200">{prompt}</button>)}</div>
        {aiAnswer ? <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-2xl border border-white/[.06] bg-white/[.025] p-4 text-[10px] leading-5 text-white/42">{aiAnswer}<button onClick={() => navigate("/business-dashboard/analytics")} className="mt-3 flex items-center gap-1 text-[9px] font-semibold text-violet-300">Open analytics <ChevronRight className="size-3" /></button></motion.div> : null}
      </Dialog>

      <Dialog open={notificationsOpen} onClose={() => setNotificationsOpen(false)} title="Notifications" description={`${unreadNotifications} unread signals across ${identity.businessName}.`} footer={<Button variant="ghost" onClick={() => setNotifications((items) => items.map((item) => ({ ...item, read: true }))) }><Check className="size-3.5" /> Mark all read</Button>}>
        <div className="space-y-2">{notifications.map((notification) => <button key={notification.id} onClick={() => { setNotifications((items) => items.map((item) => item.id === notification.id ? { ...item, read: true } : item)); navigate(notification.href); }} className="flex w-full items-start gap-3 rounded-2xl border border-white/[.055] bg-white/[.018] p-4 text-left transition hover:border-white/[.1] hover:bg-white/[.03]"><span className={cn("mt-1 size-2 shrink-0 rounded-full", notification.read ? "bg-white/15" : "bg-violet-400 shadow-[0_0_10px_rgba(139,124,255,.7)]")} /><span className="min-w-0"><span className="block text-[10px] font-semibold text-white/62">{notification.title}</span><span className="mt-1 block text-[9px] text-white/25">{notification.detail}</span></span><ChevronRight className="ml-auto mt-1 size-3.5 text-white/18" /></button>)}</div>
      </Dialog>

      <Dialog open={profileOpen} onClose={() => setProfileOpen(false)} title={identity.userName} description={`${identity.membershipLabel} · ${identity.businessName}`}>
        <div className="flex items-center gap-4 rounded-2xl border border-white/[.06] bg-white/[.02] p-4"><Avatar initials={identity.userInitials} className="size-12" /><div><p className="text-sm font-semibold text-white/75">{identity.userName}</p><p className="mt-1 text-[9px] text-white/25">{identity.userEmail}</p></div><span className="ml-auto rounded-full border border-emerald-400/15 bg-emerald-400/[.07] px-2 py-1 text-[8px] font-semibold text-emerald-300">{identity.membershipLabel}</span></div>
        <div className="mt-3 grid gap-2"><button onClick={() => navigate("/business-dashboard/settings")} className="flex items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-white/[.04]"><Settings className="size-4 text-white/30" /><span className="text-[10px] font-medium text-white/52">Account and workspace settings</span><ChevronRight className="ml-auto size-3.5 text-white/16" /></button><button onClick={() => navigate("/auth/continue?mode=consumer&returnTo=%2Fdashboard")} className="flex items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-white/[.04]"><UserRound className="size-4 text-white/30" /><span className="text-[10px] font-medium text-white/52">Switch to personal dashboard</span><ChevronRight className="ml-auto size-3.5 text-white/16" /></button><button onClick={() => navigate("/")} className="flex items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-white/[.04]"><Globe2 className="size-4 text-white/30" /><span className="text-[10px] font-medium text-white/52">Open public Echelon site</span><ExternalLink className="ml-auto size-3.5 text-white/16" /></button></div>
      </Dialog>

      <Dialog open={workspaceOpen} onClose={() => setWorkspaceOpen(false)} title="Workspace" description="Manage the business currently connected to this dashboard.">
        <div className="flex w-full items-center gap-3 rounded-2xl border border-violet-400/15 bg-violet-400/[.055] p-4"><span className="grid size-10 place-items-center rounded-xl bg-violet-400/15 text-[11px] font-bold text-violet-200">{identity.businessInitials}</span><span className="min-w-0"><span className="block truncate text-[11px] font-semibold text-white/68">{identity.businessName}</span><span className="mt-1 block truncate text-[9px] text-white/25">{identity.businessDescription}</span></span><Check className="ml-auto size-4 text-violet-300" /></div>
        {authEnabled ? <div className="mt-3 rounded-2xl border border-white/[.06] bg-white/[.018] p-3"><p className="mb-2 text-[8px] font-semibold uppercase tracking-[.13em] text-white/22">Switch context</p><OrganizationSwitcher hidePersonal={false} afterSelectOrganizationUrl="/business-dashboard" afterSelectPersonalUrl="/dashboard" afterCreateOrganizationUrl="/business-dashboard" skipInvitationScreen appearance={{ elements: { rootBox: "w-full", organizationSwitcherTrigger: "w-full justify-between rounded-xl border border-white/[.07] bg-white/[.025] px-3 py-2.5 text-white/65" } }} /></div> : null}
        <div className="mt-3 grid gap-2 sm:grid-cols-2"><Button variant="outline" onClick={() => navigate("/business-dashboard/settings")}>Workspace settings</Button><Button variant="ghost" onClick={() => navigate("/business-onboarding?returnTo=%2Fbusiness-dashboard")}><FilePlus2 className="size-3.5" /> Add workspace</Button></div>
        <Button variant="ghost" className="mt-2 w-full" onClick={() => navigate("/auth/continue?mode=consumer&returnTo=%2Fdashboard")}><UserRound className="size-3.5" /> Switch to personal dashboard</Button>
      </Dialog>

      {toast ? <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-5 right-5 z-[140] flex items-center gap-2 rounded-xl border border-emerald-400/15 bg-[#15191a] px-4 py-3 text-[10px] font-medium text-emerald-200 shadow-2xl"><Check className="size-3.5" /> {toast}</motion.div> : null}
    </div>
  );
}

function ClerkDashboardShell({ children }: { children: React.ReactNode }) {
  const { organization, membership } = useOrganization();
  const { user } = useUser();
  const businessName = organization?.name ?? demoIdentity.businessName;
  const userName = user?.fullName ?? user?.firstName ?? demoIdentity.userName;
  const role = membership?.role;
  const identity: DashboardIdentity = {
    businessName,
    businessDescription: organization?.slug ? `Business workspace · ${organization.slug}` : "Business workspace",
    businessInitials: initialsFor(businessName, demoIdentity.businessInitials),
    userName,
    userEmail: user?.primaryEmailAddress?.emailAddress ?? demoIdentity.userEmail,
    userInitials: initialsFor(userName, demoIdentity.userInitials),
    membershipLabel: role === "org:admin" ? "Owner" : role ? "Member" : demoIdentity.membershipLabel,
  };

  return <DashboardShellView identity={identity} authEnabled>{children}</DashboardShellView>;
}

export function DashboardShell({
  children,
  authEnabled = false,
}: {
  children: React.ReactNode;
  authEnabled?: boolean;
}) {
  if (authEnabled) return <ClerkDashboardShell>{children}</ClerkDashboardShell>;
  return <DashboardShellView identity={demoIdentity} authEnabled={false}>{children}</DashboardShellView>;
}
