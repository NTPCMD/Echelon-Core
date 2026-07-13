import {
  BedDouble,
  BriefcaseBusiness,
  CalendarDays,
  Compass,
  Handshake,
  Network,
  UserRoundSearch,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type ModuleStatus = "live" | "preview";

export interface ModuleAccent {
  /** e.g. "violet" — used to build tailwind classes and gradients. */
  text: string;
  bg: string;
  border: string;
  gradient: string;
}

export interface ConsumerModule {
  /** URL segment under /explore, e.g. "jobs". */
  slug: string;
  name: string;
  icon: LucideIcon;
  status: ModuleStatus;
  accent: ModuleAccent;
  /** Short one-liner used on cards. */
  tagline: string;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  /** The primary action a consumer takes on a listing. */
  actionVerb: string;
  /** What a single listing is called, e.g. "role", "stay", "event". */
  itemNoun: string;
  searchPlaceholder: string;
  /** Visual-only filter chips shown above listings. */
  filters: string[];
  howItWorks: Array<{ title: string; description: string }>;
}

const accents: Record<string, ModuleAccent> = {
  violet: {
    text: "text-violet-200",
    bg: "bg-violet-400/10",
    border: "border-violet-400/12",
    gradient: "from-violet-500/45 via-indigo-500/20 to-sky-400/25",
  },
  sky: {
    text: "text-sky-200",
    bg: "bg-sky-400/10",
    border: "border-sky-400/12",
    gradient: "from-sky-500/40 via-blue-500/18 to-indigo-400/24",
  },
  amber: {
    text: "text-amber-100",
    bg: "bg-amber-300/10",
    border: "border-amber-300/12",
    gradient: "from-amber-500/38 via-orange-500/18 to-rose-400/24",
  },
  emerald: {
    text: "text-emerald-200",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/12",
    gradient: "from-emerald-500/38 via-teal-500/18 to-cyan-400/24",
  },
  rose: {
    text: "text-rose-200",
    bg: "bg-rose-400/10",
    border: "border-rose-400/12",
    gradient: "from-rose-500/38 via-pink-500/18 to-orange-400/24",
  },
  cyan: {
    text: "text-cyan-200",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/12",
    gradient: "from-cyan-500/38 via-sky-500/18 to-blue-400/24",
  },
  teal: {
    text: "text-teal-200",
    bg: "bg-teal-400/10",
    border: "border-teal-400/12",
    gradient: "from-teal-500/38 via-emerald-500/18 to-cyan-400/24",
  },
  indigo: {
    text: "text-indigo-200",
    bg: "bg-indigo-400/10",
    border: "border-indigo-400/12",
    gradient: "from-indigo-500/44 via-violet-500/20 to-fuchsia-400/24",
  },
  fuchsia: {
    text: "text-fuchsia-200",
    bg: "bg-fuchsia-400/10",
    border: "border-fuchsia-400/12",
    gradient: "from-fuchsia-500/38 via-violet-500/20 to-indigo-400/24",
  },
};

/**
 * The Echelon consumer modules. Food has been intentionally dropped from the
 * original 10-module vision. "Services" is the flagship live module and keeps
 * its own bespoke routes (/services, /businesses, /booking); every other
 * module is data-driven through /explore/[module].
 */
export const consumerModules: ConsumerModule[] = [
  {
    slug: "services",
    name: "Services",
    icon: Wrench,
    status: "live",
    accent: accents.violet!,
    tagline: "Book trusted local experts without the search spiral.",
    hero: {
      eyebrow: "Services · Live in Perth",
      title: "The right local expert, without the search spiral.",
      description:
        "Discover trusted businesses, compare reputation and book a live time — all in one calm experience.",
    },
    actionVerb: "Book",
    itemNoun: "service",
    searchPlaceholder: "Book a haircut tomorrow, remedial massage, wedding DJ…",
    filters: ["All", "Beauty & wellness", "Trades & home", "Creative", "Fitness", "Events"],
    howItWorks: [
      { title: "Describe it", description: "Tell Echelon what you need in plain language." },
      { title: "Compare", description: "See trusted, verified options with transparent pricing." },
      { title: "Book", description: "Pick a live time and confirm in seconds." },
    ],
  },
  {
    slug: "jobs",
    name: "Jobs",
    icon: BriefcaseBusiness,
    status: "preview",
    accent: accents.sky!,
    tagline: "Discover work aligned to your skills, availability and ambition.",
    hero: {
      eyebrow: "Jobs · Preview",
      title: "Work that fits your life, not just your keywords.",
      description:
        "Roles matched to capability, availability and intent — surfaced from local employers who are hiring now.",
    },
    actionVerb: "Apply",
    itemNoun: "role",
    searchPlaceholder: "Find a marketing role, part-time work near me…",
    filters: ["All", "Full-time", "Part-time", "Casual", "Remote", "Hybrid"],
    howItWorks: [
      { title: "Build a profile", description: "Once — your skills, availability and what you want next." },
      { title: "Get matched", description: "Echelon surfaces roles that actually fit, not a keyword flood." },
      { title: "Apply in one tap", description: "Your profile travels with you — no re-typing per employer." },
    ],
  },
  {
    slug: "freelancing",
    name: "Freelancing",
    icon: Zap,
    status: "preview",
    accent: accents.amber!,
    tagline: "Match scoped projects with the right independent talent.",
    hero: {
      eyebrow: "Freelancing · Preview",
      title: "Scoped projects, matched to independent talent.",
      description:
        "Hire vetted freelancers for a defined outcome — or list your own skills and get matched to briefs that fit.",
    },
    actionVerb: "Hire",
    itemNoun: "freelancer",
    searchPlaceholder: "I need someone to build my website, a brand designer…",
    filters: ["All", "Design", "Development", "Marketing", "Writing", "Video"],
    howItWorks: [
      { title: "Scope the brief", description: "Describe the outcome, budget and timeline." },
      { title: "Review matches", description: "See portfolios, rates and availability side by side." },
      { title: "Hire & manage", description: "Agree terms and track the work in one place." },
    ],
  },
  {
    slug: "tasks",
    name: "One-Off Jobs",
    icon: Handshake,
    status: "preview",
    accent: accents.emerald!,
    tagline: "Post a task, get it done by trusted locals — today.",
    hero: {
      eyebrow: "One-Off Jobs · Preview",
      title: "Post a task, get it done by trusted locals.",
      description:
        "Cleaning, moving, assembly, handiwork — describe the job and match with nearby helpers who can start now.",
    },
    actionVerb: "Request",
    itemNoun: "helper",
    searchPlaceholder: "I need a cleaner Saturday, help moving a couch…",
    filters: ["All", "Cleaning", "Moving", "Handy work", "Assembly", "Delivery"],
    howItWorks: [
      { title: "Describe the task", description: "What, where and when — a few words is enough." },
      { title: "Match a helper", description: "See rated locals available in your window." },
      { title: "Done", description: "They arrive, complete it, and you settle up securely." },
    ],
  },
  {
    slug: "events",
    name: "Events",
    icon: CalendarDays,
    status: "preview",
    accent: accents.rose!,
    tagline: "Find the rooms, people and moments worth showing up for.",
    hero: {
      eyebrow: "Events · Preview",
      title: "The rooms and moments worth showing up for.",
      description:
        "Discover local experiences shaped around your context — professional, community, music and culture.",
    },
    actionVerb: "RSVP",
    itemNoun: "event",
    searchPlaceholder: "Find networking events this weekend, live music tonight…",
    filters: ["All", "Professional", "Community", "Music & culture", "Workshops", "Free"],
    howItWorks: [
      { title: "Discover", description: "Events surfaced around your interests and timing." },
      { title: "RSVP", description: "Reserve your spot and add it to your calendar." },
      { title: "Show up", description: "Get reminders and see who else is going." },
    ],
  },
  {
    slug: "stays",
    name: "Accommodation",
    icon: BedDouble,
    status: "preview",
    accent: accents.cyan!,
    tagline: "Places to stay, shaped around why you're travelling.",
    hero: {
      eyebrow: "Accommodation · Preview",
      title: "Places to stay, shaped around your trip.",
      description:
        "Hotels, short stays and unique places — matched to the purpose and shape of why you're travelling.",
    },
    actionVerb: "Reserve",
    itemNoun: "stay",
    searchPlaceholder: "A quiet cabin for the weekend, a hotel near the CBD…",
    filters: ["All", "Hotels", "Short stays", "Unique", "Work travel", "Pet friendly"],
    howItWorks: [
      { title: "Tell us the trip", description: "Purpose, dates and who's coming." },
      { title: "Compare places", description: "Options ranked by fit, not just price." },
      { title: "Reserve", description: "Confirm your dates with secure booking." },
    ],
  },
  {
    slug: "networking",
    name: "Networking",
    icon: Network,
    status: "preview",
    accent: accents.teal!,
    tagline: "Meet relevant founders, collaborators, mentors and investors.",
    hero: {
      eyebrow: "Networking · Preview",
      title: "Meet the people who move things forward.",
      description:
        "Warm, relevant introductions to founders, collaborators, mentors and investors near you.",
    },
    actionVerb: "Connect",
    itemNoun: "person",
    searchPlaceholder: "Find a startup mentor, meet local founders…",
    filters: ["All", "Founders", "Mentors", "Investors", "Operators", "Creatives"],
    howItWorks: [
      { title: "Share intent", description: "What you're building and who you'd like to meet." },
      { title: "Get intros", description: "Relevant, mutual matches — never cold spam." },
      { title: "Connect", description: "Request a chat and meet on your terms." },
    ],
  },
  {
    slug: "recruitment",
    name: "Recruitment",
    icon: UserRoundSearch,
    status: "preview",
    accent: accents.indigo!,
    tagline: "Join the talent pool and let the right roles find you.",
    hero: {
      eyebrow: "Recruitment · Preview",
      title: "Let the right roles find you.",
      description:
        "Join a private talent pool. Verified local employers reach out when your profile is the right fit.",
    },
    actionVerb: "Join pool",
    itemNoun: "talent pool",
    searchPlaceholder: "Software, healthcare, trades, hospitality talent pools…",
    filters: ["All", "Technology", "Healthcare", "Trades", "Hospitality", "Corporate"],
    howItWorks: [
      { title: "Create your profile", description: "Skills, experience and what you're open to." },
      { title: "Stay private", description: "You're only visible to roles you'd actually consider." },
      { title: "Get approached", description: "Employers reach out — you choose who to reply to." },
    ],
  },
  {
    slug: "concierge",
    name: "Concierge",
    icon: Compass,
    status: "preview",
    accent: accents.fuchsia!,
    tagline: "One intelligent layer for everything happening around you.",
    hero: {
      eyebrow: "Concierge · Preview",
      title: "One AI for everything local.",
      description:
        "The connective layer. Ask for anything — the Concierge routes across every Echelon module and gets it done.",
    },
    actionVerb: "Ask",
    itemNoun: "request",
    searchPlaceholder: "Plan my Saturday, sort my move, organise an offsite…",
    filters: [],
    howItWorks: [
      { title: "Just ask", description: "Describe the outcome, however messy or multi-part." },
      { title: "Echelon routes it", description: "It pulls from services, events, stays, tasks and more." },
      { title: "One thread", description: "Everything you set in motion, tracked in one place." },
    ],
  },
];

export const liveModules = consumerModules.filter((module) => module.status === "live");
export const previewModules = consumerModules.filter((module) => module.status === "preview");

export function getModule(slug: string): ConsumerModule | undefined {
  return consumerModules.find((module) => module.slug === slug);
}

/** Modules that render through the generic /explore/[module] routes. */
export const exploreModules = consumerModules.filter((module) => module.slug !== "services");
