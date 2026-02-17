
import React from 'react';
import { ArrowLeft, BrainCircuit, Presentation, ArrowRight, ClipboardList, PlayCircle, ShieldAlert, Newspaper } from 'lucide-react';

interface Props {
  onNavigate: (view: 'quizzes' | 'presentations' | 'practical_exercises' | 'videos' | 'security_scanner' | 'cyber_news') => void;
  onBack: () => void;
}

const CyberMenu: React.FC<Props> = ({ onNavigate, onBack }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 relative z-10">

      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-12 text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-3 text-xs font-bold tracking-widest uppercase group animate-fade-in-up font-mono"
      >
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/30 transition-all">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span>Zpět na rozcestník</span>
      </button>

      <header className="mb-16 animate-fade-in-up">
        <h1 className="text-3xl md:text-6xl font-display text-white mb-6 uppercase tracking-tighter">
          Kyberbezpečnost
        </h1>
        <p className="text-gray-500 text-lg md:text-xl font-light max-w-3xl leading-relaxed">
          Zvolte formu studia. Testujte se, prohlížejte materiály nebo sledujte nejnovější bezpečnostní incidenty ze světa.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>

        {[
          { id: 'quizzes', title: 'Kvízy', desc: '9 interaktivních bloků pro testování znalostí.', icon: BrainCircuit, color: 'emerald' },
          { id: 'presentations', title: 'Prezentace', desc: 'Teoretické základy a materiály ke studiu.', icon: Presentation, color: 'purple' },
          { id: 'videos', title: 'Videa', desc: 'Video tutoriály a záznamy praktických lekcí.', icon: PlayCircle, color: 'cyan' },
          { id: 'practical_exercises', title: 'Audit', desc: 'Zkontrolujte si zabezpečení svého zařízení.', icon: ClipboardList, color: 'pink' },
          { id: 'security_scanner', title: 'Bezpečnostní Lab', desc: 'Skenery úniků dat a reputace podezřelých URL.', icon: ShieldAlert, color: 'rose' },
          { id: 'cyber_news', title: 'Kyber Zprávy', desc: 'Aktuální bezpečnostní novinky ze světa přeložené AI.', icon: Newspaper, color: 'amber' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as any)}
            className="group relative p-1 rounded-3xl text-left transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-${item.color}-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity`}></div>
            <div className="relative h-full bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden flex flex-col min-h-[220px]">
              <div className="flex items-start justify-between mb-6">
                <div className={`bg-${item.color}-500/10 p-4 rounded-2xl border border-${item.color}-500/20 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display uppercase tracking-tight">{item.title}</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed mb-4">{item.desc}</p>
            </div>
          </button>
        ))}

      </div>
    </div>
  );
};

export default CyberMenu;
