
import React, { useState } from 'react';
import { Shield, Bot, Lock, ArrowRight, LogOut, UserCircle, AlertTriangle } from 'lucide-react';
import { UserProfile } from '../types';

interface Props {
  onNavigate: (module: 'cyber' | 'ai') => void;
  userProfile: UserProfile | null;
  onLogout: () => void;
}

const Dashboard: React.FC<Props> = ({ onNavigate, userProfile, onLogout }) => {
  const [shakeAi, setShakeAi] = useState(false);
  const [shakeCyber, setShakeCyber] = useState(false);

  const hasCyberAccess = userProfile?.access_cyber || userProfile?.is_admin;
  const hasAiAccess = userProfile?.access_ai || userProfile?.is_admin;

  const handleCyberClick = () => {
    if (hasCyberAccess) {
      onNavigate('cyber');
    } else {
      setShakeCyber(true);
      setTimeout(() => setShakeCyber(false), 500);
    }
  };

  const handleAiClick = () => {
    if (hasAiAccess) {
      onNavigate('ai');
    } else {
      setShakeAi(true);
      setTimeout(() => setShakeAi(false), 500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 relative z-10 flex flex-col items-center justify-center min-h-screen">

      {/* Top User Bar */}
      <div className="absolute top-6 right-6 flex items-center gap-4 animate-fade-in-up">
        <div className="flex items-center gap-3 text-right">
          <div className="flex flex-col">
            <span className="text-white text-xs font-bold font-display uppercase tracking-wider">{userProfile?.email}</span>
            <span className="text-gray-500 text-[9px] font-mono tracking-widest uppercase">
              {userProfile?.is_admin ? "System Admin" : "Authorized Student"}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
            <UserCircle className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <button
          onClick={onLogout}
          className="p-2.5 bg-red-500/5 hover:bg-red-500/15 text-red-500/70 hover:text-red-400 rounded-lg border border-red-500/10 transition-all"
          title="Odhlásit se"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Maintenance Notice */}
      <div className="w-full max-w-4xl mb-12 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 md:p-5 flex items-center gap-4 md:gap-6 backdrop-blur-md shadow-[0_0_30px_rgba(245,158,11,0.05)]">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 border border-amber-500/20 animate-pulse">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-amber-500 text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-1">Systémové upozornění</span>
            <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
              <span className="text-white font-medium">Na platformě aktuálně probíhají vývojové práce.</span> Některé funkce, testy nebo vzdělávací materiály mohou být dočasně nedostupné nebo v procesu aktualizace. Děkujeme za pochopení.
            </p>
          </div>
        </div>
      </div>

      <header className="text-center mb-16 animate-fade-in-up w-full">
        <h1 className="text-4xl md:text-7xl font-display text-white mb-6 tracking-tight uppercase leading-none">
          Hlavní <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">rozcestník</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
          Zvolte modul pro pokračování ve studiu.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">

        {/* Cybersecurity Module */}
        <button
          onClick={handleCyberClick}
          className={`group relative min-h-[320px] animate-fade-in-up text-left ${!hasCyberAccess ? 'cursor-not-allowed opacity-60 ' + (shakeCyber ? 'animate-shake' : '') : ''}`}
          style={{ animationDelay: '150ms' }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${hasCyberAccess ? 'from-cyan-500/10 via-transparent to-blue-600/5' : 'from-gray-500/5 to-transparent'} rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}></div>

          <div className={`relative h-full bg-[#0a0a0a]/60 backdrop-blur-xl border ${hasCyberAccess ? 'border-white/10 group-hover:border-cyan-500/30' : 'border-white/5'} rounded-3xl p-8 md:p-10 overflow-hidden flex flex-col justify-between transition-all duration-300`}>
            {!hasCyberAccess && (
              <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center backdrop-blur-[2px]">
                <div className="bg-black/80 border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                  <Lock className="w-3 h-3" /> Přístup odepřen
                </div>
              </div>
            )}

            <div className="relative z-10">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border mb-6 transition-all duration-500 ${hasCyberAccess ? 'bg-cyan-500/10 border-cyan-500/20 group-hover:scale-110 shadow-lg shadow-cyan-500/5' : 'bg-white/5 border-white/10'}`}>
                <Shield className={`w-7 h-7 ${hasCyberAccess ? 'text-cyan-400' : 'text-gray-600'}`} />
              </div>
              <h2 className={`text-2xl md:text-3xl font-display mb-3 uppercase tracking-tight break-words hyphens-auto ${hasCyberAccess ? 'text-white' : 'text-gray-600'}`}>Kyberbezpečnost</h2>
              <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed line-clamp-3">
                Kompletní průvodce digitální obranou. Kvízy, ochrana dat a prevence moderních útoků.
              </p>
            </div>

            <div className={`relative z-10 flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase mt-8 font-mono ${hasCyberAccess ? 'text-cyan-400' : 'text-gray-700'}`}>
              {hasCyberAccess ? (
                <>Spustit modul <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
              ) : (
                <>Vyžaduje aktivaci</>
              )}
            </div>
          </div>
        </button>

        {/* AI Module */}
        <button
          onClick={handleAiClick}
          className={`group relative min-h-[320px] animate-fade-in-up text-left ${!hasAiAccess ? 'cursor-not-allowed opacity-60 ' + (shakeAi ? 'animate-shake' : '') : ''}`}
          style={{ animationDelay: '250ms' }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${hasAiAccess ? 'from-purple-500/10 via-transparent to-pink-600/5' : 'from-gray-500/5 to-transparent'} rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}></div>

          <div className={`relative h-full bg-[#0a0a0a]/60 backdrop-blur-xl border rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-300 ${!hasAiAccess ? 'border-white/5' : 'border-white/10 group-hover:border-purple-500/30'}`}>
            {!hasAiAccess && (
              <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center backdrop-blur-[2px]">
                <div className="bg-black/80 border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                  <Lock className="w-3 h-3" /> Uzamčeno
                </div>
              </div>
            )}

            <div className={`relative z-10 transition-opacity ${hasAiAccess ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border mb-6 transition-all duration-500 ${hasAiAccess ? 'bg-purple-500/10 border-purple-500/20 shadow-lg shadow-purple-500/5' : 'bg-white/5 border-white/10'}`}>
                <Bot className={`w-7 h-7 ${hasAiAccess ? 'text-purple-400' : 'text-white'}`} />
              </div>
              <h2 className="text-2xl md:text-3xl font-display text-white mb-3 uppercase tracking-tight">Umělá Inteligence</h2>
              <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed line-clamp-3">
                Pokročilé moduly pro práci s AI nástroji. Automatizace, LLM modely a praktické promptování.
              </p>
            </div>

            <div className={`relative z-10 flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase mt-8 font-mono ${hasAiAccess ? 'text-purple-400' : 'text-gray-700'}`}>
              {hasAiAccess ? (
                <>Spustit modul <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
              ) : (
                <>Nedostupné</>
              )}
            </div>
          </div>
        </button>

      </div>
    </div>
  );
};

export default Dashboard;
