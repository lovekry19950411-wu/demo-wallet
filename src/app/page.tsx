"use client";

import "@account-kit/react/styles.css";
import { 
  AlchemyAccountsUIConfig, 
  createConfig, 
  AlchemyAccountProvider,
  AuthCard,
  useUser
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
  ssr: true,
}, uiConfig);

function WalletDashboard() {
  const user = useUser();

  return (
    <main style={{ 
      display: "flex", 
      flexDirection: "column",
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh", 
      backgroundColor: "#0f172a", 
      color: "white",
      padding: "20px" 
    }}>
      {user ? (
        <div style={{ textAlign: "center", background: "#1e293b", padding: "40px", borderRadius: "12px", border: "1px solid #334155" }}>
          <h1 style={{ marginBottom: "10px" }}>🎉 登入成功！</h1>
          <p style={{ color: "#94a3b8", marginBottom: "20px" }}>你的智能錢包地址：</p>
          <code style={{ background: "#000", padding: "10px", borderRadius: "6px", display: "block", wordBreak: "break-all" }}>
            {user.address}
          </code>
        </div>
      ) : (
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