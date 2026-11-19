import { pranoKerkese } from "@/lib/kerkesat";

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  try {
    const result = await pranoKerkese(params.id);
    if ("error" in result) return Response.json(result, { status: result.error === "ndaluar" ? 403 : 409 });
    return Response.json(result);
  } catch { return Response.json({ error: "Pranimi deshtoi." }, { status: 503 }); }
}
