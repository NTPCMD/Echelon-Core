import { PrismaClient, UserRole } from "@prisma/client";
import { seedBusinesses, seedCategories } from "../src/seed-data.js";

const prisma = new PrismaClient();

async function main() {
  for (const category of seedCategories) {
    await prisma.category.upsert({ where: { slug: category.slug }, update: category, create: category });
  }

  for (const businessSeed of seedBusinesses) {
    const owner = await prisma.user.upsert({
      where: { email: businessSeed.ownerEmail },
      update: { name: `${businessSeed.name} Owner`, role: UserRole.BUSINESS },
      create: { email: businessSeed.ownerEmail, name: `${businessSeed.name} Owner`, role: UserRole.BUSINESS, passwordHash: "seeded-dev-password" },
    });
    const category = await prisma.category.findUniqueOrThrow({ where: { slug: businessSeed.categorySlug } });
    const business = await prisma.business.upsert({
      where: { slug: businessSeed.slug },
      update: { name: businessSeed.name, description: businessSeed.description, logoUrl: businessSeed.logoUrl, coverUrl: businessSeed.coverUrl, gallery: businessSeed.gallery, suburb: businessSeed.suburb, city: businessSeed.city, openingHours: businessSeed.openingHours, categoryId: category.id, ownerId: owner.id },
      create: { ownerId: owner.id, categoryId: category.id, name: businessSeed.name, slug: businessSeed.slug, description: businessSeed.description, logoUrl: businessSeed.logoUrl, coverUrl: businessSeed.coverUrl, gallery: businessSeed.gallery, suburb: businessSeed.suburb, city: businessSeed.city, openingHours: businessSeed.openingHours },
    });
    for (const service of businessSeed.services) {
      await prisma.service.upsert({
        where: { businessId_name: { businessId: business.id, name: service.name } },
        update: { ...service, availability: service.availability },
        create: { ...service, availability: service.availability, businessId: business.id },
      });
    }
    for (const staff of businessSeed.staff) {
      await prisma.staff.upsert({
        where: { businessId_name: { businessId: business.id, name: staff.name } },
        update: { ...staff, availability: staff.availability },
        create: { ...staff, availability: staff.availability, businessId: business.id },
      });
    }
  }
}

main().finally(async () => prisma.$disconnect());
