import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Включает статический экспорт
  // Для GitHub Pages может понадобиться basePath если проект в поддиректории
  basePath: process.env.NODE_ENV === "production" ? "/your-repo-name" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/your-repo-name/" : "",
  trailingSlash: true, // Рекомендуется для GitHub Pages
};

export default nextConfig;
