import React, { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  RefreshCcw,
  Wand2,
  Film,
  MessageCircle,
  Copy,
  Globe,
  Sparkles,
  Clock3,
  PlayCircle,
  Package,
  Link as LinkIcon,
} from "lucide-react";

type ProductData = {
  platform: string;
  title: string;
  price: string;
  image: string;
  category: string;
  shortUrl: string;
};

type GeneratedContent = {
  hook: string;
  caption: string;
  hashtags: string;
  scenes: string[];
  whatsappText: string;
  cta: string;
  filename: string;
};

type HistoryItem = {
  id: number;
  platform: string;
  title: string;
  price: string;
  url: string;
  status: string;
};

const starterHistory: HistoryItem[] = [
  {
    id: 1,
    platform: "Shopee",
    title: "Fone Bluetooth Sem Fio",
    price: "R$ 49,90",
    url: "https://shopee.com.br/exemplo-fone",
    status: "Pronto",
  },
  {
    id: 2,
    platform: "Amazon",
    title: "Mini Liquidificador Portátil",
    price: "R$ 79,90",
    url: "https://amazon.com.br/exemplo-liquidificador",
    status: "Pronto",
  },
];

function detectPlatform(url: string) {
  const value = url.toLowerCase();
  if (value.includes("shopee")) return "Shopee";
  if (value.includes("amazon")) return "Amazon";
  if (value.includes("mercadolivre") || value.includes("mercado livre") || value.includes("meli")) return "Mercado Livre";
  if (value.includes("aliexpress")) return "AliExpress";
  return "Genérico";
}

function tryParseTitleFromUrl(url: string) {
  try {
    const parsed = new URL(url);
    const last = parsed.pathname.split("/").filter(Boolean).pop() || "produto-afiliado";
    return last.replace(/[-_]/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
  } catch {
    return "Produto Afiliado";
  }
}

function createSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "video-produto";
}

function mockCaptureProduct(url: string): ProductData {
  const platform = detectPlatform(url);
  const title = tryParseTitleFromUrl(url);

  return {
    platform,
    title,
    price: platform === "Shopee" ? "R$ 39,90" : platform === "Amazon" ? "R$ 89,90" : "R$ 59,90",
    image: "https://placehold.co/600x600/png",
    category: "Achadinhos e utilidades",
    shortUrl: url,
  };
}

function generateContent(product: ProductData): GeneratedContent {
  const hook = `🔥 ${product.title} com preço chamativo`;
  const cta = "Clique no link e aproveite antes que a oferta mude.";
  const caption = `Olha esse achadinho: ${product.title} por ${product.price}. Produto ideal para quem quer economizar e comprar bem. ${cta}`;
  const hashtags = "#Achadinhos #Oferta #Promoção #Afiliado #ComprasOnline #Desconto #Shopee #Amazon #MercadoLivre";
  const scenes = [
    `Cena 1: entrada forte com o nome do produto \"${product.title}\".`,
    `Cena 2: mostrar o preço \"${product.price}\" com destaque visual.`,
    "Cena 3: destacar benefício principal do produto com texto curto.",
    "Cena 4: reforçar que é uma boa oportunidade de compra.",
    "Cena 5: CTA final mandando clicar no link agora.",
  ];
  const whatsappText = `${caption}\n\n${product.shortUrl}`;
  const filename = `${createSlug(product.title)}.mp4`;

  return { hook, caption, hashtags, scenes, whatsappText, cta, filename };
}

export default function AffiliateSystemPro() {
  const [productUrl, setProductUrl] = useState("");
  const [capturing, setCapturing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>(starterHistory);
  const [product, setProduct] = useState<ProductData>({
    platform: "Genérico",
    title: "",
    price: "",
    image: "",
    category: "",
    shortUrl: "",
  });
  const [content, setContent] = useState<GeneratedContent>({
    hook: "",
    caption: "",
    hashtags: "",
    scenes: [],
    whatsappText: "",
    cta: "",
    filename: "video-produto.mp4",
  });

  const canCapture = useMemo(() => productUrl.trim().length > 0, [productUrl]);

  function handleCapture() {
    if (!canCapture) return;
    setCapturing(true);
    setTimeout(() => {
      const data = mockCaptureProduct(productUrl.trim());
      setProduct(data);
      setCapturing(false);
    }, 900);
  }

  function handleGenerate() {
    if (!product.title || !product.price) return;
    setGenerating(true);
    setTimeout(() => {
      const generated = generateContent(product);
      setContent(generated);
      setHistory((prev) => [
        {
          id: prev.length + 1,
          platform: product.platform,
          title: product.title,
          price: product.price,
          url: product.shortUrl || productUrl,
          status: "Pronto",
        },
        ...prev,
      ]);
      setGenerating(false);
    }, 900);
  }

  async function copyText(text: string) {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      alert("Copiado com sucesso.");
    } catch {
      alert("Não foi possível copiar automaticamente.");
    }
  }

  const whatsappLink = content.whatsappText
    ? `https://wa.me/?text=${encodeURIComponent(content.whatsappText)}`
    : "#";

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid gap-4 xl:grid-cols-[1.7fr_1fr]"
        >
          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-full">Nova versão</Badge>
                <Badge variant="secondary" className="rounded-full">Multi-link</Badge>
                <Badge variant="outline" className="rounded-full">Shopee + Amazon + outros</Badge>
              </div>
              <CardTitle className="mt-2 text-2xl md:text-3xl">Sistema profissional para links de afiliado</CardTitle>
              <CardDescription>
                Cole o link do produto, capture os dados automaticamente, gere conteúdo de venda e prepare a base do vídeo e do WhatsApp.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Link do produto</label>
                <div className="flex flex-col gap-3 md:flex-row">
                  <Input
                    placeholder="https://shopee.com.br/... ou outro link de afiliado"
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                  />
                  <Button onClick={handleCapture} disabled={!canCapture || capturing} className="rounded-2xl">
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    {capturing ? "Capturando..." : "Capturar produto"}
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Plataforma</label>
                  <Input value={product.platform} onChange={(e) => setProduct({ ...product, platform: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Categoria</label>
                  <Input value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Nome do produto</label>
                  <Input value={product.title} onChange={(e) => setProduct({ ...product, title: e.target.value })} placeholder="Nome do produto" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Preço</label>
                  <Input value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} placeholder="R$ 00,00" />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Imagem do produto</label>
                <Input value={product.image} onChange={(e) => setProduct({ ...product, image: e.target.value })} placeholder="https://imagem-do-produto.jpg" />
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <Button onClick={handleGenerate} disabled={generating || !product.title || !product.price} className="rounded-2xl">
                  <Wand2 className="mr-2 h-4 w-4" />
                  {generating ? "Gerando..." : "Gerar conteúdo"}
                </Button>
                <Button variant="secondary" className="rounded-2xl">
                  <Film className="mr-2 h-4 w-4" />
                  Gerar vídeo
                </Button>
                <a href={whatsappLink} target="_blank" rel="noreferrer">
                  <Button variant="outline" className="rounded-2xl">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Abrir no WhatsApp
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Resumo do sistema</CardTitle>
              <CardDescription>O que esta versão já organiza para você.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3 rounded-2xl bg-slate-100 p-3">
                <Globe className="mt-0.5 h-4 w-4" />
                <div>
                  <p className="font-medium text-slate-900">Multi-plataforma</p>
                  <p>Estrutura pensada para Shopee, Amazon, AliExpress, Mercado Livre e links genéricos.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-slate-100 p-3">
                <Sparkles className="mt-0.5 h-4 w-4" />
                <div>
                  <p className="font-medium text-slate-900">Conteúdo automático</p>
                  <p>Gera legenda, hashtags, CTA, roteiro e texto pronto para WhatsApp.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-slate-100 p-3">
                <Clock3 className="mt-0.5 h-4 w-4" />
                <div>
                  <p className="font-medium text-slate-900">Pronto para crescer</p>
                  <p>Preparado para receber backend real, vídeo MP4 e captura automática robusta depois.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="conteudo" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 rounded-2xl">
            <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
            <TabsTrigger value="video">Vídeo</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="conteudo">
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Conteúdo gerado</CardTitle>
                <CardDescription>Texto pronto para usar em divulgação.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-2xl bg-slate-100 p-4">
                      <p className="mb-2 text-sm font-medium">Gancho</p>
                      <p className="text-sm text-slate-700">{content.hook || "O gancho do produto vai aparecer aqui."}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 p-4">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="text-sm font-medium">Legenda</p>
                        <Button size="sm" variant="ghost" onClick={() => copyText(content.caption)}>
                          <Copy className="mr-2 h-4 w-4" />Copiar
                        </Button>
                      </div>
                      <p className="text-sm text-slate-700">{content.caption || "A legenda aparecerá aqui."}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 p-4">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="text-sm font-medium">Hashtags</p>
                        <Button size="sm" variant="ghost" onClick={() => copyText(content.hashtags)}>
                          <Copy className="mr-2 h-4 w-4" />Copiar
                        </Button>
                      </div>
                      <p className="text-sm text-slate-700">{content.hashtags || "As hashtags aparecerão aqui."}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-100 p-4">
                    <p className="mb-3 text-sm font-medium">Roteiro do vídeo</p>
                    <div className="space-y-2 text-sm text-slate-700">
                      {content.scenes.length ? (
                        content.scenes.map((scene, index) => (
                          <div key={index} className="rounded-xl bg-white p-3">
                            {scene}
                          </div>
                        ))
                      ) : (
                        <p>As cenas do vídeo aparecerão aqui após gerar o conteúdo.</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="video">
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Base do vídeo</CardTitle>
                <CardDescription>Preview simples da estrutura do vídeo vertical.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
                  <div className="mx-auto flex aspect-[9/16] w-full max-w-[320px] flex-col overflow-hidden rounded-[2rem] bg-slate-900 shadow-xl">
                    <div className="flex-1 bg-gradient-to-b from-slate-700 to-slate-900 p-4 text-white">
                      <div className="flex h-full flex-col justify-between">
                        <div>
                          <Badge className="rounded-full bg-white/15 text-white hover:bg-white/15">OFERTA</Badge>
                          <h3 className="mt-3 text-xl font-bold leading-tight">
                            {product.title || "Seu produto aparece aqui"}
                          </h3>
                          <p className="mt-2 text-sm text-white/80">{product.price || "R$ 00,00"}</p>
                        </div>
                        <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
                          <p className="text-sm">{content.hook || "Gancho do vídeo"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-white/10 p-3 text-white">
                      <div className="flex items-center justify-between text-xs">
                        <span>Arquivo</span>
                        <span>{content.filename}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border p-4">
                      <p className="mb-2 text-sm font-medium">Próximo passo técnico</p>
                      <p className="text-sm text-slate-600">
                        Aqui ficará a geração real do MP4 quando o backend com FFmpeg for conectado.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Button className="rounded-2xl">
                          <PlayCircle className="mr-2 h-4 w-4" />Renderizar vídeo
                        </Button>
                        <Button variant="secondary" className="rounded-2xl">
                          <Package className="mr-2 h-4 w-4" />Preparar download
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-2xl border p-4 text-sm text-slate-600">
                      <p className="font-medium text-slate-900">O que falta para o vídeo real</p>
                      <Separator className="my-3" />
                      <p>1. Backend de processamento</p>
                      <p>2. Template de vídeo</p>
                      <p>3. Renderização MP4</p>
                      <p>4. Armazenamento do arquivo</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whatsapp">
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Mensagem para WhatsApp</CardTitle>
                <CardDescription>Texto pronto para enviar com o link do produto.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea value={content.whatsappText} onChange={() => {}} rows={8} className="resize-none" placeholder="O texto gerado para o WhatsApp aparecerá aqui." />
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => copyText(content.whatsappText)} className="rounded-2xl">
                    <Copy className="mr-2 h-4 w-4" />Copiar mensagem
                  </Button>
                  <a href={whatsappLink} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="rounded-2xl">
                      <MessageCircle className="mr-2 h-4 w-4" />Abrir WhatsApp
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historico">
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Histórico</CardTitle>
                <CardDescription>Links processados no painel.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[420px] pr-4">
                  <div className="space-y-3">
                    {history.map((item) => (
                      <div key={item.id} className="rounded-2xl border p-4">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="font-medium text-slate-900">{item.title}</p>
                            <p className="text-sm text-slate-500">{item.platform} • {item.price}</p>
                            <p className="mt-1 break-all text-xs text-slate-400">{item.url}</p>
                          </div>
                          <Badge variant="secondary" className="rounded-full">{item.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
