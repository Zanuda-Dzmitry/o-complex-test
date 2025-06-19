import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Обязательно для статического экспорта
  basePath: process.env.GITHUB_PAGES ? "/repo-name" : "", // Замените 'repo-name' на имя вашего репозитория
  assetPrefix: process.env.GITHUB_PAGES ? "/repo-name/" : "",
  trailingSlash: true, // Добавляет `/` к URL (рекомендуется для GitHub Pages)
};

export default nextConfig;
