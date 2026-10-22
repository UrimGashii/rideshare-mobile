# Java 6: PWA dhe lexim offline

## Prova 1 · Manifesti dhe vizita online

- Pritja: `/manifest.webmanifest` dhe ikonat 192×192/512×512 janë të disponueshme; worker-i regjistrohet pas vizitës online.
- Rezultati: Build-i i Next.js kaloi dhe manifesti u gjenerua. Verifiko në DevTools që worker-i dhe cache janë aktivë.

## Prova 2 · Pa internet, edhe pas rifreskimit

- Pritja: `/offline.html` shfaq tri karta dhe kohën e kopjes pas rifreskimit offline; butoni i rezervimit mbetet i çaktivizuar.
- Rezultati: Për t’u verifikuar në Chrome/Edge me Network → Offline.

## Prova 3 · Rikthe lidhjen dhe kërko të dhënat e reja

- Pritja: pas ndryshimit të orës në databazë dhe klikimit “Rifresko listën”, shfaqet burimi server dhe koha e re.
- Rezultati: Për t’u verifikuar me Neon dhe më pas ora të rikthehet në vlerën fillestare.

## Kontroll teknik

- `npm run build`: kaloi me sukses.
- API publike: `GET /api/udhetimet` kthen vetëm fushat publike të udhëtimit.
