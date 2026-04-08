"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-sicarf-green hover:bg-sicarf-gray-200/60"
      aria-label="Sair"
    >
      <LogOut className="size-3.5" strokeWidth={2} />
    </button>
  );
}
