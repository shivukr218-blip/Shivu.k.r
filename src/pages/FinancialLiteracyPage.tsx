import React, { useState } from 'react';
import { BookOpen, FileText, CheckSquare, Square, CheckCircle2, Scale } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VoiceButton } from '../components/VoiceButton';

const LITERACY_LESSONS = [
  {
    id: 'lit-interest',
    title: '01. Simple vs. Compound Interest — Why Starting Early Matters',
    body: 'Simple interest grows only on your original deposit. Compound interest earns "interest on your interest" every quarter. That is why keeping ₹10,000 in a Post Office or Bank FD for 5 years grows faster than keeping cash at home.',
  },
  {
    id: 'lit-loans',
    title: '02. Bank KCC Loan vs. Informal Moneylender Trap',
    body: 'A local moneylender quoting "3% per month" actually charges 36% per year — and often compounds unpaid interest. A Kisan Credit Card (KCC) or Self-Help Group (SHG) bank loan charges 7% per year (only 4% if repaid on time!).',
  },
  {
    id: 'lit-docs',
    title: '03. Organizing Your 5 Essential Financial Documents',
    body: 'Keep clear photocopies and DigiLocker copies of: (1) Aadhaar Card, (2) PAN Card, (3) Bank Passbook first page, (4) Ration Card, and (5) Land Record (Khatauni / 7-12) or SHG membership card.',
  },
];

const ESSENTIAL_DOCS = [
  { name: 'Aadhaar Card', use: 'Identity, PM-KISAN DBT & AePS banking' },
  { name: 'PAN Card', use: 'Required for loans above ₹50,000 & lower TDS on FDs' },
  { name: 'Bank Passbook', use: 'Proof of account, IFSC code & subsidy tracking' },
  { name: 'Land Record / SHG ID', use: 'Needed for 4% KCC crop loans or Mudra credit' },
];

export const FinancialLiteracyPage: React.FC = () => {
  const { language, progress, toggleLessonComplete, markModuleComplete } = useApp();
  const [loanAmount, setLoanAmount] = useState(50000);
  const [moneylenderMonthlyPct, setMoneylenderMonthlyPct] = useState(3);

  const bankAnnualCost = Math.round(loanAmount * 0.04); // 4% effective KCC
  const lenderAnnualCost = Math.round(loanAmount * (moneylenderMonthlyPct / 100) * 12);
  const annualSavings = lenderAnnualCost - bankAnnualCost;

  const doneCount = LITERACY_LESSONS.filter((l) => progress.completedLessons.includes(l.id)).length;
  const pct = Math.round((doneCount / LITERACY_LESSONS.length) * 100);
  const isModuleDone = progress.completedModules.includes('literacy');

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-8 pb-24 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <div>
          <p className="text-xs font-semibold text-[#9B111E] dark:text-[#FF5C8A]">
            Module 05 · Core Financial Education · {pct}% Complete
          </p>
          <h1 className="font-display mt-1 text-3xl font-extrabold text-neutral-900 dark:text-white">
            {language === 'hi' ? 'वित्तीय साक्षरता' : language === 'kn' ? 'ಆರ್ಥಿಕ ಸಾಕ್ಷರತೆ' : 'Financial Literacy'}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-neutral-600 dark:text-neutral-300">
            Understand interest rates, compare bank credit against informal moneylenders, and check off your core KYC papers.
          </p>
        </div>
        <VoiceButton
          text="In this module, learn why a 3 percent monthly moneylender loan costs 36 percent per year, while a Kisan Credit Card bank loan repaid on time costs only 4 percent per year."
          id="literacy-intro-voice"
        />
      </div>

      {/* Interactive Loan Cost Comparison Slider */}
      <section className="rounded-[20px] border border-neutral-200 bg-white p-6 ruby-shadow dark:border-neutral-800 dark:bg-[#1B1B1F]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Scale className="h-5 w-5 text-[#9B111E] dark:text-[#FF5C8A]" />
            <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
              Bank KCC Loan vs. Village Moneylender Cost Calculator
            </h2>
          </div>
          <VoiceButton
            text={`On a loan of ${loanAmount} rupees, a bank KCC loan costs ${bankAnnualCost} rupees interest per year, whereas a moneylender at ${moneylenderMonthlyPct} percent monthly charges ${lenderAnnualCost} rupees. Choosing the bank saves ${annualSavings} rupees every year.`}
            id="loan-compare-voice"
            compact
          />
        </div>

        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-medium">
                <span>Crop / Business Loan Needed</span>
                <span className="font-mono-num font-bold text-[#9B111E] dark:text-[#FF5C8A]">
                  ₹{loanAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={10000}
                max={200000}
                step={5000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="ruby-slider mt-2 w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium">
                <span>Informal Moneylender Monthly Rate</span>
                <span className="font-mono-num font-bold text-[#9B111E] dark:text-[#FF5C8A]">
                  {moneylenderMonthlyPct}% / month ({moneylenderMonthlyPct * 12}% / yr)
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={6}
                step={0.5}
                value={moneylenderMonthlyPct}
                onChange={(e) => setMoneylenderMonthlyPct(Number(e.target.value))}
                className="ruby-slider mt-2 w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
              <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">Bank KCC (4% / yr)</p>
              <p className="font-mono-num mt-1 text-2xl font-extrabold text-emerald-800 dark:text-emerald-300">
                ₹{bankAnnualCost.toLocaleString('en-IN')}
              </p>
              <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400">Interest per year</p>
            </div>
            <div className="rounded-2xl border border-[#9B111E]/30 bg-[#9B111E]/8 p-4 dark:border-[#E0115F]/40 dark:bg-[#E0115F]/15">
              <p className="text-xs font-semibold text-[#9B111E] dark:text-[#FF6B93]">
                Moneylender ({moneylenderMonthlyPct * 12}% / yr)
              </p>
              <p className="font-mono-num mt-1 text-2xl font-extrabold text-[#9B111E] dark:text-[#FF5C8A]">
                ₹{lenderAnnualCost.toLocaleString('en-IN')}
              </p>
              <p className="mt-1 text-xs text-neutral-700 dark:text-neutral-300">
                Saves <strong>₹{annualSavings.toLocaleString('en-IN')}</strong> with a bank!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons with Progress Checkboxes */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
            Core Lessons Checklist ({doneCount}/{LITERACY_LESSONS.length})
          </h2>
          <div className="h-2.5 w-36 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
            <div className="ruby-gradient-bg h-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {LITERACY_LESSONS.map((lesson) => {
          const checked = progress.completedLessons.includes(lesson.id);
          return (
            <div
              key={lesson.id}
              className="rounded-[20px] border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-[#1B1B1F]"
            >
              <div className="flex items-start justify-between gap-3">
                <button
                  type="button"
                  onClick={() => toggleLessonComplete(lesson.id)}
                  className="flex items-start gap-3 text-left cursor-pointer"
                >
                  {checked ? (
                    <CheckSquare className="mt-0.5 h-5 w-5 shrink-0 text-[#9B111E] dark:text-[#FF5C8A]" />
                  ) : (
                    <Square className="mt-0.5 h-5 w-5 shrink-0 text-neutral-400" />
                  )}
                  <div>
                    <h3 className="font-display text-base font-bold text-neutral-900 dark:text-white">
                      {lesson.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                      {lesson.body}
                    </p>
                  </div>
                </button>
                <VoiceButton text={`${lesson.title}. ${lesson.body}`} id={lesson.id} compact />
              </div>
            </div>
          );
        })}
      </section>

      {/* Essential Documents Grid */}
      <section className="rounded-[20px] border border-neutral-200 bg-[#FAFAFA] p-6 dark:border-neutral-800 dark:bg-[#1B1B1F]">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#9B111E] dark:text-[#FF5C8A]" />
          <h2 className="font-display text-lg font-bold text-neutral-900 dark:text-white">
            Essential Financial Documents Guide
          </h2>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {ESSENTIAL_DOCS.map((doc) => (
            <div
              key={doc.name}
              className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-[#141417]"
            >
              <p className="font-display text-sm font-bold text-neutral-900 dark:text-white">{doc.name}</p>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{doc.use}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => markModuleComplete('literacy', 'smart-borrower')}
          disabled={isModuleDone}
          className={`inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white cursor-pointer ${
            isModuleDone ? 'bg-emerald-600' : 'bg-[#9B111E] hover:bg-[#7F0D18]'
          }`}
        >
          {isModuleDone ? <CheckCircle2 className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
          {isModuleDone ? 'Smart Borrower Badge Unlocked' : 'Complete Module & Unlock Smart Borrower Badge'}
        </button>
      </div>
    </div>
  );
};
