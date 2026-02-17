
import React, { useRef, useEffect } from 'react';
import { X, Shield, Lock, Eye, Server } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const PrivacyModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div
                ref={modalRef}
                className="bg-[#0f0f0f] border border-white/10 w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-scale-in"
            >
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                            <Shield className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight">Ochrana Osobních Údajů</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar">

                    <section>
                        <h3 className="flex items-center gap-2 text-rose-400 font-bold uppercase tracking-widest text-xs mb-3">
                            <Server className="w-4 h-4" /> 1. Správce Dat
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Správcem osobních údajů je <strong>Pavel Bertelmann</strong> (kontakt: pbertelmann@gmail.com).
                            Vaše soukromí bereme vážně a data zpracováváme pouze v nezbytném rozsahu pro technický chod aplikace.
                        </p>
                    </section>

                    <section>
                        <h3 className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-xs mb-3">
                            <Lock className="w-4 h-4" /> 2. Jaká data sbíráme?
                        </h3>
                        <ul className="space-y-3">
                            <li className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <strong className="block text-white text-xs uppercase mb-1">Automaticky (Technická data)</strong>
                                <p className="text-xs text-gray-400">IP adresa, typ prohlížeče, cookies pro funkčnost (přihlášení, stav kvízu). Tato data jsou nutná pro provoz.</p>
                            </li>
                            <li className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <strong className="block text-white text-xs uppercase mb-1">Dobrovolně (Uživatelská data)</strong>
                                <p className="text-xs text-gray-400">E-mail (pokud se přihlásíte), výsledky kvízů, historie. Hesla NIKDY neukládáme v čitelné podobě.</p>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-xs mb-3">
                            <Eye className="w-4 h-4" /> 3. Vaše Práva
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed mb-4">
                            Podle GDPR máte právo na:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-xs text-gray-300">Právo na výmaz (zapomenutí)</div>
                            <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-xs text-gray-300">Právo na opravu údajů</div>
                            <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-xs text-gray-300">Právo na výpis dat</div>
                            <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-xs text-gray-300">Odvolat souhlas</div>
                        </div>
                    </section>

                    <div className="p-4 border border-rose-500/20 bg-rose-500/5 rounded-xl text-center">
                        <p className="text-xs text-rose-300">
                            Tato aplikace slouží primárně k <strong>vzdělávacím účelům</strong>. Data neprodáváme ani nepředáváme třetím stranám za účelem marketingu.
                        </p>
                    </div>

                </div>

                <div className="p-6 border-t border-white/5 bg-black/40 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-white text-black hover:bg-cyan-400 px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                    >
                        Zavřít
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyModal;
