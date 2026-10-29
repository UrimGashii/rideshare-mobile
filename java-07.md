# Java 7 · Provo, korrigjo dhe shpjego RideShare-in

## Rasti im

- Rasti 3 · Klikim apo rezervim
- ID-ja e provës: `2`
- Emri publik në GitHub: `UrimGashii`

## Parashikimi fillestar

Kur zgjedh të njëjtin udhëtim nga lista, ID-ja duhet të çojë te detajet e atij udhëtimi dhe vlerat duhet të jenë të njëjta. Te kërkesa demonstrative duhet të kuptohet se veprimi është vetëm simulim; nuk duhet të pretendohet rezervim ose njoftim real te shoferi.

## Dy probleme ose paqartësi

1. Në faqen e detajeve nuk shfaqej qartë ID-ja, prandaj ishte më e vështirë të verifikohej se lista dhe detajet përdornin të njëjtin udhëtim.
2. Faqja e kërkesës e quante veprimin simulim, por nuk e theksonte mjaftueshëm se nuk ishte rezervim real dhe nuk dërgonte njoftim te shoferi.

## Korrigjimi

- Skedari: `aplikacioni/src/app/udhetimi/[id]/page.tsx`
- Skedari: `aplikacioni/src/app/udhetimi/[id]/kerkesa/page.tsx`
- Ndryshimi: shtova shfaqjen e ID-së në detaje dhe një mesazh të qartë statusi në faqen e kërkesës: veprimi është demonstrativ, pa rezervim real dhe pa njoftim te shoferi.
- Arsyeja: përdoruesi duhet të dallojë një klikim/simulim nga një rezervim i vërtetë dhe të mund të ndjekë të njëjtin ID në të dy ekranet.

## Tri prova reale

### Prova 1 · Rrjedha listë → detaje → kërkesë

- Hapat: hapa listën, zgjodha udhëtimin me ID `2`, hapa detajet dhe klikova “Provo kërkesën · simulim”.
- Pritshmëria: detajet tregojnë të njëjtën ID, nisje, destinacion dhe orë; faqja tjetër tregon se është vetëm simulim.
- Vëzhgimi: ID-ja `2` dhe vlerat përputhen; faqja shfaq “Kërkesë demonstrative · simulim” dhe sqaron se nuk ka rezervim real.

### Prova 2 · Korrigjimi i simulimit

- Hapat: përsërita klikimin e kërkesës për ID-në `2`.
- Pritshmëria: nuk shfaqet “u konfirmua” dhe nuk premtohet rezervim ose njoftim.
- Vëzhgimi: shfaqet mesazhi se kërkesa nuk është dërguar te shoferi dhe se ruajtja/konfirmimi real do të shtohet më vonë. Prova kaloi.

### Prova 3 · ID tjetër ose hyrje kufizuese

- Hapat: hapa `/udhetimi/999`, një ID që nuk ekziston në të dhënat e provës.
- Pritshmëria: ID-ja e panjohur të japë mesazh të qartë “Udhëtimi nuk u gjet”; me 0 vende të mos premtohet kërkesë.
- Vëzhgimi: u shfaq faqja “Udhëtimi nuk u gjet” me lidhje për t’u kthyer te lista. Prova kaloi.

## Kontrolli teknik

- `npm.cmd run build`: kaloi me sukses.
- Ndryshimi u kontrollua në projektin lokal.

## Versionet në GitHub

- Para: https://github.com/UrimGashii/rideshare-mobile/commit/c384aa174006c63deb6fbe86a5f9a12fc7354f24
- Pas: https://github.com/UrimGashii/rideshare-mobile/commit/a2d310b
- Issue i dorëzimit: duhet të krijohet në repository-n e lëndës nga formulari i dorëzimit; ky link nuk është i disponueshëm në repository-n personal.

## Ndihma nga AI

Kërkova ndihmë për të kontrolluar strukturën e projektit, për të gjetur faqet e listës/detajeve/kërkesës dhe për të verifikuar build-in. Ndryshimin e kuptova dhe e kontrollova në aplikacionin tim; nuk publikova të dhëna reale ose `.env`.
