
import { Block, Video } from './types';

export const cyberVideos: Video[] = [
  { id: 1, title: "Kybernetická bezpečnost - Úvod", description: "Základní principy ochrany digitální identity.", youtubeId: "PE8nf8Tmf78" },
  { id: 2, title: "Jak si nenechat vyluxovat účet", description: "Praktické rady pro ochranu bankovnictví.", youtubeId: "wkfXUF0-F7Q" },
  { id: 3, title: "Hrozby na internetu", description: "Přehled aktuálních hrozeb a kyberkriminality.", youtubeId: "T6FRDPBApaE" },
  { id: 4, title: "Sociální inženýrství", description: "Jak útočníci manipulují s lidskou psychikou.", youtubeId: "gsw5jBeuaL8" },
  { id: 5, title: "Silná a bezpečná hesla", description: "Návod na tvorbu a správu hesel.", youtubeId: "4rNCgLfqfQw" },
  { id: 6, title: "Dvoufaktorové ověření (2FA)", description: "Nejdůležitější vrstva vaší digitální obrany.", youtubeId: "P0Pmiqe9rQg" },
  { id: 7, title: "Veřejné Wi-Fi sítě", description: "Rizika bezplatného internetu v kavárnách.", youtubeId: "UuLCdnZihI4" },
  { id: 8, title: "Zabezpečení mobilního telefonu", description: "Nastavení soukromí ve vašem smartphonu.", youtubeId: "iNmS1ahVWUs" },
  { id: 9, title: "Pravidla zálohování", description: "Jak nepřijít o svá data při útoku.", youtubeId: "dGJTQgrEc2Y" },
  { id: 10, title: "Blok 8: Zákon o kybernetické bezpečnosti", description: "Legislativa, povinnosti a směrnice NIS2 v praxi.", youtubeId: "PjblswnhcYc" }
];

export const aiVideos: Video[] = [
  { id: 1, title: "NotebookLM a analýza dokumentů", description: "Jak využít revoluční nástroj od Google pro práci s vlastními daty.", youtubeId: "7d0qP5hv-Dk" },
  { id: 2, title: "Pokročilé techniky promptování", description: "Jak psát zadání, aby AI dělala přesně to, co chcete.", youtubeId: "H9p42slytsM" },
  { id: 3, title: "Rizika AI a Deepfakes", description: "Na co si dát pozor ve světě syntetických médií.", youtubeId: "a5xZ4BA_PAk" },
  { id: 4, title: "Úvod do generativních modelů", description: "Jak fungují LLM modely pod kapotou.", youtubeId: "bKeURsM2WmQ" },
  { id: 5, title: "Praktické využití AI v kanceláři", description: "Automatizace rutinních úkolů a mailové komunikace.", youtubeId: "BHv2BSn7xYA" },
  { id: 6, title: "Srovnání: ChatGPT vs Gemini", description: "Velký test aktuálně nejlepších AI asistentů na trhu.", youtubeId: "F8CCv005kGA" },
  { id: 7, title: "Perplexity AI: Nová éra hledání", description: "Proč je tento vyhledávač lepší než klasický Google.", youtubeId: "OMYQvVURYkA" },
  { id: 8, title: "Top AI nástroje pro produktivitu", description: "Přehled nejlepších aplikací pro rok 2025.", youtubeId: "tgTIx7C90eo" }
];

export const courseData: Block[] = [
  {
    id: 1, title: "Blok 1: Úvod do kyberbezpečnosti", description: "Psychologie útoků a CIA triáda.", icon: "ShieldAlert", gammaUrl: "https://gamma.app/embed/r24hcdtkoavtxvd",
    questions: [
      { id: 1, question: "Jaká je základní myšlenka útoků?", options: ["Technologie", "Člověk", "Hardware", "Servery"], correctAnswer: 1, hint: "Útočník prolamuje člověka, ne systém." },
      { id: 2, question: "Co znamená zkratka CIA?", options: ["Agentura", "Důvěrnost, Integrita, Dostupnost", "Počítače", "Audit"], correctAnswer: 1, hint: "Confidentiality, Integrity, Availability." },
      { id: 3, question: "Co je porušení Integrity?", options: ["Únik dat", "Změna dat", "Výpadek", "Heslo"], correctAnswer: 1, hint: "Neoprávněná úprava obsahu." },
      { id: 4, question: "Kolik útoků začíná lidskou chybou?", options: ["10%", "50%", "90%", "0%"], correctAnswer: 2, hint: "Naprostá většina." },
      { id: 5, question: "Které emoce se zneužívají?", options: ["Radost", "Strach a spěch", "Nuda", "Láska"], correctAnswer: 1, hint: "Tlak a urgence." },
      { id: 6, question: "Co je Phishing?", options: ["Ryby", "Podvodné maily", "Antivirus", "Marketing"], correctAnswer: 1, hint: "Snaha vylákat údaje." },
      { id: 7, question: "Co je Vishing?", options: ["Video", "Podvodný hovor", "Rybaření", "Vir"], correctAnswer: 1, hint: "Voice Phishing." },
      { id: 8, question: "Co je Ransomware?", options: ["Čistič", "Vyděračský kód", "Ochrana", "Hudba"], correctAnswer: 1, hint: "Zašifruje data za výkupné." },
      { id: 9, question: "Útok na důvěrnost?", options: ["Únik hesel", "Změna webu", "Výpadek", "Zpomalení"], correctAnswer: 0, hint: "Data vidí nepovolaný." },
      { id: 10, question: "Proč útočí na lidi?", options: ["Nuda", "Nemají data", "Levné a efektivní", "Omyl"], correctAnswer: 2, hint: "Automatizace a škálovatelnost." }
    ]
  },
  {
    id: 2, title: "Blok 2: Základy internetu", description: "HTTPS, domény a ochrana účtů.", icon: "Globe", gammaUrl: "https://gamma.app/embed/gtqi1rkuvdn8gp9",
    questions: [
      { id: 1, question: "Zámeček v prohlížeči znamená bezpečí?", options: ["Ano", "Ne, jen šifrování", "Ano, od Google", "Bez virů"], correctAnswer: 1, hint: "Šifrovaný může být i podvodný web." },
      { id: 2, question: "Která doména je podezřelá pro banku?", options: ["banka.cz", "ib.banka.cz", "banka-overeni.cz", "platby.banka.cz"], correctAnswer: 2, hint: "Falešná hlavní doména." },
      { id: 3, question: "Co je DNS?", options: ["Doprava", "Překlad jmen na IP", "Antivirus", "Notář"], correctAnswer: 1, hint: "Telefonní seznam internetu." },
      { id: 4, question: "Proč zkracovače odkazů?", options: ["Místo", "Zmatení oběti", "Levnější", "Rychlost"], correctAnswer: 1, hint: "Skrytí cílové adresy." },
      { id: 5, question: "Silné heslo?", options: ["Jméno", "Krátké", "Dlouhé a unikátní", "Stejné všude"], correctAnswer: 2, hint: "Délka je klíčová." },
      { id: 6, question: "Správce hesel?", options: ["Pamatuje si a generuje", "Mění hesla", "Posílá maily", "Hledá viry"], correctAnswer: 0, hint: "Trezor na hesla." },
      { id: 7, question: "Co je 2FA?", options: ["Dvě hesla", "Heslo + další faktor", "Dva PC", "Pravopis"], correctAnswer: 1, hint: "Dva nezávislé způsoby." },
      { id: 8, question: "NENÍ znakem phishingu?", options: ["Urgencne", "Adresa", "Osobní oslovení", "Chyby"], correctAnswer: 2, hint: "Masový útok je neosobní." },
      { id: 9, question: "Ukládání v prohlížeči?", options: ["Bezpečné", "Riziko malwaru", "Trezor", "Pohodlné"], correctAnswer: 1, hint: "Viry je umí vybrat." },
      { id: 10, question: "uBlock Origin?", options: ["Blokování reklam", "Video", "Hesla", "Krypto"], correctAnswer: 0, hint: "Odstraňuje rizikový obsah." }
    ]
  },
  {
    id: 3, title: "Blok 3: Zařízení a sítě", description: "Zabezpečení PC a Wi-Fi.", icon: "Wifi", gammaUrl: "https://gamma.app/embed/sw8fkuzsjvzw8hs", questions: [
      { id: 1, question: "Aktualizace jsou k čemu?", options: ["Vzhled", "Oprava chyb", "Zpomalení", "Emoji"], correctAnswer: 1, hint: "Zalepují díry pro hackery." },
      { id: 2, question: "Firewall?", options: ["Hudba", "Kontrola provozu", "Antivir", "Chlazení"], correctAnswer: 1, hint: "Síto pro data." },
      { id: 3, question: "Stačí Defender?", options: ["Ne", "Ano, dobrý základ", "Placený", "Jen offline"], correctAnswer: 1, hint: "Dnes velmi silný." },
      { id: 4, question: "Nový router?", options: ["Zapojit", "Změnit hesla", "Schovat", "Nic"], correctAnswer: 1, hint: "Výchozí hesla jsou známá." },
      { id: 5, question: "Kdy VPN?", options: ["Vždy", "Veřejná Wi-Fi", "Hry", "Rychlost"], correctAnswer: 1, hint: "Šifruje tunel." },
      { id: 6, question: "Pravidlo 3-2-1?", options: ["3 kopie, 2 média, 1 jinde", "3 disky", "3 hesla", "Odpočet"], correctAnswer: 0, hint: "Zálohovací klasika." },
      { id: 7, question: "Ztráta mobilu?", options: ["Nový", "Smazat a blokovat", "Facebook", "Čekat"], correctAnswer: 1, hint: "Vzdálená správa." },
      { id: 8, question: "Wi-Fi šifrování?", options: ["WEP", "WPA", "WPA3", "Žádné"], correctAnswer: 2, hint: "Nejnovější je nejlepší." },
      { id: 9, question: "IoT rizika?", options: ["Slabé zabezpečení", "Cena", "Spotřeba", "Vzhled"], correctAnswer: 0, hint: "Často chybí aktualizace." },
      { id: 10, question: "Guest Network?", options: ["Rychlost", "Oddělení návštěv", "Hry", "K ničemu"], correctAnswer: 1, hint: "Návštěvník nevidí váš PC." }
    ]
  },
  {
    id: 4, title: "Blok 4: Bankovnictví", description: "Ochrana karet a financí.", icon: "CreditCard", gammaUrl: "https://gamma.app/embed/50rktgysrfatwbu", questions: [
      { id: 1, question: "Vishing?", options: ["Vir", "Hovor", "Mail", "Krypto"], correctAnswer: 1, hint: "Podvodný telefonát." },
      { id: 2, question: "Chce banka heslo?", options: ["Ano", "Nikdy", "U potíží", "Občas"], correctAnswer: 1, hint: "Nikdy ho nepotřebují." },
      { id: 3, question: "Bazar podvod?", options: ["Cena", "Falešný kurýr", "Předání", "Dobírka"], correctAnswer: 1, hint: "Chtějí údaje o kartě k 'příjmu'." },
      { id: 4, question: "3D Secure?", options: ["Krása", "Potvrzení v mobilu", "Sleva", "Pojištění"], correctAnswer: 1, hint: "Druhý faktor." },
      { id: 5, question: "Podvodná faktura?", options: ["Adresa", "Změna účtu", "DPH", "Splatnost"], correctAnswer: 1, hint: "Změněné číslo účtu." },
      { id: 6, question: "Neposílat mailem?", options: ["Fotky", "OP a kartu", "Odkazy", "Úkoly"], correctAnswer: 1, hint: "Citlivé doklady." },
      { id: 7, question: "Podezření na podvod?", options: ["Smazat", "Blokovat hned", "Policie mail", "Čekat"], correctAnswer: 1, hint: "Čas je kritický." },
      { id: 8, question: "Neznámý e-shop?", options: ["Ano", "Recenze", "Vždy", "Zámeček"], correctAnswer: 1, hint: "Vždy ověřit." },
      { id: 9, question: "Investiční podvod?", options: ["Akcie", "Garantovaný zisk", "Spoření", "Dluhopis"], correctAnswer: 1, hint: "Nereálné sliby." },
      { id: 10, question: "Syn v nouzi?", options: ["Klíče", "Peníze z jiného čísla", "Reklama", "Škola"], correctAnswer: 1, hint: "Vždy volat zpět na staré číslo." }
    ]
  },
  {
    id: 5, title: "Blok 5: Kryptoměny", description: "Blockchain a peněženky.", icon: "Bitcoin", gammaUrl: "https://gamma.app/embed/c2gss863zymwaa3", questions: [
      { id: 1, question: "Vratné platby?", options: ["Ano", "Ne", "Bitcoin", "Banka"], correctAnswer: 1, hint: "Jsou definitivní." },
      { id: 2, question: "Co je Seed?", options: ["Mince", "12-24 slov", "Heslo k app", "Burza"], correctAnswer: 1, hint: "Klíč k obnově." },
      { id: 3, question: "Kam Seed?", options: ["Mail", "Papír offline", "Mobil", "USB"], correctAnswer: 1, hint: "Jen offline." },
      { id: 4, question: "HW peněženka?", options: ["Kůže", "Trezor (offline)", "Burza", "Karta"], correctAnswer: 1, hint: "Klíče v bezpečí." },
      { id: 5, question: "Chce podpora Seed?", options: ["Ano", "Nikdy", "U údržby", "U ztráty"], correctAnswer: 1, hint: "Kdo chce seed, je podvodník." },
      { id: 6, question: "Rug Pull?", options: ["Výměna", "Útěk s penězi", "Nákup", "Graf"], correctAnswer: 1, hint: "Vypaření projektu." },
      { id: 7, question: "QR kód zdarma?", options: ["Zisk", "Drainer (vykradení)", "Nic", "Sleva"], correctAnswer: 1, hint: "Schválení transakce výběru." },
      { id: 8, question: "Custodial?", options: ["Moje", "Cizí (burza)", "Papír", "HW"], correctAnswer: 1, hint: "Nemáte klíče." },
      { id: 9, question: "Podvod v kryptu?", options: ["Registrace", "Garantovaný zisk", "Riziko", "Licence"], correctAnswer: 1, hint: "Nic není jisté." },
      { id: 10, question: "Pig Butchering?", options: ["Těžba", "Budování důvěry", "NFT", "Jídlo"], correctAnswer: 1, hint: "Dlouhý podvod." }
    ]
  },
  {
    id: 6, title: "Blok 6: Incidenty", description: "První pomoc při útoku.", icon: "Siren", gammaUrl: "https://gamma.app/embed/47zu26hursvze6w", questions: [
      { id: 1, question: "Pravidlo č. 1?", options: ["Smazat", "Nepanikařit", "Vypnout proud", "Křičet"], correctAnswer: 1, hint: "Klid." },
      { id: 2, question: "Napadený PC?", options: ["Nechat", "Odpojit síť", "Restart", "Prodat"], correctAnswer: 1, hint: "Izolace." },
      { id: 3, question: "Kde měnit heslo?", options: ["Stejný PC", "Jiný bezpečný", "Nikde", "Poznámky"], correctAnswer: 1, hint: "Keylogger v napadeném PC." },
      { id: 4, question: "Have I Been Pwned?", options: ["Hra", "Kontrola úniku", "Antivir", "Sítě"], correctAnswer: 1, hint: "Databáze úniků." },
      { id: 5, question: "Ransomware?", options: ["Platit", "Neplatit", "Smazat", "Čekat"], correctAnswer: 1, hint: "Bez záruky dat." },
      { id: 6, question: "Ztráta karty?", options: ["Mail", "Blokovat v app", "Hledat", "Nic"], correctAnswer: 1, hint: "Okamžitě." },
      { id: 7, question: "Odhlásit vše?", options: ["Smazání", "Vyhození útočníka", "Wi-Fi", "Paušál"], correctAnswer: 1, hint: "Zrušení session." },
      { id: 8, question: "Mazat logy?", options: ["Ano", "Nikdy", "Staré", "Velké"], correctAnswer: 1, hint: "Důkazy." },
      { id: 9, question: "Hlášení v ČR?", options: ["Rodině", "NÚKIB / Policie", "FB", "Nikam"], correctAnswer: 1, hint: "Oficiální místa." },
      { id: 10, question: "Reinstalace?", options: ["Ano", "Ne", "Jen Windows", "Bez zálohy"], correctAnswer: 0, hint: "Jediná jistota." }
    ]
  },
  {
    id: 7, title: "Blok 7: Implementace bezpečnostních opatření", description: "Zálohování a hygiena.", icon: "ClipboardCheck", gammaUrl: "https://gamma.app/embed/him3c2lvp8rtr3p", questions: [
      { id: 1, question: "Nejdůležitější?", options: ["HW", "Systém a návyky", "Internet", "Vzhled"], correctAnswer: 1, hint: "Lidé." },
      { id: 2, question: "Minimální oprávnění?", options: ["Nikdo", "Jen co potřebuje", "Admin vše", "Uživatel"], correctAnswer: 1, hint: "Omezení škod." },
      { id: 3, question: "Nucená změna hesla?", options: ["Ano", "Ne (rizikové)", "Měsíc", "Děti"], correctAnswer: 1, hint: "Působí frustraci." },
      { id: 4, question: "Audit log?", options: ["Kniha", "Záznam aktivity", "Hesla", "Vir"], correctAnswer: 1, hint: "Historie akcí." },
      { id: 5, question: "Odchod kolegy?", options: ["Oslava", "Zrušit přístup", "Nechat", "Jméno"], correctAnswer: 1, hint: "Bezpečnost." },
      { id: 6, question: "Offsite záloha?", options: ["Disk", "Mimo budovu", "Smazaná", "Papír"], correctAnswer: 1, hint: "Proti požáru." },
      { id: 7, question: "Sdílení odkazy?", options: ["Ano", "Ne, únik", "Fotky", "Vždy"], correctAnswer: 1, hint: "Raději jmenovitě." },
      { id: 8, question: "Klasifikace dat?", options: ["Abeceda", "Dle citlivosti", "Mazání", "Komprese"], correctAnswer: 1, hint: "Úroveň ochrany." },
      { id: 9, question: "Je to jednorázové?", options: ["Ano", "Ne, proces", "Antivir", "Jen IT"], correctAnswer: 1, hint: "Stálá změna." },
      { id: 10, question: "Shadow IT?", options: ["Tma", "Neschválený SW", "Hacking", "Úspora"], correctAnswer: 1, hint: "Osobní maily v práci." }
    ]
  },
  {
    id: 8, title: "Blok 8: NIS2", description: "Legislativa a povinnosti.", icon: "Scale", gammaUrl: "https://gamma.app/embed/kly8j6dfnxfii4k", questions: [
      { id: 1, question: "Co je NIS2?", options: ["Vir", "EU směrnice", "HW", "Program"], correctAnswer: 1, hint: "Zpřísnění pravidel." },
      { id: 2, question: "Koho se týká?", options: ["Armády", "Tisíců firem", "Jen IT", "Lidí"], correctAnswer: 1, hint: "Klíčové sektory." },
      { id: 3, question: "Co je NÚKIB?", options: ["Banka", "Úřad pro kyber. bezp.", "PC", "Zkratka"], correctAnswer: 1, hint: "Regulátor ČR." },
      { id: 4, question: "Risk management?", options: ["Pojištění", "Analýza hrozeb", "Sázky", "Chyby"], correctAnswer: 1, hint: "Základ povinností." },
      { id: 5, question: "Hrozí pokuty?", options: ["Ne", "Ano", "Varování", "Praha"], correctAnswer: 1, hint: "Velmi vysoké." },
      { id: 6, question: "Hlášení firem?", options: ["Nic", "Incidenty do 24h", "Dovolená", "PC"], correctAnswer: 1, hint: "Sdílení varování." },
      { id: 7, question: "I dodavatelé?", options: ["Ne", "Ano", "Velcí", "Po roce"], correctAnswer: 1, hint: "Supply chain." },
      { id: 8, question: "Kdo nese odpovědnost?", options: ["IT", "Vedení", "Všichni", "Stát"], correctAnswer: 1, hint: "Manažerské téma." },
      { id: 9, question: "Cíl NIS2?", options: ["Zisk", "Odolnost EU", "Nákup", "Sledování"], correctAnswer: 1, hint: "Fungování státu." },
      { id: 10, question: "Dopad na lidi?", options: ["Ne", "Bezpečnější služby", "Certifikát", "Nesmí web"], correctAnswer: 1, hint: "Ochrana infrastruktury." }
    ]
  },
  {
    id: 9, title: "Blok 9: Role AI", description: "Deepfakes a budoucnost.", icon: "Bot", gammaUrl: "https://gamma.app/embed/da2nk7b93e89j4z", questions: [
      { id: 1, question: "AI a Phishing?", options: ["Horší", "Bez chyb a osobní", "Nijak", "Nechodí"], correctAnswer: 1, hint: "Kvalita textů." },
      { id: 2, question: "Voice Cloning?", options: ["Echo", "Klonování hlasu", "Odposlech", "Záznam"], correctAnswer: 1, hint: "Stačí krátký vzorek." },
      { id: 3, question: "Deepfake?", options: ["Spánek", "Falešné video", "Fotka", "Monitor"], correctAnswer: 1, hint: "Syntetické médium." },
      { id: 4, question: "Obrana hlasu?", options: ["Věřit", "Zavěsit a volat staré číslo", "Peníze", "Antivir"], correctAnswer: 1, hint: "Ověření." },
      { id: 5, question: "AI v obraně?", options: ["Ne", "Detekce anomálií", "Apple", "Zpomalení"], correctAnswer: 1, hint: "Analýza logů." },
      { id: 6, question: "Syntetické identity?", options: ["Roboti", "Lidé vytvoření AI", "Hra", "Karty"], correctAnswer: 1, hint: "Falešné profily." },
      { id: 7, question: "Prompt Injection?", options: ["Vakcína", "Útok na AI model", "Psaní", "Tisk"], correctAnswer: 1, hint: "Obejití pravidel." },
      { id: 8, question: "AI malware?", options: ["Ne", "Zrychluje vývoj", "Windows", "Samo"], correctAnswer: 1, hint: "Pomocník hackerů." },
      { id: 9, question: "Obrana?", options: ["HW", "Kritické myšlení", "Nic", "Strach"], correctAnswer: 1, hint: "Skepticismus." },
      { id: 10, question: "Liar's Dividend?", options: ["Odměna", "Popírání pravdy (fejk)", "Pokuta", "Bonus"], correctAnswer: 1, hint: "Eroze důvěry." }
    ]
  }
];

export const aiCourseData: Block[] = [
  {
    id: 1, title: "Blok 1: AI Pracuje pro Vás", description: "Základy a LLM modely.", icon: "Cpu", questions: [
      { id: 1, question: "Základ textových AI?", options: ["HW", "LLM", "Web", "Disk"], correctAnswer: 1, hint: "Large Language Models." },
      { id: 2, question: "Co je token?", options: ["Mince", "Jednotka textu", "Heslo", "Ikona"], correctAnswer: 1, hint: "Jednotka zpracování." },
      { id: 3, question: "Kdy vznikl rozmach LLM?", options: ["1990", "2010", "2022", "2000"], correctAnswer: 2, hint: "Vydání ChatGPT." },
      { id: 4, question: "Co znamená GPT?", options: ["Global PC Tool", "Generative Pre-trained Transformer", "Great Power Tool", "Nic"], correctAnswer: 1, hint: "Architektura modelu." },
      { id: 5, question: "Učí se AI z vašich dat?", options: ["Nikdy", "Záleží na nastavení", "Vždy", "Jen placená"], correctAnswer: 1, hint: "Privacy settings." },
      { id: 6, question: "Co je halucinace?", options: ["Spánek", "Vymýšlení faktů", "Rychlost", "Barvy"], correctAnswer: 1, hint: "Faktická chyba." },
      { id: 7, question: "Parametry modelu?", options: ["Váha PC", "Počet spojení v síti", "Cena", "Paměť"], correctAnswer: 1, hint: "Kapacita učení." },
      { id: 8, question: "Multimodalita?", options: ["Rychlost", "Text, obraz i zvuk", "Dva PC", "Mnoho jazyků"], correctAnswer: 1, hint: "Více typů vstupu." },
      { id: 9, question: "Co je 'Temperature'?", options: ["Teplota PC", "Míra kreativity", "Rychlost", "Hlasitost"], correctAnswer: 1, hint: "Náhodnost výstupu." },
      { id: 10, question: "Kontextové okno?", options: ["Velikost monitoru", "Množství textu, co si AI pamatuje", "Doba odezvy", "Okno prohlížeče"], correctAnswer: 1, hint: "Paměť v chatu." }
    ]
  },
  {
    id: 2, title: "Blok 2: ChatGPT", description: "Rozhraní a historie.", icon: "MessageSquare", questions: [
      { id: 1, question: "Kdo vlastní ChatGPT?", options: ["Google", "OpenAI", "Microsoft", "Apple"], correctAnswer: 1, hint: "Sam Altman." },
      { id: 2, question: "Co je GPT-4o?", options: ["Starý model", "Vlajkový multimodální model", "Jen na obrázky", "Mobilní hra"], correctAnswer: 1, hint: "Omni model." },
      { id: 3, question: "Custom GPTs?", options: ["Vlastní verze asistenta", "Nové PC", "Hry", "Obrázky"], correctAnswer: 0, hint: "Specializované verze." },
      { id: 4, question: "Dostupnost zdarma?", options: ["Ne", "Ano, s omezením", "Jen v USA", "Jen pro firmy"], correctAnswer: 1, hint: "Limitované GPT-4o." },
      { id: 5, question: "Dall-E v chatu?", options: ["Ne", "Ano, generování obrazu", "Jen text", "Jen zvuk"], correctAnswer: 1, hint: "Integrace obrazu." },
      { id: 6, question: "Advanced Voice Mode?", options: ["Křik", "Přirozený rozhovor s emocemi", "Jen čtení textu", "Nahrávání"], correctAnswer: 1, hint: "Skutečný rozhovor." },
      { id: 7, question: "History & Training?", options: ["Vždy smazáno", "Lze vypnout v nastavení", "Vždy veřejné", "Záloha"], correctAnswer: 1, hint: "Soukromí." },
      { id: 8, question: "OpenAI App?", options: ["Není", "iOS i Android", "Jen web", "Jen Windows"], correctAnswer: 1, hint: "Mobilní přístup." },
      { id: 9, question: "Data Analysis?", options: ["Počítadlo", "Analýza tabulek a grafů", "Kalkulačka", "Hra"], correctAnswer: 1, hint: "Práce se soubory." },
      { id: 10, question: "Kdy byl spuštěn?", options: ["2020", "2022", "2024", "2018"], correctAnswer: 1, hint: "Listopad 2022." }
    ]
  },
  {
    id: 3, title: "Blok 3: Gemini", description: "Ekosystém Google.", icon: "Layout", questions: [
      { id: 1, question: "Kdo vyvinul Gemini?", options: ["Meta", "Google", "OpenAI", "Tesla"], correctAnswer: 1, hint: "DeepMind." },
      { id: 2, question: "Integrace s Google Workspace?", options: ["Ne", "Ano (Maily, Dokumenty)", "Jen YouTube", "Není"], correctAnswer: 1, hint: "Ekosystém." },
      { id: 3, question: "Gemini Advanced?", options: ["Základní verze", "Placená verze s 1.5 Pro", "Verze pro děti", "Zastaralá"], correctAnswer: 1, hint: "Výkonnější model." },
      { id: 4, question: "Google Photos integrace?", options: ["Ne", "Ano, chytré hledání", "Jen text", "Videa"], correctAnswer: 1, hint: "Hledání ve fotkách." },
      { id: 5, question: "Zdrojování informací?", options: ["Lže", "Propojení s Google vyhledáváním", "Jen offline", "Knihy"], correctAnswer: 1, hint: "Aktuální data." },
      { id: 6, question: "Gemini v Androidu?", options: ["Jako Google Asistent", "Není", "Jen maily", "Hudba"], correctAnswer: 0, hint: "Náhrada asistenta." },
      { id: 7, question: "Model Flash?", options: ["Pomalý", "Rychlý a efektivní", "Drahý", "Starý"], correctAnswer: 1, hint: "Optimalizace rychlosti." },
      { id: 8, question: "Mnoho jazyků?", options: ["Jen AJ", "Globální podpora vč. ČJ", "Jen Asie", "Jen Evropa"], correctAnswer: 1, hint: "Čeština funguje." },
      { id: 9, question: "Původní název?", options: ["Alpha", "Bard", "Gamma", "Zeta"], correctAnswer: 1, hint: "Bard." },
      { id: 10, question: "Co je Gemini Pro?", options: ["Nejslabší", "Vyvážený model pro běžné úlohy", "Jen na kód", "Hardware"], correctAnswer: 1, hint: "Zlatý střed." }
    ]
  },
  {
    id: 4, title: "Blok 4: Prompty", description: "Struktura zadání.", icon: "Command", questions: [
      { id: 1, question: "Co je prompt?", options: ["Hardware", "Zadání pro AI", "Výsledek", "Chyba"], correctAnswer: 1, hint: "Instrukce." },
      { id: 2, question: "Metoda R-O-C-E?", options: ["Útěk", "Role-Objektiv-Context-Expektace", "Běh", "Jídlo"], correctAnswer: 1, hint: "Struktura promptu." },
      { id: 3, question: "Few-shot prompting?", options: ["Jeden pokus", "Dávání příkladů v promptu", "Rychlost", "Krátký text"], correctAnswer: 1, hint: "Ukázky řešení." },
      { id: 4, question: "Zero-shot?", options: ["Bez zadání", "Bez příkladů", "Bez výsledku", "Smazání"], correctAnswer: 1, hint: "Přímý dotaz." },
      { id: 5, question: "Role prompting?", options: ["Děti", "Zadání identity (Jsi expert)", "Hra", "Maska"], correctAnswer: 1, hint: "Nastavení experta." },
      { id: 6, question: "Chain of Thought?", options: ["Zákaz", "Krok za krokem", "Rychlost", "Zmatek"], correctAnswer: 1, hint: "Postupné uvažování." },
      { id: 7, question: "Iterace?", options: ["Zánik", "Postupné vylepšování chatu", "Opakování stejného", "Chyba"], correctAnswer: 1, hint: "Zpřesňování." },
      { id: 8, question: "System Prompt?", options: ["Monitor", "Globální instrukce chování", "Restart", "Bios"], correctAnswer: 1, hint: "Zábalní nastavení." },
      { id: 9, question: "Prompt Engineering?", options: ["Oprava PC", "Umění psát zadání", "Stavba stroje", "Sítě"], correctAnswer: 1, hint: "Nová dovednost." },
      { id: 10, question: "Délka promptu?", options: ["Musí být krátký", "Může být velmi detailní", "Jedno slovo", "Jen v AJ"], correctAnswer: 1, hint: "Detailnost pomáhá." }
    ]
  },
  {
    id: 5, title: "Blok 5: Praktické texty", description: "Maily a shrnutí.", icon: "FileText", questions: [
      { id: 1, question: "Shrnutí dlouhého textu?", options: ["Nelze", "Hlavní body v odrážkách", "Smazání", "Přepis všeho"], correctAnswer: 1, hint: "Summarizace." },
      { id: 2, question: "Změna tónu mailu?", options: ["Nelze", "Z neformálního na profesionální", "Jen v AJ", "Barvy"], correctAnswer: 1, hint: "Stylistika." },
      { id: 3, question: "Překlad dokumentu?", options: ["Jen Google Překladač", "AI zachová kontext a styl", "Není bezpečné", "Obrázky"], correctAnswer: 1, hint: "Kvalitní lokalizace." },
      { id: 4, question: "Kreativní psaní?", options: ["AI nemá fantazii", "Pomoc s nápady a strukturou", "Jen kopírování", "Nuda"], correctAnswer: 1, hint: "Generování nápadů." },
      { id: 5, question: "Oprava gramatiky?", options: ["Jen Word", "AI najde i stylistické chyby", "Nepřesné", "Zpomalení"], correctAnswer: 1, hint: "Korektura." },
      { id: 6, question: "Generování osnovy?", options: ["Nelze", "Struktura článku/přednášky", "Jen text", "Videa"], correctAnswer: 1, hint: "Plánování." },
      { id: 7, question: "Tvorba otázek?", options: ["Učitel", "Test z poskytnutého textu", "Nuda", "Hra"], correctAnswer: 1, hint: "Edukační využití." },
      { id: 8, question: "Dopisování textu?", options: ["Smazání", "Pokračování v mém stylu", "Cenzura", "Konec"], correctAnswer: 1, hint: "Predikce." },
      { id: 9, question: "Slogan pro firmu?", options: ["Grafika", "Generování mnoha variant", "Nákup", "Sleva"], correctAnswer: 1, hint: "Brainstorming." },
      { id: 10, question: "Filtrování SPAMu?", options: ["Nijak", "Analýza tónu a podezřelých znaků", "Antivir", "Nic"], correctAnswer: 1, hint: "Bezpečnost." }
    ]
  },
  {
    id: 6, title: "Blok 6: Kancelář", description: "Office a Workspace.", icon: "Briefcase", questions: [
      { id: 1, question: "Co je Copilot?", options: ["Letadlo", "AI asistent v MS Office", "Programátor", "Hra"], correctAnswer: 1, hint: "Microsoft AI." },
      { id: 2, question: "AI v Excelu?", options: ["Počítadlo", "Analýza dat a tvorba vzorců", "Jen barvy", "Není"], correctAnswer: 1, hint: "Data analysis." },
      { id: 3, question: "PowerPoint a AI?", options: ["Jen promítání", "Tvorba prezentace z textu", "Hudba", "Video"], correctAnswer: 1, hint: "Generování slidů." },
      { id: 4, question: "Meeting shrnutí?", options: ["Záznam", "Zápis z Teams/Meet", "Křik", "Video"], correctAnswer: 1, hint: "Meeting notes." },
      { id: 5, question: "Návrh odpovědi v Outlooku?", options: ["Smazání", "Chytré předpřipravené maily", "Jen odeslat", "Nuda"], correctAnswer: 1, hint: "Efektivita." },
      { id: 6, question: "Google Duet AI?", options: ["Tanec", "Původní název AI v Workspace", "Kód", "Hra"], correctAnswer: 1, hint: "Workspace AI." },
      { id: 7, question: "AI v Google Docs?", options: ["Psaní za vás (Help me write)", "Jen čtení", "Není", "Zpomalení"], correctAnswer: 0, hint: "Asistent psaní." },
      { id: 8, question: "Automatizace tabulek?", options: ["Nijak", "Chytré doplňování (Smart Fill)", "Jen ručně", "Smazat"], correctAnswer: 1, hint: "Google Sheets." },
      { id: 9, question: "Bezpečnost firemních dat?", options: ["Vše uniká", "Enterprise verze data netrénují", "Jen offline", "Není"], correctAnswer: 1, hint: "Podniková ochrana." },
      { id: 10, question: "AI v PDF?", options: ["Obrázek", "Shrnutí a hledání v PDF", "Jen čtení", "Nuda"], correctAnswer: 1, hint: "Acrobat AI." }
    ]
  },
  {
    id: 7, title: "Blok 7: NotebookLM", description: "Analýza dokumentů.", icon: "BookOpen", questions: [
      { id: 1, question: "Hlavní výhoda?", options: ["Hry", "Práce s vašimi zdroji", "Web", "Obrázky"], correctAnswer: 1, hint: "Vlastní data." },
      { id: 2, question: "Audio Overview?", options: ["Hudba", "Podcast z vašich dokumentů", "Křik", "Rádio"], correctAnswer: 1, hint: "Syntetický rozhovor." },
      { id: 3, question: "Zdrojování u NotebookLM?", options: ["Vymýšlí si", "Odkazuje na přesné věty v PDF", "Lže", "Nijak"], correctAnswer: 1, hint: "Citace." },
      { id: 4, question: "Kapacita zdrojů?", options: ["Jen 1", "Až 50 dokumentů", "Neomezeně", "Jen 5"], correctAnswer: 1, hint: "Škálovatelnost." },
      { id: 5, question: "Kdo to vyvíjí?", options: ["Meta", "Google", "MS", "Apple"], correctAnswer: 1, hint: "Google Labs." },
      { id: 6, question: "Podporované formáty?", options: ["Jen papír", "PDF, Google Docs, Text", "Jen obrázky", "Videa"], correctAnswer: 1, hint: "Textové zdroje." },
      { id: 7, question: "Je to placené?", options: ["Ano", "Aktuálně zdarma v rámci testování", "Jen v USA", "Drahé"], correctAnswer: 1, hint: "Google Labs projekt." },
      { id: 8, question: "Studijní průvodce?", options: ["Učitel", "Tvorba otázek a osnovy z vašich poznámek", "Hra", "Nic"], correctAnswer: 1, hint: "Student helper." },
      { id: 9, question: "Soukromí u NotebookLM?", options: ["Veřejné", "Data jsou soukromá pro váš projekt", "Vše vidí Google", "Sdílené"], correctAnswer: 1, hint: "Privátní kontext." },
      { id: 10, question: "Hledání souvislostí?", options: ["Nefunguje", "AI propojuje informace z různých PDF", "Jen v jednom", "Nuda"], correctAnswer: 1, hint: "Cross-document analysis." }
    ]
  },
  {
    id: 8, title: "Blok 8: Perplexity", description: "AI Vyhledávač.", icon: "Search", questions: [
      { id: 1, question: "Co je Perplexity?", options: ["Prohlížeč", "Odpovídací vyhledávač s citacemi", "Sít", "Hra"], correctAnswer: 1, hint: "Answer engine." },
      { id: 2, question: "Důvěryhodnost?", options: ["Vždy lže", "Ověřuje informace na internetu", "Jen knihy", "Nijak"], correctAnswer: 1, hint: "Real-time search." },
      { id: 3, question: "Režim Focus?", options: ["Rozmazání", "Výběr zdroje (YouTube, Reddit, Scholar)", "Rychlost", "Ticho"], correctAnswer: 1, hint: "Cílené vyhledávání." },
      { id: 4, question: "Citace?", options: ["Nejsou", "Klikatelné odkazy na zdroje", "Jen jména", "Nuda"], correctAnswer: 1, hint: "Transparentnost." },
      { id: 5, question: "Perplexity Pro?", options: ["Není", "Umožňuje volbu modelu (GPT-4/Claude)", "Jen barvy", "Rychlost"], correctAnswer: 1, hint: "Vlastní volba modelu." },
      { id: 6, question: "Pages?", options: ["Knihy", "Tvorba webových stránek z rešerše", "Jen text", "Hra"], correctAnswer: 1, hint: "Content creation." },
      { id: 7, question: "Nahrazuje Google?", options: ["Ne", "Pro hledání odpovědí je efektivnější", "Ano, úplně", "Zpomaluje"], correctAnswer: 1, hint: "Nová éra vyhledávání." },
      { id: 8, question: "Obrazy v Perplexity?", options: ["Jen text", "Hledá i relevantní obrázky", "Nefunguje", "Video"], correctAnswer: 1, hint: "Multimediální výsledky." },
      { id: 9, question: "Ukládání rešerší?", options: ["Smazání", "Kolekce (Collections)", "Jen v mailu", "Nic"], correctAnswer: 1, hint: "Organizace." },
      { id: 10, question: "Aktuálnost?", options: ["Stará data", "Prohledává internet v reálném čase", "Jen 2021", "Nijak"], correctAnswer: 1, hint: "Live data." }
    ]
  },
  {
    id: 9, title: "Blok 9: Bezpečnost", description: "GDPR a data.", icon: "ShieldCheck", questions: [
      { id: 1, question: "Základní riziko?", options: ["Nuda", "Únik citlivých dat do tréninku", "Cena", "Vzhled"], correctAnswer: 1, hint: "Data privacy." },
      { id: 2, question: "GDPR a AI?", options: ["Neplatí", "Právo na vysvětlení a smazání", "Jen v EU", "Nijak"], correctAnswer: 1, hint: "Regulace." },
      { id: 3, question: "Shadow AI?", options: ["Tma", "Neschválené používání AI v práci", "Hacking", "Hra"], correctAnswer: 1, hint: "Firemní bezpečnost." },
      { id: 4, question: "Copyright?", options: ["Vše je vaše", "Nejasné vlastnictví AI děl", "Jasné", "Sleva"], correctAnswer: 1, hint: "Autorská práva." },
      { id: 5, question: "AI Act?", options: ["Hra", "Nová regulace AI v EU", "Vir", "PC"], correctAnswer: 1, hint: "Zákon o AI." },
      { id: 6, question: "Injekce promptu?", options: ["Lék", "Pokus o manipulaci modelu", "Psaní", "Nic"], correctAnswer: 1, hint: "Security attack." },
      { id: 7, question: "Ověřování výstupu?", options: ["Vždy věřit", "Kritické myšlení a verifikace", "Nijak", "Strach"], correctAnswer: 1, hint: "Skepticismus." },
      { id: 8, question: "Bias (Předpojatost)?", options: ["Rychlost", "Stereotypy v odpovědích AI", "Cena", "Barvy"], correctAnswer: 1, hint: "Trénovací data." },
      { id: 9, question: "Osobní údaje v chatu?", options: ["Bezpečné", "Nikdy nevkládat (jména, hesla)", "Vždy", "Jen placená"], correctAnswer: 1, hint: "Bezpečnostní hygiena." },
      { id: 10, question: "Budoucnost?", options: ["Konec světa", "Kooperace člověka a stroje", "Jen stroje", "Nic"], correctAnswer: 1, hint: "Augmentace." }
    ]
  }
];
