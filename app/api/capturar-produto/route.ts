import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const link = body?.link;

    if (!link) {
      return NextResponse.json(
        { error: "Link não enviado" },
        { status: 400 }
      );
    }

    const produto = {
      titulo: "Produto da Shopee (capturado)",
      preco: "R$ 59,90",
      imagem: "https://via.placeholder.com/300",
    };

    return NextResponse.json(produto);
  } catch {
    return NextResponse.json(
      { error: "Erro ao capturar produto" },
      { status: 500 }
    );
  }
}
