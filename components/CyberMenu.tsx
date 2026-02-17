
import React, { Suspense } from 'react';
import { ArrowLeft, BrainCircuit, Presentation, ArrowRight, ClipboardList, PlayCircle, ShieldAlert, Newspaper, ArrowUp, Shield } from 'lucide-react';
import { courseData, cyberVideos } from '../data';

interface Props {
  onNavigate: (view: 'quizzes' | 'presentations' | 'practical_exercises' | 'videos' | 'security_scanner' | 'cyber_news') => void;
  onBack: () => void;
  onSelectPresentation: (id: number) => void;
}
const CyberNews = React.lazy(() => import('./CyberNews'));
const SecurityScanner = React.lazy(() => import('./SecurityScanner'));
const AuditScreen = React.lazy(() => import('./AuditScreen'));
const PresentationScreen = React.lazy(() => import('./PresentationScreen'));
const VideoScreen = React.lazy(() => import('./VideoScreen'));
const QuizSectionWrapper = React.lazy(() => import('./QuizSectionWrapper'));
const CyberGuardian = React.lazy(() => import('./CyberGuardian'));

const CyberMenu: React.FC<Props> = ({ onNavigate, onBack, onSelectPresentation }) => {
  // Sticky Nav State
  const [isSticky, setIsSticky] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string | null>(null);



  // Refs for scrolling
  const newsRef = React.useRef<HTMLDivElement>(null);
  const labRef = React.useRef<HTMLDivElement>(null);
  const auditRef = React.useRef<HTMLDivElement>(null);
  const presentationsRef = React.useRef<HTMLDivElement>(null);
  const videosRef = React.useRef<HTMLDivElement>(null);
  const quizRef = React.useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const sections = [
    { id: 'cyber_news', title: 'Kyber Zprávy', desc: 'Integrovaný AI agent, který pro vás nepřetržitě monitoruje digitální svět. Vyhledává bezpečnostní incidenty, analyzuje nové trojské koně a přináší kontext k aktuálním hrozbám z domova i ze světa.', icon: Newspaper, color: 'amber', ref: newsRef, Component: CyberNews, props: {} },
    { id: 'security_scanner', title: 'Bezpečnostní Lab', desc: 'Bezpečnostní laboratoř pro analýzu vaší digitální stopy. Otestujte sílu svých hesel, zjistěte, zda váš email nefiguruje v únicích dat, a prověřte podezřelé odkazy v bezpečném prostředí.', icon: ShieldAlert, color: 'rose', ref: labRef, Component: SecurityScanner, props: {} },
    { id: 'practical_exercises', title: 'Audit', desc: 'Váš osobní AI bezpečnostní asistent. Provede vás zabezpečením PC, telefonu i domácí sítě krok za krokem. Zelená znamená bezpečí, červená vyžaduje vaši pozornost.', icon: ClipboardList, color: 'pink', ref: auditRef, Component: AuditScreen, props: {} },
    { id: 'presentations', title: 'Prezentace', desc: 'Digitální archiv vašeho školení. Původní slidy, grafy a klíčové myšlenky vždy po ruce pro rychlé oživení paměti.', icon: Presentation, color: 'purple', ref: presentationsRef, Component: PresentationScreen, props: { blocks: courseData, onSelectBlock: onSelectPresentation } },
    { id: 'videos', title: 'Videa', desc: 'Multimediální knihovna s hlubším vhledem do problematiky. Video návody a detailní rozbory konkrétních útoků.', icon: PlayCircle, color: 'cyan', ref: videosRef, Component: VideoScreen, props: { videos: cyberVideos } },
    { id: 'quizzes', title: 'Kvízy', desc: 'Tréninkové centrum. Ověřte si své znalosti v interaktivních testech, získejte okamžitou zpětnou vazbu a sledujte svůj pokrok.', icon: BrainCircuit, color: 'emerald', ref: quizRef, Component: QuizSectionWrapper, props: {} },
  ];


  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 400);

      // Active section detection
      let current = null;
      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
      {/* Sticky Navigation */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300 transform ${isSticky ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
              <Newspaper className="w-5 h-5 text-amber-500" />
            </div>
            <span className="font-display font-bold text-white uppercase tracking-tight hidden md:block">CyberSec <span className="text-amber-500">Hub</span></span>
          </div>

          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto no-scrollbar mask-grad-x flex-1 justify-center px-4">
            {sections.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.ref)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all hover:bg-white/10 flex items-center gap-2 whitespace-nowrap ${activeSection === item.id ? `bg-${item.color}-500/10 text-${item.color}-400 border border-${item.color}-500/20` : 'text-gray-400 hover:text-white border border-transparent'
                  }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden lg:inline">{item.title}</span>
              </button>
            ))}
          </div>

          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all border border-white/5 group" title="Zpět">
            <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
      {/* Back Button (Fixed or Top) */}
      <button
        onClick={onBack}
        className="mb-12 text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-3 text-xs font-bold tracking-widest uppercase group animate-fade-in-up font-mono"
      >
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/30 transition-all">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span>Zpět na rozcestník</span>
      </button>

      {/* HERO SECTION - Menu */}
      <header className="mb-16 animate-fade-in-up text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 uppercase tracking-tight">
          KYBER <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">BEZPEČNOST</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl leading-relaxed mb-6">
          Vítejte v zóně pro absolventy! Tento prostor slouží jako vaše <strong>celoživotní vzdělávací platforma</strong>.
          Najdete zde kompletní materiály ze školení, interaktivní nástroje pro audit vaší bezpečnosti a novinky z kyber světa.
        </p>
        <div className="p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-xl max-w-3xl inline-block text-left">
          <p className="text-emerald-400 flex items-start gap-3 text-sm md:text-base">
            <Shield className="w-5 h-5 flex-shrink-0 mt-0.5 animate-pulse" />
            <span>
              <strong>NOVINKA:</strong> Pro rychlou pomoc jsme integrovali <strong>AI Cyber Guardiana</strong>.
              Najdete ho vpravo dole (ikona štítu). Je to váš osobní asistent specializovaný na
              český zákon o kybernetické bezpečnosti a směrnici NIS2.
            </span>
          </p>
        </div>
      </header>

      {/* Menu Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up mb-32" style={{ animationDelay: '200ms' }}>
        {sections.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.ref)}
            className="group relative p-1 rounded-3xl text-left transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-${item.color}-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity`}></div>
            <div className="relative h-full bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden flex flex-col min-h-[220px]">
              <div className="flex items-start justify-between mb-6">
                <div className={`bg-${item.color}-500/10 p-4 rounded-2xl border border-${item.color}-500/20 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors rotate-90 md:rotate-0" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display uppercase tracking-tight">{item.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* CONTENT SECTIONS */}
      <div className="space-y-32">
        {sections.map((item) => (
          <div key={item.id} ref={item.ref} className="scroll-mt-24 min-h-[50vh] animate-on-scroll">
            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
              <div className={`p-3 rounded-xl bg-${item.color}-500/10 border border-${item.color}-500/20`}>
                <item.icon className={`w-6 h-6 text-${item.color}-400`} />
              </div>
              <h2 className="text-3xl md:text-4xl font-display text-white uppercase tracking-tight">{item.title}</h2>
            </div>
            <p className="text-gray-400 text-lg mb-8 max-w-4xl leading-relaxed font-light border-l-2 border-white/10 pl-6">
              {item.desc}
            </p>

            <div className="bg-[#0a0a0a]/40 border border-white/5 rounded-3xl p-1 md:p-6 shadow-2xl">
              <Suspense fallback={<div className="p-12 text-center text-gray-500">Načítám modul...</div>}>
                <item.Component
                  onBack={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  // @ts-ignore
                  onNavigate={() => { }}
                  {...item.props}
                />
              </Suspense>
            </div>
          </div>
        ))}
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-md border border-white/10 shadow-2xl z-50 transition-all opacity-50 hover:opacity-100"
        title="Nahoru"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Cyber Guardian Chatbot */}
      <Suspense fallback={null}>
        <CyberGuardian />
      </Suspense>

    </div>
  );
};

export default CyberMenu;
