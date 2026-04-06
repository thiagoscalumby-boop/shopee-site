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
        placeholder="Cole seu link da Shopee aqui"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginTop: "20px",
          borderRadius: "8px"
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
