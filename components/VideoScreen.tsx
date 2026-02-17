
import React, { useState } from 'react';
import { cyberVideos, aiVideos } from '../data';
import { Play, Film, X, Search, Clock, ArrowLeft } from 'lucide-react';

interface Props {
    onBack: () => void;
}

const VideoScreen: React.FC<Props> = ({ onBack }) => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'cyber' | 'ai'>('cyber');

    const currentVideos = activeTab === 'cyber' ? cyberVideos : aiVideos;

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
            {/* Header */}
            <header className="mb-12 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-cyan-50 dark:bg-cyan-500/10 rounded-2xl border border-cyan-200 dark:border-cyan-500/20">
                        <Film className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-display text-gray-900 dark:text-white uppercase tracking-tight">Videotéka</h1>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Multimediální knihovna znalostí</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 max-w-md bg-gray-100 dark:bg-white/5 p-1.5 rounded-2xl border border-gray-200 dark:border-white/5">
                    <button
                        onClick={() => setActiveTab('cyber')}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'cyber' ? 'bg-cyan-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                    >
                        Kybez
                    </button>
                    <button
                        onClick={() => setActiveTab('ai')}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'ai' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                    >
                        AI & Nástroje
                    </button>
                </div>
            </header>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" key={activeTab}>
                {currentVideos.map((video, idx) => (
                    <div
                        key={video.id}
                        onClick={() => setSelectedVideo(video.youtubeId)}
                        className="group cursor-pointer bg-white dark:bg-[#0f0f0f] border border-gray-200 dark:border-white/10 rounded-[2rem] overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-1 shadow-2xl flex flex-col h-full"
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        {/* Thumbnail */}
                        <div className="aspect-video relative overflow-hidden bg-black">
                            <img
                                src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                                alt={video.title}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                                    <Play className="w-6 h-6 text-white fill-current" />
                                </div>
                            </div>
                            <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-[10px] font-mono font-bold text-white uppercase tracking-widest border border-white/10">
                                Video
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-display uppercase tracking-tight leading-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                {video.title}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-500 leading-relaxed font-light mb-4 line-clamp-3">
                                {video.description}
                            </p>
                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                                <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> ~ 10 min</span>
                                <span className="group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Přehrát</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fade-in"
                        onClick={() => setSelectedVideo(null)}
                    ></div>
                    <div className="bg-black border border-white/10 rounded-3xl overflow-hidden w-full max-w-5xl aspect-video relative z-10 shadow-2xl animate-scale-in">
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-colors border border-white/10"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <iframe
                            src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoScreen;
