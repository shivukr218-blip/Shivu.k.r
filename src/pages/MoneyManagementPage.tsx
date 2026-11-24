import React, { useEffect, useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { Plus, Trash2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { BudgetEntry } from '../types';
import { VoiceButton } from '../components/VoiceButton';

const RUBY_PALETTE = ['#9B111E', '#E0115F', '#C84B58', '#F28B9C', '#5C0B13', '#8E8E93'];

const DEFAULT_ENTRIES: BudgetEntry[] = [
  { id: '1', title: 'Wheat & Vegetable Sale', amount: 14500, type: 'income', category: 'Farm Harvest', date: '2026-11-02' },
  { id: '2', title: 'Dairy Milk Collection', amount: 4200, type: 'income', category: 'Dairy & Livestock', date: '2026-11-05' },
  { id: '3', title: 'Household Ration & Groceries', amount: 4800, type: 'expense', category: 'Food & Ration', date: '2026-11-06' },
  { id: '4', title: 'Urea & Hybrid Seeds', amount: 3200, type: 'expense', category: 'Seeds & Farm Inputs', date: '2026-11-08' },
  { id: '5', title: 'School Fees & Clinic', amount: 2100, type: 'expense', category: 'Health & Education', date: '2026-11-11' },
  { id: '6', title: 'Bank RD Monthly Savings', amount: 3000, type: 'expense', category: 'Savings Deposit', date: '2026-11-12' },
];

function autoCategorize(text: string): { type: 'income' | 'expense'; category: string } {
  const t = text.toLowerCase();
  if (/(milk|dairy|sell|sold|harvest|crop|wage|salary|pension|subsidy|pm-kisan)/.test(t)) {
    if (/(milk|dairy)/.test(t)) return { type: 'income', category: 'Dairy & Livestock' };
    if (/(wage|salary|labour)/.test(t)) return { type: 'income', category: 'Wages & Trade' };
    return { type: 'income', category: 'Farm Harvest' };
  }
  if (/(seed|urea|fertilizer|tractor|pump|pesticide|fodder)/.test(t)) {
    return { type: 'expense', category: 'Seeds & Farm Inputs' };
  }
  if (/(school|book|doctor|medicine|clinic|hospital)/.test(t)) {
    return { type: 'expense', category: 'Health & Education' };
  }
  if (/(save|saving|rd|fd|deposit|shg)/.test(t)) {
    return { type: 'expense', category: 'Savings Deposit' };
  }
  if (/(loan|emi|kcc|repay)/.test(t)) {
    return { type: 'expense', category: 'Loan Repayment' };
  }
  return { type: 'expense', category: 'Food & Ration' };
}

export const MoneyManagementPage: React.FC = () => {
  const { language, markModuleComplete, progress } = useApp();
  const [entries, setEntries] = useState<BudgetEntry[]>(() => {
    try {
      const saved = localStorage.getItem('gramfin_budget_entries');
      return saved ? JSON.parse(saved) : DEFAULT_ENTRIES;
    } catch {
      return DEFAULT_ENTRIES;
    }
  });

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Food & Ration');
  const [aiHint, setAiHint] = useState('');

  useEffect(() => {
    localStorage.setItem('gramfin_budget_entries', JSON.stringify(entries));
  }, [entries]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (val.trim().length >= 3) {
      const suggestion = autoCategorize(val);
      setType(suggestion.type);
      setCategory(suggestion.category);
      setAiHint(`Auto-categorized as ${suggestion.type.toUpperCase()} · ${suggestion.category}`);
    } else {
      setAiHint('');
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
    if (!title.trim() || isNaN(num) || num <= 0) return;

    const newEntry: BudgetEntry = {
      id: String(Date.now()),
      title: title.trim(),
      amount: num,
      type,
      category,
      date: new Date().toISOString().slice(0, 10),
    };
    setEntries((prev) => [newEntry, ...prev]);
    setTitle('');
    setAmount('');
    setAiHint('');
    markModuleComplete('budget', 'budget-master');
  };

  const summary = useMemo(() => {
    const totalIncome = entries.filter((e) => e.type === 'income').reduce((s, e) => s + e.amount, 0);
    const totalOutflow = entries.filter((e) => e.type === 'expense').reduce((s, e) => s + e.amount, 0);
    const savedAmount = entries
      .filter((e) => e.category === 'Savings Deposit')
      .reduce((s, e) => s + e.amount, 0);
    const remainingCash = totalIncome - totalOutflow;
    const savingsRate = totalIncome > 0 ? Math.round(((savedAmount + Math.max(0, remainingCash)) / totalIncome) * 100) : 0;

    const byCat: Record<string, number> = {};
    entries
      .filter((e) => e.type === 'expense')
      .forEach((e) => {
        byCat[e.category] = (byCat[e.category] || 0) + e.amount;
      });
    const pieData = Object.entries(byCat).map(([name, value]) => ({ name, value }));

    const compareData = [
      { name: 'Total Income', value: totalIncome },
      { name: 'Expenses', value: totalOutflow - savedAmount },
      { name: 'Saved', value: savedAmount + Math.max(0, remainingCash) },
    ];

    return { totalIncome, totalOutflow, remainingCash, savingsRate, pieData, compareData };
  }, [entries]);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 pb-24 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <div>
          <p className="text-xs font-semibold text-[#9B111E] dark:text-[#FF5C8A]">
            Module 04 · Interactive Household Budget
          </p>
          <h1 className="font-display mt-1 text-3xl font-extrabold text-neutral-900 dark:text-white">
            {language === 'hi' ? 'पैसे का हिसाब-किताब' : language === 'kn' ? 'ಹಣ ನಿರ್ವಹಣೆ' : 'Money Management'}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-neutral-600 dark:text-neutral-300">
            Track farm and household money. Type any item like "Bought seeds 1200" or "Sold milk 900" and the assistant picks the category automatically.
          </p>
        </div>
        <VoiceButton
          text={`Your total income is ${summary.totalIncome} rupees and total outflow is ${summary.totalOutflow} rupees. Your savings rate is ${summary.savingsRate} percent.`}
          id="budget-voice"
        />
      </div>

      {/* Financial Health KPI Strip */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-[20px] border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-[#1B1B1F]">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Total Income</p>
          <p className="font-mono-num mt-1 text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">
            ₹{summary.totalIncome.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="rounded-[20px] border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-[#1B1B1F]">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Total Outflow</p>
          <p className="font-mono-num mt-1 text-2xl font-extrabold text-neutral-900 dark:text-white">
            ₹{summary.totalOutflow.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="rounded-[20px] border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-[#1B1B1F]">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Net Balance</p>
          <p
            className={`font-mono-num mt-1 text-2xl font-extrabold ${
              summary.remainingCash >= 0 ? 'text-[#9B111E] dark:text-[#FF5C8A]' : 'text-amber-600'
            }`}
          >
            ₹{summary.remainingCash.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="rounded-[20px] border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-[#1B1B1F]">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Savings Health</p>
          <p className="font-mono-num mt-1 text-2xl font-extrabold text-[#9B111E] dark:text-[#FF5C8A]">
            {summary.savingsRate}%
          </p>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
            {summary.savingsRate >= 20 ? 'Healthy (20%+ target)' : 'Aim for 20% saved'}
          </p>
        </div>
      </div>

      {/* Add Entry + Ruby Pie & Bar Charts */}
      <div className="grid gap-6 lg:grid-cols-12">
        <form
          onSubmit={handleAdd}
          className="space-y-4 rounded-[20px] border border-neutral-200 bg-white p-6 ruby-shadow lg:col-span-5 dark:border-neutral-800 dark:bg-[#1B1B1F]"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-neutral-900 dark:text-white">Add Income or Expense</h2>
            {progress.unlockedBadges.includes('budget-master') && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Badge Active
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">
              Description
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g., Bought urea fertilizer or Sold milk"
              className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-[#FAFAFA] px-3.5 py-2.5 text-sm dark:border-neutral-700 dark:bg-[#141417]"
            />
            {aiHint && (
              <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-[#9B111E] dark:text-[#FF6B93]">
                <Sparkles className="h-3.5 w-3.5" />
                {aiHint}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                Amount (₹)
              </label>
              <input
                type="number"
                required
                min={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1200"
                className="font-mono-num mt-1.5 w-full rounded-xl border border-neutral-300 bg-[#FAFAFA] px-3.5 py-2.5 text-sm dark:border-neutral-700 dark:bg-[#141417]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                Type
              </label>
              <div className="mt-1.5 grid grid-cols-2 gap-1 rounded-xl bg-neutral-100 p-1 dark:bg-[#141417]">
                <button
                  type="button"
                  onClick={() => setType('income')}
                  className={`rounded-lg py-2 text-xs font-semibold cursor-pointer ${
                    type === 'income' ? 'bg-white text-emerald-700 shadow-sm dark:bg-[#232329]' : 'text-neutral-600'
                  }`}
                >
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => setType('expense')}
                  className={`rounded-lg py-2 text-xs font-semibold cursor-pointer ${
                    type === 'expense' ? 'bg-white text-[#9B111E] shadow-sm dark:bg-[#232329] dark:text-[#FF5C8A]' : 'text-neutral-600'
                  }`}
                >
                  Expense
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-[#FAFAFA] px-3.5 py-2.5 text-sm dark:border-neutral-700 dark:bg-[#141417]"
            >
              {type === 'income' ? (
                <>
                  <option value="Farm Harvest">Farm Harvest</option>
                  <option value="Dairy & Livestock">Dairy &amp; Livestock</option>
                  <option value="Wages & Trade">Wages &amp; Trade</option>
                </>
              ) : (
                <>
                  <option value="Food & Ration">Food &amp; Ration</option>
                  <option value="Seeds & Farm Inputs">Seeds &amp; Farm Inputs</option>
                  <option value="Health & Education">Health &amp; Education</option>
                  <option value="Savings Deposit">Savings Deposit</option>
                  <option value="Loan Repayment">Loan Repayment</option>
                </>
              )}
            </select>
          </div>

          <button
            type="submit"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#9B111E] py-3 text-sm font-semibold text-white hover:bg-[#7F0D18] cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add Entry to Ledger
          </button>
        </form>

        {/* Ruby Charts */}
        <div className="grid gap-6 lg:col-span-7 sm:grid-cols-2">
          <div className="rounded-[20px] border border-neutral-200 bg-white p-5 ruby-shadow dark:border-neutral-800 dark:bg-[#1B1B1F]">
            <h3 className="font-display text-sm font-bold text-neutral-900 dark:text-white">
              Expense Breakdown (Ruby Chart)
            </h3>
            <div className="mt-2 h-[240px]">
              <ResponsiveContainer width="100%" height={235}>
                <PieChart>
                  <Pie
                    data={summary.pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={82}
                    paddingAngle={2}
                  >
                    {summary.pieData.map((_, i) => (
                      <Cell key={i} fill={RUBY_PALETTE[i % RUBY_PALETTE.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => `₹${Number(Array.isArray(val) ? val[0] : (val ?? 0)).toLocaleString('en-IN')}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-600 dark:text-neutral-400">
              {summary.pieData.map((d, i) => (
                <span key={d.name} className="inline-flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: RUBY_PALETTE[i % RUBY_PALETTE.length] }}
                  />
                  {d.name}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[20px] border border-neutral-200 bg-white p-5 ruby-shadow dark:border-neutral-800 dark:bg-[#1B1B1F]">
            <h3 className="font-display text-sm font-bold text-neutral-900 dark:text-white">
              Income vs. Expenses vs. Savings
            </h3>
            <div className="mt-2 h-[260px]">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={summary.compareData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `₹${Math.round(v / 1000)}k`} />
                  <Tooltip formatter={(val) => `₹${Number(Array.isArray(val) ? val[0] : (val ?? 0)).toLocaleString('en-IN')}`} />
                  <Bar dataKey="value" fill="#9B111E" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <section className="rounded-[20px] border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-[#1B1B1F]">
        <h2 className="font-display text-lg font-bold text-neutral-900 dark:text-white">Recent Entries</h2>
        <div className="mt-4 divide-y divide-neutral-100 dark:divide-neutral-800">
          {entries.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4 py-3.5">
              <div>
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">{item.title}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {item.category} · {item.date}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`font-mono-num text-sm font-bold ${
                    item.type === 'income' ? 'text-emerald-700 dark:text-emerald-400' : 'text-neutral-900 dark:text-white'
                  }`}
                >
                  {item.type === 'income' ? '+' : '-'}₹{item.amount.toLocaleString('en-IN')}
                </span>
                <button
                  type="button"
                  onClick={() => setEntries((prev) => prev.filter((x) => x.id !== item.id))}
                  aria-label={`Delete ${item.title}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-[#9B111E] dark:hover:bg-neutral-800 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
