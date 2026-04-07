import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Webhook Mercado Pago:", body);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Erro no webhook" },
      { status: 500 }
    );
  }
}
