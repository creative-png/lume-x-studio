import React, { useState } from 'react';
import { STUDIO_INFO, SITE_CONFIG } from '../data/weddingData';

interface NavbarProps {
  onOpenDateChecker?: () => void;
  onOpenAiChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDateChecker, onOpenAiChat }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center transition-all bg-[#17111a]/90 backdrop-blur-md border-b border-[#3a2f40]/50 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3.5">
        <a
          href="#top"
          className="font-serif text-lg sm:text-xl md:text-2xl tracking-[0.2em] text-[#f3eee8] uppercase font-light"
        >
          {SITE_CONFIG.owner.name.split(' ')[0] || 'LUMÉ'}
        </a>

        <div className="flex items-center gap-3 sm:gap-4 md:gap-5 text-xs sm:text-[13px] tracking-[0.08em]">
          <a
            href="#work"
            className="hidden md:inline text-[#b4a9b0] hover:text-[#f3eee8] transition-colors"
          >
            Work
          </a>
          <a
            href="#collections"
            className="hidden md:inline text-[#b4a9b0] hover:text-[#f3eee8] transition-colors"
          >
            Collections
          </a>
          <a
            href="#reviews"
            className="hidden md:inline text-[#b4a9b0] hover:text-[#f3eee8] transition-colors"
          >
            Reviews
          </a>

          <a
            href={STUDIO_INFO.phoneUrl}
            className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 border border-[#3a2f40] rounded-full text-[11px] sm:text-xs tracking-wider text-[#f3eee8] hover:border-[#d9b8a3] hover:text-[#d9b8a3] transition-colors"
          >
            Call
          </a>

          <a
            href={STUDIO_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-[#25d366] text-[#06260f] font-medium rounded-full text-[11px] sm:text-xs tracking-wider hover:brightness-105 transition-all shadow-sm"
          >
            WhatsApp
          </a>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden w-8 h-8 border border-[#3a2f40] rounded-full text-[#f3eee8] flex items-center justify-center text-sm hover:border-[#d9b8a3] cursor-pointer"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Drawer Menu */}
      {menuOpen && (
        <div
          id="menu"
          className="fixed inset-0 z-50 bg-[#17111a] flex flex-col justify-center px-6 sm:px-10 py-8 gap-2 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-5 text-2xl text-[#f3eee8] hover:text-[#d9b8a3] cursor-pointer p-2"
            aria-label="Close menu"
          >
            ×
          </button>

          <a
            href="#work"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl sm:text-3xl text-[#f3eee8] py-2 border-b border-[#3a2f40] hover:text-[#d9b8a3] transition-colors"
          >
            Our work
          </a>
          <a
            href="#collections"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl sm:text-3xl text-[#f3eee8] py-2 border-b border-[#3a2f40] hover:text-[#d9b8a3] transition-colors"
          >
            Collections
          </a>
          <a
            href="#reviews"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl sm:text-3xl text-[#f3eee8] py-2 border-b border-[#3a2f40] hover:text-[#d9b8a3] transition-colors"
          >
            Reviews
          </a>
          <a
            href="#faq"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl sm:text-3xl text-[#f3eee8] py-2 border-b border-[#3a2f40] hover:text-[#d9b8a3] transition-colors"
          >
            Questions
          </a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl sm:text-3xl text-[#f3eee8] py-2 border-b border-[#3a2f40] hover:text-[#d9b8a3] transition-colors"
          >
            Check your date
          </a>

          <div className="pt-5 flex flex-col gap-2.5">
            <a
              href={STUDIO_INFO.phoneUrl}
              className="py-2.5 text-center border border-[#3a2f40] rounded text-xs tracking-wider text-[#f3eee8] hover:border-[#d9b8a3]"
            >
              Call us: {STUDIO_INFO.phone}
            </a>
            <a
              href={STUDIO_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 text-center bg-[#25d366] text-[#06260f] font-medium rounded text-xs tracking-wider"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
};
