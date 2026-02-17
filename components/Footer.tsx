
import React, { useState } from 'react';
import PrivacyModal from './PrivacyModal';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

    return (
        <>
            <footer className="w-full py-8 mt-auto border-t border-white/5 bg-black/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

                    <div className="text-center md:text-left">
                        <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                            &copy; {currentYear} <span className="text-white">Pavel Bertelmann</span> — Všechna práva vyhrazena.
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <button
                            onClick={() => setIsPrivacyOpen(true)}
                            className="text-xs text-gray-600 hover:text-cyan-400 transition-colors uppercase tracking-widest font-bold bg-transparent border-none cursor-pointer"
                        >
                            Ochrana dat (GDPR)
                        </button>
                        <a
                            href="mailto:pbertelmann@gmail.com"
                            className="text-xs text-gray-600 hover:text-cyan-400 transition-colors uppercase tracking-widest font-bold"
                        >
                            Kontakt
                        </a>
                    </div>

                </div>
            </footer>
            <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
        </>
    );
};

export default Footer;
