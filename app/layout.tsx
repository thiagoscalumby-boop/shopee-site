import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Painel Shopee Afiliado',
  description: 'Sistema inicial para gerar roteiro, legenda e estrutura de vídeo a partir de links de afiliado da Shopee.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
