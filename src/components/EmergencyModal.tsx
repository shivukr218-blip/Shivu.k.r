import React from 'react';
import { PhoneCall, ShieldAlert, ExternalLink, X, Clock, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BANK_HELPLINES } from '../data/modulesData';
import { VoiceButton } from './VoiceButton';

export const EmergencyModal: React.FC = () => {
  const { emergencyModalOpen, setEmergencyModalOpen, language, navigate } = useApp();

  if (!emergencyModalOpen) return null;

  const emergencySpeech =
    language === 'hi'
      ? 'घबराएँ नहीं। तुरंत 1930 पर कॉल करें। कोई नया OTP साझा न करें और अपना बैंक कार्ड या UPI तुरंत ब्लॉक करें।'
      : language === 'kn'
        ? 'ಗಾಬರಿಯಾಗಬೇಡಿ. ತಕ್ಷಣ 1930 ಗೆ ಕರೆ ಮಾಡಿ. ಯಾವುದೇ ಹೊಸ OTP ಹಂಚಿಕೊಳ್ಳಬೇಡಿ ಮತ್ತು ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಕಾರ್ಡ್ ಅಥವಾ UPI ಅನ್ನು ತಕ್ಷಣ ಬ್ಲಾಕ್ ಮಾಡಿ.'
        : 'Stay calm. Call 1930 immediately within the Golden Hour. Hang up on the caller, never share another OTP, and freeze your bank card or UPI right away.';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[20px] border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-[#1B1B1F]">
        <div className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-4 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#9B111E] text-white">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h2 id="emergency-modal-title" className="font-display text-xl font-bold text-neutral-900 dark:text-white">
                {language === 'hi'
                  ? 'आपातकालीन फ्रॉड सहायता (गोल्डन आवर)'
                  : language === 'kn'
                    ? 'ತುರ್ತು ವಂಚನೆ ನೆರವು (ಗೋಲ್ಡನ್ ಅವರ್)'
                    : 'Emergency Fraud Response (Golden Hour)'}
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                {language === 'hi'
                  ? 'चोरी हुआ पैसा फ्रीज़ करने के लिए पहले 1 घंटे में रिपोर्ट करें।'
                  : language === 'kn'
                    ? 'ಕದ್ದ ಹಣವನ್ನು ತಡೆಯಲು ಮೊದಲ 1 ಗಂಟೆಯೊಳಗೆ ವರದಿ ಮಾಡಿ.'
                    : 'Report within 60 minutes to freeze stolen funds before cash-out.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <VoiceButton text={emergencySpeech} id="emergency-modal-voice" compact />
            <button
              type="button"
              onClick={() => setEmergencyModalOpen(false)}
              aria-label="Close emergency dialog"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Click-to-call primary helplines */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <a
            href="tel:1930"
            className="flex items-center justify-between rounded-2xl bg-[#9B111E] p-4 text-white transition-transform hover:scale-[1.01]"
          >
            <div>
              <p className="text-xs font-medium text-white/85">National Cyber Crime Helpline</p>
              <p className="font-mono-num mt-0.5 text-3xl font-bold tracking-tight">1930</p>
              <p className="mt-1 text-xs text-white/90">Tap to call 24x7 Toll-Free</p>
            </div>
            <PhoneCall className="h-8 w-8 shrink-0" />
          </a>

          <a
            href="tel:14440"
            className="flex items-center justify-between rounded-2xl border border-[#9B111E]/30 bg-[#9B111E]/6 p-4 text-neutral-900 transition-colors hover:bg-[#9B111E]/10 dark:border-[#E0115F]/40 dark:bg-[#E0115F]/12 dark:text-white"
          >
            <div>
              <p className="text-xs font-medium text-[#9B111E] dark:text-[#FF6B93]">RBI Sachet Helpline</p>
              <p className="font-mono-num mt-0.5 text-3xl font-bold tracking-tight text-[#9B111E] dark:text-[#FF6B93]">14440</p>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">Report unauthorized bank debit</p>
            </div>
            <PhoneCall className="h-7 w-7 shrink-0 text-[#9B111E] dark:text-[#FF6B93]" />
          </a>
        </div>

        {/* Immediate 3-step guide */}
        <div className="mt-5 rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-4 dark:border-neutral-800 dark:bg-[#141417]">
          <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
            <Clock className="h-4 w-4 text-[#9B111E] dark:text-[#FF5C8A]" />
            <span>Immediate 3-Step Action</span>
          </div>
          <ol className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9B111E] dark:text-[#FF5C8A]" />
              <span><strong>1. Hang up & disconnect:</strong> Stop talking to the scammer and turn off screen-sharing apps (AnyDesk) or mobile data if compromised.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9B111E] dark:text-[#FF5C8A]" />
              <span><strong>2. Note transaction details:</strong> Write down the 12-digit UTR / reference ID, amount, date/time, and scammer’s phone number or UPI ID.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9B111E] dark:text-[#FF5C8A]" />
              <span><strong>3. Call 1930 & block card/UPI:</strong> File an online ticket at cybercrime.gov.in and freeze your debit card / UPI ID via your bank’s toll-free number.</span>
            </li>
          </ol>
        </div>

        {/* Bank quick numbers */}
        <div className="mt-5">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Quick Bank Freeze Helplines</h3>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {BANK_HELPLINES.slice(2).map((bank) => (
              <a
                key={bank.name}
                href={`tel:${bank.tollFree.replace(/\s+/g, '')}`}
                className="flex items-center justify-between rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm hover:border-[#9B111E]/50 dark:border-neutral-800 dark:hover:border-[#E0115F]/50"
              >
                <span className="font-medium text-neutral-800 dark:text-neutral-200">{bank.name}</span>
                <span className="font-mono-num font-semibold text-[#9B111E] dark:text-[#FF5C8A]">{bank.tollFree}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-4 dark:border-neutral-800">
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            Open cybercrime.gov.in
            <ExternalLink className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => {
              setEmergencyModalOpen(false);
              navigate('fraud');
            }}
            className="rounded-full bg-[#9B111E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#7F0D18] cursor-pointer"
          >
            Open Evidence Checklist & Scanner
          </button>
        </div>
      </div>
    </div>
  );
};
