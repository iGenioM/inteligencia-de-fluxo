"use client";

import type { Feature, FeatureCollection } from "geojson";
import L from "leaflet";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GeoJSON, MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type MunicipioDado = {
  nome: string;
  total: number;
  parados: number;
};

const AP_MUNICIPIOS_GEOJSON_URL =
  "https://servicodados.ibge.gov.br/api/v4/malhas/estados/16?formato=application/vnd.geo+json&intrarregiao=municipio&qualidade=minima";
const AP_MUNICIPIOS_API_URL =
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados/16/municipios";

function normalizarNome(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function corPorPercentual(percentual: number): string {
  if (percentual > 40) return "#fc8181";
  if (percentual > 20) return "#f6ad55";
  return "#68d391";
}

function FitBounds({ data }: { data: FeatureCollection }) {
  const map = useMap();
  useEffect(() => {
    const layer = L.geoJSON(data);
    const bounds = layer.getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [20, 20], maxZoom: 9 });
    }
  }, [data, map]);
  return null;
}

export function AmapaMunicipiosMap({ dados }: { dados: MunicipioDado[] }) {
  const [collection, setCollection] = useState<FeatureCollection | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const dadosMap = useMemo(
    () =>
      new Map(
        dados.map((m) => [
          normalizarNome(m.nome),
          { total: m.total, parados: m.parados },
        ]),
      ),
    [dados],
  );

  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const [geoRes, munRes] = await Promise.all([
          fetch(AP_MUNICIPIOS_GEOJSON_URL),
          fetch(AP_MUNICIPIOS_API_URL),
        ]);
        if (!geoRes.ok || !munRes.ok) {
          throw new Error("Não foi possível carregar as malhas do Amapá.");
        }
        const geo = (await geoRes.json()) as FeatureCollection;
        const municipios = (await munRes.json()) as { id: number; nome: string }[];
        const codToNome = new Map(municipios.map((m) => [String(m.id), m.nome]));

        const enriquecida: FeatureCollection = {
          type: "FeatureCollection",
          features: geo.features.map((f) => {
            const cod = String(
              (f.properties as Record<string, unknown> | undefined)?.codarea ?? "",
            );
            const nome = codToNome.get(cod) ?? `Cód. ${cod}`;
            const dado = dadosMap.get(normalizarNome(nome));
            const total = dado?.total ?? 0;
            const parados = dado?.parados ?? 0;
            const percentual = total > 0 ? Math.round((parados / total) * 100) : 0;
            return {
              ...f,
              properties: {
                ...(f.properties as object),
                nome,
                total,
                parados,
                percentual,
              },
            };
          }),
        };

        if (!cancelado) setCollection(enriquecida);
      } catch (e) {
        if (!cancelado) {
          setErro(
            e instanceof Error ? e.message : "Erro ao carregar mapa do Amapá.",
          );
        }
      }
    })();
    return () => {
      cancelado = true;
    };
  }, [dadosMap]);

  const styleFn = useCallback((feature: Feature | undefined) => {
    const props = (feature?.properties as { percentual?: number } | undefined) ?? {};
    const cor = corPorPercentual(props.percentual ?? 0);
    return {
      fillColor: cor,
      fillOpacity: 0.55,
      color: "#a0aec0",
      weight: 0.8,
    };
  }, []);

  const onEach = useCallback(
    (feature: Feature, layer: L.Layer) => {
      const path = layer as L.Path;
      const props = feature.properties as {
        nome: string;
        total: number;
        parados: number;
        percentual: number;
      };
      const base = styleFn(feature);
      path.bindPopup(
        `<div style="font-family:system-ui,sans-serif;font-size:13px;line-height:1.45">
          <strong>${props.nome}</strong><br/>
          Total de processos: <strong>${props.total}</strong><br/>
          Parados +30d: <strong>${props.parados}</strong><br/>
          % parado: <strong>${props.percentual}%</strong>
        </div>`,
      );
      path.on("mouseover", () => {
        path.setStyle({ ...base, weight: 2, color: "#1a9e6e" });
      });
      path.on("mouseout", () => {
        path.setStyle(base);
      });
    },
    [styleFn],
  );

  if (erro) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-md border border-sicarf-gray-200 bg-sicarf-gray-50 px-4 text-center text-sm text-sicarf-red">
        {erro}
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-[420px] animate-pulse rounded-md border border-sicarf-gray-200 bg-sicarf-gray-100" />
    );
  }

  return (
    <div className="space-y-2">
      <div className="relative z-0 h-[min(52vh,480px)] min-h-[360px] w-full overflow-hidden rounded-md border border-sicarf-gray-200">
        <MapContainer center={[1.5, -51.3]} zoom={7} className="size-full" scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · Malhas IBGE'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds data={collection} />
          <GeoJSON
            data={collection}
            style={(feat) => styleFn(feat as Feature)}
            onEachFeature={(feat, layer) => onEach(feat as Feature, layer)}
          />
        </MapContainer>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-[11px] text-sicarf-gray-600">
        <span className="font-semibold text-sicarf-gray-700">Legenda:</span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block size-3 rounded-sm border border-sicarf-gray-200 bg-[#68d391]" />
          &lt;20% parados
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block size-3 rounded-sm border border-sicarf-gray-200 bg-[#f6ad55]" />
          20-40%
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block size-3 rounded-sm border border-sicarf-gray-200 bg-[#fc8181]" />
          &gt;40%
        </span>
      </div>
    </div>
  );
}
