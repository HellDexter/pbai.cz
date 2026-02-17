import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Newspaper, ExternalLink, RefreshCw, Globe, Sparkles, MapPin, Flag, Key, Info, CheckCircle, ShieldAlert, Settings, CreditCard, AlertCircle, Languages, Loader2, FileText, Search, Plus } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Props {
  onBack: () => void;
}

interface Article {
  region: 'domestic' | 'world' | 'search';
  title: string;
  description: string;
  full_content?: string; // Optional - loaded on demand
  url: string;
  source: string;
  date: string;
  category: string;
}

const CACHE_KEY = 'CYBER_NEWS_CACHE';
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

const CyberNews: React.FC<Props> = ({ onBack }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Detail loading state
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [needsKeySelection, setNeedsKeySelection] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  const handleOpenKeyDialog = async () => {
    try {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setNeedsKeySelection(false);
      setTimeout(() => fetchNewsWithAI(), 1000);
    } catch (err) {
      console.error("Failed to open key dialog:", err);
    }
  };

  const fetchNewsWithAI = async (customQuery?: string, isLoadMore = false) => {
    // 1. Check Cache (Only for default view and first load)
    if (!customQuery && !isLoadMore && !isSearching) { // Only use cache for initial default view
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { timestamp, data } = JSON.parse(cached);
          const age = Date.now() - timestamp;
          if (age < CACHE_DURATION) {
            console.log(`Using cached news(age: ${Math.round(age / 1000 / 60)} mins)`);
            setArticles(data);
            return;
          }
        }
      } catch (e) {
        console.warn("Failed to parse cache", e);
        localStorage.removeItem(CACHE_KEY);
      }
    }

    if (!process.env.API_KEY) {
      setNeedsKeySelection(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setDebugInfo(null);

    // Only clear if it's a new search or refresh, not load more
    if (!isLoadMore) {
      setArticles([]);
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const currentTitles = articles.map(a => a.title).join(", "); // Context validation to avoid dupes
      const currentUrls = articles.map(a => a.url).join(", ");

      let prompt = "";

      if (customQuery || isSearching) { // Use isSearching to determine if we are in search mode
        // --- SEARCH MODE ---
        const query = customQuery || searchQuery;
        prompt = `Najdi 4 nejnovější zprávy o kybernetické bezpečnosti týkající se tématu: "${query}".
        Hledej na českých i světových webech.
        ZÁSADNÍ: Ignoruj zprávy s těmito nadpisy: ${isLoadMore ? currentTitles : "žádné"}.
        Datace: Posledních 30 dní.
        Vrať JSON objekt s klíči: region('search'), title, description(perex), source, url, date, category.
        Full_content NEGENERUJ.`;
      } else {
        // --- DEFAULT MODE ---
        if (isLoadMore) {
          prompt = `Najdi DALŠÍ 3 zprávy o kybernetické bezpečnosti (mix ČR a Svět).
             IGNORUJ již nalezené zprávy s těmito URL: ${currentUrls}.
             Datace: Posledních 7 dní.
             Vrať JSON objekt s klíči: region('domestic' nebo 'world'), title, description, source, url, date, category.`;
        } else {
          prompt = `Najdi 3 nejnovější zprávy o kybernetické bezpečnosti z českých webů: 'nukib.gov.cz', 'csirt.cz' nebo 'root.cz/rubriky/bezpecnost' a označ je jako 'domestic'. ` +
            `Dále najdi 3 nejnovější články ze světových webů: 'TheHackerNews.com', 'BleepingComputer.com' nebo 'DarkReading.com' a označ je jako 'world'. ` +
            `ZÁSADNÍ: Hledej pouze zprávy s datem z posledních 7 dní! ` +
            `Pro každou zprávu vrať JSON objekt (bez markdownu) s klíči: ` +
            `'region' (domestic/world), 'title' (název česky), 'description' (perex česky max 2 věty), 'source', 'url' (PŘESNÁ URL), 'date', 'category'. ` +
            `Full_content prozatím NEGENERUJ.`;
        }
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{
          role: 'user',
          parts: [{ text: prompt + " Odpověz POUZE validním JSON polem objektů. Žádný markdown." }]
        }],
        config: { tools: [{ googleSearch: {} }] }
      });

      const text = response.text || "";
      const jsonMatch = text.match(/\[[\s\S]*\]/);

      if (jsonMatch) {
        const newArticles = JSON.parse(jsonMatch[0]);

        if (isLoadMore) {
          setArticles(prev => [...prev, ...newArticles]);
        } else {
          setArticles(newArticles);
          // Cache only default view
          if (!customQuery && !isSearching) {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: newArticles }));
          }
        }
      } else {
        throw new Error("Invalid format from model");
      }

    } catch (err: any) {
      console.error("News AI Error:", err);
      const msg = err.message || "";
      if (msg.includes("API Key")) setNeedsKeySelection(true);
      else {
        setError("Nepodařilo se načíst zprávy.");
        setDebugInfo(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    fetchNewsWithAI(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    fetchNewsWithAI(); // Restore default
  };

  // --- Detail Fetching Logic (Same as before) ---
  const fetchArticleDetail = async (article: Article) => {
    if (!process.env.API_KEY || article.full_content) return;
    setIsDetailLoading(true);
    setDetailError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{
          role: 'user',
          parts: [{
            text: `Proveď hloubkovou analýzu této kybernetické události:

Název: ${article.title}
URL: ${article.url}

ÚKOL:
1. Přečti si dostupné informace o této události (použij Google Search).
            2. Napiš KOMPLEXNÍ report v češtině (min. 300 slov).
            3. Struktura reportu musí být:
               - **Co se stalo**: Detailní popis incidentu.
               - **Technická analýza**: Jak byl útok proveden? (CVE, malware type, vektory útoku).
               - **Dopad**: Co to znamená pro firmy / uživatele?
               - **Doporučená obrana**: Konkrétní kroky pro mitigaci.
            
            Výstup naformátuj jako čistý text s odstavci. Nepoužívej markdown nadpisy (#), používej tučné písmo pro sekce.`
          }]
        }],
        config: { tools: [{ googleSearch: {} }] }
      });
      const detailedContent = response.text || "Nepodařilo se vygenerovat detailní obsah.";
      const updatedArticles = articles.map(a => a.url === article.url ? { ...a, full_content: detailedContent } : a);
      setArticles(updatedArticles);
      setSelectedArticle(prev => prev ? { ...prev, full_content: detailedContent } : null);
      if (!isSearching) localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: updatedArticles }));
    } catch (e: any) {
      console.error("Detail Fetch Error:", e);
      setDetailError("Nepodařilo se načíst detail zprávy. Zkuste to prosím znovu.");
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleArticleClick = (article: Article) => setSelectedArticle(article);

  useEffect(() => { fetchNewsWithAI(); }, []);

  const domesticArticles = articles.filter(a => a.region === 'domestic');
  const worldArticles = articles.filter(a => a.region === 'world');
  // When in search mode, all articles are treated as search results
  const currentDisplayArticles = isSearching ? articles : [...domesticArticles, ...worldArticles];


  return (
    <div className="max-w-6xl mx-auto px-6 py-4 relative z-10">

      {/* Header & Search */}
      <header className="mb-8 animate-fade-in-up flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-display text-white uppercase tracking-tight flex items-center gap-2">
          <Newspaper className="w-6 h-6 text-amber-500" /> Cyber News
        </h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative flex-grow md:w-64 group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Hledat téma (např. Apple)..."
              className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all font-mono placeholder-gray-600"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-amber-500 transition-colors" />
          </form>

          {isSearching && (
            <button onClick={clearSearch} className="text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-wider">Můj Feed</button>
          )}

          <button
            onClick={() => fetchNewsWithAI(isSearching ? searchQuery : undefined)}
            disabled={isLoading}
            className="text-gray-500 hover:text-white p-2 group relative"
            title="Vynutit aktualizaci"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      {needsKeySelection ? (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-[2.5rem] p-12 text-center max-w-2xl mx-auto animate-fade-in-up">
          <Key className="w-10 h-10 text-amber-500 mx-auto mb-6" />
          <h2 className="text-2xl font-display text-white mb-4 uppercase">Klíč nenalezen</h2>
          <button onClick={handleOpenKeyDialog} className="bg-white text-black px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-amber-100 transition-all">Vybrat API klíč</button>
        </div>
      ) : isLoading && articles.length === 0 ? ( // Only show full loader if initial load
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-4" />
          <p className="text-amber-500 font-mono text-xs uppercase tracking-[0.3em] animate-pulse">Skenuji kybernetický prostor...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-[2.5rem] p-12 text-center max-w-2xl mx-auto animate-fade-in-up">
          <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-display text-white mb-2 uppercase">{error}</h2>
          <p className="text-gray-500 text-sm mb-6 font-mono">{debugInfo}</p>
          <button onClick={() => fetchNewsWithAI()} className="bg-white text-black px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest">Zkusit znovu</button>
        </div>
      ) : (
        <div className="space-y-16 pb-20">

          {isSearching ? (
            <section className="animate-fade-in-up">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"><Search className="w-6 h-6 text-amber-500" /></div>
                <h2 className="text-2xl font-display text-white uppercase tracking-tight">Výsledky pro "{searchQuery}"</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.length > 0 ? articles.map((a, i) => <ArticleCard key={i} article={a} idx={i} onClick={() => handleArticleClick(a)} />) : <div className="col-span-full border border-dashed border-white/5 p-8 rounded-2xl text-center text-gray-500 font-mono text-xs">Žádné výsledky pro "{searchQuery}".</div>}
              </div>
            </section>
          ) : (
            <>
              <section className="animate-fade-in-up">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"><MapPin className="w-6 h-6 text-amber-500" /></div>
                  <h2 className="text-2xl font-display text-white uppercase tracking-tight">Incidenty v ČR</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {domesticArticles.length > 0 ? domesticArticles.map((a, i) => <ArticleCard key={i} article={a} idx={i} onClick={() => handleArticleClick(a)} />) : <div className="col-span-full border border-dashed border-white/5 p-8 rounded-2xl text-center text-gray-500 font-mono text-xs">Žádné lokální zprávy.</div>}
                </div>
              </section>

              <section className="animate-fade-in-up">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center"><Globe className="w-6 h-6 text-orange-500" /></div>
                  <h2 className="text-2xl font-display text-white uppercase tracking-tight">Světová scéna</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {worldArticles.length > 0 ? worldArticles.map((a, i) => <ArticleCard key={i} article={a} idx={i + 10} onClick={() => handleArticleClick(a)} />) : <div className="col-span-full border border-dashed border-white/5 p-8 rounded-2xl text-center text-gray-500 font-mono text-xs">Žádné světové zprávy.</div>}
                </div>
              </section>
            </>
          )}

          {/* Load More Button */}
          {currentDisplayArticles.length > 0 && (
            <div className="flex justify-center pt-8">
              <button
                onClick={() => fetchNewsWithAI(isSearching ? searchQuery : undefined, true)}
                disabled={isLoading}
                className="bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-amber-500" /> : <Plus className="w-4 h-4 text-amber-500" />}
                Načíst další zprávy
              </button>
            </div>
          )}

        </div>
      )}

      {/* Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedArticle(null)}></div>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] w-full max-w-2xl max-h-[85vh] overflow-hidden relative z-10 flex flex-col shadow-2xl animate-fade-in-up">

            {/* Header */}
            <div className="p-8 pb-0 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20 font-mono uppercase font-bold tracking-widest">{selectedArticle.category}</span>
                  <span className="text-xs text-gray-500 font-mono uppercase tracking-widest border-l border-white/10 pl-3">{selectedArticle.date}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display text-white uppercase tracking-tight leading-none mb-2">{selectedArticle.title}</h2>
              </div>
              <button onClick={() => setSelectedArticle(null)} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5">
                <ArrowRight className="w-5 h-5 text-gray-400 rotate-45" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-8 overflow-y-auto custom-scrollbar flex-grow min-h-[300px]">
              <p className="text-lg text-gray-300 leading-relaxed font-light mb-8 italic border-l-2 border-amber-500/50 pl-4">
                {selectedArticle.description}
              </p>

              {isDetailLoading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 border-2 border-amber-500/20 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-amber-500 rounded-full animate-spin"></div>
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-amber-500 opacity-50 animate-pulse" />
                  </div>
                  <div className="text-center">
                    <p className="text-amber-500 font-mono text-xs uppercase tracking-widest animate-pulse mb-1">Analyzuji obsah URL...</p>
                    <p className="text-gray-600 text-[10px]">Generuji technický report (cca 10-15s)</p>
                  </div>
                </div>
              ) : detailError ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
                  <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="text-red-400 text-sm mb-4">{detailError}</p>
                  <button onClick={() => fetchArticleDetail(selectedArticle)} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors">Zkusit znovu</button>
                </div>
              ) : selectedArticle.full_content ? (
                <div className="prose prose-invert prose-amber max-w-none">
                  {/* Smartly render text with simple formatting */}
                  {selectedArticle.full_content.split('\n').map((paragraph, i) => {
                    const trimmed = paragraph.trim();
                    if (!trimmed) return null;
                    // Bold detection for headers
                    if (trimmed.startsWith('**') || trimmed.includes(':')) {
                      return <p key={i} className="text-gray-200 leading-relaxed text-base mb-4 font-bold text-amber-100/90">{trimmed.replace(/\*\*/g, '')}</p>
                    }
                    return <p key={i} className="text-gray-400 leading-relaxed text-base mb-4">{trimmed}</p>
                  })
                  }
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 space-y-6 border-t border-white/5 mt-8">
                  <div className="relative group cursor-pointer" onClick={() => fetchArticleDetail(selectedArticle)}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <button className="relative px-8 py-4 bg-black rounded-xl leading-none flex items-center divide-x divide-gray-600">
                      <span className="flex items-center gap-3 pr-6 text-amber-500">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                        <span className="font-bold tracking-widest uppercase text-sm">Spustit AI Analýzu</span>
                      </span>
                      <span className="pl-6 text-gray-400 font-mono text-xs group-hover:text-amber-200 transition-colors">
                        Vygenerovat hloubkový report
                      </span>
                    </button>
                  </div>
                  <p className="text-gray-600 text-[10px] font-mono uppercase tracking-widest">
                    Analýza spotřebuje cca 500 tokenů
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-mono uppercase tracking-widest">
                <Flag className="w-4 h-4 text-amber-500" />
                {selectedArticle.source}
              </div>
              <a href={selectedArticle.url} target="_blank" rel="noreferrer" className="bg-white text-black px-6 py-2 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-amber-400 transition-colors flex items-center gap-2">
                Přečíst originál <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ArticleCard: React.FC<{ article: Article, idx: number, onClick: () => void }> = ({ article, idx, onClick }) => (
  <div onClick={onClick} className="group relative flex flex-col bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-amber-500/40 transition-all duration-500 shadow-2xl cursor-pointer hover:-translate-y-1" style={{ animationDelay: `${idx * 100}ms` }}>
    <div className="p-8 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">{article.date || 'DNES'}</span>
        <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-1 rounded border border-amber-500/20 font-mono uppercase font-bold tracking-tighter">{article.category}</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-4 font-display uppercase tracking-tight leading-tight group-hover:text-amber-400 transition-colors line-clamp-3">{article.title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed font-light mb-8 line-clamp-3 group-hover:text-gray-300 transition-colors">{article.description}</p>
      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 truncate max-w-[150px]"><Flag className="w-3 h-3 text-amber-500" /> {article.source}</div>
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:bg-amber-500 group-hover:border-amber-500 transition-all shadow-inner"><ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500" /></div>
      </div>
    </div>
  </div>
);

export default CyberNews;
