import { config, queryClient } from "../config/accountKit"; 
import { AlchemyAccountProvider } from "@account-kit/react";
import { QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";

// 根據官方文檔，主題設定應該放在這裡或 config 裡，我們現在用最基礎的確保它能跑起來
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryClientProvider client={queryClient}>
          {/* 這裡的 config 必須來自你的 accountKit.ts */}
          <AlchemyAccountProvider config={config} queryClient={queryClient}>
            {children}
          </AlchemyAccountProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}