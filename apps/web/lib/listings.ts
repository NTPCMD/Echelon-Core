/**
 * Mock listing data for the non-services consumer modules. Purely for UI/UX
 * scaffolding — no persistence, no AI. Each module maps to an array of
 * `Listing` records rendered through the generic /explore/[module] routes.
 */

export interface ListingMeta {
  label: string;
  value: string;
}

export interface Listing {
  id: string;
  module: string;
  /** Primary headline, e.g. a job title or event name. */
  title: string;
  /** Secondary line — company, host, provider, etc. */
  subtitle: string;
  location: string;
  /** Display-ready price/compensation string. */
  price?: string;
  priceNote?: string;
  rating?: number;
  reviewCount?: number;
  /** Filter category this listing belongs to (matches module.filters). */
  category: string;
  tags: string[];
  /** Compact key facts shown as a stat row on cards and detail pages. */
  meta: ListingMeta[];
  description: string;
  highlights: string[];
  /** Freshness / urgency line, e.g. "Posted 2 days ago". */
  posted: string;
}

const listings: Record<string, Listing[]> = {
  jobs: [
    {
      id: "job-growth-lead",
      module: "jobs",
      title: "Growth Marketing Lead",
      subtitle: "Meridian Software",
      location: "Perth CBD",
      price: "$120k–$140k",
      priceNote: "per year + super",
      category: "Full-time",
      tags: ["Marketing", "Hybrid", "Leadership"],
      meta: [
        { label: "Type", value: "Full-time" },
        { label: "Setup", value: "Hybrid · 3 days" },
        { label: "Experience", value: "5+ years" },
      ],
      description:
        "Own the full growth funnel for a fast-scaling local SaaS — from paid acquisition to lifecycle and retention. You'll lead a small team and report to the CMO.",
      highlights: ["Team of 4", "Equity options", "Flexible hours", "L&D budget"],
      posted: "Posted 2 days ago",
    },
    {
      id: "job-barista",
      module: "jobs",
      title: "Weekend Barista",
      subtitle: "Coastline Coffee Co.",
      location: "Fremantle",
      price: "$32/hr",
      priceNote: "casual loading incl.",
      category: "Casual",
      tags: ["Hospitality", "Weekends", "No experience OK"],
      meta: [
        { label: "Type", value: "Casual" },
        { label: "Shifts", value: "Sat–Sun" },
        { label: "Start", value: "Immediate" },
      ],
      description:
        "Join a busy specialty café by the water. Great coffee, friendly crew and a steady weekend rush. Training provided for the right attitude.",
      highlights: ["Free coffee", "Tips pooled", "Walk to South Beach"],
      posted: "Posted today",
    },
    {
      id: "job-rn",
      module: "jobs",
      title: "Registered Nurse — Aged Care",
      subtitle: "Rosewood Care Group",
      location: "Subiaco",
      price: "$45–$52/hr",
      priceNote: "penalty rates apply",
      category: "Part-time",
      tags: ["Healthcare", "Part-time", "AHPRA"],
      meta: [
        { label: "Type", value: "Part-time" },
        { label: "Hours", value: "24–30/wk" },
        { label: "Roster", value: "Rotating" },
      ],
      description:
        "Provide person-centred care in a well-resourced residential facility. Supportive clinical team and genuine work-life balance.",
      highlights: ["Salary packaging", "Paid training", "Free parking"],
      posted: "Posted 4 days ago",
    },
    {
      id: "job-carpenter",
      module: "jobs",
      title: "Qualified Carpenter",
      subtitle: "Northline Construction",
      location: "Osborne Park",
      price: "$40–$46/hr",
      category: "Full-time",
      tags: ["Trades", "Full-time", "Ticketed"],
      meta: [
        { label: "Type", value: "Full-time" },
        { label: "Sites", value: "Metro" },
        { label: "Start", value: "Next week" },
      ],
      description:
        "Residential and light-commercial builds across the metro area. Tools and reliable transport required. Long-term work for the right tradesperson.",
      highlights: ["Consistent hours", "Progression to leading hand", "Modern tools"],
      posted: "Posted 1 week ago",
    },
  ],
  freelancing: [
    {
      id: "free-web-dev",
      module: "freelancing",
      title: "Full-Stack Web Developer",
      subtitle: "Dane Whitlock",
      location: "Perth · Remote",
      price: "$95/hr",
      rating: 4.9,
      reviewCount: 63,
      category: "Development",
      tags: ["Next.js", "Stripe", "Fast turnaround"],
      meta: [
        { label: "Rate", value: "$95/hr" },
        { label: "Response", value: "< 2 hrs" },
        { label: "Delivered", value: "120+ projects" },
      ],
      description:
        "I build production web apps and marketing sites end to end — Next.js, TypeScript, payments and dashboards. Happy to scope fixed-price for defined work.",
      highlights: ["Available in 3 days", "Fixed or hourly", "Post-launch support"],
      posted: "Available now",
    },
    {
      id: "free-brand",
      module: "freelancing",
      title: "Brand & Identity Designer",
      subtitle: "Studio Marlowe",
      location: "Mount Lawley",
      price: "From $1,800",
      priceNote: "per brand package",
      rating: 5.0,
      reviewCount: 41,
      category: "Design",
      tags: ["Branding", "Logo", "Guidelines"],
      meta: [
        { label: "From", value: "$1,800" },
        { label: "Turnaround", value: "2–3 wks" },
        { label: "Style", value: "Editorial" },
      ],
      description:
        "Distinctive brand identities for local businesses — logo, palette, type system and a tidy guidelines doc your team can actually use.",
      highlights: ["3 concepts", "2 revision rounds", "Print + digital assets"],
      posted: "Booking July",
    },
    {
      id: "free-copy",
      module: "freelancing",
      title: "Conversion Copywriter",
      subtitle: "Priya N.",
      location: "Perth · Remote",
      price: "$85/hr",
      rating: 4.8,
      reviewCount: 57,
      category: "Writing",
      tags: ["Web copy", "Email", "SEO"],
      meta: [
        { label: "Rate", value: "$85/hr" },
        { label: "Response", value: "Same day" },
        { label: "Niche", value: "SaaS & local" },
      ],
      description:
        "Words that sell without the hype. Landing pages, launch emails and product messaging that sounds like you and converts like it should.",
      highlights: ["Voice workshop", "SEO-aware", "2 revisions"],
      posted: "Available now",
    },
    {
      id: "free-video",
      module: "freelancing",
      title: "Video Editor & Motion",
      subtitle: "Cutroom Collective",
      location: "Leederville",
      price: "$70/hr",
      rating: 4.7,
      reviewCount: 29,
      category: "Video",
      tags: ["Reels", "Motion", "Colour"],
      meta: [
        { label: "Rate", value: "$70/hr" },
        { label: "Turnaround", value: "48–72 hrs" },
        { label: "Formats", value: "Social + long" },
      ],
      description:
        "Short-form social edits and polished brand films. Fast, punchy cuts with clean motion graphics and grade included.",
      highlights: ["Vertical + wide", "Captions included", "Licensed music"],
      posted: "2 slots this month",
    },
  ],
  tasks: [
    {
      id: "task-clean",
      module: "tasks",
      title: "End-of-Lease Cleaning",
      subtitle: "SparkleWorks",
      location: "Victoria Park",
      price: "$45/hr",
      priceNote: "min. 3 hrs",
      rating: 4.9,
      reviewCount: 214,
      category: "Cleaning",
      tags: ["Bond-back", "Same day", "Insured"],
      meta: [
        { label: "Rate", value: "$45/hr" },
        { label: "Crew", value: "1–3 people" },
        { label: "Available", value: "Today" },
      ],
      description:
        "Detailed bond cleans done right the first time. Kitchen, bathrooms, windows and carpets — with a bond-back guarantee.",
      highlights: ["Bond-back guarantee", "Own supplies", "Police-checked"],
      posted: "Available today",
    },
    {
      id: "task-move",
      module: "tasks",
      title: "Two Movers + Van",
      subtitle: "Lift & Shift",
      location: "Perth metro",
      price: "$110/hr",
      rating: 4.8,
      reviewCount: 138,
      category: "Moving",
      tags: ["Furniture", "Van incl.", "Careful"],
      meta: [
        { label: "Rate", value: "$110/hr" },
        { label: "Includes", value: "Van + 2" },
        { label: "Min", value: "2 hrs" },
      ],
      description:
        "Two experienced movers and a large van for house moves, single items or office shifts. Blankets, straps and trolleys included.",
      highlights: ["Fully insured", "Same-week slots", "Disassembly help"],
      posted: "Booking this week",
    },
    {
      id: "task-assemble",
      module: "tasks",
      title: "Flat-Pack & Assembly",
      subtitle: "Riley T.",
      location: "Joondalup",
      price: "$55/hr",
      rating: 5.0,
      reviewCount: 76,
      category: "Assembly",
      tags: ["IKEA", "Same day", "Tools incl."],
      meta: [
        { label: "Rate", value: "$55/hr" },
        { label: "Response", value: "< 1 hr" },
        { label: "Available", value: "Evenings" },
      ],
      description:
        "Wardrobes, desks, beds and shelving assembled fast and level. Bring the boxes, I bring the tools and patience.",
      highlights: ["Own tools", "Rubbish removed", "Wall mounting"],
      posted: "Available today",
    },
    {
      id: "task-handy",
      module: "tasks",
      title: "General Handyperson",
      subtitle: "FixIt Local",
      location: "Bayswater",
      price: "$65/hr",
      rating: 4.7,
      reviewCount: 92,
      category: "Handy work",
      tags: ["Repairs", "Mounting", "Odd jobs"],
      meta: [
        { label: "Rate", value: "$65/hr" },
        { label: "Callout", value: "Free" },
        { label: "Available", value: "This week" },
      ],
      description:
        "Small repairs, TV mounting, leaky taps, gate hinges and the ever-growing to-do list. One trusted local for all the little jobs.",
      highlights: ["No callout fee", "Materials at cost", "Tidy finish"],
      posted: "Booking this week",
    },
  ],
  events: [
    {
      id: "event-founders",
      module: "events",
      title: "Perth Founders Breakfast",
      subtitle: "Startup West",
      location: "Nedlands",
      price: "$25",
      category: "Professional",
      tags: ["Startups", "Morning", "Networking"],
      meta: [
        { label: "When", value: "Sat 8:00 AM" },
        { label: "Format", value: "In person" },
        { label: "Spots", value: "12 left" },
      ],
      description:
        "Monthly gathering of local founders and operators over great coffee. One short talk, plenty of honest conversation, no pitches.",
      highlights: ["Guest speaker", "Curated tables", "Coffee included"],
      posted: "This Saturday",
    },
    {
      id: "event-livemusic",
      module: "events",
      title: "Sunset Sessions — Live Jazz",
      subtitle: "The Rooftop",
      location: "Northbridge",
      price: "$40",
      category: "Music & culture",
      tags: ["Live music", "Evening", "21+"],
      meta: [
        { label: "When", value: "Fri 6:30 PM" },
        { label: "Format", value: "Rooftop" },
        { label: "Spots", value: "Selling fast" },
      ],
      description:
        "A four-piece jazz ensemble as the sun goes down over the city. Small plates and cocktails available all evening.",
      highlights: ["Skyline views", "Cash bar", "Support act 6pm"],
      posted: "This Friday",
    },
    {
      id: "event-workshop",
      module: "events",
      title: "Intro to Ceramics",
      subtitle: "Clay & Co. Studio",
      location: "Maylands",
      price: "$95",
      priceNote: "materials incl.",
      category: "Workshops",
      tags: ["Hands-on", "Beginner", "Weekend"],
      meta: [
        { label: "When", value: "Sun 1:00 PM" },
        { label: "Length", value: "2.5 hrs" },
        { label: "Spots", value: "6 left" },
      ],
      description:
        "Get your hands dirty on the wheel. Make two pieces to take home once fired. All tools, clay and glazes provided.",
      highlights: ["No experience", "Take 2 pieces home", "Small class"],
      posted: "This Sunday",
    },
    {
      id: "event-community",
      module: "events",
      title: "Riverside Community Market",
      subtitle: "City of South Perth",
      location: "South Perth",
      price: "Free",
      category: "Community",
      tags: ["Family", "Outdoor", "Free"],
      meta: [
        { label: "When", value: "Sat 9:00 AM" },
        { label: "Format", value: "Outdoor" },
        { label: "Entry", value: "Free" },
      ],
      description:
        "60+ local makers, growers and food trucks along the foreshore. Live acoustic sets and a kids' corner all morning.",
      highlights: ["Dog friendly", "Live music", "Free entry"],
      posted: "This Saturday",
    },
  ],
  stays: [
    {
      id: "stay-cabin",
      module: "stays",
      title: "Off-Grid Forest Cabin",
      subtitle: "Karri Retreats",
      location: "Dwellingup",
      price: "From $210",
      priceNote: "per night",
      rating: 4.95,
      reviewCount: 184,
      category: "Unique",
      tags: ["Nature", "Couples", "Fireplace"],
      meta: [
        { label: "Sleeps", value: "2" },
        { label: "Min stay", value: "2 nights" },
        { label: "Check-in", value: "Self" },
      ],
      description:
        "A design cabin tucked in the karri forest — wood fire, outdoor bath and total quiet. Ninety minutes from the city, a world away.",
      highlights: ["Outdoor bath", "Wood fire", "No wifi (on purpose)"],
      posted: "3 dates left in July",
    },
    {
      id: "stay-hotel",
      module: "stays",
      title: "Harbourside Boutique Hotel",
      subtitle: "The Jetty",
      location: "Fremantle",
      price: "From $265",
      priceNote: "per night",
      rating: 4.8,
      reviewCount: 421,
      category: "Hotels",
      tags: ["Boutique", "Central", "Breakfast"],
      meta: [
        { label: "Sleeps", value: "2–3" },
        { label: "Parking", value: "Valet" },
        { label: "Check-in", value: "3:00 PM" },
      ],
      description:
        "A restored harbour warehouse turned boutique hotel. Walk to the markets, cafés and beach. Rooftop pool and an excellent little bar.",
      highlights: ["Rooftop pool", "Walk to markets", "Breakfast included"],
      posted: "Good availability",
    },
    {
      id: "stay-apartment",
      module: "stays",
      title: "CBD Executive Apartment",
      subtitle: "Stayline",
      location: "Perth CBD",
      price: "From $180",
      priceNote: "per night",
      rating: 4.7,
      reviewCount: 302,
      category: "Work travel",
      tags: ["Business", "Wifi", "Kitchen"],
      meta: [
        { label: "Sleeps", value: "2" },
        { label: "Desk", value: "Yes" },
        { label: "Check-in", value: "Self" },
      ],
      description:
        "A clean, quiet one-bedder in the heart of town — fast wifi, proper desk and a full kitchen. Ideal for a work trip or long stay.",
      highlights: ["Fast wifi", "Gym & pool", "Weekly rates"],
      posted: "Available this week",
    },
    {
      id: "stay-beach",
      module: "stays",
      title: "Beach House with Pool",
      subtitle: "Coast Collective",
      location: "Scarborough",
      price: "From $420",
      priceNote: "per night",
      rating: 4.9,
      reviewCount: 96,
      category: "Short stays",
      tags: ["Family", "Pool", "Beachfront"],
      meta: [
        { label: "Sleeps", value: "8" },
        { label: "Min stay", value: "3 nights" },
        { label: "Check-in", value: "2:00 PM" },
      ],
      description:
        "A big, breezy beach house steps from the sand. Pool, outdoor kitchen and room for the whole crew. Made for long summer weekends.",
      highlights: ["Private pool", "Steps to beach", "Sleeps 8"],
      posted: "2 weekends left",
    },
  ],
  networking: [
    {
      id: "net-founder",
      module: "networking",
      title: "Maya Chen",
      subtitle: "Founder & CEO · Fintech",
      location: "Perth CBD",
      rating: 4.9,
      reviewCount: 38,
      category: "Founders",
      tags: ["Fintech", "Scaling", "Fundraising"],
      meta: [
        { label: "Stage", value: "Series A" },
        { label: "Open to", value: "Coffee chats" },
        { label: "Replies", value: "Most weeks" },
      ],
      description:
        "Building a payments platform for small business. Happy to swap notes with other founders on hiring, fundraising and staying sane while scaling.",
      highlights: ["Angel investor", "Ex-fintech operator", "Mentors 2/mo"],
      posted: "Open to connect",
    },
    {
      id: "net-mentor",
      module: "networking",
      title: "David Okoro",
      subtitle: "Product Mentor · ex-Atlassian",
      location: "Subiaco",
      rating: 5.0,
      reviewCount: 61,
      category: "Mentors",
      tags: ["Product", "Careers", "0→1"],
      meta: [
        { label: "Focus", value: "Product & career" },
        { label: "Format", value: "45 min" },
        { label: "Slots", value: "3/month" },
      ],
      description:
        "Twenty years shipping software. I mentor early PMs and career-switchers — resume, portfolio, interviews and finding your footing in a new role.",
      highlights: ["Free for students", "Mock interviews", "Warm intros"],
      posted: "3 slots this month",
    },
    {
      id: "net-investor",
      module: "networking",
      title: "Aria Ventures",
      subtitle: "Early-stage Investor",
      location: "West Perth",
      rating: 4.7,
      reviewCount: 22,
      category: "Investors",
      tags: ["Pre-seed", "Local", "SaaS"],
      meta: [
        { label: "Cheque", value: "$50k–$300k" },
        { label: "Stage", value: "Pre-seed" },
        { label: "Sectors", value: "SaaS, climate" },
      ],
      description:
        "We back WA founders at the earliest stage. Send a short intro and a link — we read everything and reply within two weeks.",
      highlights: ["Founder-friendly", "Fast decisions", "Hands-on"],
      posted: "Open for intros",
    },
    {
      id: "net-creative",
      module: "networking",
      title: "Jonah Ellis",
      subtitle: "Creative Director · Freelance",
      location: "Leederville",
      rating: 4.8,
      reviewCount: 44,
      category: "Creatives",
      tags: ["Brand", "Collab", "Studios"],
      meta: [
        { label: "Open to", value: "Collabs" },
        { label: "Format", value: "Coffee" },
        { label: "Replies", value: "Fast" },
      ],
      description:
        "Brand and art direction for local studios. Always keen to meet photographers, writers and developers to team up on bigger pitches.",
      highlights: ["Runs a studio night", "Loves a collab", "Portfolio reviews"],
      posted: "Open to connect",
    },
  ],
  recruitment: [
    {
      id: "rec-tech",
      module: "recruitment",
      title: "Technology Talent Pool",
      subtitle: "Echelon Recruitment",
      location: "Perth & Remote",
      category: "Technology",
      tags: ["Software", "Data", "Product"],
      meta: [
        { label: "Members", value: "1,200+" },
        { label: "Employers", value: "80 verified" },
        { label: "Privacy", value: "Hidden by default" },
      ],
      description:
        "For engineers, data and product people open to the right move. Stay private — verified local employers only see you when there's a genuine fit.",
      highlights: ["Stay anonymous", "No recruiter spam", "You approve outreach"],
      posted: "Always open",
    },
    {
      id: "rec-health",
      module: "recruitment",
      title: "Healthcare Talent Pool",
      subtitle: "Echelon Recruitment",
      location: "WA-wide",
      category: "Healthcare",
      tags: ["Nursing", "Allied health", "Aged care"],
      meta: [
        { label: "Members", value: "900+" },
        { label: "Employers", value: "40 verified" },
        { label: "Privacy", value: "Hidden by default" },
      ],
      description:
        "Nurses, allied health and care workers looking for their next role or extra shifts. Set your availability and let facilities come to you.",
      highlights: ["Shift or permanent", "AHPRA verified", "Regional options"],
      posted: "Always open",
    },
    {
      id: "rec-trades",
      module: "recruitment",
      title: "Trades & Construction Pool",
      subtitle: "Echelon Recruitment",
      location: "Perth metro",
      category: "Trades",
      tags: ["Ticketed", "Sites", "Immediate"],
      meta: [
        { label: "Members", value: "1,500+" },
        { label: "Employers", value: "60 verified" },
        { label: "Privacy", value: "Hidden by default" },
      ],
      description:
        "Carpenters, electricians, plumbers and labourers. List your tickets and availability — builders reach out for both short jobs and long-term work.",
      highlights: ["Verify tickets once", "Metro & FIFO", "Rate transparency"],
      posted: "Always open",
    },
    {
      id: "rec-hospitality",
      module: "recruitment",
      title: "Hospitality Talent Pool",
      subtitle: "Echelon Recruitment",
      location: "Perth & Fremantle",
      category: "Hospitality",
      tags: ["Venues", "Flexible", "Events"],
      meta: [
        { label: "Members", value: "800+" },
        { label: "Employers", value: "70 verified" },
        { label: "Privacy", value: "Hidden by default" },
      ],
      description:
        "Chefs, baristas, floor and event staff. Great for flexible shifts across the city's best venues — pick up work that fits your week.",
      highlights: ["Pick your shifts", "Rated venues", "Fast payment"],
      posted: "Always open",
    },
  ],
};

export function getListings(module: string): Listing[] {
  return listings[module] ?? [];
}

export function getListing(module: string, id: string): Listing | undefined {
  return getListings(module).find((listing) => listing.id === id);
}

/** A small cross-module sample for the /explore hub. */
export function getFeaturedListings(): Listing[] {
  return [
    listings.jobs?.[0],
    listings.events?.[1],
    listings.stays?.[0],
    listings.freelancing?.[0],
    listings.tasks?.[0],
    listings.networking?.[1],
  ].filter((listing): listing is Listing => Boolean(listing));
}
