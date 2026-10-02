import React from 'react';
import { IMAGES, SITE_CONFIG } from '../data/weddingData';

interface HeroProps {
  onCheckDateClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCheckDateClick }) => {
  const { hero } = SITE_CONFIG;

  return (
    <header
      id="top"
      className="relative min-h-[68vh] sm:min-h-[82vh] md:min-h-[88vh] flex items-center justify-center pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-16 overflow-hidden bg-[#17111a]"
    >
      {/* Background Image matching reference (couple against starry night sky & palace) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={IMAGES.hero}
          alt="Couple on palace balcony looking at starry night sky"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[center_35%] filter brightness-[0.68] contrast-[1.08] transition-transform duration-1000 scale-[1.01]"
        />
        {/* Soft atmospheric gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#17111a] via-[#17111a]/55 to-[#17111a]/40" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#17111a]/30 to-[#17111a]/70" />
      </div>

      {/* Main Content Container matching 'honest light.png' layout */}
      <div className="max-w-[960px] w-full mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center justify-center">
        
        {/* 1. Large Editorial Headline */}
        <h1 className="font-serif italic font-light text-[38px] sm:text-[58px] md:text-[76px] lg:text-[88px] leading-[1.02] text-[#f8f5f0] tracking-tight text-center">
          <span className="block">Love, in its most</span>
          <span className="block mt-0.5 sm:mt-1">honest light.</span>
        </h1>

        {/* 2. Centered Gold Horizontal Divider Line */}
        <div className="w-44 sm:w-64 md:w-80 h-[1px] bg-[#d9b8a3]/85 mx-auto mt-3.5 sm:mt-5 mb-3.5 sm:mb-4.5" />

        {/* 3. Kicker: Categories */}
        <p className="text-[10px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[#d9b8a3] font-medium m-0">
          WEDDING PHOTOGRAPHY • FILMS • DESTINATIONS
        </p>

        {/* 4. Sub-location */}
        <p className="text-[9.5px] sm:text-[11px] md:text-[12px] uppercase tracking-[0.22em] sm:tracking-[0.26em] text-[#d9b8a3]/90 font-light mt-1.5 sm:mt-2 mb-3.5 sm:mb-5">
          — MUMBAI, INDIA & WORLDWIDE —
        </p>

        {/* 5. Editorial Lead Narrative */}
        <p className="max-w-[44ch] sm:max-w-[52ch] text-[#ded6d1] text-[12px] sm:text-[14.5px] md:text-[15.5px] leading-[1.55] sm:leading-relaxed font-light mb-6 sm:mb-8 text-center text-balance">
          {hero.lead}
        </p>

        {/* 6. Action Buttons matching reference layout */}
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4.5 flex-wrap">
          <a
            href="#work"
            className="group px-5 sm:px-8 py-2.5 sm:py-3.5 bg-[#debca6] text-[#17111a] text-[10px] sm:text-[11.5px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium text-center hover:bg-[#f8f5f0] transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
          >
            <span>VIEW OUR WORK</span>
            <span className="inline-block transition-transform group-hover:translate-x-0.5 text-xs">→</span>
          </a>

          <a
            href="#contact"
            onClick={onCheckDateClick}
            className="group px-5 sm:px-8 py-2.5 sm:py-3.5 bg-[#17111a]/70 backdrop-blur-sm border border-[#debca6]/85 text-[#f8f5f0] text-[10px] sm:text-[11.5px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium text-center hover:bg-[#debca6] hover:text-[#17111a] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>CHECK YOUR DATE</span>
            <span className="inline-block transition-transform group-hover:translate-x-0.5 text-xs">→</span>
          </a>
        </div>
      </div>

      {/* Vertical Meta Kicker (Desktop only) */}
      <div className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] text-[11px] tracking-[0.3em] text-[#b4a9b0]/50 font-light select-none">
        {hero.verticalMeta}
      </div>
    </header>
  );
};
