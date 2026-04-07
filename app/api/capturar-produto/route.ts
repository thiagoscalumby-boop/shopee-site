import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const link = body?.link?.trim();
    const appId = body?.appId?.trim();
    const secret = body?.secret?.trim();

    if (!link) {
      return NextResponse.json(
        { error: "Link não enviado" },
        { status: 400 }
      );
    }

    if (!appId || !secret) {
      return NextResponse.json(
        { error: "Configure seu App ID e Secret primeiro." },
        { status: 400 }
      );
    }

    // Simulação preparada para futura integração real da Shopee API
    return NextResponse.json({
      titulo: "Produto Shopee (API preparada)",
      preco: "R$ 99,90",
      imagem: "https://via.placeholder.com/300",
      aviso: "API preparada. Quando você tiver credenciais válidas e endpoint oficial, conectamos a busca real.",
      modo: "api-preparada"
    });
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar captura do produto." },
      { status: 500 }
    );
  }
}
