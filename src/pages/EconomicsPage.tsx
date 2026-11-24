import React, { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { TrendingUp, Wheat, Factory, Store } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VoiceButton } from '../components/VoiceButton';

export const EconomicsPage: React.FC = () => {
  const { language } = useApp();
  const [inflationRate, setInflationRate] = useState(6);
  const [cashAmount, setCashAmount] = useState(10000);

  const chartData = useMemo(() => {
    const rows = [];
    for (let y = 0; y <= 10; y++) {
      const buyingPower = Math.round(cashAmount / Math.pow(1 + inflationRate / 100, y));
      const bankFdValue = Math.round(cashAmount * Math.pow(1.068, y));
      rows.push({
        year: `Yr ${y}`,
        buyingPower,
        bankFdValue,
      });
    }
    return rows;
  }, [inflationRate, cashAmount]);

  const year10Power = chartData[chartData.length - 1].buyingPower;

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 pb-24 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <div>
          <p className="text-xs font-semibold text-[#9B111E] dark:text-[#FF5C8A]">
            Module 07 · Simplified Economics
          </p>
          <h1 className="font-display mt-1 text-3xl font-extrabold text-neutral-900 dark:text-white">
            {language === 'hi' ? 'महंगाई और GDP' : language === 'kn' ? 'ಹಣದುಬ್ಬರ ಮತ್ತು GDP' : 'Inflation & GDP'}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-neutral-600 dark:text-neutral-300">
            See why cash kept idle in a steel trunk loses buying power over time, and how every village farm and shop builds India’s GDP.
          </p>
        </div>
        <VoiceButton
          text={`Inflation means prices of daily items like cooking oil, diesel, and seeds go up every year. At ${inflationRate} percent inflation, ${cashAmount} rupees kept in cash will only buy ${year10Power} rupees worth of goods after 10 years. Keeping savings in a bank account or FD protects your family.`}
          id="economics-voice"
        />
      </div>

      {/* Inflation Purchasing Power Simulator */}
      <section className="rounded-[20px] border border-neutral-200 bg-white p-6 ruby-shadow dark:border-neutral-800 dark:bg-[#1B1B1F]">
        <div className="flex items-center gap-2.5">
          <TrendingUp className="h-5 w-5 text-[#9B111E] dark:text-[#FF5C8A]" />
          <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
            Inflation Simulator: Cash in Trunk vs. Bank FD (10 Years)
          </h2>
        </div>

        <div className="mt-5 grid gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <div>
              <div className="flex justify-between text-sm font-medium">
                <span>Savings Amount Today</span>
                <span className="font-mono-num font-bold text-[#9B111E] dark:text-[#FF5C8A]">
                  ₹{cashAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={100000}
                step={1000}
                value={cashAmount}
                onChange={(e) => setCashAmount(Number(e.target.value))}
                className="ruby-slider mt-2 w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium">
                <span>Annual Price Rise (Inflation %)</span>
                <span className="font-mono-num font-bold text-[#9B111E] dark:text-[#FF5C8A]">
                  {inflationRate}% / year
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={10}
                step={0.5}
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="ruby-slider mt-2 w-full"
              />
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-4 dark:border-neutral-800 dark:bg-[#141417]">
              <p className="text-xs font-semibold text-neutral-500">After 10 Years</p>
              <p className="mt-1 text-sm text-neutral-800 dark:text-neutral-200">
                Cash kept at home still looks like ₹{cashAmount.toLocaleString('en-IN')}, but it only buys goods worth{' '}
                <strong className="font-mono-num text-[#9B111E] dark:text-[#FF5C8A]">
                  ₹{year10Power.toLocaleString('en-IN')}
                </strong>
                . Putting it in a 6.8% Bank FD grows it to{' '}
                <strong className="font-mono-num text-emerald-700 dark:text-emerald-400">
                  ₹{chartData[10].bankFdValue.toLocaleString('en-IN')}
                </strong>
                !
              </p>
            </div>
          </div>

          <div className="h-[270px] rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-4 lg:col-span-7 dark:border-neutral-800 dark:bg-[#141417]">
            <p className="mb-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
              Bank FD Value (Green) vs. Idle Cash Buying Power (Ruby)
            </p>
            <ResponsiveContainer width="100%" height={215}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => `₹${Math.round(v / 1000)}k`} />
                <Tooltip
                  formatter={(val) =>
                    `₹${Number(Array.isArray(val) ? val[0] : (val ?? 0)).toLocaleString('en-IN')}`
                  }
                />
                <Line type="monotone" dataKey="bankFdValue" name="6.8% Bank FD" stroke="#059669" strokeWidth={2.5} />
                <Line type="monotone" dataKey="buyingPower" name="Idle Cash Buying Power" stroke="#9B111E" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Simplified Visual Diagram: How Village Work Builds National GDP */}
      <section className="rounded-[20px] border border-neutral-200 bg-[#FAFAFA] p-6 dark:border-neutral-800 dark:bg-[#1B1B1F]">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
            How Your Village Powers India’s GDP (Gross Domestic Product)
          </h2>
          <VoiceButton
            text="GDP simply means the total value of all goods and services produced inside our country in one year. It combines three pillars: Farming and Dairy, Processing and Crafts, and Rural Services like shops and transport."
            id="gdp-voice"
            compact
          />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-[#141417]">
            <Wheat className="h-7 w-7 text-[#9B111E] dark:text-[#FF5C8A]" />
            <h3 className="font-display mt-3 text-base font-bold">1. Primary: Crops, Milk &amp; Poultry</h3>
            <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-300">
              Every quintal of wheat, crate of tomatoes, or litre of milk sold adds directly to national production.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-[#141417]">
            <Factory className="h-7 w-7 text-[#9B111E] dark:text-[#FF5C8A]" />
            <h3 className="font-display mt-3 text-base font-bold">2. Secondary: Processing &amp; Crafts</h3>
            <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-300">
              Turning raw milk into paneer, wheat into flour, or cotton into stitched garments creates extra value right in the village.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-[#141417]">
            <Store className="h-7 w-7 text-[#9B111E] dark:text-[#FF5C8A]" />
            <h3 className="font-display mt-3 text-base font-bold">3. Tertiary: Kirana, Transport &amp; Digital</h3>
            <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-300">
              Local shops, tractor transport, and Bank Mitra CSPs keep money moving safely through the rural economy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
