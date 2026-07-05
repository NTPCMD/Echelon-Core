import Link from "next/link";
import { Calendar, Users, BarChart2, MessageSquare, Star, Settings, Clock, TrendingUp } from "lucide-react";

const stats = [
  { label: "Bookings this month", value: "0", delta: "+0%", icon: Calendar },
  { label: "Total customers", value: "0", delta: "+0%", icon: Users },
  { label: "Avg. rating", value: "—", delta: "", icon: Star },
  { label: "Revenue (MTD)", value: "$0", delta: "+0%", icon: TrendingUp },
];

const sections = [
  { icon: Calendar, label: "Bookings", desc: "Manage upcoming and past appointments", href: "#" },
  { icon: Users, label: "Customers", desc: "View customer profiles and history", href: "#" },
  { icon: BarChart2, label: "Analytics", desc: "Track views, bookings and conversion", href: "#" },
  { icon: Clock, label: "Calendar", desc: "Set your availability and block time", href: "#" },
  { icon: Star, label: "Reviews", desc: "Read and respond to customer reviews", href: "#" },
  { icon: MessageSquare, label: "Messages", desc: "Chat with customers and prospects", href: "#" },
  { icon: Settings, label: "Settings", desc: "Profile, payments, integrations", href: "/settings" },
];

export default function BusinessDashboardPage() {
  return (
    <main className="min-h-screen">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <b className="text-xl tracking-tight">Echelon</b>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white">
            Customer view
          </Link>
          <Link
            href="/auth/login"
            className="rounded-full border border-black/10 px-4 py-2 font-semibold dark:border-white/10"
          >
            Log out
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 pb-16 sm:px-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Business Dashboard</h1>
            <p className="mt-1 text-black/50 dark:text-white/40">Manage your Echelon presence.</p>
          </div>
          <span className="rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
            Setup in progress
          </span>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl bg-white p-6 shadow-sm dark:bg-white/5">
              <s.icon className="size-5 text-brand" />
              <p className="mt-3 text-3xl font-bold tracking-tight">{s.value}</p>
              <p className="mt-1 text-sm text-black/50 dark:text-white/40">{s.label}</p>
              {s.delta && <p className="mt-2 text-xs font-semibold text-done">{s.delta} this month</p>}
            </div>
          ))}
        </div>

        {/* GoHighLevel banner */}
        <div className="mb-8 flex items-center gap-4 rounded-3xl border border-brand/20 bg-brand/5 px-6 py-5">
          <div className="size-10 flex-shrink-0 rounded-2xl bg-brand/15" />
          <div>
            <p className="font-semibold">GoHighLevel CRM integration coming soon</p>
            <p className="text-sm text-black/50 dark:text-white/40">
              Your full CRM, calendar, messaging and automation — integrated inside Echelon.
            </p>
          </div>
          <span className="ml-auto rounded-full bg-brand px-4 py-1.5 text-xs font-bold text-white">Soon</span>
        </div>

        {/* Sections grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((sec) => (
            <Link
              key={sec.label}
              href={sec.href}
              className="group flex items-start gap-4 rounded-3xl border border-black/5 bg-white p-6 transition hover:border-brand/30 hover:shadow-sm dark:border-white/5 dark:bg-white/5"
            >
              <div className="mt-0.5 rounded-2xl bg-brand/10 p-2.5">
                <sec.icon className="size-5 text-brand" />
              </div>
              <div>
                <p className="font-bold">{sec.label}</p>
                <p className="mt-1 text-sm text-black/50 dark:text-white/40">{sec.desc}</p>
              </div>
              <span className="ml-auto mt-0.5 text-black/20 transition group-hover:text-brand dark:text-white/20">→</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
