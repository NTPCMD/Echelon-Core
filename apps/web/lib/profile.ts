/**
 * Consumer profile foundation. One identity carries a job-seeker profile (for
 * the Jobs module) and a freelancer profile (for Freelancing) — this is what
 * gets shared when you apply for a role or pitch for a brief. Mock/UI only.
 */

export interface Experience {
  role: string;
  company: string;
  period: string;
  summary: string;
}

export interface Education {
  qualification: string;
  institution: string;
  period: string;
}

export interface PortfolioItem {
  title: string;
  category: string;
  link: string;
}

export interface JobSeekerProfile {
  headline: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  availability: string;
  desiredRoles: string[];
  locationPref: string;
  openToWork: boolean;
  resumeFileName: string;
}

export interface FreelancerProfile {
  headline: string;
  bio: string;
  skills: string[];
  hourlyRate: string;
  availability: string;
  services: string[];
  portfolio: PortfolioItem[];
  acceptingWork: boolean;
}

export interface ConsumerProfile {
  name: string;
  email: string;
  location: string;
  initials: string;
  memberSince: string;
  jobSeeker: JobSeekerProfile;
  freelancer: FreelancerProfile;
}

export const consumerProfile: ConsumerProfile = {
  name: "Amarjit Wadhawan",
  email: "you@email.com",
  location: "Perth, WA",
  initials: "AW",
  memberSince: "Member since 2026",
  jobSeeker: {
    headline: "Growth & Product Marketer",
    summary:
      "Marketer with 6 years across SaaS and local commerce. I build acquisition funnels, own lifecycle and lead small, fast teams. Looking for a growth role with real ownership.",
    skills: ["Growth", "Lifecycle", "Paid acquisition", "SEO", "Analytics", "Team leadership"],
    experience: [
      {
        role: "Senior Growth Marketer",
        company: "Northlight SaaS",
        period: "2023 — Present",
        summary: "Own paid + lifecycle for a B2B product. Grew trial-to-paid 34% in a year.",
      },
      {
        role: "Marketing Lead",
        company: "Perth Local Co.",
        period: "2020 — 2023",
        summary: "Built the marketing function from scratch for a local services marketplace.",
      },
    ],
    education: [
      { qualification: "BComm, Marketing", institution: "University of Western Australia", period: "2016 — 2019" },
    ],
    availability: "Available in 4 weeks",
    desiredRoles: ["Growth Lead", "Head of Marketing", "Senior PMM"],
    locationPref: "Perth · Hybrid or remote",
    openToWork: true,
    resumeFileName: "amarjit-wadhawan-cv.pdf",
  },
  freelancer: {
    headline: "Freelance Growth Consultant",
    bio: "I help local businesses and startups set up growth engines — paid, lifecycle and analytics — as scoped projects or ongoing retainers.",
    skills: ["Growth strategy", "Paid ads", "Email/CRM", "Landing pages", "GA4"],
    hourlyRate: "$110/hr",
    availability: "2 days/week open",
    services: ["Growth audit", "Funnel build", "Ad management", "Fractional CMO"],
    portfolio: [
      { title: "SaaS launch funnel", category: "Funnel build", link: "#" },
      { title: "Local marketplace GTM", category: "Strategy", link: "#" },
      { title: "Lifecycle email system", category: "CRM", link: "#" },
    ],
    acceptingWork: true,
  },
};

/** Rough completeness signal for the profile nudge on the dashboard. */
export function profileCompleteness(profile: ConsumerProfile = consumerProfile): number {
  const checks = [
    Boolean(profile.jobSeeker.headline),
    profile.jobSeeker.skills.length >= 3,
    profile.jobSeeker.experience.length >= 1,
    Boolean(profile.jobSeeker.resumeFileName),
    Boolean(profile.freelancer.headline),
    profile.freelancer.portfolio.length >= 1,
    Boolean(profile.freelancer.hourlyRate),
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}
