
import React from 'react';
import { Block, Question } from '../types';
import { ArrowLeft, HelpCircle, AlertCircle, CheckCircle2, XCircle, ArrowRight, Zap } from 'lucide-react';

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
    <div className="max-w-5xl mx-auto p-4 md:p-10 min-h-screen flex flex-col justify-center relative z-10">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-10 md:mb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <button 
          onClick={onBackToMenu}
          className="text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-4 text-xs md:text-sm font-bold tracking-widest uppercase group font-mono"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/10 transition-all">
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span>Ukončit</span>
        </button>
        <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 font-mono hidden sm:inline-block tracking-widest">PROBÍHAJÍCÍ ANALÝZA</span>
            <div className="text-lg font-mono text-cyan-400 bg-cyan-950/40 px-5 py-2 md:px-6 md:py-3 rounded-xl border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            {currentQuestionIndex + 1} <span className="text-gray-600 mx-2">/</span> {block.questions.length}
            </div>
        </div>
      </div>

      {/* Main Card Wrapper */}
      <div className="relative w-full transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        
        {/* Animated Border Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-blue-600/0 rounded-[2.5rem] opacity-60 blur-md"></div>

        {/* Main Glass Card */}
        <div className="glass-panel p-6 md:p-16 rounded-[2.5rem] relative overflow-hidden border border-white/20 bg-[#050505]/90 backdrop-blur-3xl shadow-2xl">
          
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent"></div>

          {/* Decorative Grid inside card */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          
          {/* Progress Line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_30px_rgba(6,182,212,1)] transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)]"></div>
            </div>
          </div>

          {/* Question Container */}
          <div key={currentQuestionIndex} className="relative z-10 animate-fade-in-up">
            <div className="mb-10 md:mb-14">
               <span className="text-cyan-500 text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-4 md:mb-6 block opacity-90 font-mono">Otázka {currentQuestionIndex + 1}</span>
               <h2 className="text-2xl md:text-4xl font-display text-white leading-tight drop-shadow-xl uppercase tracking-wide">
                  {question.question}
               </h2>
            </div>

            <div className="space-y-4 md:space-y-6">
              {question.options.map((option, index) => {
                let containerClass = "relative w-full p-6 md:p-8 text-left rounded-2xl border transition-all duration-500 group overflow-hidden ";
                let iconClass = "w-7 h-7 transition-all duration-500 flex-shrink-0 ml-4 ";
                
                if (isAnswered) {
                  if (index === question.correctAnswer) {
                    containerClass += "bg-green-500/15 border-green-500/60 text-green-100 shadow-[0_0_40px_rgba(34,197,94,0.2)] translate-x-3";
                    iconClass += "text-green-400 scale-125";
                  } else if (index === selectedAnswer) {
                    containerClass += "bg-red-500/15 border-red-500/60 text-red-100 opacity-90";
                    iconClass += "text-red-400 scale-110";
                  } else {
                    containerClass += "bg-transparent border-white/5 text-gray-700 opacity-30 blur-[2px] scale-[0.98]";
                    iconClass += "text-gray-800";
                  }
                } else {
                  containerClass += "bg-white/[0.03] border-white/10 text-gray-200 hover:bg-white/[0.08] hover:border-cyan-500/50 hover:text-white hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] active:scale-95";
                  iconClass += "text-gray-700 group-hover:text-cyan-400 group-hover:scale-125";
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
                      <span className="text-lg md:text-2xl font-light tracking-wide leading-snug">{option}</span>
                      {isAnswered && index === question.correctAnswer && <CheckCircle2 className={iconClass} />}
                      {isAnswered && index === selectedAnswer && index !== question.correctAnswer && <XCircle className={iconClass} />}
                      {!isAnswered && <div className={`w-6 h-6 rounded-full border-2 border-white/10 group-hover:border-cyan-400/50 transition-all ${iconClass} md:block hidden`}></div>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Hint & Feedback Area */}
            <div className="mt-10 md:mt-16 min-h-[120px]">
              {!isAnswered && (
                <button
                  onClick={onToggleHint}
                  className="flex items-center gap-3 text-gray-500 hover:text-cyan-400 transition-all text-xs md:text-sm font-bold tracking-[0.3em] uppercase mx-auto md:mx-0 group font-mono p-3 bg-white/5 rounded-xl border border-white/5 hover:border-cyan-500/20"
                >
                  <HelpCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  {showHint ? "Skrýt nápovědu" : "Potřebuji nápovědu"}
                </button>
              )}
              
              {showHint && !isAnswered && (
                <div className="mt-6 md:mt-8 p-6 md:p-8 bg-blue-950/40 border-2 border-blue-500/30 rounded-2xl text-blue-100 text-lg md:text-xl flex gap-6 animate-fade-in-up shadow-2xl">
                  <AlertCircle className="w-8 h-8 flex-shrink-0 text-blue-400" />
                  <p className="leading-relaxed font-light">{question.hint}</p>
                </div>
              )}

              {isAnswered && (
                <div className="animate-fade-in-up flex flex-col items-center justify-between gap-10 mt-10 pt-10 border-t border-white/10 md:flex-row">
                  <div className="flex items-center gap-6 w-full md:w-auto">
                     <div className={`p-4 md:p-5 rounded-2xl flex-shrink-0 ${selectedAnswer === question.correctAnswer ? 'bg-green-500/20 text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'bg-red-500/20 text-red-400 shadow-[0_0_30_rgba(239,68,68,0.3)]'}`}>
                        <Zap className="w-8 h-8 md:w-10 md:h-10" />
                     </div>
                     <div>
                        <p className={`text-xl md:text-2xl font-bold mb-2 uppercase font-display tracking-tight ${selectedAnswer === question.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
                          {selectedAnswer === question.correctAnswer ? "Správná analýza" : "Chyba v systému"}
                        </p>
                        <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl">{question.hint}</p>
                     </div>
                  </div>
                  
                  <button
                    onClick={onNextQuestion}
                    className="w-full md:w-auto bg-white text-black hover:bg-cyan-50 px-10 py-5 md:px-14 md:py-6 rounded-2xl font-bold text-sm md:text-lg tracking-widest uppercase shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all duration-500 flex items-center justify-center gap-4 transform hover:-translate-y-2 active:scale-95 font-display"
                  >
                    Pokračovat <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
