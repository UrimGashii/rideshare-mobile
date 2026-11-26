import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { getSql } from "./db";
import { profiliIm } from "./lejet";

export type Njoftim = {
  id: number;
  kerkesaId: number;
  lloji: "pranuar" | "refuzuar";
  lexuarMe: string | null;
  krijuarMe: string;
  udhetimId: string;
  nisja: string;
  destinacioni: string;
  ora: string;
  status: "ne_pritje" | "pranuar";
};

export async function lexoNjoftimet() {
  noStore();
  const profili = await profiliIm();
  if (!profili || profili.roli !== "udhetar") return { njoftimet: [], tePalexuara: 0 };
  const sql = getSql();
  const rows = await sql`
    SELECT n.id, n.kerkesa_id AS "kerkesaId", n.lloji,
           n.lexuar_me AS "lexuarMe", n.krijuar_me AS "krijuarMe",
           k.udhetim_id AS "udhetimId", u.nisja, u.destinacioni, u.ora, k.status
    FROM njoftimet n
    JOIN kerkesat k ON k.id = n.kerkesa_id
    JOIN udhetimet u ON u.id = k.udhetim_id
    WHERE n.marresi_id = ${profili.id}
    ORDER BY n.krijuar_me DESC
  `;
  return {
    njoftimet: rows as Njoftim[],
    tePalexuara: rows.filter((row) => !row.lexuarMe).length,
  };
}

export async function lexoNjoftim(id: string, shenoLexuar = false) {
  const profili = await profiliIm();
  if (!profili || profili.roli !== "udhetar") return null;
  const sql = getSql();
  if (shenoLexuar) {
    await sql`
      UPDATE njoftimet SET lexuar_me = COALESCE(lexuar_me, NOW())
      WHERE id = ${id} AND marresi_id = ${profili.id}
    `;
  }
  const rows = await sql`
    SELECT n.id, n.kerkesa_id AS "kerkesaId", n.lloji,
           n.lexuar_me AS "lexuarMe", n.krijuar_me AS "krijuarMe",
           k.udhetim_id AS "udhetimId", u.nisja, u.destinacioni, u.ora, k.status
    FROM njoftimet n
    JOIN kerkesat k ON k.id = n.kerkesa_id
    JOIN udhetimet u ON u.id = k.udhetim_id
    WHERE n.id = ${id} AND n.marresi_id = ${profili.id}
  `;
  return (rows[0] as Njoftim | undefined) ?? null;
}
