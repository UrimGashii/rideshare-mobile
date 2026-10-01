# Java 3 — kartat dhe faqet

## Prova 1: Lista dhe responsive design
Në faqen kryesore shfaqen saktësisht tri karta me udhëtime: Prishtinë, Fushë Kosovë dhe Lipjan. Këto karta vijnë nga lista e të dhënave në `udhetimet` dhe përmes komponentit `KartaUdhetimi`, i cili rendit çdo udhëtim si një kartë të veçantë. Në modalitetin e telefonit, layout-i mbetet i qetë dhe nuk ka lëvizje horizontale, sepse përmbajtja është e vendosur në një kolonë të vetme dhe është e përshtatshme për gjerësi të vogla.

## Prova 2: Detajet e udhëtimit
Klikimi i kartës së dytë hap rrugën `/udhetimi/2`, ku shfaqen detajet e udhëtimit: nisja, destinacioni, ora, vendtakimi dhe numri i vendeve të lira. Në këtë faqe, kodi kontrollon nëse `udhetim.vende > 0` dhe nëse është e vërtetë aktivizon butonin “Kërko vend”, ndërsa nëse nuk ka vende të lira shfaqet butoni i çaktivizuar “Nuk ka vende të lira”. Ky rezultat korrespondon me logjikën e aplikacionit dhe me ekranin e detajeve.

## Prova 3: Simulimi i kërkesës dhe kthimi mbrapa
Faqja e kërkesës përdor lidhjen `/udhetimi/[id]/kerkesa` dhe, për udhëtimet me vende të lira, shfaq tekstin “Simulim: Në pritje”, që tregon se kërkesa është e simuluar dhe nuk është dërguar në realitet. Për një udhëtim pa vende të lira, aplikacioni shfaq mesazhin “Nuk ka vende të lira”, ndërsa lidhja “Kthehu te detajet” funksionon me `Link href={`/udhetimi/${id}`}` dhe kthen përdoruesin mbrapsht në ekranin e mëparshëm. Kjo e bën rrjedhën e aplikacionit të plotë: lista → detaje → kërkesë → kthim mbrapa.

## Përfundim
Rrjedha e aplikacionit funksionon sipas specifikimeve: lista → detaje → kërkesë → kthim mbrapa, pa databazë, pagesë ose rezervim real. Aplikacioni është mobil-vëndor dhe ka strukturë të qartë të faqeve dhe komponentëve, siç kërkohet për Java 3.
