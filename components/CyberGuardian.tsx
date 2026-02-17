
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Shield, Lock, AlertTriangle, Key, Loader2, MessageSquare, ChevronDown } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
    role: 'user' | 'model';
    text: string;
}

const CyberGuardian: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'model',
            text: "Dobrý den, jsem váš AI Cyber Guardian. Jsem expert na kybernetickou bezpečnost, zákon o kybernetické bezpečnosti ČR a směrnici NIS2. Jak vám mohu pomoci zabezpečit vaši organizaci nebo data?"
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [needsKey, setNeedsKey] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleOpenKeyDialog = async () => {
        try {
            // @ts-ignore
            await window.aistudio?.openSelectKey();
            setNeedsKey(false);
        } catch (err) {
            console.error("Failed to open key dialog:", err);
        }
    };

    const sendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;
        if (!process.env.API_KEY) {
            setNeedsKey(true);
            return;
        }

        const userText = input;
        const newHistory: Message[] = [...messages, { role: 'user', text: userText }];
        setMessages(newHistory);
        setInput("");
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: newHistory.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
                config: {
                    systemInstruction: `Jsi AI Cyber Guardian - expertní bezpečnostní poradce se specializací na:
            1. Zákon o kybernetické bezpečnosti ČR (ZoKB).
            2. Evropskou směrnici NIS2 a její implementaci v ČR.
            3. Obecnou kybernetickou bezpečnost (prevence útoků, ransomware, phishing).
            4. Bezpečnostní standardy (ISO 27001).

            Tvé vlastnosti:
            - Profesionální, ale srozumitelný jazyk.
            - Stručné a praktické odpovědi.
            - Pokud si nejsi jistý legislativním výkladem, upozorni uživatele, že se jedná o informativní názor, ne právní radu.
            - Vždy dbej na etiku a "defense-first" přístup.

            Pokud se uživatel zeptá na něco mimo bezpečnost, zdvořile ho nasměruj zpět k tématu kybernetické bezpečnosti.`
                }
            });

            if (response.text) {
                setMessages(prev => [...prev, { role: 'model', text: response.text! }]);
            }
        } catch (error: any) {
            console.error(error);
            if (error.message?.includes("API Key")) {
                setNeedsKey(true);
            } else {
                setMessages(prev => [...prev, { role: 'model', text: "Omlouvám se, došlo k chybě při spojení s bezpečnostním centrem. Zkuste to prosím později." }]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-24 right-8 z-[60] flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(0,255,100,0.3)] hover:shadow-[0_0_30px_rgba(0,255,100,0.5)] ${isOpen
                    ? 'w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 rotate-90'
                    : 'w-14 h-14 rounded-2xl bg-[#0a0a0a] border border-emerald-500/50 hover:scale-105'}`}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <div className="relative">
                        <Shield className="w-8 h-8 text-emerald-500" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border border-black"></div>
                    </div>
                )}
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-24 right-4 md:right-8 z-[60] w-[90vw] md:w-[400px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right flex flex-col ${isOpen ? 'opacity-100 scale-100 translate-y-0 h-[600px] max-h-[80vh]' : 'opacity-0 scale-90 translate-y-10 h-0 pointer-events-none'}`}>

                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-900/50 to-black p-4 border-b border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm uppercase tracking-wider">Cyber Guardian</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] text-emerald-500 font-mono">SYSTEM ONLINE • NIS2 READY</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="ml-auto p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'model' ? 'bg-emerald-500/10' : 'bg-gray-700'}`}>
                                {msg.role === 'model' ? <Shield className="w-4 h-4 text-emerald-500" /> : <MessageSquare className="w-4 h-4 text-white" />}
                            </div>
                            <div className={`p-3 rounded-2xl text-sm leading-relaxed max-w-[85%] ${msg.role === 'model'
                                ? 'bg-[#151515] border border-emerald-500/20 text-gray-200'
                                : 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white'}`}>
                                <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }}></div>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
                            </div>
                            <div className="bg-[#151515] border border-emerald-500/20 px-4 py-2 rounded-2xl">
                                <span className="text-xs text-emerald-500/70 font-mono animate-pulse">Analyzuji bezpečnostní protokoly...</span>
                            </div>
                        </div>
                    )}

                    {needsKey && (
                        <div className="p-4 bg-amber-900/10 border border-amber-500/20 rounded-xl text-center">
                            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                            <p className="text-amber-200 text-xs mb-3">Pro komunikaci je vyžadován API klíč.</p>
                            <button onClick={handleOpenKeyDialog} className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors">
                                Vložit klíč
                            </button>
                        </div>
                    )}

                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-black/50 border-t border-white/5">
                    <form onSubmit={sendMessage} className="relative">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Zeptejte se na NIS2, zákony nebo bezpečnost..."
                            disabled={isLoading || needsKey}
                            className="w-full bg-[#111] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:border-emerald-500/50 outline-none transition-all placeholder:text-gray-600 disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim() || needsKey}
                            className="absolute right-2 top-2 p-1.5 bg-emerald-600 rounded-lg text-white hover:bg-emerald-500 disabled:opacity-50 disabled:bg-gray-800 transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                    <div className="text-[10px] text-center text-gray-600 mt-2 font-mono">
                        AI může dělat chyby. Ověřujte prosím důležité informace.
                    </div>
                </div>
            </div>
        </>
    );
};

export default CyberGuardian;
