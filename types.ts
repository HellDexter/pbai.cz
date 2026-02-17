
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
}

export interface Block {
  id: number;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
  gammaUrl?: string; // Optional URL for Gamma.app presentation
}

export interface Video {
  id: number;
  title: string;
  description: string;
  youtubeId: string;
}

export interface QuizState {
  currentBlockId: number | null;
  currentQuestionIndex: number;
  score: number;
  showHint: boolean;
  selectedAnswer: number | null;
  isFinished: boolean;
  answersHistory: boolean[]; // tracks correct/incorrect for summary
}

export interface UserProfile {
  id: string;
  email: string;
  access_cyber: boolean;
  access_ai: boolean;
  is_admin: boolean;
}
