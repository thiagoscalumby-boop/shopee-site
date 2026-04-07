'use client'

import { useState } from "react";

export default function VIP() {
  const [carregando, setCarregando] = useState(false);

  async function pagarAgora() {
    setCarregando(true);

    try {
      const usuario = localStorage.getItem("usuario");
      let email = "cliente@email.com";

      if (usuario) {
        const parsed = JSON.parse(usuario);
        email = parsed.email || "cliente@email.com";
      }

      const res = await fetch("/api/criar-pagamento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        alert(data.error || "Erro ao gerar pagamento");
        setCarregando(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      alert("Não foi possível abrir o pagamento.");
    } catch {
      alert("Erro ao conectar com o pagamento.");
    }

    setCarregando(false);
  }

  function voltar() {
    window.location.href = "/";
  }

  return (
    <div
      style={{
        background: "#111",
        color: "#fff",
        minHeight: "100vh",
        padding: "30px"
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto"
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
          🔥 TSC Achadinhos PRO
        </h1>

        <p style={{ textAlign: "center", color: "#bbb", marginBottom: "30px" }}>
          Tenha acesso completo à ferramenta profissional para afiliados
        </p>

        <div
          style={{
            background: "#1b1b1b",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 0 20px rgba(0,0,0,0.30)"
          }}
        >
          <h2>O que você recebe</h2>

          <ul style={{ lineHeight: "1.9", paddingLeft: "20px" }}>
            <li>Gerador automático de conteúdo</li>
            <li>Preview de vídeo para postagem</li>
            <li>Integração com Shopee preparada</li>
            <li>Botão direto para WhatsApp</li>
            <li>Ferramenta pronta para afiliados</li>
          </ul>

          <div
            style={{
              marginTop: "24px",
              padding: "20px",
              borderRadius: "14px",
              background: "#0f172a"
            }}
          >
            <p style={{ margin: 0, color: "#bbb" }}>Assinatura mensal</p>
            <h1 style={{ color: "#10b981", margin: "10px 0" }}>R$ 19,90</h1>
            <p style={{ margin: 0, color: "#bbb" }}>
              Acesso à ferramenta para criar conteúdo e vender mais rápido
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: "12px",
              marginTop: "24px"
            }}
          >
            <button
              onClick={pagarAgora}
              disabled={carregando}
              style={{
                width: "100%",
                padding: "15px",
                background: "#f59e0b",
                color: "#111",
                border: "none",
                borderRadius: "10px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              {carregando ? "Gerando pagamento..." : "Pagar agora"}
            </button>

            <button
              onClick={voltar}
              style={{
                width: "100%",
                padding: "15px",
                background: "#fff",
                color: "#111",
                border: "none",
                borderRadius: "10px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
