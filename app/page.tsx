"use client";
import { useState } from "react";

export default function Page() {
  const [link, setLink] = useState("");
  const [titulo, setTitulo] = useState("");
  const [preco, setPreco] = useState("");
  const [resultado, setResultado] = useState("");

  function gerar() {
    const texto = `🔥 ${titulo}

💰 Apenas ${preco}

Produto top que vale muito a pena!

👉 Compre agora:
${link}

#oferta #promoção #shopee #achadinhos`;

    setResultado(texto);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Sistema de Afiliado</h1>

      <input
        placeholder="Link do produto"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Nome do produto"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
      />
      <br /><br />

      <button onClick={gerar}>Gerar</button>

      <br /><br />

      <textarea
        value={resultado}
        readOnly
        rows={10}
        style={{ width: "100%" }}
      />
    </div>
  );
}
