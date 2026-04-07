# SICARF — Corregedoria

Painel web (Next.js) para dashboard de compliance e gestão/monitoramento de cartórios, com login por CPF e mapa de calor dos municípios do Pará (malhas IBGE).

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Leaflet / react-leaflet (mapa)

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). O acesso redireciona para `/login`; use qualquer CPF com 11 dígitos e uma senha não vazia (autenticação mock).

## Build

```bash
npm run build
npm start
```

## Licença

Uso interno / conforme política da organização.
