import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UI_COPY } from '../data/translations';

interface VoiceButtonProps {
  text: string;
  id: string;
  compact?: boolean;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({ text, id, compact = false }) => {
  const { isSpeakingId, speakText, language } = useApp();
  const isPlaying = isSpeakingId === id;
  const copy = UI_COPY[language];

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speakText(text, id);
      }}
      aria-label={isPlaying ? copy.stopListenLabel : copy.listenLabel}
      title={isPlaying ? copy.stopListenLabel : copy.listenLabel}
      className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border transition-colors min-h-[40px] ${
        compact ? 'min-w-[40px] px-2.5 py-2' : 'px-3.5 py-2 text-xs font-semibold'
      } ${
        isPlaying
          ? 'border-[#9B111E] bg-[#9B111E] text-white'
          : 'border-[#9B111E]/25 bg-[#9B111E]/8 text-[#9B111E] hover:bg-[#9B111E]/15 dark:border-[#E0115F]/40 dark:bg-[#E0115F]/15 dark:text-[#FF6B93]'
      }`}
    >
      {isPlaying ? <VolumeX className="h-4 w-4 shrink-0" /> : <Volume2 className="h-4 w-4 shrink-0" />}
      {!compact && <span className="whitespace-nowrap">{isPlaying ? copy.stopListenLabel : copy.listenLabel}</span>}
    </button>
  );
};
