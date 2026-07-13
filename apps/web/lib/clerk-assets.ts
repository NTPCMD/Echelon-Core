const clerkAssetOrigin = "https://frontend-api.clerk.dev";

export async function serveClerkAsset(path: string) {
  const response = await fetch(`${clerkAssetOrigin}${path}`, {
    next: { revalidate: 86_400 },
  });

  if (!response.ok || !response.body) {
    return new Response("Authentication asset unavailable", {
      status: 502,
      headers: { "cache-control": "no-store" },
    });
  }

  return new Response(response.body, {
    headers: {
      "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "content-type": response.headers.get("content-type") ?? "application/javascript; charset=utf-8",
      "cross-origin-resource-policy": "same-origin",
    },
  });
}
