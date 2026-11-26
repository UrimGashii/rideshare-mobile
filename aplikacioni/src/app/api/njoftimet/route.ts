import { lexoNjoftimet } from "@/lib/njoftimet";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json(await lexoNjoftimet(), { headers: { "Cache-Control": "no-store" } });
  } catch { return Response.json({ error: "Leximi i njoftimeve deshtoi." }, { status: 503 }); }
}
