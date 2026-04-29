"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import {
  DADOS_ACOMPANHAMENTO_AMAPA,
  type DadosAcompanhamentoAmapa,
} from "@/lib/mock/inteligencia-fundiaria-dados";

interface InteligenciaDemoContextValue {
  dados: DadosAcompanhamentoAmapa;
}

const Ctx = createContext<InteligenciaDemoContextValue | null>(null);

export function InteligenciaDemoProvider({ children }: { children: ReactNode }) {
  const value = useMemo(
    () => ({ dados: DADOS_ACOMPANHAMENTO_AMAPA }),
    [],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useInteligenciaDemo(): InteligenciaDemoContextValue {
  const v = useContext(Ctx);
  if (!v) {
    throw new Error(
      "useInteligenciaDemo deve ser usado dentro de InteligenciaDemoProvider",
    );
  }
  return v;
}
