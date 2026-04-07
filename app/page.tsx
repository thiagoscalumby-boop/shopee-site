'use client'

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

function detectarPlataforma(link: string) {
  const l = link.toLowerCase();

  if (l.includes("shopee")) return "Shopee";
  if (l.includes("amazon")) return "Amazon";
  if (l.includes("mercadolivre")) return "Mercado Livre";
  if (l.includes("aliexpress")) return "AliExpress";

  return "Produto";
}

function gerarHashtags(plataforma: string) {
  return `#oferta #promocao #achadinhos #afiliado #compras #${plataforma
    .toLowerCase()
    .replace(/\s+/g, "")}`;
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
  const [carregado, setCarregado] = useState(false);
  const [pro, setPro] = useState(false);

  useEffect(() => {
    async function carregarUsuario() {
      const usuarioSalvo = localStorage.getItem("usuario");

      if (!usuarioSalvo) {
        window.location.href = "/login";
        return;
      }

      try {
        const usuario = JSON.parse(usuarioSalvo);
        const email = usuario?.email?.trim().toLowerCase();

        if (!email) {
          window.location.href = "/login";
          return;
        }

        const { data, error } = await supabase
          .from("usuarios")
          .select("pro")
          .eq("email", email)
          .single();

        if (!error && data) {
          setPro(!!data.pro);
          localStorage.setItem("usuario_pro", data.pro ? "true" : "false");
        } else {
          const usuarioPro = localStorage.getItem("usuario_pro");
          setPro(usuarioPro === "true");
        }

        setCarregado(true);
      } catch {
        window.location.href = "/login";
      }
    }

    carregarUsuario();
  }, []);

  const plataforma = useMemo(() => detectarPlataforma(link), [link]);

  async function capturarProduto() {
    if (!link) {
      alert("Cole o link primeiro");
      return;
    }

    const credenciais = localStorage.getItem("shopee_credenciais");

    if (!credenciais) {
      alert("Configure seu App ID e Secret primeiro.");
      window.location.href = "/config";
      return;
    }

    let appId = "";
    let secret = "";

    try {
      const parsed = JSON.parse(credenciais);
      appId = parsed.appId || "";
      secret = parsed.secret || "";
    } catch {
      alert("Credenciais da Shopee inválidas. Salve novamente em Configurar Shopee.");
      window.location.href = "/config";
      return;
    }

    if (!appId || !secret) {
      alert("Configure seu App ID e Secret primeiro.");
      window.location.href = "/config";
      return;
    }

    try {
      const res = await fetch("/api/capturar-produto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          link,
          appId,
          secret
        })
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        alert(data.error || "Erro ao capturar produto");
        return;
      }

      setTitulo(data.titulo || "");
      setPreco(data.preco || "");
      setImagem(data.imagem || "");

      if (data.aviso) {
        alert(data.aviso);
      }
    } catch {
      alert("Erro ao conectar com o servidor");
    }
  }

  function gerarVideoAutomatico() {
    const url = `/preview-video?titulo=${encodeURIComponent(
      titulo
    )}&preco=${encodeURIComponent(preco)}&imagem=${encodeURIComponent(
      imagem
    )}&link=${encodeURIComponent(link)}`;

    window.open(url, "_blank");
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

  function sair() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("usuario_pro");
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
            🔥 TSC Achadinhos Vídeos e Imagens
          </h1>

          <p style={{ textAlign: "center", color: "#bbb", marginBottom: "12px" }}>
            Painel profissional para conteúdo de afiliado
          </p>

          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
              padding: "10px",
              borderRadius: "10px",
              background: pro ? "#052e16" : "#3f1d0b",
              color: pro ? "#86efac" : "#fdba74",
              fontWeight: "bold"
            }}
          >
            {pro ? "✅ Conta PRO ativa" : "⭐ Conta gratuita — assine para liberar o plano PRO"}
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "16px"
            }}
          >
            <button
              onClick={() => (window.location.href = "/config")}
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                background: "#6366f1",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Configurar Shopee
            </button>

            {!pro && (
              <button
                onClick={() => (window.location.href = "/vip")}
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
                Assinar PRO
              </button>
            )}

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

          <div style={{ display: "grid", gap: "12px" }}>
            <input
              placeholder="Link do produto"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "10px",
                background: "#fff",
                color: "#111",
                border: "1px solid #ccc"
              }}
            />

            <input
              placeholder="Nome do produto"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "10px",
                background: "#fff",
                color: "#111",
                border: "1px solid #ccc"
              }}
            />

            <input
              placeholder="Preço"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "10px",
                background: "#fff",
                color: "#111",
                border: "1px solid #ccc"
              }}
            />

            <input
              placeholder="Imagem (URL)"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "10px",
                background: "#fff",
                color: "#111",
                border: "1px solid #ccc"
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
