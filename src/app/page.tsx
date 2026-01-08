"use client";
import { useUser, useSmartAccountClient, useSendUserOperation } from "@account-kit/react";

export default function Home() {
  const user = useUser();
  const { client } = useSmartAccountClient({ type: "LightAccount" });
  
  const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
    client,
    onSuccess: ({ hash }) => alert("✅ 交易成功！Hash: " + hash),
    onError: (e) => alert("錯誤: " + e.message)
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-white">
      {user ? (
        <div className="text-center p-12 border border-white/10 rounded-[40px] bg-white/5 backdrop-blur-3xl shadow-2xl">
          <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Smart Account App
          </h1>
          <p className="text-[10px] font-mono text-gray-500 mb-10">{user.address}</p>

          <button
            onClick={() => sendUserOperation({ uo: { target: "0x1758d607223594191370258759325996614457e5", data: "0x1249c58b" } })}
            disabled={isSendingUserOperation}
            className="px-12 py-6 bg-blue-600 rounded-2xl font-bold text-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20"
          >
            {isSendingUserOperation ? "處理中..." : "立即免 Gas Mint NFT"}
          </button>
        </div>
      ) : (
        <div className="text-center p-10 border border-dashed border-white/20 rounded-3xl">
          <p className="text-xl font-bold italic animate-pulse">請重新整理並登入</p>
        </div>
      )}
    </main>
  );
}