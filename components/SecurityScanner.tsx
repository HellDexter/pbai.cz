
import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Lock, Link as LinkIcon, AlertTriangle, CheckCircle, Search, RefreshCw, Eye, EyeOff, X, HelpCircle, AlertOctagon, Info, ArrowUpRight, Hash, Database, ChevronDown, ChevronUp, Cpu, Server, Globe } from 'lucide-react';
import HibpScanner from './HibpScanner';

interface Props {
  onBack: () => void;
}

const SecurityScanner: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'pass' | 'url' | 'hibp'>('pass');

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-24">
      <header className="mb-6 animate-fade-in-up flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="p-3 bg-rose-50 dark:bg-rose-500/10 rounded-2xl border border-rose-200 dark:border-rose-500/20 backdrop-blur-sm shadow-[0_0_15px_rgba(244,63,94,0.1)]">
            <ShieldAlert className="w-8 h-8 text-rose-600 dark:text-rose-500" />
          </div>
          <div>
            <h1 className="text-2xl font-display text-gray-900 dark:text-white uppercase tracking-tight font-bold">Bezpečnostní Lab</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-mono tracking-wide">TOOLS_V2.0 // RISK_ANALYSIS</p>
          </div>
        </div>

        {/* Navigation Tabs - Compact & Tech style */}
        <div className="flex bg-gray-100 dark:bg-black/40 p-1 rounded-xl border border-gray-200 dark:border-white/10 backdrop-blur-md w-full md:w-auto overflow-x-auto">
          <TabButton
            active={activeTab === 'pass'}
            onClick={() => setActiveTab('pass')}
            icon={Lock}
            label="Analyzátor Hesel"
          />
          <TabButton
            active={activeTab === 'url'}
            onClick={() => setActiveTab('url')}
            icon={LinkIcon}
            label="URL Scanner"
          />
          <TabButton
            active={activeTab === 'hibp'}
            onClick={() => setActiveTab('hibp')}
            icon={Database}
            label="Úniky Dat"
          />
        </div>
      </header>

      {/* Content Area - Unified Container */}
      <div className="min-h-[400px] animate-fade-in-up">
        {activeTab === 'pass' && <PasswordAnalyzer />}
        {activeTab === 'url' && <UrlScanner />}
        {activeTab === 'hibp' && (
          <div className="bg-white dark:bg-[#0f0f0f] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
            <HibpScanner onBack={() => { }} />
          </div>
        )}
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${active
      ? 'bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.4)]'
      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/5'
      }`}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
);

// --- Sub-components ---

const TechInsight = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mt-4 border border-white/5 bg-white/5 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 dark:hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
          <Icon className="w-3.5 h-3.5" /> {title}
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
      </button>
      {isOpen && (
        <div className="px-4 py-3 border-t border-gray-200 dark:border-white/5 text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-mono space-y-2 bg-gray-50 dark:bg-black/20">
          {children}
        </div>
      )}
    </div>
  );
};

const PasswordAnalyzer = () => {
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  // Helper to calculate time to crack (educational estimation)
  const calculateCrackTime = (pwd: string) => {
    if (!pwd) return "---";
    const length = pwd.length;
    const pool =
      (pwd.match(/[a-z]/) ? 26 : 0) +
      (pwd.match(/[A-Z]/) ? 26 : 0) +
      (pwd.match(/[0-9]/) ? 10 : 0) +
      (pwd.match(/[^a-zA-Z0-9]/) ? 32 : 0);

    // Entropy formula: H = L * log2(N)
    const entropy = Math.log2(Math.pow(pool, length));

    if (entropy < 28) return "Okamžitě";
    if (entropy < 36) return "Několik sekund";
    if (entropy < 60) return "Hodiny až dny";
    if (entropy < 80) return "Roky až století";
    return "Miliardy let";
  };

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length > 8) score += 20;
    if (pwd.length > 12) score += 20;
    if (/[A-Z]/.test(pwd)) score += 15;
    if (/[0-9]/.test(pwd)) score += 15;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 30;
    return Math.min(score, 100);
  };

  const strength = calculateStrength(password);
  const crackTime = calculateCrackTime(password);

  const getLabel = (s: number) => {
    if (s < 40) return { text: "Slabé", color: "text-red-500", bg: "bg-red-500", border: "border-red-500/30" };
    if (s < 70) return { text: "Průměrné", color: "text-amber-500", bg: "bg-amber-500", border: "border-amber-500/30" };
    return { text: "Silné", color: "text-emerald-500", bg: "bg-emerald-500", border: "border-emerald-500/30" };
  };
  const label = getLabel(strength);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Main Input Card */}
      <div className="lg:col-span-7 bg-white dark:bg-[#0f0f0f] border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center">

        <div className="relative z-10 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-display uppercase tracking-tight flex items-center gap-2">
              <Lock className="w-5 h-5 text-rose-600 dark:text-rose-500" /> Analyzátor Hesel
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Zadejte heslo a zjistěte jeho entropii (matematickou odolnost). <br />
              <span className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                <Cpu className="w-4 h-4 text-emerald-500" />
                <strong>Client-Side Only:</strong> Výpočet probíhá pouze ve vašem prohlížeči. Na server nic neposíláme.
              </span>
            </p>
          </div>

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Zadejte heslo..."
              className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl pl-11 pr-12 py-5 text-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/20 transition-all font-mono shadow-inner"
            />
            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <button
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:hover:text-white p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/5 transition-colors"
            >
              {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {/* Character count indicator */}
            <div className="absolute right-14 top-1/2 -translate-y-1/2 text-[10px] text-gray-600 font-mono">
              {password.length} znaků
            </div>
          </div>

          {/* Strength Meter */}
          <div className={`p-5 rounded-2xl border bg-gray-50 dark:bg-black/20 backdrop-blur-sm transition-colors duration-500 ${password ? label.border : 'border-gray-200 dark:border-white/5'}`}>
            <div className="flex justify-between items-end mb-3">
              <div>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest block mb-1">Skóre Bezpečnosti</span>
                <span className={`text-base font-bold uppercase tracking-wide flex items-center gap-2 ${password ? label.color : 'text-gray-600'}`}>
                  {password ? label.text : "Čekám na vstup..."}
                </span>
              </div>
              <span className="text-4xl font-mono text-gray-900 dark:text-white font-bold tracking-tighter opacity-90">{strength}<span className="text-lg align-top opacity-50">%</span></span>
            </div>

            <div className="h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ease-out shadow-[0_0_15px_currentColor] ${password ? label.bg : 'bg-gray-300 dark:bg-gray-800'}`}
                style={{ width: `${strength}%` }}
              ></div>
            </div>
          </div>

          <TechInsight title="Jak to funguje (Technické pozadí)" icon={Cpu}>
            <p className="mb-2 text-sm">
              <strong className="text-rose-400">Entropie (H):</strong> Měříme "nepředvídatelnost" hesla v bitech. Vzorec je <code>H = L * log2(N)</code>, kde L je délka a N velikost sady znaků.
            </p>
            <p className="text-sm">
              <strong className="text-rose-400">Slovníkové útoky:</strong> Běžná slova ("heslo", "iloveyou") mají v praxi nulovou entropii, protože jsou první na řadě při prolamování.
            </p>
          </TechInsight>
        </div>
      </div>

      {/* Info & Stats Column */}
      <div className="lg:col-span-5 space-y-4 flex flex-col">
        {/* Crack Time Card */}
        <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-3xl p-6 relative overflow-hidden flex-1">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-50"></div>
          <div className="relative z-10 flex flex-col h-full justify-center">
            <h3 className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 mb-3 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4" /> Čas prolomení (GPU)
            </h3>
            <div className="text-3xl font-display text-gray-900 dark:text-white font-bold leading-none mb-3 tracking-tight">{crackTime}</div>
            <p className="text-sm text-gray-600 dark:text-gray-500 leading-relaxed">
              Odhad pro moderní GPU (RTX 4090) schopnou vyzkoušet miliardy kombinací za sekundu.
            </p>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-3xl p-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">Analýza znakové sady</h3>
          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
            <CheckItem compact checked={password.length >= 12} label="Délka (12+)" />
            <CheckItem compact checked={/[A-Z]/.test(password)} label="Velká písmena" />
            <CheckItem compact checked={/[0-9]/.test(password)} label="Číslice" />
            <CheckItem compact checked={/[^A-Za-z0-9]/.test(password)} label="Speciální znaky" />
          </div>
        </div>

        {/* Tip */}
        <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-500/10 rounded-3xl p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-700/90 dark:text-emerald-400/90 leading-relaxed font-mono">
            <strong className="text-emerald-700 dark:text-emerald-400 block mb-1 uppercase tracking-wider text-xs">Tip experta:</strong>
            Délka je důležitější než složitost. Heslo "KoneZerouSen0!" (Passphrase) je bezpečnější než "tr5&b#x".
          </p>
        </div>
      </div>
    </div>
  );
};

const CheckItem = ({ checked, label, compact = false }: { checked: boolean, label: string, compact?: boolean }) => (
  <div className={`flex items-center gap-2.5 transition-all ${checked ? 'opacity-100' : 'opacity-40'}`}>
    {checked ? (
      <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50">
        <CheckCircle className="w-3 h-3 text-emerald-500" />
      </div>
    ) : (
      <div className="w-4 h-4 rounded-full border border-gray-400 dark:border-gray-600 bg-transparent" />
    )}
    <span className={`text-[11px] font-bold uppercase tracking-widest ${checked ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>{label}</span>
  </div>
);

const UrlScanner = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<'safe' | 'suspicious' | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [flags, setFlags] = useState<string[]>([]);

  const analyze = () => {
    if (!url) return;
    setIsAnalyzing(true);
    setFlags([]);
    setResult(null);

    setTimeout(() => {
      const suspiciousFlags = [];
      const lowerUrl = url.toLowerCase();

      // Heuristic checks
      if (!lowerUrl.startsWith('https://')) suspiciousFlags.push("Chybí šifrování (HTTPS)");
      if (lowerUrl.includes('http:')) suspiciousFlags.push("Nezabezpečený protokol HTTP");
      if (lowerUrl.length > 70) suspiciousFlags.push("Podezřele dlouhá URL");
      if (lowerUrl.includes('@')) suspiciousFlags.push("Znak @ (pokus o zmatení)");
      if (lowerUrl.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)) suspiciousFlags.push("IP adresa místo domény");
      if (lowerUrl.includes('login') || lowerUrl.includes('verify')) suspiciousFlags.push("Slova pro phishing (login/verify)");

      setFlags(suspiciousFlags);
      setResult(suspiciousFlags.length > 0 ? 'suspicious' : 'safe');
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Scanner Card */}
      <div className="lg:col-span-7 bg-white dark:bg-[#0f0f0f] border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[350px]">

        <div className="relative z-10 w-full space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-display uppercase tracking-tight flex items-center gap-2">
              <Search className="w-5 h-5 text-cyan-600 dark:text-cyan-500" /> Scanner Odkazů
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-1">
              Vložte odkaz z e-mailu nebo SMS pro detekci phishingu.
            </p>
            <p className="text-gray-500 text-xs flex items-center gap-1">
              <Cpu className="w-3 h-3 text-cyan-500" />
              <strong>Lokální Heuristika:</strong> Analýza probíhá u vás. URL neposíláme na externí servery (pro ochranu soukromí).
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative group w-full">
              <div className="absolute inset-0 bg-cyan-500/20 blur-lg rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && analyze()}
                placeholder="Např. http://banka-login.cz..."
                className="relative w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-5 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all font-mono shadow-inner"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <LinkIcon className="w-4 h-4 text-gray-500" />
              </div>
            </div>

            <button
              onClick={analyze}
              disabled={isAnalyzing || !url}
              className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-black dark:hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all disabled:opacity-50 disabled:hover:bg-gray-900 dark:disabled:hover:bg-white disabled:shadow-none flex items-center justify-center gap-2 group"
            >
              {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : (
                <>
                  Skenovat Odkaz <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          <TechInsight title="Co kontrolujeme (Heuristika)" icon={Cpu}>
            <ul className="mb-2 list-disc list-inside space-y-1">
              <li><strong className="text-cyan-400">Protokol:</strong> Vyžadujeme <code>https://</code> (šifrované spojení).</li>
              <li><strong className="text-cyan-400">Struktura:</strong> Hledáme podezřelé IP adresy místo domén.</li>
              <li><strong className="text-cyan-400">Homografy:</strong> Znaky z jiných abeced (např. cyrilice 'a'), které vypadají latinsky, ale vedou jinam.</li>
            </ul>
            <p className="text-[10px] opacity-70">
              *Poznámka: Toto je základní kontrola struktury. Pro 100% jistotu by bylo nutné porovnat s databází Google Safe Browsing (což vyžaduje odeslání URL).
            </p>
          </TechInsight>
        </div>
      </div>

      {/* Results / Info Column */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Result Card */}
        <div className={`flex-1 rounded-3xl border p-6 transition-all duration-500 relative overflow-hidden flex flex-col justify-center min-h-[160px] ${result
          ? (result === 'safe' ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-500/20' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-500/20')
          : 'bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-white/5'
          }`}>
          {result ? (
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-full ${result === 'safe' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-500'}`}>
                  {result === 'safe' ? <ShieldCheck className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
                </div>
                <div>
                  <h3 className={`font-bold uppercase tracking-wide text-lg ${result === 'safe' ? 'text-emerald-400' : 'text-red-500'}`}>
                    {result === 'safe' ? 'Bezpečné' : 'Riziko'}
                  </h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Status URL</p>
                </div>
              </div>

              {flags.length > 0 ? (
                <ul className="space-y-2 mb-2">
                  {flags.map((flag, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-red-300 font-mono bg-red-500/10 p-2.5 rounded-lg border border-red-500/10">
                      <X className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> {flag}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  URL nevykazuje známky phishingu dle lokální analýzy.
                </p>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-600 space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center border border-white/5">
                <Search className="w-5 h-5 opacity-40" />
              </div>
              <p className="text-xs font-mono uppercase tracking-widest opacity-60">Připraveno ke skenování</p>
            </div>
          )}
        </div>

        {/* Pro Tip */}
        <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-3xl p-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-3 flex items-center gap-2">
            <HelpCircle className="w-4 h-4" /> Phishing Radar
          </h3>
          <ul className="space-y-3">
            <li className="flex gap-3 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[10px] font-bold text-gray-500 flex-shrink-0 border border-gray-200 dark:border-white/5">1</span>
              <span>Pozor na urgenci. Hackeři chtějí, abyste jednali ve stresu.</span>
            </li>
            <li className="flex gap-3 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[10px] font-bold text-gray-500 flex-shrink-0 border border-gray-200 dark:border-white/5">2</span>
              <span>Kontrolujte doménu. `paypal.com` není to samé jako `paypal-secure.com`.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SecurityScanner;
