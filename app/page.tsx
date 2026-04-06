'use client';

import React, { useMemo, useState } from 'react';
import { Film, Link as LinkIcon, Sparkles, Copy, Download, PlayCircle, Wand2, MessageCircle, Package, Clock3 } from 'lucide-react';
import { motion } from 'framer-motion';

const initialHistory = [
  {
    id: 1,
    url: 'https://shopee.com.br/produto-exemplo',
    title: 'Fone Bluetooth Sem Fio',
    price: 'R$ 49,90',
    status: 'Pronto',
    caption: '🎧 Fone Bluetooth com ótimo custo-benefício. Aproveite a oferta antes que acabe! Link na bio/WhatsApp.',
  },
  {
    id: 2,
    url: 'https://shopee.com.br/produto-exemplo-2',
    title: 'Mini Liquidificador Portátil',
    price: 'R$ 59,90',
    status: 'Processando',
    caption: '🥤 Faça seus sucos em qualquer lugar. Prático, portátil e em oferta hoje.',
  },
];

function extractSlug(url: string) {
  try {
    const parsed = new URL(url);
    const slug = parsed.pathname.split('/').filter(Boolean).pop();
    return slug || 'produto-shopee';
  } catch {
    return 'produto-shopee';
  }
}

function generateCopy(productName: string, price: string) {
  const safeName = productName || 'Produto Shopee';
  const safePrice = price || 'Preço especial';

  return {
    hook: `🔥 Oferta que vale a pena: ${safeName}`,
    caption: `Garanta agora ${safeName} por ${safePrice}. Produto ideal para quem busca praticidade e economia. Aproveite antes que o preço mude.`,
    hashtags: '#Shopee #Achadinhos #Oferta #Promoção #Afiliado #ComprasOnline #Desconto #OfertaDoDia',
    scenes: [
      `Cena 1: mostrar nome do produto "${safeName}" com entrada impactante.`,
      `Cena 2: destacar preço "${safePrice}" com selo de oferta.`,
      'Cena 3: exibir benefício principal com animação curta.',
      "Cena 4: CTA final: 'Clique no link e aproveite agora'.",
    ],
  };
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[24px] bg-white shadow-sm ${className}`}>{children}</div>;
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
    </div>
  );
}

function ActionButton({ children, secondary = false, onClick, disabled = false }: { children: React.ReactNode; secondary?: boolean; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${secondary ? 'bg-slate-200 text-slate-900 hover:bg-slate-300' : 'bg-slate-900 text-white hover:bg-slate-800'} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {children}
    </button>
  );
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string }) {
  return <input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400" value={value} onChange={onChange} placeholder={placeholder} />;
}

export default function Page() {
  const [affiliateUrl, setAffiliateUrl] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [processing, setProcessing] = useState(false);
  const [history, setHistory] = useState(initialHistory);
  const [activeTab, setActiveTab] = useState<'resultado' | 'preview' | 'historico'>('resultado');
  const [generated, setGenerated] = useState({
    hook: '',
    caption: '',
    hashtags: '',
    scenes: [] as string[],
    filename: 'video-produto-001.mp4',
  });

  const slug = useMemo(() => extractSlug(affiliateUrl), [affiliateUrl]);

  const handleGenerate = () => {
    setProcessing(true);
    const baseTitle = productTitle || slug.replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase()) || 'Produto Shopee';
    const copy = generateCopy(baseTitle, productPrice);

    setTimeout(() => {
      setGenerated({ ...copy, filename: `${slug}.mp4` });
      setHistory((prev) => [
        {
          id: prev.length + 1,
          url: affiliateUrl || 'https://shopee.com.br/seu-link',
          title: baseTitle,
          price: productPrice || 'A definir',
          status: 'Pronto',
          caption: copy.caption,
        },
        ...prev,
      ]);
      setActiveTab('resultado');
      setProcessing(false);
    }, 1000);
  };

  const copyText = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      alert('Texto copiado.');
    } catch {
      alert('Não foi possível copiar automaticamente.');
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
          <Card className="p-6">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-white">MVP</span>
              <span className="rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-800">Painel de afiliado</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold md:text-4xl">Gerador de vídeo para link da Shopee</h1>
            <p className="mt-2 text-slate-500">Cole seu link de afiliado, preencha os dados do produto e gere legenda, hashtags e roteiro em poucos segundos.</p>

            <div className="mt-6 grid gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Link de afiliado</label>
                <div className="flex gap-2">
                  <Input placeholder="https://shopee.com.br/..." value={affiliateUrl} onChange={(e) => setAffiliateUrl(e.target.value)} />
                  <ActionButton secondary>
                    <span className="inline-flex items-center gap-2"><LinkIcon size={16} /> Validar</span>
                  </ActionButton>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Nome do produto</label>
                  <Input placeholder="Ex: Fone Bluetooth" value={productTitle} onChange={(e) => setProductTitle(e.target.value)} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Preço</label>
                  <Input placeholder="Ex: R$ 49,90" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Imagem do produto (opcional)</label>
                <Input placeholder="https://imagem-do-produto.jpg" value={productImage} onChange={(e) => setProductImage(e.target.value)} />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <ActionButton onClick={handleGenerate} disabled={processing || !affiliateUrl}><span className="inline-flex items-center gap-2"><Wand2 size={16} /> {processing ? 'Gerando...' : 'Gerar conteúdo'}</span></ActionButton>
                <ActionButton secondary><span className="inline-flex items-center gap-2"><Film size={16} /> Processar vídeo</span></ActionButton>
                <ActionButton secondary><span className="inline-flex items-center gap-2"><MessageCircle size={16} /> Preparar para WhatsApp</span></ActionButton>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle title="Resumo do projeto" subtitle="Visão simples do que esse painel já pode virar." />
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3 rounded-2xl bg-slate-100 p-3">
                <Package className="mt-0.5" size={16} />
                <div><p className="font-medium text-slate-900">Entrada</p><p>Link afiliado, nome, preço, imagem e categoria.</p></div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-slate-100 p-3">
                <Sparkles className="mt-0.5" size={16} />
                <div><p className="font-medium text-slate-900">Saída</p><p>Legenda pronta, hashtags, roteiro curto e nome do arquivo do vídeo.</p></div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-slate-100 p-3">
                <Clock3 className="mt-0.5" size={16} />
                <div><p className="font-medium text-slate-900">Próxima fase</p><p>Conectar backend, renderizar vídeo com FFmpeg e salvar histórico em banco.</p></div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="flex flex-wrap gap-2">
          {['resultado', 'preview', 'historico'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab as 'resultado' | 'preview' | 'historico')} className={`rounded-2xl px-4 py-2 text-sm font-medium ${activeTab === tab ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 shadow-sm'}`}>
              {tab === 'resultado' ? 'Resultado' : tab === 'preview' ? 'Preview do vídeo' : 'Histórico'}
            </button>
          ))}
        </div>

        {activeTab === 'resultado' && (
          <Card className="p-6">
            <SectionTitle title="Conteúdo gerado" subtitle="Texto pronto para usar na divulgação do produto." />
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-100 p-4"><p className="mb-2 text-sm font-medium">Gancho</p><p className="text-sm text-slate-700">{generated.hook || 'Nenhum conteúdo gerado ainda.'}</p></div>
                <div className="rounded-2xl bg-slate-100 p-4">
                  <div className="mb-2 flex items-center justify-between gap-3"><p className="text-sm font-medium">Legenda</p><button onClick={() => copyText(generated.caption)} className="text-sm text-slate-700"><span className="inline-flex items-center gap-2"><Copy size={16} /> Copiar</span></button></div>
                  <p className="text-sm text-slate-700">{generated.caption || 'A legenda aparecerá aqui.'}</p>
                </div>
                <div className="rounded-2xl bg-slate-100 p-4">
                  <div className="mb-2 flex items-center justify-between gap-3"><p className="text-sm font-medium">Hashtags</p><button onClick={() => copyText(generated.hashtags)} className="text-sm text-slate-700"><span className="inline-flex items-center gap-2"><Copy size={16} /> Copiar</span></button></div>
                  <p className="text-sm text-slate-700">{generated.hashtags || 'As hashtags aparecerão aqui.'}</p>
                </div>
              </div>
              <div className="rounded-2xl bg-slate-100 p-4">
                <p className="mb-3 text-sm font-medium">Roteiro do vídeo</p>
                <div className="space-y-2 text-sm text-slate-700">
                  {generated.scenes.length ? generated.scenes.map((scene, index) => <div key={index} className="rounded-xl bg-white p-3">{scene}</div>) : <p>As cenas do vídeo aparecerão aqui após gerar o conteúdo.</p>}
                </div>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'preview' && (
          <Card className="p-6">
            <SectionTitle title="Preview do vídeo" subtitle="Exemplo visual de como o vídeo vertical pode ficar." />
            <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
              <div className="mx-auto flex aspect-[9/16] w-full max-w-[320px] flex-col overflow-hidden rounded-[2rem] bg-slate-900 shadow-xl">
                <div className="flex-1 bg-gradient-to-b from-slate-700 to-slate-900 p-4 text-white">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs">OFERTA</span>
                      <h3 className="mt-3 text-xl font-bold leading-tight">{productTitle || 'Seu produto da Shopee aparece aqui'}</h3>
                      <p className="mt-2 text-sm text-white/80">{productPrice || 'R$ 00,00'}</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-3"><p className="text-sm">{generated.hook || 'Gancho do vídeo'}</p></div>
                  </div>
                </div>
                <div className="border-t border-white/10 p-3 text-white"><div className="flex items-center justify-between"><div className="text-xs text-white/70">Arquivo</div><div className="text-xs">{generated.filename}</div></div></div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="mb-2 text-sm font-medium">Ações futuras</p>
                  <div className="flex flex-wrap gap-3">
                    <ActionButton><span className="inline-flex items-center gap-2"><PlayCircle size={16} /> Renderizar vídeo</span></ActionButton>
                    <ActionButton secondary><span className="inline-flex items-center gap-2"><Download size={16} /> Baixar arquivo</span></ActionButton>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-600">
                  <p className="font-medium text-slate-900">Como ligar com backend depois</p>
                  <div className="my-3 h-px bg-slate-200" />
                  <p>1. Receber o link no backend.</p>
                  <p>2. Extrair dados do produto por API ou parser autorizado.</p>
                  <p>3. Montar cenas e texto automaticamente.</p>
                  <p>4. Enviar para FFmpeg gerar o vídeo 9:16.</p>
                  <p>5. Salvar o MP4 e liberar download.</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'historico' && (
          <Card className="p-6">
            <SectionTitle title="Histórico" subtitle="Itens processados ou aguardando renderização." />
            <div className="space-y-3">
              {history.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.price}</p>
                      <p className="mt-1 break-all text-xs text-slate-400">{item.url}</p>
                    </div>
                    <span className={`w-fit rounded-full px-3 py-1 text-xs ${item.status === 'Pronto' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-800'}`}>{item.status}</span>
                  </div>
                  <div className="my-3 h-px bg-slate-200" />
                  <p className="text-sm text-slate-600">{item.caption}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
