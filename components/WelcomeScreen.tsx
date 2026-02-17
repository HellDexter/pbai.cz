
import React from 'react';
import { Block } from '../types';
import * as Icons from 'lucide-react';
import { ArrowLeft, BrainCircuit, ArrowRight } from 'lucide-react';

interface Props {
  blocks: Block[];
  onStartBlock: (blockId: number) => void;
  onBack: () => void;
  theme?: 'emerald' | 'purple';
}

const WelcomeScreen: React.FC<Props> = ({ blocks, onStartBlock, onBack, theme = 'emerald' }) => {
  const isPurple = theme === 'purple';
  const colorClass = isPurple ? 'purple' : 'emerald';

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">

      <button
        onClick={onBack}
        className="mb-10 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all duration-300 flex items-center gap-3 text-xs font-bold tracking-widest uppercase group font-mono"
      >
        <div className={`w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:border-${colorClass}-500/30 transition-all`}>
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span>Zpět</span>
      </button>

      <header className="mb-12 animate-fade-in-up">
        <h1 className="text-3xl md:text-5xl font-display text-gray-900 dark:text-white mb-4 tracking-tight uppercase">
          Kvízy a <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isPurple ? 'from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-500' : 'from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-500'}`}>testy</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-500 max-w-2xl text-base md:text-lg font-light leading-relaxed">
          Vyberte si blok a otestujte své znalosti v interaktivní simulaci.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {blocks.map((block, index) => {
          // @ts-ignore
          const IconComponent = Icons[block.icon] || Icons.HelpCircle;

          return (
            <button
              key={block.id}
              onClick={() => onStartBlock(block.id)}
              className="group relative animate-fade-in-up text-left flex flex-col"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`relative flex-grow backdrop-blur-xl rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 
                ${isPurple
                  ? 'bg-white/90 dark:bg-[#0a0a0a]/60 border border-purple-200/50 dark:border-white/10 hover:border-purple-500/30'
                  : 'bg-white/90 dark:bg-[#0a0a0a]/60 border border-emerald-200/50 dark:border-white/10 hover:border-emerald-500/30'
                }
                hover:bg-white dark:hover:bg-[#0a0a0a]/90`}>
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform 
                    ${isPurple
                      ? 'bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20'
                      : 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20'
                    }`}>
                    <IconComponent className={`w-6 h-6 ${isPurple ? 'text-purple-600 dark:text-purple-400' : 'text-emerald-600 dark:text-emerald-400'}`} />
                  </div>
                  <div className="text-xs font-mono text-gray-500 dark:text-gray-600 border border-gray-200 dark:border-white/5 px-2 py-1 rounded-md bg-gray-50 dark:bg-black/40 tracking-widest uppercase">
                    Blok {block.id}
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 font-display uppercase leading-tight break-words hyphens-auto">
                  {block.title.replace(/Blok \d+: /, "")}
                </h3>

                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-light leading-relaxed line-clamp-2">
                  {block.description}
                </p>

                <div className={`mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest font-mono ${isPurple ? 'text-purple-600 dark:text-purple-500' : 'text-emerald-600 dark:text-emerald-500'}`}>
                  Spustit test <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WelcomeScreen;
