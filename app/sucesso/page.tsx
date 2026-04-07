'use client'

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Sucesso() {
  const [status, setStatus] = useState("Liberando acesso PRO...");

  useEffect(() => {
    async function liberarPro() {
      try {
        const usuarioSalvo = localStorage.getItem("usuario");

        if (!usuarioSalvo) {
          setStatus("Não encontrei o usuário logado.");
          return;
        }

        const usuario = JSON.parse(usuarioSalvo);
        const email = usuario?.email?.trim()?.toLowerCase();

        if (!email) {
          setStatus("Email do usuário não encontrado.");
          return;
        }

        const { error } = await supabase
          .from("usuarios")
          .update({ pro: true })
          .eq("email", email);

        if (error) {
          setStatus("Erro ao liberar acesso PRO.");
          return;
        }

        localStorage.setItem("usuario_pro", "true");
        setStatus("Seu acesso PRO foi liberado com sucesso.");
      } catch {
        setStatus("Erro ao finalizar liberação PRO.");
      }
    }

    liberarPro();
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
        <p style={{ marginTop: "12px", color: "#bbb" }}>{status}</p>

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
