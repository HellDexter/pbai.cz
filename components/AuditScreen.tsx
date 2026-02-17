
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Check, Bot, X, ShieldAlert, ShieldCheck, Send, Loader2, AlertTriangle, ChevronDown, ChevronUp, Zap, Key, ArrowRight } from 'lucide-react';
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
  why: string;
  risk: string;
  aiPrompt: string;
}

interface AuditSection {
  title: string;
  description: string;
  items: AuditItem[];
}

const AUDIT_DATA: AuditSection[] = [
  {
    title: "Sekce 1: Počítač (Windows/macOS)",
    description: "Zabezpečení operačního systému je první linií obrany proti útočníkům.",
    items: [
      { id: "pc_updates", label: "Automatické aktualizace systému", why: "Zajišťují, že máte nejnovější bezpečnostní záplaty.", risk: "Hackeři využívají nezáplatované chyby k ovládnutí PC.", aiPrompt: "Jak nastavit automatické aktualizace?" },
      { id: "pc_firewall", label: "Aktivní Firewall", why: "Filtruje nebezpečný provoz z internetu.", risk: "Bez firewallu jsou vaše data v síti viditelná všem.", aiPrompt: "Proč mít aktivní firewall?" },
      { id: "pc_antivir", label: "Funkční Antivirus / Defender", why: "Identifikuje a blokuje malware před spuštěním.", risk: "Ransomware může zašifrovat všechna vaše data.", aiPrompt: "Stačí Windows Defender?" },
      { id: "pc_encryption", label: "Šifrování disku (BitLocker/FileVault)", why: "Chrání data při fyzické krádeži zařízení.", risk: "Bez šifrování zloděj přečte disk v jiném PC.", aiPrompt: "Jak zapnout šifrování disku?" }
    ]
  },
  {
    title: "Sekce 2: Telefon (Android/iPhone)",
    description: "Váš mobilní telefon obsahuje více soukromí než vaše peněženka.",
    items: [
      { id: "mob_biometrics", label: "Biometrická ochrana (otisk/obličej)", why: "Nejrychlejší a nejbezpečnější ochrana vstupu.", risk: "PIN lze snadno odkoukat zpoza ramene.", aiPrompt: "Proč používat biometrii?" },
      { id: "mob_findmy", label: "Aktivní služba 'Najít zařízení'", why: "Umožňuje vzdálené smazání dat při ztrátě.", risk: "Zloděj získá přístup k vašemu cloudu a bankovnictví.", aiPrompt: "Jak funguje Najít telefon?" },
      { id: "mob_permissions", label: "Kontrola oprávnění aplikací", why: "Zabraňuje aplikacím v odposlechu nebo sledování.", risk: "Aplikace mohou tajně nahrávat zvuk nebo polohu.", aiPrompt: "Jak kontrolovat oprávnění aplikací?" }
    ]
  },
  {
    title: "Sekce 3: Domácí síť a Wi-Fi",
    description: "Router je brána do vašeho domova. Špatné nastavení ohrožuje všechna zařízení.",
    items: [
      { id: "net_password", label: "Změna výchozího hesla routeru", why: "Zabrání útočníkům ovládnout vaši síť zvenčí.", risk: "Výchozí hesla jsou veřejně známá hackerům.", aiPrompt: "Jak změnit heslo k routeru?" },
      { id: "net_wifi_pass", label: "Silné heslo k Wi-Fi (16+ znaků)", why: "Dlouhé heslo je odolné proti útokům hrubou silou.", risk: "Slabé heslo umožní sousedům sledovat váš provoz.", aiPrompt: "Tipy na silné WiFi heslo." },
      { id: "net_wps", label: "Vypnuté WPS", why: "Protokol WPS obsahuje kritickou chybu v návrhu.", risk: "WiFi heslo lze prolomit během pár hodin přes WPS.", aiPrompt: "Proč vypnout WPS?" },
      { id: "net_firmware", label: "Aktuální firmware routeru", why: "Výrobci vydávají opravy pro aktivní útoky.", risk: "Zastaralý router slouží jako trvalý odposlech.", aiPrompt: "Jak aktualizovat router?" },
      { id: "net_guest", label: "Síť pro hosty (Guest Network)", why: "Odděluje návštěvy od vašich soukromých dat.", risk: "Infikovaný mobil návštěvy může napadnout vaše PC.", aiPrompt: "Výhody Guest sítě." }
    ]
  },
  {
    title: "Sekce 4: Zálohování a obnova",
    description: "Záloha je jedinou 100% jistotou proti ztrátě dat.",
    items: [
      { id: "back_local", label: "Lokální záloha na externím disku", why: "Rychlá obnova a fyzická kontrola nad daty.", risk: "Při havárii PC přijdete o vše bez zálohy.", aiPrompt: "Jak zálohovat na disk?" },
      { id: "back_cloud", label: "Cloudová záloha (OneDrive/iCloud)", why: "Ochrana dat i při požáru nebo krádeži domova.", risk: "Fyzické disky mohou selhat všechny najednou.", aiPrompt: "Který cloud je nejlepší?" },
      { id: "back_auto", label: "Automatizace záloh", why: "Běží bez vašeho zásahu. Lidé zapomínají.", risk: "Stará záloha je při útoku k ničemu.", aiPrompt: "Jak automatizovat zálohy?" },
      { id: "back_test", label: "Test obnovy ze zálohy", why: "Ověření, že data jdou skutečně přečíst.", risk: "Poškozená záloha vyjde najevo, až když je pozdě.", aiPrompt: "Jak otestovat obnovu dat?" }
    ]
  }
];

const AuditScreen: React.FC<Props> = ({ onBack }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [showChat, setShowChat] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeItem, setActiveItem] = useState<AuditItem | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [needsKey, setNeedsKey] = useState(false);
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
      if (activeItem) {
        // Retry the call
        const dummyEvent = { stopPropagation: () => {} } as React.MouseEvent;
        startAiConsultant(activeItem, dummyEvent);
      }
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
    setChatHistory([]);
    setNeedsKey(false);

    if (!process.env.API_KEY) {
      setNeedsKey(true);
      return;
    }

    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: item.aiPrompt }] }],
        config: { 
          systemInstruction: `Jsi Kyber-GURU, špičkový expert na IT bezpečnost. Pomoz uživateli s tématem: ${item.label}. Riziko: ${item.risk}.` 
        }
      });

      if (response.text) {
        setChatHistory([{ role: 'model', text: response.text }]);
      }
    } catch (err: any) {
      console.error("AI Consultant Error:", err);
      const msg = err.message || "";
      if (msg.includes("API Key") || msg.includes("not set")) {
        setNeedsKey(true);
      } else {
        setChatHistory([{ role: 'model', text: "Omlouvám se, ale nepodařilo se mi navázat spojení. Zkontrolujte prosím svůj API klíč." }]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading || !activeItem || !process.env.API_KEY) return;

    const userText = inputMessage;
    const newHistory: Message[] = [...chatHistory, { role: 'user', text: userText }];
    setChatHistory(newHistory);
    setInputMessage("");
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: newHistory.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
      });
      if (response.text) {
        setChatHistory(prev => [...prev, { role: 'model', text: response.text! }]);
      }
    } catch (e) {
      setChatHistory(prev => [...prev, { role: 'model', text: "Došlo k chybě při generování odpovědi." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 min-h-screen pb-32">
      <div className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-xl -mx-4 px-4 pt-4 pb-8 mb-8 border-b border-white/5 animate-fade-in-up">
        <button onClick={onBack} className="text-gray-500 hover:text-white transition-all flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-6 font-mono group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Zpět do menu
        </button>

        <div className="bg-[#0f0f0f] border border-white/10 p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 opacity-30"></div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-display text-white mb-2 uppercase tracking-tighter">
              Audit <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-600">Zabezpečení</span>
            </h1>
            <p className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em]">Bezpečný občan 1.0 • Interaktivní modul</p>
          </div>
          <div className="bg-black/40 border border-white/10 p-5 rounded-3xl text-center min-w-[160px] backdrop-blur-md shadow-inner">
            <div className={`text-4xl md:text-5xl font-bold font-mono tracking-tighter transition-colors ${percentage === 100 ? 'text-emerald-400' : 'text-white'}`}>{percentage}%</div>
            <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-3">Dokončeno</div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
               <div className={`h-full transition-all duration-1000 ${percentage === 100 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-pink-600'}`} style={{ width: `${percentage}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {AUDIT_DATA.map((section, sIdx) => (
          <div key={sIdx} className="animate-fade-in-up" style={{ animationDelay: `${sIdx * 100}ms` }}>
            <div className="mb-6 flex items-center gap-4">
               <div className="w-1 h-8 bg-pink-500 rounded-full"></div>
               <div>
                  <h2 className="text-xl font-display text-white uppercase tracking-wider">{section.title}</h2>
                  <p className="text-gray-500 text-[10px] uppercase font-mono tracking-widest">{section.description}</p>
               </div>
            </div>

            <div className="grid gap-3">
              {section.items.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setExpandedItems(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                  className={`group border rounded-2xl cursor-pointer transition-all duration-300 ${expandedItems[item.id] ? 'bg-[#1a1a1a] border-pink-500/40 shadow-xl' : 'bg-[#0a0a0a]/60 border-white/5 hover:border-white/20'}`}
                >
                  <div className="p-4 md:p-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-grow">
                      <button 
                        onClick={(e) => toggleCheck(item.id, e)}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all border ${checkedItems[item.id] ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-white/5 border-white/10 group-hover:border-pink-500/30'}`}
                      >
                        {checkedItems[item.id] && <Check className="w-4 h-4 text-white" />}
                      </button>
                      <h3 className={`text-sm md:text-base font-bold transition-all ${checkedItems[item.id] ? 'text-gray-600 line-through opacity-50' : 'text-white'}`}>
                        {item.label}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                          onClick={(e) => startAiConsultant(item, e)}
                          className="flex items-center gap-2 px-3 py-2 bg-pink-500/10 hover:bg-pink-500 text-pink-500 hover:text-white border border-pink-500/20 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                        >
                          <Bot className="w-3 h-3" /> <span className="hidden sm:inline">AI Poradce</span>
                        </button>
                        {expandedItems[item.id] ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
                    </div>
                  </div>

                  {expandedItems[item.id] && (
                    <div className="px-6 pb-6 pt-2 animate-fade-in-up border-t border-white/5 bg-black/20">
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                          <div className="flex items-center gap-2 text-emerald-400 text-[9px] font-bold uppercase mb-2 font-mono"><ShieldCheck className="w-3 h-3" /> Význam</div>
                          <p className="text-gray-400 text-xs leading-relaxed">{item.why}</p>
                        </div>
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/10">
                          <div className="flex items-center gap-2 text-rose-400 text-[9px] font-bold uppercase mb-2 font-mono"><AlertTriangle className="w-3 h-3" /> Riziko</div>
                          <p className="text-gray-400 text-xs leading-relaxed">{item.risk}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showChat && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setShowChat(false)}></div>
          <div className="relative w-full max-w-2xl h-full md:h-[85vh] bg-[#0d0d0d] border border-white/10 md:rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
             <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#111]">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center"><Bot className="w-7 h-7 text-white" /></div>
                   <div><h3 className="text-xs font-bold text-white uppercase tracking-widest font-display">AI Konzultant</h3><p className="text-[10px] text-pink-500 font-mono truncate max-w-[200px]">{activeItem?.label}</p></div>
                </div>
                <button onClick={() => setShowChat(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all"><X className="w-5 h-5" /></button>
             </div>
             
             <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {needsKey ? (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-8 text-center animate-fade-in-up">
                     <Key className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                     <h3 className="text-white font-bold mb-2">Chybí API klíč</h3>
                     <p className="text-gray-500 text-xs mb-6">AI konzultant vyžaduje platný API klíč s aktivním Billingem.</p>
                     <button onClick={handleOpenKeyDialog} className="bg-white text-black px-6 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-amber-50 transition-all flex items-center gap-2 mx-auto">Vybrat klíč <ArrowRight className="w-3 h-3" /></button>
                  </div>
                ) : (
                  <>
                    {chatHistory.map((msg, idx) => (
                      <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-1 border ${msg.role === 'model' ? 'bg-pink-500/10 text-pink-500 border-pink-500/20' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                          {msg.role === 'model' ? <Bot className="w-4 h-4" /> : <div className="w-1 h-1 bg-white rounded-full"></div>}
                        </div>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'model' ? 'bg-[#181818] text-gray-200 border border-white/5' : 'bg-pink-600 text-white shadow-lg'}`}>
                          <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }}></div>
                        </div>
                      </div>
                    ))}
                    {loading && <div className="flex gap-4 animate-pulse"><div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20" /><div className="bg-[#181818] rounded-2xl px-6 py-4 w-32" /></div>}
                  </>
                )}
                <div ref={chatEndRef} />
             </div>
             
             {!needsKey && (
               <div className="p-6 bg-[#111] border-t border-white/5">
                  <form onSubmit={handleSendMessage} className="flex gap-3">
                    <input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Zeptejte se na detaily..." className="flex-grow bg-[#050505] border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-pink-500/50 transition-all font-light" />
                    <button type="submit" disabled={loading || !inputMessage.trim()} className="w-14 h-14 bg-pink-600 text-white rounded-2xl hover:bg-pink-500 disabled:opacity-30 transition-all flex items-center justify-center shadow-lg"><Send className="w-5 h-5" /></button>
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
