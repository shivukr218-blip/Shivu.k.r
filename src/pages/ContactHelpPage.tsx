import React, { useState } from 'react';
import { PhoneCall, MessageSquare, Mail, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VoiceButton } from '../components/VoiceButton';

export const ContactHelpPage: React.FC = () => {
  const { language, setAssistantOpen, setEmergencyModalOpen } = useApp();
  const [name, setName] = useState('');
  const [village, setVillage] = useState('');
  const [topic, setTopic] = useState('Village Financial Literacy Camp');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitted(true);
    setName('');
    setVillage('');
    setMessage('');
  };

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-8 pb-24 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <div>
          <p className="text-xs font-semibold text-[#9B111E] dark:text-[#FF5C8A]">
            Module 11 · Support &amp; Village Workshops
          </p>
          <h1 className="font-display mt-1 text-3xl font-extrabold text-neutral-900 dark:text-white">
            {language === 'hi' ? 'संपर्क और सहायता' : language === 'kn' ? 'ಸಂಪರ್ಕ ಮತ್ತು ಸಹಾಯ' : 'Contact & Help'}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-neutral-600 dark:text-neutral-300">
            Reach national cyber helplines immediately, ask the GramFin Voice Guide, or request a free financial awareness camp in your panchayat.
          </p>
        </div>
        <VoiceButton
          text="Need help? Call 1930 for cyber fraud, 14440 for RBI banking support, or use the form below to request a village literacy camp."
          id="contact-voice"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="space-y-4 md:col-span-5">
          <div className="rounded-[20px] border border-neutral-200 bg-white p-5 ruby-shadow dark:border-neutral-800 dark:bg-[#1B1B1F]">
            <h2 className="font-display text-lg font-bold text-neutral-900 dark:text-white">Direct Helplines</h2>
            <div className="mt-4 space-y-3 text-sm">
              <a
                href="tel:1930"
                className="flex items-center justify-between rounded-xl bg-[#9B111E] p-3.5 text-white"
              >
                <span className="font-semibold">Cyber Fraud Helpline</span>
                <span className="inline-flex items-center gap-1.5 font-mono-num font-bold">
                  <PhoneCall className="h-4 w-4" /> 1930
                </span>
              </a>
              <a
                href="tel:14440"
                className="flex items-center justify-between rounded-xl border border-neutral-200 bg-[#FAFAFA] p-3.5 dark:border-neutral-800 dark:bg-[#141417]"
              >
                <span className="font-semibold">RBI Sachet Toll-Free</span>
                <span className="inline-flex items-center gap-1.5 font-mono-num font-bold text-[#9B111E] dark:text-[#FF5C8A]">
                  <PhoneCall className="h-4 w-4" /> 14440
                </span>
              </a>
            </div>
          </div>

          <div className="rounded-[20px] border border-neutral-200 bg-[#FAFAFA] p-5 dark:border-neutral-800 dark:bg-[#1B1B1F]">
            <h3 className="font-display text-base font-bold text-neutral-900 dark:text-white">Instant Digital Help</h3>
            <div className="mt-3 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => setAssistantOpen(true)}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white dark:bg-neutral-800 cursor-pointer"
              >
                <MessageSquare className="h-4 w-4 text-[#FF5C8A]" />
                Open Voice &amp; Chat Guide
              </button>
              <button
                type="button"
                onClick={() => setEmergencyModalOpen(true)}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#9B111E] px-4 py-2 text-xs font-semibold text-[#9B111E] dark:border-[#E0115F] dark:text-[#FF6B93] cursor-pointer"
              >
                <ShieldAlert className="h-4 w-4" />
                Open Fraud Emergency Modal
              </button>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-[20px] border border-neutral-200 bg-white p-6 ruby-shadow md:col-span-7 dark:border-neutral-800 dark:bg-[#1B1B1F]"
        >
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-[#9B111E] dark:text-[#FF5C8A]" />
            <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
              Send a Question or Request a Village Camp
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-1 w-full rounded-xl border border-neutral-300 bg-[#FAFAFA] px-3.5 py-2.5 text-sm dark:border-neutral-700 dark:bg-[#141417]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                Village / Gram Panchayat
              </label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="District & village"
                className="mt-1 w-full rounded-xl border border-neutral-300 bg-[#FAFAFA] px-3.5 py-2.5 text-sm dark:border-neutral-700 dark:bg-[#141417]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">Subject</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 w-full rounded-xl border border-neutral-300 bg-[#FAFAFA] px-3.5 py-2.5 text-sm dark:border-neutral-700 dark:bg-[#141417]"
            >
              <option value="Village Financial Literacy Camp">Request Village Financial Literacy Camp</option>
              <option value="SHG Training Session">Self-Help Group (SHG) Banking Training</option>
              <option value="Local Language Suggestion">Request Additional Regional Language</option>
              <option value="General Question">General Question</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300">Message</label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your question or village workshop details (never include passwords or PINs)…"
              className="mt-1 w-full rounded-xl border border-neutral-300 bg-[#FAFAFA] p-3.5 text-sm dark:border-neutral-700 dark:bg-[#141417]"
            />
          </div>

          <button
            type="submit"
            className="min-h-[48px] w-full rounded-full bg-[#9B111E] py-3 text-sm font-semibold text-white hover:bg-[#7F0D18] cursor-pointer"
          >
            Submit Support Request
          </button>

          {submitted && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Thank you! Your message has been logged for our regional GramFin coordinator.</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
