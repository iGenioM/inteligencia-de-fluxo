"use client";

import { useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import {
  InteligenciaSidebar,
  type InteligenciaNavId,
} from "@/components/inteligencia-fundiaria/InteligenciaSidebar";
import { MetricCard } from "@/components/ui/MetricCard";
import { PanelCard } from "@/components/ui/PanelCard";
import { Pill } from "@/components/ui/Pill";
import { SecTitle } from "@/components/ui/SecTitle";
import { SubDesc } from "@/components/ui/SubDesc";
import { S } from "@/lib/colors";

type TabId = "visao" | "setores" | "municipios" | "plano" | "situacoes";

const TABS: { id: TabId; label: string }[] = [
  { id: "visao", label: "Visão Geral" },
  { id: "setores", label: "Setores" },
  { id: "municipios", label: "Municípios" },
  { id: "plano", label: "Plano de Ação" },
  { id: "situacoes", label: "Situações" },
];

const SITUACOES = [
  { nome: "Arquivado", quantidade: 794 },
  { nome: "Aguardando dados das custas", quantidade: 488 },
  { nome: "Suspenso", quantidade: 431 },
  { nome: "Aguardando análise", quantidade: 336 },
  { nome: "Em análise", quantidade: 283 },
  { nome: "Aguardando análise preliminar", quantidade: 240 },
  { nome: "Aguardando arquivamento", quantidade: 110 },
  { nome: "Cadastrando dados das custas", quantidade: 88 },
  { nome: "Finalizado", quantidade: 80 },
  { nome: "Aguardando validação", quantidade: 58 },
  { nome: "Aguardando validação do arquivamento", quantidade: 58 },
  { nome: "Em análise preliminar", quantidade: 50 },
  { nome: "Em arquivamento", quantidade: 43 },
  { nome: "Aguardando Suspensão", quantidade: 31 },
  { nome: "Aguardando validação análise preliminar", quantidade: 30 },
  { nome: "Aguardando cálculo do VTN", quantidade: 24 },
  { nome: "Aguardando entrega", quantidade: 18 },
  { nome: "Aguardando confirmação do interessado", quantidade: 12 },
  { nome: "Aguardando atualização base", quantidade: 11 },
  { nome: "Em Revisão", quantidade: 6 },
  { nome: "Em cálculo do VTN", quantidade: 5 },
  { nome: "Em revisão análise preliminar", quantidade: 4 },
  { nome: "Aguardando emissão do título", quantidade: 3 },
  { nome: "Aguardando portaria", quantidade: 2 },
  { nome: "Em emissão do título", quantidade: 2 },
  { nome: "Em retificação", quantidade: 2 },
  { nome: "Em retificação cadastrando dados das custas", quantidade: 2 },
  { nome: "Em atualização base", quantidade: 1 },
  { nome: "Em emissão de portaria", quantidade: 1 },
].sort((a, b) => b.quantidade - a.quantidade);

const SETORES = [
  { nome: "CRF", volume: 746, critico: 488, solucao: "API SEFAZ + Custa Automática", horas: "80h + 56h", cor: S.red },
  { nome: "CCGEO", volume: 1035, critico: 426, solucao: "Portaria Automática", horas: "32h", cor: S.orange },
  { nome: "CCAT", volume: 210, critico: 135, solucao: "Imagex IA + SEFAZ", horas: "110h", cor: S.blue },
  { nome: "DIROT", volume: 240, critico: 25, solucao: "Despacho Automático", horas: "24h", cor: S.green },
  { nome: "Jurídico", volume: 24, critico: 24, solucao: "Despacho Automático", horas: "24h", cor: S.greenDark },
];

const MUNICIPIOS = [
  { nome: "Porto Grande", quantidade: 71 },
  { nome: "Macapá", quantidade: 71 },
  { nome: "Tartarugalzinho", quantidade: 49 },
  { nome: "Ferreira Gomes", quantidade: 37 },
  { nome: "Amapá", quantidade: 36 },
  { nome: "Mazagão", quantidade: 36 },
  { nome: "Sem município", quantidade: 74 },
  { nome: "Oiapoque", quantidade: 25 },
  { nome: "Pracuúba", quantidade: 15 },
  { nome: "Pedra Branca do Amapari", quantidade: 11 },
  { nome: "Itaubal", quantidade: 7 },
  { nome: "Santana", quantidade: 6 },
  { nome: "Serra do Navio", quantidade: 5 },
  { nome: "Laranjal do Jari", quantidade: 1 },
].sort((a, b) => b.quantidade - a.quantidade);

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const width = `${Math.max(4, (value / Math.max(1, max)) * 100)}%`;
  return (
    <div className="h-2 w-full rounded bg-sicarf-gray-200">
      <div className="h-full rounded" style={{ width, background: color }} />
    </div>
  );
}

function SectorStatus({ value, max }: { value: number; max: number }) {
  const ratio = value / Math.max(1, max);
  if (ratio >= 0.6) return <Pill label="Crítico" bg={S.red} />;
  if (ratio >= 0.35) return <Pill label="Atenção" bg={S.orange} />;
  return <Pill label="Controlado" bg={S.green} />;
}

export function CeleridadeAmapaDashboard() {
  const [navLateral, setNavLateral] = useState<InteligenciaNavId>("simulador");
  const [tabAtiva, setTabAtiva] = useState<TabId>("visao");

  const totalProcessos = 3213;
  const maxSetorCritico = Math.max(...SETORES.map((s) => s.critico));
  const maxMunicipio = Math.max(...MUNICIPIOS.map((m) => m.quantidade));
  const topSituacoes = useMemo(() => SITUACOES.slice(0, 8), []);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-sicarf-gray-100 font-sans">
      <AppHeader />
      <div className="flex min-h-0 flex-1">
        <InteligenciaSidebar ativo={navLateral} onNavigate={setNavLateral} />
        <main className="min-w-0 flex-1 overflow-auto bg-white p-6">
          <div className="mx-auto max-w-[1400px] space-y-5">
            <section className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-sicarf-gray-500">
                  SICARF · Celeridade Amapá · Abril 2025
                </p>
                <h1 className="text-2xl font-bold text-sicarf-gray-800">Dashboard de Celeridade</h1>
                <p className="text-sm text-sicarf-gray-500">
                  {totalProcessos.toLocaleString("pt-BR")} processos no sistema
                </p>
              </div>
              <Pill label="Crítico · CRF 42%" bg={S.red} className="px-4 py-2 text-xs" />
            </section>

            <PanelCard>
              <div className="flex flex-wrap gap-2">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setTabAtiva(tab.id)}
                    className={`rounded border px-3 py-1.5 text-xs font-semibold ${
                      tabAtiva === tab.id
                        ? "border-sicarf-green bg-sicarf-green-light text-sicarf-green"
                        : "border-sicarf-gray-200 text-sicarf-gray-500 hover:bg-sicarf-gray-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </PanelCard>

            {tabAtiva === "visao" ? (
              <>
                <PanelCard>
                  <SecTitle>KPIs Críticos</SecTitle>
                  <SubDesc>Resumo dos principais gargalos e esforço estimado.</SubDesc>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
                    <MetricCard value="681" label="Processos Parados (CRF) · 42%" valueClassName="text-sicarf-red" />
                    <MetricCard value="488" label="Aguardando Custas (CRF)" valueClassName="text-sicarf-red" />
                    <MetricCard value="426" label="CCGEO Parado" valueClassName="text-orange-600" />
                    <MetricCard value="3.213" label="Total Geral" valueClassName="text-sicarf-gray-800" />
                    <MetricCard value="270h" label="Esforço Estimado · 33 dias" valueClassName="text-sicarf-blue" />
                  </div>
                </PanelCard>

                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  <PanelCard>
                    <SecTitle>Funil de Gargalos por Setor</SecTitle>
                    <SubDesc>Volume parado por coordenadoria.</SubDesc>
                    <div className="space-y-3">
                      {SETORES.map((setor) => (
                        <div key={setor.nome}>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="font-semibold text-sicarf-gray-700">{setor.nome}</span>
                            <span className="font-bold" style={{ color: setor.cor }}>
                              {setor.critico}
                            </span>
                          </div>
                          <ProgressBar value={setor.critico} max={maxSetorCritico} color={setor.cor} />
                        </div>
                      ))}
                    </div>
                  </PanelCard>

                  <PanelCard>
                    <SecTitle>Alertas Prioritários</SecTitle>
                    <SubDesc>Ações imediatas necessárias.</SubDesc>
                    <div className="space-y-3">
                      <div className="rounded border border-red-200 bg-red-50 px-3 py-2">
                        <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-sicarf-red">
                          <AlertTriangle className="size-4" /> VTN com falhas críticas em produção
                        </p>
                        <p className="text-xs text-sicarf-gray-600">
                          Dupla chamada de cálculo e emissão com base incorreta. Refatoração urgente.
                        </p>
                      </div>
                      <div className="rounded border border-red-200 bg-red-50 px-3 py-2">
                        <p className="mb-1 text-sm font-semibold text-sicarf-red">
                          CRF com 488 processos aguardando custas
                        </p>
                        <p className="text-xs text-sicarf-gray-600">
                          API SEFAZ já mapeada. Potencial de liberar 30% do estoque total.
                        </p>
                      </div>
                      <div className="rounded border border-orange-200 bg-orange-50 px-3 py-2">
                        <p className="mb-1 text-sm font-semibold text-orange-700">
                          CCGEO bloqueado por falta de homologação
                        </p>
                        <p className="text-xs text-sicarf-gray-600">
                          426 aguardando análise e 402 suspensos com automação pendente.
                        </p>
                      </div>
                    </div>
                  </PanelCard>
                </div>
              </>
            ) : null}

            {tabAtiva === "setores" ? (
              <PanelCard>
                <SecTitle>Status por Setor</SecTitle>
                <SubDesc>Situações críticas, bloqueios e soluções mapeadas.</SubDesc>
                <div className="space-y-3">
                  {SETORES.map((setor) => (
                    <div
                      key={setor.nome}
                      className="grid grid-cols-1 gap-3 rounded border border-sicarf-gray-200 p-3 md:grid-cols-[140px,1fr,180px,120px]"
                    >
                      <div>
                        <p className="text-sm font-bold" style={{ color: setor.cor }}>
                          {setor.nome}
                        </p>
                        <p className="text-xs text-sicarf-gray-500">Volume total: {setor.volume}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-sicarf-gray-500">Volume crítico</p>
                        <ProgressBar value={setor.critico} max={maxSetorCritico} color={setor.cor} />
                      </div>
                      <div className="text-xs">
                        <p className="text-sicarf-gray-500">Solução</p>
                        <p className="font-semibold text-sicarf-gray-700">{setor.solucao}</p>
                        <p className="mt-1 text-sicarf-gray-500">Esforço: {setor.horas}</p>
                      </div>
                      <div className="flex items-center justify-start md:justify-end">
                        <SectorStatus value={setor.critico} max={maxSetorCritico} />
                      </div>
                    </div>
                  ))}
                </div>
              </PanelCard>
            ) : null}

            {tabAtiva === "municipios" ? (
              <PanelCard>
                <SecTitle>Distribuição Geográfica — CRF Custas</SecTitle>
                <SubDesc>Processos bloqueados por localidade.</SubDesc>
                <div className="space-y-2">
                  {MUNICIPIOS.map((municipio, index) => (
                    <div key={municipio.nome} className="grid grid-cols-[30px,1fr,80px] items-center gap-3">
                      <span className="text-xs font-semibold text-sicarf-gray-400">{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="font-medium text-sicarf-gray-700">{municipio.nome}</span>
                          <span className="font-bold text-sicarf-gray-800">{municipio.quantidade}</span>
                        </div>
                        <ProgressBar
                          value={municipio.quantidade}
                          max={maxMunicipio}
                          color={index < 2 ? S.red : index < 6 ? S.orange : S.blue}
                        />
                      </div>
                      <span className="text-right text-xs text-sicarf-gray-500">
                        {((municipio.quantidade / 488) * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </PanelCard>
            ) : null}

            {tabAtiva === "plano" ? (
              <PanelCard>
                <SecTitle>Roadmap de Implementação</SecTitle>
                <SubDesc>Sequência recomendada com foco em desbloqueio progressivo do funil.</SubDesc>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                  <MetricCard value="270h" label="Total Estimado" valueClassName="text-sicarf-red" />
                  <MetricCard value="33d" label="Prazo Estimado" valueClassName="text-orange-700" />
                  <MetricCard value="7" label="Ações Mapeadas" valueClassName="text-sicarf-blue" />
                  <MetricCard value="~680" label="Processos Liberáveis" valueClassName="text-sicarf-green" />
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    "1 · Refatorar VTN (urgente e crítico)",
                    "2 · API SEFAZ no CRF (80h, libera 488 processos)",
                    "3 · Automatizar CCAT e CCGEO (Imagex IA + Portaria Auto)",
                    "4 · Custa automática + despacho (56h)",
                    "5 · DIROT + Jurídico (48h) para fechar funil",
                    "6 · Vistoria remota nos municípios críticos (48h)",
                  ].map((item, idx) => (
                    <div key={item} className="rounded border border-sicarf-gray-200 px-3 py-2 text-sm text-sicarf-gray-700">
                      <span className="font-semibold">{idx + 1}.</span> {item.replace(/^\d+\s·\s/, "")}
                    </div>
                  ))}
                </div>
              </PanelCard>
            ) : null}

            {tabAtiva === "situacoes" ? (
              <PanelCard>
                <SecTitle>Todas as Situações</SecTitle>
                <SubDesc>Tabela completa de volume por situação no sistema.</SubDesc>
                <div className="space-y-2">
                  {topSituacoes.map((s) => (
                    <div key={s.nome} className="rounded border border-sicarf-gray-200 p-3">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium text-sicarf-gray-700">{s.nome}</span>
                        <span className="text-sm font-bold text-sicarf-gray-800">{s.quantidade}</span>
                      </div>
                      <ProgressBar value={s.quantidade} max={SITUACOES[0]?.quantidade ?? 1} color={S.blue} />
                    </div>
                  ))}
                </div>
              </PanelCard>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}
