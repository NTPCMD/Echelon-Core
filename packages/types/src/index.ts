export type UserRole = "CUSTOMER" | "BUSINESS" | "ADMIN";
export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
export type SearchIntent = "book_service" | "discover_business" | "compare_options" | "unknown";
export interface Service { id: string; businessId: string; name: string; priceCents: number; durationMinutes: number; description: string; availability: string[]; }
export interface Business { id: string; name: string; slug: string; category: string; logoUrl: string; coverUrl: string; rating: number; reviewCount: number; suburb: string; city: string; services: Service[]; tags: string[]; }
export interface AiSearchResult { intent: SearchIntent; category?: string; service?: string; location?: string; date?: string; time?: string; confidence: number; message: string; businessIds: string[]; }
export interface BookingRequest { businessId: string; serviceId: string; staffId: string; startsAt: string; customerNotes?: string; }
