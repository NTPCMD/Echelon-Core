"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronRight,
  CreditCard,
  Download,
  Filter,
  MousePointer2,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Switch } from "../ui/switch";
import { PageHeader, SectionHeading } from "./page";

type Period = "30 days" | "Quarter" | "12 months";
type Metric = "Revenue" | "Bookings" | "Customers";

const analyticsData: Record<
  Period,
  {
    labels: string[];
    series: Record<Metric, number[]>;
    previous: Record<Metric, number[]>;
    grossRevenue: string;
    engagements: string;
    customers: string;
    conversion: string;
  }
> = {
  "30 days": {
    labels: ["1 Jun", "4 Jun", "7 Jun", "10 Jun", "13 Jun", "16 Jun", "19 Jun", "22 Jun"],
    series: {
      Revenue: [22, 31, 28, 42, 39, 52, 61, 68],
      Bookings: [9, 12, 11, 16, 14, 19, 22, 24],
      Customers: [3, 5, 4, 7, 6, 8, 10, 12],
    },
    previous: {
      Revenue: [18, 24, 27, 32, 35, 41, 46, 51],
      Bookings: [7, 9, 10, 12, 13, 15, 17, 19],
      Customers: [2, 3, 4, 4, 5, 6, 7, 8],
    },
    grossRevenue: "$68,240",
    engagements: "24",
    customers: "12",
    conversion: "21.8%",
  },
  Quarter: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10", "Week 11", "Week 12"],
    series: {
      Revenue: [28, 34, 32, 41, 39, 48, 54, 58, 63, 68, 76, 84],
      Bookings: [12, 14, 13, 17, 16, 21, 23, 25, 27, 29, 32, 35],
      Customers: [4, 5, 5, 7, 6, 8, 9, 10, 11, 12, 14, 16],
    },
    previous: {
      Revenue: [24, 28, 30, 34, 35, 40, 43, 47, 49, 54, 59, 64],
      Bookings: [10, 12, 12, 14, 15, 17, 18, 20, 21, 23, 25, 27],
      Customers: [3, 4, 4, 5, 5, 6, 7, 8, 8, 9, 10, 11],
    },
    grossRevenue: "$184,620",
    engagements: "96",
    customers: "38",
    conversion: "19.6%",
  },
  "12 months": {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    series: {
      Revenue: [38, 46, 43, 57, 54, 68, 72, 79, 76, 91, 96, 112],
      Bookings: [18, 21, 20, 25, 24, 29, 31, 34, 33, 38, 41, 46],
      Customers: [6, 8, 7, 10, 9, 12, 13, 14, 14, 17, 18, 21],
    },
    previous: {
      Revenue: [31, 37, 39, 44, 46, 52, 57, 61, 64, 69, 74, 82],
      Bookings: [15, 18, 18, 21, 22, 24, 26, 28, 29, 31, 34, 37],
      Customers: [5, 6, 7, 8, 8, 9, 10, 11, 12, 13, 14, 16],
    },
    grossRevenue: "$486,240",
    engagements: "284",
    customers: "96",
    conversion: "18.4%",
  },
};

const metricMeta: Record<Metric, { label: string; prefix: string; suffix: string; color: string }> = {
  Revenue: { label: "Revenue", prefix: "$", suffix: "k", color: "#8b7cf8" },
  Bookings: { label: "Bookings", prefix: "", suffix: "", color: "#66c7ee" },
  Customers: { label: "New customers", prefix: "", suffix: "", color: "#5ed6a0" },
};

const topServices = [
  { name: "AI Automation Sprint", revenue: "$225,000", bookings: 18, margin: "84%", growth: "+31.2%", share: 92 },
  { name: "Digital Experience Workshop", revenue: "$124,800", bookings: 26, margin: "78%", growth: "+18.6%", share: 74 },
  { name: "Product Strategy Sprint", revenue: "$100,800", bookings: 42, margin: "81%", growth: "+24.1%", share: 62 },
  { name: "Brand System Review", revenue: "$37,200", bookings: 31, margin: "72%", growth: "+8.4%", share: 38 },
];

const heatmap = [
  [22, 36, 48, 61, 72, 42],
  [28, 51, 74, 82, 64, 38],
  [19, 44, 68, 91, 76, 46],
  [24, 58, 86, 78, 69, 34],
  [18, 42, 63, 71, 54, 29],
];

export function PremiumAnalyticsPage() {
  const [period, setPeriod] = useState<Period>("12 months");
  const [metric, setMetric] = useState<Metric>("Revenue");
  const [compare, setCompare] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [report, setReport] = useState({ format: "PDF", scope: "Executive summary" });
  const [toast, setToast] = useState("");
  const router = useRouter();

  const current = analyticsData[period];
  const values = current.series[metric];
  const previousValues = current.previous[metric];
  const meta = metricMeta[metric];

  const chart = useMemo(() => {
    const allValues = compare ? [...values, ...previousValues] : values;
    const max = Math.max(...allValues) * 1.12;
    const min = Math.min(...allValues) * 0.72;
    const range = Math.max(max - min, 1);
    const x = (index: number) => 36 + (index / Math.max(values.length - 1, 1)) * 928;
    const y = (value: number) => 250 - ((value - min) / range) * 210;
    const points = values.map((value, index) => `${x(index)},${y(value)}`).join(" ");
    const previousPoints = previousValues
      .map((value, index) => `${x(index)},${y(value)}`)
      .join(" ");
    const areaPath = `M ${x(0)} ${y(values[0] ?? 0)} ${values
      .slice(1)
      .map((value, index) => `L ${x(index + 1)} ${y(value)}`)
      .join(" ")} L ${x(values.length - 1)} 270 L ${x(0)} 270 Z`;
    return { x, y, points, previousPoints, areaPath, max, min };
  }, [compare, previousValues, values]);

  const announce = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const exportReport = () => {
    setExporting(true);
    window.setTimeout(() => {
      setExporting(false);
      setExportOpen(false);
      announce(`${report.format} report prepared`);
    }, 700);
  };

  const formatPoint = (value: number) => `${meta.prefix}${value}${meta.suffix}`;

  return (
    <>
      <PageHeader
        eyebrow="Intelligence · Live commercial model"
        title="Analytics"
        description="Explore performance, demand and customer behaviour through one focused decision layer."
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => announce("Advanced filters opened")}>
              <Filter className="size-3.5" />
              Filters
            </Button>
            <Button onClick={() => setExportOpen(true)}>
              <Download className="size-3.5" />
              Export report
            </Button>
          </div>
        }
      />

      <div className="mb-4 flex flex-col gap-3 rounded-[18px] border border-white/[.06] bg-white/[.018] p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="flex rounded-xl border border-white/[.06] bg-white/[.02] p-0.5">
            {(["30 days", "Quarter", "12 months"] as Period[]).map((item) => (
              <button
                key={item}
                onClick={() => {
                  setPeriod(item);
                  setHoveredIndex(null);
                }}
                className={`whitespace-nowrap rounded-[9px] px-3 py-1.5 text-[8px] font-semibold transition ${
                  period === item
                    ? "bg-white/[.08] text-white/72"
                    : "text-white/22 hover:text-white/50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <span className="hidden text-[8px] text-white/18 sm:inline">Updated 2 minutes ago</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[8px] font-medium text-white/25">Compare previous period</span>
          <Switch checked={compare} onCheckedChange={setCompare} label="Compare previous period" />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Gross revenue",
            value: current.grossRevenue,
            change: "+22.4%",
            icon: CreditCard,
            metric: "Revenue" as Metric,
          },
          {
            label: "Engagements",
            value: current.engagements,
            change: "+16.5%",
            icon: BarChart3,
            metric: "Bookings" as Metric,
          },
          {
            label: "New customers",
            value: current.customers,
            change: "+21.4%",
            icon: Users,
            metric: "Customers" as Metric,
          },
          {
            label: "Conversion rate",
            value: current.conversion,
            change: "+3.2%",
            icon: Zap,
            metric: "Customers" as Metric,
          },
        ].map((item) => (
          <button key={item.label} onClick={() => setMetric(item.metric)} className="text-left">
            <Card
              className={`group h-full transition hover:-translate-y-0.5 hover:border-white/[.1] ${
                metric === item.metric ? "border-violet-400/15 bg-violet-400/[.035]" : ""
              }`}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="grid size-9 place-items-center rounded-xl border border-violet-400/10 bg-violet-400/10 text-violet-300">
                    <item.icon className="size-4" />
                  </span>
                  <Badge tone="success">
                    <ArrowUpRight className="mr-1 size-3" />
                    {item.change}
                  </Badge>
                </div>
                <p className="mt-5 text-[9px] font-medium uppercase tracking-[.13em] text-white/22">
                  {item.label}
                </p>
                <p className="mt-1.5 text-[26px] font-semibold tracking-[-.05em] text-white/90">
                  {item.value}
                </p>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.65fr_1fr]">
        <Card className="overflow-hidden">
          <CardHeader className="flex-col border-b border-white/[.055] pb-4 sm:flex-row sm:items-center">
            <SectionHeading
              title={`${meta.label} performance`}
              description={`${period} · recognised commercial activity`}
              action={null}
            />
            <div className="flex items-center gap-2 overflow-x-auto">
              {(["Revenue", "Bookings", "Customers"] as Metric[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setMetric(item)}
                  className={`rounded-lg px-2.5 py-1.5 text-[8px] font-semibold transition ${
                    metric === item
                      ? "bg-violet-400/10 text-violet-200"
                      : "text-white/20 hover:text-white/45"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[30px] font-semibold tracking-[-.05em] text-white/90">
                  {metric === "Revenue"
                    ? current.grossRevenue
                    : metric === "Bookings"
                      ? current.engagements
                      : current.customers}
                </p>
                <p className="mt-1 text-[9px] text-white/25">Current period</p>
              </div>
              <div className="flex gap-4 text-[8px] font-medium text-white/28">
                <span className="flex items-center gap-1.5">
                  <i className="size-1.5 rounded-full" style={{ backgroundColor: meta.color }} />
                  Current
                </span>
                {compare ? (
                  <span className="flex items-center gap-1.5">
                    <i className="size-1.5 rounded-full bg-white/20" />
                    Previous
                  </span>
                ) : null}
              </div>
            </div>

            <div className="relative mt-5 overflow-hidden rounded-xl border border-white/[.045] bg-black/10 px-2 py-3">
              <svg
                viewBox="0 0 1000 280"
                role="img"
                aria-label={`${metric} trend for ${period}`}
                className="h-[230px] w-full overflow-visible"
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <defs>
                  <linearGradient id="analytics-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={meta.color} stopOpacity="0.28" />
                    <stop offset="100%" stopColor={meta.color} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[40, 95, 150, 205, 260].map((y) => (
                  <line
                    key={y}
                    x1="32"
                    x2="968"
                    y1={y}
                    y2={y}
                    stroke="rgba(255,255,255,.05)"
                    strokeWidth="1"
                  />
                ))}
                <motion.path
                  key={`${metric}-${period}-area`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  d={chart.areaPath}
                  fill="url(#analytics-area)"
                />
                {compare ? (
                  <motion.polyline
                    key={`${metric}-${period}-previous`}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    points={chart.previousPoints}
                    fill="none"
                    stroke="rgba(255,255,255,.18)"
                    strokeWidth="2"
                    strokeDasharray="7 8"
                  />
                ) : null}
                <motion.polyline
                  key={`${metric}-${period}-current`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  points={chart.points}
                  fill="none"
                  stroke={meta.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {values.map((value, index) => (
                  <g key={current.labels[index]}>
                    <rect
                      x={chart.x(index) - 30}
                      y="18"
                      width="60"
                      height="244"
                      fill="transparent"
                      onMouseEnter={() => setHoveredIndex(index)}
                    />
                    <motion.circle
                      initial={{ r: 0 }}
                      animate={{ r: hoveredIndex === index ? 6 : 3.5 }}
                      cx={chart.x(index)}
                      cy={chart.y(value)}
                      fill={meta.color}
                      stroke="#121217"
                      strokeWidth="3"
                      className="pointer-events-none"
                    />
                    {hoveredIndex === index ? (
                      <line
                        x1={chart.x(index)}
                        x2={chart.x(index)}
                        y1="22"
                        y2="262"
                        stroke="rgba(255,255,255,.12)"
                        strokeDasharray="3 5"
                      />
                    ) : null}
                  </g>
                ))}
              </svg>

              {hoveredIndex !== null ? (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pointer-events-none absolute top-4 z-10 min-w-28 -translate-x-1/2 rounded-xl border border-white/[.09] bg-[#18181e]/95 p-2.5 shadow-2xl backdrop-blur-xl"
                  style={{ left: `${3.6 + (hoveredIndex / Math.max(values.length - 1, 1)) * 92.8}%` }}
                >
                  <p className="text-[8px] font-medium text-white/25">{current.labels[hoveredIndex]}</p>
                  <p className="mt-1 text-[11px] font-semibold text-white/72">
                    {formatPoint(values[hoveredIndex] ?? 0)}
                  </p>
                  {compare ? (
                    <p className="mt-0.5 text-[8px] text-emerald-300">
                      +{Math.max(0, (values[hoveredIndex] ?? 0) - (previousValues[hoveredIndex] ?? 0))}
                      {meta.suffix} vs previous
                    </p>
                  ) : null}
                </motion.div>
              ) : null}

              <div className="mt-1 flex justify-between px-3 text-[7px] uppercase tracking-wider text-white/16">
                {current.labels.map((label, index) => (
                  <span
                    key={label}
                    className={current.labels.length > 9 && index % 2 !== 0 ? "hidden sm:inline" : ""}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="relative overflow-hidden border-violet-400/15 bg-gradient-to-br from-violet-500/[.1] to-indigo-500/[.035]">
            <div className="absolute -right-10 -top-10 size-28 rounded-full bg-violet-500/15 blur-3xl" />
            <CardContent className="relative p-5">
              <div className="flex items-center justify-between">
                <Sparkles className="size-5 text-violet-300" />
                <Badge tone="purple">AI forecast</Badge>
              </div>
              <h3 className="mt-5 text-lg font-medium tracking-[-.025em] text-white/88">
                $542.8k projected
              </h3>
              <p className="mt-2 text-[10px] leading-5 text-white/35">
                Current demand and conversion signals indicate 11.6% upside to the annual plan.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-white/[.06] bg-white/[.03] p-3">
                  <p className="text-[8px] text-white/20">Confidence</p>
                  <p className="mt-1 text-[11px] font-semibold text-emerald-200">92%</p>
                </div>
                <div className="rounded-xl border border-white/[.06] bg-white/[.03] p-3">
                  <p className="text-[8px] text-white/20">Pipeline</p>
                  <p className="mt-1 text-[11px] font-semibold text-violet-200">$184k</p>
                </div>
              </div>
              <Button size="sm" className="mt-5" onClick={() => announce("Forecast model expanded")}>
                Explore forecast <ChevronRight className="size-3.5" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SectionHeading title="Acquisition mix" description="New customer contribution" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex items-center gap-5">
                <div className="relative grid size-28 shrink-0 place-items-center rounded-full bg-[conic-gradient(#8b7cf8_0_38%,#5bbfe8_38%_69%,#54ca94_69%_88%,#e5b95f_88%)]">
                  <div className="grid size-20 place-items-center rounded-full bg-[#121217] text-center">
                    <span>
                      <span className="block text-lg font-semibold text-white/72">96</span>
                      <span className="block text-[7px] text-white/18">customers</span>
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1 space-y-2.5">
                  {[
                    ["Founder network", "38%", "bg-violet-400"],
                    ["Client referrals", "31%", "bg-sky-400"],
                    ["Organic search", "19%", "bg-emerald-400"],
                    ["Partnerships", "12%", "bg-amber-300"],
                  ].map(([label, value, color]) => (
                    <div key={label} className="flex items-center gap-2 text-[8px]">
                      <i className={`size-1.5 rounded-full ${color}`} />
                      <span className="truncate text-white/28">{label}</span>
                      <span className="ml-auto font-semibold text-white/52">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.45fr_1fr]">
        <Card className="overflow-hidden">
          <CardHeader className="border-b border-white/[.055] pb-4">
            <SectionHeading
              title="Service performance"
              description="Recognised revenue, demand and delivery margin"
              action={<Button variant="ghost" size="sm" onClick={() => router.push("/business-dashboard/services")}>View all</Button>}
            />
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left">
              <thead>
                <tr className="text-[8px] font-semibold uppercase tracking-[.11em] text-white/18">
                  <th className="px-5 py-3">Service line</th>
                  <th className="px-3 py-3">Revenue</th>
                  <th className="px-3 py-3">Bookings</th>
                  <th className="px-3 py-3">Margin</th>
                  <th className="px-3 py-3">Growth</th>
                </tr>
              </thead>
              <tbody>
                {topServices.map((service) => (
                  <tr key={service.name} className="border-t border-white/[.045] hover:bg-white/[.02]">
                    <td className="px-5 py-4">
                      <p className="text-[10px] font-medium text-white/55">{service.name}</p>
                      <div className="mt-2 h-1 w-28 rounded-full bg-white/[.055]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${service.share}%` }}
                          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-300"
                        />
                      </div>
                    </td>
                    <td className="px-3 py-4 text-[10px] font-semibold text-white/62">
                      {service.revenue}
                    </td>
                    <td className="px-3 py-4 text-[10px] text-white/34">{service.bookings}</td>
                    <td className="px-3 py-4 text-[10px] text-white/34">{service.margin}</td>
                    <td className="px-3 py-4">
                      <Badge tone="success">{service.growth}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <SectionHeading title="Demand heatmap" description="Booking intent by weekday and time" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid grid-cols-[34px_repeat(6,1fr)] gap-1.5 text-[7px] text-white/16">
              <span />
              {["8a", "10a", "12p", "2p", "4p", "6p"].map((time) => (
                <span key={time} className="text-center">{time}</span>
              ))}
              {heatmap.map((row, rowIndex) => (
                <div key={rowIndex} className="contents">
                  <span className="flex items-center">{["Mon", "Tue", "Wed", "Thu", "Fri"][rowIndex]}</span>
                  {row.map((value, columnIndex) => (
                    <button
                      key={columnIndex}
                      title={`${value}% demand`}
                      onClick={() => announce(`${value}% demand at this time`)}
                      className="aspect-square rounded-md border border-white/[.035] transition hover:scale-110 hover:border-white/15"
                      style={{ backgroundColor: `rgba(139,124,248,${0.05 + value / 150})` }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[.05] bg-white/[.018] p-3">
              <div className="flex items-start gap-2">
                <MousePointer2 className="mt-0.5 size-3.5 text-violet-300" />
                <div>
                  <p className="text-[9px] font-medium text-white/45">Peak demand</p>
                  <p className="mt-1 text-[8px] text-white/20">Wednesday · 2:00 PM</p>
                </div>
              </div>
              <Badge tone="purple">91%</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {[
          {
            icon: TrendingUp,
            title: "Recurring AI advisory",
            description: "Strong sprint demand supports a recurring offer worth an estimated $184k annually.",
            impact: "+$184k ARR",
            positive: true,
          },
          {
            icon: CalendarDays,
            title: "Wednesday capacity",
            description: "Demand exceeds delivery capacity between 1–4 PM for three consecutive weeks.",
            impact: "9 bookings at risk",
            positive: false,
          },
          {
            icon: Users,
            title: "Referral momentum",
            description: "Founder-network customers are converting 2.4× faster than all other channels.",
            impact: "+14.2% conversion",
            positive: true,
          },
        ].map((insight) => (
          <Card key={insight.title} className="group transition hover:-translate-y-0.5 hover:border-white/[.1]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-xl bg-violet-400/10 text-violet-300">
                  <insight.icon className="size-4" />
                </span>
                <Badge tone={insight.positive ? "success" : "warning"}>
                  {insight.positive ? <ArrowUpRight className="mr-1 size-3" /> : <ArrowDownRight className="mr-1 size-3" />}
                  {insight.impact}
                </Badge>
              </div>
              <h3 className="mt-4 text-[11px] font-semibold text-white/62">{insight.title}</h3>
              <p className="mt-2 text-[9px] leading-4 text-white/26">{insight.description}</p>
              <button onClick={() => announce(`${insight.title} opened in the intelligence workspace`)} className="mt-4 flex items-center gap-1 text-[8px] font-semibold text-violet-300 transition hover:text-violet-200">
                Explore insight <ChevronRight className="size-3" />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        title="Export analytics report"
        description="Prepare a polished snapshot for your team or stakeholders."
        footer={
          <>
            <Button variant="ghost" onClick={() => setExportOpen(false)}>
              Cancel
            </Button>
            <Button onClick={exportReport} disabled={exporting}>
              <Download className={`size-3.5 ${exporting ? "animate-bounce" : ""}`} />
              {exporting ? "Preparing…" : "Export report"}
            </Button>
          </>
        }
      >
        <div className="space-y-5">
          <div>
            <p className="text-[10px] font-medium text-white/42">Report scope</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {["Executive summary", "Full analytics", "Commercial only"].map((scope) => (
                <button
                  key={scope}
                  onClick={() => setReport({ ...report, scope })}
                  className={`rounded-xl border p-3 text-left transition ${
                    report.scope === scope
                      ? "border-violet-400/20 bg-violet-400/[.08]"
                      : "border-white/[.055] bg-white/[.018] hover:bg-white/[.035]"
                  }`}
                >
                  <span className="block text-[9px] font-semibold text-white/52">{scope}</span>
                  <span className="mt-1 block text-[8px] text-white/18">
                    {scope === "Executive summary" ? "8 pages" : scope === "Full analytics" ? "24 pages" : "12 pages"}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-medium text-white/42">Format</p>
            <div className="mt-2 flex gap-2">
              {["PDF", "CSV", "Slides"].map((format) => (
                <button
                  key={format}
                  onClick={() => setReport({ ...report, format })}
                  className={`rounded-xl border px-4 py-2.5 text-[9px] font-semibold transition ${
                    report.format === format
                      ? "border-violet-400/20 bg-violet-400/[.08] text-violet-200"
                      : "border-white/[.055] bg-white/[.018] text-white/28"
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/[.055] bg-white/[.022] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium text-white/48">Include AI commentary</p>
                <p className="mt-1 text-[8px] text-white/20">Add key patterns and recommended actions.</p>
              </div>
              <Switch checked onCheckedChange={() => undefined} label="Include AI commentary" />
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
