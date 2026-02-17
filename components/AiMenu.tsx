
import React from 'react';
import { ArrowLeft, BrainCircuit, Presentation, ArrowRight, Bot, PlayCircle } from 'lucide-react';

interface Props {
  onNavigate: (view: 'quizzes' | 'presentations' | 'videos') => void;
  onBack: () => void;
}

const AiMenu: React.FC<Props> = ({ onNavigate, onBack }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 relative z-10">

      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-12 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all duration-300 flex items-center gap-3 text-xs font-bold tracking-widest uppercase group animate-fade-in-up font-mono"
      >
        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:border-purple-500/30 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/10 transition-all">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </div>
        <span>Zpět na přehled modulů</span>
      </button>

      <header className="mb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-[10px] uppercase tracking-widest mb-6 backdrop-blur-sm font-mono">
          <Bot className="w-3 h-3" />
          Inteligentní systémy
        </div>
        <h1 className="text-xl sm:text-4xl md:text-5xl font-display text-gray-900 dark:text-white mb-4 uppercase break-words tracking-tighter md:tracking-normal">
          Umělá <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">inteligence</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg font-light max-w-2xl">
          Objevte svět generativní AI. Od základních principů LLM až po praktické video ukázky a interaktivní testování.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>

        {/* Quizzes Option */}
        <button
          onClick={() => onNavigate('quizzes')}
          className="group relative p-1 rounded-3xl text-left transition-all duration-500 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-pink-600/0 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>

          <div className="relative h-full bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-8 overflow-hidden hover:bg-gray-50 dark:hover:bg-[#0a0a0a]/90 transition-colors flex flex-col">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex items-start justify-between mb-8">
              <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-2xl border border-purple-200 dark:border-purple-500/20 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                <BrainCircuit className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-600 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-100 font-display uppercase">Kvízy</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              Interaktivní testování znalostí z 10 bloků o AI.
            </p>
            <div className="text-purple-600 dark:text-purple-500 text-[10px] font-mono uppercase tracking-widest mt-auto">Dostupné</div>
          </div>
        </button>

        {/* Presentations Option */}
        <button
          onClick={() => onNavigate('presentations')}
          className="group relative p-1 rounded-3xl text-left transition-all duration-500 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/30 to-rose-600/0 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>

          <div className="relative h-full bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-8 overflow-hidden hover:bg-gray-50 dark:hover:bg-[#0a0a0a]/90 transition-colors flex flex-col">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex items-start justify-between mb-8">
              <div className="bg-pink-50 dark:bg-pink-950/30 p-4 rounded-2xl border border-pink-200 dark:border-pink-500/20 group-hover:bg-pink-100 dark:group-hover:bg-pink-900/30 transition-colors">
                <Presentation className="w-8 h-8 text-pink-600 dark:text-pink-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-600 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-100 font-display uppercase">Prezentace</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              Kompletní výukové materiály pro všechny fáze AI kurzu.
            </p>
            <div className="text-pink-600 dark:text-pink-500 text-[10px] font-mono uppercase tracking-widest mt-auto">Dostupné</div>
          </div>
        </button>

        {/* Videos Option */}
        <button
          onClick={() => onNavigate('videos')}
          className="group relative p-1 rounded-3xl text-left transition-all duration-500 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-purple-600/0 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>

          <div className="relative h-full bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-8 overflow-hidden hover:bg-gray-50 dark:hover:bg-[#0a0a0a]/90 transition-colors flex flex-col">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex items-start justify-between mb-8">
              <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-500/20 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                <PlayCircle className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-100 font-display uppercase">Videa</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              Video lekce a názorné ukázky práce s AI nástroji.
            </p>
            <div className="text-indigo-600 dark:text-indigo-500 text-[10px] font-mono uppercase tracking-widest mt-auto">Nové</div>
          </div>
        </button>

      </div>
    </div>
  );
};

export default AiMenu;
