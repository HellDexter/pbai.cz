
import React from 'react';
import { Block, Question } from '../types';
import { ArrowLeft, HelpCircle, AlertCircle, CheckCircle2, XCircle, ArrowRight, Zap, RefreshCcw, Home } from 'lucide-react';

interface Props {
  block: Block;
  currentQuestionIndex: number;
  question: Question;
  selectedAnswer: number | null;
  showHint: boolean;
  onSelectAnswer: (index: number) => void;
  onToggleHint: () => void;
  onNextQuestion: () => void;
  onBackToMenu: () => void;
}

const QuizScreen: React.FC<Props> = ({
  block,
  currentQuestionIndex,
  question,
  selectedAnswer,
  showHint,
  onSelectAnswer,
  onToggleHint,
  onNextQuestion,
  onBackToMenu,
}) => {
  const isAnswered = selectedAnswer !== null;
  const progress = ((currentQuestionIndex) / block.questions.length) * 100;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-10 flex flex-col justify-center relative z-10">

      {/* Top Bar */}
      <div className="flex items-center justify-between mb-10 md:mb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }}>

        {/* Back Button */}
        <button
          onClick={onBackToMenu}
          className="group flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
        >
          <Home className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          <span className="text-xs font-bold text-gray-400 group-hover:text-white uppercase tracking-widest transition-colors hidden sm:inline-block">Menu</span>
        </button>

        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500 font-mono hidden sm:inline-block tracking-widest opacity-60">PROBÍHAJÍCÍ ANALÝZA</span>
          <div className="text-lg font-mono text-cyan-400 bg-cyan-950/40 px-5 py-2 md:px-6 md:py-3 rounded-xl border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            {currentQuestionIndex + 1} <span className="text-gray-600">/</span> {block.questions.length}
          </div>
        </div>
      </div>

      {/* Main Card Wrapper */}
      <div className="relative w-full transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '200ms' }}>

        {/* Animated Border Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-600/0 rounded-[2.5rem] opacity-60 blur-md"></div>

        {/* Main Glass Card */}
        <div className="glass-panel p-6 md:p-16 rounded-[2.5rem] relative overflow-hidden border border-white/10 bg-[#050505]/90 backdrop-blur-3xl shadow-2xl">

          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>

          {/* Decorative Grid inside card */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>

          {/* Progress Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.8)] transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ width: `${progress}%` }}
            >
            </div>
          </div>

          {/* Question Container */}
          <div key={currentQuestionIndex} className="relative z-10 animate-fade-in-up">
            <div className="mb-10 md:mb-14">
              <span className="text-cyan-500 text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4 md:mb-6 block opacity-80 font-mono">Otázka {currentQuestionIndex + 1}</span>
              <h2 className="text-2xl md:text-4xl font-display text-white leading-tight drop-shadow-xl uppercase tracking-wide">
                {question.question}
              </h2>
            </div>

            <div className="grid gap-4 md:gap-5">
              {question.options.map((option, index) => {
                let containerClass = "relative w-full p-6 md:p-8 text-left rounded-2xl border transition-all duration-500 group overflow-hidden ";
                let iconClass = "w-6 h-6 transition-all duration-500 flex-shrink-0 ml-4 ";
                let textClass = "text-lg md:text-xl font-light tracking-wide leading-snug transition-colors ";

                if (isAnswered) {
                  if (index === question.correctAnswer) {
                    containerClass += "bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)] translate-x-2";
                    iconClass += "text-emerald-400 scale-110";
                    textClass += "text-emerald-100";
                  } else if (index === selectedAnswer) {
                    containerClass += "bg-red-500/10 border-red-500/50 opacity-80";
                    iconClass += "text-red-400 scale-110";
                    textClass += "text-red-100";
                  } else {
                    containerClass += "bg-transparent border-white/5 opacity-30 blur-[1px] scale-[0.98]";
                    iconClass += "text-gray-800";
                    textClass += "text-gray-600";
                  }
                } else {
                  containerClass += "bg-white/[0.02] border-white/10 hover:bg-white/[0.06] hover:border-cyan-500/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] active:scale-[0.99]";
                  iconClass += "text-gray-600 group-hover:text-cyan-400 group-hover:scale-110";
                  textClass += "text-gray-300 group-hover:text-white";
                }

                return (
                  <button
                    key={index}
                    onClick={() => !isAnswered && onSelectAnswer(index)}
                    disabled={isAnswered}
                    className={containerClass}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <span className={textClass}>{option}</span>
                      {isAnswered && index === question.correctAnswer && <CheckCircle2 className={iconClass} />}
                      {isAnswered && index === selectedAnswer && index !== question.correctAnswer && <XCircle className={iconClass} />}
                      {!isAnswered && <div className={`w-5 h-5 rounded-full border-2 border-white/10 group-hover:border-cyan-400/50 transition-all ${iconClass} md:block hidden`}></div>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Hint & Feedback Area */}
            <div className="mt-10 md:mt-16 min-h-[140px]">
              {!isAnswered && (
                <div className="flex justify-center">
                  <button
                    onClick={onToggleHint}
                    className="flex items-center gap-3 text-gray-500 hover:text-cyan-400 transition-all text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase group font-mono py-4 px-6 rounded-full hover:bg-white/5 border border-transparent hover:border-white/5"
                  >
                    <HelpCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    {showHint ? "Skrýt nápovědu" : "Zobrazit nápovědu"}
                  </button>
                </div>
              )}

              {showHint && !isAnswered && (
                <div className="mt-6 p-6 md:p-8 bg-blue-950/20 border border-blue-500/20 rounded-2xl text-blue-200 text-base md:text-lg flex gap-5 animate-fade-in-up items-start backdrop-blur-sm">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-xs uppercase tracking-widest text-blue-500 mb-1">Nápověda</p>
                    <p className="leading-relaxed font-light opacity-90">{question.hint}</p>
                  </div>
                </div>
              )}

              {isAnswered && (
                <div className="animate-fade-in-up mt-8 border-t border-white/5 pt-8">
                  <div className={`p-8 rounded-3xl border mb-8 ${selectedAnswer === question.correctAnswer ? 'bg-emerald-950/20 border-emerald-500/20' : 'bg-red-950/20 border-red-500/20'}`}>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className={`p-4 rounded-2xl flex-shrink-0 ${selectedAnswer === question.correctAnswer ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                        {selectedAnswer === question.correctAnswer ? <ZoomInCheck /> : <AlertOctagonIcon />}
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold mb-2 uppercase tracking-wide ${selectedAnswer === question.correctAnswer ? 'text-emerald-400' : 'text-red-400'}`}>
                          {selectedAnswer === question.correctAnswer ? "Správná odpověď" : "Nesprávná odpověď"}
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base opacity-90">
                          {question.hint}
                          {/* Here we could add more educational content if available in data type */}
                        </p>
                        <div className="mt-4 pt-4 border-t border-white/5 flex gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
                          <span>#KyberBezpečnost</span>
                          <span>#Vzdělávání</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={onNextQuestion}
                      className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-200 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 rounded-2xl w-full md:w-auto overflow-hidden"
                    >
                      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                      <span className="relative flex items-center gap-3 uppercase tracking-widest text-sm">
                        Další otázka <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom icons for visual flare
const ZoomInCheck = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const AlertOctagonIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
)

export default QuizScreen;
