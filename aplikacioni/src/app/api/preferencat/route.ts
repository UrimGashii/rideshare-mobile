import { lexoPreferencat } from "@/lib/preferencat";
export const dynamic = "force-dynamic";
export async function GET() { try { const result = await lexoPreferencat(); if (!result) return Response.json({ error: "Duhet te hysh ne llogari." }, { status: 401 }); return Response.json(result, { headers: { "Cache-Control": "no-store" } }); } catch { return Response.json({ error: "Preferimet nuk mund te lexohen." }, { status: 503 }); } }
