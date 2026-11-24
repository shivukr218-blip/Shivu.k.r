/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar, PageSubNav } from './components/Navbar';
import { EmergencyModal } from './components/EmergencyModal';
import { AIAssistant } from './components/AIAssistant';
import { OfflineIndicator } from './components/PWAInstallBanner';
import { HomePage } from './pages/HomePage';
import { BankingBasicsPage } from './pages/BankingBasicsPage';
import { SavingsToolsPage } from './pages/SavingsToolsPage';
import { FraudHubPage } from './pages/FraudHubPage';
import { MoneyManagementPage } from './pages/MoneyManagementPage';
import { FinancialLiteracyPage } from './pages/FinancialLiteracyPage';
import { IncomeDiversificationPage } from './pages/IncomeDiversificationPage';
import { EconomicsPage } from './pages/EconomicsPage';
import { CommunityForumPage } from './pages/CommunityForumPage';
import { GamificationPage } from './pages/GamificationPage';
import { OfflineHubPage } from './pages/OfflineHubPage';
import { ContactHelpPage } from './pages/ContactHelpPage';

const GramFinShell: React.FC = () => {
  const { currentPage, navigate, setEmergencyModalOpen } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'banking':
        return <BankingBasicsPage />;
      case 'savings':
        return <SavingsToolsPage />;
      case 'fraud':
        return <FraudHubPage />;
      case 'budget':
        return <MoneyManagementPage />;
      case 'literacy':
        return <FinancialLiteracyPage />;
      case 'income':
        return <IncomeDiversificationPage />;
      case 'economics':
        return <EconomicsPage />;
      case 'community':
        return <CommunityForumPage />;
      case 'badges':
        return <GamificationPage />;
      case 'offline':
        return <OfflineHubPage />;
      case 'contact':
        return <ContactHelpPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 dark:bg-[#121214] dark:text-neutral-100">
      <Navbar />
      <PageSubNav />

      <main className="flex-1">{renderPage()}</main>

      <footer className="border-t border-neutral-200 bg-[#FAFAFA] py-8 pb-20 md:pb-8 dark:border-neutral-800 dark:bg-[#151518]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <p className="font-display text-base font-extrabold text-[#9B111E] dark:text-[#FF5C8A]">GramFin</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Rural Financial Literacy &amp; Fraud Protection · Helpline{' '}
              <a href="tel:1930" className="font-mono-num font-bold underline">1930</a> &amp;{' '}
              <a href="tel:14440" className="font-mono-num font-bold underline">14440</a>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-neutral-600 dark:text-neutral-300">
            <button type="button" onClick={() => navigate('offline')} className="hover:text-[#9B111E] cursor-pointer">
              Offline Hub
            </button>
            <button type="button" onClick={() => navigate('badges')} className="hover:text-[#9B111E] cursor-pointer">
              My Badges
            </button>
            <button type="button" onClick={() => navigate('contact')} className="hover:text-[#9B111E] cursor-pointer">
              Contact &amp; Help
            </button>
            <button
              type="button"
              onClick={() => setEmergencyModalOpen(true)}
              className="font-semibold text-[#9B111E] dark:text-[#FF5C8A] cursor-pointer"
            >
              Report Fraud
            </button>
          </div>
        </div>
      </footer>

      <EmergencyModal />
      <AIAssistant />
      <OfflineIndicator />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <GramFinShell />
    </AppProvider>
  );
}
