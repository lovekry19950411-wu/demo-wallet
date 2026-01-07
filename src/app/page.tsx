"use client";

import { useState } from "react";
// 從 aa-accounts 引入正確的工具
import { createLightAccountClient, createNaniAccount } from "@alchemy/aa-accounts";
import { http } from "viem";
import { optimismSepolia } from "viem/chains"; 

export default function Home() {
  const [status, setStatus] = useState("準備就緒");
  const [walletAddress, setWalletAddress] = useState("");

  const handleCreate = async () => {
    const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
    const privateKey = process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY as `0x${string}`;

    if (!apiKey || !privateKey) {
      setStatus("連線異常：缺少設定值");
      return;
    }

    setStatus("正在部署智能錢包...");

    try {
      // 修正：必須加上 await，因為 createNaniAccount 是非同步的
      const signer = await createNaniAccount({ 
        privateKey 
      });

      // 建立客戶端，傳入已經 await 過的 signer
      const client = await createLightAccountClient({
        chain: optimismSepolia as any,
        transport: http(`https://opt-sepolia.g.alchemy.com/v2/${apiKey}`) as any,
        account: signer, // 這裡現在拿到的就是 NaniAccount 而不是 Promise 了
      });

      setWalletAddress(client.account.address);
      setStatus("部署成功！");

    } catch (error) {
      console.error("部署過程報錯:", error);
      setStatus("連線失敗，請檢查 API Key 或網路");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#0f172a] text-white">
      <div className="bg-[#1e293b] p-8 rounded-2xl border border-gray-700 w-full max-w-md text-center shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-blue-400">智能錢包控制台</h1>
        <p className="mb-6 text-sm text-gray-400">系統狀態：<span className="text-white font-mono">{status}</span></p>
        
        {!walletAddress ? (
          <button 
            onClick={handleCreate} 
            className="w-full py-4 bg-[#363FF9] rounded-xl font-bold hover:bg-blue-600 transition-all active:scale-95"
          >
            一鍵部署錢包
          </button>
        ) : (
          <div className="p-4 bg-black/40 rounded-lg border border-blue-500/50">
            <p className="text-[10px] text-blue-300 mb-2 uppercase italic">Smart Account Address</p>
            <code className="text-xs break-all text-green-400 font-mono">{walletAddress}</code>
          </div>
        )}
      </div>
    </main>
  );
}