import { serveClerkAsset } from "../../../../lib/clerk-assets";

export const runtime = "nodejs";

export function GET() {
  return serveClerkAsset("/npm/@clerk/ui@1/dist/ui.browser.js");
}
