/**
 * Dados da demonstração por estado (Pará × Maranhão), conforme regra do último dígito do CPF.
 */

export type EstadoDemoId = "PA" | "MA";

/** Estado regional vindo do login (`sicarf_regiao_demo`) e espelhado em `window.estadoAtivo`. */
export type EstadoAtivoGlobal = EstadoDemoId | "INVALID" | null;

/** Modalidades de campanha na demonstração (três eixos distintos). */
export type ModalidadeGlebaDemo = "REURB" | "RURAL" | "Quilombola";

export type TipoGlebaDemo = "municipal" | "estadual" | "federal";

export interface GlebaRow {
  gleba: string;
  municipio: string;
  area: string;
  ocupacoes: string;
  modalidade: ModalidadeGlebaDemo;
  restricoes: string;
  aptidao: "Alta" | "Média";
}

/** Equipe de campo para multiselect e cálculo de processos/dia (demo). */
export interface EquipeOperacionalDemo {
  id: string;
  nome: string;
  processosPorDia: number;
}

/** Fatia do gráfico “Perfil dos beneficiários” (demo). */
export interface PerfilBeneficiarioFatia {
  rotulo: string;
  pct: number;
}

/** Linha da tabela “Projeção por modalidade” (demo). */
export interface ProjecaoModalidadeRow {
  modalidade: string;
  processos: string;
  areaHa: string;
  custoMedio: string;
  pctTotal: string;
  conversaoPct: number;
  /** Classe Tailwind da barra de conversão */
  barClass: string;
}

/** Cartão de cenário no passo Comparar (demo). */
export interface CenarioComparacaoCard {
  variant: "A" | "B" | "C";
  titulo: string;
  alcance: string;
  municipios: number;
  tecnicos: number;
  dias: number;
  modalidades: string;
  badge: string;
}

/** Linha da matriz comparativa (demo). */
export interface MatrizComparacaoLinha {
  /** Quando definido, renderiza cabeçalho de grupo na tabela */
  grupo?: string;
  criterio: string;
  cenA: string;
  cenB: string;
  cenC: string;
  melhor: "A" | "B" | "C";
  /** Destaca valor do cenário A (ex.: risco alto) */
  alertaAltoRiscoCenA?: boolean;
}

export interface CronogramaSemanaDemo {
  semana: string;
  fase: string;
  processosOuTitulos: string;
  /** Largura relativa da barra (0–100) para o Gantt */
  larguraPct: number;
  barClass: string;
}

export interface AcompanhamentoTabelaLinha {
  rotulo: string;
  valores: readonly (string | number)[];
  /** Índice da célula (0-based em valores) para realce tipo gargalo */
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
  /** Mantido para compatibilidade visual; preferir pctTempo e pctTitulos */
  progressoPct: number;
  resumo: string;
  /** Percentual do prazo da campanha já decorrido */
  pctTempo: number;
  /** Percentual dos títulos previstos já emitidos */
  pctTitulos: number;
}

export interface DadosDemonstracao {
  estadoId: EstadoDemoId;
  /** Texto do badge abaixo do CPF */
  badgeCurto: string;
  orgSigla: string;
  orgNome: string;
  regioesSelect: string[];
  municipiosSelect: string[];
  /** Glebas por esfera, para o fluxo Tipo de gleba → Selecione a gleba */
  glebasPorTipoGleba: Record<TipoGlebaDemo, string[]>;
  /** Processos coletivos disponíveis para select opcional (demo) */
  processosColetivosOpcoes: string[];
  /** Equipes para multiselect em capacidade operacional */
  equipesOperacionais: readonly EquipeOperacionalDemo[];
  /** Valor inicial do campo “Previsão de títulos” (compartilhado entre etapas via contexto) */
  previsaoTitulosPadrao: number;
  /** KPI fixo “títulos projetados” na grade (aba Parâmetros), quando não usar só o cálculo */
  kpiTitulosExibicao: number | null;
  areaRegularizavelHa: string;
  custoEstTitulo: string;
  custoTotalEstimado: string;
  areaTituladaProjHa: string;
  tempoMedioProcesso: string;
  /** Índice 0–100 para o velocímetro de viabilidade na projeção (substitui SAF) */
  indiceViabilidadeReurb: string;
  ocupacoesIdentificadas: string;
  funilElegiveis: string;
  funilCarAtivo: string;
  /** Funil — etapa intermediária (demo) */
  funilSemSobreposicao: string;
  /** Funil — etapa intermediária (demo) */
  funilAnaliseAuto: string;
  funilTitulosProj: string;
  funilTextoBarra: string;
  ematerTecnicosTexto: string;
  alertaGlebaNome: string;
  crescimentoRegional: string;
  projecaoTituloCampanha: string;
  cenarioASub: string;
  cenarioBSub: string;
  cenarioCSub: string;
  matrizCenB: string;
  matrizScoreB: string;
  campanhaAcompTitulo: string;
  campanhaConcluidaTitulo: string;
  titulosCampanhaAnterior: string;
  /** Painel de acompanhamento — totais distintos por estado */
  kpiProcessosAbertos: string;
  kpiTitulosEmitidosGeral: string;
  nomePlanoDefault: string;
  justificativaExport: string;
  docUfOrgao: string;
  docTituloPlano: string;
  docCampanha: string;
  docCenario: string;
  docTitulosProj: string;
  docAreaReg: string;
  docCustoTitulo: string;
  docGlebas: GlebaRow[];
  perfilBeneficiariosTotal: string;
  perfilBeneficiariosFatias: readonly PerfilBeneficiarioFatia[];
  /** Projeção — semanas do cronograma (demo) */
  cronogramaSemanas: readonly CronogramaSemanaDemo[];
  projecaoModalidades: readonly ProjecaoModalidadeRow[];
  /** Comparar — cartões e matriz */
  cenariosComparacaoCards: readonly CenarioComparacaoCard[];
  matrizComparacao: readonly MatrizComparacaoLinha[];
  graficoComparacaoTitulos: readonly [number, number, number];
  graficoComparacaoConversao: readonly [number, number, number];
  graficoComparacaoViabilidade: readonly [number, number, number];
  pontuacaoCenarios: { A: number; B: number; C: number };
  textoRecomendacaoComparacao: string;
  /** Acompanhamento — metadados da campanha em destaque */
  campanhaAcompMeta: string;
  /** Percentuais para comparar ritmo temporal vs emissão de títulos (campanha principal) */
  campanhaAcompPctTempo: number;
  campanhaAcompPctTitulos: number;
  acompanhamentoTipoFiltroPadrao: string;
  acompColunasRural: readonly string[];
  acompLinhasRural: readonly AcompanhamentoTabelaLinha[];
  acompColunasFinalizados: readonly string[];
  acompLinhasFinalizados: readonly AcompanhamentoTabelaLinha[];
  acompColunasReurb: readonly string[];
  acompLinhasReurb: readonly AcompanhamentoTabelaLinha[];
  alertasGargalo: readonly AlertaGargaloDemo[];
  gargalosSetor: readonly GargaloSetorDemo[];
  historicoCampanha: readonly HistoricoCampanhaDemo[];
  outrasCampanhas: readonly OutraCampanhaResumoDemo[];
  acompRodapeTotalCurso: string;
  acompRodapeTitulosEmitidos: string;
  acompRodapeDiasRestantes: string;
}

const GLEBAS_PA: GlebaRow[] = [
  {
    gleba: "Gleba Manguari",
    municipio: "São Félix do Xingu",
    area: "23.450",
    ocupacoes: "142",
    modalidade: "REURB",
    restricoes: "Nenhuma crítica",
    aptidao: "Alta",
  },
  {
    gleba: "Gleba Rio Fresco",
    municipio: "São Félix do Xingu",
    area: "18.920",
    ocupacoes: "98",
    modalidade: "RURAL",
    restricoes: "Passivo ambiental parcial",
    aptidao: "Média",
  },
  {
    gleba: "Gleba Curuá Norte",
    municipio: "São Félix do Xingu",
    area: "31.200",
    ocupacoes: "67",
    modalidade: "Quilombola",
    restricoes: "Conflito em 3 lotes",
    aptidao: "Média",
  },
  {
    gleba: "Gleba Tucuruí III",
    municipio: "São Félix do Xingu",
    area: "10.730",
    ocupacoes: "38",
    modalidade: "REURB",
    restricoes: "Nenhuma crítica",
    aptidao: "Alta",
  },
];

const GLEBAS_MA: GlebaRow[] = [
  {
    gleba: "Gleba Cocais",
    municipio: "Imperatriz",
    area: "21.200",
    ocupacoes: "128",
    modalidade: "REURB",
    restricoes: "Nenhuma crítica",
    aptidao: "Alta",
  },
  {
    gleba: "Gleba Tocantins",
    municipio: "Imperatriz",
    area: "17.100",
    ocupacoes: "89",
    modalidade: "RURAL",
    restricoes: "Passivo ambiental parcial",
    aptidao: "Média",
  },
  {
    gleba: "Gleba Mearim",
    municipio: "Imperatriz",
    area: "28.400",
    ocupacoes: "61",
    modalidade: "Quilombola",
    restricoes: "Conflito em 3 lotes",
    aptidao: "Média",
  },
  {
    gleba: "Gleba Pericumã",
    municipio: "Imperatriz",
    area: "9.800",
    ocupacoes: "34",
    modalidade: "REURB",
    restricoes: "Nenhuma crítica",
    aptidao: "Alta",
  },
];

export const DADOS_PA: DadosDemonstracao = {
  estadoId: "PA",
  badgeCurto: "Pará — ITERPA",
  orgSigla: "ITERPA",
  orgNome: "Instituto de Terras do Pará",
  regioesSelect: ["Sudeste Paraense", "Nordeste Paraense", "Baixo Amazonas"],
  municipiosSelect: ["São Félix do Xingu", "Marabá", "Santarém", "Altamira"],
  glebasPorTipoGleba: {
    municipal: [
      "Gleba Manguari",
      "Gleba Rio Fresco",
      "Gleba Curuá Norte",
    ],
    estadual: [
      "GLEBA PA-EST-01 — Sudeste Paraense",
      "GLEBA PA-EST-02 — Baixo Amazonas",
    ],
    federal: [
      "GLEBA federal — Projeto de assentamento Xingu",
      "GLEBA federal — eixo BR-230",
    ],
  },
  processosColetivosOpcoes: [
    "PC 001/2025 — REURB São Félix (coletivo)",
    "PC 002/2025 — Núcleo Rio Fresco",
    "PC 003/2024 — Regularização quilombola regional",
  ],
  equipesOperacionais: [
    { id: "eq-norte", nome: "Equipe Norte", processosPorDia: 1.25 },
    { id: "eq-sul", nome: "Equipe Sul", processosPorDia: 1.1 },
    { id: "eq-leste", nome: "Equipe Leste", processosPorDia: 1.4 },
    { id: "eq-oeste", nome: "Equipe Oeste", processosPorDia: 1.0 },
  ],
  previsaoTitulosPadrao: 320,
  kpiTitulosExibicao: null,
  areaRegularizavelHa: "84.300",
  custoEstTitulo: "R$ 412",
  custoTotalEstimado: "R$ 127k",
  areaTituladaProjHa: "51.400",
  tempoMedioProcesso: "23 dias",
  indiceViabilidadeReurb: "88",
  ocupacoesIdentificadas: "345",
  funilElegiveis: "303",
  funilCarAtivo: "272",
  funilSemSobreposicao: "245",
  funilAnaliseAuto: "221",
  funilTitulosProj: "307",
  funilTextoBarra: "307 / 345 — 89%",
  ematerTecnicosTexto: "12",
  alertaGlebaNome: "Gleba Rio Fresco",
  crescimentoRegional: "Crescimento consistente no Sudeste Paraense",
  projecaoTituloCampanha: "Projeção de resultados — Campanha São Félix do Xingu / 30 dias",
  cenarioASub: "São Félix + Marabá",
  cenarioBSub: "São Félix do Xingu",
  cenarioCSub: "Gleba Manguari apenas",
  matrizCenB: "307",
  matrizScoreB: "82",
  campanhaAcompTitulo: "Campanha Nordeste Paraense — 2026",
  campanhaConcluidaTitulo:
    "Campanha Marajó — Soure / Salvaterra (Decouville — REURB)",
  titulosCampanhaAnterior: "489",
  kpiProcessosAbertos: "1.965",
  kpiTitulosEmitidosGeral: "1.262",
  nomePlanoDefault: "Campanha São Félix do Xingu — Maio 2026",
  justificativaExport:
    "Campanha focada na Gleba Manguari e glebas adjacentes de São Félix do Xingu, com REURB rural e núcleos quilombolas priorizados e apoio da EMATER. Objetivo: consolidar metas junto ao ITERPA.",
  docUfOrgao: "ESTADO DO PARÁ — ITERPA",
  docTituloPlano: "Plano de Campanha Fundiária",
  docCampanha: "São Félix do Xingu",
  docCenario: "B — Focado",
  docTitulosProj: "307",
  docAreaReg: "84.300 ha",
  docCustoTitulo: "R$ 412",
  docGlebas: GLEBAS_PA,
  perfilBeneficiariosTotal: "345",
  perfilBeneficiariosFatias: [
    { rotulo: "REURB", pct: 45 },
    { rotulo: "Rural", pct: 35 },
    { rotulo: "Quilombola", pct: 20 },
  ],
  cronogramaSemanas: [
    {
      semana: "Semana 1",
      fase: "Cadastros campo",
      processosOuTitulos: "47 proc.",
      larguraPct: 44,
      barClass: "bg-sicarf-green",
    },
    {
      semana: "Semana 2",
      fase: "Análise + georret",
      processosOuTitulos: "108 proc.",
      larguraPct: 100,
      barClass: "bg-sicarf-green-dark",
    },
    {
      semana: "Semana 3",
      fase: "Pareceres jurídicos",
      processosOuTitulos: "92 proc.",
      larguraPct: 85,
      barClass: "bg-sicarf-green-border",
    },
    {
      semana: "Semana 4",
      fase: "Emissão títulos",
      processosOuTitulos: "60 títulos",
      larguraPct: 56,
      barClass: "bg-sicarf-orange",
    },
    {
      semana: "Pós-campanha",
      fase: "Análises remanescentes → títulos",
      processosOuTitulos: "267 títulos",
      larguraPct: 92,
      barClass: "bg-sicarf-green-light",
    },
  ],
  projecaoModalidades: [
    {
      modalidade: "REURB",
      processos: "118",
      areaHa: "31.200",
      custoMedio: "R$ 398",
      pctTotal: "42%",
      conversaoPct: 91,
      barClass: "bg-sicarf-green",
    },
    {
      modalidade: "Rural",
      processos: "96",
      areaHa: "26.100",
      custoMedio: "R$ 372",
      pctTotal: "35%",
      conversaoPct: 87,
      barClass: "bg-sicarf-blue",
    },
    {
      modalidade: "Quilombola",
      processos: "62",
      areaHa: "15.200",
      custoMedio: "R$ 455",
      pctTotal: "23%",
      conversaoPct: 84,
      barClass: "bg-purple-600",
    },
  ],
  cenariosComparacaoCards: [
    {
      variant: "A",
      titulo: "Cenário A — Ampliado",
      alcance: "São Félix + Marabá",
      municipios: 2,
      tecnicos: 12,
      dias: 45,
      modalidades: "REURB + Rural + Quilombola",
      badge: "Maior alcance",
    },
    {
      variant: "B",
      titulo: "Cenário B — Focado",
      alcance: "São Félix do Xingu",
      municipios: 1,
      tecnicos: 8,
      dias: 30,
      modalidades: "Prioridade REURB",
      badge: "Recomendado",
    },
    {
      variant: "C",
      titulo: "Cenário C — Mínimo",
      alcance: "Gleba Manguari apenas",
      municipios: 1,
      tecnicos: 4,
      dias: 15,
      modalidades: "Somente REURB",
      badge: "Menor custo",
    },
  ],
  matrizComparacao: [
    {
      grupo: "Projeção e alcance",
      criterio: "Títulos projetados",
      cenA: "512",
      cenB: "307",
      cenC: "142",
      melhor: "A",
    },
    {
      criterio: "Área regularizável (mil ha)",
      cenA: "118",
      cenB: "84,3",
      cenC: "23,4",
      melhor: "A",
    },
    {
      grupo: "Eficiência e custo",
      criterio: "Custo por título (R$)",
      cenA: "R$ 580",
      cenB: "R$ 412",
      cenC: "R$ 395",
      melhor: "C",
    },
    {
      criterio: "Títulos / técnico / dia",
      cenA: "0,95",
      cenB: "1,28",
      cenC: "2,37",
      melhor: "B",
    },
    {
      grupo: "Qualidade e risco",
      criterio: "Índice de viabilidade REURB",
      cenA: "76",
      cenB: "88",
      cenC: "90",
      melhor: "C",
    },
    {
      criterio: "Taxa de conversão (%)",
      cenA: "82",
      cenB: "89",
      cenC: "88",
      melhor: "B",
    },
    {
      criterio: "Processos de alto risco",
      cenA: "38",
      cenB: "12",
      cenC: "9",
      melhor: "B",
      alertaAltoRiscoCenA: true,
    },
    {
      grupo: "Viabilidade operacional",
      criterio: "Logística de campo (0–10)",
      cenA: "6,2",
      cenB: "8,4",
      cenC: "7,1",
      melhor: "B",
    },
    {
      criterio: "Índice de viabilidade geral",
      cenA: "68",
      cenB: "88",
      cenC: "74",
      melhor: "B",
    },
  ],
  graficoComparacaoTitulos: [100, 60, 28],
  graficoComparacaoConversao: [82, 89, 88],
  graficoComparacaoViabilidade: [68, 88, 74],
  pontuacaoCenarios: { A: 3, B: 9, C: 6 },
  textoRecomendacaoComparacao:
    "O Cenário B — Focado equilibra volume de títulos, eficiência operacional, custo por unidade e risco territorial. Mantém a campanha dentro da capacidade da equipe e prioriza glebas com melhor conversão e menor conflito.",
  campanhaAcompMeta: "REURB · 4 municípios · 3 equipes em campo",
  campanhaAcompPctTempo: 58,
  campanhaAcompPctTitulos: 48,
  acompanhamentoTipoFiltroPadrao: "reurb",
  acompColunasRural: [
    "Município / etapa",
    "GAC",
    "GIS",
    "GIT",
    "CDI",
    "TC",
    "Parecer",
  ],
  acompLinhasRural: [
    {
      rotulo: "Viseu — 3ª etapa",
      valores: [42, 38, 31, 18, 12, 9],
      destaqueIdx: 4,
    },
    {
      rotulo: "Capitão Poço — 2ª etapa",
      valores: [55, 51, 44, 28, 20, 14],
    },
    {
      rotulo: "Tomé-Açu — análise",
      valores: [36, 33, 30, 22, 15, 11],
    },
  ],
  acompColunasFinalizados: [
    "Município",
    "Títulos emitidos",
    "Área (ha)",
    "Classificação REURB",
  ],
  acompLinhasFinalizados: [
    { rotulo: "Santa Izabel", valores: ["128", "4.920", "REURB"] },
    { rotulo: "Irituia", valores: ["96", "3.410", "Quilombola"] },
  ],
  acompColunasReurb: [
    "Núcleo / gleba",
    "Tipo",
    "Fase REURB",
    "Processos",
    "Observação",
  ],
  acompLinhasReurb: [
    {
      rotulo: "Bequimão — núcleo A",
      valores: ["REURB", "Elaboração", "54", "Aguardando parecer"],
    },
  ],
  alertasGargalo: [
    {
      nivel: "critico",
      texto: "CDI acumulado em Viseu — acima do SLA interno",
      valor: "31 proc.",
    },
    {
      nivel: "alerta",
      texto: "Técnico de campo subdimensionado em Tomé-Açu",
      valor: "11 em fila",
    },
    {
      nivel: "info",
      texto: "Georreferenciamento pendente de validação externa",
      valor: "GIS +18",
    },
    {
      nivel: "ok",
      texto: "Emissão de títulos dentro da meta semanal",
      valor: "60 ok",
    },
  ],
  gargalosSetor: [
    { setor: "GAC", pct: 68 },
    { setor: "GIS", pct: 52 },
    { setor: "CDI", pct: 74 },
    { setor: "TC", pct: 61 },
  ],
  historicoCampanha: [
    { quando: "15/04 09:47", texto: "Gargalo registrado: Viseu — 3ª etapa" },
    { quando: "14/04 16:12", texto: "Redistribuição: +2 técnicos em Capitão Poço" },
    { quando: "13/04 11:05", texto: "Parecer favorável — lote GIS 12" },
  ],
  outrasCampanhas: [
    {
      titulo: "Campanha Sudeste Paraense",
      progressoPct: 54,
      resumo: "1.120 proc. · 412 títulos",
      pctTempo: 62,
      pctTitulos: 51,
    },
    {
      titulo: "Campanha Marajó",
      progressoPct: 38,
      resumo: "640 proc. · 198 títulos",
      pctTempo: 55,
      pctTitulos: 38,
    },
    {
      titulo: "Campanha Baixo Amazonas",
      progressoPct: 44,
      resumo: "890 proc. · 305 títulos",
      pctTempo: 48,
      pctTitulos: 44,
    },
  ],
  acompRodapeTotalCurso: "2.892",
  acompRodapeTitulosEmitidos: "1.262",
  acompRodapeDiasRestantes: "18",
};

export const DADOS_MA: DadosDemonstracao = {
  estadoId: "MA",
  badgeCurto: "Maranhão — ITERMA",
  orgSigla: "ITERMA",
  orgNome: "Instituto de Terras do Maranhão",
  regioesSelect: [
    "Meio-Norte Maranhense",
    "Norte Maranhense",
    "Oeste Maranhense",
  ],
  municipiosSelect: ["Imperatriz", "Caxias", "Timon", "Balsas"],
  glebasPorTipoGleba: {
    municipal: ["Gleba Cocais", "Gleba Tocantins", "Gleba Mearim"],
    estadual: ["GLEBA MA-EST-01 — Meio-Norte", "GLEBA MA-EST-02 — Baixada"],
    federal: ["GLEBA federal — Trecho BR-010", "GLEBA federal — Pericumã"],
  },
  processosColetivosOpcoes: [
    "PC 101/2025 — REURB Imperatriz (coletivo)",
    "PC 102/2025 — Núcleo Mearim",
    "PC 098/2024 — Quilombolas do Tocantins",
  ],
  equipesOperacionais: [
    { id: "ma-eq-1", nome: "Equipe Imperatriz", processosPorDia: 1.2 },
    { id: "ma-eq-2", nome: "Equipe Baixada", processosPorDia: 1.15 },
    { id: "ma-eq-3", nome: "Equipe Oeste", processosPorDia: 1.05 },
    { id: "ma-eq-4", nome: "Equipe Móvel", processosPorDia: 1.3 },
  ],
  previsaoTitulosPadrao: 280,
  kpiTitulosExibicao: 284,
  areaRegularizavelHa: "76.500",
  custoEstTitulo: "R$ 415",
  custoTotalEstimado: "R$ 118k",
  areaTituladaProjHa: "47.200",
  tempoMedioProcesso: "26 dias",
  indiceViabilidadeReurb: "84",
  ocupacoesIdentificadas: "312",
  funilElegiveis: "271",
  funilCarAtivo: "244",
  funilSemSobreposicao: "246",
  funilAnaliseAuto: "222",
  funilTitulosProj: "284",
  funilTextoBarra: "284 / 312 — 91%",
  ematerTecnicosTexto: "9",
  alertaGlebaNome: "Gleba Tocantins",
  crescimentoRegional:
    "Crescimento consistente no Meio-Norte Maranhense",
  projecaoTituloCampanha:
    "Projeção de resultados — Campanha Imperatriz / 30 dias",
  cenarioASub: "Imperatriz + Caxias",
  cenarioBSub: "Imperatriz",
  cenarioCSub: "Gleba Cocais apenas",
  matrizCenB: "284",
  matrizScoreB: "78",
  campanhaAcompTitulo: "Campanha Vale do Mearim — Imperatriz — 2026",
  campanhaConcluidaTitulo:
    "Campanha Baixada Maranhense — Bacabal / Penalva (Bequimão — REURB)",
  titulosCampanhaAnterior: "431",
  kpiProcessosAbertos: "1.742",
  kpiTitulosEmitidosGeral: "1.118",
  nomePlanoDefault: "Campanha Imperatriz — Maio 2025",
  justificativaExport:
    "Campanha focada na Gleba Cocais e entorno de Imperatriz, com REURB rural e núcleos quilombolas no Meio-Norte Maranhense e apoio da EMATER. Objetivo: consolidar metas junto ao ITERMA.",
  docUfOrgao: "ESTADO DO MARANHÃO — ITERMA",
  docTituloPlano: "Plano de Campanha Fundiária",
  docCampanha: "Imperatriz",
  docCenario: "B — Focado",
  docTitulosProj: "284",
  docAreaReg: "76.500 ha",
  docCustoTitulo: "R$ 415",
  docGlebas: GLEBAS_MA,
  perfilBeneficiariosTotal: "312",
  perfilBeneficiariosFatias: [
    { rotulo: "REURB", pct: 42 },
    { rotulo: "Rural", pct: 38 },
    { rotulo: "Quilombola", pct: 20 },
  ],
  cronogramaSemanas: [
    {
      semana: "Semana 1",
      fase: "Cadastros campo",
      processosOuTitulos: "41 proc.",
      larguraPct: 42,
      barClass: "bg-sicarf-green",
    },
    {
      semana: "Semana 2",
      fase: "Análise + georret",
      processosOuTitulos: "98 proc.",
      larguraPct: 100,
      barClass: "bg-sicarf-green-dark",
    },
    {
      semana: "Semana 3",
      fase: "Pareceres jurídicos",
      processosOuTitulos: "86 proc.",
      larguraPct: 78,
      barClass: "bg-sicarf-green-border",
    },
    {
      semana: "Semana 4",
      fase: "Emissão títulos",
      processosOuTitulos: "52 títulos",
      larguraPct: 53,
      barClass: "bg-sicarf-orange",
    },
    {
      semana: "Pós-campanha",
      fase: "Análises remanescentes → títulos",
      processosOuTitulos: "241 títulos",
      larguraPct: 88,
      barClass: "bg-sicarf-green-light",
    },
  ],
  projecaoModalidades: [
    {
      modalidade: "REURB",
      processos: "108",
      areaHa: "28.400",
      custoMedio: "R$ 402",
      pctTotal: "40%",
      conversaoPct: 90,
      barClass: "bg-sicarf-green",
    },
    {
      modalidade: "Rural",
      processos: "102",
      areaHa: "29.800",
      custoMedio: "R$ 378",
      pctTotal: "38%",
      conversaoPct: 86,
      barClass: "bg-sicarf-blue",
    },
    {
      modalidade: "Quilombola",
      processos: "66",
      areaHa: "14.600",
      custoMedio: "R$ 448",
      pctTotal: "22%",
      conversaoPct: 83,
      barClass: "bg-purple-600",
    },
  ],
  cenariosComparacaoCards: [
    {
      variant: "A",
      titulo: "Cenário A — Ampliado",
      alcance: "Imperatriz + Caxias",
      municipios: 2,
      tecnicos: 11,
      dias: 45,
      modalidades: "REURB + Rural + Quilombola",
      badge: "Maior alcance",
    },
    {
      variant: "B",
      titulo: "Cenário B — Focado",
      alcance: "Imperatriz",
      municipios: 1,
      tecnicos: 9,
      dias: 30,
      modalidades: "Prioridade REURB",
      badge: "Recomendado",
    },
    {
      variant: "C",
      titulo: "Cenário C — Mínimo",
      alcance: "Gleba Cocais apenas",
      municipios: 1,
      tecnicos: 4,
      dias: 15,
      modalidades: "Somente REURB",
      badge: "Menor custo",
    },
  ],
  matrizComparacao: [
    {
      grupo: "Projeção e alcance",
      criterio: "Títulos projetados",
      cenA: "468",
      cenB: "284",
      cenC: "132",
      melhor: "A",
    },
    {
      criterio: "Área regularizável (mil ha)",
      cenA: "102",
      cenB: "76,5",
      cenC: "21,2",
      melhor: "A",
    },
    {
      grupo: "Eficiência e custo",
      criterio: "Custo por título (R$)",
      cenA: "R$ 590",
      cenB: "R$ 415",
      cenC: "R$ 402",
      melhor: "C",
    },
    {
      criterio: "Títulos / técnico / dia",
      cenA: "0,95",
      cenB: "1,05",
      cenC: "2,20",
      melhor: "B",
    },
    {
      grupo: "Qualidade e risco",
      criterio: "Índice de viabilidade REURB",
      cenA: "74",
      cenB: "84",
      cenC: "87",
      melhor: "C",
    },
    {
      criterio: "Taxa de conversão (%)",
      cenA: "80",
      cenB: "91",
      cenC: "87",
      melhor: "B",
    },
    {
      criterio: "Processos de alto risco",
      cenA: "34",
      cenB: "11",
      cenC: "8",
      melhor: "B",
      alertaAltoRiscoCenA: true,
    },
    {
      grupo: "Viabilidade operacional",
      criterio: "Logística de campo (0–10)",
      cenA: "6,0",
      cenB: "8,1",
      cenC: "6,9",
      melhor: "B",
    },
    {
      criterio: "Índice de viabilidade geral",
      cenA: "66",
      cenB: "84",
      cenC: "72",
      melhor: "B",
    },
  ],
  graficoComparacaoTitulos: [100, 61, 28],
  graficoComparacaoConversao: [80, 91, 87],
  graficoComparacaoViabilidade: [66, 84, 72],
  pontuacaoCenarios: { A: 3, B: 9, C: 6 },
  textoRecomendacaoComparacao:
    "O Cenário B — Focado equilibra volume de títulos, eficiência operacional, custo por unidade e risco territorial. Mantém a campanha dentro da capacidade da equipe e prioriza glebas com melhor conversão e menor conflito.",
  campanhaAcompMeta: "REURB · 5 municípios · 4 equipes em campo",
  campanhaAcompPctTempo: 61,
  campanhaAcompPctTitulos: 52,
  acompanhamentoTipoFiltroPadrao: "reurb",
  acompColunasRural: [
    "Município / etapa",
    "Protocolo",
    "CTRU",
    "Comissão da Ilha",
    "DATGL",
    "Presidência",
    "Gabinete",
    "Gestão SiCARF",
    "DRF",
    "Jurídico",
    "CAF",
    "Procuradoria Jurídica",
    "DAF",
    "DUF",
    "Divisão Fundiária",
    "CAS",
    "CTT",
  ],
  acompLinhasRural: [
    {
      rotulo: "Açailândia — 3ª etapa",
      valores: [
        48, 47, 46, 45, 44, 43, 42, 40, 26, 34, 32, 30, 28, 25, 22, 18,
      ],
      destaqueIdx: 8,
    },
    {
      rotulo: "Bacabal — 2ª etapa",
      valores: [
        56, 55, 54, 53, 52, 50, 49, 47, 38, 44, 42, 40, 37, 34, 31, 27,
      ],
    },
    {
      rotulo: "Timon — análise",
      valores: [
        40, 39, 38, 37, 36, 35, 34, 32, 24, 29, 27, 25, 23, 21, 18, 15,
      ],
    },
  ],
  acompColunasFinalizados: [
    "Município",
    "Títulos emitidos",
    "Área (ha)",
    "Classificação REURB",
  ],
  acompLinhasFinalizados: [
    { rotulo: "Pedreiras", valores: ["112", "4.200", "REURB"] },
    { rotulo: "Penalva", valores: ["88", "3.050", "Quilombola"] },
  ],
  acompColunasReurb: [
    "Núcleo / gleba",
    "Tipo",
    "Fase REURB",
    "Processos",
    "Observação",
  ],
  acompLinhasReurb: [
    {
      rotulo: "São Luís — núcleo Sul",
      valores: ["REURB", "Elaboração", "48", "Aguardando parecer"],
    },
  ],
  alertasGargalo: [
    {
      nivel: "critico",
      texto: "CDI acumulado em Açailândia — acima do SLA interno",
      valor: "28 proc.",
    },
    {
      nivel: "alerta",
      texto: "Técnico de campo subdimensionado em Timon",
      valor: "10 em fila",
    },
    {
      nivel: "info",
      texto: "Georreferenciamento pendente de validação externa",
      valor: "GIS +16",
    },
    {
      nivel: "ok",
      texto: "Emissão de títulos dentro da meta semanal",
      valor: "54 ok",
    },
  ],
  gargalosSetor: [
    { setor: "Protocolo", pct: 66 },
    { setor: "CTRU", pct: 58 },
    { setor: "CAF", pct: 71 },
    { setor: "Jurídico", pct: 63 },
  ],
  historicoCampanha: [
    { quando: "15/04 09:12", texto: "Gargalo registrado: Açailândia — 3ª etapa" },
    { quando: "14/04 15:40", texto: "Redistribuição: +2 técnicos em Bacabal" },
    { quando: "13/04 10:22", texto: "Parecer favorável — lote GIS 09" },
  ],
  outrasCampanhas: [
    {
      titulo: "Campanha Oeste Maranhense",
      progressoPct: 51,
      resumo: "1.040 proc. · 388 títulos",
      pctTempo: 59,
      pctTitulos: 51,
    },
    {
      titulo: "Campanha Baixada Maranhense",
      progressoPct: 36,
      resumo: "602 proc. · 176 títulos",
      pctTempo: 52,
      pctTitulos: 36,
    },
    {
      titulo: "Campanha Norte Maranhense",
      progressoPct: 47,
      resumo: "780 proc. · 264 títulos",
      pctTempo: 44,
      pctTitulos: 47,
    },
  ],
  acompRodapeTotalCurso: "2.540",
  acompRodapeTitulosEmitidos: "1.118",
  acompRodapeDiasRestantes: "22",
};

export function obterDados(estado: EstadoDemoId): DadosDemonstracao {
  return estado === "MA" ? DADOS_MA : DADOS_PA;
}
