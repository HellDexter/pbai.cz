
import React, { useState } from 'react';
import QuizScreen from './QuizScreen';
import { Block } from '../types';
import { courseData } from '../data';
import { BrainCircuit, Trophy, Star, ChevronRight, GraduationCap, ArrowRight, Shield } from 'lucide-react';

interface Props {
    onBack: () => void;
}

const QuizSectionWrapper: React.FC<Props> = ({ onBack }) => {
    const [selectedBlockId, setSelectedBlockId] = useState<number | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showHint, setShowHint] = useState(false);
    const [completedBlocks, setCompletedBlocks] = useState<number[]>([]);

    const handleSelectBlock = (blockId: number) => {
        setSelectedBlockId(blockId);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowHint(false);
    };

    const handleSelectAnswer = (index: number) => {
        setSelectedAnswer(index);
    };

    const handleNextQuestion = () => {
        if (!selectedBlockId) return;
        const block = courseData.find(b => b.id === selectedBlockId);
        if (!block) return;

        if (currentQuestionIndex < block.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setShowHint(false);
        } else {
            // Quiz finished
            if (!completedBlocks.includes(selectedBlockId)) {
                setCompletedBlocks(prev => [...prev, selectedBlockId]);
            }
            setSelectedBlockId(null);
        }
    };

    if (!selectedBlockId) {
        const totalQuestions = courseData.reduce((acc, curr) => acc + curr.questions.length, 0);
        const completedCount = completedBlocks.length;
        const totalBlocks = courseData.length;
        const progressPercentage = Math.round((completedCount / totalBlocks) * 100);

        return (
            <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
                {/* HEADER DASHBOARD */}
                <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
                    {/* Welcome Card */}
                    <div className="md:col-span-2 bg-gradient-to-br from-[#0f0f0f] to-[#151515] border border-white/10 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-cyan-500/10 transition-all duration-700"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-display text-white uppercase tracking-tight mb-4 flex items-center gap-3">
                                <GraduationCap className="w-8 h-8 text-cyan-500" /> Tréninkové Centrum
                            </h2>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-lg mb-8">
                                Otestujte své znalosti v interaktivních scénářích. Každý splněný blok zvyšuje vaše kybernetické skóre.
                                Chyby nejsou problém – jsou to lekce.
                            </p>
                            <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-gray-500">
                                <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-500" /> {totalQuestions} Otázek celkem</span>
                                <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                                <span className="flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-500" /> {completedCount} Splněno</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Card */}
                    <div className="bg-[#0f0f0f] border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl group">
                        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                        <div className={`text-6xl font-bold font-mono mb-2 transition-all duration-500 ${progressPercentage === 100 ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]' : 'text-white'}`}>
                            {progressPercentage}%
                        </div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-6">Celkový Progress</div>

                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-1000 ${progressPercentage === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-cyan-500 to-blue-600'}`}
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* BLOCKS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courseData.map((block, idx) => {
                        const isCompleted = completedBlocks.includes(block.id);
                        return (
                            <button
                                key={block.id}
                                onClick={() => handleSelectBlock(block.id)}
                                className={`group relative p-8 rounded-[2rem] border text-left transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col justify-between min-h-[220px] ${isCompleted
                                        ? 'bg-[#0a0a0a] border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                                        : 'bg-[#0a0a0a] border-white/5 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                                    }`}
                                style={{ animationDelay: `${idx * 50}ms` }}
                            >
                                {/* Background Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${isCompleted ? 'from-emerald-500 to-teal-900' : 'from-cyan-500 to-blue-900'}`}></div>

                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 ${isCompleted
                                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                                : 'bg-white/5 border-white/10 text-gray-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20'
                                            }`}>
                                            {isCompleted ? <CheckMark /> : <BrainCircuit className="w-6 h-6" />}
                                        </div>
                                        {isCompleted && (
                                            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                                                <Star className="w-3 h-3 fill-current" /> Hotovo
                                            </div>
                                        )}
                                    </div>

                                    <h3 className={`text-xl font-bold mb-2 transition-colors ${isCompleted ? 'text-white' : 'text-white group-hover:text-cyan-400'}`}>
                                        {block.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                        Prověřte své znalosti v modulu {block.title}. Čeká na vás {block.questions.length} otázek.
                                    </p>
                                </div>

                                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                                    <span className="text-xs font-mono text-gray-600 group-hover:text-gray-400 transition-colors uppercase tracking-wider">
                                        {block.questions.length} otázek
                                    </span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-gray-500 group-hover:bg-cyan-500 group-hover:text-white'}`}>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        );
    }

    const block = courseData.find(b => b.id === selectedBlockId);
    if (!block) return null;

    return (
        <QuizScreen
            block={block}
            currentQuestionIndex={currentQuestionIndex}
            question={block.questions[currentQuestionIndex]}
            selectedAnswer={selectedAnswer}
            showHint={showHint}
            onSelectAnswer={handleSelectAnswer}
            onToggleHint={() => setShowHint(!showHint)}
            onNextQuestion={handleNextQuestion}
            onBackToMenu={() => setSelectedBlockId(null)}
        />
    );
};

// Helper component for checkmark
const CheckMark = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default QuizSectionWrapper;
