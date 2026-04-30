"use client";

import { MapPinned } from "lucide-react";
import { useId, useState } from "react";
import { useInteligenciaDemo } from "@/components/inteligencia-fundiaria/InteligenciaDemoContext";
import { FormSelect } from "@/components/ui/FormSelect";
import { FormTextInput } from "@/components/ui/FormTextInput";
import { MetricCard } from "@/components/ui/MetricCard";
import { PanelCard } from "@/components/ui/PanelCard";
import { Pill } from "@/components/ui/Pill";
import { SecTitle } from "@/components/ui/SecTitle";
import { S } from "@/lib/colors";
import type {
  AcompanhamentoTabelaLinha,
  AlertaGargaloDemo,
} from "@/lib/mock/inteligencia-fundiaria-dados";

function TagsRitmoCampanha({
  pctTempo,
  pctTitulos,
}: {
  pctTempo: number;
  pctTitulos: number;
}) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      <span className="inline-flex rounded border border-sicarf-gray-200 bg-sicarf-gray-50 px-2 py-0.5 text-[10px] font-semibold tabular-nums text-sicarf-gray-800">
        Cronograma {pctTempo}%
      </span>
      <span className="inline-flex rounded border border-sicarf-gray-200 bg-sicarf-gray-50 px-2 py-0.5 text-[10px] font-semibold tabular-nums text-sicarf-gray-800">
        Títulos {pctTitulos}%
      </span>
    </div>
  );
}

function estiloAlertaGargalo(nivel: AlertaGargaloDemo["nivel"]) {
  if (nivel === "critico") {
    return "border-l-sicarf-red bg-sicarf-red-bg text-sicarf-red";
  }
  if (nivel === "alerta") {
    return "border-l-sicarf-orange bg-sicarf-orange-bg text-sicarf-orange";
  }
  if (nivel === "info") {
    return "border-l-amber-400 bg-amber-50 text-amber-900";
  }
  return "border-l-sicarf-green bg-sicarf-green-light text-sicarf-green-dark";
}

export function StepAcompanhamento() {
  const { dados } = useInteligenciaDemo();
  const idBuscaMunicipio = useId();
  const [expandidaChave, setExpandidaChave] = useState<string>("principal");

  const totalCampanhasAtivas = 1 + dados.outrasCampanhas.length;

  const kpisAcompanhamento = [
    {
      label: "Campanhas ativas",
      valor: String(totalCampanhasAtivas),
    },
    {
      label: "Processos abertos",
      valor: dados.kpiProcessosAbertos,
    },
    {
      label: "Títulos emitidos",
      valor: dados.kpiTitulosEmitidosGeral,
    },
    {
      label: "Gargalos detectados",
      valor: dados.kpiGargalosDetectados,
    },
    {
      label: "Aguardando custas (CRF)",
      valor: dados.kpiAguardandoCustasCrf,
    },
    {
      label: "Taxa de conversão",
      valor: dados.kpiTaxaConversao,
    },
  ] as const;

  function TabelaAcompanhamento({
    titulo,
    tituloClass,
    colunas,
    linhas,
  }: {
    titulo: string;
    tituloClass: string;
    colunas: readonly string[];
    linhas: readonly AcompanhamentoTabelaLinha[];
  }) {
    return (
      <div className="overflow-x-auto rounded-md border border-sicarf-gray-200">
        <div
          className={`px-3 py-2 text-left text-[11px] font-bold uppercase tracking-wide text-white ${tituloClass}`}
        >
          {titulo}
        </div>
        <table className="w-full min-w-[520px] border-collapse text-[11px]">
          <thead>
            <tr className="bg-sicarf-gray-100">
              {colunas.map((c) => (
                <th
                  key={c}
                  className="border-b border-sicarf-gray-200 px-1.5 py-1.5 text-left font-semibold text-sicarf-gray-600"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {linhas.map((linha) => (
              <tr key={linha.rotulo} className="bg-white">
                <td className="border-b border-sicarf-gray-200 px-1.5 py-1.5 font-semibold text-sicarf-gray-800">
                  {linha.rotulo}
                </td>
                {linha.valores.map((v: string | number, i: number) => (
                  <td
                    key={i}
                    className={`border-b border-sicarf-gray-200 px-1.5 py-1.5 tabular-nums ${
                      linha.destaqueIdx === i
                        ? "bg-amber-100 font-semibold text-sicarf-orange"
                        : "text-sicarf-gray-700"
                    }`}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function DetalheCampanhaReurb() {
    return (
      <div className="mt-4 space-y-4 border-t border-sicarf-gray-200 pt-4">
        <TabelaAcompanhamento
          titulo="Processos rurais em andamento"
          tituloClass="bg-sicarf-green-border"
          colunas={dados.acompColunasRural}
          linhas={dados.acompLinhasRural}
        />
        <TabelaAcompanhamento
          titulo="Títulos emitidos — Rurais"
          tituloClass="bg-sicarf-green-dark"
          colunas={dados.acompColunasFinalizados}
          linhas={dados.acompLinhasFinalizados}
        />

        <div>
          <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-sicarf-gray-500">
            Alertas de gargalo e ações recomendadas
          </div>
          <ul className="space-y-2">
            {dados.alertasGargalo.map((a) => (
              <li
                key={a.texto}
                className={`flex items-center justify-between gap-2 rounded border border-sicarf-gray-200 border-l-4 px-3 py-2 text-[11px] ${estiloAlertaGargalo(a.nivel)}`}
              >
                <span className="font-medium">{a.texto}</span>
                <span className="shrink-0 font-bold tabular-nums">
                  {a.valor}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sicarf-gray-200 pt-3 text-[11px]">
          <div className="flex flex-wrap gap-4 text-sicarf-gray-600">
            <span>
              <strong className="text-sicarf-gray-900">
                Total em curso
              </strong>{" "}
              {dados.acompRodapeTotalCurso}
            </span>
            <span>
              <strong className="text-sicarf-gray-900">
                Títulos emitidos
              </strong>{" "}
              {dados.acompRodapeTitulosEmitidos}
            </span>
            <span>
              <strong className="text-sicarf-gray-900">
                Dias restantes
              </strong>{" "}
              {dados.acompRodapeDiasRestantes}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded border border-sicarf-gray-300 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-sicarf-gray-700 hover:bg-sicarf-gray-50"
            >
              Exportar relatório
            </button>
            <button
              type="button"
              className="rounded border border-sicarf-gray-300 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-sicarf-gray-700 hover:bg-sicarf-gray-50"
            >
              Redistribuir processos
            </button>
            <button
              type="button"
              className="rounded bg-sicarf-green px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-sicarf-green-dark"
            >
              Acionar análise em lote
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SecTitle icon={MapPinned}>
        Acompanhamento de campanhas em curso
      </SecTitle>

      <div className="flex flex-wrap items-end gap-2 rounded-md border border-sicarf-gray-200 bg-white px-3 py-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-sicarf-gray-500">
            Ano
          </span>
          <FormSelect
            compact
            className="w-auto min-w-18"
            defaultValue="2025"
            aria-label="Ano da campanha"
          >
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </FormSelect>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-sicarf-gray-500">
            Tipo
          </span>
          <FormSelect
            compact
            className="w-auto min-w-28"
            defaultValue={dados.acompanhamentoTipoFiltroPadrao}
            aria-label="Tipo de processo"
          >
            <option value="nao-oneroso">Não oneroso</option>
            <option value="reurb">Oneroso</option>
            <option value="reurb">REURB</option>
            <option value="todos">Todos</option>
          </FormSelect>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-sicarf-gray-500">
            Status
          </span>
          <FormSelect
            compact
            className="w-auto min-w-28"
            defaultValue="todos"
            aria-label="Status da campanha"
          >
            <option value="todos">Todos</option>
            <option value="andamento">Em andamento</option>
            <option value="concluida">Concluída</option>
          </FormSelect>
        </div>
        <div className="min-w-[160px] flex-1">
          <label className="sr-only" htmlFor={idBuscaMunicipio}>
            Buscar município
          </label>
          <FormTextInput
            id={idBuscaMunicipio}
            placeholder="Buscar município…"
            className="w-full"
          />
        </div>
        <div className="ml-auto flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded border border-sicarf-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-sicarf-gray-700 hover:bg-sicarf-gray-50"
          >
            Exportar tabela
          </button>
          <button
            type="button"
            className="rounded border border-sicarf-green bg-sicarf-green px-3 py-1.5 text-xs font-semibold text-white hover:bg-sicarf-green-dark"
          >
            + Nova campanha
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpisAcompanhamento.map((k) => (
          <MetricCard
            key={k.label}
            value={k.valor}
            label={k.label}
          />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_minmax(260px,300px)]">
        <div className="space-y-4">
          <PanelCard>
            <button
              type="button"
              onClick={() =>
                setExpandidaChave((k) =>
                  k === "principal" ? "" : "principal",
                )
              }
              className="flex w-full flex-col gap-2 text-left"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-sicarf-gray-900">
                  {dados.campanhaAcompTitulo}
                </span>
                <Pill
                  label="Em andamento"
                  bg={S.greenLight}
                  color={S.greenDark}
                />
              </div>
              <p className="text-[11px] text-sicarf-gray-600">
                {dados.campanhaAcompMeta}
              </p>
              <TagsRitmoCampanha
                pctTempo={dados.campanhaAcompPctTempo}
                pctTitulos={dados.campanhaAcompPctTitulos}
              />
            </button>

            {expandidaChave === "principal" ? <DetalheCampanhaReurb /> : null}
          </PanelCard>

          <div className="space-y-2">
            {dados.outrasCampanhas.map((o) => (
              <PanelCard key={o.titulo}>
                <button
                  type="button"
                  onClick={() =>
                    setExpandidaChave((k) => (k === o.titulo ? "" : o.titulo))
                  }
                  className="w-full text-left"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-bold text-sicarf-gray-800">
                      {o.titulo}
                    </span>
                    <span className="text-[11px] text-sicarf-gray-600">
                      {o.resumo}
                    </span>
                  </div>
                  <TagsRitmoCampanha
                    pctTempo={o.pctTempo}
                    pctTitulos={o.pctTitulos}
                  />
                </button>
                {expandidaChave === o.titulo ? <DetalheCampanhaReurb /> : null}
              </PanelCard>
            ))}
          </div>

          <PanelCard>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="size-2.5 shrink-0 rounded-full bg-sicarf-blue" />
              <span className="text-sm font-bold text-sicarf-gray-800">
                {dados.campanhaConcluidaTitulo}
              </span>
              <Pill label="Concluída" bg={S.blueBg} color={S.blue} />
            </div>
            <p className="text-xs text-sicarf-gray-600">
              Títulos emitidos na campanha anterior:{" "}
              <strong>{dados.titulosCampanhaAnterior}</strong>
            </p>
          </PanelCard>
        </div>

        <div className="space-y-4">
          <PanelCard>
            <div className="mb-3 text-xs font-bold uppercase tracking-wide text-sicarf-gray-500">
              Gargalos por setor
            </div>
            <div className="space-y-2.5">
              {dados.gargalosSetor.map((g) => (
                <div key={g.setor}>
                  <div className="mb-1 flex justify-between text-[11px] font-semibold text-sicarf-gray-700">
                    <span>{g.setor}</span>
                    <span>{g.pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-sicarf-gray-200">
                    <div
                      className="h-full rounded-full bg-sicarf-orange"
                      style={{ width: `${g.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </PanelCard>

          <PanelCard>
            <div className="mb-3 text-xs font-bold uppercase tracking-wide text-sicarf-gray-500">
              Histórico recente
            </div>
            <ul className="space-y-3">
              {dados.historicoCampanha.map((h) => (
                <li
                  key={h.quando + h.texto}
                  className="border-l-2 border-sicarf-green pl-2 text-[11px] text-sicarf-gray-700"
                >
                  <div className="font-semibold text-sicarf-gray-800">
                    {h.quando}
                  </div>
                  <div>{h.texto}</div>
                </li>
              ))}
            </ul>
          </PanelCard>

          <PanelCard>
            <div className="mb-3 text-xs font-bold uppercase tracking-wide text-sicarf-gray-500">
              Ações rápidas
            </div>
            <div className="flex flex-col gap-2">
              {[
                "Acionar análise em lote",
                "Redistribuir processos",
                "Notificar setor gargalado",
                "Relatório geral PDF",
              ].map((rotulo) => (
                <button
                  key={rotulo}
                  type="button"
                  className="rounded border border-sicarf-gray-200 bg-sicarf-gray-50 px-3 py-2 text-left text-[11px] font-semibold text-sicarf-gray-800 hover:bg-sicarf-gray-100"
                >
                  {rotulo}
                </button>
              ))}
              <button
                type="button"
                className="rounded bg-sicarf-green px-3 py-2 text-center text-[11px] font-semibold text-white hover:bg-sicarf-green-dark"
              >
                + Nova campanha
              </button>
            </div>
          </PanelCard>
        </div>
      </div>
    </div>
  );
}
