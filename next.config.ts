import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/o-complex-test",
  assetPrefix: "/o-complex-test/",
  trailingSlash: true,
  compress: false,
};

export default nextConfig;
