# Java 5 - RideShare: hyrja me GitHub dhe ndryshimi me leje

## Ndryshimet

- U shtua `next-auth@4.24.15` me GitHub OAuth dhe sesion JWT dy oresh.
- Sesioni ruan vetem GitHub ID-ne e vertetuar. Roli dhe pronari lexohen ne server nga Neon.
- `schema-java05.sql` krijon tabelen `profilet`, shton `shofer_id` te `udhetimet` dhe cakton pronarin demonstrues te ID 1.
- Veprimi i serverit ndryshon oren vetem kur perdoruesi ka rol `shofer` dhe eshte pronari i udhetimit.
- `.env.local` mbahet jashte Git; permban `DATABASE_URL`, `GITHUB_ID`, `GITHUB_SECRET`, `NEXTAUTH_SECRET` dhe `NEXTAUTH_URL`.

## Konfigurimi lokal

OAuth App i GitHub duhet te perdore keto adresa:

- Homepage URL: `http://localhost:3000`
- Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

Pas hyrjes se pare, kopjo GitHub ID-ne qe shfaqet te `/panel` dhe ekzekuto ne Neon SQL Editor:

```sql
UPDATE profilet SET roli = 'shofer' WHERE github_id = 'SHENO_ID_TENDE';
UPDATE udhetimet SET shofer_id = 'SHENO_ID_TENDE' WHERE id = '2';
SELECT id, ora, shofer_id FROM udhetimet ORDER BY id;
```

## Prova 1 - Sesioni

Hyrja, rifreskimi i panelit dhe dalja duhet te provohen lokalisht pasi te vendosen kredencialet personale te OAuth App. Rezultati i pritur: emri dhe roli mbeten pas rifreskimit; pas `Dil`, paneli kerkon hyrje perseri.

## Prova 2 - Veprimi i lejuar

Si pronar me rol `shofer`, vendos `08:25` per ID 2 dhe kliko `Ruaj oren`. Rezultati i pritur: paneli tregon sukses dhe lista, faqja `/udhetimi/2` dhe Neon tregojne `08:25`. Pastaj rikthe oren ne `08:15`.

## Prova 3 - Refuzimi i pronarit tjeter

Ne DevTools ndrysho perkohesisht fushen e fshehte `id` nga `2` ne `1` dhe dergo formularin. Rezultati i pritur: paneli shfaq "Nuk ke leje per kete udhetim" dhe ID 1 mbetet `08:00` ne Neon.

## Kontroll teknik

`npm run build` duhet te perfundoje pasi te jene vendosur variablat personale ne `.env.local`. Sekretet nuk publikohen ne repository.
