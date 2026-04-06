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

  async function capturarProduto() {
    if (!link) {
      alert("Cole o link primeiro");
      return;
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
    } catch (error) {
      alert("Erro ao conectar com o servidor");
    }
  }

  async function gerarVideoAutomatico() {
    if (!titulo || !preco) {
      alert("Preencha ou capture o produto primeiro");
      return;
    }

    try {
      const res = await fetch("/api/gerar-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          titulo,
          preco,
          imagem
        })
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      alert("Vídeo preparado com sucesso: " + data.videoUrl);
    } catch (error) {
      alert("Erro ao conectar com a API de vídeo");
    }
  }

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
          maxWidth: "900px",
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
            🔥 TSC Shopee Vídeos
          </h1>

          <p style={{ textAlign: "center", color: "#bbb", marginBottom: "24px" }}>
            Painel profissional para conteúdo de afiliado
          </p>

          <div
            style={{
              display: "grid",
              gap: "12px",
              gridTemplateColumns: "1fr"
            }}
          >
            <input
              type="text"
              placeholder="Cole o link do produto"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                background: "#fff",
                color: "#111",
                caretColor: "#111"
              }}
            />

            <input
              type="text"
              placeholder="Nome do produto"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                background: "#fff",
                color: "#111",
                caretColor: "#111"
              }}
            />

            <input
              type="text"
              placeholder="Preço"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                background: "#fff",
                color: "#111",
                caretColor: "#111"
              }}
            />

            <input
              type="text"
              placeholder="Link da imagem do produto"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                background: "#fff",
                color: "#111",
                caretColor: "#111"
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "8px"
              }}
            >
              <button
                onClick={capturarProduto}
                style={{
                  flex: 1,
                  minWidth: "180px",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#10b981",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Capturar Produto
              </button>

              <button
                onClick={gerarConteudo}
                style={{
                  flex: 1,
                  minWidth: "180px",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#f59e0b",
                  color: "#111",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Gerar Conteúdo
              </button>

              <button
                onClick={gerarVideoAutomatico}
                style={{
                  flex: 1,
                  minWidth: "180px",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#3b82f6",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Gerar Vídeo Automático
              </button>

              <button
                onClick={copiarTudo}
                style={{
                  flex: 1,
                  minWidth: "180px",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#fff",
                  color: "#111",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Copiar Conteúdo
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "1fr"
          }}
        >
          <div
            style={{
              background: "#1b1b1b",
              borderRadius: "18px",
              padding: "20px"
            }}
          >
            <h2 style={{ marginBottom: "12px" }}>Informações do produto</h2>
            <p><strong>Plataforma:</strong> {plataforma}</p>
            <p><strong>Nome:</strong> {titulo || "-"}</p>
            <p><strong>Preço:</strong> {preco || "-"}</p>
            <p style={{ wordBreak: "break-all" }}><strong>Link:</strong> {link || "-"}</p>

            {imagem ? (
              <div style={{ marginTop: "16px" }}>
                <img
                  src={imagem}
                  alt="Produto"
                  style={{
                    width: "100%",
                    maxWidth: "260px",
                    borderRadius: "12px",
                    border: "1px solid #333"
                  }}
                />
              </div>
            ) : null}
          </div>

          <div
            style={{
              background: "#1b1b1b",
              borderRadius: "18px",
              padding: "20px"
            }}
          >
            <h2 style={{ marginBottom: "12px" }}>Legenda pronta</h2>
            <textarea
              value={legenda}
              readOnly
              style={{
                width: "100%",
                height: "160px",
                borderRadius: "10px",
                padding: "12px",
                border: "none",
                background: "#fff",
                color: "#111"
              }}
            />
          </div>

          <div
            style={{
              background: "#1b1b1b",
              borderRadius: "18px",
              padding: "20px"
            }}
          >
            <h2 style={{ marginBottom: "12px" }}>Hashtags</h2>
            <textarea
              value={hashtags}
              readOnly
              style={{
                width: "100%",
                height: "80px",
                borderRadius: "10px",
                padding: "12px",
                border: "none",
                background: "#fff",
                color: "#111"
              }}
            />
          </div>

          <div
            style={{
              background: "#1b1b1b",
              borderRadius: "18px",
              padding: "20px"
            }}
          >
            <h2 style={{ marginBottom: "12px" }}>Roteiro do vídeo</h2>
            <textarea
              value={roteiro}
              readOnly
              style={{
                width: "100%",
                height: "220px",
                borderRadius: "10px",
                padding: "12px",
                border: "none",
                background: "#fff",
                color: "#111"
              }}
            />
          </div>

          {whatsLink ? (
            <a
              href={whatsLink}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                background: "#25D366",
                color: "#111",
                padding: "14px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: "bold",
                marginBottom: "30px"
              }}
            >
              Abrir no WhatsApp
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
