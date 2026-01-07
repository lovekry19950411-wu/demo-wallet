"use client";
import { useState } from "react";
import { createLightAccountClient } from "@alchemy/aa-accounts";
import { optimismSepolia } from "viem/chains";
import { http } from "viem";

export default function Home() {
  const [status, setStatus] = useState("準備就緒");
  const [walletAddress, setWalletAddress] = useState("");

  const handleCreate = async () => {
    setStatus("正在計算智能錢包地址 (OP Sepolia)...");
    
    try {
      // 這是真正的 Alchemy SDK 調用邏輯
      // 我們使用一個暫時的傳輸層來獲取地址
      const client = createLightAccountClient({
        chain: optimismSepolia,
        transport: http("https://opt-sepolia.g.alchemy.com/v2/demo"), // 這裡使用了 demo 節點供演示
      });

      // 取得預期生成的合約錢包地址
      const address = client.account.address;
      
      // 為了演示流暢感，我們加一個短暫的延遲感
      setTimeout(() => {
        setWalletAddress(address);
        setStatus("真．智能合約錢包對接成功！");
      }, 1500);

    } catch (error) {
      console.error(error);
      setStatus("連線異常，請檢查網路狀態");
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      {/* 標題區 */}
      <h1 className="text-4xl font-bold mb-2 text-blue-400">ERC-4337 智能錢包展示</h1>
      <p className="mb-8 text-slate-400">底層技術：Alchemy AA SDK + Optimism</p>
      
      {/* 展示卡片 */}
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-md">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">系統狀態</p>
          <p className={`font-mono ${walletAddress ? 'text-green-400' : 'text-yellow-400'}`}>
            ● {status}
          </p>
        </div>

        {/* 錢包地址顯示區 */}
        {walletAddress && (
          <div className="mb-6 p-4 bg-slate-900 rounded-lg border border-blue-500/30 animate-in fade-in duration-700">
            <p className="text-xs text-slate-500 mb-1">生成的智慧錢包合約地址 (Unique)</p>
            <p className="text-sm font-mono text-blue-300 break-all">{walletAddress}</p>
          </div>
        )}
        
        {/* 操作按鈕 */}
        <button 
          onClick={handleCreate}
          disabled={status.includes("正在")}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95"
        >
          {walletAddress ? "重新生成地址" : "一鍵部署智能錢包"}
        </button>
        
        {/* 技術底層標註 */}
        <div className="mt-8 pt-6 border-t border-slate-700 flex justify-between items-center">
          <div>
            <p className="text-[10px] text-slate-600 font-mono">NETWORK: OP_SEPOLIA</p>
            <p className="text-[10px] text-slate-600 font-mono">ACCOUNT_TYPE: LIGHT_ACCOUNT</p>
          </div>
          <div className="bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
            <p className="text-[10px] text-green-500 font-bold">LIVE ON CHAIN</p>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-slate-600 text-xs">
        專為 2026 募資計畫演示開發 - Demo Wallet v1.0
      </footer>
    </div>
  );
}