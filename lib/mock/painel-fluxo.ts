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

export const MUNICIPIOS_FLUXO = [
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
