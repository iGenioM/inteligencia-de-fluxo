"use client";

import {
  FileText,
  Mail,
  PenTool,
  PenLine,
  Timer,
} from "lucide-react";
import { useState } from "react";
import { Totalizador } from "@/components/ui/Totalizador";
import {
  ASSINATURAS_PENDENTES,
  ANOMALIAS_PRAZO,
  DILIGENCIAS_CARTORIAIS,
  MENSAGENS_COMUNICACAO,
  RETIFICACOES,
} from "@/lib/data/mock";
import { S } from "@/lib/colors";
import { AcessosSuspeitosSection } from "./AcessosSuspeitosSection";
import { AnomaliasPrazoSection } from "./AnomaliasPrazoSection";
import { PrivilegiosSection } from "./PrivilegiosSection";
import { RetificacoesHeatMapPanel } from "./RetificacoesHeatMapPanel";
import { RetificacoesSection } from "./RetificacoesSection";
import { VistoriasFantasmaSection } from "./VistoriasFantasmaSection";

export type ComplianceSecao =
  | "diligencias"
  | "mensagens"
  | "assinaturas"
  | "retificacoes"
  | "prazos";

export function DashCompliance() {
  const [secao, setSecao] = useState<ComplianceSecao>("diligencias");

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-3">
        <Totalizador
          label="Diligências Cartoriais"
          valor={DILIGENCIAS_CARTORIAIS.length}
          badge={`${DILIGENCIAS_CARTORIAIS.filter((d) => d.status === "Atrasada").length} atrasada(s)`}
          icone={<FileText strokeWidth={2} />}
          ativo={secao === "diligencias"}
          onClick={() => setSecao("diligencias")}
        />
        <Totalizador
          label="Central de Comunicação"
          valor={MENSAGENS_COMUNICACAO.length}
          badge={`${MENSAGENS_COMUNICACAO.filter((m) => m.status === "Em atraso").length} em atraso`}
          badgeBg={S.orangeLight}
          badgeColor={S.orange}
          icone={<Mail strokeWidth={2} />}
          ativo={secao === "mensagens"}
          onClick={() => setSecao("mensagens")}
        />
        <Totalizador
          label="Assinaturas Pendentes"
          valor={ASSINATURAS_PENDENTES.length}
          badge={`${ASSINATURAS_PENDENTES.filter((v) => v.status === "Expirado").length} expiradas`}
          badgeBg={S.redLight}
          badgeColor={S.red}
          icone={<PenTool strokeWidth={2} />}
          ativo={secao === "assinaturas"}
          onClick={() => setSecao("assinaturas")}
        />
        <Totalizador
          label="Retificações / Cancelamentos"
          valor={RETIFICACOES.length}
          badge={`${RETIFICACOES.filter((r) => r.risco === "Alto").length} alto risco`}
          icone={<PenLine strokeWidth={2} />}
          ativo={secao === "retificacoes"}
          onClick={() => setSecao("retificacoes")}
        />
        <Totalizador
          label="Anomalias de Prazo"
          valor={ANOMALIAS_PRAZO.length}
          badge="2 críticas"
          badgeBg={S.orangeLight}
          badgeColor={S.orange}
          icone={<Timer strokeWidth={2} />}
          ativo={secao === "prazos"}
          onClick={() => setSecao("prazos")}
        />
      </div>

      {secao === "diligencias" && <AcessosSuspeitosSection />}
      {secao === "mensagens" && <PrivilegiosSection />}
      {secao === "assinaturas" && <VistoriasFantasmaSection />}
      {secao === "retificacoes" && (
        <>
          <RetificacoesHeatMapPanel />
          <RetificacoesSection />
        </>
      )}
      {secao === "prazos" && <AnomaliasPrazoSection />}
    </div>
  );
}
