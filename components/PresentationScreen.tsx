
import React from 'react';
import { Block } from '../types';
import { Play, ArrowRight, BookOpen, MonitorPlay, Shield, ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';

interface Props {
    blocks: Block[];
    onSelectBlock: (blockId: number) => void;
    onBack?: () => void;
}

const PresentationScreen: React.FC<Props> = ({ blocks, onSelectBlock, onBack }) => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
            {/* Header */}
            <header className="mb-12 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                        <MonitorPlay className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-display text-white uppercase tracking-tight">Prezentace</h1>
                        <p className="text-gray-400 text-base">Digitální archiv školení</p>
                    </div>
                </div>
                <p className="text-gray-400 font-light max-w-2xl leading-relaxed text-lg">
                    Interaktivní slidy z našeho školení. Projděte si znovu klíčová témata, prohlédněte si grafy a připomeňte si důležité bezpečnostní principy.
                </p>
            </header>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blocks.map((block, idx) => {
                    // Dynamic Icon
                    // @ts-ignore
                    const IconComponent = Icons[block.icon] || Shield;

                    return (
                        <div
                            key={block.id}
                            onClick={() => onSelectBlock(block.id)}
                            className="group relative bg-[#0f0f0f] border border-white/10 rounded-[2rem] overflow-hidden hover:border-purple-500/50 transition-all duration-500 cursor-pointer hover:-translate-y-1 shadow-2xl"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="p-8 flex flex-col h-full relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:bg-purple-500/20 group-hover:border-purple-500/30">
                                        <IconComponent className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
                                    </div>
                                    <span className="text-xs font-mono text-gray-600 uppercase tracking-widest border border-white/5 px-2 py-1 rounded-lg group-hover:border-purple-500/30 group-hover:text-purple-400 transition-colors">
                                        Lekce {idx + 1}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 font-display uppercase tracking-tight leading-tight group-hover:text-purple-400 transition-colors">
                                    {block.title}
                                </h3>

                                <p className="text-base text-gray-400 leading-relaxed font-light mb-8 line-clamp-3 group-hover:text-gray-300">
                                    {block.description}
                                </p>

                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-purple-400 transition-colors">
                                        <Play className="w-3 h-3 fill-current" /> Spustit
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                        <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PresentationScreen;
