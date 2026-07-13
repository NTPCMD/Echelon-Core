import { serveClerkAsset } from "../../../../lib/clerk-assets";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ asset: string[] }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { asset } = await params;

  if (!asset.length || asset.some((segment) => !/^[A-Za-z0-9._-]+$/.test(segment))) {
    return new Response("Authentication asset not found", { status: 404 });
  }

  return serveClerkAsset(`/npm/@clerk/ui@1/dist/${asset.join("/")}`);
}
