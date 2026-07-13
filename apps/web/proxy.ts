import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse, type NextFetchEvent } from "next/server";

const clerkProxyPath = "/identity-api";
const clerkProxyOrigin = "https://echelonapp.net";
const clerkEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
);
const withHttps = (host: string | undefined) =>
  host ? (host.startsWith("http://") || host.startsWith("https://") ? host : `https://${host}`) : undefined;
const authorizedParties = Array.from(
  new Set(
    [
      withHttps(process.env.NEXT_PUBLIC_APP_URL),
      withHttps(process.env.VERCEL_PROJECT_PRODUCTION_URL),
      withHttps(process.env.VERCEL_URL),
      process.env.NODE_ENV === "development" ? "http://localhost:3000" : undefined,
    ].filter((value): value is string => Boolean(value)),
  ),
);

const clerkHandler = clerkEnabled
  ? clerkMiddleware({
      frontendApiProxy: {
        enabled: true,
        path: clerkProxyPath,
      },
      proxyUrl: `${clerkProxyOrigin}${clerkProxyPath}`,
      ...(authorizedParties.length ? { authorizedParties } : {}),
    })
  : undefined;

const handler = (request: NextRequest, event: NextFetchEvent) => {
  if (!clerkHandler) {
    return NextResponse.next();
  }

  if (
    request.nextUrl.pathname === clerkProxyPath ||
    request.nextUrl.pathname.startsWith(`${clerkProxyPath}/`)
  ) {
    const headers = new Headers(request.headers);
    headers.set("x-forwarded-host", new URL(clerkProxyOrigin).host);
    headers.set("x-forwarded-proto", "https");

    return clerkHandler(new NextRequest(request, { headers }), event);
  }

  return clerkHandler(request, event);
};

export default handler;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Clerk frontend API proxy path
    "/identity-api/:path*",
  ],
};
