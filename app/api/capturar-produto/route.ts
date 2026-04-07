import { NextResponse } from "next/server";

function extractMeta(html: string, property: string) {
  const regex = new RegExp(
    `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["'][^>]*>`,
    "i"
  );
  const match = html.match(regex);
  return match ? match[1] : "";
}

function extractTitle(html: string) {
  const titleTag = html.match(/<title[^>]*>(.*?)<\/title>/i);
  if (titleTag?.[1]) return titleTag[1].trim();

  const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (h1?.[1]) return h1[1].replace(/<[^>]+>/g, "").trim();

  return "";
}

function extractPrice(html: string) {
  const patterns = [
    /R\$\s?\d{1,3}(?:\.\d{3})*,\d{2}/,
    /R\$\s?\d+[.,]\d{2}/,
    /"price":"([^"]+)"/i,
    /"price":\s*"([^"]+)"/i,
    /"price":\s*([0-9.]+)/i
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      const raw = match[1];
      if (/^\d+(\.\d+)?$/.test(raw)) {
        const value = Number(raw).toFixed(2).replace(".", ",");
        return `R$ ${value}`;
      }
      return raw;
    }
    if (match?.[0]?.startsWith("R$")) {
      return match[0];
    }
  }

  return "";
}

function extractImage(html: string) {
  const ogImage = extractMeta(html, "og:image");
  if (ogImage) return ogImage;

  const twitterImage = extractMeta(html, "twitter:image");
  if (twitterImage) return twitterImage;

  const img = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  return img?.[1] || "";
}

function cleanTitle(title: string) {
  return title
    .replace(/\s+/g, " ")
    .replace(/- Shopee.*$/i, "")
    .replace(/\| Shopee.*$/i, "")
    .trim();
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

    const response = await fetch(link, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      },
      redirect: "follow"
    });

    const html = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `A página respondeu com status ${response.status}`,
          debug: html.slice(0, 300)
        },
        { status: 400 }
      );
    }

    const titulo =
      cleanTitle(extractMeta(html, "og:title")) ||
      cleanTitle(extractTitle(html)) ||
      "Produto não encontrado";

    const preco = extractPrice(html) || "Preço não encontrado";
    const imagem = extractImage(html);

    return NextResponse.json({
      titulo,
      preco,
      imagem,
      fonte: "html",
      encontrou: {
        titulo: titulo !== "Produto não encontrado",
        preco: preco !== "Preço não encontrado",
        imagem: !!imagem
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro ao capturar produto real"
      },
      { status: 500 }
    );
  }
}
