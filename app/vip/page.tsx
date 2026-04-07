'use client'

export default function VIP() {
  return (
    <div style={{ background: "#111", color: "#fff", minHeight: "100vh", padding: "30px" }}>
      <h1 style={{ textAlign: "center" }}>🔥 TSC Achadinhos PRO</h1>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Gere vídeos automáticos e venda mais como afiliado
      </p>

      <div style={{
        background: "#1b1b1b",
        padding: "20px",
        borderRadius: "15px",
        marginTop: "30px"
      }}>
        <h2>O que você recebe:</h2>

        <ul>
          <li>✔ Gerador automático de conteúdo</li>
          <li>✔ Vídeos prontos para postar</li>
          <li>✔ Integração com Shopee (em breve)</li>
          <li>✔ Botão direto para WhatsApp</li>
        </ul>

        <h2 style={{ marginTop: "20px" }}>Preço:</h2>
        <h1 style={{ color: "#10b981" }}>R$ 19,90 / mês</h1>

        <button
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "15px",
            background: "#f59e0b",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Quero Acessar Agora
        </button>
      </div>
    </div>
  );
}
