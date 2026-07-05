import type { SearchIntent } from "@echelon/types";

const CATEGORY_MAP: Record<string, string> = {
  hair: "Hair Salon",
  haircut: "Hair Salon",
  barber: "Hair Salon",
  colour: "Hair Salon",
  color: "Hair Salon",
  salon: "Hair Salon",
  photo: "Photography",
  photographer: "Photography",
  wedding: "Photography",
  portrait: "Photography",
  massage: "Massage",
  remedial: "Massage",
  relaxation: "Massage",
  physio: "Massage",
  dj: "DJ & Entertainment",
  music: "DJ & Entertainment",
  entertainment: "DJ & Entertainment",
  band: "DJ & Entertainment",
  beauty: "Beauty",
  facial: "Beauty",
  nails: "Beauty",
  nail: "Beauty",
  brow: "Beauty",
  wax: "Beauty",
  skin: "Beauty",
  fitness: "Personal Training",
  trainer: "Personal Training",
  gym: "Personal Training",
  workout: "Personal Training",
  training: "Personal Training",
  pt: "Personal Training",
};

export interface ParsedIntent {
  intent: SearchIntent;
  category?: string;
  service?: string;
  location?: string;
  date?: string;
  time?: string;
  confidence: number;
  message: string;
}

export function parseIntent(message: string, location?: string): ParsedIntent {
  const lower = message.toLowerCase();

  const matchedKey = Object.keys(CATEGORY_MAP).find((key) => lower.includes(key));
  const category = matchedKey ? CATEGORY_MAP[matchedKey] : undefined;

  const hasBookingSignal =
    lower.includes("book") ||
    lower.includes("appointment") ||
    lower.includes("schedule") ||
    lower.includes("tomorrow") ||
    lower.includes("tonight") ||
    lower.includes("today") ||
    lower.includes("available");

  const intent: SearchIntent = hasBookingSignal && category
    ? "book_service"
    : category
    ? "discover_business"
    : lower.includes("compare") || lower.includes("best")
    ? "compare_options"
    : "unknown";

  const timeMatch = lower.match(/(\d{1,2}(?::\d{2})?\s?(?:am|pm))/i);
  const dateMatch = lower.match(/\b(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i);

  const detectedLocation =
    location ??
    (lower.includes("perth") ? "Perth" : undefined);

  const confidence = category ? (hasBookingSignal ? 0.88 : 0.74) : 0.38;

  const msg = category
    ? `Found ${category.toLowerCase()} options${detectedLocation ? ` in ${detectedLocation}` : ""} matching your request.`
    : "Here are some local services that might help.";

  const result: ParsedIntent = {
    intent,
    confidence,
    message: msg,
  };
  if (category !== undefined) result.category = category;
  if (category !== undefined) result.service = category;
  if (detectedLocation !== undefined) result.location = detectedLocation;
  if (dateMatch?.[1] !== undefined) result.date = dateMatch[1];
  if (timeMatch?.[1] !== undefined) result.time = timeMatch[1];
  return result;
}
