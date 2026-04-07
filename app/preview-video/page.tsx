'use client'

import { useEffect, useRef } from "react";

export default function PreviewVideo({ searchParams }: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const titulo = searchParams?.titulo || "Produto incrível";
  const preco = searchParams?.preco || "R$ 0,00";
  const imagem = searchParams?.imagem || "";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imagem;

    img.onload = () => {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, 720, 1280);

      ctx.drawImage(img, 60, 100, 600, 600);

      ctx.fillStyle = "#fff";
      ctx.font = "bold 40px Arial";
      ctx.fillText("🔥 OFERTA", 250, 60);

      ctx.font = "bold 30px Arial";
      ctx.fillText(titulo.substring(0, 30), 60, 780);

      ctx.fillStyle = "#00ff88";
      ctx.font = "bold 50px Arial";
      ctx.fillText(preco, 60, 880);

      ctx.fillStyle = "#fff";
      ctx.font = "bold 28px Arial";
      ctx.fillText("Clique no link e aproveite", 120, 1100);
    };
  }, [imagem, titulo, preco]);

  function baixarImagem() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "video-frame.png";
    link.href = canvas.toDataURL();
    link.click();
  }

  return (
    <div style={{ textAlign: "center", background: "#000", minHeight: "100vh", paddingTop: "20px" }}>
      <h1 style={{ color: "#fff" }}>Preview do Vídeo</h1>

      <canvas
        ref={canvasRef}
        width={720}
        height={1280}
        style={{ borderRadius: "10px", marginTop: "20px" }}
      />

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={baixarImagem}
          style={{
            padding: "12px 20px",
            background: "#10b981",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Baixar Imagem do Vídeo
        </button>
      </div>
    </div>
  );
}
