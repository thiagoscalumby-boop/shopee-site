import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const accessToken = "COLE_SEU_TOKEN_NOVO_AQUI";

    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          items: [
            {
              title: "TSC Achadinhos PRO",
              quantity: 1,
              unit_price: 19.9,
            },
          ],
          payer: {
            email: email || "cliente@email.com",
          },
          back_urls: {
            success: "https://seu-site.vercel.app/sucesso",
            failure: "https://seu-site.vercel.app/erro",
            pending: "https://seu-site.vercel.app/pendente",
          },
          auto_return: "approved",
        }),
      }
    );

    const data = await response.json();

    if (!data.init_point) {
      return NextResponse.json(
        { error: "Erro ao gerar pagamento", detalhe: data },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: data.init_point,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno", detalhe: error },
      { status: 500 }
    );
  }
}
