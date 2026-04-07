import { NextResponse } from "next/server";

function extractMeta(html: string, key: string) {
  const regex = new RegExp(
    `<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']+)["'][^>]*>`,
    "i"
  );
  const match = html.match(regex);
  return match ? match[1].trim() : "";
}

function extractTitle(html: string) {
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  if (titleMatch?.[1]) {
    return titleMatch[1].replace(/\s+/g, " ").trim();
  }
  return "";
}

function extractPrice(html: string) {
  const directPatterns = [
    /R\$\s?\d{1,3}(?:\.\d{3})*,\d{2}/,
    /R\$\s?\d+[.,]\d{2}/
  ];

  for (const pattern of directPatterns) {
    const match = html.match(pattern);
    if (match?.[0]) return match[0].trim();
  }

  const jsonPatterns = [
    /"price":"([^"]+)"/i,
    /"price":\s*"([^"]+)"/i,
    /"price":\s*([0-9.]+)/i
  ];

  for (const pattern of jsonPatterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      const raw = match[1].trim();

      if (/^\d+(\.\d+)?$/.test(raw)) {
        const value = Number(raw).toFixed(2).replace(".", ",");
        return `R$ ${value}`;
      }

      return raw;
    }
  }

  return "";
}

function extractImage(html: string) {
  const ogImage = extractMeta(html, "og:image");
  if (ogImage) return ogImage;

  const twitterImage = extractMeta(html, "twitter:image");
  if (twitterImage) return twitterImage;

  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  if (imgMatch?.[1]) return imgMatch[1].trim();

  return "";
}

function cleanTitle(title: string) {
  return title
    .replace(/\s+/g, " ")
    .replace(/- Shopee.*$/i, "")
    .replace(/\| Shopee.*$/i, "")
    .trim();
}

function fallbackTitleFromLink(link: string) {
  try {
    const url = new URL(link);
    const lastPart = url.pathname.split("/").filter(Boolean).pop() || "Produto";
    return decodeURIComponent(lastPart)
      .replace(/[-_]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  } catch {
    return "Produto";
  }
}

async function fetchHtml(url: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
      "Cache-Control": "no-cache",
      Pragma: "no-cache"
    },
    redirect: "follow"
  });

  const html = await response.text();

  return {
    ok: response.ok,
    status: response.status,
    finalUrl: response.url,
    html
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const link = body?.link?.trim();

    if (!link) {
      return NextResponse.json(
        { error: "Link não enviado" },
        { status: 400 }
      );
    }

    const result = await fetchHtml(link);

    const titulo =
      cleanTitle(extractMeta(result.html, "og:title")) ||
      cleanTitle(extractTitle(result.html)) ||
      fallbackTitleFromLink(result.finalUrl || link);

    const preco = extractPrice(result.html);
    const imagem = extractImage(result.html);

    const encontrou = {
      titulo: !!titulo,
      preco: !!preco,
      imagem: !!imagem
    };

    let aviso = "";

    if (!encontrou.preco || !encontrou.imagem) {
      aviso =
        "Capturei parcialmente. Complete manualmente se precisar. Se puder, use o link direto do produto em vez do link curto de afiliado.";
    }

    return NextResponse.json({
      titulo: titulo || "Produto",
      preco: preco || "",
      imagem: imagem || "",
      linkFinal: result.finalUrl || link,
      fonte: "html-fallback",
      encontrou,
      aviso
    });
  } catch {
    return NextResponse.json(
      {
        titulo: "Produto",
        preco: "",
        imagem: "",
        encontrou: {
          titulo: true,
          preco: false,
          imagem: false
        },
        aviso:
          "Não foi possível capturar automaticamente. Tente usar o link direto do produto."
      },
      { status: 200 }
    );
  }
}
