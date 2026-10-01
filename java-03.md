# Java 3 — kartat dhe faqet

## Prova 1: Lista dhe responsive design
Në faqen kryesore shfaqen saktësisht tri karta me udhëtime: Prishtinë, Fushë Kosovë dhe Lipjan. Këto karta vijnë nga lista e të dhënave në `udhetimet` dhe përmes komponentit `KartaUdhetimi`. Secila kartë shfaq nisjen, destinacionin, orën dhe numrin e vendeve të lira. Karta e Lipjanit ka 0 vende, ndaj shfaq statusin "Nuk ka vende" në mënyrë vizuele.

## Prova 2: Detajet e udhëtimit
Klikimi i kartës së dytë (Fushë Kosovë) hap rrugën `/udhetimi/2`, ku shfaqen detajet e plota: nisja "Fushë Kosovë", destinacioni "AAB", ora "08:15", vendtakimi "Te stacioni kryesor" dhe numri i vendeve të lira (1). Karta ka vende, kështu që butoni "Kërko vend" është aktiv dhe i klikueshëm. Nëse klikohej karta e Lipjanit (id=3), butoni do të ishte i çaktivizuar sepse nuk ka vende të lira.

## Prova 3: Simulimi i kërkesës dhe kthimi mbrapa
Faqja e kërkesës përdor lidhjen `/udhetimi/[id]/kerkesa` dhe, për udhëtimet me vende të lira, shfaq tekstin "Simulim: Në pritje". Kjo tregon se kërkesa është e simuluar dhe nuk është dërguar te një shoferi real. Përdoruesi mund të kthehet mbrapa në detajet e udhëtimit ose në listën kryesore përmes lidhjeve të navigimit.

## Përfundim
Rrjedha e aplikacionit funksionon sipas specifikimeve: lista → detaje → kërkesë → kthim mbrapa, pa databazë, pagesë ose rezervim real. Aplikacioni është mobil-vëndor dhe ka strukturë të qartë me komponentë dhe rute të dinamike.
