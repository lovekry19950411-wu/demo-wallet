"use client";
// 注意：這裡將 AccountGui 改為最新的官方名稱 AuthCard
import { 
  AlchemyAccountsUIConfig, 
  createConfig, 
  AlchemyAccountProvider,
  AuthCard // 👈 這裡做了更換，確保相容性
} from "@account-kit/react";
import { sepolia, alchemy } from "@account-kit/infra";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "filled",
  auth: {
    sections: [
      [{"type":"email"}],
      [{"type":"passkey"},{"type":"social","authProviderId":"google","mode":"popup"}],
      [{"type":"external_wallets","walletConnect":{"projectId":"30e7ffaff99063e68cc9870c105d905b"}}]
    ],
    addPasskeyOnSignup: false,
  },
};

const config = createConfig({
  transport: alchemy({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "" }),
  chain: sepolia,
  ssr: true,
  enablePopupOauth: true,
}, uiConfig);

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider config={config} queryClient={queryClient}>
        <main style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#0f172a" }}>
          <div style={{ width: "100%", maxWidth: "450px" }}>
            {/* 使用 AuthCard 顯示漂亮封面 */}
            <AuthCard /> 
          </div>
        </main>
      </AlchemyAccountProvider>
    </QueryClientProvider>
  );
}