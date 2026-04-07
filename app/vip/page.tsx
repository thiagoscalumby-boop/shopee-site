'use client'

export default function VIP() {
  const linkPagamento = "https://mpago.la/1eriRMQ";

  function comprarAgora() {
    window.open(linkPagamento, "_blank");
  }

  function falarWhatsapp() {
    const texto = encodeURIComponent(
      "Olá! Quero assinar o TSC Achadinhos PRO."
    );
    window.open(`https://wa.me/?text=${texto}`, "_blank");
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
          Gere conteúdo automático e aumente suas vendas como afiliado
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
              Acesso à ferramenta para criar conteúdo e vendas mais rápido
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
              onClick={comprarAgora}
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
              Quero assinar agora
            </button>

            <button
              onClick={falarWhatsapp}
              style={{
                width: "100%",
                padding: "15px",
                background: "#25D366",
                color: "#111",
                border: "none",
                borderRadius: "10px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Falar no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
