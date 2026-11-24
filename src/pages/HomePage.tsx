import React, { useEffect, useState } from 'react';
import {
  PhoneCall,
  Pause,
  Play,
  ArrowRight,
  Sun,
  Moon,
  Landmark,
  PiggyBank,
  ShieldAlert,
  PieChart,
  BookOpen,
  Sprout,
  TrendingUp,
  Users,
  Award,
  WifiOff,
  Globe,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { QUICK_MODULES } from '../data/modulesData';
import { LANGUAGE_LABELS, SCAM_TICKER_ALERTS, UI_COPY } from '../data/translations';
import type { Language } from '../types';
import { VoiceButton } from '../components/VoiceButton';
import { PWAInstallButton } from '../components/PWAInstallBanner';

const MODULE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Landmark,
  PiggyBank,
  ShieldAlert,
  PieChart,
  BookOpen,
  Sprout,
  TrendingUp,
  Users,
  Award,
  WifiOff,
  PhoneCall,
};

function useCountUp(target: number, durationMs = 1100) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    let rafId = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(target * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, durationMs]);
  return val;
}

export const HomePage: React.FC = () => {
  const {
    language,
    setLanguage,
    darkMode,
    toggleDarkMode,
    navigate,
    setEmergencyModalOpen,
    progress,
  } = useApp();
  const copy = UI_COPY[language];
  const [tickerPaused, setTickerPaused] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);

  const households = useCountUp(48250);
  const savingsCr = useCountUp(146);
  const quizzes = useCountUp(92400);

  const tickerItems = SCAM_TICKER_ALERTS[language];

  return (
    <div className="space-y-14 pb-20 md:pb-14">
      {/* Hero Section with Subtle Grain & Utility Toolbar */}
      <section className="hero-grain border-b border-neutral-200/80 bg-[#FAFAFA] dark:border-neutral-800 dark:bg-[#151518]">
        <div className="mx-auto max-w-7xl px-4 pt-5 pb-12 sm:px-6 lg:px-8 lg:pt-8 lg:pb-16">
          {/* Workspace Utility Bar (Language, Dark Mode, Offline Install) */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200/70 pb-4 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <img
                src="/src/assets/images/gramfin_app_icon_1795460158063.jpg"
                alt="GramFin shield emblem"
                referrerPolicy="no-referrer"
                className="h-8 w-8 rounded-lg border border-neutral-200 object-cover dark:border-neutral-700"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {copy.brandTagline}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Language Switcher */}
              <div
                role="group"
                aria-label="Language Selector"
                className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1 dark:border-neutral-700 dark:bg-[#1B1B1F]"
              >
                <Globe className="ml-2 h-3.5 w-3.5 text-[#9B111E] dark:text-[#FF5C8A]" />
                {(['en', 'hi', 'kn'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      language === lang
                        ? 'bg-[#9B111E] text-white'
                        : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'
                    }`}
                  >
                    {LANGUAGE_LABELS[lang].short}
                  </button>
                ))}
              </div>

              {/* Dark Mode Toggle */}
              <button
                type="button"
                onClick={toggleDarkMode}
                aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 hover:border-[#9B111E] dark:border-neutral-700 dark:bg-[#1B1B1F] dark:text-neutral-200 cursor-pointer"
              >
                {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
              </button>

              <PWAInstallButton />
            </div>
          </div>

          {/* 2-Column Hero Split (items-stretch for balanced proportions) */}
          <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col justify-center lg:col-span-7"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold tracking-wide text-[#9B111E] dark:text-[#FF6B93]">
                  Rural Financial Literacy · Offline-Ready · Voice Guided
                </span>
                <VoiceButton text={`${copy.heroHeadline} ${copy.heroSubhead}`} id="hero-voice" />
              </div>

              <h1
                style={{ textWrap: 'balance' }}
                className="ruby-gradient-text font-display mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
              >
                {copy.heroHeadline}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-700 sm:text-lg dark:text-neutral-300">
                {copy.heroSubhead}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => navigate('banking')}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#9B111E] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#7F0D18] transition-colors whitespace-nowrap cursor-pointer"
                >
                  {copy.exploreModulesBtn}
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setEmergencyModalOpen(true)}
                  className="ruby-pulse-cta inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#9B111E] bg-white px-6 py-3 text-sm font-semibold text-[#9B111E] hover:bg-[#9B111E]/5 dark:border-[#E0115F] dark:bg-[#1B1B1F] dark:text-[#FF6B93] whitespace-nowrap cursor-pointer"
                >
                  <ShieldAlert className="h-4 w-4" />
                  {copy.reportFraudBtn}
                </button>
              </div>

              {/* Compact Progress Strip */}
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                <span>
                  Your Progress: <strong className="font-mono-num text-neutral-900 dark:text-white">{progress.completedModules.length}/6</strong> core modules
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  <strong className="font-mono-num text-[#9B111E] dark:text-[#FF5C8A]">{progress.xp} XP</strong> earned
                </span>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() => navigate('badges')}
                  className="font-semibold text-[#9B111E] underline-offset-4 hover:underline dark:text-[#FF5C8A] cursor-pointer"
                >
                  View Badges ({progress.unlockedBadges.length}/6)
                </button>
              </div>
            </motion.div>

            {/* Right Column Editorial Photography */}
            <div className="lg:col-span-5">
              <div className="relative h-full min-h-[260px] overflow-hidden rounded-[20px] border border-neutral-200 bg-neutral-100 ruby-shadow dark:border-neutral-800 dark:bg-[#1B1B1F]">
                {!heroImgError ? (
                  <img
                    src="/src/assets/images/hero_rural_banking_1795460159227.jpg"
                    alt="Rural woman shopkeeper checking digital banking passbook on her smartphone"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgError(true)}
                    className="h-full w-full object-cover lg:h-full"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-[#9B111E]/10 to-white p-8 text-center dark:from-[#9B111E]/20 dark:to-[#1B1B1F]">
                    <Landmark className="h-12 w-12 text-[#9B111E]" />
                    <p className="mt-3 font-display text-lg font-bold text-neutral-900 dark:text-white">
                      Safe Digital Banking for Rural India
                    </p>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent p-5 text-white">
                  <p className="text-xs font-medium text-white/85">Verified Safe Practices · Zero Hidden Jargon</p>
                  <p className="mt-0.5 font-display text-base font-bold">
                    Check passbooks, calculate interest &amp; spot fake SMS links in seconds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Click-to-Call Helplines: 1930 & 14440 */}
      <section aria-label="Emergency Toll-Free Helplines" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          <a
            href="tel:1930"
            className="group flex items-center justify-between gap-4 rounded-[20px] bg-[#9B111E] p-6 text-white ruby-shadow transition-transform hover:-translate-y-0.5"
          >
            <div>
              <p className="text-xs font-medium text-white/85">National Cyber Crime Helpline · 24x7</p>
              <h2 className="font-display mt-1 text-xl font-bold sm:text-2xl">{copy.helpline1930Title}</h2>
              <p className="mt-1.5 text-sm text-white/90">{copy.helpline1930Desc}</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
                <PhoneCall className="h-4 w-4" />
                <span className="font-mono-num text-base font-bold">1930</span>
                <span>— {copy.callNow}</span>
              </div>
            </div>
            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 sm:flex">
              <PhoneCall className="h-8 w-8" />
            </div>
          </a>

          <a
            href="tel:14440"
            className="group flex items-center justify-between gap-4 rounded-[20px] border border-neutral-200 bg-white p-6 text-neutral-900 ruby-shadow transition-all hover:border-[#9B111E] hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-[#1B1B1F] dark:text-white dark:hover:border-[#E0115F]"
          >
            <div>
              <p className="text-xs font-medium text-[#9B111E] dark:text-[#FF6B93]">Reserve Bank of India · Sachet</p>
              <h2 className="font-display mt-1 text-xl font-bold sm:text-2xl">{copy.helpline14440Title}</h2>
              <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-300">{copy.helpline14440Desc}</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#9B111E]/10 px-4 py-2 text-sm font-semibold text-[#9B111E] dark:bg-[#E0115F]/20 dark:text-[#FF6B93]">
                <PhoneCall className="h-4 w-4" />
                <span className="font-mono-num text-base font-bold">14440</span>
                <span>— {copy.callNow}</span>
              </div>
            </div>
            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#9B111E]/10 text-[#9B111E] sm:flex dark:bg-[#E0115F]/20 dark:text-[#FF6B93]">
              <Landmark className="h-8 w-8" />
            </div>
          </a>
        </div>
      </section>

      {/* Live "Weekly Scam Alert" SMS-Style Ticker */}
      <section aria-label="Weekly Scam Alerts" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col overflow-hidden rounded-[20px] border border-[#9B111E]/25 bg-[#FAFAFA] sm:flex-row sm:items-center dark:border-[#E0115F]/30 dark:bg-[#1B1B1F]">
          <div className="flex shrink-0 items-center justify-between gap-3 bg-[#9B111E] px-4 py-3 text-white">
            <span className="text-xs font-bold tracking-wide whitespace-nowrap">{copy.tickerLabel}</span>
            <button
              type="button"
              onClick={() => setTickerPaused(!tickerPaused)}
              aria-label={tickerPaused ? copy.playTicker : copy.pauseTicker}
              className="rounded-full bg-white/15 p-1.5 hover:bg-white/25 cursor-pointer"
            >
              {tickerPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            </button>
          </div>
          <div className="relative flex-1 overflow-hidden py-3">
            <div className={`animate-scam-ticker ${tickerPaused ? 'paused' : ''}`}>
              {[...tickerItems, ...tickerItems].map((alert, idx) => (
                <span
                  key={idx}
                  className="mx-6 inline-block text-sm font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap"
                >
                  {alert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Animated Impact Counters */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-[20px] border border-neutral-200 bg-white p-6 sm:grid-cols-3 dark:border-neutral-800 dark:bg-[#1B1B1F]">
          <div className="border-b border-neutral-100 pb-4 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6 dark:border-neutral-800">
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{copy.statFamilies}</p>
            <p className="font-mono-num mt-1 text-3xl font-bold text-[#9B111E] dark:text-[#FF5C8A]">
              {households.toLocaleString('en-IN')}+
            </p>
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">Across 140+ village panchayats</p>
          </div>
          <div className="border-b border-neutral-100 pb-4 sm:border-b-0 sm:border-r sm:pb-0 sm:px-6 dark:border-neutral-800">
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{copy.statSavings}</p>
            <p className="font-mono-num mt-1 text-3xl font-bold text-neutral-900 dark:text-white">
              ₹{(savingsCr / 10).toFixed(1)} Cr
            </p>
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">Tracked via Emergency Fund &amp; RD tools</p>
          </div>
          <div className="sm:pl-6">
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{copy.statQuizzes}</p>
            <p className="font-mono-num mt-1 text-3xl font-bold text-neutral-900 dark:text-white">
              {quizzes.toLocaleString('en-IN')}+
            </p>
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">Fake KYC &amp; UPI traps spotted in practice</p>
          </div>
        </div>
      </section>

      {/* Quick Module Grid (All 11 Modules + Voice Hint) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl dark:text-white">
                {copy.quickModulesTitle}
              </h2>
              <VoiceButton
                text={`${copy.quickModulesTitle}. ${copy.quickModulesSub}`}
                id="modules-heading-voice"
                compact
              />
            </div>
            <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">{copy.quickModulesSub}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_MODULES.map((mod, idx) => {
            const Icon = MODULE_ICONS[mod.iconName] || BookOpen;
            const isCompleted = progress.completedModules.includes(mod.id);
            const title = mod.title[language];
            const summary = mod.summary[language];
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                onClick={() => navigate(mod.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(mod.id);
                  }
                }}
                className="group relative flex cursor-pointer flex-col justify-between rounded-[20px] border border-neutral-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#9B111E] hover:shadow-lg dark:border-neutral-800 dark:bg-[#1B1B1F] dark:hover:border-[#E0115F]"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#9B111E]/10 text-[#9B111E] dark:bg-[#E0115F]/15 dark:text-[#FF6B93]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <VoiceButton text={`${title}. ${summary}`} id={`card-${mod.id}`} compact />
                  </div>

                  {/* Clean Unboxed Metadata (Zero-Pill Rule) */}
                  <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <span>{mod.category[language]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{mod.duration}</span>
                    {isCompleted && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-emerald-700 dark:text-emerald-400">Completed</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-display mt-1.5 text-lg font-bold text-neutral-900 group-hover:text-[#9B111E] dark:text-white dark:group-hover:text-[#FF6B93]">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {summary}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-3 text-xs font-semibold text-[#9B111E] dark:border-neutral-800 dark:text-[#FF6B93]">
                  <span className="opacity-80 group-hover:opacity-100">{copy.voiceHintText}</span>
                  <span className="inline-flex items-center gap-1">
                    Open
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
