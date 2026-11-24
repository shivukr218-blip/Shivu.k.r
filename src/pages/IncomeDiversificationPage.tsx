import React, { useState } from 'react';
import { Sprout, IndianRupee, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VoiceButton } from '../components/VoiceButton';

interface SideBusiness {
  id: string;
  name: string;
  startupCost: number;
  monthlyRevenue: number;
  monthlyExpense: number;
  breakEvenMonths: number;
  scheme: string;
  summary: string;
}

const BUSINESS_IDEAS: SideBusiness[] = [
  {
    id: 'poultry',
    name: 'Backyard Desi Poultry (25–30 Birds)',
    startupCost: 8500,
    monthlyRevenue: 7200,
    monthlyExpense: 2600,
    breakEvenMonths: 2,
    scheme: 'NRLM Pashu Sakhi / NABARD Poultry Subsidy',
    summary: 'Low-shelter backyard egg & meat unit using kitchen scraps plus balanced feed. Steady weekly cash flow.',
  },
  {
    id: 'kitchen-garden',
    name: 'Organic Kitchen Garden & Nursery',
    startupCost: 3500,
    monthlyRevenue: 5400,
    monthlyExpense: 1100,
    breakEvenMonths: 1,
    scheme: 'PM-KUSUM / State Horticulture Seed Kit',
    summary: 'Grow spinach, tomatoes, chillies, and marigold seedlings near home. Cuts household food bills and sells surplus at weekly haat.',
  },
  {
    id: 'dairy-compost',
    name: '1-Buffalo Dairy + Vermicompost Pit',
    startupCost: 42000,
    monthlyRevenue: 15500,
    monthlyExpense: 6800,
    breakEvenMonths: 5,
    scheme: 'Dairy Entrepreneurship / Mudra Shishu Loan',
    summary: 'Pair daily milk collection with organic vermicompost manure bags sold to nearby vegetable farmers.',
  },
  {
    id: 'tailoring',
    name: 'Village Tailoring & School Uniform Unit',
    startupCost: 14000,
    monthlyRevenue: 9500,
    monthlyExpense: 2000,
    breakEvenMonths: 2,
    scheme: 'PM Vishwakarma Tailor Toolkit & 5% Loan',
    summary: 'Home-based stitching for women’s blouses, school uniforms, and festival alterations.',
  },
];

export const IncomeDiversificationPage: React.FC = () => {
  const { language } = useApp();
  const [selectedId, setSelectedId] = useState<string>('poultry');
  const [scaleUnits, setScaleUnits] = useState(1);
  const [imgError, setImgError] = useState(false);

  const activeBiz = BUSINESS_IDEAS.find((b) => b.id === selectedId) || BUSINESS_IDEAS[0];
  const monthlyProfit = (activeBiz.monthlyRevenue - activeBiz.monthlyExpense) * scaleUnits;
  const totalStartup = activeBiz.startupCost * scaleUnits;

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 pb-24 sm:px-6 lg:px-8">
      <div className="grid items-stretch gap-8 border-b border-neutral-200 pb-8 lg:grid-cols-12 dark:border-neutral-800">
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="text-xs font-semibold text-[#9B111E] dark:text-[#FF5C8A]">
            Module 06 · Rural Livelihoods &amp; Side Income
          </p>
          <div className="mt-1 flex items-center gap-3">
            <h1 className="font-display text-3xl font-extrabold text-neutral-900 dark:text-white">
              {language === 'hi'
                ? 'अतिरिक्त कमाई के साधन'
                : language === 'kn'
                  ? 'ಹೆಚ್ಚುವರಿ ಆದಾಯದ ಮಾರ್ಗಗಳು'
                  : 'Income Diversification'}
            </h1>
            <VoiceButton
              text="Never depend on a single seasonal crop alone. Explore backyard poultry, kitchen gardens, dairy with vermicompost, or village tailoring to create steady weekly cash flow."
              id="income-intro-voice"
              compact
            />
          </div>
          <p className="mt-2 text-base text-neutral-600 dark:text-neutral-300">
            Compare startup costs, monthly net profits, and zero-collateral government schemes for practical village side businesses.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="h-52 overflow-hidden rounded-[20px] border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-[#1B1B1F]">
            {!imgError ? (
              <img
                src="/src/assets/images/income_poultry_garden_1795460158233.jpg"
                alt="Rural homestead with backyard poultry and kitchen vegetable garden"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Sprout className="h-10 w-10 text-[#9B111E]" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Business Cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {BUSINESS_IDEAS.map((biz) => {
          const isSelected = biz.id === selectedId;
          const profit = biz.monthlyRevenue - biz.monthlyExpense;
          return (
            <div
              key={biz.id}
              onClick={() => {
                setSelectedId(biz.id);
                setScaleUnits(1);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedId(biz.id);
                }
              }}
              className={`cursor-pointer rounded-[20px] border p-6 transition-all ${
                isSelected
                  ? 'border-[#9B111E] bg-[#9B111E]/5 ruby-shadow dark:border-[#E0115F] dark:bg-[#E0115F]/10'
                  : 'border-neutral-200 bg-white hover:border-[#9B111E]/60 dark:border-neutral-800 dark:bg-[#1B1B1F]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {biz.scheme}
                  </span>
                  <h2 className="font-display mt-1 text-lg font-bold text-neutral-900 dark:text-white">
                    {biz.name}
                  </h2>
                </div>
                <VoiceButton
                  text={`${biz.name}. Startup cost ${biz.startupCost} rupees. Expected monthly profit ${profit} rupees. ${biz.summary}`}
                  id={`biz-${biz.id}`}
                  compact
                />
              </div>

              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{biz.summary}</p>

              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-neutral-200/80 pt-4 text-xs dark:border-neutral-800">
                <div>
                  <span className="text-neutral-500">Startup Cost</span>
                  <p className="font-mono-num mt-0.5 text-sm font-bold text-neutral-900 dark:text-white">
                    ₹{biz.startupCost.toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <span className="text-neutral-500">Net Income / mo</span>
                  <p className="font-mono-num mt-0.5 text-sm font-bold text-emerald-700 dark:text-emerald-400">
                    +₹{profit.toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <span className="text-neutral-500">Break-Even</span>
                  <p className="font-mono-num mt-0.5 text-sm font-bold text-[#9B111E] dark:text-[#FF5C8A]">
                    ~{biz.breakEvenMonths} mo
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Profit Estimator */}
      <section className="rounded-[20px] border border-neutral-200 bg-[#FAFAFA] p-6 dark:border-neutral-800 dark:bg-[#1B1B1F]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
              Scale &amp; Profit Estimator: {activeBiz.name}
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Slide to estimate profit if you start 1 unit or expand to 3 units with a Self-Help Group
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>Units:</span>
            {[1, 2, 3].map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setScaleUnits(u)}
                className={`h-10 w-10 rounded-full font-mono-num text-sm font-bold cursor-pointer ${
                  scaleUnits === u
                    ? 'bg-[#9B111E] text-white'
                    : 'border border-neutral-300 bg-white text-neutral-800 dark:border-neutral-700 dark:bg-[#141417] dark:text-white'
                }`}
              >
                {u}×
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 dark:bg-[#141417]">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <IndianRupee className="h-4 w-4 text-[#9B111E]" />
              <span>Total Startup Capital</span>
            </div>
            <p className="font-mono-num mt-1 text-2xl font-extrabold">₹{totalStartup.toLocaleString('en-IN')}</p>
          </div>
          <div className="rounded-2xl bg-white p-4 dark:bg-[#141417]">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <Sprout className="h-4 w-4 text-emerald-600" />
              <span>Estimated Monthly Profit</span>
            </div>
            <p className="font-mono-num mt-1 text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">
              +₹{monthlyProfit.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 dark:bg-[#141417]">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <Clock className="h-4 w-4 text-[#9B111E]" />
              <span>Annual Extra Income</span>
            </div>
            <p className="font-mono-num mt-1 text-2xl font-extrabold text-[#9B111E] dark:text-[#FF5C8A]">
              ₹{(monthlyProfit * 12).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
