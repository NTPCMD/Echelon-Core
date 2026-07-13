"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  ChevronRight,
  CircleDot,
  Copy,
  CreditCard,
  ExternalLink,
  Globe2,
  KeyRound,
  Link2,
  Mail,
  MapPin,
  Plug,
  RefreshCw,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Unplug,
  Webhook,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { Switch } from "../ui/switch";
import { EmptyState, PageHeader, SectionHeading } from "./page";
import { consumeDashboardIntent } from "./actions";

type IntegrationCategory = "Payments" | "Calendar" | "CRM" | "Marketing" | "Reputation" | "Automation";
type WebhookEvent = "bookings" | "customers" | "payments";

type Integration = {
  id: string;
  name: string;
  description: string;
  category: IntegrationCategory;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
  connected: boolean;
  account: string;
  lastSync: string;
  syncedRecords: string;
  syncBookings: boolean;
  syncCustomers: boolean;
  syncPayments: boolean;
};

const initialIntegrations: Integration[] = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Payments, deposits and invoices",
    category: "Payments",
    icon: CreditCard,
    tone: "from-indigo-500/25 to-indigo-500/5 text-indigo-200",
    connected: true,
    account: "WS Labs Pty Ltd · AU",
    lastSync: "2 minutes ago",
    syncedRecords: "1,284 payments",
    syncBookings: true,
    syncCustomers: true,
    syncPayments: true,
  },
  {
    id: "gohighlevel",
    name: "GoHighLevel",
    description: "CRM, workflows and lifecycle automation",
    category: "CRM",
    icon: Zap,
    tone: "from-emerald-500/20 to-emerald-500/5 text-emerald-200",
    connected: false,
    account: "Not connected",
    lastSync: "Never",
    syncedRecords: "0 records",
    syncBookings: true,
    syncCustomers: true,
    syncPayments: false,
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Two-way team calendar sync",
    category: "Calendar",
    icon: CalendarDays,
    tone: "from-sky-500/20 to-sky-500/5 text-sky-200",
    connected: true,
    account: "calendar@wslabs.com.au",
    lastSync: "5 minutes ago",
    syncedRecords: "318 events",
    syncBookings: true,
    syncCustomers: false,
    syncPayments: false,
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Campaigns and audience segments",
    category: "Marketing",
    icon: Mail,
    tone: "from-amber-400/20 to-amber-400/5 text-amber-100",
    connected: false,
    account: "Not connected",
    lastSync: "Never",
    syncedRecords: "0 contacts",
    syncBookings: false,
    syncCustomers: true,
    syncPayments: false,
  },
  {
    id: "google-business",
    name: "Google Business",
    description: "Reviews and business profile",
    category: "Reputation",
    icon: MapPin,
    tone: "from-rose-500/20 to-rose-500/5 text-rose-200",
    connected: true,
    account: "WS Labs · Perth",
    lastSync: "18 minutes ago",
    syncedRecords: "386 reviews",
    syncBookings: false,
    syncCustomers: true,
    syncPayments: false,
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect thousands of applications",
    category: "Automation",
    icon: Link2,
    tone: "from-orange-500/20 to-orange-500/5 text-orange-200",
    connected: false,
    account: "Not connected",
    lastSync: "Never",
    syncedRecords: "0 workflows",
    syncBookings: true,
    syncCustomers: true,
    syncPayments: true,
  },
  {
    id: "outlook",
    name: "Microsoft Outlook",
    description: "Email and calendar coordination",
    category: "Calendar",
    icon: Globe2,
    tone: "from-blue-500/20 to-blue-500/5 text-blue-200",
    connected: false,
    account: "Not connected",
    lastSync: "Never",
    syncedRecords: "0 events",
    syncBookings: true,
    syncCustomers: false,
    syncPayments: false,
  },
  {
    id: "xero",
    name: "Xero",
    description: "Invoices, reconciliation and reporting",
    category: "Payments",
    icon: CreditCard,
    tone: "from-cyan-500/20 to-cyan-500/5 text-cyan-200",
    connected: false,
    account: "Not connected",
    lastSync: "Never",
    syncedRecords: "0 invoices",
    syncBookings: false,
    syncCustomers: true,
    syncPayments: true,
  },
];

const categories = ["All", "Payments", "Calendar", "CRM", "Marketing", "Reputation", "Automation"] as const;
const webhookEvents: Array<{ key: WebhookEvent; label: string }> = [
  { key: "bookings", label: "Booking activity" },
  { key: "customers", label: "Customer changes" },
  { key: "payments", label: "Payment events" },
];

export function PremiumIntegrationsPage() {
  const [items, setItems] = useState<Integration[]>(initialIntegrations);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [managing, setManaging] = useState<Integration | null>(null);
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [customOpen, setCustomOpen] = useState(false);
  const [custom, setCustom] = useState({
    name: "WS Labs operations webhook",
    endpoint: "https://api.wslabs.com.au/echelon/events",
    events: { bookings: true, customers: true, payments: false },
  });
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (consumeDashboardIntent("integration")) setCustomOpen(true);
  }, []);

  const filtered = useMemo(
    () =>
      items.filter(
        (integration) =>
          (category === "All" || integration.category === category) &&
          `${integration.name} ${integration.description} ${integration.category}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [category, items, search],
  );

  const connectedCount = items.filter((item) => item.connected).length;

  const announce = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const updateIntegration = (id: string, changes: Partial<Integration>) => {
    setItems((current) =>
      current.map((integration) =>
        integration.id === id ? { ...integration, ...changes } : integration,
      ),
    );
    setManaging((current) =>
      current?.id === id ? { ...current, ...changes } : current,
    );
  };

  const connect = (integration: Integration) => {
    setConnectingId(integration.id);
    window.setTimeout(() => {
      const account =
        integration.category === "Calendar"
          ? "workspace@wslabs.com.au"
          : integration.category === "Payments"
            ? "WS Labs Pty Ltd · AU"
            : "WS Labs workspace";
      updateIntegration(integration.id, {
        connected: true,
        account,
        lastSync: "Just now",
        syncedRecords: "Initial sync queued",
      });
      setConnectingId(null);
      setManaging(null);
      announce(`${integration.name} connected`);
    }, 850);
  };

  const disconnect = (integration: Integration) => {
    updateIntegration(integration.id, {
      connected: false,
      account: "Not connected",
      lastSync: "Disconnected",
      syncedRecords: "Sync paused",
    });
    setManaging(null);
    announce(`${integration.name} disconnected`);
  };

  const syncNow = (integration: Integration) => {
    setSyncingId(integration.id);
    window.setTimeout(() => {
      updateIntegration(integration.id, { lastSync: "Just now" });
      setSyncingId(null);
      announce(`${integration.name} is up to date`);
    }, 750);
  };

  const saveCustomWebhook = () => {
    setCustomOpen(false);
    announce("Custom webhook created");
  };

  return (
    <>
      <PageHeader
        eyebrow={`Ecosystem · ${connectedCount} connected`}
        title="Integrations"
        description="Connect Echelon to the systems that run WS Labs and keep every workflow in sync."
        action={
          <Button variant="outline" onClick={() => setCustomOpen(true)}>
            <Webhook className="size-4" />
            Custom integration
          </Button>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          { label: "Connected apps", value: connectedCount.toString(), note: "All operational", color: "text-violet-200" },
          { label: "Records synced", value: "1,988", note: "+184 this week", color: "text-sky-200" },
          { label: "Automation runs", value: "842", note: "99.8% success rate", color: "text-emerald-200" },
          { label: "Time saved", value: "24.6h", note: "Estimated this month", color: "text-amber-100" },
        ].map((metric) => (
          <Card key={metric.label} className="transition hover:-translate-y-0.5 hover:border-white/[.1]">
            <CardContent className="p-4">
              <p className="text-[8px] font-semibold uppercase tracking-[.13em] text-white/20">
                {metric.label}
              </p>
              <p className={`mt-2 text-2xl font-semibold tracking-[-.04em] ${metric.color}`}>
                {metric.value}
              </p>
              <p className="mt-1 text-[9px] text-white/24">{metric.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-4 overflow-hidden border-emerald-400/10 bg-gradient-to-r from-emerald-500/[.045] via-transparent to-violet-500/[.04]">
        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-emerald-400/12 bg-emerald-400/10 text-emerald-300">
            <ShieldCheck className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-[10px] font-semibold text-white/62">All systems operational</p>
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.6)]" />
            </div>
            <p className="mt-1 text-[9px] leading-4 text-white/27">
              Stripe, Google Calendar and Google Business synced successfully in the last 18 minutes.
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => announce("System activity opened")}>
            View activity <ChevronRight className="size-3.5" />
          </Button>
        </CardContent>
      </Card>

      <div className="mb-5 flex flex-col gap-3 rounded-[18px] border border-white/[.06] bg-white/[.018] p-3 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1 lg:max-w-md">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/18" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search integrations…"
            className="h-9 pl-8 text-[10px]"
          />
        </div>
        <div className="flex items-center gap-1 overflow-x-auto">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[8px] font-semibold transition ${
                category === item
                  ? "bg-white/[.08] text-white/70"
                  : "text-white/22 hover:bg-white/[.035] hover:text-white/48"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filtered.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((integration, index) => {
            const isConnecting = connectingId === integration.id;
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                key={integration.id}
              >
                <Card className="group h-full overflow-hidden transition hover:-translate-y-1 hover:border-white/[.11] hover:shadow-[0_24px_70px_rgba(0,0,0,.32)]">
                  <div className="h-px bg-gradient-to-r from-transparent via-violet-300/25 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <CardContent className="p-5">
                    {isConnecting ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Skeleton className="size-11 rounded-xl" />
                          <div className="flex-1">
                            <Skeleton className="h-3 w-28" />
                            <Skeleton className="mt-2 h-2 w-40" />
                          </div>
                        </div>
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-8 w-24" />
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between">
                          <span
                            className={`grid size-11 place-items-center rounded-xl bg-gradient-to-br ring-1 ring-white/[.06] ${integration.tone}`}
                          >
                            <integration.icon className="size-5" />
                          </span>
                          {integration.connected ? (
                            <Badge tone="success">
                              <Check className="mr-1 size-3" />
                              Connected
                            </Badge>
                          ) : (
                            <Badge>Available</Badge>
                          )}
                        </div>
                        <div className="mt-5 flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-white/78">{integration.name}</h3>
                          <span className="rounded-full border border-white/[.055] px-2 py-0.5 text-[7px] font-medium text-white/20">
                            {integration.category}
                          </span>
                        </div>
                        <p className="mt-1 text-[10px] text-white/28">{integration.description}</p>

                        <div className="mt-5 rounded-xl border border-white/[.05] bg-white/[.018] p-3">
                          {integration.connected ? (
                            <>
                              <div className="flex items-center gap-2">
                                <CircleDot className="size-3 text-emerald-300" />
                                <p className="truncate text-[9px] font-medium text-white/42">
                                  {integration.account}
                                </p>
                              </div>
                              <div className="mt-2 flex items-center justify-between text-[8px] text-white/18">
                                <span>{integration.syncedRecords}</span>
                                <span>{integration.lastSync}</span>
                              </div>
                            </>
                          ) : (
                            <div className="flex items-start gap-2">
                              <Sparkles className="mt-0.5 size-3.5 text-violet-300" />
                              <p className="text-[8px] leading-4 text-white/24">
                                Connect in under two minutes with secure OAuth permissions.
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-white/[.055] pt-4">
                          <Button
                            variant={integration.connected ? "outline" : "default"}
                            size="sm"
                            onClick={() => setManaging(integration)}
                          >
                            {integration.connected ? (
                              <Settings2 className="size-3.5" />
                            ) : (
                              <Plug className="size-3.5" />
                            )}
                            {integration.connected ? "Manage" : "Connect"}
                          </Button>
                          <button
                            className="text-white/20 transition hover:text-violet-300"
                            aria-label={`Learn more about ${integration.name}`}
                            onClick={() => announce(`${integration.name} documentation opened`)}
                          >
                            <ExternalLink className="size-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={Plug}
          title="No integrations found"
          description="Try a different search or browse another category."
          action={
            <Button size="sm" onClick={() => { setSearch(""); setCategory("All"); }}>
              Clear filters
            </Button>
          }
        />
      )}

      <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_1.35fr]">
        <Card className="overflow-hidden border-violet-400/12 bg-gradient-to-br from-violet-500/[.075] to-transparent">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-violet-400/10 bg-violet-400/10 text-violet-300">
                <Webhook className="size-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white/75">Build a custom integration</h3>
                <p className="mt-1 text-[10px] leading-5 text-white/28">
                  Use signed webhooks and the Echelon API to connect your own systems.
                </p>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => setCustomOpen(true)}>
                  Configure webhook <ChevronRight className="size-3.5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SectionHeading title="Recent sync activity" description="Latest data movement across connected apps" />
          </CardHeader>
          <CardContent className="space-y-3 pt-2">
            {[
              { app: "Stripe", event: "24 payment records reconciled", time: "2m", icon: CreditCard },
              { app: "Google Calendar", event: "8 booking events updated", time: "5m", icon: CalendarDays },
              { app: "Google Business", event: "3 new reviews imported", time: "18m", icon: MapPin },
            ].map((activity) => (
              <div key={activity.app} className="flex items-center gap-3 rounded-xl border border-white/[.045] bg-white/[.018] p-3">
                <span className="grid size-8 place-items-center rounded-lg bg-white/[.035] text-white/28">
                  <activity.icon className="size-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-medium text-white/48">{activity.event}</p>
                  <p className="mt-0.5 text-[8px] text-white/18">{activity.app}</p>
                </div>
                <span className="text-[8px] text-white/16">{activity.time}</span>
                <Check className="size-3.5 text-emerald-300" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={Boolean(managing)}
        onClose={() => setManaging(null)}
        title={managing?.connected ? `Manage ${managing.name}` : `Connect ${managing?.name ?? "integration"}`}
        {...(managing ? { description: managing.description } : {})}
        footer={
          managing ? (
            managing.connected ? (
              <>
                <Button variant="destructive" onClick={() => disconnect(managing)}>
                  <Unplug className="size-3.5" />
                  Disconnect
                </Button>
                <Button
                  onClick={() => syncNow(managing)}
                  disabled={syncingId === managing.id}
                >
                  <RefreshCw className={`size-3.5 ${syncingId === managing.id ? "animate-spin" : ""}`} />
                  {syncingId === managing.id ? "Syncing…" : "Sync now"}
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => setManaging(null)}>
                  Cancel
                </Button>
                <Button onClick={() => connect(managing)}>
                  <Plug className="size-3.5" />
                  Authorise connection
                </Button>
              </>
            )
          ) : null
        }
      >
        {managing ? (
          managing.connected ? (
            <div>
              <div className="flex items-center gap-3 rounded-xl border border-emerald-400/10 bg-emerald-400/[.045] p-4">
                <span className={`grid size-10 place-items-center rounded-xl bg-gradient-to-br ${managing.tone}`}>
                  <managing.icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] font-semibold text-white/58">Connected securely</p>
                    <Badge tone="success">Healthy</Badge>
                  </div>
                  <p className="mt-1 truncate text-[8px] text-white/22">{managing.account}</p>
                </div>
                <ShieldCheck className="size-4 text-emerald-300" />
              </div>

              <div className="mt-5 space-y-1 border-y border-white/[.055] py-2">
                {[
                  {
                    key: "syncBookings" as const,
                    title: "Bookings and calendar events",
                    description: "Keep appointment status and timing aligned.",
                  },
                  {
                    key: "syncCustomers" as const,
                    title: "Customers and contacts",
                    description: "Sync relationship details and lifecycle changes.",
                  },
                  {
                    key: "syncPayments" as const,
                    title: "Payments and invoices",
                    description: "Import commercial activity and payment status.",
                  },
                ].map((option) => (
                  <div key={option.key} className="flex items-center gap-4 py-3">
                    <div className="flex-1">
                      <p className="text-[10px] font-medium text-white/48">{option.title}</p>
                      <p className="mt-1 text-[8px] text-white/20">{option.description}</p>
                    </div>
                    <Switch
                      checked={managing[option.key]}
                      onCheckedChange={(checked) =>
                        updateIntegration(managing.id, { [option.key]: checked })
                      }
                      label={option.title}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/[.055] bg-white/[.022] p-3">
                  <p className="text-[8px] text-white/18">Last successful sync</p>
                  <p className="mt-1.5 text-[10px] font-semibold text-white/52">{managing.lastSync}</p>
                </div>
                <div className="rounded-xl border border-white/[.055] bg-white/[.022] p-3">
                  <p className="text-[8px] text-white/18">Synced data</p>
                  <p className="mt-1.5 text-[10px] font-semibold text-white/52">{managing.syncedRecords}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 rounded-xl border border-violet-400/10 bg-violet-400/[.045] p-4">
                <span className={`grid size-10 place-items-center rounded-xl bg-gradient-to-br ${managing.tone}`}>
                  <managing.icon className="size-4" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold text-white/58">Secure OAuth connection</p>
                  <p className="mt-1 text-[8px] text-white/22">Your credentials are never stored by Echelon.</p>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-[9px] font-medium text-white/30">Echelon will request permission to:</p>
                <div className="mt-3 space-y-2">
                  {[
                    "Read account and workspace identity",
                    "Sync selected customer and booking records",
                    "Receive change notifications securely",
                  ].map((permission) => (
                    <div key={permission} className="flex items-center gap-2 rounded-xl border border-white/[.045] p-3">
                      <Check className="size-3.5 text-emerald-300" />
                      <span className="text-[9px] text-white/36">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        ) : null}
      </Dialog>

      <Dialog
        open={customOpen}
        onClose={() => setCustomOpen(false)}
        title="Create custom webhook"
        description="Send signed Echelon events to your own endpoint."
        footer={
          <>
            <Button variant="ghost" onClick={() => setCustomOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveCustomWebhook} disabled={!custom.name.trim() || !custom.endpoint.trim()}>
              <Webhook className="size-3.5" />
              Create webhook
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <label className="block text-[10px] font-medium text-white/42">
            Webhook name
            <Input
              autoFocus
              value={custom.name}
              onChange={(event) => setCustom({ ...custom, name: event.target.value })}
              className="mt-2"
            />
          </label>
          <label className="block text-[10px] font-medium text-white/42">
            Endpoint URL
            <Input
              type="url"
              value={custom.endpoint}
              onChange={(event) => setCustom({ ...custom, endpoint: event.target.value })}
              className="mt-2"
            />
          </label>
          <div>
            <p className="text-[10px] font-medium text-white/42">Events</p>
            <div className="mt-2 space-y-1 rounded-xl border border-white/[.055] bg-white/[.018] px-3">
              {webhookEvents.map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between border-b border-white/[.045] py-3 last:border-0">
                  <span className="text-[9px] text-white/38">{label}</span>
                  <Switch
                    checked={custom.events[key]}
                    onCheckedChange={(checked) =>
                      setCustom({
                        ...custom,
                        events: { ...custom.events, [key]: checked },
                      })
                    }
                    label={label}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/[.055] bg-white/[.022] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="size-3.5 text-violet-300" />
                <div>
                  <p className="text-[9px] font-medium text-white/42">Signing secret</p>
                  <p className="mt-1 font-mono text-[8px] text-white/20">whsec_ech_••••••••7f2a</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => {
                  void navigator.clipboard?.writeText("whsec_ech_demo_7f2a");
                  announce("Signing secret copied");
                }}
                aria-label="Copy signing secret"
              >
                <Copy className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
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
