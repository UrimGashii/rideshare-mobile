import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { getSql } from "./db";
import { profiliIm } from "./lejet";

export async function lexoPreferencat() {
  noStore();
  const profili = await profiliIm();
  if (!profili) return null;
  const sql = getSql();
  const rows = await sql`SELECT udhetim_id AS "tripId" FROM preferencat WHERE udhetar_id = ${profili.id} ORDER BY krijuar_me DESC`;
  return { tripIds: rows.map((row) => String(row.tripId)), count: rows.length };
}

export async function ruajPreferim(udhetimId: string) {
  const profili = await profiliIm();
  if (!profili || profili.roli !== "udhetar") return { error: "ndaluar" } as const;
  const sql = getSql();
  const trip = await sql`SELECT id FROM udhetimet WHERE id = ${udhetimId}`;
  if (!trip[0]) return { error: "udhetimi_nuk_ekziston" } as const;
  await sql`INSERT INTO preferencat (udhetar_id, udhetim_id) VALUES (${profili.id}, ${udhetimId}) ON CONFLICT (udhetar_id, udhetim_id) DO NOTHING`;
  return { saved: true } as const;
}
