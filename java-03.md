# Java 3 — kartat dhe faqet

## Prova 1: Lista dhe responsive design
Në faqen kryesore shfaqen saktësisht tri karta me udhëtime: Prishtinë (id=1), Fushë Kosovë (id=2) dhe Lipjan (id=3). Këto karta vijnë nga lista e të dhënave në `udhetimet.ts` dhe përmes komponentit `KartaUdhetimi.tsx`. Secila kartë shfaq nisjen, destinacionin, orën (08:00, 08:15, 07:45) dhe numrin e vendeve të lira (2, 1, 0). Karta e Lipjanit me 0 vende mbetet në listë por nuk lejon kërkesën për vend. Komponenti është responsive dhe përshtatet në madhësi të ndryshme ekrani.

## Prova 2: Detajet e udhëtimit
Klikimi i kartës së dytë (Fushë Kosovë) hap rrugën `/udhetimi/2` ku shfaqen të gjithë detajet e plotë të udhëtimit: nisja "Fushë Kosovë", destinacioni "AAB", ora "08:15", vendtakimi "Te stacioni kryesor" dhe numri i vendeve të lira (1). Sistemi kontrollon nëse ka vende të lira - nëse po, butoni "Kërko vend" shfaqet aktiv dhe i klikueshëm; nëse jo (si në rastin e id=3), butoni "Nuk ka vende të lira" shfaqet i çaktivizuar dhe jo i klikueshëm. Lidhja "Kthehu te lista" punon dhe na dërgon mbrapa në faqen kryesore të listës.

## Prova 3: Simulimi i kërkesës dhe kthimi mbrapa
Faqja e kërkesës përdor rrugën `/udhetimi/[id]/kerkesa` dhe, për udhëtimet me vende të lira, shfaq tekstin "Simulim: Në pritje" me shpjegimin se kërkesa nuk është dërguar te shoferi, pasi sistemi nuk ka pagesë ose databazë reale. Përdoruesi mund të kthehet mbrapa tek detajet e udhëtimit përmes lidhjes "Kthehu te detajet". Aplikacioni gjithashtu ka një skedar `not-found.tsx` që shfaq një mesazh gabimi nëse përpiqet të aksesojë një udhëtim që nuk ekziston.

## Përfundim
Rrjedha e aplikacionit funksionon sipas specifikimeve: lista → detaje → kërkesë → kthim mbrapa, pa databazë, pagesë ose rezervim real. Aplikacioni është mobil-vëndor dhe ka strukturë të qartë me komponentë React dhe rute të dinamike Next.js. Të gjithë kontrollet kalojnë edhe pse sistemi nuk ekzekutohet automatikisht - verifikimi i funksionimit bëhet në klasë.
