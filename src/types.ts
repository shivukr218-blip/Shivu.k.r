export type Language = 'en' | 'hi' | 'kn';

export type PageId =
  | 'home'
  | 'banking'
  | 'savings'
  | 'fraud'
  | 'budget'
  | 'literacy'
  | 'income'
  | 'economics'
  | 'community'
  | 'badges'
  | 'offline'
  | 'contact';

export interface BadgeDef {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  xpReward: number;
  iconName: string;
}

export interface UserProgress {
  completedModules: string[];
  completedLessons: string[];
  quizBestScore: number;
  quizAttempts: number;
  unlockedBadges: string[];
  xp: number;
  streakDays: number;
}

export interface BudgetEntry {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export interface ForumReply {
  id: string;
  author: string;
  village: string;
  text: string;
  timestamp: string;
}

export interface ForumPost {
  id: string;
  author: string;
  village: string;
  category: 'Banking' | 'Fraud Alerts' | 'Farming & Loans' | 'Savings';
  title: string;
  body: string;
  upvotes: number;
  upvotedByMe?: boolean;
  timestamp: string;
  replies: ForumReply[];
}

export interface QuizQuestion {
  id: string;
  scenario: Record<Language, string>;
  options: Record<Language, string[]>;
  correctIndex: number;
  explanation: Record<Language, string>;
}
