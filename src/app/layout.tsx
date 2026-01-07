import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "智能錢包控制台",
  description: "基於 Alchemy Account Kit 構建",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 關鍵修正：加上 lang="en" 和 className="notranslate"
    // 這會強制瀏覽器與 Google 翻譯不要去動你的網頁內容
    <html lang="en" className="notranslate">
      <head>
        {/* 額外保險：加入 meta 標籤禁止 Google 翻譯 */}
        <meta name="google" content="notranslate" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}