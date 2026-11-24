import React, { useState } from 'react';
import { Landmark, Fingerprint, CreditCard, BookCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VoiceButton } from '../components/VoiceButton';

const BANKING_STEPS = [
  {
    id: 'step-1',
    icon: Landmark,
    title: {
      en: '01. Opening a Zero-Balance Bank Account (PMJDY)',
      hi: '01. ज़ीरो-बैलेंस बैंक खाता (जन धन योजना) खोलना',
      kn: '01. ಜೀರೋ-ಬ್ಯಾಲೆನ್ಸ್ ಬ್ಯಾಂಕ್ ಖಾತೆ (ಜನ್ ಧನ್ ಯೋಜನೆ) ತೆರೆಯುವುದು',
    },
    detail: {
      en: 'Visit your nearest bank branch or Village Business Correspondent (Bank Mitra) with your Aadhaar card and 2 passport photos. A Jan Dhan Basic Savings Account needs ₹0 minimum balance, earns quarterly interest, and gives a free RuPay debit card.',
      hi: 'अपने नजदीकी बैंक या बैंक मित्र (CSP) के पास आधार कार्ड और 2 फोटो लेकर जाएँ। जन धन खाते में ₹0 न्यूनतम बैलेंस की आवश्यकता होती है, इस पर तिमाही ब्याज मिलता है और मुफ्त RuPay कार्ड भी मिलता है।',
      kn: 'ನಿಮ್ಮ ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು 2 ಫೋಟೋಗಳೊಂದಿಗೆ ಹತ್ತಿರದ ಬ್ಯಾಂಕ್ ಶಾಖೆ ಅಥವಾ ಬ್ಯಾಂಕ್ ಮಿತ್ರ (CSP) ಬಳಿ ಹೋಗಿ. ಜನ್ ಧನ್ ಖಾತೆಗೆ ₹0 ಕನಿಷ್ಠ ಬ್ಯಾಲೆನ್ಸ್ ಸಾಕು, ತ್ರೈಮಾಸಿಕ ಬಡ್ಡಿ ಮತ್ತು ಉಚಿತ RuPay ಕಾರ್ಡ್ ಸಿಗುತ್ತದೆ.',
    },
    tip: {
      en: 'Always ask for your stamped passbook and register your own mobile number for SMS alerts.',
      hi: 'हमेशा मुहर लगी पासबुक लें और SMS अलर्ट के लिए अपना खुद का मोबाइल नंबर जुड़वाएँ।',
      kn: 'ಯಾವಾಗಲೂ ಮುದ್ರೆ ಹಾಕಿದ ಪಾಸ್‌ಬುಕ್ ಪಡೆಯಿರಿ ಮತ್ತು SMS ಎಚ್ಚರಿಕೆಗಳಿಗಾಗಿ ನಿಮ್ಮ ಸ್ವಂತ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನೋಂದಾಯಿಸಿ.',
    },
  },
  {
    id: 'step-2',
    icon: Fingerprint,
    title: {
      en: '02. Safe Aadhaar-Enabled Deposits & Withdrawals (AePS)',
      hi: '02. आधार फिंगरप्रिंट (AePS) से सुरक्षित जमा व निकासी',
      kn: '02. ಆಧಾರ್ ಬೆರಳಚ್ಚು (AePS) ಮೂಲಕ ಸುರಕ್ಷಿತ ಜಮೆ ಮತ್ತು ಹಣ ತೆಗೆಯುವುದು',
    },
    detail: {
      en: 'At a village CSP shop, you can deposit or withdraw cash using your Aadhaar number and fingerprint. Always enter or verify the exact amount on the machine screen before placing your finger.',
      hi: 'गाँव के CSP केंद्र पर आधार और अंगूठे से पैसे निकालते समय मशीन की स्क्रीन पर रकम ज़रूर देखें। बिना देखे दोबारा अंगूठा न लगाएँ।',
      kn: 'ಗ್ರಾಮದ CSP ಕೇಂದ್ರದಲ್ಲಿ ಆಧಾರ್ ಮತ್ತು ಬೆರಳಚ್ಚು ಬಳಸಿ ಹಣ ತೆಗೆಯುವಾಗ ಯಂತ್ರದ ಪರದೆಯ ಮೇಲೆ ಸರಿಯಾದ ಮೊತ್ತವನ್ನು ಪರಿಶೀಲಿಸಿ. ನೋಡದೆ ಮತ್ತೊಮ್ಮೆ ಬೆರಳಚ್ಚು ಇಡಬೇಡಿ.',
    },
    tip: {
      en: 'Wait for your bank’s SMS alert before leaving the shop and collect a printed/written receipt.',
      hi: 'दुकान छोड़ने से पहले बैंक का SMS और रसीद ज़रूर जाँचें।',
      kn: 'ಅಂಗಡಿಯಿಂದ ಹೊರಡುವ ಮೊದಲು ಬ್ಯಾಂಕ್ SMS ಮತ್ತು ರಸೀದಿಯನ್ನು ಖಚಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ.',
    },
  },
  {
    id: 'step-3',
    icon: CreditCard,
    title: {
      en: '03. ATM & UPI Withdrawal Safety Rules',
      hi: '03. ATM और UPI से पैसे निकालने के सुरक्षित नियम',
      kn: '03. ATM ಮತ್ತು UPI ಸುರಕ್ಷತಾ ನಿಯಮಗಳು',
    },
    detail: {
      en: 'Cover the ATM keypad with your hand when typing your 4-digit PIN. Never accept help from strangers inside an ATM room. On UPI apps, keep your PIN secret—never write it on the card or share it with anyone.',
      hi: 'ATM पिन डालते समय कीपैड को हाथ से ढकें। ATM के अंदर किसी अनजान व्यक्ति की मदद न लें। अपना PIN कभी कार्ड पर न लिखें और न किसी को बताएँ।',
      kn: 'ATM ನಲ್ಲಿ 4-ಅಂಕಿಯ PIN ಟೈಪ್ ಮಾಡುವಾಗ ಕೀಪ್ಯಾಡ್ ಅನ್ನು ಕೈಯಿಂದ ಮುಚ್ಚಿ. ATM ಒಳಗೆ ಅಪರಿಚಿತರ ಸಹಾಯ ಪಡೆಯಬೇಡಿ. PIN ಅನ್ನು ಕಾರ್ಡ್ ಮೇಲೆ ಬರೆಯಬೇಡಿ.',
    },
    tip: {
      en: 'If an ATM card gets stuck, call your bank’s toll-free number immediately while standing safely outside.',
      hi: 'यदि ATM कार्ड फँस जाए, तो तुरंत बैंक के टोल-फ्री नंबर पर कॉल करके कार्ड ब्लॉक करवाएँ।',
      kn: 'ATM ಕಾರ್ಡ್ ಸಿಕ್ಕಿಹಾಕಿಕೊಂಡರೆ ತಕ್ಷಣ ಬ್ಯಾಂಕಿನ ಟೋಲ್-ಫ್ರೀ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಿ ಕಾರ್ಡ್ ಬ್ಲಾಕ್ ಮಾಡಿ.',
    },
  },
  {
    id: 'step-4',
    icon: BookCheck,
    title: {
      en: '04. Reading Your Passbook & Checking SMS Alerts',
      hi: '04. पासबुक पढ़ना और बैंक SMS की जाँच करना',
      kn: '04. ನಿಮ್ಮ ಪಾಸ್‌ಬುಕ್ ಓದುವುದು ಮತ್ತು SMS ಎಚ್ಚರಿಕೆ ಪರಿಶೀಲನೆ',
    },
    detail: {
      en: 'Update your passbook once a month at the branch. Check three columns: "DR / Withdrawal" (money going out), "CR / Deposit" (money coming in), and "Balance" (remaining money).',
      hi: 'महीने में एक बार पासबुक ज़रूर प्रिंट करवाएँ। तीन कॉलम देखें: "DR / निकासी" (कटने वाला पैसा), "CR / जमा" (आने वाला पैसा), और "Balance" (बचा हुआ पैसा)।',
      kn: 'ತಿಂಗಳಿಗೊಮ್ಮೆ ಬ್ಯಾಂಕ್‌ನಲ್ಲಿ ಪಾಸ್‌ಬುಕ್ ಪ್ರಿಂಟ್ ಮಾಡಿಸಿ. ಮೂರು ಕಾಲಂಗಳನ್ನು ನೋಡಿ: "DR" (ಖರ್ಚಾದ ಹಣ), "CR" (ಜಮೆಯಾದ ಹಣ), ಮತ್ತು "Balance" (ಉಳಿದ ಮೊತ್ತ).',
    },
    tip: {
      en: 'Spot any unknown debit? Dial 14440 (RBI) or visit your branch manager the same day.',
      hi: 'कोई अनजान कटा हुआ पैसा दिखे तो उसी दिन बैंक या 14440 पर शिकायत करें।',
      kn: 'ಅಪರಿಚಿತ ಹಣ ಕಡಿತ ಕಂಡುಬಂದರೆ ಅದೇ ದಿನ ಬ್ಯಾಂಕ್ ಅಥವಾ 14440 (RBI) ಗೆ ದೂರು ನೀಡಿ.',
    },
  },
];

export const BankingBasicsPage: React.FC = () => {
  const { language, progress, markModuleComplete, navigate } = useApp();
  const [practiceAnswer, setPracticeAnswer] = useState<'none' | 'cr' | 'dr'>('none');
  const isCompleted = progress.completedModules.includes('banking');

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-8 pb-24 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <div>
          <p className="text-xs font-semibold text-[#9B111E] dark:text-[#FF5C8A]">
            Module 01 · Foundation · 5 Min Voice-Guided Lesson
          </p>
          <h1 className="font-display mt-1 text-3xl font-extrabold text-neutral-900 dark:text-white">
            {language === 'hi'
              ? 'बैंकिंग की मूल बातें'
              : language === 'kn'
                ? 'ಬ್ಯಾಂಕಿಂಗ್ ಮೂಲಭೂತ ಅಂಶಗಳು'
                : 'Banking Basics'}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-neutral-600 dark:text-neutral-300">
            {language === 'hi'
              ? 'सुरक्षित बैंक खाता खोलने, अंगूठे से पैसे निकालने और पासबुक जाँचने के 4 आसान कदम।'
              : language === 'kn'
                ? 'ಸುರಕ್ಷಿತ ಜೀರೋ-ಬ್ಯಾಲೆನ್ಸ್ ಖಾತೆ ತೆರೆಯಲು, ಸುರಕ್ಷಿತವಾಗಿ ಹಣ ಜಮೆ ಮಾಡಲು ಮತ್ತು ಪಾಸ್‌ಬುಕ್ ಪರಿಶೀಲಿಸಲು 4 ಸುಲಭ ಹಂತಗಳು.'
                : 'Four practical steps to open a safe zero-balance account, deposit cash securely, and track every rupee.'}
          </p>
        </div>
        <VoiceButton
          text={BANKING_STEPS.map((s) => `${s.title[language]}. ${s.detail[language]}`).join(' ')}
          id="banking-all"
        />
      </div>

      {/* 4 Step Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {BANKING_STEPS.map((step) => {
          const Icon = step.icon;
          const title = step.title[language];
          const detail = step.detail[language];
          const tip = step.tip[language];
          return (
            <article
              key={step.id}
              className="flex flex-col justify-between rounded-[20px] border border-neutral-200 bg-white p-6 ruby-shadow dark:border-neutral-800 dark:bg-[#1B1B1F]"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#9B111E]/10 text-[#9B111E] dark:bg-[#E0115F]/15 dark:text-[#FF6B93]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <VoiceButton text={`${title}. ${detail} ${tip}`} id={`bank-${step.id}`} compact />
                </div>
                <h2 className="font-display mt-4 text-lg font-bold text-neutral-900 dark:text-white">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{detail}</p>
              </div>
              <div className="mt-5 rounded-xl bg-[#FAFAFA] p-3.5 text-xs font-medium text-neutral-700 dark:bg-[#141417] dark:text-neutral-300">
                <strong className="text-[#9B111E] dark:text-[#FF5C8A]">Safety Rule: </strong>
                {tip}
              </div>
            </article>
          );
        })}
      </div>

      {/* Interactive Passbook Practice Check */}
      <section className="rounded-[20px] border border-neutral-200 bg-[#FAFAFA] p-6 dark:border-neutral-800 dark:bg-[#1B1B1F]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
            Quick Practice: Reading a Bank Passbook Entry
          </h2>
          <VoiceButton
            text="Quick Practice. Look at the sample passbook row: Date 12 Nov, PM KISAN Installment, 2000 rupees under CR column. Does CR mean money was added or deducted?"
            id="banking-practice"
            compact
          />
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#141417]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-xs text-neutral-600 dark:border-neutral-800 dark:bg-[#1B1B1F] dark:text-neutral-400">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Particulars</th>
                <th className="px-4 py-3">DR (Debit)</th>
                <th className="px-4 py-3">CR (Credit)</th>
                <th className="px-4 py-3">Balance</th>
              </tr>
            </thead>
            <tbody className="font-mono-num">
              <tr>
                <td className="px-4 py-3">12 Nov</td>
                <td className="px-4 py-3 font-sans">PM-KISAN Transfer</td>
                <td className="px-4 py-3 text-neutral-400">—</td>
                <td className="px-4 py-3 font-bold text-emerald-700 dark:text-emerald-400">+₹2,000.00</td>
                <td className="px-4 py-3 font-bold">₹6,450.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          In this passbook row, what does the <strong>CR (Credit)</strong> column mean?
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setPracticeAnswer('cr')}
            className={`min-h-[44px] rounded-full border px-5 py-2 text-sm font-semibold transition-colors cursor-pointer ${
              practiceAnswer === 'cr'
                ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                : 'border-neutral-300 bg-white text-neutral-800 hover:border-[#9B111E] dark:border-neutral-700 dark:bg-[#141417] dark:text-neutral-200'
            }`}
          >
            Money was ADDED to my account
          </button>
          <button
            type="button"
            onClick={() => setPracticeAnswer('dr')}
            className={`min-h-[44px] rounded-full border px-5 py-2 text-sm font-semibold transition-colors cursor-pointer ${
              practiceAnswer === 'dr'
                ? 'border-[#9B111E] bg-[#9B111E]/10 text-[#9B111E] dark:text-[#FF6B93]'
                : 'border-neutral-300 bg-white text-neutral-800 hover:border-[#9B111E] dark:border-neutral-700 dark:bg-[#141417] dark:text-neutral-200'
            }`}
          >
            Money was TAKEN OUT of my account
          </button>
        </div>
        {practiceAnswer !== 'none' && (
          <p className="mt-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {practiceAnswer === 'cr'
              ? 'Correct! CR (Credit) means money entered your account, increasing your balance.'
              : 'Not quite — DR (Debit) means money went out. CR (Credit) means ₹2,000 was added.'}
          </p>
        )}
      </section>

      {/* Complete Module CTA */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-[#9B111E]/25 bg-white p-6 dark:border-[#E0115F]/30 dark:bg-[#1B1B1F]">
        <div>
          <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white">
            {isCompleted ? 'Module Completed — Safe Banker Badge Unlocked!' : 'Finished reading Banking Basics?'}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Mark this module complete to earn +180 XP and unlock your Safe Banker badge.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => markModuleComplete('banking', 'first-step-banking')}
            disabled={isCompleted}
            className={`inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white cursor-pointer ${
              isCompleted ? 'bg-emerald-600' : 'bg-[#9B111E] hover:bg-[#7F0D18]'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            {isCompleted ? 'Completed' : 'Mark Module Complete'}
          </button>
          <button
            type="button"
            onClick={() => navigate('savings')}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 cursor-pointer"
          >
            Next: Savings Tools
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
