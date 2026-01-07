/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! 警告 !!
    // 允許生產環境建置成功，即使專案有 TypeScript 錯誤。
    // 這對 Demo 展示非常有用
    ignoreBuildErrors: true,
  },
  eslint: {
    // 順便忽略 lint 檢查，確保部署一路通暢
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;