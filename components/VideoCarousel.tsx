
import React, { useState, useEffect, useCallback } from 'react';
import { Video } from '../types';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface Props {
    videos: Video[];
    onSelectVideo: (youtubeId: string) => void;
}

const VideoCarousel: React.FC<Props> = ({ videos, onSelectVideo }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Reset index when videos change
    useEffect(() => {
        setActiveIndex(0);
    }, [videos]);

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % videos.length);
    }, [videos.length]);

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
    }, [videos.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev]);

    const getCardStyle = (index: number) => {
        const total = videos.length;
        let offset = index - activeIndex;

        // Adjust for circular wraparound
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        const absOffset = Math.abs(offset);

        // Visibility range (show 2 neighbors on each side)
        if (absOffset > 2) return { display: 'none', zIndex: 0, opacity: 0, transform: 'none' }; // Return valid style object even if hidden

        const isActive = offset === 0;
        const zIndex = 50 - absOffset;
        const scale = isActive ? 1 : 0.8 - (absOffset * 0.1);
        const opacity = isActive ? 1 : 0.6 - (absOffset * 0.2);
        const xTranslate = offset * 50; // Percentage shift
        const rotateY = offset * -25; // Rotate towards center

        return {
            zIndex,
            opacity,
            transform: `translateX(calc(-50% + ${xTranslate}%)) scale(${scale}) rotateY(${rotateY}deg)`,
            filter: isActive ? 'none' : 'grayscale(50%) brightness(50%)',
            display: 'block'
        };
    };

    return (
        <div className="relative w-full h-[500px] flex flex-col items-center justify-center overflow-hidden py-10">
            {/* Carousel Container */}
            <div className="relative w-full max-w-5xl h-[360px] md:h-[400px] flex items-center justify-center perspective-1000">
                {videos.map((video, index) => {
                    const style = getCardStyle(index);
                    if (style.display === 'none') return null;

                    const offset = index - activeIndex;
                    let adjustedOffset = offset;
                    if (offset > videos.length / 2) adjustedOffset -= videos.length;
                    if (offset < -videos.length / 2) adjustedOffset += videos.length;

                    const isCenter = adjustedOffset === 0;

                    return (
                        <div
                            key={video.id}
                            className={`absolute transition-all duration-500 ease-out cursor-pointer group rounded-3xl`}
                            style={{
                                ...style,
                                width: 'min(90%, 600px)', // Responsive width
                                aspectRatio: '16/9',
                                // Center alignment fix: standard absolute centering
                                left: '50%',
                            }}
                            onClick={() => {
                                if (isCenter) {
                                    onSelectVideo(video.youtubeId);
                                } else {
                                    setActiveIndex(index);
                                }
                            }}
                        >
                            {/* Card Content */}
                            <div className={`relative w-full h-full rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 bg-black ${isCenter ? 'shadow-[0_0_50px_rgba(6,182,212,0.4)] ring-1 ring-white/20' : 'shadow-xl'} transition-all duration-300`}>
                                <img
                                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                                    alt={video.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent ${isCenter ? 'opacity-80' : 'opacity-90'}`}></div>

                                {isCenter && (
                                    <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
                                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                                        </div>
                                    </div>
                                )}

                                <div className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 transform transition-transform duration-500 ${isCenter ? 'translate-y-0' : 'translate-y-4 opacity-0'}`}>
                                    <h3 className="text-white font-bold text-xl md:text-3xl mb-2 leading-tight drop-shadow-lg font-display uppercase tracking-tight">{video.title}</h3>
                                    {isCenter && (
                                        <p className="text-gray-200 text-sm md:text-base line-clamp-2 max-w-2xl font-light">{video.description}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Controls & Pagination */}
            <div className="flex items-center gap-6 mt-8 z-50">
                <button
                    onClick={handlePrev}
                    className="p-4 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-white border border-gray-200 dark:border-white/10 hover:scale-110 transition-all text-gray-900 dark:text-white shadow-lg"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex gap-2">
                    {videos.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === idx ? 'w-8 bg-cyan-500' : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'}`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className="p-4 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-white border border-gray-200 dark:border-white/10 hover:scale-110 transition-all text-gray-900 dark:text-white shadow-lg"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default VideoCarousel;
