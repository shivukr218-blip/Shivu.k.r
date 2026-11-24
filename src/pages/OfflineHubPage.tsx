import React, { useState } from 'react';
import { Bell, Download, PhoneCall, Wifi, WifiOff, CheckCircle2, FileDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BANK_HELPLINES } from '../data/modulesData';
import { useOnlineStatus } from '../hooks/usePWA';
import { VoiceButton } from '../components/VoiceButton';
import { PWAInstallButton } from '../components/PWAInstallBanner';

const OFFLINE_GUIDES = [
  {
    id: 'guide-fraud',
    title: '1930 Golden Hour & UPI Safety Sheet',
    size: '4 KB · Printable Text',
    content: `GRAMFIN OFFLINE EMERGENCY GUIDE — GOLDEN HOUR FRAUD RESPONSE
==================================================================
1. DIAL 1930 IMMEDIATELY (within 1 hour of money loss)
   National Cyber Crime Helpline (24x7 Toll-Free)
   Online Portal: https://cybercrime.gov.in

2. DIAL 14440 — RBI Sachet Toll-Free (unauthorized bank deductions)

3. IMMEDIATE 3 STEPS:
   - Hang up the phone call & turn off screen-sharing apps (AnyDesk / QuickSupport).
   - NEVER share OTP, ATM PIN, UPI PIN, or CVV.
   - Note down the 12-digit UTR number, amount, time, and scammer mobile number.

4. BANK BLOCK HELPLINES:
   - SBI: 1800 1234
   - PNB: 1800 1800
   - Bank of Baroda: 1800 5700
   - HDFC / ICICI / Axis: 1800 1600
`,
  },
  {
    id: 'guide-banking',
    title: 'Rural Banking, AePS & KCC Loan Checklist',
    size: '4 KB · Printable Text',
    content: `GRAMFIN OFFLINE GUIDE — BANKING BASICS & KCC LOANS
==================================================
- Zero-Balance Jan Dhan Account: Needs Aadhaar + 2 photos. No minimum balance penalty.
- AePS Fingerprint Banking: Verify the exact amount on the CSP machine screen before placing your finger. Wait for bank SMS alert.
- Reading Passbook: CR = Money Added | DR = Money Deducted | Balance = Remaining Cash.
- Kisan Credit Card (KCC): 7% annual interest (4% effective if repaid on time). Compare against 36%-60% moneylender rates!
`,
  },
];

export const OfflineHubPage: React.FC = () => {
  const { language, unlockBadge } = useApp();
  const isOnline = useOnlineStatus();

  // SMS Tips Signup Form
  const [phone, setPhone] = useState(() => localStorage.getItem('gramfin_sms_phone') || '');
  const [smsLang, setSmsLang] = useState(localStorage.getItem('gramfin_sms_lang') || 'hi');
  const [smsSubscribed, setSmsSubscribed] = useState(() => !!localStorage.getItem('gramfin_sms_phone'));
  const [phoneError, setPhoneError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = phone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleaned)) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
      return;
    }
    setPhoneError('');
    localStorage.setItem('gramfin_sms_phone', cleaned);
    localStorage.setItem('gramfin_sms_lang', smsLang);
    setSmsSubscribed(true);
    unlockBadge('village-guardian');
  };

  const downloadGuide = (title: string, content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    unlockBadge('village-guardian');
  };

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 pb-24 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <div>
          <p className="text-xs font-semibold text-[#9B111E] dark:text-[#FF5C8A]">
            Module 10 · Offline Emergency Cache &amp; SMS Alerts
          </p>
          <h1 className="font-display mt-1 text-3xl font-extrabold text-neutral-900 dark:text-white">
            {language === 'hi' ? 'अलर्ट और ऑफलाइन केंद्र' : language === 'kn' ? 'ಎಚ್ಚರಿಕೆ ಮತ್ತು ಆಫ್‌ಲೈನ್ ಕೇಂದ್ರ' : 'Alerts & Offline Hub'}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-neutral-600 dark:text-neutral-300">
            Emergency 1930 numbers and offline guides stay cached on your phone even with zero mobile data.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-[#FAFAFA] px-3.5 py-2 text-xs font-semibold dark:border-neutral-700 dark:bg-[#1B1B1F]">
            {isOnline ? <Wifi className="h-4 w-4 text-emerald-600" /> : <WifiOff className="h-4 w-4 text-[#9B111E]" />}
            <span>{isOnline ? 'Online · Offline Cache Synced' : 'Offline · Using Cached Data'}</span>
          </div>
          <PWAInstallButton />
          <VoiceButton
            text="This is the Offline Hub. Emergency helplines 1930 and 14440 are cached on your phone. You can also sign up for weekly SMS scam alerts or download printable guides."
            id="offline-hub-voice"
            compact
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Validated SMS Tips Signup Form */}
        <section className="rounded-[20px] border border-neutral-200 bg-white p-6 ruby-shadow lg:col-span-5 dark:border-neutral-800 dark:bg-[#1B1B1F]">
          <div className="flex items-center gap-2.5">
            <Bell className="h-5 w-5 text-[#9B111E] dark:text-[#FF5C8A]" />
            <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
              Free Weekly SMS Scam Alerts
            </h2>
          </div>
          <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-300">
            Receive 1 short SMS every Sunday warning about active rural KYC, PM-KISAN, or UPI scams in your language.
          </p>

          <form onSubmit={handleSubscribe} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                10-Digit Mobile Number
              </label>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setSmsSubscribed(false);
                }}
                placeholder="9876543210"
                className="font-mono-num mt-1.5 w-full rounded-xl border border-neutral-300 bg-[#FAFAFA] px-4 py-2.5 text-sm dark:border-neutral-700 dark:bg-[#141417]"
              />
              {phoneError && (
                <p className="mt-1.5 text-xs font-medium text-[#9B111E] dark:text-[#FF6B93]">{phoneError}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                Preferred Alert Language
              </label>
              <select
                value={smsLang}
                onChange={(e) => {
                  setSmsLang(e.target.value);
                  setSmsSubscribed(false);
                }}
                className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-[#FAFAFA] px-4 py-2.5 text-sm dark:border-neutral-700 dark:bg-[#141417]"
              >
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="en">English</option>
              </select>
            </div>

            <button
              type="submit"
              className="min-h-[48px] w-full rounded-full bg-[#9B111E] py-3 text-sm font-semibold text-white hover:bg-[#7F0D18] cursor-pointer"
            >
              {smsSubscribed ? 'Update SMS Alert Subscription' : 'Subscribe to Weekly Alerts'}
            </button>

            {smsSubscribed && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Saved locally for +91 {phone}. Weekly alerts active!</span>
              </div>
            )}
          </form>
        </section>

        {/* Cached Emergency Tab + Downloadable Guides */}
        <div className="space-y-6 lg:col-span-7">
          <section className="rounded-[20px] border border-[#9B111E]/25 bg-[#FAFAFA] p-6 dark:border-[#E0115F]/30 dark:bg-[#1B1B1F]">
            <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
              Cached Offline Emergency Numbers
            </h2>
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
              Works without internet — tap any number to dial directly from your phone.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {BANK_HELPLINES.map((item) => (
                <a
                  key={item.name}
                  href={`tel:${item.tollFree.replace(/\s+/g, '')}`}
                  className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-3.5 hover:border-[#9B111E] dark:border-neutral-800 dark:bg-[#141417]"
                >
                  <div>
                    <p className="text-sm font-bold text-neutral-900 dark:text-white">{item.name}</p>
                    <p className="text-[11px] text-neutral-500">{item.note}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono-num text-sm font-extrabold text-[#9B111E] dark:text-[#FF5C8A]">
                    <PhoneCall className="h-3.5 w-3.5" />
                    {item.tollFree}
                  </span>
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-[20px] border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-[#1B1B1F]">
            <div className="flex items-center gap-2">
              <FileDown className="h-5 w-5 text-[#9B111E] dark:text-[#FF5C8A]" />
              <h2 className="font-display text-lg font-bold text-neutral-900 dark:text-white">
                Downloadable Offline Module Packs
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              {OFFLINE_GUIDES.map((g) => (
                <div
                  key={g.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-[#FAFAFA] p-4 dark:border-neutral-800 dark:bg-[#141417]"
                >
                  <div>
                    <p className="text-sm font-bold text-neutral-900 dark:text-white">{g.title}</p>
                    <p className="text-xs text-neutral-500">{g.size}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => downloadGuide(g.title, g.content, `${g.id}.txt`)}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[#9B111E] px-4 py-2 text-xs font-semibold text-white hover:bg-[#7F0D18] cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download Guide
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
