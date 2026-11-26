# Java 11 - Njoftimi personal i pergjigjes

## Zbatimi

- `aplikacioni/schema-java11.sql` krijon tabelen `njoftimet`; `kerkesa_id` eshte unike dhe `lexuar_me` nis si `NULL`.
- Pranimi i shoferit e krijon njoftimin ne te njejten rrjedhe te kontrolluar te serverit. `ON CONFLICT (kerkesa_id) DO NOTHING` mbron nga kopjet.
- `/njoftimet` lexon vetem njoftimet e udhetarit nga sesioni dhe rilexon cdo 5 sekonda.
- `/njoftimet/[id]` hap kerkesen e sakte dhe e shenon si te lexuar vetem kur `marresi_id` perputhet me sesionin.

## Provat

### Rasti 1 - Pergjigjja behet njoftim

Shoferi pranoi nje kerkese ne pritje. Udhetari pa nje njoftim te palexuar me ID te kerkesës dhe statusin e pranimit. Pas leximeve te njepasnjeshme numri i rekordeve mbeti 1.

### Rasti 2 - Hapja dhe leximi

Hapja nga lista shkoi te kerkesa e ruajtur. Pas ruajtjes se leximit, numri i te palexuarave u be 0; njoftimi mbeti ne histori edhe pas rifreskimit.

### Rasti 3 - Rilidhja

Me udhetarin offline gjate pranimit, pas rikthimit te rrjetit polling-u solli njoftimin. Leximet e tjera nuk shtuan rekord ose njoftim te dyte.

## Kufizime

Web Push nuk u konfigurua, sipas kerkeses baze te ushtrimit. Zgjidhja perdor polling ne aplikacion dhe nuk vendos sekrete ne repository.
