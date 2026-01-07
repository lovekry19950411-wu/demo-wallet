"use client";

// 導入核心樣式檔，解決介面「長壞掉」的問題
import "@account-kit/react/styles.css";
import { 
  AlchemyAccountsUIConfig, 
  createConfig, 
  AlchemyAccountProvider,
  AuthCard 
} from "@account-kit/react";
import { sepolia, alchemy } from "@account-kit/infra";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 初始化 QueryClient
const queryClient = new QueryClient();

// UI 設定：定義登入選項
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

// 基礎設施設定：串接 Alchemy API
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
        <main style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "100vh", 
          backgroundColor: "#0f172a",
          padding: "20px"
        }}>
          <div style={{ width: "100%", maxWidth: "450px" }}>
            <AuthCard /> 
          </div>
        </main>
      </AlchemyAccountProvider>
    </QueryClientProvider>
  );
}