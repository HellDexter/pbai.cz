
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { courseData, aiCourseData, cyberVideos, aiVideos } from './data';
import { QuizState, UserProfile } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import CyberMenu from './components/CyberMenu';
import AiMenu from './components/AiMenu';
import PresentationScreen from './components/PresentationScreen';
import PresentationDetailScreen from './components/PresentationDetailScreen';
import AuditScreen from './components/AuditScreen';
import VideoScreen from './components/VideoScreen';
import SecurityScanner from './components/SecurityScanner';
import CyberNews from './components/CyberNews';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import { supabase } from './supabaseClient';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

type View = 'login' | 'dashboard' | 'cyber_menu' | 'ai_menu' | 'quizzes' | 'presentations' | 'presentation_detail' | 'practical_exercises' | 'videos' | 'quiz' | 'result' | 'security_scanner' | 'cyber_news';
type Module = 'cyber' | 'ai';
type AuthStatus = 'initializing' | 'authenticated' | 'unauthenticated' | 'syncing';

const GridBeams: React.FC = () => {
  const [beams, setBeams] = useState<{ id: number; type: 'h' | 'v'; pos: number; delay: number; duration: number; color: string }[]>([]);

  useEffect(() => {
    const newBeams = [];
    const GRID_SIZE = 60;
    const colors = ['emerald', 'purple', 'rose'];
    for (let i = 0; i < 3; i++) {
      newBeams.push({
        id: i, type: 'h' as const, pos: Math.floor(Math.random() * 15) * GRID_SIZE,
        delay: Math.random() * 15, duration: 8 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    for (let i = 0; i < 3; i++) {
      newBeams.push({
        id: i + 100, type: 'v' as const, pos: Math.floor(Math.random() * 30) * GRID_SIZE,
        delay: Math.random() * 15, duration: 8 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    setBeams(newBeams);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {beams.map((beam) => (
        <div
          key={beam.id}
          className={`grid-beam ${beam.type === 'h' ? 'grid-beam-h' : 'grid-beam-v'} grid-beam-${beam.color}`}
          style={{
            [beam.type === 'h' ? 'top' : 'left']: `${beam.pos}px`,
            animationDelay: `${beam.delay}s`,
            animationDuration: `${beam.duration}s`
          }}
        ></div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('initializing');
  const [currentView, setCurrentView] = useState<View>('login');
  const [activeModule, setActiveModule] = useState<Module>('cyber');
  const [selectedPresentationId, setSelectedPresentationId] = useState<number | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const syncingRef = useRef<boolean>(false);
  const userIdRef = useRef<string | null>(null);

  const [quizState, setQuizState] = useState<QuizState>({
    currentBlockId: null,
    currentQuestionIndex: 0,
    score: 0,
    showHint: false,
    selectedAnswer: null,
    isFinished: false,
    answersHistory: []
  });

  const syncProfile = useCallback(async (userId: string) => {
    if (syncingRef.current) return;
    syncingRef.current = true;
    setAuthStatus('syncing');

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        userIdRef.current = userId;
        setUserProfile(data as UserProfile);
        setAuthStatus('authenticated');
        setCurrentView(prev => prev === 'login' ? 'dashboard' : prev);
      } else {
        await supabase.auth.signOut();
        setAuthStatus('unauthenticated');
        setCurrentView('login');
      }
    } catch (err) {
      setAuthStatus('unauthenticated');
      setCurrentView('login');
    } finally {
      syncingRef.current = false;
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      if (session?.user) {
        await syncProfile(session.user.id);
      } else {
        setAuthStatus('unauthenticated');
        setCurrentView('login');
      }
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (!mounted) return;
        if (session?.user) {
          if (userIdRef.current !== session.user.id) {
            await syncProfile(session.user.id);
          }
        } else {
          userIdRef.current = null;
          setUserProfile(null);
          setAuthStatus('unauthenticated');
          setCurrentView('login');
        }
      });
      return subscription;
    };
    const authPromise = initAuth();
    return () => {
      mounted = false;
      authPromise.then(sub => sub?.unsubscribe());
    };
  }, [syncProfile]);

  const handleLogout = async () => {
    try {
      setAuthStatus('initializing');
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      userIdRef.current = null;
      setUserProfile(null);
      setAuthStatus('unauthenticated');
      setCurrentView('login');
    }
  };

  const startBlock = (blockId: number) => {
    setQuizState({
      currentBlockId: blockId,
      currentQuestionIndex: 0,
      score: 0,
      showHint: false,
      selectedAnswer: null,
      isFinished: false,
      answersHistory: []
    });
    setCurrentView('quiz');
  };

  const startPresentation = (blockId: number) => {
    setSelectedPresentationId(blockId);
    setCurrentView('presentation_detail');
  };

  if (authStatus === 'initializing' || authStatus === 'syncing') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#050505] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="flex flex-col items-center gap-6 z-10">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-2 border-cyan-500/10 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-cyan-500 font-mono text-sm tracking-[0.3em] font-bold animate-pulse uppercase">Syncing</div>
        </div>
      </div>
    );
  }


  const currentModuleData = activeModule === 'cyber' ? courseData : aiCourseData;
  const currentVideos = activeModule === 'cyber' ? cyberVideos : aiVideos;

  let content;
  switch (currentView) {
    case 'login': content = <LoginScreen onLoginSuccess={() => { }} />; break;
    case 'dashboard': content = <Dashboard onNavigate={(m) => { setActiveModule(m); setCurrentView(m === 'cyber' ? 'cyber_menu' : 'ai_menu'); }} userProfile={userProfile} onLogout={handleLogout} />; break;
    case 'cyber_menu': content = <CyberMenu onNavigate={(v) => setCurrentView(v)} onBack={() => setCurrentView('dashboard')} onSelectPresentation={startPresentation} />; break;
    case 'ai_menu': content = <AiMenu onNavigate={(v) => setCurrentView(v)} onBack={() => setCurrentView('dashboard')} />; break;
    case 'quizzes': content = <WelcomeScreen blocks={currentModuleData} onStartBlock={startBlock} onBack={() => setCurrentView(activeModule === 'cyber' ? 'cyber_menu' : 'ai_menu')} theme={activeModule === 'cyber' ? 'emerald' : 'purple'} />; break;
    case 'presentations': content = <PresentationScreen blocks={currentModuleData} onSelectBlock={startPresentation} onBack={() => setCurrentView(activeModule === 'cyber' ? 'cyber_menu' : 'ai_menu')} />; break;
    case 'presentation_detail':
      const pBlock = currentModuleData.find(b => b.id === selectedPresentationId);
      if (pBlock) {
        content = <PresentationDetailScreen block={pBlock} onBack={() => setCurrentView(activeModule === 'cyber' ? 'cyber_menu' : 'ai_menu')} theme={activeModule === 'cyber' ? 'cyan' : 'purple'} />;
      }
      break;
    case 'practical_exercises': content = <AuditScreen onBack={() => setCurrentView(activeModule === 'cyber' ? 'cyber_menu' : 'ai_menu')} />; break;
    case 'videos': content = <VideoScreen onBack={() => setCurrentView(activeModule === 'cyber' ? 'cyber_menu' : 'ai_menu')} />; break;
    case 'security_scanner': content = <SecurityScanner onBack={() => setCurrentView('cyber_menu')} />; break;
    case 'cyber_news': content = <CyberNews onBack={() => setCurrentView('cyber_menu')} />; break;
    case 'quiz':
      const qBlock = currentModuleData.find(b => b.id === quizState.currentBlockId);
      if (qBlock) {
        content = <QuizScreen block={qBlock} currentQuestionIndex={quizState.currentQuestionIndex} question={qBlock.questions[quizState.currentQuestionIndex]} selectedAnswer={quizState.selectedAnswer} showHint={quizState.showHint}
          onSelectAnswer={(idx) => {
            const currentQuestion = qBlock.questions[quizState.currentQuestionIndex];
            const isCorrect = idx === currentQuestion.correctAnswer;
            setQuizState(prev => ({
              ...prev,
              selectedAnswer: idx,
              score: isCorrect ? prev.score + 1 : prev.score,
              answersHistory: [...prev.answersHistory, isCorrect]
            }));
          }}
          onToggleHint={() => setQuizState(prev => ({ ...prev, showHint: !prev.showHint }))}
          onNextQuestion={() => {
            if (quizState.currentQuestionIndex + 1 < qBlock.questions.length) {
              setQuizState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1, selectedAnswer: null, showHint: false }));
            } else {
              setQuizState(prev => ({ ...prev, isFinished: true }));
              setCurrentView('result');
            }
          }}
          onBackToMenu={() => setCurrentView('quizzes')} />;
      }
      break;
    case 'result':
      const rBlock = currentModuleData.find(b => b.id === quizState.currentBlockId);
      if (rBlock) {
        content = <ResultScreen score={quizState.score} totalQuestions={rBlock.questions.length} onRestart={() => startBlock(quizState.currentBlockId!)} onBackToMenu={() => setCurrentView('quizzes')} />;
      }
      break;
    default: content = <LoginScreen onLoginSuccess={() => { }} />;
  }

  return (
    <ThemeProvider>
      <div className="relative min-h-screen w-full bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-gray-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-800 dark:selection:text-cyan-200 font-inter flex flex-col transition-colors duration-300">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-30 pointer-events-none fixed"></div>
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <GridBeams />
        <div className="relative z-10 w-full flex-grow">{content}</div>
        <div className="relative z-20"><Footer /></div>
        <CookieConsent />
      </div>
    </ThemeProvider>
  );
};

export default App;
