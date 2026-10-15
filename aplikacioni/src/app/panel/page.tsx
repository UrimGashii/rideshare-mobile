import Link from "next/link";
import Hyrja from "@/components/Hyrja";
import { profiliIm } from "@/lib/lejet";
import { ruajOren } from "./actions";

export const dynamic = "force-dynamic";

const mesazhet: Record<string, string> = {
  hyr: "Hyr ne llogari para se te ndryshosh udhetimin.",
  ndaluar: "Nuk ke leje per kete udhetim. Ora nuk ndryshoi.",
  fushe: "Shkruaj nje ore te vlefshme, p.sh. 08:25.",
  ruajtur: "Ora u ruajt me sukses. Kontrollo listen dhe detajet.",
  databaza: "Nuk u lidhem me databazen. Kontrollo Neon dhe provo perseri.",
};

export default async function Panel({
  searchParams,
}: {
  searchParams?: { m?: string | string[] };
}) {
  const mesazhi = typeof searchParams?.m === "string" ? searchParams.m : undefined;
  let profili;

  try {
    profili = await profiliIm();
  } catch {
    return (
      <main className="app-shell">
        <h1>Paneli im</h1>
        <p role="alert">{mesazhet.databaza}</p>
        <Link href="/panel">Provo perseri</Link>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <h1>Paneli im</h1>
      {mesazhi && mesazhet[mesazhi] && <p role="status">{mesazhet[mesazhi]}</p>}
      {!profili ? (
        <p>Lista eshte publike. Per panelin hyr me llogarine tende GitHub.</p>
      ) : (
        <>
          <p>
            Pershendetje, {profili.emri}. Roli: <strong>{profili.roli}</strong>.
          </p>
          <p>
            ID ime GitHub: <code>{profili.id}</code>
          </p>
        </>
      )}
      <Hyrja brenda={Boolean(profili)} />
      {profili?.roli === "shofer" ? (
        <form action={ruajOren}>
          <h2>Ndrysho oren e udhetimit tim</h2>
          <input type="hidden" name="id" value="2" />
          <label htmlFor="ora">Ora e re</label>{" "}
          <input id="ora" name="ora" type="time" defaultValue="08:15" required />{" "}
          <button type="submit">Ruaj oren</button>
          <p>Serveri verifikon pronarin edhe nese ID-ja e formularit ndryshohet.</p>
        </form>
      ) : (
        profili && <p>Si udhetar mund te shohesh udhetimet; nuk mund te ndryshosh oren e shoferit.</p>
      )}
      <p>
        <Link href="/">Kthehu te udhetimet</Link>
      </p>
    </main>
  );
}
