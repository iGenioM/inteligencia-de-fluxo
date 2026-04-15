"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DADOS_PA,
  type DadosDemonstracao,
  type EstadoAtivoGlobal,
  obterDados,
} from "@/lib/inteligencia-fundiaria-dados";
import { readRegiaoDemoCookie } from "@/lib/inteligencia-regiao-login";

interface InteligenciaDemoContextValue {
  estadoAtivo: EstadoAtivoGlobal;
  /** Último dígito do CPF do login não é 0 nem 1 */
  invalido: boolean;
  dados: DadosDemonstracao;
  /** Previsão informada em Parâmetros; exibida na projeção estimada e na etapa Projeção */
  previsaoTitulos: number;
  setPrevisaoTitulos: (v: number) => void;
}

const Ctx = createContext<InteligenciaDemoContextValue | null>(null);

function estadoInicialDoCookie(): EstadoAtivoGlobal {
  const c = readRegiaoDemoCookie();
  if (c === "MA" || c === "INVALID") return c;
  if (c === "PA") return "PA";
  return "PA";
}

export function InteligenciaDemoProvider({ children }: { children: ReactNode }) {
  const [estadoAtivo, setEstadoAtivo] = useState<EstadoAtivoGlobal>("PA");
  const [previsaoTitulos, setPrevisaoTitulos] = useState(
    DADOS_PA.previsaoTitulosPadrao,
  );

  useLayoutEffect(() => {
    setEstadoAtivo(estadoInicialDoCookie());
  }, []);

  const invalido = estadoAtivo === "INVALID";

  const dados = useMemo(() => {
    if (invalido) return DADOS_PA;
    if (estadoAtivo === "MA") return obterDados("MA");
    return DADOS_PA;
  }, [estadoAtivo, invalido]);

  useLayoutEffect(() => {
    setPrevisaoTitulos(dados.previsaoTitulosPadrao);
  }, [dados.previsaoTitulosPadrao, dados.estadoId]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    window.estadoAtivo = estadoAtivo;
  }, [estadoAtivo]);

  const value = useMemo(
    () => ({
      estadoAtivo,
      invalido,
      dados,
      previsaoTitulos,
      setPrevisaoTitulos,
    }),
    [estadoAtivo, invalido, dados, previsaoTitulos],
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
