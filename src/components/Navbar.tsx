import React from 'react';
import { Home, BookOpen, Calculator, ShieldAlert, Users, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UI_COPY } from '../data/translations';
import type { PageId } from '../types';

const NAV_GROUPS: { id: PageId; key: 'home' | 'learn' | 'tools' | 'fraud' | 'community'; matchPages: PageId[] }[] = [
  { id: 'home', key: 'home', matchPages: ['home'] },
  { id: 'banking', key: 'learn', matchPages: ['banking', 'literacy', 'income', 'economics'] },
  { id: 'savings', key: 'tools', matchPages: ['savings', 'budget'] },
  { id: 'fraud', key: 'fraud', matchPages: ['fraud'] },
  { id: 'community', key: 'community', matchPages: ['community', 'badges', 'offline', 'contact'] },
];

export const Navbar: React.FC = () => {
  const { currentPage, navigate, setEmergencyModalOpen, language } = useApp();
  const copy = UI_COPY[language];

  return (
    <>
      {/* Desktop & Mobile Top Navigation — Strictly 3 Zones, Single Line */}
      <header className="sticky top-0 z-40 h-12 md:h-16 border-b border-neutral-200/80 bg-white/85 backdrop-blur-md dark:border-neutral-800 dark:bg-[#121214]/90">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => navigate('home')}
            className="font-display text-lg md:text-xl font-extrabold tracking-tight text-[#9B111E] dark:text-[#FF5C8A] whitespace-nowrap shrink-0 cursor-pointer"
          >
            GramFin
          </button>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-6 text-sm font-medium">
            {NAV_GROUPS.map((item) => {
              const isActive = item.matchPages.includes(currentPage);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'font-semibold text-[#9B111E] dark:text-[#FF5C8A]'
                      : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'
                  }`}
                >
                  {copy.nav[item.key]}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#9B111E] dark:bg-[#E0115F]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Emergency Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setEmergencyModalOpen(true)}
              className="ruby-pulse-cta rounded-full bg-[#9B111E] px-4 py-2 text-xs md:text-sm font-semibold text-white hover:bg-[#7F0D18] transition-colors whitespace-nowrap shrink-0 min-h-[38px] md:min-h-[42px] cursor-pointer"
            >
              {copy.reportFraudBtn}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar — Compact 52px height to stay <= 15% mobile sticky cap */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 grid h-[52px] grid-cols-5 border-t border-neutral-200 bg-white/95 backdrop-blur-md md:hidden dark:border-neutral-800 dark:bg-[#18181b]/95"
      >
        {[
          { id: 'home' as PageId, label: copy.nav.home, icon: Home, match: ['home'] },
          { id: 'banking' as PageId, label: copy.nav.learn, icon: BookOpen, match: ['banking', 'literacy', 'income', 'economics'] },
          { id: 'savings' as PageId, label: copy.nav.tools, icon: Calculator, match: ['savings', 'budget'] },
          { id: 'fraud' as PageId, label: copy.nav.fraud, icon: ShieldAlert, match: ['fraud'] },
          { id: 'offline' as PageId, label: 'More', icon: Compass, match: ['community', 'badges', 'offline', 'contact'] },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = tab.match.includes(currentPage);
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => navigate(tab.id)}
              className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors ${
                active
                  ? 'text-[#9B111E] dark:text-[#FF5C8A]'
                  : 'text-neutral-500 dark:text-neutral-400'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="truncate max-w-[64px]">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

/* Clean Sub-Page Workspace Switcher rendered inside the page body (not in header) */
export const PageSubNav: React.FC = () => {
  const { currentPage, navigate, language } = useApp();
  const copy = UI_COPY[language];

  const items: { id: PageId; label: string }[] = [
    { id: 'banking', label: copy.pages.banking.title },
    { id: 'savings', label: copy.pages.savings.title },
    { id: 'fraud', label: copy.pages.fraud.title },
    { id: 'budget', label: copy.pages.budget.title },
    { id: 'literacy', label: copy.pages.literacy.title },
    { id: 'income', label: copy.pages.income.title },
    { id: 'economics', label: copy.pages.economics.title },
    { id: 'community', label: copy.pages.community.title },
    { id: 'badges', label: copy.pages.badges.title },
    { id: 'offline', label: copy.pages.offline.title },
    { id: 'contact', label: copy.pages.contact.title },
  ];

  if (currentPage === 'home') return null;

  return (
    <div className="border-b border-neutral-200/80 bg-[#FAFAFA] dark:border-neutral-800 dark:bg-[#161619]">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8 no-scrollbar">
        <button
          type="button"
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-200/70 dark:text-neutral-300 dark:hover:bg-neutral-800 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Home className="h-3.5 w-3.5" />
          {copy.nav.home}
        </button>
        <span className="text-neutral-300 dark:text-neutral-700">/</span>
        {items.map((item) => {
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                active
                  ? 'bg-[#9B111E] text-white'
                  : 'text-neutral-600 hover:bg-neutral-200/60 dark:text-neutral-300 dark:hover:bg-neutral-800'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
