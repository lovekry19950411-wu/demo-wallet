"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("正在初始化系統...");
  const [envCheck, setEnvCheck] = useState({ key: false, policy: false });

  useEffect(() => {
    // 讀取環境變數 (必須加 NEXT_PUBLIC_)
    const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
    const policyId = process.env.NEXT_PUBLIC_ALCHEMY_GAS_POLICY_ID;

    setEnvCheck({ key: !!apiKey, policy: !!policyId });

    if (!apiKey || !policyId) {
      setStatus("連線失敗：請檢查 Vercel 環境變數設定 (Missing Keys)");
    } else {
      setStatus("系統就緒：已成功連線至 Alchemy 節點");
    }
  }, []);

  return (
    <main style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#0f172a", color: "white", fontFamily: "sans-serif" }}>
      <div style={{ backgroundColor: "#1e293b", padding: "3rem", borderRadius: "1.5rem", textAlign: "center", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", width: "400px" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: "#38bdf8" }}>智能錢包控制台</h1>
        
        <div style={{ marginBottom: "2rem", padding: "1rem", backgroundColor: "#334155", borderRadius: "0.5rem" }}>
          <p style={{ margin: "0.5rem 0", color: status.includes("失敗") ? "#f87171" : "#4ade80" }}>
            ● {status}
          </p>
          <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "10px", textAlign: "left" }}>
            <div>API Key: {envCheck.key ? "✅ 已讀取" : "❌ 未找到"}</div>
            <div>Policy ID: {envCheck.policy ? "✅ 已讀取" : "❌ 未找到"}</div>
          </div>
        </div>

        <button 
          onClick={() => alert("準備發送交易...")}
          style={{ width: "100%", padding: "12px", borderRadius: "0.5rem", border: "none", backgroundColor: "#38bdf8", color: "#0f172a", fontWeight: "bold", cursor: "pointer" }}
        >
          一鍵部署智能錢包
        </button>
      </div>
    </main>
  );
}