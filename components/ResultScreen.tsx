
import React from 'react';
import { ArrowLeft, RotateCcw, ShieldCheck, ShieldAlert, Award, Activity } from 'lucide-react';

interface Props {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onBackToMenu: () => void;
}

const ResultScreen: React.FC<Props> = ({ score, totalQuestions, onRestart, onBackToMenu }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let title = "";
  let message = "";
  let colorClass = "";
  let borderColor = "";
  let gradientColor = "";
  let Icon = Activity;

  if (percentage === 100) {
    title = "EXPERTNÍ ÚROVEŇ";
    message = "Vaše znalosti jsou neprůstřelné. Systém je plně zabezpečen.";
    colorClass = "text-green-400";
    borderColor = "border-green-500/50";
    gradientColor = "green";
    Icon = Award;
  } else if (percentage >= 80) {
    title = "VYSOKÁ ÚROVEŇ";
    message = "Máte silné základy, ale existují drobné mezery v obraně.";
    colorClass = "text-cyan-400";
    borderColor = "border-cyan-500/50";
    gradientColor = "cyan";
    Icon = ShieldCheck;
  } else if (percentage >= 50) {
    title = "STŘEDNÍ RIZIKO";
    message = "Rozumíte základům, ale v kritických situacích byste mohli zaváhat.";
    colorClass = "text-yellow-400";
    borderColor = "border-yellow-500/50";
    gradientColor = "yellow";
    Icon = ShieldAlert;
  } else {
    title = "KRITICKÉ RIZIKO";
    message = "Vaše znalosti vyžadují okamžitou aktualizaci. Doporučujeme opakování.";
    colorClass = "text-red-500";
    borderColor = "border-red-500/50";
    gradientColor = "red";
    Icon = ShieldAlert;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 min-h-screen flex flex-col items-center justify-center text-center relative z-10">
      
      <div className="relative w-full transition-all duration-500 animate-fade-in-up">
        {/* Animated Border Gradient based on result */}
        <div className={`absolute inset-0 bg-gradient-to-r from-${gradientColor}-500/0 via-${gradientColor}-500/30 to-blue-600/0 rounded-3xl opacity-50 blur-sm`}></div>

        <div className="glass-panel w-full p-6 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 relative overflow-hidden bg-[#050505]/90 backdrop-blur-2xl">
          
          {/* Top Decorative Line */}
          <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-${gradientColor}-500/50 to-transparent`}></div>

          {/* Decorative background blurs */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-${gradientColor}-500/10 rounded-full blur-[60px] md:blur-[80px] pointer-events-none`}></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-black/50 border ${borderColor} flex items-center justify-center mb-6 md:mb-8 shadow-[0_0_30px_rgba(0,0,0,0.3)]`}>
              <Icon className={`w-8 h-8 md:w-10 md:h-10 ${colorClass}`} />
            </div>

            <h2 className="text-[10px] md:text-sm font-mono text-gray-500 mb-2 tracking-widest uppercase">VÝSLEDEK AUDITU</h2>
            <h1 className={`text-2xl md:text-5xl font-display font-bold text-white mb-3 md:mb-4 uppercase`}>{title}</h1>
            <p className="text-sm md:text-base text-gray-400 mb-8 md:mb-10 max-w-md leading-relaxed">
              {message}
            </p>

            <div className="flex items-end justify-center gap-2 mb-8 md:mb-12">
              <span className={`text-6xl md:text-7xl font-bold font-mono ${colorClass} leading-none tracking-tighter drop-shadow-lg`}>
                {percentage}
              </span>
              <span className="text-xl md:text-2xl text-gray-500 font-light mb-2 font-mono">%</span>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 w-full mb-6 md:mb-8">
               <div className="bg-white/5 border border-white/5 rounded-xl p-3 md:p-4">
                  <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider mb-1 font-mono">Správně</div>
                  <div className="text-xl md:text-2xl font-bold text-white font-mono">{score}</div>
               </div>
               <div className="bg-white/5 border border-white/5 rounded-xl p-3 md:p-4">
                  <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider mb-1 font-mono">Celkem</div>
                  <div className="text-xl md:text-2xl font-bold text-white font-mono">{totalQuestions}</div>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full">
              <button
                onClick={onRestart}
                className="flex-1 bg-white text-black hover:bg-cyan-50 py-3 md:py-4 rounded-full font-bold text-xs md:text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 font-display uppercase"
              >
                <RotateCcw className="w-4 h-4" /> OPAKOVAT TEST
              </button>
              <button
                onClick={onBackToMenu}
                className="flex-1 bg-transparent hover:bg-white/5 text-gray-300 border border-white/20 py-3 md:py-4 rounded-full font-bold text-xs md:text-sm tracking-wide transition-all flex items-center justify-center gap-2 font-display uppercase"
              >
                <ArrowLeft className="w-4 h-4" /> ZPĚT DO MENU
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
