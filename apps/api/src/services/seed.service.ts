import { PrismaClient, UserRole } from "@prisma/client";
import { seedBusinesses, seedCategories } from "@echelon/database";

export async function ensureSeedData(prisma: PrismaClient) {
  const count = await prisma.business.count();
  if (count > 0) return;
  for (const category of seedCategories) await prisma.category.upsert({ where: { slug: category.slug }, update: category, create: category });
  for (const businessSeed of seedBusinesses) {
    const owner = await prisma.user.upsert({ where: { email: businessSeed.ownerEmail }, update: {}, create: { email: businessSeed.ownerEmail, name: `${businessSeed.name} Owner`, role: UserRole.BUSINESS, passwordHash: "seeded-dev-password" } });
    const category = await prisma.category.findUniqueOrThrow({ where: { slug: businessSeed.categorySlug } });
    const business = await prisma.business.create({ data: { ownerId: owner.id, categoryId: category.id, name: businessSeed.name, slug: businessSeed.slug, description: businessSeed.description, logoUrl: businessSeed.logoUrl, coverUrl: businessSeed.coverUrl, gallery: businessSeed.gallery, suburb: businessSeed.suburb, city: businessSeed.city, openingHours: businessSeed.openingHours } });
    await prisma.service.createMany({ data: businessSeed.services.map((service) => ({ ...service, availability: service.availability, businessId: business.id })) });
    await prisma.staff.createMany({ data: businessSeed.staff.map((staff) => ({ ...staff, availability: staff.availability, businessId: business.id })) });
  }
}
