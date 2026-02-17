
import React, { useState, useEffect } from 'react';
import { Cookie, X, Check } from 'lucide-react';

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'accepted');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-fade-in-up">
            <div className="max-w-4xl mx-auto bg-[#0f0f0f]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 flex-shrink-0">
                    <Cookie className="w-6 h-6 text-cyan-400" />
                </div>

                <div className="flex-grow">
                    <h3 className="text-white font-bold text-base uppercase tracking-wide mb-2">Vaše soukromí je priorita</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Tento web používá <strong>lokální úložiště</strong> (localStorage) pro zrychlení načítání obsahu a <strong>AI technologie</strong> pro analýzu dat.
                        Nepoužíváme žádné sledovací skripty třetích stran pro marketing. Veškerá citlivá data (hesla) jsou zpracovávána pouze ve vašem prohlížeči.
                    </p>
                </div>

                <div className="flex gap-3 flex-shrink-0 w-full md:w-auto">
                    <button
                        onClick={handleAccept}
                        className="flex-1 md:flex-none bg-white text-black px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
                    >
                        <Check className="w-4 h-4" /> Rozumím
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
