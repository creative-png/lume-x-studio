import React from 'react';
import { SITE_CONFIG } from '../data/weddingData';

export const Footer: React.FC = () => {
  const { owner } = SITE_CONFIG;

  return (
    <footer className="pt-8 pb-24 sm:pb-20 border-t border-[#3a2f40] text-[#b4a9b0] text-[13px] sm:text-sm bg-[#17111a]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex justify-between gap-5 flex-wrap text-left">
        <div>
          <div className="font-serif text-[18px] sm:text-[21px] tracking-[0.2em] text-[#f3eee8] uppercase mb-1">
            {owner.name}
          </div>
          <div className="text-[12px] sm:text-[13px] leading-relaxed font-light">
            {owner.tagline}
            <br />
            {owner.locations}
          </div>
        </div>

        <div className="text-left sm:text-right text-[12px] sm:text-[13px] leading-relaxed font-light">
          <div>
            <a
              href={owner.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f3eee8] transition-colors"
            >
              Instagram
            </a>{' '}
            ·{' '}
            <a
              href={owner.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f3eee8] transition-colors"
            >
              Pinterest
            </a>{' '}
            ·{' '}
            <a
              href={owner.vimeo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f3eee8] transition-colors"
            >
              Vimeo
            </a>
          </div>
          <div className="mt-0.5">© 2026 {owner.name}</div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 mt-5 text-[11px] sm:text-xs text-[#b4a9b0]/60 text-left font-light">
        {owner.demoNote}
      </div>
    </footer>
  );
};
