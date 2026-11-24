import React from 'react';
import { Award, CheckCircle2, Lock, ArrowRight, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BADGE_DEFINITIONS } from '../data/modulesData';
import type { PageId } from '../types';
import { VoiceButton } from '../components/VoiceButton';

const BADGE_ROUTE_MAP: Record<string, PageId> = {
  'first-step-banking': 'banking',
  'fraud-fighter': 'fraud',
  'first-step-saver': 'savings',
  'budget-master': 'budget',
  'smart-borrower': 'literacy',
  'village-guardian': 'community',
};

export const GamificationPage: React.FC = () => {
  const { language, progress, navigate } = useApp();
  const totalBadges = BADGE_DEFINITIONS.length;
  const unlockedCount = progress.unlockedBadges.length;
  const pct = Math.round((unlockedCount / totalBadges) * 100);

  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-8 pb-24 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <div>
          <p className="text-xs font-semibold text-[#9B111E] dark:text-[#FF5C8A]">
            Module 09 · Progress &amp; Achievements
          </p>
          <h1 className="font-display mt-1 text-3xl font-extrabold text-neutral-900 dark:text-white">
            {language === 'hi' ? 'आपकी प्रगति और बैज' : language === 'kn' ? 'ಪ್ರಗತಿ ಮತ್ತು ಬ್ಯಾಡ್ಜ್‌ಗಳು' : 'Learning Progress & Badges'}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-neutral-600 dark:text-neutral-300">
            All badges, quiz scores, and XP are saved directly on your phone so your progress stays safe even offline.
          </p>
        </div>
        <VoiceButton
          text={`You have earned ${progress.xp} XP points and unlocked ${unlockedCount} out of ${totalBadges} GramFin literacy badges. Your best fraud quiz score is ${progress.quizBestScore} percent.`}
          id="gamification-voice"
        />
      </div>

      {/* Progress Ring Hero Summary */}
      <section className="flex flex-col items-center justify-between gap-6 rounded-[20px] border border-neutral-200 bg-white p-6 ruby-shadow sm:flex-row dark:border-neutral-800 dark:bg-[#1B1B1F]">
        <div className="flex items-center gap-6">
          <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
            <svg className="h-36 w-36 -rotate-90" viewBox="0 0 140 140">
              <defs>
                <linearGradient id="rubyRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E0115F" />
                  <stop offset="100%" stopColor="#9B111E" />
                </linearGradient>
              </defs>
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="transparent"
                stroke="currentColor"
                strokeWidth="12"
                className="text-neutral-200 dark:text-neutral-800"
              />
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="transparent"
                stroke="url(#rubyRingGrad)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute text-center">
              <p className="font-mono-num text-2xl font-extrabold text-[#9B111E] dark:text-[#FF5C8A]">{pct}%</p>
              <p className="text-[11px] font-medium text-neutral-500">Mastery</p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">
              {unlockedCount === totalBadges ? 'Village Financial Champion!' : 'Keep Building Financial Confidence'}
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
              {unlockedCount} of {totalBadges} badges unlocked · {progress.completedModules.length} modules finished
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
              <span className="font-mono-num font-bold text-[#9B111E] dark:text-[#FF5C8A]">
                {progress.xp} XP Total
              </span>
              <span className="inline-flex items-center gap-1 font-medium text-neutral-700 dark:text-neutral-300">
                <Flame className="h-4 w-4 text-amber-500" />
                {progress.streakDays}-Day Learning Streak
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-[#FAFAFA] px-5 py-4 text-center dark:border-neutral-800 dark:bg-[#141417]">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Best Fraud Quiz Score</p>
          <p className="font-mono-num mt-1 text-3xl font-extrabold text-neutral-900 dark:text-white">
            {progress.quizBestScore}%
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{progress.quizAttempts} attempts</p>
        </div>
      </section>

      {/* Badge Grid */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {BADGE_DEFINITIONS.map((badge) => {
          const unlocked = progress.unlockedBadges.includes(badge.id);
          const targetPage = BADGE_ROUTE_MAP[badge.id] || 'home';
          return (
            <div
              key={badge.id}
              className={`flex flex-col justify-between rounded-[20px] border p-5 transition-all ${
                unlocked
                  ? 'border-[#9B111E]/35 bg-white ruby-shadow dark:border-[#E0115F]/40 dark:bg-[#1B1B1F]'
                  : 'border-neutral-200 bg-[#FAFAFA] opacity-85 dark:border-neutral-800 dark:bg-[#161619]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      unlocked
                        ? 'ruby-gradient-bg text-white'
                        : 'bg-neutral-200 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'
                    }`}
                  >
                    {unlocked ? <Award className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
                  </div>
                  <span className="font-mono-num text-xs font-bold text-[#9B111E] dark:text-[#FF5C8A]">
                    +{badge.xpReward} XP
                  </span>
                </div>

                <h3 className="font-display mt-4 text-lg font-bold text-neutral-900 dark:text-white">
                  {badge.title[language]}
                </h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                  {badge.description[language]}
                </p>
              </div>

              <div className="mt-5 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                {unlocked ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    Unlocked
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate(targetPage)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#9B111E] hover:underline dark:text-[#FF5C8A] cursor-pointer"
                  >
                    Complete module to unlock
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
