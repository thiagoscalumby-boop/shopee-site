'use client'

import { useState } from "react";

export default function Home() {
  const [link, setLink] = useState("");

  const gerarVideo = () => {
    alert("Em breve o sistema vai gerar vídeo automático para: " + link);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "#111",
      color: "#fff"
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
        Gerar Vídeo
      </button>
    </div>
  );
}
