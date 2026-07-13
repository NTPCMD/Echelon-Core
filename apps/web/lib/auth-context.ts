import "server-only";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  buildAuthContinuationUrl,
  buildAuthEntryUrl,
  safeInternalPath,
} from "./auth-intent";
import { clerkEnabled } from "./clerk";

export interface ConsumerAuthContext {
  userId: string;
}

export interface BusinessAuthContext extends ConsumerAuthContext {
  organizationId: string;
  organizationRole: string | null;
  organizationSlug: string | null;
}

export async function requireConsumerContext(returnTo: string): Promise<ConsumerAuthContext> {
  if (!clerkEnabled) return { userId: "dev-consumer" };

  const { userId } = await auth();
  if (!userId) redirect(buildAuthEntryUrl("login", "consumer", safeInternalPath(returnTo, "/dashboard")));
  return { userId };
}

export async function requireBusinessContext(returnTo: string): Promise<BusinessAuthContext> {
  if (!clerkEnabled) {
    return {
      userId: "dev-business",
      organizationId: "dev-ws-labs",
      organizationRole: "org:admin",
      organizationSlug: "ws-labs",
    };
  }

  const { userId, orgId, orgRole, orgSlug } = await auth();
  const destination = safeInternalPath(returnTo, "/business-dashboard");

  if (!userId) redirect(buildAuthEntryUrl("login", "business", destination));
  if (!orgId) redirect(buildAuthContinuationUrl("business", destination));

  return {
    userId,
    organizationId: orgId,
    organizationRole: orgRole ?? null,
    organizationSlug: orgSlug ?? null,
  };
}
