import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { getSql } from "./db";

type Profil = { id: string; emri: string; roli: "udhetar" | "shofer" };

export async function profiliIm(): Promise<Profil | null> {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;

  // GitHub i perdor ID-te numerike; nje formular nuk mund ta caktoje kete vlere.
  if (!id || !/^\d+$/.test(id)) return null;

  const sql = getSql();
  await sql`
    INSERT INTO profilet (github_id, emri)
    VALUES (${id}, ${session.user?.name ?? "Student"})
    ON CONFLICT (github_id) DO NOTHING
  `;
  const rows = await sql`
    SELECT github_id AS id, emri, roli
    FROM profilet
    WHERE github_id = ${id}
  `;
  return (rows[0] as Profil | undefined) ?? null;
}

export async function ndryshoOren(id: string, ora: string) {
  const profili = await profiliIm();
  if (!profili) return "hyr";
  if (profili.roli !== "shofer") return "ndaluar";
  if (!/^[123]$/.test(id) || !/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(ora)) {
    return "fushe";
  }

  const sql = getSql();
  // Pronari merret nga sesioni ne server, jo nga fusha e formularit.
  const rows = await sql`
    UPDATE udhetimet
    SET ora = ${ora}
    WHERE id = ${id}
      AND shofer_id = ${profili.id}
      AND EXISTS (
        SELECT 1 FROM profilet
        WHERE github_id = ${profili.id} AND roli = 'shofer'
      )
    RETURNING id
  `;

  return rows.length === 1 ? "ruajtur" : "ndaluar";
}
