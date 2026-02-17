
import React, { useState } from 'react';
import { cyberVideos, aiVideos } from '../data';
import { Film, X } from 'lucide-react';
import VideoCarousel from './VideoCarousel';

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
            <header className="mb-8 md:mb-12 animate-fade-in-up">
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

            {/* Carousel View */}
            <div className="animate-fade-in-up" key={activeTab}>
                <VideoCarousel
                    videos={currentVideos}
                    onSelectVideo={setSelectedVideo}
                />
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
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
