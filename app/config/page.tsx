'use client'

import { useState, useEffect } from "react";

export default function Config() {
  const [appId, setAppId] = useState("");
  const [secret, setSecret] = useState("");

  useEffect(() => {
    const dados = localStorage.getItem("shopee");
    if (dados) {
      const json = JSON.parse(dados);
      setAppId(json.appId || "");
      setSecret(json.secret || "");
    }
  }, []);

  function salvar() {
    localStorage.setItem(
      "shopee",
      JSON.stringify({ appId, secret })
    );

    alert("Credenciais salvas!");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Configurar Shopee</h1>

      <input
        placeholder="App ID"
        value={appId}
        onChange={(e) => setAppId(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        placeholder="Secret"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <button onClick={salvar}>Salvar</button>
    </div>
  );
}
