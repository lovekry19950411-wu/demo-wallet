"use client";
import { useUser, useSmartAccountClient, useSendUserOperation } from "@account-kit/react";

export default function Home() {
  const user = useUser();
  const { client } = useSmartAccountClient({ type: "LightAccount" });

  const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
    client,
    onSuccess: ({ hash }) => alert("MINT 成功！交易雜湊: " + hash),
    onError: (error) => alert("失敗: " + error.message),
  });

  const handleMint = () => {
    sendUserOperation({
      uo: {
        target: "0x1758d607223594191370258759325996614457e5", // Sepolia 測試 NFT 合約
        data: "0x1249c58b", // Mint 函數編碼
      },
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-24">
      {user ? (
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-bold text-blue-400">智能錢包已就緒</h1>
          <p className="text-xs font-mono text-gray-500">{user.address}</p>
          <button 
            onClick={handleMint}
            disabled={isSendingUserOperation}
            className="px-10 py-5 bg-blue-600 rounded-2xl font-black text-xl hover:bg-blue-500 transition-all disabled:opacity-50"
          >
            {isSendingUserOperation ? "正在發送交易..." : "立即免 Gas Mint NFT"}
          </button>
        </div>
      ) : (
        <p className="animate-pulse">請在網頁完成登入...</p>
      )}
    </main>
  );
}