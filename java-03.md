# Java 3 — kartat dhe faqet

## Prova 1: Lista dhe responsive design
Në faqen kryesore shfaqen saktësisht tri karta me udhëtime fiktive (Prishtinë, Fushë Kosovë, Lipjan). Në modalitetin e telefonit (375px), e-mail nuk ka lëvizje horizontale dhe të gjitha kartat janë të lexueshme.

## Prova 2: Detajet e udhëtimit
Klikimi i kartës së dytë shpie te /udhetimi/2 dhe shfaq detajet: nisja, destinacioni, ora, vendtakimi dhe numri i vendeve të lira. Butoni "Kërko vend" është aktiv sepse karta 2 ka 1 vend të lirë. Adresa /udhetimi/99 sjell mesazhin "Udhëtimi nuk u gjet" dhe lidhjen për kthim te lista.

## Prova 3: Simulimi i kërkesës dhe kthimi mbrapa
Faqja e kërkesës shfaq "Simulim: Në pritje" për udhëtimet me vende të lira. Për kartën 3 (zero vende), butoni "Nuk ka vende të lira" është i çaktivizuar. Lidhjet e kthimit punojnë në të gjitha faqet.

## Përfundim
Rrjedha e aplikacionit funksionon sipas specifikimeve: lista → detaje → kërkesë → kthim mbrapa, pa databazë, pagesë ose rezervim real. Aplikacioni është mobil-vëndedor dhe përputhje me dizajnin e skicës.
