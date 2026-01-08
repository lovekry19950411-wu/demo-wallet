"use client";
import { useUser } from "@account-kit/react";
import { useState, useEffect } from "react";

export default function Home() {
  const user = useUser();
  const [nftCount, setNftCount] = useState<number | null>(null);

  useEffect(() => {
    const checkNFTs = async () => {
      if (!user?.address) return;
      // 官方連線路徑：使用你的 API Key (YJpoUY0iLIOhrUFbjXF10)
      const url = `https://eth-sepolia.g.alchemy.com/nft/v3/YJpoUY0iLIOhrUFbjXF10/getNFTsForOwner?owner=${user.address}&withMetadata=false`;
      
      try {
        const res = await fetch(url);
        const data = await res.json();
        setNftCount(data.totalCount || 0);
      } catch (e) {
        console.error("NFT 掃描失敗", e);
      }
    };
    checkNFTs();
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-24">
      {user ? (
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-black italic tracking-tighter text-green-400">
            DASHBOARD
          </h1>
          <p className="text-xs font-mono text-gray-500">ADDR: {user.address}</p>

          <div className="p-10 border border-white/10 rounded-3xl bg-white/5">
            <p className="text-gray-400 mb-2">NFT 門戶驗證</p>
            <p className="text-7xl font-black text-yellow-400">
              {nftCount !== null ? nftCount : "..."}
            </p>
          </div>

          {nftCount === 0 && (
            <div className="space-y-4">
              <p className="text-red-500 text-sm">此地址尚未持有任何 NFT</p>
              <button className="px-8 py-3 bg-blue-600 rounded-full font-bold hover:bg-blue-500">
                立即領取測試 NFT (Gasless)
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-xl italic animate-pulse">WAITING FOR AUTH...</p>
      )}
    </main>
  );
}