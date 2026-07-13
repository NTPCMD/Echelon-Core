import { serveClerkAsset } from "../../../lib/clerk-assets";

export const runtime = "nodejs";

export function GET() {
  return serveClerkAsset("/npm/@clerk/clerk-js@6/dist/clerk.browser.js");
}
