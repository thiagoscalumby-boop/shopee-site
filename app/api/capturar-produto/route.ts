import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { link } = await req.json();

    if (!link) {
      return NextResponse.json({ error: "Link não enviado" }, { status: 400 });
    }

    // 🚨 Simulação por enquanto (depois melhoramos)
    const produto = {
      titulo: "Produto da Shopee (capturado)",
      preco: "R$ 59,90",
      imagem: "https://via.placeholder.com/300"
    };

    return NextResponse.json(produto);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao capturar produto" }, { status: 500 });
  }
}
