'use client'

import { useState } from "react";

export default function Home() {
  const [link, setLink] = useState("");
  const [resultado, setResultado] = useState("");

  const gerarVideo = () => {
    const texto = `🔥 Oferta incrível!\n\nCompre agora: ${link}\n\nAproveite antes que acabe!`;

    setResultado(texto);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "#111",
      color: "#fff",
      padding: "20px"
    }}>
      <h1>🔥 TSC Shopee Vídeos</h1>

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

      <button
        onClick={gerarVideo}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          borderRadius: "8px",
          background: "orange",
          border: "none"
        }}
      >
        Gerar Conteúdo
      </button>

      {resultado && (
        <textarea
          value={resultado}
          readOnly
          style={{
            marginTop: "20px",
            width: "300px",
            height: "120px",
            borderRadius: "8px",
            padding: "10px"
          }}
        />
      )}
    </div>
  );
}
