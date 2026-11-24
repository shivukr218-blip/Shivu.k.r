import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ShieldAlert,
  PhoneCall,
  Play,
  Pause,
  CheckSquare,
  Square,
  ExternalLink,
  ScanSearch,
  Upload,
  Sparkles,
  Award,
  AlertTriangle,
  CheckCircle2,
  Copy,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BANK_HELPLINES, FRAUD_QUIZ_QUESTIONS } from '../data/modulesData';
import { VoiceButton } from '../components/VoiceButton';

const STORYBOARD_SCENES = [
  {
    id: 'kyc',
    title: {
      en: 'Scene 1: The Fake KYC Call',
      hi: 'दृश्य 1: नकली KYC कॉल से बचाव',
      kn: 'ದೃಶ್ಯ 1: ನಕಲಿ KYC ಕರೆಯನ್ನು ಗುರುತಿಸುವುದು',
    },
    caption: {
      en: '"Madam, your ration/bank account will block tonight. Tell me the 6-digit OTP!" -> NEVER share OTP. Banks update KYC only in person or via official apps.',
      hi: '"आपका बैंक खाता आज रात बंद होगा, 6 अंक का OTP बताएं!" -> कभी OTP न बताएँ। बैंक फोन पर KYC नहीं करता।',
      kn: '"ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆ ಇಂದು ರಾತ್ರಿ ಬಂದ್ ಆಗುತ್ತದೆ, 6-ಅಂಕಿಯ OTP ಹೇಳಿ!" -> ಎಂದಿಗೂ OTP ಹೇಳಬೇಡಿ. ಬ್ಯಾಂಕ್ ಫೋನ್‌ನಲ್ಲಿ KYC ಮಾಡುವುದಿಲ್ಲ.',
    },
  },
  {
    id: 'upi',
    title: {
      en: 'Scene 2: The UPI "Receive Money" PIN Trap',
      hi: 'दृश्य 2: UPI से पैसे मिलने के नाम पर पिन का जाल',
      kn: 'ದೃಶ್ಯ 2: UPI ಹಣ ಪಡೆಯುವ ಹೆಸರಿನಲ್ಲಿ PIN ಬಲೆ',
    },
    caption: {
      en: 'Scammer sends a ₹5,000 Collect Request claiming it is crop subsidy or prize money. Remember: Entering UPI PIN ALWAYS sends money OUT!',
      hi: 'ठग ₹5,000 की Collect Request भेजकर कहता है "इनाम लेने के लिए PIN डालें।" याद रखें: PIN डालने से पैसा हमेशा कटता है!',
      kn: 'ವಂಚಕರು ₹5,000 Collect Request ಕಳುಹಿಸಿ "ಬಹುಮಾನ ಪಡೆಯಲು PIN ಹಾಕಿ" ಎನ್ನುತ್ತಾರೆ. ನೆನಪಿಡಿ: UPI PIN ಹಾಕಿದರೆ ಹಣ ಖಾತೆಯಿಂದ ಕಡಿತವಾಗುತ್ತದೆ!',
    },
  },
  {
    id: 'golden',
    title: {
      en: 'Scene 3: Golden Hour 1930 Action',
      hi: 'दृश्य 3: गोल्डन आवर में 1930 पर कॉल',
      kn: 'ದೃಶ್ಯ 3: ಗೋಲ್ಡನ್ ಅವರ್‌ನಲ್ಲಿ 1930 ಗೆ ಕರೆ',
    },
    caption: {
      en: 'If money is stolen, dial 1930 immediately within 60 minutes. Cyber police freeze the receiver account before cash can be withdrawn.',
      hi: 'पैसे कटने पर 60 मिनट के अंदर 1930 पर कॉल करें ताकि ठग के खाते से निकासी रोकी जा सके।',
      kn: 'ಹಣ ಕಳವಾದರೆ 60 ನಿಮಿಷಗಳ ಒಳಗೆ ತಕ್ಷಣ 1930 ಗೆ ಕರೆ ಮಾಡಿ, ಇದರಿಂದ ಸೈಬರ್ ಪೊಲೀಸರು ವಂಚಕರ ಖಾತೆಯನ್ನು ಫ್ರೀಜ್ ಮಾಡುತ್ತಾರೆ.',
    },
  },
];

const EVIDENCE_ITEMS = [
  { id: 'ev-sms', label: 'Screenshots of scam SMS, WhatsApp chat, or phishing link' },
  { id: 'ev-call', label: 'Call logs showing scammer phone number, date, and call duration' },
  { id: 'ev-utr', label: '12-digit UTR / Transaction Reference ID from UPI app or bank SMS' },
  { id: 'ev-stmt', label: 'Bank mini-statement / passbook photo showing unauthorized debit' },
];

const SAMPLE_SCAMS = [
  {
    label: 'Fake KYC Link SMS',
    text: 'Dear Customer, Your SBI YONO KYC is expired today. Your account will be blocked within 2 hours. Click http://bit.ly/sbi-kyc-update99 and verify Aadhaar OTP immediately.',
  },
  {
    label: 'Lottery / Prize Trap',
    text: 'CONGRATULATIONS! Your mobile number won ₹25,00,000 in Kisan Bumper Lottery. Pay ₹1,999 processing fee via UPI or install AnyDesk to claim prize today.',
  },
  {
    label: 'Electricity Cut Threat',
    text: 'URGENT: Your electricity power will be disconnected tonight at 9:30 PM because previous month bill is not updated. Call officer immediately on 9876500112.',
  },
  {
    label: 'Legitimate Bank Alert',
    text: 'Your A/c XX4192 is credited with INR 2,000.00 on 12-Nov-26 by PM-KISAN DBT. Available Bal: INR 6,450.00. Never share OTP with anyone - State Bank.',
  },
];

const SAMPLE_RECEIPT_OCR = {
  upi: `PhonePe / UPI Payment Failed / Suspicious Collect\nAmount: ₹4,999.00\nUTR / Ref No: 432819048217\nSender VPA: kyc.verify-helpline@ybl\nCaller Mobile: +91 98210 44912\nLink: http://bit.ly/claim-refund-now`,
  sms: `ALERT: Rs 8,500.00 debited from A/c XX8821 via IMPS Ref 619042771204.\nIf not done by you, call 1930 or 18001234 immediately.\nUnknown Caller: 9123400881`,
};

export const FraudHubPage: React.FC = () => {
  const { language, speakText, stopSpeaking, recordQuizScore, markModuleComplete, setEmergencyModalOpen } = useApp();

  // Storyboard player state
  const [sceneIdx, setSceneIdx] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [voiceoverOn, setVoiceoverOn] = useState(true);
  const [posterError, setPosterError] = useState(false);

  // Evidence checklist persisted
  const [checkedEvidence, setCheckedEvidence] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gramfin_evidence_checks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('gramfin_evidence_checks', JSON.stringify(checkedEvidence));
  }, [checkedEvidence]);

  // Storyboard auto-advance
  useEffect(() => {
    if (!videoPlaying) return;
    const scene = STORYBOARD_SCENES[sceneIdx];
    if (voiceoverOn) {
      speakText(`${scene.title[language]}. ${scene.caption[language]}`, `story-${scene.id}`);
    }
    const timer = setTimeout(() => {
      if (sceneIdx < STORYBOARD_SCENES.length - 1) {
        setSceneIdx((i) => i + 1);
      } else {
        setVideoPlaying(false);
      }
    }, 6500);
    return () => clearTimeout(timer);
  }, [videoPlaying, sceneIdx, voiceoverOn, language, speakText]);

  // AI Scam Message Detector State
  const [smsText, setSmsText] = useState(SAMPLE_SCAMS[0].text);
  const scamAnalysis = React.useMemo(() => {
    const txt = smsText.trim();
    if (!txt) return null;
    const lower = txt.toLowerCase();
    const flags: string[] = [];
    let score = 5;

    if (/(bit\.ly|tinyurl|apk|http:\/\/|claim|verify-)/.test(lower)) {
      flags.push('Shortened or suspicious external link / APK file');
      score += 32;
    }
    if (/(otp|pin|cvv|anydesk|quicksupport|teamviewer)/.test(lower)) {
      flags.push('Requests OTP, PIN, or remote screen-sharing app');
      score += 35;
    }
    if (/(blocked|disconnect|tonight|within 2 hours|urgent|immediately|expire)/.test(lower)) {
      flags.push('Artificial panic / urgent deadline threat');
      score += 20;
    }
    if (/(lottery|prize|won|bumper|processing fee|cashback)/.test(lower)) {
      flags.push('Unrealistic lottery / prize money claim');
      score += 28;
    }
    if (/(credited|never share otp)/.test(lower) && !/(bit\.ly|http:\/\/|anydesk|call officer)/.test(lower)) {
      score = Math.max(8, score - 25);
    }

    const confidence = Math.min(98, score);
    const level: 'HIGH RISK SCAM' | 'SUSPICIOUS' | 'LIKELY SAFE' =
      confidence >= 60 ? 'HIGH RISK SCAM' : confidence >= 30 ? 'SUSPICIOUS' : 'LIKELY SAFE';

    return { confidence, level, flags };
  }, [smsText]);

  // Image-Based Evidence Scanner (OCR Demo) State
  const [ocrSourceName, setOcrSourceName] = useState<string>('');
  const [ocrScanning, setOcrScanning] = useState(false);
  const [ocrResult, setOcrResult] = useState<{
    rawText: string;
    utr: string;
    amount: string;
    phone: string;
    upi: string;
  } | null>(null);
  const [copiedReport, setCopiedReport] = useState(false);

  const runOcrExtraction = (rawText: string, label: string) => {
    setOcrSourceName(label);
    setOcrScanning(true);
    setOcrResult(null);
    setTimeout(() => {
      const utrMatch = rawText.match(/\b\d{12}\b/);
      const amtMatch = rawText.match(/(?:₹|Rs\.?|INR)\s?[\d,]+(?:\.\d{1,2})?/i);
      const phoneMatch = rawText.match(/(?:\+91[\s-]?)?\b[6-9]\d{4}[\s-]?\d{5}\b/);
      const upiMatch = rawText.match(/[a-zA-Z0-9._-]+@[a-zA-Z]+/);

      setOcrResult({
        rawText,
        utr: utrMatch ? utrMatch[0] : 'Not clearly detected — enter manually',
        amount: amtMatch ? amtMatch[0] : 'Not detected',
        phone: phoneMatch ? phoneMatch[0] : 'Not detected',
        upi: upiMatch ? upiMatch[0] : 'None found',
      });
      setOcrScanning(false);
    }, 650);
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const simulatedText = `Uploaded Evidence: ${file.name}\nDate: ${new Date().toLocaleDateString()}\nAmount: ₹3,250.00\nUTR / Ref No: 509184726190\nSuspicious VPA: helpdesk.kyc@okicici\nCaller Number: +91 98112 77340`;
    runOcrExtraction(simulatedText, file.name);
  };

  // Interactive Fraud Awareness Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizScoreCount = FRAUD_QUIZ_QUESTIONS.reduce(
    (acc, q) => (quizAnswers[q.id] === q.correctIndex ? acc + 1 : acc),
    0
  );
  const quizPercent = Math.round((quizScoreCount / FRAUD_QUIZ_QUESTIONS.length) * 100);

  const submitQuiz = () => {
    setQuizSubmitted(true);
    recordQuizScore(quizPercent);
    if (quizPercent >= 75) {
      markModuleComplete('fraud', 'fraud-fighter');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#9B111E', '#E0115F', '#FFFFFF'],
      });
    }
  };

  const activeScene = STORYBOARD_SCENES[sceneIdx];

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 pb-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <div>
          <p className="text-xs font-semibold text-[#9B111E] dark:text-[#FF5C8A]">
            Module 03 · Protection · Golden Hour Guide &amp; Scam Detectors
          </p>
          <h1 className="font-display mt-1 text-3xl font-extrabold text-neutral-900 dark:text-white">
            {language === 'hi' ? 'फ्रॉड जागरूकता केंद्र' : language === 'kn' ? 'ವಂಚನೆ ಜಾಗೃತಿ ಕೇಂದ್ರ' : 'Fraud Awareness Hub'}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-neutral-600 dark:text-neutral-300">
            Learn how rural scams work, verify suspicious SMS messages, scan payment screenshots for evidence, and earn your Fraud Fighter badge.
          </p>
        </div>
        <VoiceButton
          text="Welcome to the Fraud Awareness Hub. Remember the Golden Hour rule: if money is stolen, call 1930 within 1 hour to freeze the stolen money before scammers withdraw it."
          id="fraud-hub-intro"
        />
      </div>

      {/* Golden Hour Warning Banner */}
      <section className="flex flex-col justify-between gap-4 rounded-[20px] bg-[#9B111E] p-6 text-white ruby-shadow md:flex-row md:items-center">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
            <ShieldAlert className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xs font-bold tracking-wide text-white/85">GOLDEN HOUR EMERGENCY RULE</p>
            <h2 className="font-display mt-0.5 text-xl font-extrabold sm:text-2xl">
              Report within 1 hour to freeze stolen money
            </h2>
            <p className="mt-1 text-sm text-white/90">
              Calling 1930 right away alerts all Indian banks to hold the scammer’s receiving account before cash-out.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <a
            href="tel:1930"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#9B111E] hover:bg-neutral-100"
          >
            <PhoneCall className="h-4 w-4" />
            Call 1930 Now
          </a>
          <button
            type="button"
            onClick={() => setEmergencyModalOpen(true)}
            className="min-h-[48px] rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 cursor-pointer"
          >
            Immediate Guide
          </button>
        </div>
      </section>

      {/* Local-Language Interactive Video Storyboard Player + Immediate Action Guide */}
      <div className="grid gap-6 lg:grid-cols-12">
        <section className="rounded-[20px] border border-neutral-200 bg-white p-6 ruby-shadow lg:col-span-7 dark:border-neutral-800 dark:bg-[#1B1B1F]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
              Local-Language Video Guide
            </h2>
            <button
              type="button"
              onClick={() => setVoiceoverOn(!voiceoverOn)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                voiceoverOn
                  ? 'bg-[#9B111E] text-white'
                  : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
              }`}
            >
              Voiceover: {voiceoverOn ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="relative mt-4 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 dark:border-neutral-700">
            {!posterError ? (
              <img
                src="/src/assets/images/fraud_awareness_shield_1795460158997.jpg"
                alt="Rural farmer checking bank passbook and phone safely"
                referrerPolicy="no-referrer"
                onError={() => setPosterError(true)}
                className="h-56 w-full object-cover opacity-55"
              />
            ) : (
              <div className="h-56 w-full bg-gradient-to-br from-[#9B111E] to-neutral-900" />
            )}
            <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/90 via-black/45 to-black/30 p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#FF85A6]">
                  Scene {sceneIdx + 1} of {STORYBOARD_SCENES.length}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (videoPlaying) {
                      setVideoPlaying(false);
                      stopSpeaking();
                    } else {
                      setVideoPlaying(true);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#9B111E] px-4 py-2 text-xs font-bold text-white hover:bg-[#7F0D18] cursor-pointer"
                >
                  {videoPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  {videoPlaying ? 'Pause Story' : 'Play with Audio'}
                </button>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold">{activeScene.title[language]}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/90">{activeScene.caption[language]}</p>
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {STORYBOARD_SCENES.map((sc, i) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  setSceneIdx(i);
                  setVideoPlaying(false);
                  stopSpeaking();
                }}
                className={`rounded-xl border p-2.5 text-left text-xs font-semibold transition-colors cursor-pointer ${
                  sceneIdx === i
                    ? 'border-[#9B111E] bg-[#9B111E]/8 text-[#9B111E] dark:border-[#E0115F] dark:text-[#FF6B93]'
                    : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800'
                }`}
              >
                {sc.title[language]}
              </button>
            ))}
          </div>
        </section>

        {/* Immediate Action Guide + Evidence Checklist */}
        <section className="flex flex-col justify-between rounded-[20px] border border-neutral-200 bg-white p-6 ruby-shadow lg:col-span-5 dark:border-neutral-800 dark:bg-[#1B1B1F]">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
                Immediate Action &amp; Evidence
              </h2>
              <VoiceButton
                text="Step 1: Hang up immediately. Step 2: Never share OTP or PIN. Step 3: Save screenshots, call logs, and your 12-digit UTR number."
                id="action-guide-voice"
                compact
              />
            </div>

            <ol className="mt-4 space-y-2.5 text-sm text-neutral-700 dark:text-neutral-300">
              <li><strong className="text-[#9B111E] dark:text-[#FF5C8A]">1. Hang up immediately:</strong> Do not stay on the call with suspicious agents.</li>
              <li><strong className="text-[#9B111E] dark:text-[#FF5C8A]">2. Never share OTP / PIN:</strong> No bank or police officer needs an OTP to reverse money.</li>
              <li><strong className="text-[#9B111E] dark:text-[#FF5C8A]">3. Note transaction details:</strong> Write down time, amount &amp; UTR ID.</li>
            </ol>

            <h3 className="mt-6 text-sm font-bold text-neutral-900 dark:text-white">
              Evidence Checklist ({checkedEvidence.length}/{EVIDENCE_ITEMS.length} ready)
            </h3>
            <div className="mt-2.5 space-y-2">
              {EVIDENCE_ITEMS.map((item) => {
                const checked = checkedEvidence.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setCheckedEvidence((prev) =>
                        prev.includes(item.id) ? prev.filter((x) => x !== item.id) : [...prev, item.id]
                      )
                    }
                    className="flex w-full items-start gap-2.5 rounded-xl border border-neutral-200 p-2.5 text-left text-xs font-medium text-neutral-700 hover:border-[#9B111E]/50 dark:border-neutral-800 dark:text-neutral-300 cursor-pointer"
                  >
                    {checked ? (
                      <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-[#9B111E] dark:text-[#FF5C8A]" />
                    ) : (
                      <Square className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
                    )}
                    <span className={checked ? 'line-through opacity-75' : ''}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 border-t border-neutral-100 pt-4 dark:border-neutral-800">
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white dark:bg-neutral-800"
            >
              cybercrime.gov.in
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://sancharsaathi.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-800 dark:border-neutral-700 dark:text-neutral-200"
            >
              Report Scam Call (Chakshu)
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </section>
      </div>

      {/* AI Scam Message Detector + Image-Based Evidence Scanner (OCR) */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* AI Scam Message Detector */}
        <section className="rounded-[20px] border border-neutral-200 bg-white p-6 ruby-shadow dark:border-neutral-800 dark:bg-[#1B1B1F]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-[#9B111E] dark:text-[#FF5C8A]" />
              <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
                AI Scam Message Detector
              </h2>
            </div>
            {scamAnalysis && (
              <VoiceButton
                text={`Risk level: ${scamAnalysis.level}. Confidence ${scamAnalysis.confidence} percent. ${scamAnalysis.flags.join('. ')}`}
                id="scam-detector-voice"
                compact
              />
            )}
          </div>
          <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
            Paste any suspicious SMS or WhatsApp message below, or tap a test sample.
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {SAMPLE_SCAMS.map((sample) => (
              <button
                key={sample.label}
                type="button"
                onClick={() => setSmsText(sample.text)}
                className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-700 hover:border-[#9B111E] hover:text-[#9B111E] dark:border-neutral-700 dark:text-neutral-300 cursor-pointer"
              >
                {sample.label}
              </button>
            ))}
          </div>

          <textarea
            rows={4}
            value={smsText}
            onChange={(e) => setSmsText(e.target.value)}
            placeholder="Paste suspicious SMS or WhatsApp text here…"
            className="mt-3 w-full rounded-2xl border border-neutral-300 bg-[#FAFAFA] p-3.5 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-[#141417] dark:text-white"
          />

          {scamAnalysis && (
            <div
              className={`mt-4 rounded-2xl border p-4 ${
                scamAnalysis.level === 'HIGH RISK SCAM'
                  ? 'border-[#9B111E]/40 bg-[#9B111E]/8 dark:border-[#E0115F]/40 dark:bg-[#E0115F]/12'
                  : scamAnalysis.level === 'SUSPICIOUS'
                    ? 'border-amber-500/40 bg-amber-50 dark:bg-amber-950/30'
                    : 'border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/30'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-sm font-extrabold">
                  {scamAnalysis.level === 'LIKELY SAFE' ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-[#9B111E] dark:text-[#FF5C8A]" />
                  )}
                  {scamAnalysis.level}
                </span>
                <span className="font-mono-num text-xs font-bold">
                  {scamAnalysis.confidence}% Confidence
                </span>
              </div>
              {scamAnalysis.flags.length > 0 ? (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-neutral-700 dark:text-neutral-300">
                  {scamAnalysis.flags.map((flag) => (
                    <li key={flag}>{flag}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-xs text-neutral-700 dark:text-neutral-300">
                  No phishing links or OTP demands found, though always verify with your bank directly if unsure.
                </p>
              )}
            </div>
          )}
        </section>

        {/* Image-Based Evidence Scanner (Mock OCR) */}
        <section className="rounded-[20px] border border-neutral-200 bg-white p-6 ruby-shadow dark:border-neutral-800 dark:bg-[#1B1B1F]">
          <div className="flex items-center gap-2.5">
            <ScanSearch className="h-5 w-5 text-[#9B111E] dark:text-[#FF5C8A]" />
            <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
              Image-Based Evidence Scanner (OCR)
            </h2>
          </div>
          <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
            Upload a payment or SMS screenshot to extract UTR IDs, phone numbers &amp; VPA handles for 1930 reporting.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full bg-[#9B111E] px-4 py-2 text-xs font-semibold text-white hover:bg-[#7F0D18]">
              <Upload className="h-4 w-4" />
              Upload Screenshot
              <input type="file" accept="image/*" onChange={handleScreenshotUpload} className="hidden" />
            </label>
            <button
              type="button"
              onClick={() => runOcrExtraction(SAMPLE_RECEIPT_OCR.upi, 'sample-upi-scam.png')}
              className="min-h-[44px] rounded-full border border-neutral-300 px-3.5 py-2 text-xs font-semibold text-neutral-700 hover:border-[#9B111E] dark:border-neutral-700 dark:text-neutral-300 cursor-pointer"
            >
              Scan Sample UPI Receipt
            </button>
            <button
              type="button"
              onClick={() => runOcrExtraction(SAMPLE_RECEIPT_OCR.sms, 'sample-bank-sms.png')}
              className="min-h-[44px] rounded-full border border-neutral-300 px-3.5 py-2 text-xs font-semibold text-neutral-700 hover:border-[#9B111E] dark:border-neutral-700 dark:text-neutral-300 cursor-pointer"
            >
              Scan Sample Debit SMS
            </button>
          </div>

          {ocrScanning && (
            <div className="mt-4 rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-4 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-[#141417] dark:text-neutral-300">
              Scanning <strong>{ocrSourceName}</strong> for UTR numbers, UPI handles, and phone digits…
            </div>
          )}

          {ocrResult && !ocrScanning && (
            <div className="mt-4 space-y-3 rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-4 dark:border-neutral-800 dark:bg-[#141417]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                  Extracted from: {ocrSourceName}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(
                      `UTR: ${ocrResult.utr} | Amount: ${ocrResult.amount} | Phone: ${ocrResult.phone} | UPI: ${ocrResult.upi}`
                    );
                    setCopiedReport(true);
                    setTimeout(() => setCopiedReport(false), 2000);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#9B111E] dark:text-[#FF5C8A] cursor-pointer"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copiedReport ? 'Copied!' : 'Copy for 1930'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="rounded-xl bg-white p-2.5 dark:bg-[#1B1B1F]">
                  <span className="text-neutral-500">UTR / Ref ID</span>
                  <p className="font-mono-num mt-0.5 font-bold text-neutral-900 dark:text-white">{ocrResult.utr}</p>
                </div>
                <div className="rounded-xl bg-white p-2.5 dark:bg-[#1B1B1F]">
                  <span className="text-neutral-500">Amount</span>
                  <p className="font-mono-num mt-0.5 font-bold text-[#9B111E] dark:text-[#FF5C8A]">{ocrResult.amount}</p>
                </div>
                <div className="rounded-xl bg-white p-2.5 dark:bg-[#1B1B1F]">
                  <span className="text-neutral-500">Caller Phone</span>
                  <p className="font-mono-num mt-0.5 font-bold">{ocrResult.phone}</p>
                </div>
                <div className="rounded-xl bg-white p-2.5 dark:bg-[#1B1B1F]">
                  <span className="text-neutral-500">Suspicious UPI ID</span>
                  <p className="font-mono-num mt-0.5 truncate font-bold">{ocrResult.upi}</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Bank Card / UPI Block Directory */}
      <section className="rounded-[20px] border border-neutral-200 bg-[#FAFAFA] p-6 dark:border-neutral-800 dark:bg-[#1B1B1F]">
        <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
          Bank Card, UPI &amp; Net-Banking Block Instructions
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BANK_HELPLINES.map((b) => (
            <div
              key={b.name}
              className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-[#141417]"
            >
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">{b.name}</h3>
                <p className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-400">{b.note}</p>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-2.5 dark:border-neutral-800">
                <a
                  href={`tel:${b.tollFree.replace(/\s+/g, '')}`}
                  className="font-mono-num text-sm font-bold text-[#9B111E] hover:underline dark:text-[#FF5C8A]"
                >
                  {b.tollFree}
                </a>
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400"
                >
                  Website ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Fraud Awareness Quiz */}
      <section className="rounded-[20px] border border-neutral-200 bg-white p-6 ruby-shadow dark:border-neutral-800 dark:bg-[#1B1B1F]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Award className="h-6 w-6 text-[#9B111E] dark:text-[#FF5C8A]" />
            <div>
              <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
                Fraud Awareness Quiz (Unlock Fraud Fighter Badge)
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Score 75% or higher to earn your badge and +150 XP
              </p>
            </div>
          </div>
          {quizSubmitted && (
            <span className="font-mono-num text-lg font-extrabold text-[#9B111E] dark:text-[#FF5C8A]">
              Score: {quizScoreCount}/{FRAUD_QUIZ_QUESTIONS.length} ({quizPercent}%)
            </span>
          )}
        </div>

        <div className="mt-6 space-y-6">
          {FRAUD_QUIZ_QUESTIONS.map((q, qIdx) => {
            const selected = quizAnswers[q.id];
            return (
              <div
                key={q.id}
                className="rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-5 dark:border-neutral-800 dark:bg-[#141417]"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">
                    {qIdx + 1}. {q.scenario[language]}
                  </p>
                  <VoiceButton text={q.scenario[language]} id={`quiz-${q.id}`} compact />
                </div>

                <div className="mt-3 space-y-2">
                  {q.options[language].map((opt, oIdx) => {
                    const isPicked = selected === oIdx;
                    const isRight = q.correctIndex === oIdx;
                    let cls =
                      'border-neutral-200 bg-white text-neutral-800 hover:border-[#9B111E]/50 dark:border-neutral-700 dark:bg-[#1B1B1F] dark:text-neutral-200';
                    if (quizSubmitted) {
                      if (isRight) {
                        cls = 'border-emerald-600 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200';
                      } else if (isPicked && !isRight) {
                        cls = 'border-[#9B111E] bg-[#9B111E]/10 text-[#9B111E] dark:text-[#FF6B93]';
                      }
                    } else if (isPicked) {
                      cls = 'border-[#9B111E] bg-[#9B111E]/10 text-[#9B111E] dark:border-[#E0115F] dark:text-[#FF6B93]';
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        disabled={quizSubmitted}
                        onClick={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: oIdx }))}
                        className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors cursor-pointer ${cls}`}
                      >
                        <span className="font-mono-num text-xs font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <p className="mt-3 text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
                    <strong>Explanation: </strong>
                    {q.explanation[language]}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {!quizSubmitted ? (
            <button
              type="button"
              onClick={submitQuiz}
              disabled={Object.keys(quizAnswers).length < FRAUD_QUIZ_QUESTIONS.length}
              className="min-h-[48px] rounded-full bg-[#9B111E] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#7F0D18] disabled:opacity-50 cursor-pointer"
            >
              Submit Answers ({Object.keys(quizAnswers).length}/{FRAUD_QUIZ_QUESTIONS.length} answered)
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setQuizAnswers({});
                setQuizSubmitted(false);
              }}
              className="min-h-[48px] rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 cursor-pointer"
            >
              Retake Quiz
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
