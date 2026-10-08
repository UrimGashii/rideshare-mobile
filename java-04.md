# Java 4 — RideShare me Neon

## Ndryshimet

- Lista e udhëtimeve lexohet nga PostgreSQL/Neon përmes `@neondatabase/serverless`.
- Detajet dhe faqja e kërkesës përdorin të njëjtin lexim nga databaza.
- `schema.sql` krijon tabelën `udhetimet` dhe tri të dhënat fiktive.
- `DATABASE_URL` lexohet vetëm në server dhe përjashtohet nga Git me `.env*`.

## Prova 1: Ndryshimi në databazë

Në Neon/Vercel u ekzekutua:

```sql
UPDATE udhetimet SET ora = '08:25' WHERE id = '2';
```

Pas ndryshimit, deployment-i Production shfaqi `08:25` në listë/detaje. Ora u rikthye në `08:15` pas provës.

## Prova 2: Lista bosh

Query-ja për listën është gati për provën e përkohshme me `WHERE false`; pas heqjes së kushtit kthehen tri udhëtime nga Neon.

## Prova 3: Mungesa e lidhjes

Kur `DATABASE_URL` mungon, kodi shfaq `Nuk u lidhëm me databazën. Provo përsëri.`; variabla është konfiguruar në Vercel dhe `.env.local`.

## Kontroll teknik

`npm run build` dhe build-i Production përfunduan me sukses. Neon u provisionua dhe u lidh me Vercel në Development, Preview dhe Production. `DATABASE_URL` mbetet vetëm në environment variables dhe `.env.local`; nuk është në Git.
