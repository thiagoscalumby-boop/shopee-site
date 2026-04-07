'use client'

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function entrar() {
    if (!email || !senha) {
      alert("Preencha tudo");
      return;
    }

    const user = {
      email,
      senha,
    };

    localStorage.setItem("usuario", JSON.stringify(user));

    alert("Login realizado");
    window.location.href = "/";
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        placeholder="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <button onClick={entrar}>Entrar</button>
    </div>
  );
}
