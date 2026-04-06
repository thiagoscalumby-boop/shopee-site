import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { titulo, preco, imagem } = await req.json();

    if (!titulo || !preco) {
      return NextResponse.json(
        { error: "Título e preço são obrigatórios" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: "ok",
      mensagem: "Vídeo preparado com sucesso",
      videoUrl: "/video-exemplo.mp4",
      dados: {
        titulo,
        preco,
        imagem: imagem || "",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Erro ao gerar vídeo" },
      { status: 500 }
    );
  }
}
