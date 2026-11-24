import React, { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { PiggyBank, Percent, CalendarCheck2, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VoiceButton } from '../components/VoiceButton';

export const SavingsToolsPage: React.FC = () => {
  const { language, progress, markModuleComplete } = useApp();

  // Emergency Fund Calculator State
  const [monthlyExpense, setMonthlyExpense] = useState(8500);
  const [targetMonths, setTargetMonths] = useState(6);
  const [currentSaved, setCurrentSaved] = useState(12000);
  const [monthlySaveCapacity, setMonthlySaveCapacity] = useState(2500);

  // Interest Rate Calculator State
  const [principal, setPrincipal] = useState(25000);
  const [annualRate, setAnnualRate] = useState(6.8);
  const [tenureYears, setTenureYears] = useState(3);
  const [compounding, setCompounding] = useState<4 | 12 | 1>(4); // 4 = quarterly

  const emergencyTarget = monthlyExpense * targetMonths;
  const remainingGap = Math.max(0, emergencyTarget - currentSaved);
  const monthsNeeded = monthlySaveCapacity > 0 ? Math.ceil(remainingGap / monthlySaveCapacity) : 0;
  const weeklySetAside = Math.round(monthlySaveCapacity / 4);
  const emergencyPercent = Math.min(100, Math.round((currentSaved / Math.max(1, emergencyTarget)) * 100));

  const interestCalc = useMemo(() => {
    const data: { year: string; principal: number; total: number; interest: number }[] = [];
    for (let y = 0; y <= tenureYears; y++) {
      const amount = Math.round(
        principal * Math.pow(1 + annualRate / 100 / compounding, compounding * y)
      );
      data.push({
        year: y === 0 ? 'Start' : `Yr ${y}`,
        principal,
        total: amount,
        interest: amount - principal,
      });
    }
    const finalRow = data[data.length - 1];
    return {
      chartData: data,
      maturity: finalRow.total,
      earnedInterest: finalRow.interest,
    };
  }, [principal, annualRate, tenureYears, compounding]);

  const isCompleted = progress.completedModules.includes('savings');

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 pb-24 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <div>
          <p className="text-xs font-semibold text-[#9B111E] dark:text-[#FF5C8A]">
            Module 02 · Interactive Calculators
          </p>
          <h1 className="font-display mt-1 text-3xl font-extrabold text-neutral-900 dark:text-white">
            {language === 'hi'
              ? 'बचत और ब्याज कैलकुलेटर'
              : language === 'kn'
                ? 'ಉಳಿತಾಯ ಮತ್ತು ಬಡ್ಡಿ ಸಾಧನಗಳು'
                : 'Savings & Interest Tools'}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-neutral-600 dark:text-neutral-300">
            Adjust the sliders to plan your household safety net and see exactly how bank interest compounds over time.
          </p>
        </div>
        <VoiceButton
          text={`Your emergency fund target is ${emergencyTarget} rupees. With ${monthlySaveCapacity} rupees saved monthly, you will reach your goal in ${monthsNeeded} months. On your ${principal} rupee deposit at ${annualRate} percent interest, you will earn ${interestCalc.earnedInterest} rupees in interest.`}
          id="savings-summary-voice"
        />
      </div>

      {/* Calculator 1: Emergency Fund Calculator */}
      <section className="rounded-[20px] border border-neutral-200 bg-white p-6 ruby-shadow dark:border-neutral-800 dark:bg-[#1B1B1F]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#9B111E]/10 text-[#9B111E] dark:bg-[#E0115F]/15 dark:text-[#FF6B93]">
              <PiggyBank className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
                Emergency Fund Calculator
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Protect your family against crop loss, medical bills, or lean months
              </p>
            </div>
          </div>
          <VoiceButton
            text="Move the sliders for your monthly household expenses, target safety months, and current savings to see how much to set aside each week."
            id="emergency-calc-voice"
            compact
          />
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7">
            <div>
              <div className="flex justify-between text-sm font-medium">
                <span>Monthly Household Expenses</span>
                <span className="font-mono-num font-bold text-[#9B111E] dark:text-[#FF5C8A]">
                  ₹{monthlyExpense.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={3000}
                max={40000}
                step={500}
                value={monthlyExpense}
                onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                className="ruby-slider mt-2 w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium">
                <span>Safety Buffer Target (Months)</span>
                <span className="font-mono-num font-bold text-[#9B111E] dark:text-[#FF5C8A]">
                  {targetMonths} months
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={12}
                step={1}
                value={targetMonths}
                onChange={(e) => setTargetMonths(Number(e.target.value))}
                className="ruby-slider mt-2 w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium">
                <span>Current Savings Kept Safely</span>
                <span className="font-mono-num font-bold text-[#9B111E] dark:text-[#FF5C8A]">
                  ₹{currentSaved.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={150000}
                step={1000}
                value={currentSaved}
                onChange={(e) => setCurrentSaved(Number(e.target.value))}
                className="ruby-slider mt-2 w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium">
                <span>Monthly Amount You Can Save</span>
                <span className="font-mono-num font-bold text-[#9B111E] dark:text-[#FF5C8A]">
                  ₹{monthlySaveCapacity.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={15000}
                step={250}
                value={monthlySaveCapacity}
                onChange={(e) => setMonthlySaveCapacity(Number(e.target.value))}
                className="ruby-slider mt-2 w-full"
              />
            </div>
          </div>

          {/* Live Results Panel */}
          <div className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-5 lg:col-span-5 dark:border-neutral-800 dark:bg-[#141417]">
            <div>
              <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Your Target Emergency Fund</p>
              <p className="font-mono-num mt-1 text-3xl font-extrabold text-[#9B111E] dark:text-[#FF5C8A]">
                ₹{emergencyTarget.toLocaleString('en-IN')}
              </p>

              <div className="mt-4">
                <div className="flex justify-between text-xs font-medium text-neutral-600 dark:text-neutral-300">
                  <span>Saved so far</span>
                  <span className="font-mono-num font-bold">{emergencyPercent}%</span>
                </div>
                <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                  <div
                    className="ruby-gradient-bg h-full rounded-full transition-all duration-300"
                    style={{ width: `${emergencyPercent}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white p-3 dark:bg-[#1B1B1F]">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Remaining Gap</p>
                  <p className="font-mono-num mt-0.5 text-lg font-bold">₹{remainingGap.toLocaleString('en-IN')}</p>
                </div>
                <div className="rounded-xl bg-white p-3 dark:bg-[#1B1B1F]">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Time to Goal</p>
                  <p className="font-mono-num mt-0.5 text-lg font-bold">
                    {remainingGap === 0 ? 'Goal Reached!' : `${monthsNeeded} months`}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-[#9B111E]/8 p-3.5 text-xs leading-relaxed text-neutral-800 dark:bg-[#E0115F]/15 dark:text-neutral-200">
              <strong>Weekly Action:</strong> Keep{' '}
              <span className="font-mono-num font-bold text-[#9B111E] dark:text-[#FF6B93]">
                ₹{weeklySetAside.toLocaleString('en-IN')}
              </span>{' '}
              every week in a separate savings or Recurring Deposit (RD) account so it stays untouched.
            </div>
          </div>
        </div>
      </section>

      {/* Calculator 2: Interest Rate & Maturity Calculator + Recharts */}
      <section className="rounded-[20px] border border-neutral-200 bg-white p-6 ruby-shadow dark:border-neutral-800 dark:bg-[#1B1B1F]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#9B111E]/10 text-[#9B111E] dark:bg-[#E0115F]/15 dark:text-[#FF6B93]">
              <Percent className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
                Interest Rate &amp; Maturity Calculator
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Compare Fixed Deposits, Post Office TD, and Savings Accounts
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {([4, 12, 1] as const).map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => setCompounding(freq)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  compounding === freq
                    ? 'bg-[#9B111E] text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300'
                }`}
              >
                {freq === 4 ? 'Quarterly' : freq === 12 ? 'Monthly' : 'Yearly'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <div>
              <div className="flex justify-between text-sm font-medium">
                <span>Deposit Balance (Principal)</span>
                <span className="font-mono-num font-bold text-[#9B111E] dark:text-[#FF5C8A]">
                  ₹{principal.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={500000}
                step={1000}
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="ruby-slider mt-2 w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium">
                <span>Annual Interest Rate (%)</span>
                <span className="font-mono-num font-bold text-[#9B111E] dark:text-[#FF5C8A]">
                  {annualRate.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min={2.5}
                max={10.5}
                step={0.1}
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="ruby-slider mt-2 w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium">
                <span>Tenure (Years)</span>
                <span className="font-mono-num font-bold text-[#9B111E] dark:text-[#FF5C8A]">
                  {tenureYears} {tenureYears === 1 ? 'Year' : 'Years'}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="ruby-slider mt-2 w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-4 dark:border-neutral-800 dark:bg-[#141417]">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Interest Earned</p>
                <p className="font-mono-num mt-1 text-xl font-bold text-emerald-700 dark:text-emerald-400">
                  +₹{interestCalc.earnedInterest.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="rounded-2xl border border-[#9B111E]/25 bg-[#9B111E]/6 p-4 dark:border-[#E0115F]/40 dark:bg-[#E0115F]/12">
                <p className="text-xs text-[#9B111E] dark:text-[#FF6B93]">Maturity Value</p>
                <p className="font-mono-num mt-1 text-xl font-extrabold text-[#9B111E] dark:text-[#FF5C8A]">
                  ₹{interestCalc.maturity.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>

          <div className="h-[280px] rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-4 lg:col-span-7 dark:border-neutral-800 dark:bg-[#141417]">
            <p className="mb-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
              Growth Over {tenureYears} Years (Principal vs. Total Maturity)
            </p>
            <ResponsiveContainer width="100%" height={225}>
              <AreaChart data={interestCalc.chartData}>
                <defs>
                  <linearGradient id="rubyFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9B111E" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#9B111E" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v: number) => `₹${Math.round(v / 1000)}k`}
                />
                <Tooltip
                  formatter={(val) => [
                    `₹${Number(Array.isArray(val) ? val[0] : (val ?? 0)).toLocaleString('en-IN')}`,
                    'Value',
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  name="Total Value"
                  stroke="#9B111E"
                  strokeWidth={2.5}
                  fill="url(#rubyFill)"
                />
                <Area
                  type="monotone"
                  dataKey="principal"
                  name="Deposit"
                  stroke="#737373"
                  strokeDasharray="4 4"
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Plain-Language Explainer: Daily Balance Interest & Quarterly Credit */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[20px] border border-neutral-200 bg-[#FAFAFA] p-6 dark:border-neutral-800 dark:bg-[#1B1B1F]">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white">
              How Daily Balance Interest Works
            </h3>
            <VoiceButton
              text="Banks calculate your savings account interest every night based on the closing balance left in your account at the end of each day. Even if you withdraw money mid-month, you earn interest for every single day the money stayed in the bank."
              id="daily-interest-voice"
              compact
            />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            Every night, your bank checks your closing balance and calculates 1 day of interest:
          </p>
          <div className="font-mono-num mt-3 rounded-xl border border-neutral-200 bg-white p-3.5 text-xs text-neutral-800 dark:border-neutral-700 dark:bg-[#141417] dark:text-neutral-200">
            Daily Interest = (End-of-Day Balance × Annual Rate) ÷ 365
            <br />
            Example: (₹10,000 × 3.5%) ÷ 365 = <strong>₹0.96 per day</strong>
          </div>
        </div>

        <div className="rounded-[20px] border border-neutral-200 bg-[#FAFAFA] p-6 dark:border-neutral-800 dark:bg-[#1B1B1F]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CalendarCheck2 className="h-5 w-5 text-[#9B111E] dark:text-[#FF5C8A]" />
              <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white">
                When Interest Is Credited (Quarterly)
              </h3>
            </div>
            <VoiceButton
              text="While interest is calculated daily, banks deposit the total earned interest into your passbook once every 3 months: March, June, September, and December. Look for INT. CREDIT in your passbook."
              id="quarterly-credit-voice"
              compact
            />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            Banks add up all 90 days of daily interest and credit the lump sum into your account every quarter:
            <strong> March, June, September, and December</strong>. Look for <code className="font-mono-num font-semibold">INT. CR</code> in your passbook!
          </p>
          <button
            type="button"
            onClick={() => markModuleComplete('savings', 'first-step-saver')}
            disabled={isCompleted}
            className={`mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold text-white cursor-pointer ${
              isCompleted ? 'bg-emerald-600' : 'bg-[#9B111E] hover:bg-[#7F0D18]'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            {isCompleted ? 'Emergency Planner Badge Unlocked' : 'Save Progress & Unlock Saver Badge'}
          </button>
        </div>
      </section>
    </div>
  );
};
