
import React, { useState, useRef, useEffect } from 'react';
import { Video } from '../types';
import { ArrowLeft, Play, X, Video as VideoIcon, ChevronRight, ChevronLeft, Info } from 'lucide-react';

interface Props {
  videos: Video[];
  onBack: () => void;
  theme?: 'emerald' | 'purple';
}

const VideoScreen: React.FC<Props> = ({ videos, onBack, theme = 'emerald' }) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isPurple = theme === 'purple';
  const colorClass = isPurple ? 'purple' : 'emerald';
  const glowColor = isPurple ? 'rgba(168, 85, 247, 0.4)' : 'rgba(16, 185, 129, 0.4)';

  // Handle horizontal scroll with mouse wheel
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollBy({
          left: e.deltaY * 3,
          behavior: 'smooth'
        });
      };
      el.addEventListener('wheel', onWheel, { passive: false });
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth * 0.8;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full min-h-screen relative z-10 bg-[#050505] overflow-x-hidden">
      
      {/* Dynamic Background Ambience */}
      <div className={`fixed inset-0 bg-gradient-to-b from-${colorClass}-950/10 via-black to-black pointer-events-none -z-10`}></div>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        <button 
          onClick={onBack}
          className="mb-8 text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-3 text-xs font-bold tracking-widest uppercase group font-mono"
        >
          <div className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-${colorClass}-500/30 transition-all`}>
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span>Zpět</span>
        </button>

        <header className="mb-8 animate-fade-in-up">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-${colorClass}-500/30 bg-${colorClass}-500/5 text-${colorClass}-400 text-[10px] uppercase tracking-widest mb-4 backdrop-blur-sm font-mono`}>
            <VideoIcon className="w-3 h-3" />
            Video tutoriály
          </div>
          <h1 className="text-3xl md:text-5xl font-display text-white mb-4 tracking-tight uppercase leading-tight">
            Výuková <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isPurple ? 'from-purple-400 to-pink-500' : 'from-emerald-400 to-cyan-500'}`}>Knihovna</span>
          </h1>
          <p className="text-gray-500 max-w-2xl text-base font-light">
            Vyberte si ze seznamu lekcí a prohlubte své znalosti.
          </p>
        </header>
      </div>

      {/* Netflix-style horizontal row */}
      <div className="w-full relative group/row overflow-visible px-4 md:px-0">
        
        {/* Navigation arrows */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30 hidden md:block group-hover/row:opacity-100 opacity-0 transition-opacity">
           <button 
             onClick={() => scroll('left')}
             className="w-12 h-12 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white cursor-pointer hover:bg-white/10 transition-all shadow-2xl"
           >
              <ChevronLeft className="w-6 h-6" />
           </button>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 hidden md:block group-hover/row:opacity-100 opacity-0 transition-opacity">
           <button 
             onClick={() => scroll('right')}
             className="w-12 h-12 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white cursor-pointer hover:bg-white/10 transition-all shadow-2xl"
           >
              <ChevronRight className="w-6 h-6" />
           </button>
        </div>

        {/* Horizontal Scroll Area */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto px-6 md:px-20 no-scrollbar snap-x pb-20 pt-10 scroll-smooth"
        >
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="flex-shrink-0 w-[240px] md:w-[350px] snap-center perspective-1000 group/item"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => setSelectedVideo(video)}
                className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 ease-out transform group-hover/item:scale-110 group-hover/item:z-50 group-hover/item:-translate-y-2 border border-white/5 group-hover/item:border-white/40 shadow-xl bg-black"
              >
                <img 
                  src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} 
                  alt={video.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover/item:opacity-100 transition-opacity"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`; }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 opacity-80"></div>
                
                <div className="absolute inset-0 p-4 flex flex-col justify-end translate-y-4 group-hover/item:translate-y-0 transition-all duration-300">
                    <div className={`text-[8px] font-bold font-mono text-${colorClass}-400 mb-1 uppercase tracking-widest`}>Kapitola {(index + 1).toString().padStart(2, '0')}</div>
                    <h3 className="text-xs md:text-sm font-bold text-white mb-2 font-display uppercase leading-tight truncate group-hover/item:whitespace-normal">{video.title}</h3>
                    
                    <div className="flex items-center gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                       <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                       </div>
                       <span className="text-[9px] font-bold text-white uppercase tracking-widest">Přehrát</span>
                    </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 group-hover/item:opacity-0 transition-opacity">
                    <h3 className="text-[10px] font-bold text-white uppercase truncate font-display tracking-wider border-l-2 border-white/30 pl-2">{video.title}</h3>
                </div>

                <div className={`absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl`}
                     style={{ boxShadow: `inset 0 0 20px ${glowColor}` }}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-20">
          <div className="bg-[#0a0a0a]/40 border border-white/5 rounded-2xl p-6 md:p-10 backdrop-blur-sm animate-fade-in-up">
              <h3 className="text-lg md:text-xl font-display text-white mb-3 uppercase tracking-wider">O vzdělávací řadě</h3>
              <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-2xl">
                 Každá lekce je doprovázena testem. Po zhlédnutí videa doporučujeme přejít do sekce kvízů.
              </p>
          </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10">
            <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl animate-fade-in" onClick={() => setSelectedVideo(null)}></div>
            <div className="relative w-full max-w-6xl aspect-video bg-black rounded-none md:rounded-3xl overflow-hidden border border-white/10 shadow-3xl animate-fade-in-up">
                <button 
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white/20 transition-all border border-white/10 backdrop-blur-md"
                >
                    <X className="w-5 h-5" />
                </button>
                <iframe 
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .perspective-1000 { perspective: 1000px; }
      `}} />
    </div>
  );
};

export default VideoScreen;
