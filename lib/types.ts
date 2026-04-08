/** Navegação principal na sidebar */
export type AppMainNavId = "compliance" | "cartorios";

export type RiscoNivel = "Alto" | "Médio" | "Crítico";

export interface DiligenciaCartorial {
  id: string;
  processo: string;
  municipio: string;
  cartorio: string;
  tipo:
    | "Retificação de Matrícula"
    | "Cancelamento de Registro"
    | "Alteração de Titular"
    | "Averbação Suspeita";
  solicitadoPor: string;
  dataAbertura: string;
  dataPrazo: string;
  status: "Pendente" | "Em andamento" | "Concluída" | "Atrasada";
  prioridade: "Alta" | "Média" | "Baixa";
  observacao: string;
}

export interface MensagemComunicacao {
  id: string;
  numero: string;
  processo: string;
  municipio: string;
  cartorio: string;
  tipoMensagem:
    | "Legitimidade de título"
    | "Liberação de condições resolutivas"
    | "Cancelamento de registro"
    | "Outros";
  remetente: string;
  destinatario: string;
  dataEnvio: string;
  prazoResposta: string;
  status: "Aguardando resposta" | "Finalizada" | "Em atraso";
  assunto: string;
}

export interface AssinaturaPendente {
  id: string;
  processo: string;
  municipio: string;
  documento:
    | "Laudo de Vistoria"
    | "Portaria de Titulação"
    | "Termo de Concessão"
    | "Auto de Demarcação";
  responsavel: string;
  cargo: string;
  setor: string;
  dataLimite: string;
  diasEmAberto: number;
  tentativasNotificacao: number;
  status: "Pendente" | "Notificado" | "Recusado" | "Expirado";
  prioridade: "Alta" | "Média" | "Baixa";
}

export interface Retificacao {
  processo: string;
  municipio: string;
  campo: string;
  de: string;
  para: string;
  responsavel: string;
  data: string;
  hora: string;
  risco: "Alto" | "Médio";
}

export interface AnomaliaPrazo {
  processo: string;
  municipio: string;
  responsavel: string;
  setor: string;
  tipo: string;
  padrao: string;
  real: string;
  desvio: number;
  indicativo: string;
}

export type TipoIntegracao = "api" | "ia" | "nao";

export interface Cartorio {
  municipio: string;
  nome: string;
  tipo: TipoIntegracao;
  sla: number | null;
  alertas: number;
  ultimaSync: string | null;
  chamadas: number;
}

export interface AuditLogEntry {
  ts: string;
  cartorio: string;
  metodo: string;
  processo: string;
  status: string;
  obs: string;
}

export interface MalhaFinaItem {
  municipio: string;
  cartorio: string;
  tipo: string;
  processo: string;
  sicarf: string;
  cartorioVal: string;
  risco: "Alto" | "Médio";
  status: "Pendente" | "Em análise";
}

export interface IaAgentLogEntry {
  ts: string;
  cartorio: string;
  processo: string;
  leu: string;
  preencheu: string;
  ok: boolean;
}

export interface MunicipioIbge {
  id: number;
  nome: string;
}
