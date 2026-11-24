import React, { useState } from 'react';
import {
  MessageSquare,
  Mic,
  MicOff,
  Send,
  X,
  PiggyBank,
  BellRing,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { PageId } from '../types';
import { VoiceButton } from './VoiceButton';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  actionPage?: PageId;
  actionLabel?: string;
}

interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
}

export const AIAssistant: React.FC = () => {
  const { assistantOpen, setAssistantOpen, language, navigate, setEmergencyModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'chat' | 'advisor' | 'alert'>('chat');
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState('');
  const [alertResolved, setAlertResolved] = useState<'none' | 'blocked' | 'approved'>('none');

  // Savings advisor state
  const [incomePattern, setIncomePattern] = useState<'harvest' | 'daily' | 'monthly'>('harvest');
  const [approxMonthly, setApproxMonthly] = useState(12000);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text:
        language === 'hi'
          ? 'नमस्ते! मैं आपका GramFin साथी हूँ। आप बचत, KCC लोन, UPI सुरक्षा, या 1930 रिपोर्ट के बारे में पूछ सकते हैं या माइक से पेज खोल सकते हैं।'
          : language === 'kn'
            ? 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ GramFin ಆರ್ಥಿಕ ಸಂಗಾತಿ. ಉಳಿತಾಯ, KCC ಸಾಲ, UPI ಸುರಕ್ಷತೆ ಅಥವಾ 1930 ಬಗ್ಗೆ ಕೇಳಿ ಅಥವಾ ಮೈಕ್ ಒತ್ತಿ ಪುಟಗಳನ್ನು ತೆರೆಯಿರಿ.'
            : 'Namaste! I am your GramFin Financial Guide. Ask me about saving money, KCC bank loans, UPI scams, or say "Open Fraud Hub" using the mic button.',
    },
  ]);

  const generateReply = (query: string): ChatMessage => {
    const q = query.toLowerCase();

    if (q.includes('fraud') || q.includes('scam') || q.includes('otp') || q.includes('1930') || q.includes('ठगी') || q.includes('फसवणूक') || q.includes('ವಂಚನೆ')) {
      return {
        id: String(Date.now()),
        sender: 'bot',
        text:
          language === 'hi'
            ? 'यदि कोई OTP या UPI PIN माँगता है या अनजान लिंक भेजता है, तो तुरंत कॉल काटें। पैसा कटने पर 1 घंटे के अंदर 1930 पर कॉल करें।'
            : language === 'kn'
              ? 'ಯಾರಾದರೂ OTP ಅಥವಾ UPI PIN ಕೇಳಿದರೆ ತಕ್ಷಣ ಕರೆ ಕಟ್ ಮಾಡಿ. ಹಣ ಕಳವಾದರೆ 1 ಗಂಟೆಯೊಳಗೆ 1930 ಗೆ ಕರೆ ಮಾಡಿ ಮತ್ತು ವಂಚನೆ ಜಾಗೃತಿ ಕೇಂದ್ರ ತೆರೆಯಿರಿ.'
              : 'Never share OTP, PIN, or install AnyDesk. If money was deducted, dial 1930 within 1 hour (Golden Hour) and open our Fraud Awareness Hub.',
        actionPage: 'fraud',
        actionLabel: 'Open Fraud Hub',
      };
    }

    if (q.includes('save') || q.includes('interest') || q.includes('fd') || q.includes('बचत') || q.includes('व्याज') || q.includes('ಉಳಿತಾಯ')) {
      return {
        id: String(Date.now()),
        sender: 'bot',
        text:
          language === 'hi'
            ? 'अपने घर की कमाई का कम से कम 20% हिस्सा बैंक बचत या आवर्ती जमा (RD) में रखें। आप हमारे बचत कैलकुलेटर में अपना लक्ष्य देख सकते हैं।'
            : language === 'kn'
              ? 'ಪ್ರತಿ ಬೆಳೆ ಅಥವಾ ಕೂಲಿಯ ಕನಿಷ್ಠ 15–20% ಹಣವನ್ನು ಪ್ರತ್ಯೇಕ ಬ್ಯಾಂಕ್ ಉಳಿತಾಯ ಅಥವಾ RD ಖಾತೆಯಲ್ಲಿ ಇಡಿ. ನಮ್ಮ ಬಡ್ಡಿ ಕ್ಯಾಲ್ಕುಲೇಟರ್ ಬಳಸಿ ನೋಡಿ.'
              : 'Try setting aside 15–20% of each harvest or wage into a separate savings or RD account. Use our Interest Calculator to see how quarterly compounding grows ₹5,000.',
        actionPage: 'savings',
        actionLabel: 'Open Savings Calculator',
      };
    }

    if (q.includes('loan') || q.includes('kcc') || q.includes('borrow') || q.includes('कर्ज') || q.includes('ऋण') || q.includes('ಸಾಲ')) {
      return {
        id: String(Date.now()),
        sender: 'bot',
        text:
          language === 'hi'
            ? 'साहूकार के 36%–60% सालाना ब्याज से बचें। किसान क्रेडिट कार्ड (KCC) से समय पर चुकाने पर केवल 4% सालाना ब्याज लगता है।'
            : language === 'kn'
              ? 'ತಿಂಗಳಿಗೆ 3%–5% ಬಡ್ಡಿ ಪಡೆಯುವ ಲೇವಾದೇವಿದಾರರಿಂದ ದೂರವಿರಿ. ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ (KCC) ಸಾಲವನ್ನು ಸಮಯಕ್ಕೆ ಮರುಪಾವತಿಸಿದರೆ ವರ್ಷಕ್ಕೆ ಕೇವಲ 4% ಬಡ್ಡಿ ಮಾತ್ರ!'
              : 'Avoid 3%–5% monthly moneylenders (36%–60% per year). A Kisan Credit Card (KCC) loan paid on time costs only ~4% per year!',
        actionPage: 'literacy',
        actionLabel: 'Compare Loan Costs',
      };
    }

    if (q.includes('budget') || q.includes('expense') || q.includes('खर्च') || q.includes('बजट') || q.includes('ಬಜೆಟ್')) {
      return {
        id: String(Date.now()),
        sender: 'bot',
        text:
          language === 'hi'
            ? 'अपने खेती और घर के खर्चों को अलग-अलग लिखें। हमारे मनी मैनेजमेंट टूल में लिखने पर श्रेणी अपने आप चुन ली जाती है।'
            : language === 'kn'
              ? 'ಮನೆ ಮತ್ತು ಕೃಷಿ ಖರ್ಚುಗಳನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ಬರೆಯಿರಿ. ನಮ್ಮ ಹಣ ನಿರ್ವಹಣೆ ಸಾಧನವು ಖರ್ಚುಗಳನ್ನು ತಾನಾಗಿಯೇ ವರ್ಗೀಕರಿಸುತ್ತದೆ.'
              : 'Separating household ration costs from farm inputs helps spot leaks. Try our Money Management tool—just type an expense and it auto-categorizes it.',
        actionPage: 'budget',
        actionLabel: 'Open Budget Planner',
      };
    }

    return {
      id: String(Date.now()),
      sender: 'bot',
      text:
        language === 'hi'
          ? 'बहुत अच्छा सवाल! आप बैंकिंग की मूल बातें, बचत कैलकुलेटर, या फ्रॉड सुरक्षा केंद्र खोलकर पूरी जानकारी आवाज़ में सुन सकते हैं।'
          : language === 'kn'
            ? 'ಉತ್ತಮ ಪ್ರಶ್ನೆ! ಬ್ಯಾಂಕಿಂಗ್ ಮೂಲಭೂತ ಪಾಠಗಳು, ಉಳಿತಾಯ ಕ್ಯಾಲ್ಕುಲೇಟರ್ ಅಥವಾ ವಂಚನೆ ಕೇಂದ್ರವನ್ನು ತೆರೆದು ಕನ್ನಡದಲ್ಲಿ ಧ್ವನಿ ಮೂಲಕ ಕೇಳಿ.'
            : 'Great question! You can explore Banking Basics, Savings & Interest Calculators, or the Fraud Hub—every section includes voice narration in your language.',
      actionPage: 'banking',
      actionLabel: 'Explore Banking Basics',
    };
  };

  const handleSend = (textToSend?: string) => {
    const clean = (textToSend ?? input).trim();
    if (!clean) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, sender: 'user', text: clean };
    const botMsg = generateReply(clean);
    setMessages((prev) => [...prev, userMsg, botMsg]);
    if (!textToSend) setInput('');
  };

  const handleVoiceCommand = (transcript: string) => {
    const t = transcript.toLowerCase();
    setVoiceFeedback(`Heard: "${transcript}"`);
    if (t.includes('report') || t.includes('emergency') || t.includes('1930')) {
      setEmergencyModalOpen(true);
      return;
    }
    if (t.includes('fraud') || t.includes('scam') || t.includes('quiz')) {
      navigate('fraud');
      return;
    }
    if (t.includes('saving') || t.includes('calculator') || t.includes('interest')) {
      navigate('savings');
      return;
    }
    if (t.includes('budget') || t.includes('money') || t.includes('expense')) {
      navigate('budget');
      return;
    }
    if (t.includes('bank')) {
      navigate('banking');
      return;
    }
    if (t.includes('home')) {
      navigate('home');
      return;
    }
    if (t.includes('offline') || t.includes('alert')) {
      navigate('offline');
      return;
    }
    handleSend(transcript);
  };

  const startVoiceNav = () => {
    const SpeechRec =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionInstance }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).webkitSpeechRecognition;

    if (!SpeechRec) {
      setVoiceFeedback('Voice microphone is unavailable in this browser. Tap any quick voice command below.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRec();
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'kn' ? 'kn-IN' : 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    setVoiceFeedback('Listening… say "Open Fraud Hub", "Open Calculator", or ask a question.');

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      handleVoiceCommand(transcript);
    };
    recognition.onerror = () => {
      setIsListening(false);
      setVoiceFeedback('Could not hear microphone clearly. Try tapping a quick command below.');
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.start();
  };

  // Personalized savings split math
  const emergencyAlloc = Math.round(approxMonthly * (incomePattern === 'harvest' ? 0.25 : 0.15));
  const needsAlloc = Math.round(approxMonthly * 0.55);
  const livelihoodAlloc = approxMonthly - emergencyAlloc - needsAlloc;

  return (
    <>
      {/* Floating Assistant Trigger Button */}
      <button
        type="button"
        onClick={() => setAssistantOpen(!assistantOpen)}
        aria-label={assistantOpen ? 'Close Financial Guide Assistant' : 'Open Financial Guide Assistant'}
        className="fixed bottom-16 right-4 z-40 flex h-13 items-center gap-2 rounded-full bg-neutral-900 px-4 text-sm font-semibold text-white shadow-xl hover:bg-neutral-800 md:bottom-6 md:right-6 dark:border dark:border-neutral-700 dark:bg-[#1B1B1F] cursor-pointer"
      >
        <MessageSquare className="h-5 w-5 text-[#FF5C8A]" />
        <span className="hidden sm:inline whitespace-nowrap">
          {language === 'hi' ? 'सहायता चैट' : language === 'kn' ? 'ಸಹಾಯ ಚಾಟ್' : 'Money Guide'}
        </span>
      </button>

      {/* Assistant Drawer */}
      {assistantOpen && (
        <aside
          aria-label="GramFin Multilingual Assistant"
          className="fixed bottom-20 right-4 z-50 flex max-h-[78vh] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-[20px] border border-neutral-200 bg-white shadow-2xl md:bottom-22 md:right-6 dark:border-neutral-800 dark:bg-[#1B1B1F]"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-[#9B111E] px-4 py-3 text-white">
            <div>
              <h3 className="font-display text-sm font-bold">GramFin Voice &amp; Money Guide</h3>
              <p className="text-[11px] text-white/85">Voice navigation · Savings plan · Scam guard</p>
            </div>
            <button
              type="button"
              onClick={() => setAssistantOpen(false)}
              aria-label="Close assistant"
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/15 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Mode Tabs */}
          <div className="grid grid-cols-3 gap-1 border-b border-neutral-200 bg-[#FAFAFA] p-1.5 dark:border-neutral-800 dark:bg-[#141417]">
            {[
              { id: 'chat' as const, label: 'Chat & Voice' },
              { id: 'advisor' as const, label: 'Savings Plan' },
              { id: 'alert' as const, label: 'Alert Demo' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-[#9B111E] shadow-sm dark:bg-[#232329] dark:text-[#FF5C8A]'
                    : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Multilingual Chat + Voice Nav */}
          {activeTab === 'chat' && (
            <>
              <div className="border-b border-neutral-100 bg-white px-3 py-2 dark:border-neutral-800 dark:bg-[#1B1B1F]">
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={startVoiceNav}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                      isListening
                        ? 'bg-[#9B111E] text-white'
                        : 'bg-[#9B111E]/10 text-[#9B111E] hover:bg-[#9B111E]/20 dark:bg-[#E0115F]/20 dark:text-[#FF6B93]'
                    }`}
                  >
                    {isListening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                    {isListening ? 'Listening…' : 'Voice Navigate'}
                  </button>
                  <div className="flex items-center gap-1 overflow-x-auto">
                    {[
                      { label: 'Fraud Hub', cmd: 'Open Fraud Hub' },
                      { label: 'Calculator', cmd: 'Open Calculator' },
                      { label: 'Budget', cmd: 'Open Budget' },
                    ].map((quick) => (
                      <button
                        key={quick.label}
                        type="button"
                        onClick={() => handleVoiceCommand(quick.cmd)}
                        className="rounded-full border border-neutral-200 px-2.5 py-1 text-[11px] font-medium text-neutral-700 hover:border-[#9B111E] dark:border-neutral-700 dark:text-neutral-300 whitespace-nowrap cursor-pointer"
                      >
                        {quick.label}
                      </button>
                    ))}
                  </div>
                </div>
                {voiceFeedback && (
                  <p className="mt-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">{voiceFeedback}</p>
                )}
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-3.5">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#9B111E] text-white'
                          : 'border border-neutral-200 bg-[#FAFAFA] text-neutral-800 dark:border-neutral-800 dark:bg-[#141417] dark:text-neutral-200'
                      }`}
                    >
                      <p>{msg.text}</p>
                      {msg.sender === 'bot' && (
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <VoiceButton text={msg.text} id={`chat-${msg.id}`} compact />
                          {msg.actionPage && (
                            <button
                              type="button"
                              onClick={() => {
                                navigate(msg.actionPage!);
                                setAssistantOpen(false);
                              }}
                              className="inline-flex items-center gap-1 rounded-full bg-[#9B111E] px-3 py-1 text-xs font-semibold text-white cursor-pointer"
                            >
                              {msg.actionLabel}
                              <ArrowRight className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-200 p-3 dark:border-neutral-800">
                <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1">
                  {['How to avoid UPI fraud?', 'Best KCC loan rate?', 'How much should I save?'].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => handleSend(q)}
                      className="rounded-full border border-neutral-200 px-2.5 py-1 text-[11px] font-medium text-neutral-600 hover:border-[#9B111E] hover:text-[#9B111E] dark:border-neutral-700 dark:text-neutral-300 whitespace-nowrap cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask in English or Hindi…"
                    className="flex-1 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-[#141417] dark:text-white"
                  />
                  <button
                    type="submit"
                    aria-label="Send message"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9B111E] text-white hover:bg-[#7F0D18] cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </>
          )}

          {/* Tab 2: Personalized Savings Advisor */}
          {activeTab === 'advisor' && (
            <div className="space-y-4 overflow-y-auto p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
                <PiggyBank className="h-5 w-5 text-[#9B111E] dark:text-[#FF5C8A]" />
                <span>Personalized Rural Savings Plan</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-300">
                  How does your household earn income?
                </label>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'harvest' as const, label: 'Seasonal Harvest' },
                    { id: 'daily' as const, label: 'Daily / Weekly Wage' },
                    { id: 'monthly' as const, label: 'Monthly Salary' },
                  ].map((pat) => (
                    <button
                      key={pat.id}
                      type="button"
                      onClick={() => setIncomePattern(pat.id)}
                      className={`rounded-xl border px-2 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                        incomePattern === pat.id
                          ? 'border-[#9B111E] bg-[#9B111E]/10 text-[#9B111E] dark:border-[#E0115F] dark:text-[#FF6B93]'
                          : 'border-neutral-200 text-neutral-600 dark:border-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {pat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  <span>Average Monthly Income</span>
                  <span className="font-mono-num font-bold text-[#9B111E] dark:text-[#FF5C8A]">
                    ₹{approxMonthly.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min={4000}
                  max={50000}
                  step={1000}
                  value={approxMonthly}
                  onChange={(e) => setApproxMonthly(Number(e.target.value))}
                  className="ruby-slider mt-2 w-full"
                />
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-4 dark:border-neutral-800 dark:bg-[#141417]">
                <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                  Recommended Split ({incomePattern === 'harvest' ? 'Buffer-First Harvest Plan' : 'Steady Weekly Plan'})
                </p>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Emergency &amp; Bank RD</span>
                    <span className="font-mono-num font-bold text-[#9B111E] dark:text-[#FF5C8A]">
                      ₹{emergencyAlloc.toLocaleString('en-IN')} / mo
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Household Essentials</span>
                    <span className="font-mono-num font-semibold">₹{needsAlloc.toLocaleString('en-IN')} / mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seeds / Livestock / Growth</span>
                    <span className="font-mono-num font-semibold">₹{livelihoodAlloc.toLocaleString('en-IN')} / mo</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-400">
                  {incomePattern === 'harvest'
                    ? 'Tip: Move your 25% harvest buffer into a bank Sweep-in FD immediately on crop sale day so lean months stay stress-free.'
                    : incomePattern === 'daily'
                      ? `Tip: Put aside ₹${Math.round(emergencyAlloc / 4).toLocaleString('en-IN')} every Sunday in a Post Office or Jan Dhan RD.`
                      : 'Tip: Set an auto-transfer of 15% on salary day before spending.'}
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Predictive Alert Demo */}
          {activeTab === 'alert' && (
            <div className="space-y-4 overflow-y-auto p-4">
              <div className="rounded-2xl border border-[#9B111E]/30 bg-[#9B111E]/6 p-4 dark:border-[#E0115F]/40 dark:bg-[#E0115F]/12">
                <div className="flex items-start gap-3">
                  <BellRing className="mt-0.5 h-5 w-5 shrink-0 text-[#9B111E] dark:text-[#FF6B93]" />
                  <div>
                    <p className="text-xs font-semibold text-[#9B111E] dark:text-[#FF6B93]">
                      SIMULATION · UNUSUAL ACTIVITY DETECTED
                    </p>
                    <h4 className="mt-1 font-display text-base font-bold text-neutral-900 dark:text-white">
                      ₹4,999 UPI Collect Request at 11:42 PM
                    </h4>
                    <p className="mt-1 text-xs text-neutral-700 dark:text-neutral-300">
                      Sender: <strong>prize.claim-reward88@okaxis</strong>. Your typical transaction hours are 7 AM – 8 PM and this sender is unverified.
                    </p>
                  </div>
                </div>

                {alertResolved === 'none' ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setAlertResolved('blocked')}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#9B111E] px-4 py-2 text-xs font-semibold text-white cursor-pointer"
                    >
                      <ShieldAlert className="h-3.5 w-3.5" />
                      Block &amp; Decline Request
                    </button>
                    <button
                      type="button"
                      onClick={() => setAlertResolved('approved')}
                      className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-[#1B1B1F] dark:text-neutral-200 cursor-pointer"
                    >
                      Test: Enter PIN to "Receive"
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 rounded-xl bg-white p-3 text-xs dark:bg-[#1B1B1F]">
                    {alertResolved === 'blocked' ? (
                      <p className="font-medium text-emerald-700 dark:text-emerald-400">
                        Safe choice! You blocked a classic late-night UPI Collect scam and protected ₹4,999.
                      </p>
                    ) : (
                      <p className="font-medium text-[#9B111E] dark:text-[#FF6B93]">
                        Warning! Entering your UPI PIN on a Collect Request would have SENT ₹4,999 out of your account. Always decline unexpected collect requests.
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => setAlertResolved('none')}
                      className="mt-2 font-semibold text-neutral-600 underline dark:text-neutral-300 cursor-pointer"
                    >
                      Reset simulation
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </aside>
      )}
    </>
  );
};
