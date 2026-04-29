import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SICARF — Painel de Inteligência de Fluxo",
  description: "Painel operacional para monitoramento de fluxo, gargalos e simulação",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
