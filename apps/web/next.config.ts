import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  transpilePackages: ["@echelon/types", "@echelon/shared", "@echelon/ai"],
  env: {
    NEXT_PUBLIC_CLERK_JS_URL:
      process.env.NEXT_PUBLIC_CLERK_JS_URL ?? "/identity/client.js",
    NEXT_PUBLIC_CLERK_UI_URL:
      process.env.NEXT_PUBLIC_CLERK_UI_URL ?? "/identity/v2/ui.js",
  },
};
export default nextConfig;
