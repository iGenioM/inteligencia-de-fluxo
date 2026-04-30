/**
 * Mock exclusivo da tela **Acompanhamento** (Amapá — SICARF Terras).
 * Edite aqui os textos e números exibidos no painel.
 *
 * Fluxo operacional (16 etapas) está em `lib/mock/painel-fluxo.ts`.
 */

export interface AcompanhamentoTabelaLinha {
  rotulo: string;
  valores: readonly (string | number)[];
  destaqueIdx?: number;
}

export interface AlertaGargaloDemo {
  nivel: "critico" | "alerta" | "info" | "ok";
  texto: string;
  valor: string;
}

export interface GargaloSetorDemo {
  setor: string;
  pct: number;
}

export interface HistoricoCampanhaDemo {
  quando: string;
  texto: string;
}

export interface OutraCampanhaResumoDemo {
  titulo: string;
  resumo: string;
  pctTempo: number;
  pctTitulos: number;
}

/** Dados exibidos em `StepAcompanhamento` (única fonte, sem PA/MA). */
export interface DadosAcompanhamentoAmapa {
  kpiProcessosAbertos: string;
  kpiTitulosEmitidosGeral: string;
  kpiGargalosDetectados: string;
  kpiAguardandoCustasCrf: string;
  kpiTaxaConversao: string;
  acompanhamentoTipoFiltroPadrao: string;
  campanhaAcompTitulo: string;
  campanhaAcompMeta: string;
  campanhaAcompPctTempo: number;
  campanhaAcompPctTitulos: number;
  campanhaConcluidaTitulo: string;
  titulosCampanhaAnterior: string;
  acompColunasRural: readonly string[];
  acompLinhasRural: readonly AcompanhamentoTabelaLinha[];
  acompColunasFinalizados: readonly string[];
  acompLinhasFinalizados: readonly AcompanhamentoTabelaLinha[];
  alertasGargalo: readonly AlertaGargaloDemo[];
  gargalosSetor: readonly GargaloSetorDemo[];
  historicoCampanha: readonly HistoricoCampanhaDemo[];
  outrasCampanhas: readonly OutraCampanhaResumoDemo[];
  acompRodapeTotalCurso: string;
  acompRodapeTitulosEmitidos: string;
  acompRodapeDiasRestantes: string;
}

export const DADOS_ACOMPANHAMENTO_AMAPA: DadosAcompanhamentoAmapa = {
  kpiProcessosAbertos: "1.965",
  kpiTitulosEmitidosGeral: "1.262",
  kpiGargalosDetectados: "3",
  kpiAguardandoCustasCrf: "490",
  kpiTaxaConversao: "89%",
  acompanhamentoTipoFiltroPadrao: "reurb",
  campanhaAcompTitulo: "Campanha Metropolitana do Amapá — Macapá — 2026",
  campanhaAcompMeta: "REURB · municípios do Amapá · equipes em campo",
  campanhaAcompPctTempo: 58,
  campanhaAcompPctTitulos: 48,
  campanhaConcluidaTitulo:
    "Campanha anterior — Macapá / Santana (regularização fundiária)",
  titulosCampanhaAnterior: "489",
  acompColunasRural: [
    "Município / etapa",
    "CCAT (1)",
    "CCGEO (2)",
    "CRF (3)",
    "CCGEO (4)",
    "Jurídico (5)",
    "DIROT (6)",
    "DIPRE (7)",
    "CCAT (8)",
    "DIROT (9)",
    "DIPRE (10)",
    "Governo (11)",
    "CCAT (12)",
    "CCGEO (13)",
    "CCAT (14)",
  ],
  acompLinhasRural: [
    {
      rotulo: "Macapá — fluxo principal",
      valores: [74, 69, 63, 57, 51, 47, 43, 39, 34, 30, 26, 22, 18, 14],
      destaqueIdx: 2,
    },
    {
      rotulo: "Santana — 2ª etapa",
      valores: [61, 56, 50, 45, 40, 36, 32, 29, 25, 21, 18, 15, 12, 9],
    },
    {
      rotulo: "Laranjal do Jari — análise",
      valores: [47, 43, 38, 34, 30, 27, 24, 21, 18, 15, 12, 10, 8, 6],
    },
  ],
  acompColunasFinalizados: ["Município", "Títulos emitidos", "Área (ha)"],
  acompLinhasFinalizados: [
    { rotulo: "Mazagão", valores: ["128", "4.920", "2.100"] },
    { rotulo: "Oiapoque", valores: ["96", "3.410", "1.850"] },
  ],
  alertasGargalo: [
    {
      nivel: "critico",
      texto: "CRF acumulado em Macapá — acima do SLA interno",
      valor: "31 proc.",
    },
    {
      nivel: "alerta",
      texto: "Equipe subdimensionada em Santana",
      valor: "11 em fila",
    },
    {
      nivel: "info",
      texto: "CCGEO pendente de validação externa",
      valor: "CCGEO +18",
    },
    {
      nivel: "ok",
      texto: "Emissão de títulos dentro da meta semanal",
      valor: "60 ok",
    },
  ],
  gargalosSetor: [
    { setor: "CCAT", pct: 56 },
    { setor: "CCGEO", pct: 68 },
    { setor: "CRF", pct: 79 },
    { setor: "Jurídico", pct: 61 },
    { setor: "DIROT", pct: 58 },
    { setor: "DIPRE", pct: 72 },
    { setor: "Governo", pct: 49 },
  ],
  historicoCampanha: [
    {
      quando: "15/04 09:47",
      texto: "Gargalo registrado: Macapá — 3ª etapa (CRF)",
    },
    {
      quando: "14/04 16:12",
      texto: "Redistribuição: +2 técnicos em Santana",
    },
    {
      quando: "13/04 11:05",
      texto: "Parecer favorável — lote CCGEO 12",
    },
  ],
  outrasCampanhas: [
    {
      titulo: "Campanha Sul do Amapá",
      resumo: "1.120 proc. · 412 títulos",
      pctTempo: 62,
      pctTitulos: 51,
    },
    {
      titulo: "Campanha Centro-Leste do Amapá",
      resumo: "640 proc. · 198 títulos",
      pctTempo: 55,
      pctTitulos: 38,
    },
    {
      titulo: "Campanha Noroeste do Amapá",
      resumo: "890 proc. · 305 títulos",
      pctTempo: 48,
      pctTitulos: 44,
    },
  ],
  acompRodapeTotalCurso: "2.892",
  acompRodapeTitulosEmitidos: "1.262",
  acompRodapeDiasRestantes: "18",
};
