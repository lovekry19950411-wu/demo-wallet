"use client";

import "@account-kit/react/styles.css";
import { 
  AlchemyAccountsUIConfig, 
  createConfig, 
  AlchemyAccountProvider,
  AuthCard,
  useUser // 👈 增加這個：用來獲取用戶登入狀態
} from "@account-kit/react";
import { sepolia, alchemy } from "@account-kit/infra";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "filled",
  auth: {
    sections: [[{"type":"email"}], [{"type":"passkey"},{"type":"social","authProviderId":"google","mode":"popup"}]],
    addPasskeyOnSignup: false,
  },
};

const config = createConfig({
  transport: alchemy({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "" }),
  chain: sepolia,
  ssr: true, // 確保 SSR 開啟以配合 Next.js
  // 💡 增加這行設定，確保 Session 能夠在跳轉後被讀取
  sessionConfig: {
    expirationTimeMs: 1000 * 60 * 60 * 24, // 24小時有效
  }
}, uiConfig);

// 核心元件：判斷顯示內容
function WalletDashboard() {
  const user = useUser(); // 👈 檢查 SDK 裡是否有登入的用戶資訊

  return (
    <main style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh", 
      backgroundColor: "#0f172a", 
      color: "white" 
    }}>
      {user ? (
        // 🥳 登入成功：顯示你的錢包地址
        <div style={{ textAlign: "center", padding: "20px", border: "1px solid #334155", borderRadius: "12px" }}>
          <h1 style={{ color: "#10b981" }}>✅ 登入成功！</h1>
          <p style={{ marginTop: "10px" }}>您的智能錢包地址：</p>
          <code style={{ background: "#000", padding: "10px", borderRadius: "6px", display: "block", marginTop: "10px" }}>
            {user.address}
          </code>
        </div>
      ) : (
        // 🔒 未登入：顯示登入卡片
        <div style={{ width: "100%", maxWidth: "450px" }}>
          <AuthCard />
        </div>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider config={config} queryClient={queryClient}>
        <WalletDashboard />
      </AlchemyAccountProvider>
    </QueryClientProvider>
  );
}