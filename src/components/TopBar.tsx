"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TopBar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      router.push("/login");
    } catch (e) {
      // エラー処理
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-between bg-gray-100 border-b px-6 py-2 mb-8">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg mr-4">PG Scheduler</span>
        <Link href="/" className="px-3 py-1 rounded hover:bg-gray-200">DashBoard</Link>
        <button className="px-3 py-1 rounded hover:bg-gray-200">DatePick</button>
        <button className="px-3 py-1 rounded hover:bg-gray-200">Groups</button>
      </div>
      {user && (
        <button
          onClick={handleLogout}
          className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
          disabled={loading}
        >
          ログアウト
        </button>
      )}
    </div>
  );
} 