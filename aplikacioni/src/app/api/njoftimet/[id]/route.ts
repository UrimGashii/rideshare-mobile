import { lexoNjoftim } from "@/lib/njoftimet";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const njoftim = await lexoNjoftim(params.id);
    return njoftim ? Response.json(njoftim) : Response.json({ error: "Njoftimi nuk u gjet." }, { status: 404 });
  } catch { return Response.json({ error: "Leximi deshtoi." }, { status: 503 }); }
}

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  try {
    const njoftim = await lexoNjoftim(params.id, true);
    return njoftim ? Response.json(njoftim) : Response.json({ error: "Njoftimi nuk u gjet." }, { status: 404 });
  } catch { return Response.json({ error: "Shenimi si i lexuar deshtoi." }, { status: 503 }); }
}
