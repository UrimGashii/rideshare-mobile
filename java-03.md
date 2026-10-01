# Java 3 — kartat dhe faqet

## Prova 1: Lista dhe responsive design
Në faqen kryesore shfaqen saktësisht tri karta me udhëtime: Prishtinë, Fushë Kosovë dhe Lipjan. Këto karta vijnë nga lista e të dhënave në `udhetimet` dhe përmes komponentit `KartaUdhetimi.tsx`. Secila kartë shfaq nisjen, destinacionin, orën dhe numrin e vendeve të lira me styling responsive që përshtatet në madhësi të ndryshme ekrani. Karta e Lipjanit me 0 vende mbetet në listë por nuk lejon kërkesën vend.

## Prova 2: Detajet e udhëtimit
Klikimi i kartës së dytë hap rrugën `/udhetimi/2` ku shfaqen të gjithë detajet: nisja, destinacioni, ora, vendtakimi dhe numri vendesh të lira. Sistemi kontrollon nëse ka vende të lira - nëse po, butoni "Kërko vend" shfaqet aktiv; nëse jo, butoni "Nuk ka vende të lira" shfaqet i çaktivizuar. Lidhja kthehu te lista punon dhe na dërgon mbrapa në faqen kryesore.

## Prova 3: Simulimi i kërkesës dhe kthimi mbrapa
Faqja e kërkesës përdor lidhjen `/udhetimi/[id]/kerkesa` dhe, për udhëtimet me vende të lira, shfaq tekstin "Simulim: Në pritje" me shpjegimin se kërkesa nuk është dërguar te shoferi, pasi sistemi nuk ka pagesë ose databazë reale. Përdoruesi mund të kthehet mbrapa tek detajet e udhëtimit përmes lidhjes së navigimit.

## Përfundim
Rrjedha e aplikacionit funksionon sipas specifikimeve: lista → detaje → kërkesë → kthim mbrapa, pa databazë, pagesë ose rezervim real. Aplikacioni është mobil-vëndor dhe ka strukturë të qartë me komponentë React dhe rute të dinamike Next.js.
