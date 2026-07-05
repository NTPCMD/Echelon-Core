import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  transpilePackages: ["@echelon/types", "@echelon/shared", "@echelon/ai"],
};
export default nextConfig;
