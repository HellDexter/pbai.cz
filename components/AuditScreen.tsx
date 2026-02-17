
import React, { useState, useEffect, useRef } from 'react';
import { Check, Bot, X, ShieldAlert, ShieldCheck, Send, Loader2, AlertTriangle, ChevronDown, ChevronUp, Monitor, Smartphone, Wifi, HardDrive, Info, Settings, Key, ArrowRight, ImageIcon, Paperclip } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Props {
  onBack: () => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface AuditItem {
  id: string;
  label: string;
  shortDesc: string;
  significance: string;
  risk: string;
  instructions: {
    windows?: string[];
    macos?: string[];
    android?: string[];
    ios?: string[];
    general?: string[];
  };
  aiPrompt: string;
}

interface AuditSection {
  id: string;
  title: string;
  description: string;
  icon: any;
  items: AuditItem[];
  platformType?: 'desktop' | 'mobile'; // To determine which toggle to show
}

const AUDIT_DATA: AuditSection[] = [
  {
    id: "pc",
    title: "Počítač",
    description: "Operační systém je základním kamenem digitální obrany.",
    icon: Monitor,
    platformType: 'desktop',
    items: [
      {
        id: "pc_updates",
        label: "Automatické aktualizace",
        shortDesc: "OS a aplikace se aktualizují samy.",
        significance: "Vývojáři softwaru neustále opravují nalezené bezpečnostní díry. Automatické aktualizace zajišťují, že tyto opravy (patche) dostanete dříve, než je stihnou útočníci zneužít.",
        risk: "Nezáplatovaný systém je jako dům s otevřenými okny. Hackeři používají automatizované skenery na staré verze softwaru (viz WannaCry).",
        instructions: {
          windows: ["Start -> Nastavení -> Windows Update.", "Zapněte 'Získat nejnovější aktualizace, hned jak budou k dispozici'."],
          macos: ["Apple menu () -> Nastavení systému -> Obecné -> Aktualizace softwaru.", "Klikněte na 'i' vedle Automatické aktualizace a vše zapněte."]
        },
        aiPrompt: "Co dělat, když se aktualizace zasekne?"
      },
      {
        id: "pc_firewall",
        label: "Aktivní Firewall",
        shortDesc: "Brána kontrolující síťový provoz.",
        significance: "Firewall funguje jako vrátný. Rozhoduje, který síťový provoz pustí dovnitř. Bez něj je váš počítač na veřejné Wi-Fi viditelný pro všechny.",
        risk: "Bez firewallu se může útočník ve stejné síti připojit k vašim sdíleným složkám nebo ovládnout služby na pozadí.",
        instructions: {
          windows: ["Start -> 'Firewall a ochrana sítě'.", "Ujistěte se, že u Privátní i Veřejné sítě svítí 'Zapnuto'."],
          macos: ["Nastavení systému -> Síť -> Firewall.", "Přepínač musí být 'Zapnuto'."]
        },
        aiPrompt: "Jak poznám, že můj firewall blokuje program, který potřebuji?"
      },
      {
        id: "pc_antivir",
        label: "Antivirus / Defender",
        shortDesc: "Real-time ochrana proti malwaru.",
        significance: "Moderní antiviry sledují 'chování' programů. Pokud se Word začne chovat podezřele (např. mazat soubory), antivirus ho zastaví.",
        risk: "Malware může běžet na pozadí měsíce bez povšimnutí, těžit kryptoměny nebo krást hesla z prohlížeče.",
        instructions: {
          windows: ["Zkontrolujte ikonu štítu v liště (Zabezpečení Windows).", "Musí svítit zeleně.", "Nepoužívejte dva antiviry najednou!"],
          macos: ["macOS má integrovanou ochranu XProtect.", "Pro vyšší ochranu nainstalujte např. Malwarebytes (stačí Free verze na občasný sken)."]
        },
        aiPrompt: "Stačí mi integrovaný Windows Defender nebo potřebuji placený antivirus?"
      },
      {
        id: "pc_encryption",
        label: "Šifrování disku",
        shortDesc: "Ochrana dat při fyzické krádeži.",
        significance: "Šifrování zamkne obsah disku tak, že je čitelný pouze s vaším heslem. Bez něj jsou data jen shluk náhodných znaků.",
        risk: "Při krádeži notebooku zloděj vyndá disk, připojí ho jinam a přečte všechna data, pokud nejsou šifrovaná.",
        instructions: {
          windows: ["Start -> 'BitLocker' -> Spravovat nástroj BitLocker -> Zapnout.", "Uložte si obnovovací klíč mimo PC!"],
          macos: ["Nastavení -> Soukromí a zabezpečení -> FileVault -> Zapnout.", "Klíč si opište nebo uložte na iCloud."]
        },
        aiPrompt: "Co dělat, když zapomenu heslo k BitLockeru?"
      }
    ]
  },
  {
    id: "mobile",
    title: "Telefon",
    description: "Váš telefon o vás ví vše. Chraňte ho.",
    icon: Smartphone,
    platformType: 'mobile',
    items: [
      {
        id: "mob_biometrics",
        label: "Biometrický zámek",
        shortDesc: "TouchID / FaceID místo PINu.",
        significance: "Biometrie je bezpečnější než gesto (lze odkoukat) a rychlejší než PIN. Je klíčem k bankovním aplikacím.",
        risk: "Bez zámku má nálezce telefonu přístup k vašemu e-mailu (a tím pádem ke všem obnovám hesel) i SMS kódům.",
        instructions: {
          ios: ["Nastavení -> Face ID a kód.", "Nastavte také 'Vyžadovat pozornost pro Face ID'."],
          android: ["Nastavení -> Zabezpečení a soukromí -> Zámek zařízení.", "Používejte Otisk prstu + silný PIN (ne gesto)."]
        },
        aiPrompt: "Je bezpečnější FaceID nebo otisk prstu?"
      },
      {
        id: "mob_findmy",
        label: "Služba 'Najít'",
        shortDesc: "Lokalizace a smazání na dálku.",
        significance: "Poslední záchrana. Umožňuje vidět polohu, přehrát zvuk nebo telefon na dálku vymazat (tovární nastavení).",
        risk: "Bez této služby je ztracený telefon nenávratně pryč a data v něm jsou v ohrožení.",
        instructions: {
          ios: ["Nastavení -> [Vaše jméno] -> Najít -> Najít iPhone -> Zapnout."],
          android: ["Nastavení -> Google -> Najít moje zařízení -> Zapnout.", "Povolte 'Ukládat poslední polohu'."]
        },
        aiPrompt: "Funguje služba Najít i když je telefon vybitý?"
      },
      {
        id: "mob_permissions",
        label: "Oprávnění aplikací",
        shortDesc: "Kontrola kamery a polohy.",
        significance: "Aplikace 'Baterka' nepotřebuje vaši polohu. Omezením oprávnění chráníte soukromí před sběrem dat.",
        risk: "Škodlivé aplikace mohou na pozadí nahrávat zvuk nebo číst potvrzovací SMS z banky.",
        instructions: {
          ios: ["Nastavení -> Soukromí a zabezpečení -> Kontrola bezpečnosti.", "Projděte přístup k Fotkám a Poloze."],
          android: ["Nastavení -> Soukromí -> Správce oprávnění.", "Odeberte nepoužívaná oprávnění (Odebrat, pokud se nepoužívá)."]
        },
        aiPrompt: "Jak poznám, že mě nějaká aplikace sleduje?"
      }
    ]
  },
  {
    id: "net",
    title: "Síť a Router",
    description: "Vstupní brána do digitální domácnosti.",
    icon: Wifi,
    items: [
      {
        id: "net_admin",
        label: "Heslo administrace",
        shortDesc: "Změna defaultního admin hesla.",
        significance: "Routery mají často z výroby heslo 'admin'. Hackeři to ví a zkouší to jako první.",
        risk: "Útočník s přístupem do routeru může změnit DNS a přesměrovat vás na falešné bankovnictví.",
        instructions: {
          general: ["Otočte router a najděte štítek s IP adresou (např. 192.168.0.1).", "Zadejte IP do prohlížeče.", "Přihlašte se a v sekci 'System'/'Admin' změňte heslo."]
        },
        aiPrompt: "Jak zjistím IP adresu svého routeru?"
      },
      {
        id: "net_wifi",
        label: "Silné WPA3 heslo",
        shortDesc: "Heslo k samotné Wi-Fi síti.",
        significance: "Vaše Wi-Fi přesahuje zdi bytu. Silné šifrování brání sousedům v odposlechu.",
        risk: "Slabé heslo lze prolomit za pár minut. Cizí člověk pak může přes vaši IP adresu páchat trestnou činnost.",
        instructions: {
          general: ["V nastavení routeru hledejte 'Wireless' / 'Wi-Fi'.", "Security/Mode: WPA2-Personal (AES) nebo WPA3.", "Heslo: Minimálně 12 znaků (ideálně celá věta)."]
        },
        aiPrompt: "Jak vytvořit heslo, které si zapamatuji, ale je bezpečné?"
      }
    ]
  },
  {
    id: "backup",
    title: "Zálohování",
    description: "Jediná 100% ochrana proti ztrátě dat.",
    icon: HardDrive,
    items: [
      {
        id: "back_321",
        label: "Pravidlo 3-2-1",
        shortDesc: "3 kopie, 2 média, 1 mimo domov.",
        significance: "Statistika je neúprosná. Disky selhávají. Pravidlo 3-2-1 snižuje riziko ztráty na nulu.",
        risk: "Ransomware. Krádež. Požár. Pokud máte data jen v PC, přijdete o ně.",
        instructions: {
          general: ["Kopie 1: Váš počítač.", "Kopie 2: Externí disk (odpojovat po záloze!).", "Kopie 3: Cloud (OneDrive, Google Drive, iCloud)."]
        },
        aiPrompt: "Jaký je nejlepší cloud pro zálohování fotek?"
      },
      {
        id: "back_bitlocker",
        label: "Recovery kódy",
        shortDesc: "Záloha 2FA a šifrovacích klíčů.",
        significance: "Když ztratíte mobil s 2FA aplikací, 'Recovery Codes' jsou jediná cesta zpět.",
        risk: "Trvalá ztráta přístupu k Instagramu, Googlu či bance. Podpora často bez kódů nepomůže.",
        instructions: {
          general: ["Vytiskněte si záložní kódy ke všem účtům (Google, FB...).", "Uložte je do fyzického trezoru nebo šanonu.", "Nikdy je nefoťte do mobilu!"]
        },
        aiPrompt: "Kam bezpečně uložit papírové zálohy hesel?"
      }
    ]
  }
];

const AuditScreen: React.FC<Props> = ({ onBack }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Platform selection state
  const [desktopOS, setDesktopOS] = useState<'Windows' | 'macOS'>('Windows');
  const [mobileOS, setMobileOS] = useState<'Android' | 'iOS'>('Android');

  const [showChat, setShowChat] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeItem, setActiveItem] = useState<AuditItem | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [needsKey, setNeedsKey] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const totalItemsCount = AUDIT_DATA.reduce((acc, section) => acc + section.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const percentage = Math.round((checkedCount / totalItemsCount) * 100);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, showChat, loading]);

  const handleOpenKeyDialog = async () => {
    try {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setNeedsKey(false);
      // Restart chat after key is set? Maybe just let user try again.
    } catch (err) {
      console.error("Failed to open key dialog:", err);
    }
  };

  const toggleCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const startAiConsultant = async (item: AuditItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveItem(item);
    setShowChat(true);
    setChatHistory([]); // Start with empty history to show intro
    setNeedsKey(false);
    setSelectedImage(null);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputMessage.trim() && !selectedImage) || loading || !activeItem) return;

    if (!process.env.API_KEY) {
      setNeedsKey(true);
      return;
    }

    const userText = inputMessage;
    // Determine context based on active item's section
    let platformContext = "";
    const parentSection = AUDIT_DATA.find(s => s.items.find(i => i.id === activeItem.id));
    if (parentSection?.platformType === 'desktop') {
      platformContext = `Uživatel má ${desktopOS}.`;
    } else if (parentSection?.platformType === 'mobile') {
      platformContext = `Uživatel má ${mobileOS}.`;
    }

    const newHistory: Message[] = [...chatHistory, {
      role: 'user',
      text: userText + (selectedImage ? " [Obrázek přiložen]" : "")
    }];
    setChatHistory(newHistory);
    setInputMessage("");
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      let parts: any[] = [{ text: userText }];

      if (selectedImage) {
        // Extract base64 functionality
        const base64Data = selectedImage.split(',')[1];
        const mimeType = selectedImage.split(';')[0].split(':')[1];
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: mimeType
          }
        });
      }

      // Add image to the last message if needed
      const requestContents = newHistory.slice(0, -1).map(m => ({ role: m.role, parts: [{ text: m.text }] }));
      requestContents.push({ role: 'user', parts: parts });

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: requestContents,
        config: {
          systemInstruction: `Jsi Kyber-GURU, empatický a trpělivý bezpečnostní expert. 
            Tvým úkolem je provést uživatele nastavením: "${activeItem.label}".
            
            Kontext uživatele: ${platformContext}
            Důvod auditu: Minimalizace rizika: ${activeItem.risk}.

            INSTRUKCE:
            1. Buď stručný. Odpovídej v krátkých krocích.
            2. Pokud se uživatel ptá na postup, naváděj ho přesně podle jeho systému (${platformContext}).
            3. Nepoužívej složité technické termíny bez vysvětlení.
            4. Tvá první otázka by měla ověřit, v jakém stavu se uživatel nachází (např. "Vidíš v nastavení tuto možnost?").
            5. Pokud uživatel pošle obrázek (screenshot), analyzuj ho a poraď, co vidí nebo kam má kliknout.`
        }
      });

      setSelectedImage(null); // Clear image after sending
      if (response.text) {
        setChatHistory(prev => [...prev, { role: 'model', text: response.text! }]);
      }
    } catch (e: any) {
      // console.error(e);
      if (e.message?.includes("API Key")) setNeedsKey(true);
      else setChatHistory(prev => [...prev, { role: 'model', text: "Omlouvám se, došlo k chybě spojení." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (text: string) => {
    setInputMessage(text);
    // Automatically submit? Or just fill input? Let's auto-submit for smoother UX
    // We need to simulate the event or call a separate submit function
    // For simplicity, just setting input and user has to click send is safer, 
    // but auto-submit is "magical". Let's try to call the logic directly.

    // Actually, React state updates are async, so we can't just setInput and call handleSendMessage immediately.
    // We'll just define a separate logic function or use a timeout hack (not recommended).
    // Best way: call the core logic with the text directly.

    submitMessage(text);
  };

  const submitMessage = async (text: string) => {
    if (!activeItem || loading) return;
    if (!process.env.API_KEY) {
      setNeedsKey(true);
      return;
    }

    // Determine context based on active item's section
    let platformContext = "";
    const parentSection = AUDIT_DATA.find(s => s.items.find(i => i.id === activeItem.id));
    if (parentSection?.platformType === 'desktop') {
      platformContext = `Uživatel má ${desktopOS}.`;
    } else if (parentSection?.platformType === 'mobile') {
      platformContext = `Uživatel má ${mobileOS}.`;
    }

    const newHistory: Message[] = [...chatHistory, { role: 'user', text: text }];
    setChatHistory(newHistory);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: newHistory.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        config: {
          systemInstruction: `Jsi Kyber-GURU, expert na bezpečnost. Téma: ${activeItem.label}.
              Kontext: ${platformContext}.
              Veď uživatele KROK ZA KROKEM. Buď maximálně stručný (max 2-3 věty na odpověď).`
        }
      });
      if (response.text) {
        setChatHistory(prev => [...prev, { role: 'model', text: response.text! }]);
      }
    } catch (e: any) {
      if (e.message?.includes("API Key")) setNeedsKey(true);
      else setChatHistory(prev => [...prev, { role: 'model', text: "Chyba spojení." }]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-32">
      {/* HEADER & EXPLANATION */}
      <div className="bg-[#111] border border-white/10 rounded-3xl p-6 md:p-8 mb-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-in-up">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"></div>

        <div className="flex-1">
          <h1 className="text-2xl font-display text-white uppercase tracking-tight mb-3 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-500" /> Bezpečnostní Audit
          </h1>
          <div className="space-y-2 text-base text-gray-400 font-light leading-relaxed">
            <p>
              <strong className="text-white">Co to je?</strong> Interaktivní kontrolní seznam (checklist) pro zabezpečení vašich zařízení.
              Projděte bod po bodu a označte ty, které máte splněné.
            </p>
            <p>
              <strong className="text-white">Proč?</strong> Kybernetická bezpečnost není jednorázová akce, ale proces.
              Tento audit vám pomůže nezapomenout na kritická nastavení, která hackeři zneužívají nejčastěji.
            </p>
          </div>
        </div>

        <div className="bg-black/40 border border-white/10 p-5 rounded-2xl text-center min-w-[150px]">
          <div className={`text-5xl font-bold font-mono tracking-tighter transition-colors mb-1 ${percentage === 100 ? 'text-emerald-400' : 'text-white'}`}>{percentage}%</div>
          <div className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-2">Úroveň ochrany</div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-1000 ${percentage === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-pink-600 to-rose-600'}`} style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {AUDIT_DATA.map((section) => (
          <div key={section.id} className="animate-fade-in-up">
            {/* SECTION HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center text-pink-500 shadow-lg">
                  <section.icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-display text-white uppercase tracking-wider">{section.title}</h2>
                  <p className="text-sm text-gray-500 font-mono uppercase tracking-widest">{section.description}</p>
                </div>
              </div>

              {/* PLATFORM TOGGLES */}
              {section.platformType === 'desktop' && (
                <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
                  <button onClick={() => setDesktopOS('Windows')} className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${desktopOS === 'Windows' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>Windows</button>
                  <button onClick={() => setDesktopOS('macOS')} className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${desktopOS === 'macOS' ? 'bg-gray-200 text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}>macOS</button>
                </div>
              )}
              {section.platformType === 'mobile' && (
                <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
                  <button onClick={() => setMobileOS('Android')} className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${mobileOS === 'Android' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>Android</button>
                  <button onClick={() => setMobileOS('iOS')} className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${mobileOS === 'iOS' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}>iPhone</button>
                </div>
              )}
            </div>

            {/* AUDIT ITEMS GRID */}
            <div className="grid gap-3">
              {section.items.map((item) => {
                const isExpanded = expandedItems[item.id];
                const isChecked = checkedItems[item.id];

                // Resolve instructions
                let currentInstructions = item.instructions.general;
                if (section.platformType === 'desktop') {
                  currentInstructions = desktopOS === 'Windows' ? item.instructions.windows : item.instructions.macos;
                } else if (section.platformType === 'mobile') {
                  currentInstructions = mobileOS === 'Android' ? item.instructions.android : item.instructions.ios;
                }

                return (
                  <div
                    key={item.id}
                    onClick={() => setExpandedItems(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                    className={`group border rounded-2xl transition-all duration-300 overflow-hidden relative ${isExpanded ? 'bg-[#151515] border-pink-500/20 shadow-xl' : 'bg-[#0a0a0a]/40 border-white/5 hover:bg-[#111] hover:border-white/10'}`}
                  >
                    {/* Collapsed Header */}
                    <div className="p-4 flex items-center gap-4 relative z-10">
                      <button
                        onClick={(e) => toggleCheck(item.id, e)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 border flex-shrink-0 ${isChecked ? 'bg-emerald-500 border-emerald-500 shadow-md scale-105' : 'bg-transparent border-white/10 group-hover:border-pink-500/30'}`}
                      >
                        {isChecked && <Check className="w-5 h-5 text-white stroke-[3]" />}
                      </button>

                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className={`text-lg font-bold transition-all truncate ${isChecked ? 'text-gray-500 line-through' : 'text-white'}`}>
                            {item.label}
                          </h3>
                        </div>
                        <p className={`text-sm text-gray-400 transition-opacity truncate ${isExpanded ? 'opacity-0 h-0 hidden' : 'opacity-100'}`}>
                          {item.shortDesc}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Desktop Consultant Button */}
                        <button
                          onClick={(e) => startAiConsultant(item, e)}
                          className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${isExpanded ? 'bg-pink-600/10 text-pink-400 border-pink-500/20' : 'bg-transparent text-gray-600 border-transparent hover:bg-white/5 hover:text-gray-300'}`}
                        >
                          <Bot className="w-3 h-3" /> Konzultace
                        </button>
                        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {/* Expanded Body */}
                    {isExpanded && (
                      <div className="px-4 pb-6 pt-0 border-t border-white/5 bg-[#0e0e0e] animate-fade-in-up">
                        <div className="grid md:grid-cols-2 gap-4 mt-6">

                          {/* Info Column */}
                          <div className="space-y-4">
                            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4">
                              <h4 className="flex items-center gap-2 text-emerald-500 text-sm font-bold uppercase tracking-widest mb-2">
                                <Info className="w-4 h-4" /> Význam
                              </h4>
                              <p className="text-gray-300 text-sm leading-relaxed">{item.significance}</p>
                            </div>
                            <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-4">
                              <h4 className="flex items-center gap-2 text-rose-500 text-sm font-bold uppercase tracking-widest mb-2">
                                <AlertTriangle className="w-4 h-4" /> Riziko
                              </h4>
                              <p className="text-gray-300 text-sm leading-relaxed">{item.risk}</p>
                            </div>
                          </div>

                          {/* How-To Column */}
                          <div className="bg-[#050505] rounded-xl border border-white/10 p-5 relative">
                            {/* Small Badge for Current OS */}
                            <div className="absolute top-3 right-3 text-xs uppercase font-bold text-gray-600 border border-white/5 px-2 py-0.5 rounded bg-white/5">
                              {section.platformType === 'desktop' ? desktopOS : section.platformType === 'mobile' ? mobileOS : 'General'}
                            </div>

                            <h4 className="flex items-center gap-2 text-white text-sm font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                              <Settings className="w-4 h-4 text-pink-500" /> Jak nastavit
                            </h4>
                            <div className="space-y-3">
                              {currentInstructions?.map((step, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                  <span className="text-pink-500 font-mono text-sm font-bold mt-0.5">{i + 1}.</span>
                                  <p className="text-gray-400 text-sm leading-relaxed">{step}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Mobile Consultant Button */}
                        <button
                          onClick={(e) => startAiConsultant(item, e)}
                          className="w-full mt-4 md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-pink-600/10 text-pink-400 border border-pink-500/20 rounded-xl text-xs font-bold uppercase tracking-widest"
                        >
                          <Bot className="w-3 h-3" /> Zeptat se AI
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* AI CHAT MODAL refined */}
      {showChat && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowChat(false)}></div>
          <div className="relative w-full max-w-2xl h-full md:h-[80vh] bg-[#111] border border-white/10 md:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#0a0a0a]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-600/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-pink-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">AI Konzultant</h3>
                  <p className="text-xs text-gray-500 truncate max-w-[150px]">{activeItem?.label}</p>
                </div>
              </div>
              <button onClick={() => setShowChat(false)} className="text-gray-500 hover:text-white bg-white/5 p-2 rounded-full hover:bg-rose-500 transition-colors"><X className="w-4 h-4" /></button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-[#0e0e0e]">
              {/* Intro Screen if history is empty */}
              {chatHistory.length === 0 && !loading && !needsKey && (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-pink-500/20">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Potřebujete pomoci s nastavením?</h3>
                  <p className="text-gray-400 text-sm max-w-sm mb-8 leading-relaxed">
                    Jsem váš AI bezpečnostní asistent. Mohu vás provést nastavením
                    bodu <strong>"{activeItem?.label}"</strong> krok za krokem, přímo pro vaše zařízení.
                  </p>

                  <div className="w-full max-w-xs space-y-3">
                    <button
                      onClick={() => submitMessage(`Jak nastavit ${activeItem?.label} na mém zařízení?`)}
                      className="w-full py-3 px-4 bg-[#1a1a1a] border border-white/10 hover:border-pink-500/50 hover:bg-[#222] rounded-xl text-sm text-gray-300 hover:text-white transition-all text-left flex items-center justify-between group"
                    >
                      <span>🚀 Jak to mám nastavit?</span>
                      <ArrowRight className="w-3 h-3 text-pink-500 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => submitMessage(activeItem?.aiPrompt || "Mám dotaz.")}
                      className="w-full py-3 px-4 bg-[#1a1a1a] border border-white/10 hover:border-pink-500/50 hover:bg-[#222] rounded-xl text-sm text-gray-300 hover:text-white transition-all text-left flex items-center justify-between group"
                    >
                      <span>💡 {activeItem?.aiPrompt}</span>
                      <ArrowRight className="w-3 h-3 text-pink-500 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

              {!needsKey ? chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in`}>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-md ${msg.role === 'model' ? 'bg-[#1a1a1a] text-gray-300 border border-white/5' : 'bg-pink-600 text-white'}`}>
                    <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }}></div>
                  </div>
                </div>
              )) : (
                <div className="text-center p-10 flex flex-col items-center justify-center h-full">
                  <Key className="w-12 h-12 text-amber-500 mb-4" />
                  <h3 className="text-white font-bold text-sm mb-2">Vyžadován API klíč</h3>
                  <p className="text-gray-500 text-xs mb-6 max-w-[200px]">Pro využití AI asistenta je potřeba propojit aplikaci.</p>
                  <button onClick={handleOpenKeyDialog} className="bg-white text-black px-6 py-2 rounded-xl text-xs font-bold uppercase hover:bg-amber-100 shadow-lg">Připojit klíč</button>
                </div>
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1a1a] border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-pink-500 animate-spin" />
                    <span className="text-xs text-gray-500">Analyzuji váš dotaz...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            {!needsKey && (
              <div className="p-4 bg-[#0a0a0a] border-t border-white/5">
                {selectedImage && (
                  <div className="mb-3 flex items-center gap-2 bg-[#1a1a1a] p-2 rounded-lg w-fit border border-white/10 animate-fade-in-up">
                    <img src={selectedImage} alt="Preview" className="h-12 w-auto rounded-md object-cover border border-white/5" />
                    <button onClick={clearImage} className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                    <span className="text-xs text-gray-500 pr-2">Snímek obrazovky</span>
                  </div>
                )}
                <form onSubmit={handleSendMessage} className="relative flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 bg-[#151515] border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-[#222] transition-colors"
                    title="Nahrát obrázek"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <div className="relative flex-grow">
                    <input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={selectedImage ? "Přidejte komentář k obrázku..." : "Zeptejte se nebo vložte screenshot..."}
                      className="w-full bg-[#151515] border border-white/10 rounded-xl pl-4 pr-12 py-3.5 text-sm text-white focus:border-pink-500/50 outline-none transition-all placeholder:text-gray-600"
                    />
                    <button type="submit" disabled={loading || (!inputMessage.trim() && !selectedImage)} className="absolute right-2 top-2 p-2 bg-pink-600 rounded-lg text-white hover:bg-pink-500 disabled:opacity-50 disabled:bg-gray-800 transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditScreen;
