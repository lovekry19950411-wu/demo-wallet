import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 移除過時的 eslint 物件，保持最簡潔
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;