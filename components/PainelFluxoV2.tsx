"use client";

import type { ReactNode } from "react";
import { Play, X } from "lucide-react";
import { useMemo, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import {
  InteligenciaSidebar,
  type InteligenciaNavId,
} from "@/components/inteligencia-fundiaria/InteligenciaSidebar";
import { AmapaMunicipiosMap } from "@/components/maps/AmapaMunicipiosMap";
import { MetricCard } from "@/components/ui/MetricCard";
import { PanelCard } from "@/components/ui/PanelCard";
import { Pill } from "@/components/ui/Pill";
import { SecTitle } from "@/components/ui/SecTitle";
import { SubDesc } from "@/components/ui/SubDesc";
import { Tabela, Td } from "@/components/ui/Tabela";
import { S } from "@/lib/colors";

type Etapa = {
  num: number;
  setor: string;
  label: string;
  em: number;
  parado30: number;
  entMes: number;
  saiMes: number;
  serv: number;
  capMes: number;
  tempoD: number;
  bloqueio?: string;
  gargalo?: boolean;
  assinatura?: boolean;
  externo?: boolean;
};

type SimCfg = {
  extras: number;
  servidores: number;
  automacao: boolean;
  prioridade: boolean;
};

const TITULOS_MES_ATUAL = 47;
const HIST_MESES = ["Nov", "Dez", "Jan", "Fev", "Mar", "Abr", "Mai"];
const HIST_TITULOS = [31, 28, 19, 34, 41, 52, 47];
const HIST_ENTRADAS = [142, 98, 201, 178, 165, 193, 187];

const COR_SETOR: Record<string, string> = {
  CCAT: S.blue,
  CCGEO: S.orange,
  CRF: S.red,
  DIPRE: "#805AD5",
  DIROT: S.green,
  Jurídico: "#0D9488",
  Governo: S.gray500,
};

const ETAPAS_FLUXO: Etapa[] = [
  {
    num: 1,
    setor: "CCAT",
    label: "Análise documental e emissão de custas",
    em: 135,
    parado30: 38,
    entMes: 187,
    saiMes: 162,
    serv: 8,
    capMes: 175,
    tempoD: 6,
  },
  {
    num: 2,
    setor: "CCGEO",
    label: "Análise preliminar",
    em: 240,
    parado30: 186,
    entMes: 162,
    saiMes: 118,
    serv: 4,
    capMes: 130,
    tempoD: 7,
    bloqueio: "Falta homologação",
  },
  {
    num: 3,
    setor: "CRF",
    label: "Viagem a campo e emissão de custas/VTN",
    em: 488,
    parado30: 488,
    entMes: 118,
    saiMes: 61,
    serv: 9,
    capMes: 112,
    tempoD: 21,
    gargalo: true,
  },
  {
    num: 4,
    setor: "CCGEO",
    label: "Georreferenciamento e verificação de sobreposições",
    em: 186,
    parado30: 120,
    entMes: 61,
    saiMes: 55,
    serv: 5,
    capMes: 110,
    tempoD: 14,
  },
  {
    num: 5,
    setor: "CCGEO",
    label: "Emissão da portaria",
    em: 80,
    parado30: 30,
    entMes: 55,
    saiMes: 52,
    serv: 3,
    capMes: 65,
    tempoD: 5,
  },
  {
    num: 6,
    setor: "DIPRE",
    label: "Parecer final e covalidação",
    em: 97,
    parado30: 28,
    entMes: 52,
    saiMes: 48,
    serv: 4,
    capMes: 100,
    tempoD: 9,
  },
  {
    num: 7,
    setor: "DIROT",
    label: "Análise das peças técnicas e parecer final",
    em: 55,
    parado30: 14,
    entMes: 48,
    saiMes: 46,
    serv: 4,
    capMes: 95,
    tempoD: 8,
  },
  {
    num: 8,
    setor: "Jurídico",
    label: "Análise do parecer final",
    em: 24,
    parado30: 24,
    entMes: 46,
    saiMes: 44,
    serv: 2,
    capMes: 48,
    tempoD: 8,
  },
  {
    num: 9,
    setor: "DIPRE",
    label: "Aguardando assinatura da portaria e publicação",
    em: 112,
    parado30: 58,
    entMes: 44,
    saiMes: 38,
    serv: 2,
    capMes: 45,
    tempoD: 17,
    assinatura: true,
  },
  {
    num: 10,
    setor: "CCAT",
    label: "Emissão do título",
    em: 44,
    parado30: 3,
    entMes: 38,
    saiMes: 36,
    serv: 3,
    capMes: 80,
    tempoD: 3,
  },
  {
    num: 11,
    setor: "DIROT",
    label: "Análise do título",
    em: 31,
    parado30: 8,
    entMes: 36,
    saiMes: 35,
    serv: 3,
    capMes: 75,
    tempoD: 5,
  },
  {
    num: 12,
    setor: "DIPRE",
    label: "Aguardando assinatura do título",
    em: 88,
    parado30: 44,
    entMes: 35,
    saiMes: 28,
    serv: 2,
    capMes: 40,
    tempoD: 19,
    assinatura: true,
  },
  {
    num: 13,
    setor: "Governo",
    label: "Aguardando assinatura do Governo",
    em: 47,
    parado30: 47,
    entMes: 28,
    saiMes: 18,
    serv: 0,
    capMes: 20,
    tempoD: 28,
    externo: true,
  },
  {
    num: 14,
    setor: "CCAT",
    label: "Entrega do título",
    em: 22,
    parado30: 0,
    entMes: 18,
    saiMes: 18,
    serv: 2,
    capMes: 50,
    tempoD: 2,
  },
  {
    num: 15,
    setor: "CCGEO",
    label: "Atualização de base",
    em: 18,
    parado30: 0,
    entMes: 18,
    saiMes: 18,
    serv: 2,
    capMes: 45,
    tempoD: 3,
  },
  {
    num: 16,
    setor: "CCAT",
    label: "Arquivamento",
    em: 14,
    parado30: 0,
    entMes: 18,
    saiMes: 47,
    serv: 2,
    capMes: 60,
    tempoD: 1,
  },
];

const MUNICIPIOS = [
  { nome: "Macapá", total: 842, parados: 71 },
  { nome: "Santana", total: 312, parados: 6 },
  { nome: "Porto Grande", total: 289, parados: 71 },
  { nome: "Mazagão", total: 203, parados: 36 },
  { nome: "Laranjal do Jarí", total: 198, parados: 1 },
  { nome: "Tartarugalzinho", total: 176, parados: 49 },
  { nome: "Oiapoque", total: 167, parados: 25 },
  { nome: "Ferreira Gomes", total: 134, parados: 37 },
  { nome: "Amapá", total: 112, parados: 36 },
  { nome: "Calçoene", total: 87, parados: 18 },
  { nome: "Cutias", total: 76, parados: 19 },
  { nome: "Pedra Branca", total: 98, parados: 11 },
  { nome: "Serra do Navio", total: 34, parados: 5 },
  { nome: "Pracuúba", total: 52, parados: 15 },
  { nome: "Itaubal", total: 29, parados: 7 },
  { nome: "Vitória do Jarí", total: 24, parados: 0 },
];

const pct = (a: number, b: number) => (b > 0 ? Math.round((a / b) * 100) : 0);
const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));
const fmtR = (n: number) => `R$${(n / 1000).toFixed(0)}k`;
const corSetor = (setor: string) => COR_SETOR[setor] ?? S.gray500;

const statusEtapa = (e: Etapa) => {
  if (e.externo) return { label: "Externo", cor: S.gray500 };
  if (e.assinatura) return { label: "Assinatura", cor: "#805AD5" };
  if (e.bloqueio) return { label: "Bloqueado", cor: S.orange };
  if (e.gargalo) return { label: "Gargalo", cor: S.red };
  return e.saiMes - e.entMes < 0
    ? { label: "Atenção", cor: S.orange }
    : { label: "Estável", cor: S.green };
};

function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  const w = Math.max(2, (value / Math.max(1, max)) * 100);
  return (
    <div className="h-1.5 rounded bg-sicarf-gray-200">
      <div className="h-full rounded" style={{ width: `${w}%`, background: color }} />
    </div>
  );
}

function Tag({ children, color }: { children: ReactNode; color: string }) {
  return (
    <span
      className="inline-flex rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
      style={{ color, borderColor: `${color}70`, background: `${color}10` }}
    >
      {children}
    </span>
  );
}

function BarChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex h-[74px] items-end gap-1.5">
      {data.map((v, i) => (
        <div key={i} className="flex min-w-0 flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-t"
            style={{ height: Math.max(6, (v / max) * 58), background: i === data.length - 1 ? color : `${color}75` }}
          />
          <span className="text-[9px] text-sicarf-gray-500">{HIST_MESES[i]}</span>
        </div>
      ))}
    </div>
  );
}

function EtapaCard({
  etapa,
  ativa,
  onClick,
}: {
  etapa: Etapa;
  ativa: boolean;
  onClick: () => void;
}) {
  const st = statusEtapa(etapa);
  const saldo = etapa.saiMes - etapa.entMes;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[200px] shrink-0 rounded-md border p-3 text-left ${
        ativa
          ? "border-sicarf-green bg-sicarf-green-light"
          : "border-sicarf-gray-200 bg-white hover:bg-sicarf-gray-50"
      }`}
    >
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-semibold" style={{ color: corSetor(etapa.setor) }}>
          #{etapa.num} {etapa.setor}
        </span>
        <Tag color={st.cor}>{st.label}</Tag>
      </div>
      <p className="mb-2 line-clamp-2 text-[11px] text-sicarf-gray-500">{etapa.label}</p>
      <div className="space-y-1 text-xs text-sicarf-gray-600">
        <div>Fila: {etapa.em}</div>
        <div>Parados +30d: {etapa.parado30}</div>
        <div className={saldo >= 0 ? "text-sicarf-green" : "text-sicarf-red"}>
          Saldo: {saldo >= 0 ? "+" : ""}
          {saldo}
        </div>
      </div>
    </button>
  );
}

function SimuladorMulti({ onClose }: { onClose: () => void }) {
  const [cfg, setCfg] = useState<SimCfg[]>(
    ETAPAS_FLUXO.map(() => ({ extras: 0, servidores: 0, automacao: false, prioridade: false })),
  );
  const hasChange = cfg.some(
    (c) => c.extras || c.servidores || c.automacao || c.prioridade,
  );

  const updateCfg = (i: number, p: Partial<SimCfg>) => {
    setCfg((prev) => prev.map((c, idx) => (idx === i ? { ...c, ...p } : c)));
  };

  const aplicarCenarioZerarCrf = () => {
    const base = ETAPAS_FLUXO.map<SimCfg>(() => ({
      extras: 0,
      servidores: 0,
      automacao: false,
      prioridade: false,
    }));
    // #3 CRF: força capacidade para zerar backlog da etapa.
    base[2] = { extras: 500, servidores: 12, automacao: true, prioridade: true };
    // Ajustes de absorção nas próximas etapas-chave.
    base[3] = { extras: 120, servidores: 6, automacao: true, prioridade: true };
    base[4] = { extras: 100, servidores: 4, automacao: true, prioridade: true };
    base[8] = { extras: 260, servidores: 5, automacao: true, prioridade: true };
    base[11] = { extras: 260, servidores: 5, automacao: true, prioridade: true };
    base[12] = { extras: 220, servidores: 0, automacao: false, prioridade: true };
    setCfg(base);
  };

  const result = useMemo(() => {
    let prevSaidaSim: number | null = null;
    const etapas = ETAPAS_FLUXO.map((e, i) => {
      const c = cfg[i];
      const entradaBase = i === 0 ? e.entMes : ETAPAS_FLUXO[i - 1].saiMes;
      const entradaSim = i === 0 ? e.entMes : prevSaidaSim ?? e.entMes;
      const backlogInicial = e.em;

      const capAjustadaBase = e.capMes;
      const fatorAuto = c.automacao && !e.externo ? 1.2 : 1;
      const fatorServ = !e.externo ? 1 + c.servidores * 0.09 : 1;
      const fatorPrio = c.prioridade ? 1.08 : 1;
      const capAjustada = Math.round(capAjustadaBase * fatorAuto * fatorServ * fatorPrio);

      const demandaBase = backlogInicial + entradaBase;
      const demandaSim = backlogInicial + entradaSim;
      const saidaBase = Math.min(demandaBase, e.saiMes);
      const saidaSim = Math.min(demandaSim, capAjustada + c.extras);

      const filaBase = Math.max(0, demandaBase - saidaBase);
      const filaSim = Math.max(0, demandaSim - saidaSim);
      const pctCap = Math.round((saidaSim / Math.max(1, capAjustada)) * 100);
      const deltaSaida = saidaSim - saidaBase;
      const deltaFila = filaSim - filaBase;

      const gargalo =
        e.externo ||
        e.bloqueio ||
        e.gargalo ||
        pctCap > 100 ||
        deltaFila > 20;
      const alerta = e.externo
        ? "Dependência externa"
        : e.bloqueio
          ? "Bloqueio técnico"
          : e.gargalo
            ? "Gargalo estrutural"
            : pctCap > 110
              ? "Sobrecarga crítica"
              : pctCap > 95
                ? "Capacidade no limite"
                : deltaFila > 20
                  ? "Fila em crescimento"
                  : "Sem alerta";

      prevSaidaSim = saidaSim;

      return {
        ...e,
        entradaBase,
        entradaSim,
        capAjustada,
        saidaBase,
        novaSaida: saidaSim,
        filaBase,
        novaFila: filaSim,
        pctCap,
        deltaSaida,
        deltaFila,
        gargalo,
        alerta,
      };
    });

    const tit = etapas[15]?.novaSaida ?? TITULOS_MES_ATUAL;
    const filaTotalBase = etapas.reduce((acc, e) => acc + e.filaBase, 0);
    const filaTotalSim = etapas.reduce((acc, e) => acc + e.novaFila, 0);
    const paradosEstimadosSim = Math.round(
      etapas.reduce((acc, e) => acc + (e.em > 0 ? (e.parado30 / e.em) * e.novaFila : 0), 0),
    );
    const produtividadeAtual = TITULOS_MES_ATUAL / 34;
    const produtividadeSim = tit / 34;
    const projecaoPotencial = etapas[2]?.novaSaida ?? tit;
    const previsaoOperacional = Math.min(
      projecaoPotencial,
      etapas[8]?.novaSaida ?? projecaoPotencial,
      etapas[11]?.novaSaida ?? projecaoPotencial,
      etapas[12]?.novaSaida ?? projecaoPotencial,
      300,
    );

    return {
      etapas,
      tit,
      ganho: tit - TITULOS_MES_ATUAL,
      area: tit * 68,
      rec: tit * 2700,
      projecaoPotencial,
      previsaoOperacional,
      filaCrfFinal: etapas[2]?.novaFila ?? 0,
      filaTotalBase,
      filaTotalSim,
      paradosEstimadosSim,
      produtividadeAtual,
      produtividadeSim,
    };
  }, [cfg]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/45 p-4">
      <div className="w-full max-w-6xl rounded-md border border-sicarf-gray-200 bg-white p-5 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-sicarf-gray-800">Simulador Multi-Setor</p>
            <p className="text-sm text-sicarf-gray-500">
              Intervenções em múltiplas etapas com propagação completa.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-sicarf-gray-200 p-1.5 text-sicarf-gray-500 hover:bg-sicarf-gray-50"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[440px,1fr]">
          <div className="space-y-2 rounded-md border border-sicarf-gray-200 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-sicarf-gray-500">
              Configuração por etapa
            </p>
            <div className="max-h-[520px] space-y-2 overflow-auto pr-1">
              {ETAPAS_FLUXO.map((e, i) => (
                <div key={e.num} className="rounded border border-sicarf-gray-200 p-2.5">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-xs font-semibold" style={{ color: corSetor(e.setor) }}>
                      #{e.num} {e.setor}
                    </div>
                    <Tag color={statusEtapa(e).cor}>{statusEtapa(e).label}</Tag>
                  </div>
                  <p className="mb-2 text-[11px] text-sicarf-gray-500">{e.label}</p>
                  <label className="mb-1 block text-[11px] text-sicarf-gray-600">
                    Processos extras/mês (+{cfg[i].extras})
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={500}
                    value={cfg[i].extras}
                    disabled={!!e.externo}
                    onChange={(ev) => updateCfg(i, { extras: +ev.target.value })}
                    className="mb-2 w-full accent-sicarf-green disabled:opacity-40"
                  />
                  <label className="mb-1 block text-[11px] text-sicarf-gray-600">
                    Servidores adicionais (+{cfg[i].servidores})
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={12}
                    value={cfg[i].servidores}
                    disabled={!!e.externo}
                    onChange={(ev) => updateCfg(i, { servidores: +ev.target.value })}
                    className="mb-2 w-full accent-sicarf-blue disabled:opacity-40"
                  />
                  <div className="flex gap-4 text-[11px] text-sicarf-gray-600">
                    <label className="inline-flex items-center gap-1.5">
                      <input
                        type="checkbox"
                        checked={cfg[i].automacao}
                        disabled={!!e.externo}
                        onChange={(ev) => updateCfg(i, { automacao: ev.target.checked })}
                      />
                      Automação
                    </label>
                    <label className="inline-flex items-center gap-1.5">
                      <input
                        type="checkbox"
                        checked={cfg[i].prioridade}
                        disabled={!!e.externo}
                        onChange={(ev) => updateCfg(i, { prioridade: ev.target.checked })}
                      />
                      Prioridade
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={aplicarCenarioZerarCrf}
                className="rounded border border-sicarf-blue px-3 py-2 text-sm font-semibold text-sicarf-blue hover:bg-sicarf-blue-light"
              >
                Zerar CRF (488)
              </button>
              <button
                type="button"
                onClick={() =>
                  setCfg(
                    ETAPAS_FLUXO.map(() => ({
                      extras: 0,
                      servidores: 0,
                      automacao: false,
                      prioridade: false,
                    })),
                  )
                }
                disabled={!hasChange}
                className="rounded border border-sicarf-gray-300 px-3 py-2 text-sm font-semibold text-sicarf-gray-600 hover:bg-sicarf-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Limpar cenário
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <>
                <PanelCard>
                  <SecTitle>Impacto em 30 dias</SecTitle>
                  <div className="grid grid-cols-2 gap-2">
                    <MetricCard value={TITULOS_MES_ATUAL} label="Títulos atuais" className="bg-sicarf-gray-50" />
                    <MetricCard value={result.tit} label="Títulos simulados" className="bg-sicarf-gray-50" valueClassName="text-sicarf-green" />
                    <MetricCard value={result.projecaoPotencial} label="Projeção potencial" className="bg-sicarf-gray-50" valueClassName="text-sicarf-blue" />
                    <MetricCard value={result.previsaoOperacional} label="Previsão operacional" className="bg-sicarf-gray-50" valueClassName="text-sicarf-orange" />
                    <MetricCard value={result.filaCrfFinal} label="Fila CRF após simulação" className="bg-sicarf-gray-50" valueClassName={result.filaCrfFinal === 0 ? "text-sicarf-green" : "text-sicarf-red"} />
                    <MetricCard value={`${fmt(result.area)}ha`} label="Área regularizada" className="bg-sicarf-gray-50" />
                    <MetricCard value={fmtR(result.rec)} label="Receita DAEs" className="bg-sicarf-gray-50" />
                    <MetricCard value={`${result.ganho >= 0 ? "+" : ""}${result.ganho}`} label="Ganho de títulos/mês" className="bg-sicarf-gray-50 col-span-2" valueClassName={result.ganho >= 0 ? "text-sicarf-green" : "text-sicarf-red"} />
                    <MetricCard value={result.filaTotalBase.toLocaleString("pt-BR")} label="Fila total base" className="bg-sicarf-gray-50" />
                    <MetricCard value={result.filaTotalSim.toLocaleString("pt-BR")} label="Fila total simulada" className="bg-sicarf-gray-50" valueClassName={result.filaTotalSim <= result.filaTotalBase ? "text-sicarf-green" : "text-sicarf-red"} />
                    <MetricCard value={result.paradosEstimadosSim.toLocaleString("pt-BR")} label="Parados +30d estimados" className="bg-sicarf-gray-50" />
                    <MetricCard value={`${result.produtividadeAtual.toFixed(1)} → ${result.produtividadeSim.toFixed(1)}`} label="Produtividade/servidor" className="bg-sicarf-gray-50" valueClassName="text-sicarf-blue" />
                  </div>
                </PanelCard>
                <PanelCard>
                  <SecTitle>Propagação no fluxo (16 etapas)</SecTitle>
                  <Tabela
                    colunas={["#", "Setor", "Fila base", "Fila sim.", "Δ fila", "Saída base", "Saída sim.", "Δ saída", "Cap. %", "Alerta de gargalo"]}
                    linhas={result.etapas}
                    renderLinha={(e) => (
                      <>
                        <Td>{e.num}</Td>
                        <Td className="font-semibold">{e.setor}</Td>
                        <Td>{e.filaBase}</Td>
                        <Td className={e.novaFila <= e.filaBase ? "text-sicarf-green" : "text-sicarf-red"}>{e.novaFila}</Td>
                        <Td className={e.deltaFila <= 0 ? "text-sicarf-green" : "text-sicarf-red"}>
                          {e.deltaFila > 0 ? "+" : ""}
                          {e.deltaFila}
                        </Td>
                        <Td>{e.saidaBase}</Td>
                        <Td className={e.novaSaida >= e.saidaBase ? "text-sicarf-green" : "text-sicarf-red"}>{e.novaSaida}</Td>
                        <Td className={e.deltaSaida >= 0 ? "text-sicarf-green" : "text-sicarf-red"}>
                          {e.deltaSaida > 0 ? "+" : ""}
                          {e.deltaSaida}
                        </Td>
                        <Td>
                          <div className="flex items-center gap-2">
                            <MiniBar value={e.pctCap} max={120} color={e.pctCap > 105 ? S.red : e.pctCap > 85 ? S.orange : S.green} />
                            <span>{e.pctCap}%</span>
                          </div>
                        </Td>
                        <Td>
                          <Pill
                            label={e.alerta}
                            bg={e.gargalo ? S.red : S.green}
                          />
                        </Td>
                      </>
                    )}
                  />
                </PanelCard>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PainelFluxoV2() {
  const [navLateral, setNavLateral] = useState<InteligenciaNavId>("simulador");
  const [showSim, setShowSim] = useState(false);
  const [etapaSel, setEtapaSel] = useState<Etapa | null>(null);
  const totalFila = ETAPAS_FLUXO.reduce((a, e) => a + e.em, 0);
  const totalParado = ETAPAS_FLUXO.reduce((a, e) => a + e.parado30, 0);
  const municipiosSorted = [...MUNICIPIOS].sort((a, b) => b.total - a.total);
  const maxM = municipiosSorted[0]?.total ?? 1;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-sicarf-gray-100 font-sans">
      <AppHeader />
      <div className="flex min-h-0 flex-1">
        <InteligenciaSidebar ativo={navLateral} onNavigate={setNavLateral} />
        <main className="min-w-0 flex-1 overflow-auto bg-white p-6">
          <div className="mx-auto max-w-[1400px] space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-sicarf-gray-500">
                  SICARF · Amapá Terras · Maio 2025
                </p>
                <h1 className="text-2xl font-bold text-sicarf-gray-800">Painel de Inteligência de Fluxo</h1>
                <p className="text-sm text-sicarf-gray-500">Fluxo completo · 16 etapas · 3.213 processos no sistema</p>
              </div>
              <button
                type="button"
                onClick={() => setShowSim(true)}
                className="inline-flex items-center gap-2 rounded-md bg-sicarf-green px-4 py-2 text-sm font-bold text-white hover:bg-sicarf-green-dark"
              >
                <Play className="size-4" /> Simulador Multi-Setor
              </button>
            </div>

            <PanelCard>
              <SecTitle>Visão Geral — Mês Atual</SecTitle>
              <SubDesc>Todos os dados consolidados do HTML aplicado no design system.</SubDesc>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
                <MetricCard value={ETAPAS_FLUXO[0].entMes} label="Novos cadastros" />
                <MetricCard value={totalFila.toLocaleString("pt-BR")} label="Em fila (16 etapas)" />
                <MetricCard value={totalParado.toLocaleString("pt-BR")} label={`${pct(totalParado, totalFila)}% parados +30d`} valueClassName="text-sicarf-red" />
                <MetricCard value={TITULOS_MES_ATUAL} label="Títulos emitidos" valueClassName="text-sicarf-green" />
                <MetricCard value={(TITULOS_MES_ATUAL / 34).toFixed(1)} label="Proc./servidor (34)" valueClassName="text-sicarf-blue" />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div className="rounded border border-sicarf-gray-200 p-3">
                  <p className="mb-2 text-xs font-semibold text-sicarf-gray-600">Títulos emitidos por mês</p>
                  <BarChart data={HIST_TITULOS} color={S.green} />
                </div>
                <div className="rounded border border-sicarf-gray-200 p-3">
                  <p className="mb-2 text-xs font-semibold text-sicarf-gray-600">Novos cadastros por mês</p>
                  <BarChart data={HIST_ENTRADAS} color={S.blue} />
                </div>
              </div>
            </PanelCard>

            <PanelCard>
              <SecTitle>Fluxo Completo — 16 Etapas (interativo)</SecTitle>
              <SubDesc>Clique em qualquer etapa para ver detalhes e interagir com o fluxo.</SubDesc>
              <div className="space-y-2">
                {[ETAPAS_FLUXO.slice(0, 8), ETAPAS_FLUXO.slice(8, 16)].map((linha, idx) => (
                  <div key={idx} className="flex gap-2 overflow-auto pb-1">
                    {linha.map((e) => (
                      <EtapaCard
                        key={e.num}
                        etapa={e}
                        ativa={etapaSel?.num === e.num}
                        onClick={() => setEtapaSel((atual) => (atual?.num === e.num ? null : e))}
                      />
                    ))}
                  </div>
                ))}
              </div>
              {etapaSel ? (
                <div className="mt-3 rounded-md border border-sicarf-gray-200 bg-sicarf-gray-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-sicarf-gray-800">#{etapaSel.num} {etapaSel.setor}</p>
                      <p className="text-xs text-sicarf-gray-500">{etapaSel.label}</p>
                    </div>
                    <Tag color={statusEtapa(etapaSel).cor}>{statusEtapa(etapaSel).label}</Tag>
                  </div>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    <MetricCard value={etapaSel.em} label="Em fila" className="bg-white" />
                    <MetricCard value={etapaSel.parado30} label="Parados +30d" className="bg-white" valueClassName="text-sicarf-red" />
                    <MetricCard value={`${etapaSel.entMes}/${etapaSel.saiMes}`} label="Entrada/Saída mês" className="bg-white" />
                    <MetricCard value={`${etapaSel.tempoD}d`} label="Tempo médio" className="bg-white" />
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowSim(true)}
                      className="rounded border border-sicarf-green px-3 py-1.5 text-xs font-semibold text-sicarf-green hover:bg-sicarf-green-light"
                    >
                      Simular esta etapa
                    </button>
                  </div>
                </div>
              ) : null}
            </PanelCard>

            <PanelCard>
              <SecTitle>Distribuição Geográfica por Município</SecTitle>
              <SubDesc>Mapa real do Amapá com dados por município.</SubDesc>
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-[420px,1fr]">
                <AmapaMunicipiosMap dados={MUNICIPIOS} />
                <div className="rounded-md border border-sicarf-gray-200 p-3">
                  <p className="mb-3 text-sm font-semibold text-sicarf-gray-700">Ranking de municípios</p>
                  <div className="space-y-1.5">
                    {municipiosSorted.map((m, i) => (
                      <div key={m.nome} className="flex items-center gap-2 text-xs">
                        <span className="w-4 text-right text-sicarf-gray-400">{i + 1}</span>
                        <span className="w-36 text-sicarf-gray-700">{m.nome}</span>
                        <div className="h-2 flex-1 rounded bg-sicarf-gray-200">
                          <div className="h-full rounded bg-sicarf-blue" style={{ width: `${(m.total / maxM) * 100}%` }} />
                        </div>
                        <span className="w-8 text-right font-semibold text-sicarf-gray-800">{m.total}</span>
                        <span className={`w-20 text-right ${pct(m.parados, m.total) > 30 ? "text-sicarf-red" : "text-sicarf-gray-500"}`}>
                          {m.parados} ({pct(m.parados, m.total)}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PanelCard>

            <PanelCard>
              <SecTitle>Resumo por Etapa — 16 fases</SecTitle>
              <Tabela
                colunas={["#", "Setor", "Etapa", "Em fila", "Parados +30d", "% Parado", "Entradas/mês", "Saídas/mês", "Saldo", "Proc./servidor", "Tempo", "Status"]}
                linhas={ETAPAS_FLUXO}
                renderLinha={(e) => {
                  const p = pct(e.parado30, e.em);
                  const saldo = e.saiMes - e.entMes;
                  const st = statusEtapa(e);
                  return (
                    <>
                      <Td>{e.num}</Td>
                      <Td className="font-semibold">{e.setor}</Td>
                      <Td className="max-w-[230px] truncate text-sicarf-gray-600">{e.label}</Td>
                      <Td>{e.em}</Td>
                      <Td className="text-sicarf-red">{e.parado30}</Td>
                      <Td>{p}%</Td>
                      <Td className="text-sicarf-blue">{e.entMes}</Td>
                      <Td className={saldo < 0 ? "text-sicarf-red" : "text-sicarf-green"}>{e.saiMes}</Td>
                      <Td className={saldo < 0 ? "text-sicarf-red" : "text-sicarf-green"}>
                        {saldo >= 0 ? "+" : ""}
                        {saldo}
                      </Td>
                      <Td>{e.serv > 0 ? (e.saiMes / e.serv).toFixed(1) : "—"}</Td>
                      <Td>{e.tempoD}d</Td>
                      <Td><Pill label={st.label} bg={st.cor} /></Td>
                    </>
                  );
                }}
              />
            </PanelCard>
          </div>
        </main>
      </div>
      {showSim ? <SimuladorMulti onClose={() => setShowSim(false)} /> : null}
    </div>
  );
}
