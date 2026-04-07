import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const accessToken = "APP_USR-3657728953009240-040700-6d3d7c505ab7c955aeb0d2ba5d4a43fd-1260764833";

    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          items: [
            {
              title: "TSC Achadinhos PRO",
              quantity: 1,
              unit_price: 19.9
            }
          ],
          payer: {
            email: email || "cliente@email.com"
          },
          back_urls: {
            success: "https://shopee-site-lovat.vercel.app/sucesso",
            failure: "https://shopee-site-lovat.vercel.app/erro",
            pending: "https://shopee-site-lovat.vercel.app/pendente"
          },
          auto_return: "approved"
        })
      }
    );

    const data = await response.json();

    if (!response.ok || !data.init_point) {
      return NextResponse.json(
        {
          error: "Erro ao gerar pagamento",
          detalhe: data
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: data.init_point
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro interno ao gerar pagamento"
      },
      { status: 500 }
    );
  }
}
