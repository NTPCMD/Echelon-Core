export const seedCategories = [
  { name: "Hair Salon", slug: "hair-salon" },
  { name: "Photography", slug: "photography" },
  { name: "Massage", slug: "massage" },
  { name: "Events", slug: "events" },
];

export const seedBusinesses = [
  {
    ownerEmail: "owner@lumahair.example",
    categorySlug: "hair-salon",
    name: "Luma Hair Studio",
    slug: "luma-hair-studio",
    description: "Premium colour, cuts and bridal styling in a calm Northbridge studio.",
    logoUrl: "/logos/luma.svg",
    coverUrl: "/covers/luma.jpg",
    gallery: ["/covers/luma.jpg"],
    suburb: "Northbridge",
    city: "Perth",
    openingHours: { mon: ["09:00", "17:00"], tue: ["09:00", "17:00"], wed: ["10:00", "19:00"] },
    services: [
      { name: "Signature Cut & Finish", priceCents: 8900, durationMinutes: 60, description: "Consultation, wash, precision cut and finish.", availability: ["09:00", "11:30", "14:00", "16:30"] },
      { name: "Gloss Colour Refresh", priceCents: 14500, durationMinutes: 90, description: "Tone, gloss and blow dry for luminous colour maintenance.", availability: ["10:00", "13:30", "15:30"] },
    ],
    staff: [{ name: "Mia Chen", title: "Creative Director", avatarUrl: "/staff/mia.jpg", availability: ["09:00", "11:30", "14:00"] }],
  },
  {
    ownerEmail: "owner@northstar.example",
    categorySlug: "photography",
    name: "North Star Weddings",
    slug: "north-star-weddings",
    description: "Editorial wedding and event photography for modern celebrations.",
    logoUrl: "/logos/northstar.svg",
    coverUrl: "/covers/wedding.jpg",
    gallery: ["/covers/wedding.jpg"],
    suburb: "Fremantle",
    city: "Perth",
    openingHours: { mon: ["10:00", "18:00"], thu: ["10:00", "18:00"], sat: ["09:00", "15:00"] },
    services: [{ name: "Wedding Discovery Call", priceCents: 0, durationMinutes: 30, description: "Plan coverage, style and package options.", availability: ["10:00", "13:00", "17:00"] }],
    staff: [{ name: "Ari Morgan", title: "Lead Photographer", avatarUrl: "/staff/ari.jpg", availability: ["10:00", "13:00", "17:00"] }],
  },
];
