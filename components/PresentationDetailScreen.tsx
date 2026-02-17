import React, { useState } from 'react';
import { Block } from '../types';
import { ArrowLeft, ExternalLink, Download, MonitorPlay, AlertTriangle } from 'lucide-react';

interface Props {
    block: Block;
    onBack: () => void;
    theme?: 'cyan' | 'purple' | 'emerald';
}

const PresentationDetailScreen: React.FC<Props> = ({ block, onBack, theme = 'cyan' }) => {
    const isPurple = theme === 'purple';
    // If theme is emerald, we still might want to default to cyan or handle it. 
    // Based on current usage, only 'cyan' and 'purple' seem heavily used for styling, 
    // but let's support passing the prop through.
    const colorClass = isPurple ? 'purple' : (theme === 'emerald' ? 'emerald' : 'cyan');

    const isGamma = !!block.gammaUrl;
    const resourceUrl = isGamma ? block.gammaUrl : `pdfs/blok${block.id}.pdf`;

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 h-screen flex flex-col relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 animate-fade-in-up">
                <button
                    onClick={onBack}
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all duration-300 flex items-center gap-3 text-xs font-bold tracking-widest uppercase group bg-white/50 dark:bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/30 font-mono"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Zpět na seznam</span>
                </button>

                <h2 className="text-gray-900 dark:text-white font-display text-xl hidden md:block uppercase">
                    {block.title}
                </h2>

                <div className="flex gap-2">
                    {isGamma ? (
                        <a
                            href={resourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-${colorClass}-500 text-black px-6 py-2 rounded-full hover:bg-${colorClass}-400 transition-all font-mono shadow-[0_0_20px_rgba(6,182,212,0.3)]`}
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span>Otevřít v novém okně</span>
                        </a>
                    ) : (
                        <a
                            href={resourceUrl}
                            download
                            className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-${colorClass}-950/50 hover:bg-${colorClass}-900/50 text-${colorClass}-400 px-4 py-2 rounded-full border border-${colorClass}-500/30 transition-all font-mono`}
                        >
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Stáhnout PDF</span>
                        </a>
                    )}
                </div>
            </div>

            {/* Viewer Container */}
            <div className="flex-grow relative animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <div className={`absolute inset-0 bg-gradient-to-b from-${colorClass}-500/10 to-transparent rounded-xl blur-sm opacity-50`}></div>
                <div className="absolute inset-0 bg-white dark:bg-[#0a0a0a] rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-2xl flex flex-col">
                    <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-${colorClass}-500/50 to-transparent z-20`}></div>

                    {/* Fallback Message Background (Visible if iframe is transparent or fails) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gray-50 dark:bg-[#050505] -z-10">
                        <div className={`w-16 h-16 rounded-full bg-${colorClass}-50 dark:bg-${colorClass}-500/10 flex items-center justify-center mb-6 border border-${colorClass}-200 dark:border-${colorClass}-500/20`}>
                            <AlertTriangle className={`w-8 h-8 text-${colorClass}-600 dark:text-${colorClass}-400`} />
                        </div>
                        <h3 className="text-gray-900 dark:text-white font-display text-xl mb-4 uppercase">Náhled se nenačítá?</h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8 text-sm leading-relaxed">
                            Pokud se prezentace nenačte automaticky, může být blokována nastavením prohlížeče. Spusťte ji externě.
                        </p>
                    </div>

                    {/* The actual iframe */}
                    <iframe
                        src={isGamma ? resourceUrl : `${resourceUrl}#toolbar=0&view=FitH`}
                        className="w-full h-full border-0 relative z-10 bg-transparent"
                        title={block.title || "Presentation Viewer"}
                        allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    >
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default PresentationDetailScreen;
