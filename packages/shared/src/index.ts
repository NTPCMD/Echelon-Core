import { z } from "zod";
export const roles = ["CUSTOMER", "BUSINESS", "ADMIN"] as const;
export const modules = ["services", "jobs", "recruitment", "freelancing", "networking", "events", "hotels", "restaurants", "marketplace", "rewards", "ai-concierge"] as const;
export const registerSchema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(10), role: z.enum(roles).default("CUSTOMER") });
export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });
export const aiSearchSchema = z.object({ message: z.string().min(2).max(500), location: z.string().optional() });
export const bookingSchema = z.object({ businessId: z.string().cuid(), serviceId: z.string().cuid(), staffId: z.string().cuid(), startsAt: z.string().datetime(), customerNotes: z.string().max(1000).optional() });
export const reviewSchema = z.object({ businessId: z.string().cuid(), rating: z.number().int().min(1).max(5), comment: z.string().min(10).max(2000) });
