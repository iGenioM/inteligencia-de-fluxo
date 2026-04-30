import { S } from "@/lib/colors";

export type EtapaFluxo = {
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

export type SimCfg = {
  extras: number;
  servidores: number;
  automacao: boolean;
  prioridade: boolean;
};

export const TITULOS_MES_ATUAL = 47;
export const HIST_MESES = ["Nov", "Dez", "Jan", "Fev", "Mar", "Abr", "Mai"];
export const HIST_TITULOS = [31, 28, 19, 34, 41, 52, 47];
export const HIST_ENTRADAS = [142, 98, 201, 178, 165, 193, 187];

export const COR_SETOR: Record<string, string> = {
  CCAT: S.blue,
  CCGEO: S.orange,
  CRF: S.red,
  DIPRE: "#805AD5",
  DIROT: S.green,
  Jurídico: "#0D9488",
  Governo: S.gray500,
};

export const ETAPAS_FLUXO: EtapaFluxo[] = [
  {
    num: 1,
    setor: "CCAT",
    label: "Análise documental e emissão de custas",
    em: 236, // FEITO
    parado30: 38,
    entMes: 132,
    saiMes: 162,
    serv: 8,
    capMes: 175,
    tempoD: 6,
  },
  {
    num: 2,
    setor: "CCGEO",
    label: "Análise preliminar",
    em: 277, // FEITO
    parado30: 186,
    entMes: 162,
    saiMes: 118,
    serv: 4,
    capMes: 130,
    tempoD: 7
  },
  {
    num: 3,
    setor: "CRF",
    label: "Viagem a campo e emissão de custas/VTN",
    em: 573, // FEITO
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
    em: 293,
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
    em: 0,
    parado30: 0,
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
    em: 0,
    parado30: 0,
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
    em: 47,
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
    em: 29,
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
    em: 0,
    parado30: 0,
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
    em: 2,
    parado30: 0,
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
    em: 0,
    parado30: 0,
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
    em: 0,
    parado30: 0,
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
    em: 0,
    parado30: 0,
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
    em: 19,
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
    em: 15,
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
    em: 35,
    parado30: 0,
    entMes: 18,
    saiMes: 47,
    serv: 2,
    capMes: 60,
    tempoD: 1,
  },
];

export const MUNICIPIOS_FLUXO = [
  { nome: "Macapá", total: 636, parados: 71 },
  { nome: "Santana", total: 114, parados: 6 },
  { nome: "Porto Grande", total: 273, parados: 71 },
  { nome: "Mazagão", total: 114, parados: 36 },
  { nome: "Laranjal do Jarí", total: 7, parados: 1 },
  { nome: "Tartarugalzinho", total: 198, parados: 49 },
  { nome: "Oiapoque", total: 236, parados: 25 },
  { nome: "Ferreira Gomes", total: 217, parados: 37 },
  { nome: "Amapá", total: 138, parados: 36 },
  { nome: "Calçoene", total: 141, parados: 18 },
  { nome: "Cutias", total: 153, parados: 19 },
  { nome: "Pedra Branca", total: 137, parados: 11 },
  { nome: "Serra do Navio", total: 47, parados: 5 },
  { nome: "Pracuúba", total: 74, parados: 15 },
  { nome: "Itaubal", total: 99, parados: 7 },
  { nome: "Vitória do Jarí", total: 31, parados: 0 },
];
