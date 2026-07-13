"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Bell,
  Building2,
  CalendarClock,
  Check,
  ChevronRight,
  CircleDollarSign,
  Copy,
  CreditCard,
  Globe2,
  KeyRound,
  Laptop,
  Link2,
  LockKeyhole,
  Mail,
  MapPin,
  MessageSquare,
  Plus,
  ReceiptText,
  Save,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Trash2,
  UserRoundCheck,
  Users,
  WalletCards,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { PageHeader, SectionHeading } from "./page";

type SettingsTab = "Business" | "Bookings" | "Notifications" | "Payments" | "Security";

const selectClass =
  "mt-2 h-10 w-full rounded-xl border border-white/[.075] bg-white/[.035] px-3 text-[11px] text-white/80 outline-none transition focus:border-violet-400/45 focus:ring-4 focus:ring-violet-500/10";

const textareaClass =
  "mt-2 w-full resize-none rounded-xl border border-white/[.075] bg-white/[.035] p-3 text-[11px] leading-5 text-white/72 outline-none transition placeholder:text-white/20 focus:border-violet-400/45 focus:ring-4 focus:ring-violet-500/10";

const tabMeta: Array<{
  label: SettingsTab;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}> = [
  { label: "Business", icon: Building2, description: "Profile and workspace" },
  { label: "Bookings", icon: CalendarClock, description: "Rules and availability" },
  { label: "Notifications", icon: Bell, description: "Alerts and digests" },
  { label: "Payments", icon: CreditCard, description: "Billing and deposits" },
  { label: "Security", icon: LockKeyhole, description: "Access and sessions" },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function SettingsRow({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/[.055] py-5 last:border-0 sm:flex-row sm:items-center">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/[.055] bg-white/[.03] text-white/35">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold text-white/68">{title}</p>
        <p className="mt-1 text-[9px] leading-4 text-white/26">{description}</p>
      </div>
      {children}
    </div>
  );
}

export function PremiumSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("Business");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [apiOpen, setApiOpen] = useState(false);
  const [apiDeleteOpen, setApiDeleteOpen] = useState(false);
  const [apiKeyActive, setApiKeyActive] = useState(true);
  const [showSecret, setShowSecret] = useState(false);
  const [apiName, setApiName] = useState("Production workspace");
  const [business, setBusiness] = useState({
    name: "WS Labs",
    category: "AI-first digital product studio",
    description:
      "An AI-first digital product studio helping ambitious companies design, build and scale category-defining experiences.",
    email: "hello@wslabs.com.au",
    phone: "+61 8 6112 8400",
    website: "https://wslabs.com.au",
    address: "Perth, Western Australia",
    timezone: "Australia/Perth (GMT+8)",
  });
  const [bookingRules, setBookingRules] = useState({
    autoConfirm: true,
    waitlist: true,
    requireDeposit: true,
    approvalForHighValue: true,
    leadTime: "24 hours",
    cancellation: "48 hours",
    interval: "15 minutes",
    buffer: "15 minutes",
    location: "Video call or Perth studio",
  });
  const [workingHours, setWorkingHours] = useState<Record<string, { enabled: boolean; start: string; end: string }>>(
    () =>
      Object.fromEntries(
        days.map((day, index) => [
          day,
          { enabled: index < 5, start: index === 4 ? "09:00" : "08:30", end: index === 4 ? "16:00" : "17:30" },
        ]),
      ),
  );
  const [notifications, setNotifications] = useState({
    booking: true,
    review: true,
    messages: true,
    payments: true,
    growth: true,
    weeklyDigest: true,
    email: true,
    push: true,
    sms: false,
    digest: "Monday · 8:00 AM",
  });
  const [payments, setPayments] = useState({
    currency: "AUD — Australian Dollar",
    deposit: "30%",
    tax: "10% GST",
    invoicePrefix: "WSL",
    autoInvoice: true,
    paymentLinks: true,
    card: true,
    bankTransfer: true,
    applePay: true,
  });
  const [security, setSecurity] = useState({
    mfa: true,
    loginAlerts: true,
    sso: false,
    sessionTimeout: "7 days",
    trustedDevices: true,
  });

  const markDirty = () => setDirty(true);

  const announce = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const saveChanges = () => {
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setDirty(false);
      announce("Settings saved");
    }, 650);
  };

  const toggleWorkingDay = (day: string, enabled: boolean) => {
    setWorkingHours((current) => ({
      ...current,
      [day]: { ...(current[day] ?? { start: "08:30", end: "17:30" }), enabled },
    }));
    markDirty();
  };

  const setWorkingTime = (day: string, key: "start" | "end", value: string) => {
    setWorkingHours((current) => ({
      ...current,
      [day]: {
        ...(current[day] ?? { enabled: true, start: "08:30", end: "17:30" }),
        [key]: value,
      },
    }));
    markDirty();
  };

  return (
    <>
      <PageHeader
        eyebrow="Workspace · WS Labs"
        title="Settings"
        description="Control how the workspace looks, behaves and protects your business."
        action={
          <div className="flex items-center gap-2">
            {dirty ? <span className="hidden text-[8px] text-amber-200 sm:inline">Unsaved changes</span> : null}
            <Button onClick={saveChanges} disabled={saving || !dirty}>
              <Save className={`size-4 ${saving ? "animate-pulse" : ""}`} />
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        }
      />

      <div className="grid gap-5 lg:grid-cols-[230px_minmax(0,1fr)]">
        <Card className="h-fit overflow-hidden p-2 lg:sticky lg:top-24">
          <nav className="flex gap-1 overflow-x-auto lg:block">
            {tabMeta.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`group flex min-w-36 items-center gap-3 rounded-xl px-3 py-2.5 text-left transition lg:mb-1 lg:w-full ${
                  activeTab === tab.label
                    ? "bg-violet-400/10 text-violet-200 shadow-[inset_0_0_0_1px_rgba(139,124,248,.08)]"
                    : "text-white/30 hover:bg-white/[.035] hover:text-white/65"
                }`}
              >
                <tab.icon className="size-4 shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-medium">{tab.label}</span>
                  <span className="mt-0.5 hidden text-[7px] text-white/18 lg:block">{tab.description}</span>
                </span>
                <ChevronRight className="hidden size-3 text-white/15 lg:block" />
              </button>
            ))}
          </nav>

          <div className="mt-2 hidden border-t border-white/[.055] p-3 lg:block">
            <div className="flex items-start gap-2">
              <Sparkles className="mt-0.5 size-3.5 text-violet-300" />
              <div>
                <p className="text-[9px] font-medium text-white/42">Setup health</p>
                <p className="mt-1 text-[8px] leading-4 text-white/20">Your workspace is 92% configured.</p>
              </div>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-white/[.055]">
              <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-violet-600 to-violet-300" />
            </div>
          </div>
        </Card>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="min-w-0"
        >
          {activeTab === "Business" ? (
            <div className="space-y-4">
              <Card>
                <CardHeader className="border-b border-white/[.055] pb-4">
                  <SectionHeading
                    title="Business profile"
                    description="This information appears across your Echelon workspace and client touchpoints."
                    action={<Badge tone="success">Published</Badge>}
                  />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-6 xl:flex-row">
                    <div className="w-full shrink-0 xl:w-48">
                      <div className="relative grid aspect-square max-w-40 place-items-center overflow-hidden rounded-[24px] border border-violet-400/15 bg-gradient-to-br from-violet-500/15 to-indigo-500/[.025] shadow-[0_20px_60px_rgba(0,0,0,.3)] xl:max-w-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(139,124,248,.16),transparent_60%)]" />
                        <Image
                          src="/logo.png"
                          alt="Echelon"
                          width={120}
                          height={120}
                          priority
                          className="relative h-auto w-24 object-contain drop-shadow-[0_0_28px_rgba(139,124,248,.32)]"
                        />
                      </div>
                      <p className="mt-3 text-[8px] leading-4 text-white/20">
                        Official Echelon identity · optimised for dark surfaces.
                      </p>
                    </div>

                    <div className="grid min-w-0 flex-1 gap-4 sm:grid-cols-2">
                      <label className="text-[10px] font-medium text-white/46">
                        Business name
                        <Input
                          value={business.name}
                          onChange={(event) => {
                            setBusiness({ ...business, name: event.target.value });
                            markDirty();
                          }}
                          className="mt-2"
                        />
                      </label>
                      <label className="text-[10px] font-medium text-white/46">
                        Category
                        <Input
                          value={business.category}
                          onChange={(event) => {
                            setBusiness({ ...business, category: event.target.value });
                            markDirty();
                          }}
                          className="mt-2"
                        />
                      </label>
                      <label className="text-[10px] font-medium text-white/46 sm:col-span-2">
                        Public description
                        <textarea
                          value={business.description}
                          onChange={(event) => {
                            setBusiness({ ...business, description: event.target.value });
                            markDirty();
                          }}
                          rows={4}
                          className={textareaClass}
                        />
                      </label>
                      <label className="text-[10px] font-medium text-white/46">
                        Business email
                        <Input
                          type="email"
                          value={business.email}
                          onChange={(event) => {
                            setBusiness({ ...business, email: event.target.value });
                            markDirty();
                          }}
                          className="mt-2"
                        />
                      </label>
                      <label className="text-[10px] font-medium text-white/46">
                        Phone
                        <Input
                          value={business.phone}
                          onChange={(event) => {
                            setBusiness({ ...business, phone: event.target.value });
                            markDirty();
                          }}
                          className="mt-2"
                        />
                      </label>
                      <label className="text-[10px] font-medium text-white/46">
                        Website
                        <Input
                          value={business.website}
                          onChange={(event) => {
                            setBusiness({ ...business, website: event.target.value });
                            markDirty();
                          }}
                          className="mt-2"
                        />
                      </label>
                      <label className="text-[10px] font-medium text-white/46">
                        Timezone
                        <select
                          value={business.timezone}
                          onChange={(event) => {
                            setBusiness({ ...business, timezone: event.target.value });
                            markDirty();
                          }}
                          className={selectClass}
                        >
                          <option>Australia/Perth (GMT+8)</option>
                          <option>Australia/Sydney (GMT+10)</option>
                          <option>UTC</option>
                        </select>
                      </label>
                      <label className="text-[10px] font-medium text-white/46 sm:col-span-2">
                        Business address
                        <div className="relative mt-2">
                          <MapPin className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/18" />
                          <Input
                            value={business.address}
                            onChange={(event) => {
                              setBusiness({ ...business, address: event.target.value });
                              markDirty();
                            }}
                            className="pl-9"
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <SectionHeading title="Workspace identity" description="How WS Labs appears to your team and clients" />
                </CardHeader>
                <CardContent className="pt-2">
                  <SettingsRow
                    icon={Globe2}
                    title="Public booking URL"
                    description="Share a polished booking experience with clients."
                  >
                    <div className="flex items-center gap-2">
                      <span className="hidden text-[9px] text-white/28 sm:block">echelonapp.net/ws-labs</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => {
                          void navigator.clipboard?.writeText("https://echelonapp.net/ws-labs");
                          announce("Booking URL copied");
                        }}
                        aria-label="Copy booking URL"
                      >
                        <Copy className="size-3.5" />
                      </Button>
                    </div>
                  </SettingsRow>
                  <SettingsRow
                    icon={Users}
                    title="Workspace owner"
                    description="Primary account owner and billing contact."
                  >
                    <div className="text-right">
                      <p className="text-[10px] font-semibold text-white/52">Rav Singh</p>
                      <p className="mt-1 text-[8px] text-white/20">rav@wslabs.com.au</p>
                    </div>
                  </SettingsRow>
                </CardContent>
              </Card>
            </div>
          ) : null}

          {activeTab === "Bookings" ? (
            <div className="space-y-4">
              <Card>
                <CardHeader className="border-b border-white/[.055] pb-4">
                  <SectionHeading
                    title="Booking rules"
                    description="Set expectations and protect the team’s delivery capacity."
                  />
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <label className="text-[10px] font-medium text-white/42">
                      Minimum lead time
                      <select
                        value={bookingRules.leadTime}
                        onChange={(event) => {
                          setBookingRules({ ...bookingRules, leadTime: event.target.value });
                          markDirty();
                        }}
                        className={selectClass}
                      >
                        <option>12 hours</option>
                        <option>24 hours</option>
                        <option>48 hours</option>
                      </select>
                    </label>
                    <label className="text-[10px] font-medium text-white/42">
                      Cancellation window
                      <select
                        value={bookingRules.cancellation}
                        onChange={(event) => {
                          setBookingRules({ ...bookingRules, cancellation: event.target.value });
                          markDirty();
                        }}
                        className={selectClass}
                      >
                        <option>24 hours</option>
                        <option>48 hours</option>
                        <option>72 hours</option>
                      </select>
                    </label>
                    <label className="text-[10px] font-medium text-white/42">
                      Start-time interval
                      <select
                        value={bookingRules.interval}
                        onChange={(event) => {
                          setBookingRules({ ...bookingRules, interval: event.target.value });
                          markDirty();
                        }}
                        className={selectClass}
                      >
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                        <option>60 minutes</option>
                      </select>
                    </label>
                    <label className="text-[10px] font-medium text-white/42">
                      Session buffer
                      <select
                        value={bookingRules.buffer}
                        onChange={(event) => {
                          setBookingRules({ ...bookingRules, buffer: event.target.value });
                          markDirty();
                        }}
                        className={selectClass}
                      >
                        <option>No buffer</option>
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                      </select>
                    </label>
                    <label className="text-[10px] font-medium text-white/42 sm:col-span-2 xl:col-span-4">
                      Default location
                      <Input
                        value={bookingRules.location}
                        onChange={(event) => {
                          setBookingRules({ ...bookingRules, location: event.target.value });
                          markDirty();
                        }}
                        className="mt-2"
                      />
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <SectionHeading title="Booking behaviour" description="Control confirmation, deposits and overflow demand" />
                </CardHeader>
                <CardContent className="pt-2">
                  {[
                    {
                      key: "autoConfirm" as const,
                      icon: Check,
                      title: "Auto-confirm standard bookings",
                      description: "Confirm sessions automatically when availability and payment rules are met.",
                    },
                    {
                      key: "waitlist" as const,
                      icon: Users,
                      title: "Enable intelligent waitlist",
                      description: "Offer cancelled times to the highest-intent clients first.",
                    },
                    {
                      key: "requireDeposit" as const,
                      icon: CircleDollarSign,
                      title: "Require a deposit",
                      description: "Collect the default payment deposit before confirming a session.",
                    },
                    {
                      key: "approvalForHighValue" as const,
                      icon: UserRoundCheck,
                      title: "Approve high-value engagements",
                      description: "Route engagements over $10,000 to Rav for approval.",
                    },
                  ].map((rule) => (
                    <SettingsRow key={rule.key} icon={rule.icon} title={rule.title} description={rule.description}>
                      <Switch
                        checked={bookingRules[rule.key]}
                        onCheckedChange={(checked) => {
                          setBookingRules({ ...bookingRules, [rule.key]: checked });
                          markDirty();
                        }}
                        label={rule.title}
                      />
                    </SettingsRow>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="border-b border-white/[.055] pb-4">
                  <SectionHeading title="Business hours" description="Default client-facing availability for the WS Labs workspace" />
                </CardHeader>
                <CardContent className="divide-y divide-white/[.05] py-2">
                  {days.map((day) => {
                    const hours = workingHours[day] ?? { enabled: false, start: "08:30", end: "17:30" };
                    return (
                      <div key={day} className="flex flex-wrap items-center gap-3 py-3 sm:flex-nowrap">
                        <div className="flex w-32 items-center gap-3">
                          <Switch
                            checked={hours.enabled}
                            onCheckedChange={(enabled) => toggleWorkingDay(day, enabled)}
                            label={`${day} availability`}
                          />
                          <span className={`text-[10px] font-medium ${hours.enabled ? "text-white/52" : "text-white/20"}`}>
                            {day}
                          </span>
                        </div>
                        {hours.enabled ? (
                          <div className="flex items-center gap-2">
                            <Input
                              type="time"
                              value={hours.start}
                              onChange={(event) => setWorkingTime(day, "start", event.target.value)}
                              className="h-9 w-28 text-[9px]"
                            />
                            <span className="text-[8px] text-white/18">to</span>
                            <Input
                              type="time"
                              value={hours.end}
                              onChange={(event) => setWorkingTime(day, "end", event.target.value)}
                              className="h-9 w-28 text-[9px]"
                            />
                          </div>
                        ) : (
                          <span className="text-[9px] text-white/18">Unavailable</span>
                        )}
                        {day === "Friday" && hours.enabled ? <Badge className="sm:ml-auto">Short day</Badge> : null}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          ) : null}

          {activeTab === "Notifications" ? (
            <div className="space-y-4">
              <Card>
                <CardHeader className="border-b border-white/[.055] pb-4">
                  <SectionHeading title="Notification channels" description="Choose where Echelon should reach you" />
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-3">
                  {[
                    { key: "email" as const, label: "Email", detail: "rav@wslabs.com.au", icon: Mail },
                    { key: "push" as const, label: "Push", detail: "2 registered devices", icon: Smartphone },
                    { key: "sms" as const, label: "SMS", detail: "+61 ••• ••• 201", icon: MessageSquare },
                  ].map((channel) => (
                    <button
                      key={channel.key}
                      onClick={() => {
                        setNotifications({ ...notifications, [channel.key]: !notifications[channel.key] });
                        markDirty();
                      }}
                      className={`rounded-2xl border p-4 text-left transition ${
                        notifications[channel.key]
                          ? "border-violet-400/15 bg-violet-400/[.055]"
                          : "border-white/[.055] bg-white/[.018] hover:bg-white/[.035]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`grid size-9 place-items-center rounded-xl ${notifications[channel.key] ? "bg-violet-400/12 text-violet-300" : "bg-white/[.035] text-white/25"}`}>
                          <channel.icon className="size-4" />
                        </span>
                        <span className={`grid size-5 place-items-center rounded-full ${notifications[channel.key] ? "bg-violet-500 text-white" : "border border-white/10"}`}>
                          {notifications[channel.key] ? <Check className="size-3" /> : null}
                        </span>
                      </div>
                      <p className="mt-4 text-[10px] font-semibold text-white/55">{channel.label}</p>
                      <p className="mt-1 text-[8px] text-white/20">{channel.detail}</p>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <SectionHeading title="Activity alerts" description="Decide which events deserve your attention" />
                </CardHeader>
                <CardContent className="pt-2">
                  {[
                    { key: "booking" as const, icon: CalendarClock, title: "Booking activity", description: "New, changed and cancelled sessions." },
                    { key: "messages" as const, icon: MessageSquare, title: "Unread messages", description: "Priority and SLA-sensitive client conversations." },
                    { key: "payments" as const, icon: WalletCards, title: "Payment events", description: "Successful deposits, failures and overdue invoices." },
                    { key: "review" as const, icon: Sparkles, title: "New reviews", description: "Receive an alert whenever a customer leaves feedback." },
                    { key: "growth" as const, icon: Globe2, title: "Growth intelligence", description: "AI recommendations and important commercial signals." },
                  ].map((item) => (
                    <SettingsRow key={item.key} icon={item.icon} title={item.title} description={item.description}>
                      <Switch
                        label={item.title}
                        checked={notifications[item.key]}
                        onCheckedChange={(checked) => {
                          setNotifications({ ...notifications, [item.key]: checked });
                          markDirty();
                        }}
                      />
                    </SettingsRow>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <SectionHeading title="Executive digest" description="A concise weekly pulse on WS Labs performance" />
                </CardHeader>
                <CardContent className="pt-2">
                  <SettingsRow
                    icon={ReceiptText}
                    title="Weekly business digest"
                    description="Revenue, pipeline, utilisation and relationship signals in one email."
                  >
                    <Switch
                      label="Weekly digest"
                      checked={notifications.weeklyDigest}
                      onCheckedChange={(weeklyDigest) => {
                        setNotifications({ ...notifications, weeklyDigest });
                        markDirty();
                      }}
                    />
                  </SettingsRow>
                  <label className="block py-4 text-[10px] font-medium text-white/42">
                    Delivery time
                    <select
                      value={notifications.digest}
                      onChange={(event) => {
                        setNotifications({ ...notifications, digest: event.target.value });
                        markDirty();
                      }}
                      className={`${selectClass} max-w-xs`}
                    >
                      <option>Monday · 8:00 AM</option>
                      <option>Friday · 4:00 PM</option>
                      <option>Daily · 8:00 AM</option>
                    </select>
                  </label>
                </CardContent>
              </Card>
            </div>
          ) : null}

          {activeTab === "Payments" ? (
            <div className="space-y-4">
              <Card className="overflow-hidden border-indigo-400/12 bg-gradient-to-r from-indigo-500/[.06] to-transparent">
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-indigo-500/15 text-indigo-200 ring-1 ring-indigo-300/10">
                    <CreditCard className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[11px] font-semibold text-white/65">Stripe connected</p>
                      <Badge tone="success">Healthy</Badge>
                    </div>
                    <p className="mt-1 text-[9px] text-white/24">WS Labs Pty Ltd · AU · Last synced 2 minutes ago</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => announce("Stripe settings opened")}>
                    Manage connection
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="border-b border-white/[.055] pb-4">
                  <SectionHeading title="Payment defaults" description="Control commercial terms across new engagements" />
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <label className="text-[10px] font-medium text-white/42">
                    Currency
                    <select
                      value={payments.currency}
                      onChange={(event) => {
                        setPayments({ ...payments, currency: event.target.value });
                        markDirty();
                      }}
                      className={selectClass}
                    >
                      <option>AUD — Australian Dollar</option>
                      <option>USD — US Dollar</option>
                      <option>GBP — British Pound</option>
                    </select>
                  </label>
                  <label className="text-[10px] font-medium text-white/42">
                    Default deposit
                    <select
                      value={payments.deposit}
                      onChange={(event) => {
                        setPayments({ ...payments, deposit: event.target.value });
                        markDirty();
                      }}
                      className={selectClass}
                    >
                      <option>20%</option>
                      <option>30%</option>
                      <option>50%</option>
                      <option>Full payment</option>
                    </select>
                  </label>
                  <label className="text-[10px] font-medium text-white/42">
                    Tax rate
                    <select
                      value={payments.tax}
                      onChange={(event) => {
                        setPayments({ ...payments, tax: event.target.value });
                        markDirty();
                      }}
                      className={selectClass}
                    >
                      <option>10% GST</option>
                      <option>Tax exempt</option>
                      <option>Custom rate</option>
                    </select>
                  </label>
                  <label className="text-[10px] font-medium text-white/42">
                    Invoice prefix
                    <Input
                      value={payments.invoicePrefix}
                      onChange={(event) => {
                        setPayments({ ...payments, invoicePrefix: event.target.value });
                        markDirty();
                      }}
                      className="mt-2"
                    />
                  </label>
                </CardContent>
              </Card>

              <div className="grid gap-4 xl:grid-cols-2">
                <Card>
                  <CardHeader>
                    <SectionHeading title="Payment methods" description="Methods clients can use at checkout" />
                  </CardHeader>
                  <CardContent className="pt-2">
                    {[
                      { key: "card" as const, icon: CreditCard, title: "Credit and debit cards", detail: "Visa, Mastercard and American Express" },
                      { key: "bankTransfer" as const, icon: Building2, title: "Bank transfer", detail: "Manual and PayID reconciliation" },
                      { key: "applePay" as const, icon: Smartphone, title: "Apple Pay and Google Pay", detail: "Accelerated mobile checkout" },
                    ].map((method) => (
                      <SettingsRow key={method.key} icon={method.icon} title={method.title} description={method.detail}>
                        <Switch
                          label={method.title}
                          checked={payments[method.key]}
                          onCheckedChange={(checked) => {
                            setPayments({ ...payments, [method.key]: checked });
                            markDirty();
                          }}
                        />
                      </SettingsRow>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <SectionHeading title="Billing automation" description="Reduce payment administration" />
                  </CardHeader>
                  <CardContent className="pt-2">
                    <SettingsRow
                      icon={ReceiptText}
                      title="Automatic invoices"
                      description="Create an invoice when a booking is confirmed."
                    >
                      <Switch
                        label="Automatic invoices"
                        checked={payments.autoInvoice}
                        onCheckedChange={(autoInvoice) => {
                          setPayments({ ...payments, autoInvoice });
                          markDirty();
                        }}
                      />
                    </SettingsRow>
                    <SettingsRow
                      icon={Link2}
                      title="Payment links"
                      description="Include a secure payment link in reminders."
                    >
                      <Switch
                        label="Payment links"
                        checked={payments.paymentLinks}
                        onCheckedChange={(paymentLinks) => {
                          setPayments({ ...payments, paymentLinks });
                          markDirty();
                        }}
                      />
                    </SettingsRow>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : null}

          {activeTab === "Security" ? (
            <div className="space-y-4">
              <Card className="overflow-hidden border-emerald-400/10 bg-gradient-to-r from-emerald-500/[.045] to-transparent">
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-emerald-400/12 bg-emerald-400/10 text-emerald-300">
                    <ShieldCheck className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-white/65">Security posture is strong</p>
                    <p className="mt-1 text-[9px] text-white/24">MFA is active and all recent sign-ins are recognised.</p>
                  </div>
                  <Badge tone="success">92 / 100</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <SectionHeading title="Authentication" description="Protect workspace access and sensitive client data" />
                </CardHeader>
                <CardContent className="pt-2">
                  {[
                    { key: "mfa" as const, icon: Smartphone, title: "Multi-factor authentication", description: "Require a second factor for all workspace members." },
                    { key: "loginAlerts" as const, icon: Bell, title: "Sign-in alerts", description: "Notify Rav when a new device accesses the workspace." },
                    { key: "trustedDevices" as const, icon: Laptop, title: "Remember trusted devices", description: "Reduce prompts on verified devices for 30 days." },
                    { key: "sso" as const, icon: KeyRound, title: "Single sign-on", description: "Use SAML SSO for enterprise workspace access." },
                  ].map((item) => (
                    <SettingsRow key={item.key} icon={item.icon} title={item.title} description={item.description}>
                      <div className="flex items-center gap-3">
                        {item.key === "sso" ? <Badge>Enterprise</Badge> : null}
                        <Switch
                          label={item.title}
                          checked={security[item.key]}
                          onCheckedChange={(checked) => {
                            setSecurity({ ...security, [item.key]: checked });
                            markDirty();
                          }}
                        />
                      </div>
                    </SettingsRow>
                  ))}
                  <label className="block py-4 text-[10px] font-medium text-white/42">
                    Session timeout
                    <select
                      value={security.sessionTimeout}
                      onChange={(event) => {
                        setSecurity({ ...security, sessionTimeout: event.target.value });
                        markDirty();
                      }}
                      className={`${selectClass} max-w-xs`}
                    >
                      <option>24 hours</option>
                      <option>7 days</option>
                      <option>30 days</option>
                    </select>
                  </label>
                </CardContent>
              </Card>

              <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
                <Card>
                  <CardHeader className="border-b border-white/[.055] pb-4">
                    <SectionHeading title="Active sessions" description="Devices currently signed into this workspace" />
                  </CardHeader>
                  <CardContent className="divide-y divide-white/[.05] py-2">
                    {[
                      { device: "MacBook Pro · Codex", location: "Perth, AU", time: "Current session", current: true },
                      { device: "iPhone 16 Pro · Safari", location: "Perth, AU", time: "2 hours ago", current: false },
                      { device: "Mac Studio · Chrome", location: "Perth, AU", time: "Yesterday", current: false },
                    ].map((session) => (
                      <div key={session.device} className="flex items-center gap-3 py-3">
                        <span className="grid size-9 place-items-center rounded-xl bg-white/[.03] text-white/28">
                          {session.device.includes("iPhone") ? <Smartphone className="size-4" /> : <Laptop className="size-4" />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-[9px] font-medium text-white/48">{session.device}</p>
                            {session.current ? <Badge tone="success">Current</Badge> : null}
                          </div>
                          <p className="mt-1 text-[8px] text-white/18">{session.location} · {session.time}</p>
                        </div>
                        {!session.current ? (
                          <Button variant="ghost" size="sm" onClick={() => announce("Session signed out")}>
                            Sign out
                          </Button>
                        ) : null}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <SectionHeading title="API access" description="Keys for secure server-side integrations" />
                  </CardHeader>
                  <CardContent className="pt-2">
                    {apiKeyActive ? <div className="rounded-xl border border-white/[.055] bg-white/[.022] p-4">
                      <div className="flex items-start gap-3">
                        <span className="grid size-9 place-items-center rounded-xl bg-violet-400/10 text-violet-300">
                          <KeyRound className="size-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-semibold text-white/52">Production workspace</p>
                          <p className="mt-1 font-mono text-[8px] text-white/18">ech_live_••••••••92c4</p>
                          <p className="mt-2 text-[8px] text-white/18">Last used 8 minutes ago</p>
                        </div>
                        <Button variant="ghost" size="icon" className="size-8" aria-label="Delete API key" onClick={() => setApiDeleteOpen(true)}>
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div> : <div className="rounded-xl border border-dashed border-white/[.07] bg-white/[.015] p-5 text-center"><KeyRound className="mx-auto size-4 text-white/22" /><p className="mt-2 text-[10px] font-medium text-white/42">No active API key</p><p className="mt-1 text-[8px] text-white/18">Create a key when a trusted server-side integration needs access.</p></div>}
                    <Button variant="outline" className="mt-4 w-full" onClick={() => setApiOpen(true)}>
                      <Plus className="size-3.5" />
                      {apiKeyActive ? "Create another API key" : "Create API key"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>

      <Dialog
        open={apiOpen}
        onClose={() => setApiOpen(false)}
        title="Create API key"
        description="Generate a server-side credential for a trusted integration."
        footer={
          <>
            <Button variant="ghost" onClick={() => setApiOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setApiOpen(false);
                setApiKeyActive(true);
                announce("API key created");
              }}
              disabled={!apiName.trim()}
            >
              <KeyRound className="size-3.5" />
              Create key
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <label className="block text-[10px] font-medium text-white/42">
            Key name
            <Input
              autoFocus
              value={apiName}
              onChange={(event) => setApiName(event.target.value)}
              className="mt-2"
            />
          </label>
          <div>
            <p className="text-[10px] font-medium text-white/42">Permissions</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {["Read bookings", "Write bookings", "Read customers", "Read analytics"].map((permission) => (
                <label key={permission} className="flex items-center gap-2 rounded-xl border border-white/[.055] bg-white/[.018] p-3 text-[9px] text-white/38">
                  <input type="checkbox" defaultChecked={permission !== "Write bookings"} />
                  {permission}
                </label>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-amber-300/10 bg-amber-300/[.045] p-4">
            <div className="flex items-start gap-3">
              <LockKeyhole className="mt-0.5 size-4 text-amber-200" />
              <div>
                <p className="text-[9px] font-semibold text-amber-100/80">Keep this key private</p>
                <p className="mt-1 text-[8px] leading-4 text-white/24">The full secret will only be shown once after creation.</p>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={apiDeleteOpen}
        onClose={() => setApiDeleteOpen(false)}
        title="Delete API key?"
        description="Any integration using this credential will immediately lose access."
        footer={<><Button variant="ghost" onClick={() => setApiDeleteOpen(false)}>Cancel</Button><Button variant="destructive" onClick={() => { setApiDeleteOpen(false); setApiKeyActive(false); announce("API key deleted"); }}><Trash2 className="size-3.5" /> Delete key</Button></>}
      >
        <div className="rounded-xl border border-rose-400/10 bg-rose-400/[.045] p-4"><p className="text-[10px] font-semibold text-rose-200">Production workspace</p><p className="mt-1 font-mono text-[8px] text-white/22">ech_live_••••••••92c4</p></div>
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
