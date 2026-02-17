
import React from 'react';
import { Block } from '../types';
import * as Icons from 'lucide-react';
import { ArrowLeft, FileText, ExternalLink, MonitorPlay } from 'lucide-react';

interface Props {
  blocks: Block[];
  onSelectBlock: (blockId: number) => void;
  onBack: () => void;
  theme?: 'cyan' | 'purple';
}

const PresentationScreen: React.FC<Props> = ({ blocks, onSelectBlock, onBack, theme = 'cyan' }) => {
  const isPurple = theme === 'purple';
  const colorClass = isPurple ? 'purple' : 'cyan';
  const gradientText = isPurple ? 'from-purple-300 to-pink-400' : 'from-cyan-300 to-blue-400';

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10 min-h-screen">
      <button
        onClick={onBack}
        className="mb-12 text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-3 text-xs font-bold tracking-widest uppercase group animate-fade-in-up font-mono"
      >
        <div className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-${colorClass}-500/30 group-hover:bg-${colorClass}-500/10 transition-all`}>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </div>
        <span>Zpět do menu</span>
      </button>

      <header className="mb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-${colorClass}-500/30 bg-${colorClass}-500/5 text-${colorClass}-400 text-[10px] uppercase tracking-widest mb-6 backdrop-blur-sm font-mono`}>
          <FileText className="w-3 h-3" />
          Knihovna materiálů
        </div>
        <h1 className="text-4xl md:text-6xl font-display text-white mb-6 tracking-tight uppercase">
          Prezentace <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientText}`}>kurzu</span>
        </h1>
        <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
          Prostudujte si detailní materiály k jednotlivým blokům. Interaktivní prezentace a dokumenty s kompletní teorií.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {blocks.map((block, index) => {
          // @ts-ignore
          const IconComponent = Icons[block.icon] || Icons.FileText;
          const isGamma = !!block.gammaUrl;

          return (
            <button
              key={block.id}
              onClick={() => onSelectBlock(block.id)}
              className="group relative h-full animate-fade-in-up text-left"
              style={{ animationDelay: `${200 + (index * 50)}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-${colorClass}-500/0 via-${colorClass}-500/20 to-blue-600/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500`}></div>
              <div className={`relative h-full bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-8 overflow-hidden hover:bg-[#0a0a0a]/90 transition-all duration-300 group-hover:border-${colorClass}-500/30 hover:-translate-y-1`}>
                <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-${colorClass}-500/30 to-transparent opacity-30 group-hover:opacity-80 transition-opacity`}></div>
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-${colorClass}-950/20 border border-${colorClass}-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <IconComponent className={`w-6 h-6 text-${colorClass}-400`} />
                  </div>
                  <div className={`text-xs font-bold font-mono border border-white/5 px-3 py-1 rounded bg-black/40 transition-colors text-gray-500 group-hover:text-${colorClass}-300`}>
                    BLOK {block.id}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white font-display uppercase transition-colors">
                  {block.title.replace(/^Blok \d+: /, "")}
                </h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed mb-8 group-hover:text-gray-400 transition-colors">
                  {block.description}
                </p>
                <div className={`mt-auto flex items-center gap-2 text-[11px] font-bold text-${colorClass}-500/70 group-hover:text-${colorClass}-400 uppercase tracking-widest transition-colors font-mono`}>
                  {isGamma ? <>Spustit prezentaci <MonitorPlay className="w-3 h-3" /></> : <>Otevřít dokument <ExternalLink className="w-3 h-3" /></>}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PresentationScreen;
