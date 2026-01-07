"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Callback() {
  const router = useRouter();
  useEffect(() => {
    // 收到信號後，讓 SDK 在背景處理，我們直接回首頁檢查登入狀態
    router.push("/");
  }, [router]);

  return (
    <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
      正在完成登入程序...
    </div>
  );
}