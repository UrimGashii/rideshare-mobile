import { lexoGjendjen } from "@/lib/kerkesat";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const state = await lexoGjendjen(params.id);
    if (!state) return Response.json({ error: "Duhet te hysh ose udhetimi nuk ekziston." }, { status: 401 });
    return Response.json(state, { headers: { "Cache-Control": "no-store" } });
  } catch { return Response.json({ error: "Leximi deshtoi." }, { status: 503 }); }
}
