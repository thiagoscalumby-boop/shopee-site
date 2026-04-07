'use client'

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function entrar() {
    if (!email || !senha) {
      alert("Preencha email e senha.");
      return;
    }

    const usuario = { email, senha };
    localStorage.setItem("usuario", JSON.stringify(usuario));
    window.location.href = "/";
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
          borderRadius: "18px",
          padding: "24px",
          boxShadow: "0 0 20px rgba(0,0,0,0.30)"
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "8px" }}>
          Login
        </h1>

        <p style={{ textAlign: "center", color: "#bbb", marginBottom: "24px" }}>
          Entre para usar a ferramenta
        </p>

        <div style={{ display: "grid", gap: "12px" }}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "10px",
              background: "#fff",
              color: "#111",
              border: "1px solid #ccc"
            }}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "10px",
              background: "#fff",
              color: "#111",
              border: "1px solid #ccc"
            }}
          />

          <button
            onClick={entrar}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              background: "#f59e0b",
              color: "#111",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
