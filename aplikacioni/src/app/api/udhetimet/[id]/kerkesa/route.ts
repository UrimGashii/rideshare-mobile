import { krijoKerkese } from "@/lib/kerkesat";

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  try {
    const result = await krijoKerkese(params.id);
    if ("error" in result) return Response.json(result, { status: result.error === "ndaluar" ? 403 : 409 });
    return Response.json(result, { status: 201 });
  } catch { return Response.json({ error: "Ruajtja deshtoi." }, { status: 503 }); }
}
