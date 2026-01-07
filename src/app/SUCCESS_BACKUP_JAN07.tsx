"use client";
import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("準備就緒");
  const [walletAddress, setWalletAddress] = useState("");

  const handleCreate = () => {
    setStatus("正在連接 Alchemy Bundler (OP Sepolia)...");
    // 這裡模擬創建過程，下一階段我們會補上真正的 SDK 調用
    setTimeout(() => {
      setWalletAddress("0x4165...5664 (預期生成的錢包)");
      setStatus("錢包部署成功！");
    }, 2000);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-4 text-blue-400">ERC-4337 智能錢包展示</h1>
      <p className="mb-8 text-slate-400">專為募資演示開發：Optimism Sepolia 測試網</p>
      
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-md">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">系統狀態</p>
          <p className="text-green-400 font-mono">{status}</p>
        </div>

        {walletAddress && (
          <div className="mb-6 p-4 bg-slate-900 rounded-lg border border-blue-500/30">
            <p className="text-xs text-slate-500 mb-1">生成的錢包地址</p>
            <p className="text-sm font-mono text-blue-300 break-all">{walletAddress}</p>
          </div>
        )}
        
        <button 
          onClick={handleCreate}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95"
        >
          一鍵部署智能錢包
        </button>
        
        <div className="mt-8 pt-6 border-t border-slate-700">
          <p className="text-[10px] text-slate-600 font-mono">NODE_RPC: ...XF10</p>
          <p className="text-[10px] text-slate-600 font-mono">GAS_MANAGER: ACTIVE</p>
        </div>
      </div>
    </div>
  );
}