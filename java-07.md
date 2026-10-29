# Java 7 - Provo, korrigjo dhe shpjego RideShare-in

## Rasti im (P7-024, GitHub: UrimGashii)

- Rasti 3 - Klikim apo rezervim
- ID e proves: `2`

## Parashikimi

Kur zgjedh udhetimin me ID 2 nga lista, i njejti ID dhe te njejtat vlera duhet te shfaqen ne detaje. Kerkesa duhet te jete vetem simulim: nuk ka rezervim dhe nuk dergohet njoftim real te shoferi.

## Ndryshimi i ri

Shtova shfaqjen e ID-se ne faqen e detajeve dhe nje mesazh te qarte qe kerkesa eshte demonstrative, pa rezervim real dhe pa njoftim te shoferit.

## Dy probleme

1. Faqja e detajeve nuk e shfaqte qarte ID-ne, prandaj ishte me e veshtire te verifikohej rrjedha liste -> detaje.
2. Faqja e kerkeses nuk e theksonte mjaftueshem se veprimi nuk ishte rezervim real dhe nuk dergonte njoftim.

## Korrigjimi

Skedari: aplikacioni/src/app/udhetimi/[id]/page.tsx

Arsyeja: perdoruesi duhet te ndjeke te njejtin ID dhe te dalloje simulimin nga rezervimi real.

## Prova 1

### Hapat

Hapa listen, zgjodha udhetimin me ID 2, hapa detajet dhe klikova “Provo kerkesen - simulim”.

### Pritshmëria

Detajet duhet te tregojne ID 2, nisjen, destinacionin dhe oren e udhetimit te zgjedhur. Faqja tjeter duhet te tregoje se eshte simulim.

### Vëzhgimi

ID 2 dhe vlerat perputhen. Faqja shfaq “Kerkese demonstrative - simulim” dhe sqaron se nuk ka rezervim real.

## Prova 2

### Hapat

Perserita klikimin e kerkeses per ID 2.

### Pritshmëria

Nuk duhet te shfaqet “u konfirmua” dhe nuk duhet te premtohet rezervim ose njoftim.

### Vëzhgimi

Shfaqet se kerkesa nuk eshte derguar te shoferi dhe se ruajtja/konfirmimi real do te shtohet me vone. Prova kaloi.

## Prova 3

### Hapat

Hapa `/udhetimi/999`, nje ID qe nuk ekziston ne te dhenat e proves.

### Pritshmëria

Duhet te shfaqet mesazh i qarte “Udhetimi nuk u gjet” dhe lidhje per t’u kthyer te lista.

### Vëzhgimi

U shfaq faqja “Udhetimi nuk u gjet” me lidhje per kthim te lista. Prova kaloi.

## Kontrolli teknik

- `npm.cmd run build`: kaloi me sukses.
- Ndryshimi u kontrollua ne projektin lokal.

## Versionet ne GitHub

- Para: https://github.com/UrimGashii/rideshare-mobile/commit/c384aa174006c63deb6fbe86a5f9a12fc7354f24
- Pas: https://github.com/UrimGashii/rideshare-mobile/commit/a2d310b

## Ndihma nga AI

AI me ndihmoi te kontrolloj strukturen e projektit, te gjej faqet e listes/detajeve/kerkeses dhe te verifikoj build-in. Ndryshimin e kuptova dhe e kontrollova ne aplikacionin tim.
