import { BtnAcao } from "@/components/ui/BtnAcao";
import { MetricCard } from "@/components/ui/MetricCard";
import { Paginacao } from "@/components/ui/Paginacao";
import { PanelCard } from "@/components/ui/PanelCard";
import { Pill } from "@/components/ui/Pill";
import { SecTitle } from "@/components/ui/SecTitle";
import { SubDesc } from "@/components/ui/SubDesc";
import { Tabela, Td } from "@/components/ui/Tabela";
import { MENSAGENS_COMUNICACAO } from "@/lib/data/mock";
import { S } from "@/lib/colors";

export function PrivilegiosSection() {
  const total = MENSAGENS_COMUNICACAO.length;
  const aguardando = MENSAGENS_COMUNICACAO.filter(
    (m) => m.status === "Aguardando resposta",
  ).length;
  const emAtraso = MENSAGENS_COMUNICACAO.filter(
    (m) => m.status === "Em atraso",
  ).length;

  return (
    <PanelCard>
      <SecTitle>
        Central de Comunicação — Mensagens entre Corregedoria e Cartórios
      </SecTitle>
      <SubDesc>
        Este painel centraliza todas as comunicações formais trocadas entre a
        Corregedoria e os cartórios do estado, permitindo rastreabilidade
        completa das tratativas sobre processos de regularização fundiária.
      </SubDesc>
      <div className="mb-[18px] flex gap-3">
        <MetricCard
          value={total}
          label="Total de mensagens"
          valueClassName="text-sicarf-gray-800"
          className="px-3.5 py-2.5"
          centered={false}
        />
        <MetricCard
          value={aguardando}
          label="Aguardando resposta"
          valueClassName="text-sicarf-orange"
          className="px-3.5 py-2.5"
          centered={false}
        />
        <MetricCard
          value={emAtraso}
          label="Em atraso"
          valueClassName="text-sicarf-red"
          className="px-3.5 py-2.5"
          centered={false}
        />
      </div>
      <Tabela
        colunas={[
          "Nº Mensagem",
          "Processo",
          "Município",
          "Cartório",
          "Tipo de Mensagem",
          "Remetente",
          "Destinatário",
          "Data Envio",
          "Prazo Resposta",
          "Status",
          "Ações",
        ]}
        linhas={MENSAGENS_COMUNICACAO}
        renderLinha={(r) => (
          <>
            <Td>
              <span className="font-mono text-[11px] text-sicarf-gray-500">
                {r.numero}
              </span>
            </Td>
            <Td>
              <span className="font-mono text-xs">{r.processo}</span>
            </Td>
            <Td>{r.municipio}</Td>
            <Td className="max-w-[220px] text-sicarf-gray-700">{r.cartorio}</Td>
            <Td>{r.tipoMensagem}</Td>
            <Td>{r.remetente}</Td>
            <Td>{r.destinatario}</Td>
            <Td className="whitespace-nowrap">{r.dataEnvio}</Td>
            <Td>
              <span
                className={`${
                  r.status === "Em atraso"
                    ? "font-bold text-sicarf-red"
                    : "text-sicarf-gray-700"
                }`}
              >
                {r.prazoResposta}
              </span>
            </Td>
            <Td>
              <Pill
                label={r.status}
                bg={
                  r.status === "Em atraso"
                    ? S.redLight
                    : r.status === "Aguardando resposta"
                      ? S.orangeLight
                      : S.greenLight
                }
                color={
                  r.status === "Em atraso"
                    ? S.red
                    : r.status === "Aguardando resposta"
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
      <Paginacao total={MENSAGENS_COMUNICACAO.length} />
    </PanelCard>
  );
}
