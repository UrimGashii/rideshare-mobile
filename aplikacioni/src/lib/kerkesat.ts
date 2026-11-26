import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { getSql } from "./db";
import { profiliIm } from "./lejet";

export type GjendjaKerkeses = {
  id: number;
  status: "ne_pritje" | "pranuar";
  udhetarId: string;
  udhetarEmri: string;
};

export type GjendjaUdhetimi = {
  trip: { id: string; nisja: string; destinacioni: string; ora: string; vendtakimi: string; vende: number; shoferEmri: string };
  request: GjendjaKerkeses | null;
};

export async function lexoGjendjen(id: string): Promise<GjendjaUdhetimi | null> {
  noStore();
  const profili = await profiliIm();
  if (!profili) return null;
  const sql = getSql();
  const trips = await sql`
    SELECT u.id, u.nisja, u.destinacioni, u.ora, u.vendtakimi, u.vende,
           COALESCE(p.emri, 'Shofer') AS "shoferEmri"
    FROM udhetimet u LEFT JOIN profilet p ON p.github_id = u.shofer_id
    WHERE u.id = ${id} AND (u.shofer_id = ${profili.id} OR ${profili.roli} = 'udhetar')
  `;
  if (!trips[0]) return null;
  const requests = profili.roli === "shofer"
    ? await sql`
        SELECT k.id, k.status, k.udhetar_id AS "udhetarId", p.emri AS "udhetarEmri"
        FROM kerkesat k JOIN profilet p ON p.github_id = k.udhetar_id
        WHERE k.udhetim_id = ${id} ORDER BY k.krijuar_me LIMIT 1
      `
    : await sql`
        SELECT k.id, k.status, k.udhetar_id AS "udhetarId", p.emri AS "udhetarEmri"
        FROM kerkesat k JOIN profilet p ON p.github_id = k.udhetar_id
        WHERE k.udhetim_id = ${id} AND k.udhetar_id = ${profili.id}
        LIMIT 1
      `;
  return { trip: trips[0] as GjendjaUdhetimi["trip"], request: (requests[0] as GjendjaKerkeses | undefined) ?? null };
}

export async function krijoKerkese(id: string) {
  const profili = await profiliIm();
  if (!profili || profili.roli !== "udhetar") return { error: "ndaluar" } as const;
  const sql = getSql();
  const rows = await sql`
    INSERT INTO kerkesat (udhetim_id, udhetar_id)
    SELECT ${id}, ${profili.id} WHERE EXISTS (
      SELECT 1 FROM udhetimet WHERE udhetimet.id = ${id} AND udhetimet.vende > 0
    )
    ON CONFLICT (udhetim_id, udhetar_id) DO UPDATE SET ndryshuar_me = NOW()
    RETURNING id, status
  `;
  return rows[0] ? { request: rows[0] } : { error: "pa_vende" };
}

export async function pranoKerkese(requestId: string) {
  const profili = await profiliIm();
  if (!profili || profili.roli !== "shofer") return { error: "ndaluar" } as const;
  const sql = getSql();
  const rows = await sql`
    WITH candidate AS (
      SELECT k.id, k.udhetim_id
      FROM kerkesat k JOIN udhetimet u ON u.id = k.udhetim_id
      WHERE k.id = ${requestId} AND k.status = 'ne_pritje'
        AND u.shofer_id = ${profili.id} AND u.vende > 0
      FOR UPDATE OF k, u
    ), changed_trip AS (
      UPDATE udhetimet u SET vende = u.vende - 1
      FROM candidate c WHERE u.id = c.udhetim_id AND u.vende > 0
      RETURNING u.id
    ),
    accepted AS (
      UPDATE kerkesat k SET status = 'pranuar', ndryshuar_me = NOW()
      FROM changed_trip c WHERE k.id = (SELECT id FROM candidate)
      RETURNING k.id, k.status, k.udhetar_id, k.udhetim_id
    ), created_notification AS (
      INSERT INTO njoftimet (kerkesa_id, marresi_id, lloji)
      SELECT id, udhetar_id, 'pranuar' FROM accepted
      ON CONFLICT (kerkesa_id) DO NOTHING
      RETURNING id
    )
    SELECT a.id, a.status FROM accepted a
  `;
  return rows[0] ? { request: rows[0] } : { error: "nuk_mund_te_pranohet" };
}
