'use client'

import { useEffect, useState } from "react";

export default function ConfigPage() {
  const [appId, setAppId] = useState("");
  const [secret, setSecret] = useState("");
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
      window.location.href = "/login";
      return;
    }

    const credenciais = localStorage.getItem("shopee_credenciais");
    if (credenciais) {
      try {
        const dados = JSON.parse(credenciais);
        setAppId(dados.appId || "");
        setSecret(dados.secret || "");
      } catch {}
    }

    setCarregado(true);
  }, []);

  function salvar() {
    localStorage.setItem(
      "shopee_credenciais",
      JSON.stringify({
        appId,
        secret
      })
    );

    alert("Credenciais salvas com sucesso.");
  }

  function sair() {
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  }

  if (!carregado) {
    return null;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          marginTop: "30px"
        }}
      >
        <div
          style={{
            background: "#1b1b1b",
            borderRadius: "18px",
            padding: "24px",
            boxShadow: "0 0 20px rgba(0,0,0,0.30)"
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "8px" }}>
            Configurar Shopee
          </h1>

          <p style={{ textAlign: "center", color: "#bbb", marginBottom: "24px" }}>
            Salve aqui o App ID e o Secret do afiliado
          </p>

          <div style={{ display: "grid", gap: "12px" }}>
            <input
              placeholder="App ID"
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "10px",
                background: "#fff",
                color: "#111",
                border: "1px solid #ccc"
              }}
            />

            <input
              placeholder="Secret"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "10px",
                background: "#fff",
                color: "#111",
                border: "1px solid #ccc"
              }}
            />

            <button
              onClick={salvar}
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                background: "#10b981",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Salvar Credenciais
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                background: "#3b82f6",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Voltar para o painel
            </button>

            <button
              onClick={sair}
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                background: "#fff",
                color: "#111",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
