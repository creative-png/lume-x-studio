import React from 'react';
import { SITE_CONFIG } from '../data/weddingData';

interface StickyContactBarProps {
  onToggleChat: () => void;
  isChatOpen: boolean;
}

export const StickyContactBar: React.FC<StickyContactBarProps> = ({
  onToggleChat,
  isChatOpen
}) => {
  const shortName = (SITE_CONFIG.owner?.name || 'LUMÉ STUDIO').split(' ')[0] || 'Lumé';

  return (
    <div
      className="fixed right-3.5 sm:right-5 bottom-4 sm:bottom-5 z-40 flex flex-col gap-2.5 sm:gap-3 items-end"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
    >
      {/* Ask Concierge button */}
      <button
        onClick={onToggleChat}
        className="h-9 sm:h-11 px-3.5 sm:px-4.5 rounded-full bg-[#d9b8a3] text-[#17111a] font-medium text-[11px] sm:text-[13px] tracking-wide shadow-xl flex items-center justify-center cursor-pointer hover:bg-[#f3eee8] transition-colors"
        aria-label={`Chat with ${shortName} concierge`}
      >
        {isChatOpen ? 'Close concierge' : `Ask ${shortName}`}
      </button>
    </div>
  );
};
