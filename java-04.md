# Java 4 — RideShare me Neon

## Ndryshimet

- Lista e udhëtimeve lexohet nga PostgreSQL/Neon përmes `@neondatabase/serverless`.
- Detajet dhe faqja e kërkesës përdorin të njëjtin lexim nga databaza.
- `schema.sql` krijon tabelën `udhetimet` dhe tri të dhënat fiktive.
- `DATABASE_URL` lexohet vetëm në server dhe përjashtohet nga Git me `.env*`.

## Prova 1

Hapat:

Në Neon SQL Editor u ekzekutua:

```sql
UPDATE udhetimet SET ora = '08:25' WHERE id = '2';
```

Rezultati:

Pas rifreskimit, lista dhe faqja `/udhetimi/2` shfaqën `08:25`, pa ndryshuar kodin. Pastaj ekzekutova `UPDATE udhetimet SET ora = '08:15' WHERE id = '2';` dhe e verifikova që ora u rikthye në `08:15`.

## Prova 2

Hapat:

Në `src/lib/udhetimet.ts` shtova përkohësisht `WHERE false` në query-n `SELECT` të listës, e ruajta dhe rifreskova faqen. Pastaj e hoqa `WHERE false`, e ruajta përsëri dhe rifreskova faqen.

Rezultati:

Me `WHERE false` faqja shfaqi `Nuk ka udhëtime për momentin.` pa fshirë rreshta. Pas heqjes së tij u kthyen tri kartat nga Neon.

## Prova 3

Hapat:

E riemërtova përkohësisht variablën lokale `DATABASE_URL` në `DATABASE_URL_PA_TEST`, ndalova dhe rinisa `npm run dev`, dhe rifreskova listën. Pastaj e riktheva emrin `DATABASE_URL`, rinisa serverin dhe rifreskova përsëri.

Rezultati real:

Kur lidhja mungoi, faqja shfaqi `Nuk u lidhëm me databazën. Provo përsëri.`. Pas rikthimit të `DATABASE_URL`, tri udhëtimet u shfaqën përsëri. Skedari `.env.local` nuk u publikua.

## Kontroll teknik

`npm run build` dhe build-i Production përfunduan me sukses. Neon u provisionua dhe u lidh me Vercel në Development, Preview dhe Production. `DATABASE_URL` mbetet vetëm në environment variables dhe `.env.local`; nuk është në Git.
