# Painel Shopee Afiliado

Este projeto é uma base inicial em Next.js para você colocar no ar um painel simples onde pode:

- colar o link de afiliado da Shopee
- preencher nome e preço do produto
- gerar legenda, hashtags e roteiro curto
- visualizar um preview de vídeo vertical

## Importante

Esta versão é um MVP visual. Ela ainda **não**:

- puxa dados da Shopee automaticamente
- gera MP4 real
- envia automaticamente para WhatsApp

Essas funções podem ser adicionadas na próxima etapa.

## Como usar na Vercel

1. Crie uma conta na Vercel
2. Crie um projeto novo
3. Envie esta pasta zipada ou conecte ao GitHub
4. A Vercel detecta Next.js automaticamente
5. Clique em Deploy

## Como rodar no computador

```bash
npm install
npm run dev
```

Depois abra:

```bash
http://localhost:3000
```

## Estrutura principal

- `app/page.tsx` -> tela principal
- `app/layout.tsx` -> layout base
- `app/globals.css` -> estilos globais

## Próxima fase recomendada

- backend para leitura do link
- integração autorizada com dados do produto
- geração de vídeo com FFmpeg
- banco de dados para histórico
- exportação e download real do vídeo
