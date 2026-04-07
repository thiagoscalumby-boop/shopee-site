'use client'

import { useEffect } from "react";

export default function Sucesso() {
  useEffect(() => {
    localStorage.setItem("usuario_pro", "true");
  }, []);

  return (
    <div
      style={{
        background: "#111",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        textAlign: "center"
      }}
    >
      <div>
        <h1>✅ Pagamento aprovado com sucesso!</h1>
        <p style={{ marginTop: "12px", color: "#bbb" }}>
          Seu acesso PRO foi liberado neste navegador.
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          style={{
            marginTop: "20px",
            padding: "12px 18px",
            border: "none",
            borderRadius: "10px",
            background: "#10b981",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Ir para o painel
        </button>
      </div>
    </div>
  );
}
