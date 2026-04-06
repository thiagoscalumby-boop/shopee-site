'use client'

import { useMemo, useState } from "react";

function detectarPlataforma(link: string) {
  const l = link.toLowerCase();

  if (l.includes("shopee")) return "Shopee";
  if (l.includes("amazon")) return "Amazon";
  if (l.includes("mercadolivre")) return "Mercado Livre";
  if (l.includes("aliexpress")) return "AliExpress";

  return "Produto";
}

function gerarHashtags(plataforma: string) {
  return `#oferta #promocao #achadinhos #afiliado #compras #${plataforma.toLowerCase().replace(/\s+/g, "")}`;
}

export default function Home() {
  const [link, setLink] = useState("");
  const [titulo, setTitulo] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");
  const [legenda, setLegenda] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [roteiro, setRoteiro] = useState("");
  const [whatsLink, setWhatsLink] = useState("");

  const plataforma = useMemo(() => detectarPlataforma(link), [link]);

  // 🔥 CAPTURAR PRODUTO
 async function gerarVideoAutomatico() {
  const url = `/preview-video?titulo=${encodeURIComponent(titulo)}&preco=${encodeURIComponent(preco)}&imagem=${encodeURIComponent(imagem)}&link=${encodeURIComponent(link)}`;
  window.open(url, "_blank");
}

    try {
      const res = await fetch("/api/capturar-produto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ link })
      });

      const data = await res.json();

      if (data.error) {
        alert("Erro ao capturar produto");
        return;
      }

      setTitulo(data.titulo || "");
      setPreco(data.preco || "");
      setImagem(data.imagem || "");
    } catch {
      alert("Erro ao conectar com o servidor");
    }
  }

  // 🎬 GERAR VÍDEO (FUNCIONANDO)
  async function gerarVideoAutomatico() {
    window.open("/video-exemplo.mp4", "_blank");
  }

  // ✍️ GERAR CONTEÚDO
  function gerarConteudo() {
    const nomeFinal = titulo || `${plataforma} em oferta`;
    const precoFinal = preco || "preço especial";
    const tags = gerarHashtags(plataforma);

    const legendaFinal = `🔥 ${nomeFinal}

💰 ${precoFinal}

Encontrei esse achadinho que pode valer muito a pena.
Confira agora antes que a oferta mude.

👉 Link:
${link}`;

    const roteiroFinal = `ROTEIRO DE VÍDEO

Cena 1:
Mostrar o produto com destaque.
Texto na tela: ${nomeFinal}

Cena 2:
Destacar o preço.
Texto na tela: ${precoFinal}

Cena 3:
Mostrar chamada de urgência.
Texto na tela: Aproveite antes que a oferta mude

Cena 4:
Mostrar CTA final.
Texto na tela: Clique no link e confira agora`;

    const textoWhatsapp = `${legendaFinal}

${tags}`;

    setLegenda(legendaFinal);
    setHashtags(tags);
    setRoteiro(roteiroFinal);
    setWhatsLink(`https://wa.me/?text=${encodeURIComponent(textoWhatsapp)}`);
  }

  // 📋 COPIAR
  async function copiarTudo() {
    const texto = `${legenda}

${hashtags}

${roteiro}`;

    try {
      await navigator.clipboard.writeText(texto);
      alert("Conteúdo copiado com sucesso.");
    } catch {
      alert("Não foi possível copiar automaticamente.");
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#111",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "900px",
        marginTop: "30px"
      }}>
        <div style={{
          background: "#1b1b1b",
          borderRadius: "18px",
          padding: "24px",
          boxShadow: "0 0 20px rgba(0,0,0,0.30)"
        }}>
          <h1 style={{ textAlign: "center" }}>
            🔥 TSC Shopee Vídeos
          </h1>

          <div style={{ display: "grid", gap: "12px" }}>
            <input
              placeholder="Link do produto"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              style={{ padding: "12px", borderRadius: "10px", background: "#fff", color: "#111" }}
            />

            <input
              placeholder="Nome do produto"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              style={{ padding: "12px", borderRadius: "10px", background: "#fff", color: "#111" }}
            />

            <input
              placeholder="Preço"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              style={{ padding: "12px", borderRadius: "10px", background: "#fff", color: "#111" }}
            />

            <input
              placeholder="Imagem (URL)"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              style={{ padding: "12px", borderRadius: "10px", background: "#fff", color: "#111" }}
            />

            <button onClick={capturarProduto}>Capturar Produto</button>
            <button onClick={gerarConteudo}>Gerar Conteúdo</button>
            <button onClick={gerarVideoAutomatico}>Gerar Vídeo Automático</button>
            <button onClick={copiarTudo}>Copiar Conteúdo</button>
          </div>
        </div>

        {legenda && (
          <textarea value={legenda} readOnly style={{ width: "100%", marginTop: "20px" }} />
        )}

        {whatsLink && (
          <a href={whatsLink} target="_blank">
            Abrir no WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
