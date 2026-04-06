'use client'

import { useState } from "react";

function detectarPlataforma(link: string) {
  const l = link.toLowerCase();

  if (l.includes("shopee")) return "Shopee";
  if (l.includes("amazon")) return "Amazon";
  if (l.includes("mercadolivre")) return "Mercado Livre";
  if (l.includes("aliexpress")) return "AliExpress";

  return "Produto";
}

export default function Home() {
  const [link, setLink] = useState("");
  const [titulo, setTitulo] = useState("");
  const [preco, setPreco] = useState("");
  const [resultado, setResultado] = useState("");
  const [whatsLink, setWhatsLink] = useState("");

  function gerarConteudo() {
    const plataforma = detectarPlataforma(link);
    const nomeFinal = titulo || `${plataforma} em oferta`;
    const precoFinal = preco || "preço especial";

    const texto = `🔥 ${nomeFinal}

💰 ${precoFinal}

Encontrei esse achadinho que pode valer muito a pena.
Confira agora antes que a oferta mude.

👉 Link:
${link}

#oferta #promocao #achadinhos #afiliado #compras`;

    setResultado(texto);
    setWhatsLink(`https://wa.me/?text=${encodeURIComponent(texto)}`);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#1b1b1b",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)"
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          🔥 TSC Shopee Vídeos
        </h1>

        <input
          type="text"
          placeholder="Cole o link do produto"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "12px",
            background: "#fff",
            color: "#111",
            caretColor: "#111"
          }}
        />

        <input
          type="text"
          placeholder="Nome do produto"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "12px",
            background: "#fff",
            color: "#111",
            caretColor: "#111"
          }}
        />

        <input
          type="text"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "16px",
            background: "#fff",
            color: "#111",
            caretColor: "#111"
          }}
        />

        <button
          onClick={gerarConteudo}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "#f59e0b",
            color: "#111",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Gerar Conteúdo
        </button>

        {resultado && (
          <>
            <textarea
              value={resultado}
              readOnly
              style={{
                width: "100%",
                height: "180px",
                marginTop: "18px",
                borderRadius: "10px",
                padding: "12px",
                border: "none",
                background: "#fff",
                color: "#111"
              }}
            />

            <a
              href={whatsLink}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                marginTop: "12px",
                background: "#25D366",
                color: "#111",
                padding: "12px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "bold"
              }}
            >
              Abrir no WhatsApp
            </a>
          </>
        )}
      </div>
    </div>
  );
}
