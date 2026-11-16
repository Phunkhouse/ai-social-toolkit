# Čeština: přirozený jazyk pro sociální sítě

Pravidla jazyka, ne značky. Platí pro každý projekt, který píše česky; tón, humor a slovník konkrétní značky patří do jejího `docs/social/brand-voice.md`. Mechanicky kontrolovatelná pravidla jsou v [`cs.lint.json`](cs.lint.json) (varování W1); ostatní hlídá Claude při psaní a vlastník při kontrole (W8).

Příspěvek může být gramaticky správně a přesto znít jako překlad, šablona nebo chatbot. Tato pravidla vznikla z takových chyb.

## Psát česky, ne překládat

- **Větu vymysli česky**, jak bys ji řekl kamarádovi, a teprve pak ji napiš. Žádné anglické větné vzorce a kalky (*dvojitý program* pro double feature, *Stihneš oba?* jako hook, *udělat rozdíl*, *na konci dne*, *dává to smysl* tam, kde něco „je rozumné“).
- **Česká verze není překlad anglické.** Dvojjazyčný projekt píše každou verzi zvlášť ze stejných faktů. Pořadí informací, úvod i pointa se mohou lišit.
- **Konverzačně, ne reklamně.** *Hned tenhle víkend je z čeho vybírat* místo *Nenech si ujít tento víkend plný zážitků*. Obyčejná slovesa, konkrétní podstatná jména.
- **Nahlas.** Kdyby věta zněla divně řečená přes stůl v kavárně, přepiš ji. Když si nejsi jistý, označ ji pro vlastníka.

## Oslovení

- Projekt volí **tykání nebo vykání** v `config.json` (`languages.cs.address`: `ty` | `vy`) a drží ho ve všech příspěvcích. Lint hlídá tvary druhé strany (*máte*, *najdete* při tykání; *máš*, *najdeš* při vykání).
- Vykání v příspěvku je *vy* (malé), velké *Vy* jen v osobním dopise.
- Neoslovovat množné číslo jako dav (*Ahoj všichni!*, *Milí fanoušci*).

## Rod bez lomítek

- **Nikdy** *rád/a*, *viděl/a*, *byl(a)*, *uživatel/ka*.
- Raději vazba bez minulého příčestí: *Co tě láká?*, *Který film tě zaskočil?*, *Jaký nástroj podle tebe chybí?*
- Kde by neutrální verze zněla strojeně, použij mužský tvar jako výchozí: *Který film bys chtěl vidět v kině?*
- Nestřídat rody v jednom příspěvku ani mezi příspěvky téhož týdne.

## Úvod a otázky

- **Žádné robotické úvody:** *Ahoj, tady …*, *Vítejte na našem profilu*, *Jsme … a …*, *Dnes vám přinášíme*. Začni věcí: co se děje, proč na tom záleží, co nás přimělo psát.
- **Otázka jen tehdy, když stojí za odpověď:** konkrétní, jednoznačná, taková, na kterou lidé rádi odpoví. Nikdy jako zesilovač dosahu (*Co na to říkáte?*, *Souhlasíš?*, *Dejte vědět v komentářích*). Nejvýš jedna na příspěvek; většina příspěvků žádnou nepotřebuje.
- **Bez výzev k interakci** (*Sdílej, ať se to dozví všichni*, *Označ kamaráda*), pokud je projekt výslovně nechce.

## Humor a idiomy

- Humor jen tehdy, když sedne sám. Žádný vtip přilepený k faktu, žádná předem ohlášená sebeironie (*a slibujeme, že krátce*), žádné násilné idiomy (*vylézt z gauče*, *nabité k prasknutí*).
- Příspěvek bez vtipu je v pořádku; vtip, který mine, ne.
- U vážných témat (válka, smrt, nemoc, pronásledování) žádný humor.

## Obsah

- **Odborné slovo vysvětli v běhu věty**, ne přednáškou: *nová 4K verze* místo *remaster*; to, co zná každý, nevysvětluj.
- **Fakta zůstávají přesná, i když se mění formulace.** Přepis nikdy nezesiluje tvrzení: *možné pokračování* zůstává *možné*.
- **Pocit má přednost před náhodou.** Chytrá souvislost (datum, které se rýmuje s příběhem) je nanejvýš poznámka; hlavní je, proč to člověka zajímá.

## Prázdná slova

Varování, ne zákaz; kontext rozhoduje. Projekt přidává svá v `lint.avoid.cs`.

| Místo | Napiš |
| --- | --- |
| *unikátní*, *jedinečný*, *nadčasový*, *ikonický*, *legendární* (volně) | Co to konkrétně dělá |
| *Nenechte si ujít*, *Neváhejte*, *Neotálejte* | Proč a kdy, bez nátlaku |
| *Přinášíme vám*, *S radostí oznamujeme* | Rovnou to oznam |
| *v dnešní uspěchané době*, *ponořte se do*, *posuňte na další úroveň* | Nic, nebo konkrétní věc |
| *must-see*, *hidden gem*, *vibe*, *game changer* | Obyčejná čeština |
| *naprosto*, *absolutně*, *opravdu* před každým přídavným jménem | Vynechat |

Anglická slova jen tam, kde je čeština běžně používá (*film noir*, *open source*, *newsletter*).

## Typografie

| Co | Pravidlo | Příklad |
| --- | --- | --- |
| Datum | Den slovem, když je blízko (*dnes*, *zítra*, *ve čtvrtek*), jinak zkratka dne a datum s mezerami; dny a měsíce malým písmenem | *čt 20. 11.*, *20. listopadu 2026* |
| Čas | 24hodinový, dvojtečka, bez AM/PM | *19:30*, *9:00* |
| Rozsah | Pomlčka bez mezer | *10–12 h*, *16.–22. 11.* |
| Čísla | Mezera jako oddělovač tisíců, desetinná čárka | *1 000*, *2,5 %* |
| Měna a jednotky | Mezera před jednotkou, symbol za číslem | *250 Kč*, *5 km*, *20 %* |
| Uvozovky | Dolní a horní, vnořené jednoduché | *„Hraj to znovu, Same“*, *‚…‘* |
| Pomlčka a spojovník | Pomlčka s mezerami ve větě, spojovník bez mezer ve slově | *Kino – a to je hlavní – je zdarma.*, *česko-slovenský* |
| Nezlomitelná mezera | Za jednopísmennými předložkami a spojkami (*v, k, s, z, o, u, a, i*), mezi číslem a jednotkou, v datu | *v kině*, *20. 11.* |
| Velká písmena | Názvy děl jen první slovo a vlastní jména (ne Title Case) | *Obecná škola*, ne *Obecná Škola* |
| Vykřičníky | V nadpisu žádný, v příspěvku nejvýš jeden | |
| Emoji | Nejvýš jedno na příspěvek, nikdy jako odrážka ani místo slova | |
| Hashtagy | Bez diakritiky, malými písmeny | *#filmovaklasika* |

Sociální sítě nezalamují řádky podle české typografie, takže nezlomitelné mezery jsou zdvořilost, ne požadavek; lint je ve výchozím stavu nehlídá (pravidlo `cs.nbsp` je vypnuté).

## Příklady

| Místo | Napiš |
| --- | --- |
| *Ahoj, tady Kultomat. Čteme programy…* | *Pražská kina občas vytáhnou takové poklady, že by byla škoda je prošvihnout.* |
| *Co bys sem rád/a viděl/a častěji?* | *Který film bys chtěl někdy vidět v kině, ale zatím nebyla příležitost?* |
| *S radostí oznamujeme novou funkci, která vám usnadní život!* | *Nově si můžeš uložit filtr a příště ho nemusíš nastavovat znovu.* |
| *Nenech si ujít tento víkend plný zážitků!* | *Hned tenhle víkend je z čeho vybírat.* |
| *Co na to říkáte? Dejte vědět v komentářích 👇* | (nic; nebo jedna konkrétní otázka, která stojí za odpověď) |
