import React from 'react';
import { SITE_CONFIG } from '../data/weddingData';

export const Footer: React.FC = () => {
  const { owner } = SITE_CONFIG;

  if (!owner) return null;

  const currentYear = new Date().getFullYear();
  const socials = [
    { label: 'Instagram', url: owner.instagram },
    { label: 'Pinterest', url: owner.pinterest },
    { label: 'Vimeo', url: owner.vimeo },
  ].filter((s) => Boolean(s.url));

  return (
    <footer className="pt-8 pb-24 sm:pb-20 border-t border-[#3a2f40] text-[#b4a9b0] text-[13px] sm:text-sm bg-[#17111a]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex justify-between gap-5 flex-wrap text-left">
        <div>
          {owner.name && (
            <div className="font-serif text-[18px] sm:text-[21px] tracking-[0.2em] text-[#f3eee8] uppercase mb-1">
              {owner.name}
            </div>
          )}
          <div className="text-[12px] sm:text-[13px] leading-relaxed font-light">
            {owner.tagline && <div>{owner.tagline}</div>}
            {owner.leadPhotographer && <div className="text-[#d9b8a3]/85 text-[11.5px]">{owner.leadPhotographer}</div>}
            {owner.locations && <div>{owner.locations}</div>}
          </div>
        </div>

        <div className="text-left sm:text-right text-[12px] sm:text-[13px] leading-relaxed font-light">
          {socials.length > 0 && (
            <div className="flex items-center gap-1.5 sm:justify-end flex-wrap">
              {socials.map((social, idx) => (
                <React.Fragment key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#f3eee8] transition-colors"
                  >
                    {social.label}
                  </a>
                  {idx < socials.length - 1 && <span>·</span>}
                </React.Fragment>
              ))}
            </div>
          )}
          <div className="mt-0.5">© {currentYear} {owner.name}</div>
        </div>
      </div>

      {owner.demoNote && (
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 mt-5 text-[11px] sm:text-xs text-[#b4a9b0]/60 text-left font-light">
          {owner.demoNote}
        </div>
      )}
    </footer>
  );
};
