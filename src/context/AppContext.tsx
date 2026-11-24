import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { BADGE_DEFINITIONS } from '../data/modulesData';
import { LANGUAGE_LABELS } from '../data/translations';
import type { Language, PageId, UserProgress } from '../types';

const DEFAULT_PROGRESS: UserProgress = {
  completedModules: [],
  completedLessons: [],
  quizBestScore: 0,
  quizAttempts: 0,
  unlockedBadges: [],
  xp: 0,
  streakDays: 1,
};

interface AppContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentPage: PageId;
  navigate: (page: PageId) => void;
  progress: UserProgress;
  markModuleComplete: (moduleId: string, badgeId?: string) => void;
  toggleLessonComplete: (lessonId: string) => void;
  recordQuizScore: (scorePercent: number) => void;
  unlockBadge: (badgeId: string) => void;
  emergencyModalOpen: boolean;
  setEmergencyModalOpen: (open: boolean) => void;
  assistantOpen: boolean;
  setAssistantOpen: (open: boolean) => void;
  isSpeakingId: string | null;
  speakText: (text: string, id?: string) => void;
  stopSpeaking: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('gramfin_lang');
    return saved === 'hi' || saved === 'kn' || saved === 'en' ? saved : 'en';
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('gramfin_dark') === 'true';
  });

  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);

  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('gramfin_progress');
      if (saved) return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
    } catch {
      // Ignore corrupt storage
    }
    return DEFAULT_PROGRESS;
  });

  // Sync dark mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('gramfin_dark', String(darkMode));
  }, [darkMode]);

  // Persist language
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('gramfin_lang', lang);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeakingId(null);
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  // Persist progress
  useEffect(() => {
    localStorage.setItem('gramfin_progress', JSON.stringify(progress));
  }, [progress]);

  // Register offline Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Silent fail if preview environment blocks SW
      });
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeakingId(null);
  }, []);

  const speakText = useCallback(
    (text: string, id = 'global') => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      if (isSpeakingId === id) {
        window.speechSynthesis.cancel();
        setIsSpeakingId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = LANGUAGE_LABELS[language].speechCode;
      utterance.rate = 0.94;
      utterance.onend = () => setIsSpeakingId(null);
      utterance.onerror = () => setIsSpeakingId(null);
      setIsSpeakingId(id);
      window.speechSynthesis.speak(utterance);
    },
    [isSpeakingId, language]
  );

  const navigate = useCallback(
    (page: PageId) => {
      stopSpeaking();
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [stopSpeaking]
  );

  const unlockBadge = useCallback((badgeId: string) => {
    setProgress((prev) => {
      if (prev.unlockedBadges.includes(badgeId)) return prev;
      const badge = BADGE_DEFINITIONS.find((b) => b.id === badgeId);
      return {
        ...prev,
        unlockedBadges: [...prev.unlockedBadges, badgeId],
        xp: prev.xp + (badge ? badge.xpReward : 100),
      };
    });
  }, []);

  const markModuleComplete = useCallback((moduleId: string, badgeId?: string) => {
    setProgress((prev) => {
      const alreadyDone = prev.completedModules.includes(moduleId);
      const completedModules = alreadyDone ? prev.completedModules : [...prev.completedModules, moduleId];
      let unlockedBadges = prev.unlockedBadges;
      let xpGain = alreadyDone ? 0 : 80;

      if (badgeId && !unlockedBadges.includes(badgeId)) {
        unlockedBadges = [...unlockedBadges, badgeId];
        const badge = BADGE_DEFINITIONS.find((b) => b.id === badgeId);
        xpGain += badge ? badge.xpReward : 100;
      }

      return {
        ...prev,
        completedModules,
        unlockedBadges,
        xp: prev.xp + xpGain,
      };
    });
  }, []);

  const toggleLessonComplete = useCallback((lessonId: string) => {
    setProgress((prev) => {
      const exists = prev.completedLessons.includes(lessonId);
      const completedLessons = exists
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      return {
        ...prev,
        completedLessons,
        xp: prev.xp + (exists ? -25 : 25),
      };
    });
  }, []);

  const recordQuizScore = useCallback((scorePercent: number) => {
    setProgress((prev) => {
      const passed = scorePercent >= 75;
      const hasBadge = prev.unlockedBadges.includes('fraud-fighter');
      const unlockedBadges =
        passed && !hasBadge ? [...prev.unlockedBadges, 'fraud-fighter'] : prev.unlockedBadges;
      return {
        ...prev,
        quizBestScore: Math.max(prev.quizBestScore, scorePercent),
        quizAttempts: prev.quizAttempts + 1,
        unlockedBadges,
        xp: prev.xp + (passed && !hasBadge ? 150 : 20),
      };
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        darkMode,
        toggleDarkMode,
        currentPage,
        navigate,
        progress,
        markModuleComplete,
        toggleLessonComplete,
        recordQuizScore,
        unlockBadge,
        emergencyModalOpen,
        setEmergencyModalOpen,
        assistantOpen,
        setAssistantOpen,
        isSpeakingId,
        speakText,
        stopSpeaking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
