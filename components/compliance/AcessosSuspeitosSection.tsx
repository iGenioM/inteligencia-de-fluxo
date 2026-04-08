import { BtnAcao } from "@/components/ui/BtnAcao";
import { Paginacao } from "@/components/ui/Paginacao";
import { PanelCard } from "@/components/ui/PanelCard";
import { Pill } from "@/components/ui/Pill";
import { SecTitle } from "@/components/ui/SecTitle";
import { SubDesc } from "@/components/ui/SubDesc";
import { Tabela, Td } from "@/components/ui/Tabela";
import { DILIGENCIAS_CARTORIAIS } from "@/lib/data/mock";
import { S } from "@/lib/colors";

export function AcessosSuspeitosSection() {
  return (
    <PanelCard>
      <SecTitle>
        Diligências Cartoriais — Monitoramento de Solicitações aos Cartórios
      </SecTitle>
      <SubDesc>
        Solicitações formais da Corregedoria aos cartórios para esclarecimento
        ou correção de irregularidades detectadas nos processos de regularização
        fundiária no estado do Pará.
      </SubDesc>
      <Tabela
        colunas={[
          "ID",
          "Processo",
          "Município",
          "Cartório",
          "Tipo de Diligência",
          "Solicitado Por",
          "Data Abertura",
          "Prazo",
          "Status",
          "Prioridade",
          "Observação",
          "Ações",
        ]}
        linhas={DILIGENCIAS_CARTORIAIS}
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
            <Td className="max-w-[220px] text-sicarf-gray-700">{r.cartorio}</Td>
            <Td>{r.tipo}</Td>
            <Td>{r.solicitadoPor}</Td>
            <Td className="whitespace-nowrap text-sicarf-gray-600">
              {r.dataAbertura}
            </Td>
            <Td
              className={`whitespace-nowrap ${
                r.status === "Atrasada"
                  ? "font-bold text-sicarf-red"
                  : "text-sicarf-gray-700"
              }`}
            >
              {r.dataPrazo}
            </Td>
            <Td>
              <span
                className={`font-semibold ${
                  r.status === "Atrasada"
                    ? "font-bold text-sicarf-red"
                    : r.status === "Pendente"
                      ? "text-sicarf-orange"
                      : r.status === "Concluída"
                        ? "text-sicarf-green"
                        : "text-sicarf-blue"
                }`}
              >
                {r.status}
              </span>
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
            <Td className="max-w-[260px] text-xs text-sicarf-gray-700">
              {r.observacao}
            </Td>
            <Td>
              <BtnAcao />
            </Td>
          </>
        )}
      />
      <Paginacao total={DILIGENCIAS_CARTORIAIS.length} />
    </PanelCard>
  );
}
