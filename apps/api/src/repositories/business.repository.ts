import { prisma } from "@echelon/database";
import type { Business } from "@echelon/types";

interface BusinessRecord {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  coverUrl: string;
  suburb: string;
  city: string;
  category: { name: string };
  services: Array<{ id: string; businessId: string; name: string; priceCents: number; durationMinutes: number; description: string; availability: unknown }>;
  reviews: Array<{ rating: number }>;
}

const toBusiness = (record: BusinessRecord): Business => {
  const rating = record.reviews.length > 0 ? record.reviews.reduce((sum, review) => sum + review.rating, 0) / record.reviews.length : 4.9;
  return { id: record.id, name: record.name, slug: record.slug, category: record.category.name, logoUrl: record.logoUrl, coverUrl: record.coverUrl, rating, reviewCount: record.reviews.length, suburb: record.suburb, city: record.city, tags: [record.category.name, record.suburb], services: record.services.map((service) => ({ ...service, availability: Array.isArray(service.availability) ? service.availability.map(String) : [] })) };
};

export class BusinessRepository {
  async list(query?: { category?: string; location?: string; q?: string }) {
    const records = await prisma.business.findMany({
      where: {
        AND: [
          query?.category ? { category: { name: { contains: query.category, mode: "insensitive" } } } : {},
          query?.location ? { OR: [{ city: { contains: query.location, mode: "insensitive" } }, { suburb: { contains: query.location, mode: "insensitive" } }] } : {},
          query?.q ? { OR: [{ name: { contains: query.q, mode: "insensitive" } }, { description: { contains: query.q, mode: "insensitive" } }] } : {},
        ],
      },
      include: { category: true, services: true, reviews: true },
      orderBy: { createdAt: "asc" },
    });
    return records.map(toBusiness);
  }

  async findById(id: string) {
    const record = await prisma.business.findFirst({ where: { OR: [{ id }, { slug: id }] }, include: { category: true, services: true, reviews: true } });
    return record ? toBusiness(record) : null;
  }
}
