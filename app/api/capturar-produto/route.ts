import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { link } = await req.json();

    if (!link) {
      return NextResponse.json(
        { error: "Link não enviado" },
        { status: 400 }
      );
    }

    // 🔥 busca HTML da página
    const response = await fetch(link, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const html = await response.text();

    // 🔍 tentar extrair dados (simples)
    const tituloMatch = html.match(/<title>(.*?)<\/title>/i);
    const titulo = tituloMatch ? tituloMatch[1] : "Produto Shopee";

    const precoMatch = html.match(/R\$ ?\d+[\d.,]*/);
    const preco = precoMatch ? precoMatch[0] : "Preço não encontrado";

    const imagemMatch = html.match(/https?:\/\/[^"]+\.jpg/);
    const imagem = imagemMatch ? imagemMatch[0] : "";

    return NextResponse.json({
      titulo,
      preco,
      imagem
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao capturar produto real" },
      { status: 500 }
    );
  }
}
