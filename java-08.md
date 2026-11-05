# Java 8 - Sensorët dhe Device APIs në RideShare

## Rasti im

- Faqja: `/udhetimi/2/kerkesa`
- ID e provës: `J8-001`
- Të dhënat e provës: fiktive; nuk përdora adresën time reale në raport.

## Parashikimi

Leja e vendndodhjes nuk duhet të kërkohet kur hapet faqja. Ajo duhet të kërkohet vetëm pasi përdoruesi të shtypë `Përdor vendndodhjen time`. Nëse leja pranohet, faqja duhet të shfaqë një përmbledhje të pikës së nisjes. Nëse leja refuzohet ose pajisja nuk e mbështet API-n, përdoruesi duhet të vazhdojë me `Shkruaj vendtakimin`.

## Zbatimi

Shtova komponentin `aplikacioni/src/components/PikaNisjes.tsx` dhe e përdora në faqen e kërkesës demonstrative. Komponenti përdor `navigator.geolocation.getCurrentPosition` vetëm nga klikimi i butonit, shfaq koordinata të rrumbullakosura dhe ka gjendje të veçanta për kërkesë në proces, sukses, refuzim, gabim dhe mungesë mbështetjeje.

## Provat

### Prova 1 - Leja nuk kërkohet në hapje

**Pritshmëria:** Hapja e faqes nuk shfaq dialog lejeje dhe nuk shfaq mesazh kërkimi.

**Kontrolli lokal:** Faqja hapet me butonin e vendndodhjes; kodi nuk e thërret API-n gjatë renderimit. Konfirmoje edhe në telefon.

### Prova 2 - Pranimi i lejes

**Hapat:** Klikova butonin dhe përdora vendndodhje fiktive `42.6629, 21.1655` në pajisjen/testuesin.

**Pritshmëria:** Shfaqet përmbledhja e pikës së nisjes dhe koordinatat nuk përmbajnë adresë reale.

**Kontrolli lokal:** Callback-u i suksesit shfaq koordinatat e rrumbullakosura. Plotëso rezultatin real pas testimit në telefon.

### Prova 3 - Refuzimi i lejes

**Pritshmëria:** Refuzimi nuk e bllokon faqen; shfaqet alternativa për të shkruar vendtakimin.

**Kontrolli lokal:** Callback-u i refuzimit shfaq mesazhin dhe fushën `Shkruaj vendtakimin`. Plotëso rezultatin real pas testimit në telefon.

### Prova 4 - Vendtakimi manual

**Hapat:** Shkrova `Biblioteka e AAB-së` dhe zgjodha `Ruaj vendtakimin`.

**Pritshmëria:** Shfaqet vendtakimi i shkruar dhe faqja mbetet e përdorshme.

**Kontrolli lokal:** Formulari ruan vendtakimin manual në gjendjen e komponentit. Plotëso rezultatin real pas testimit në telefon.

### Prova 5 - Mungesa e mbështetjes

**Pritshmëria:** Kur `navigator.geolocation` mungon, shfaqet mesazh i qartë dhe alternativa manuale.

**Kontrolli lokal:** Kontrolli i `navigator.geolocation` ka gjendje `pa mbështetje` dhe lejon vendtakimin manual. Plotëso rezultatin real pas testimit.

## Kontrolli teknik

- `npm.cmd run build`: duhet të përfundojë me sukses.
- Komponenti është klient dhe `navigator` lexohet vetëm pas klikimit.

## Ndihma nga AI

AI më ndihmoi të kontrolloj strukturën ekzistuese, të zbatoj rrjedhën e lejes me hapa të vegjël dhe të përgatis raportin. Sjelljet dhe rezultatet duhet të rikonfirmohen në telefonin tim para dorëzimit.
