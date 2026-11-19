# Java 10 - Dy ekrane, nje gjendje

## Zbatimi

- `aplikacioni/schema-java10.sql` krijon tabelen `kerkesat` me nje kerkese per udhetar dhe udhetim.
- `aplikacioni/src/lib/kerkesat.ts` lexon gjendjen sipas sesionit dhe zbaton kerkesen/pranimin ne server.
- Endpoint-i `gjendja` eshte pa cache; komponenti `GjendjaLive` rilexon cdo 5 sekonda, anulon leximin e vjeter dhe ruan pamjen e fundit kur rrjeti deshton.
- `/udhetimi/[id]/kerkesa` dhe `/udhetimi/[id]/shofer` jane dy ekranet e te njejtit udhetim.

## Pergatitja

Migrimi `schema-java10.sql` u aplikua ne branch-in kryesor te Neon-it dhe tabela `kerkesat` u verifikua me 0 kerkesa fillestare. Per proven perdor nje udhetim me 2 vende, nje profil shofer pronar dhe nje profil udhetar ne dy sesione te ndara.

## Provat

### Rasti 1 - Kerkesa pa Refresh

Parashikimi: udhetari dergon kerkesen; pas maksimumi 5 sekondash shoferi sheh `Ne pritje`, ndersa vendet mbeten `2`. Network duhet te tregoje `GET /api/udhetimet/[id]/gjendja` me kerkesen e ruajtur.

Rezultati per t'u shenuar pas ekzekutimit: ID-ja e udhetimit, koha e rileximit dhe ajo qe pane te dy ekranet.

### Rasti 2 - Pranimi dhe idempotenca

Parashikimi: pranimi e ndryshon kerkesen ne `U pranua` dhe vendet nga `2` ne `1` ne te dy ekranet. Klikimi i pranimit perseri duhet t'i lere vendet ne `1`; serveri nuk e ul perseri numrin. Kur vendet jane `0`, kerkesa e re nuk pranohet.

Rezultati per t'u shenuar pas ekzekutimit: statusi, vendet para/pas dhe rezultati i klikimit te dyte.

### Rasti 3 - Offline dhe rilidhja

Parashikimi: vendos vetem dritaren e udhetarit ne Network > Offline. Ajo duhet te ruaje pamjen e fundit dhe te shfaqe `Po rilidhemi`; shoferi online pranon kerkesen. Pas kthimit ne `No throttling`, pa Refresh manual, udhetari duhet te shohe `U pranua` dhe `1` vend.

Rezultati per t'u shenuar pas ekzekutimit: ID-ja e udhetimit te dyte, pamja offline dhe pamja pas rilidhjes.

## Pse timer-i nuk mjafton

Timer-i vetem rilexon gjendjen; ai nuk garanton qe dy kerkesa paralele nuk do ta ulin vendet dy here. Pranimi kontrollon pronarin ne server, bllokon rreshtat ne SQL, e ul `vende` vetem kur kerkesa eshte `ne_pritje` dhe vendet jane mbi zero, dhe perdor `UNIQUE (udhetim_id, udhetar_id)`.

## Kontrolli teknik

`npm.cmd run build` kaloi me sukses. Gjithashtu u verifikuan lokalisht `GET /api/udhetimet` dhe faqja e udhëtarit me status `200`. Provat e dy sesioneve dhe rezultatet e Network duhen kryer me dy llogari GitHub te ndara.
