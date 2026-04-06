'use client'

import { useSearchParams } from "next/navigation";

export default function PreviewVideoPage() {
  const searchParams = useSearchParams();

  const titulo = searchParams.get("titulo") || "Produto em oferta";
  const preco = searchParams.get("preco") || "Preço especial";
  const imagem = searchParams.get("imagem") || "";
  const link = searchParams.get("link") || "";

  const textoWhatsapp = `🔥 ${titulo}

💰 ${preco}

Confira agora:
${link}`;

  const whatsLink = `https://wa.me/?text=${encodeURIComponent(textoWhatsapp)}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#1b1b1b",
          borderRadius: "18px",
          padding: "20px",
          boxShadow: "0 0 20px rgba(0,0,0,0.30)"
        }}
      >
        <div
          style={{
            aspectRatio: "9 / 16",
            background: "#222",
            borderRadius: "16px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div style={{ padding: "14px" }}>
            <div
              style={{
                display: "inline-block",
                background: "#f59e0b",
                color: "#111",
                padding: "6px 10px",
                borderRadius: "999px",
                fontWeight: "bold",
                fontSize: "12px"
              }}
            >
              OFERTA
            </div>
          </div>

          <div style={{ padding: "0 14px" }}>
            {imagem ? (
              <img
                src={imagem}
                alt={titulo}
                style={{
                  width: "100%",
                  maxHeight: "250px",
                  objectFit: "cover",
                  borderRadius: "14px",
                  border: "1px solid #333"
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "250px",
                  borderRadius: "14px",
                  background: "#333",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#bbb"
                }}
              >
                Sem imagem
              </div>
            )}
          </div>

          <div style={{ padding: "16px" }}>
            <h1 style={{ fontSize: "22px", marginBottom: "10px" }}>{titulo}</h1>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#22c55e",
                marginBottom: "12px"
              }}
            >
              {preco}
            </p>
            <p style={{ color: "#ddd", fontSize: "14px", marginBottom: "14px" }}>
              Aproveite essa oferta antes que acabe.
            </p>
            <div
              style={{
                background: "#f59e0b",
                color: "#111",
                textAlign: "center",
                padding: "12px",
                borderRadius: "12px",
                fontWeight: "bold"
              }}
            >
              Clique no link e confira agora
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gap: "10px", marginTop: "16px" }}>
          <a
            href="/video-exemplo.mp4"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              background: "#3b82f6",
              color: "#fff",
              padding: "12px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Baixar vídeo base
          </a>

          <a
            href={whatsLink}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              background: "#25D366",
              color: "#111",
              padding: "12px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Enviar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
