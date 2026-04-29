import { Bell } from "lucide-react";
import Image from "next/image";
import { LogoutButton } from "@/components/layout/LogoutButton";

/**
 * Barra superior em largura total: marca à esquerda, ações à direita.
 */
export function AppHeader() {
  return (
    <header className="flex w-full shrink-0 items-center justify-between gap-4 border-b border-sicarf-gray-200 bg-sicarf-gray-100 px-6 py-3">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Image src="/Logo.svg" alt="SICARF" width={120} height={120} />
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        <button
          type="button"
          className="hidden rounded-md p-2 text-sicarf-gray-500 hover:bg-sicarf-gray-200/60 sm:inline-flex"
          aria-label="Notificações"
        >
          <Bell className="size-5" strokeWidth={2} />
        </button>
        <div className="h-8 w-px bg-sicarf-gray-200 hidden sm:block" aria-hidden />
        <div className="flex items-center gap-2.5 pl-1 sm:pl-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sicarf-green text-xs font-bold text-white">
            RM
          </div>
          <div className="hidden min-w-0 sm:block">
            <div className="truncate text-[13px] font-semibold text-sicarf-gray-800">
              Ronan Mendes
            </div>
            <div className="text-[11px] text-sicarf-gray-500">
              Painel de Inteligência de Fluxo
            </div>
          </div>
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}
