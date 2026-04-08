import { BtnAcao } from "@/components/ui/BtnAcao";
import { MetricCard } from "@/components/ui/MetricCard";
import { Paginacao } from "@/components/ui/Paginacao";
import { PanelCard } from "@/components/ui/PanelCard";
import { Pill } from "@/components/ui/Pill";
import { SecTitle } from "@/components/ui/SecTitle";
import { SubDesc } from "@/components/ui/SubDesc";
import { Tabela, Td } from "@/components/ui/Tabela";
import { ASSINATURAS_PENDENTES } from "@/lib/data/mock";
import { S } from "@/lib/colors";

export function VistoriasFantasmaSection() {
  const totalPendencias = ASSINATURAS_PENDENTES.length;
  const expiradas = ASSINATURAS_PENDENTES.filter(
    (v) => v.status === "Expirado",
  ).length;
  const notificados = ASSINATURAS_PENDENTES.filter(
    (v) => v.status === "Notificado",
  ).length;
  const mediaDiasAberto = Math.round(
    ASSINATURAS_PENDENTES.reduce((s, v) => s + v.diasEmAberto, 0) /
      ASSINATURAS_PENDENTES.length,
  );

  return (
    <PanelCard>
      <SecTitle>
        Assinaturas Pendentes — Documentos Aguardando Assinatura Digital
      </SecTitle>
      <SubDesc>
        Este painel lista todos os documentos gerados pelo SICARF que ainda
        aguardam assinatura digital dos responsáveis, com controle de prazo e
        notificações automáticas.
      </SubDesc>

      <div className="mb-[18px] flex gap-3">
        <MetricCard
          value={totalPendencias}
          label="Total de pendências"
          valueClassName="text-sicarf-gray-800"
        />
        <MetricCard
          value={expiradas}
          label="Expiradas"
          valueClassName="text-sicarf-red"
        />
        <MetricCard
          value={notificados}
          label="Notificados"
          valueClassName="text-sicarf-orange"
        />
        <MetricCard
          value={`${mediaDiasAberto} dias`}
          label="Média de dias em aberto"
          valueClassName="text-sicarf-green"
        />
      </div>

      <Tabela
        colunas={[
          "ID",
          "Processo",
          "Município",
          "Documento",
          "Responsável",
          "Cargo / Setor",
          "Data Limite",
          "Dias em Aberto",
          "Notificações Enviadas",
          "Status",
          "Prioridade",
          "Ações",
        ]}
        linhas={ASSINATURAS_PENDENTES}
        renderLinha={(r) => (
          <>
            <Td>
              <span className="font-mono text-[11px] text-sicarf-gray-500">
                {r.id}
              </span>
            </Td>
            <Td>
              <span className="font-mono text-xs">{r.processo}</span>
            </Td>
            <Td>{r.municipio}</Td>
            <Td>{r.documento}</Td>
            <Td>{r.responsavel}</Td>
            <Td>
              <span className="block text-sicarf-gray-700">{r.cargo}</span>
              <span className="text-[11px] text-sicarf-gray-400">{r.setor}</span>
            </Td>
            <Td
              className={`whitespace-nowrap ${
                r.status === "Expirado"
                  ? "font-bold text-sicarf-red"
                  : "text-sicarf-gray-700"
              }`}
            >
              {r.dataLimite}
            </Td>
            <Td>
              <span
                className={`font-bold ${
                  r.diasEmAberto > 10
                    ? "text-sicarf-red"
                    : r.diasEmAberto >= 5
                      ? "text-sicarf-orange"
                      : "text-sicarf-green"
                }`}
              >
                {r.diasEmAberto}
              </span>
            </Td>
            <Td>
              <span className="font-mono text-xs text-sicarf-gray-700">
                {r.tentativasNotificacao}x
              </span>
            </Td>
            <Td>
              <Pill
                label={r.status}
                bg={
                  r.status === "Expirado" || r.status === "Recusado"
                    ? S.redLight
                    : r.status === "Notificado"
                      ? S.orangeLight
                      : S.gray100
                }
                color={
                  r.status === "Expirado" || r.status === "Recusado"
                    ? S.red
                    : r.status === "Notificado"
                      ? S.orange
                      : S.gray500
                }
              />
            </Td>
            <Td>
              <Pill
                label={r.prioridade}
                bg={
                  r.prioridade === "Alta"
                    ? S.red
                    : r.prioridade === "Média"
                      ? S.orange
                      : S.green
                }
              />
            </Td>
            <Td>
              <BtnAcao />
            </Td>
          </>
        )}
      />
      <Paginacao total={ASSINATURAS_PENDENTES.length} />
    </PanelCard>
  );
}
