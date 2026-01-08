import { createConfig } from "@account-kit/react"; // 注意路徑改了
import { sepolia, alchemy } from "@account-kit/infra"; // 新增 infra 包

export const config = createConfig({
  // 官方新規定：必須用 transport 包裹 apiKey
  transport: alchemy({ apiKey: "你的API_KEY" }), 
  chain: sepolia,
  ssr: true,
});