
import React, { useState, useEffect } from 'react';
// Fix: Added missing ArrowRight icon to the import list from lucide-react
import { ArrowLeft, ArrowRight, Newspaper, ExternalLink, RefreshCw, Globe, Sparkles, MapPin, Flag, Key, Info, CheckCircle, ShieldAlert, Settings, CreditCard, AlertCircle, Languages } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Props {
  onBack: () => void;
}

interface Article {
  region: 'domestic' | 'world';
  title: string;
  description: string;
  full_content: string; // New field for detailed content
  url: string;
  source: string;
  date: string;
  category: string;
}

const CyberNews: React.FC<Props> = ({ onBack }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [groundingUrls, setGroundingUrls] = useState<{ title: string, uri: string }[]>([]);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const [needsKeySelection, setNeedsKeySelection] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null); // State for modal

  const handleOpenKeyDialog = async () => {
    try {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setNeedsKeySelection(false);
      // Small delay to let the key inject
      setTimeout(fetchNewsWithAI, 1000);
    } catch (err) {
      console.error("Failed to open key dialog:", err);
    }
  };

  const fetchNewsWithAI = async () => {
    // Check if key is available in environment
    if (!process.env.API_KEY) {
      setNeedsKeySelection(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setDebugInfo(null);
    setArticles([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{
          role: 'user',
          parts: [{
            text: "Najdi 3 nejnovější zprávy o kybernetické bezpečnosti z českých webů: 'nukib.gov.cz' (sekce infoservis/aktuality), 'csirt.cz' nebo 'root.cz/rubriky/bezpecnost' a označ je jako 'domestic'. " +
              "Dále najdi 3 nejnovější články ze světových webů: 'TheHackerNews.com', 'BleepingComputer.com' nebo 'DarkReading.com' a označ je jako 'world'. " +
              "ZÁSADNÍ: Hledej pouze zprávy s datem z posledních 7 dní! Pokud zprávu nemůžeš datovat do tohoto týdne, nepoužívej ji. " +
              "Ignoruj datum svého trénování, řiď se datumem z vyhledávání Google. " +
              "Pro každou zprávu vrať JSON objekt s těmito přesnými klíči: " +
              "'region' (domestic/world), 'title' (název česky), 'description' (krátké shrnutí česky max 1 věta), 'full_content' (detailní popis zprávy česky, alespoň 2-3 odstavce, vysvětlení souvislostí), 'source' (zdroj např: NÚKIB, CSIRT, Root.cz...), 'url' (PŘESNÁ URL adresa nalezeného článku), 'date' (datum vydání článku, např. '17. 2. 2026'), 'category' (kategorie česky). " +
              "Odpověz POUZE validním JSON polem objektů. Žádný markdown, žádný text okolo."
          }]
        }],
        config: {
          tools: [{ googleSearch: {} }],
        }
      });

      const text = response.text || "";

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      console.log("Grounding Metadata:", response.candidates?.[0]?.groundingMetadata); // DEBUG
      if (chunks) {
        const urls = chunks
          .filter((chunk: any) => chunk.web)
          .map((chunk: any) => ({
            title: chunk.web.title,
            uri: chunk.web.uri
          }));
        console.log("Found Grounding URLs:", urls); // DEBUG
        setGroundingUrls(urls);
      }

      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsedArticles = JSON.parse(jsonMatch[0]);
        setArticles(parsedArticles);
      } else {
        throw new Error("Invalid format from model");
      }

    } catch (err: any) {
      console.error("News AI Error:", err);
      const msg = err.message || "";

      if (msg.includes("API Key") || msg.includes("not set")) {
        setNeedsKeySelection(true);
      } else if (msg.includes("403") || msg.includes("permission") || msg.includes("not found")) {
        setError(`Chyba API: ${msg}`); // Zobrazíme skutečnou chybu pro debug
        setDebugInfo(msg); // Zobrazíme detail chyby
      } else {
        setError("Chyba při propojování s internetem");
        setDebugInfo(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsWithAI();
  }, []);

  const domesticArticles = articles.filter(a => a.region === 'domestic');
  const worldArticles = articles.filter(a => a.region === 'world');

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 relative z-10 min-h-screen">
      <button onClick={onBack} className="mb-10 text-gray-500 hover:text-white transition-all flex items-center gap-3 text-xs font-bold tracking-widest uppercase font-mono group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Zpět do menu
      </button>

      <header className="mb-12 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 text-[10px] uppercase tracking-widest font-mono">
            <Sparkles className="w-3 h-3" /> Live Analysis Active
          </div>
          <button
            onClick={fetchNewsWithAI}
            disabled={isLoading}
            className="text-gray-500 hover:text-white transition-colors p-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <h1 className="text-3xl md:text-5xl font-display text-white mb-4 uppercase tracking-tighter leading-none">
          Kyber <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Zpravodaj</span>
        </h1>
        <p className="text-gray-400 font-light max-w-2xl leading-relaxed">
          Prohledáváme světové databáze incidentů pomocí <strong>Gemini AI</strong>. Monitorujeme hrozby v reálném čase.
        </p>
      </header>

      {needsKeySelection ? (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-[2.5rem] p-12 text-center max-w-2xl mx-auto animate-fade-in-up">
          <div className="w-20 h-20 bg-amber-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-amber-500/30">
            <Key className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-2xl font-display text-white mb-4 uppercase">Klíč nenalezen</h2>
          <p className="text-gray-500 text-sm mb-10 leading-relaxed">
            V tomto prohlížeči nebyl detekován platný API klíč. Pro živé hledání je nutné vybrat klíč z projektu se zapnutým Billingem.
          </p>
          <button
            onClick={handleOpenKeyDialog}
            className="bg-white text-black px-12 py-5 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-amber-50 transition-all flex items-center gap-3 mx-auto"
          >
            Vybrat API klíč <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="relative w-24 h-24 mb-10">
            <div className="absolute inset-0 border-2 border-amber-500/10 rounded-full"></div>
            <div className="absolute inset-0 border-t-2 border-amber-500 rounded-full animate-spin"></div>
            <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-amber-500/40 animate-pulse" />
          </div>
          <p className="text-amber-500 font-mono text-[10px] uppercase tracking-[0.4em] animate-pulse text-center">
            Skenuji globální incidenty...
          </p>
        </div>
      ) : error ? (
        <div className="animate-fade-in-up space-y-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-[2.5rem] p-12 text-center max-w-2xl mx-auto shadow-2xl">
            <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-6" />
            <h2 className="text-xl font-display text-white mb-2 uppercase">{error}</h2>
            <p className="text-gray-500 text-sm mb-10 max-w-md mx-auto leading-relaxed uppercase font-mono">{debugInfo}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={fetchNewsWithAI} className="bg-white text-black px-8 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg">Zkusit znovu</button>
              <button onClick={handleOpenKeyDialog} className="bg-white/10 text-white border border-white/10 px-8 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-white/20 transition-colors">Změnit klíč</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-20 pb-20">
          <section className="animate-fade-in-up">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"><MapPin className="w-6 h-6 text-amber-500" /></div>
              <h2 className="text-2xl font-display text-white uppercase tracking-tight">Incidenty v ČR</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {domesticArticles.length > 0 ? domesticArticles.map((a, i) => <ArticleCard key={i} article={a} idx={i} onClick={() => setSelectedArticle(a)} />) : <div className="col-span-full p-16 border border-dashed border-white/5 rounded-3xl text-center text-gray-600 font-mono text-xs uppercase tracking-widest">Žádné zásadní lokální incidenty nebyly detekovány.</div>}
            </div>
          </section>

          <section className="animate-fade-in-up">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center"><Globe className="w-6 h-6 text-orange-500" /></div>
              <h2 className="text-2xl font-display text-white uppercase tracking-tight">Světová scéna</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {worldArticles.map((a, i) => <ArticleCard key={i} article={a} idx={i + 10} onClick={() => setSelectedArticle(a)} />)}
            </div>
          </section>
        </div>
      )}

      {/* Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedArticle(null)}
          ></div>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] w-full max-w-2xl max-h-[85vh] overflow-hidden relative z-10 flex flex-col shadow-2xl animate-fade-in-up">
            <div className="p-8 pb-0 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20 font-mono uppercase font-bold tracking-widest">{selectedArticle.category}</span>
                  <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest border-l border-white/10 pl-3">{selectedArticle.date || new Date().toLocaleDateString()}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display text-white uppercase tracking-tight leading-none mb-2">{selectedArticle.title}</h2>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5"
              >
                <ArrowRight className="w-5 h-5 text-gray-400 rotate-45" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar">
              <p className="text-lg text-gray-300 leading-relaxed font-light mb-8 first-letter:text-5xl first-letter:font-bold first-letter:text-amber-500 first-letter:mr-3 first-letter:float-left">
                {selectedArticle.description}
              </p>
              <div className="prose prose-invert prose-amber max-w-none">
                {selectedArticle.full_content ? (
                  selectedArticle.full_content.split('\n').map((paragraph, i) => (
                    paragraph.trim() && <p key={i} className="text-gray-400 leading-relaxed text-sm mb-4">{paragraph}</p>
                  ))
                ) : (
                  <p className="text-gray-500 italic">Detailní obsah není k dispozici.</p>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-mono uppercase tracking-widest">
                <Flag className="w-4 h-4 text-amber-500" />
                {selectedArticle.source}
              </div>
              <a
                href={selectedArticle.url}
                target="_blank"
                rel="noreferrer"
                className="bg-white text-black px-6 py-2 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-amber-400 transition-colors flex items-center gap-2"
              >
                Přečíst originál <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CheckItem: React.FC<{ icon: React.ReactNode, label: string, sub: string }> = ({ icon, label, sub }) => (
  <div className="flex gap-4 p-5 bg-white/5 rounded-2xl border border-white/5">
    <div className="mt-1">{icon}</div>
    <div>
      <div className="text-white text-xs font-bold uppercase tracking-tight">{label}</div>
      <div className="text-[10px] text-gray-500 font-mono uppercase">{sub}</div>
    </div>
  </div>
);

const ArticleCard: React.FC<{ article: Article, idx: number, onClick: () => void }> = ({ article, idx, onClick }) => (
  <div
    onClick={onClick}
    className="group relative flex flex-col bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-amber-500/40 transition-all duration-500 shadow-2xl cursor-pointer hover:-translate-y-1"
    style={{ animationDelay: `${idx * 100}ms` }}
  >
    <div className="p-8 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <span className="text-[8px] text-gray-500 font-mono uppercase tracking-widest">{article.date || 'DNES'}</span>
        <span className="text-[8px] bg-amber-500/10 text-amber-400 px-2 py-1 rounded border border-amber-500/20 font-mono uppercase font-bold tracking-tighter">{article.category}</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-4 font-display uppercase tracking-tight leading-tight group-hover:text-amber-400 transition-colors line-clamp-3">{article.title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed font-light mb-8 line-clamp-3 group-hover:text-gray-400 transition-colors">{article.description}</p>
      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 truncate max-w-[150px]"><Flag className="w-3 h-3 text-amber-500" /> {article.source}</div>
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:bg-amber-500 group-hover:border-amber-500 transition-all shadow-inner"><ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500" /></div>
      </div>
    </div>
  </div>
);

export default CyberNews;
