import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const link = body?.link;
    const appId = body?.appId;
    const secret = body?.secret;

    if (!link) {
      return NextResponse.json(
        { error: "Link não enviado" },
        { status: 400 }
      );
    }

    if (!appId || !secret) {
      return NextResponse.json({
        error: "Configure seu App ID e Secret na página de configurações."
      });
    }

    // 🔥 SIMULAÇÃO PROFISSIONAL (base para API real)

    const titulo = "Produto Shopee (API futura)";
    const preco = "R$ 99,90";
    const imagem =
      "https://down-br.img.susercontent.com/file/sg-11134201-22100-xxxx";

    return NextResponse.json({
      titulo,
      preco,
      imagem,
      modo: "api-preparada"
    });
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar" },
      { status: 500 }
    );
  }
}
