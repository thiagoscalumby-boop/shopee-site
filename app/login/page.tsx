'use client';
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function fazerLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMensagem("");
    setCarregando(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (error) {
        setMensagem("Erro ao entrar: " + error.message);
      } else {
        setMensagem("Login realizado com sucesso.");
      }
    } catch (err) {
      setMensagem("Erro inesperado ao tentar entrar.");
      console.error(err);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "16px", textAlign: "center" }}>
          Entrar
        </h1>

        <form onSubmit={fazerLogin} style={{ display: "grid", gap: "12px" }}>
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />

          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />

          <button
            type="submit"
            disabled={carregando}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer"
            }}
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {mensagem && (
          <p style={{ marginTop: "16px", textAlign: "center" }}>
            {mensagem}
          </p>
        )}
      </div>
    </main>
  );
}
