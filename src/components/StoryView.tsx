import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../data/weddingData';

interface StoryViewProps {
  storyIndex: number | null;
  onClose: () => void;
  onSelectStory: (index: number) => void;
  onCheckDateClick: (packageName?: string) => void;
}

export const StoryView: React.FC<StoryViewProps> = ({
  storyIndex,
  onClose,
  onSelectStory,
  onCheckDateClick,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isOpen = storyIndex !== null;
  const stories = SITE_CONFIG.work.stories;
  const story = isOpen ? stories[storyIndex] : null;
  const nextIndex = isOpen ? (storyIndex + 1) % stories.length : 0;
  const nextStory = stories[nextIndex];

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) setLightboxIndex(null);
        else if (isOpen) onClose();
      }
      if (lightboxIndex !== null && story) {
        if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev! + 1) % story.galleryImages.length);
        }
        if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev! - 1 + story.galleryImages.length) % story.galleryImages.length);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, lightboxIndex, story, onClose]);

  if (!isOpen || !story) return null;

  const waUrl = `https://wa.me/${SITE_CONFIG.owner.whatsappNumber}?text=${encodeURIComponent(`Hi ${SITE_CONFIG.owner.name}! I loved the ${story.couple} story and would like something similar.`)}`;

  return (
    <>
      {/* Fullscreen Story Reader matching #sv */}
      <div
        id="sv"
        className="fixed inset-0 z-50 bg-[#17111a] overflow-y-auto overflow-x-hidden animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Wedding story"
      >
        {/* Sticky Top Bar (.sv-top) */}
        <div className="sticky top-0 z-30 flex justify-between items-center px-3 sm:px-6 py-2 sm:py-2.5 bg-[#17111a]/95 backdrop-blur-md border-b border-[#3a2f40]">
          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-1 sm:py-1.5 border border-[#3a2f40] rounded-full text-xs sm:text-sm text-[#f3eee8] hover:border-[#d9b8a3] hover:text-[#d9b8a3] transition-colors cursor-pointer"
          >
            ← Back to work
          </button>

          <span className="font-serif text-base sm:text-lg tracking-[0.2em] text-[#f3eee8]">
            {SITE_CONFIG.owner.name.split(' ')[0]}
          </span>

          <button
            onClick={() => onSelectStory(nextIndex)}
            className="px-3 sm:px-4 py-1 sm:py-1.5 border border-[#3a2f40] rounded-full text-xs sm:text-sm text-[#f3eee8] hover:border-[#d9b8a3] hover:text-[#d9b8a3] transition-colors cursor-pointer"
          >
            Next story →
          </button>
        </div>

        {/* Hero (.sv-hero) */}
        <div className="relative h-[26vh] sm:h-[44vh] max-h-[460px] overflow-hidden bg-[#1f1824] flex items-end">
          <img
            src={story.coverImage}
            alt={story.couple}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17111a] via-[#17111a]/40 to-transparent" />

          <div className="max-w-[1100px] w-full mx-auto px-3.5 sm:px-6 pb-4 sm:pb-7 relative z-10 text-left">
            <h2 className="font-serif text-[22px] sm:text-[40px] md:text-[54px] font-light leading-none text-[#f3eee8] mb-1 tracking-tight">
              {story.couple}
            </h2>
            <div className="text-[11px] sm:text-[12.5px] tracking-[0.12em] text-[#d9b8a3] font-light">
              {story.location}
            </div>
          </div>
        </div>

        {/* Narrative & Body (.sv-in) */}
        <div className="max-w-[1100px] mx-auto px-3.5 sm:px-6 py-5 sm:py-10 text-left">
          <p className="font-serif text-[15px] sm:text-[21px] md:text-[25px] leading-[1.35] max-w-[34ch] text-[#f3eee8] mb-2.5 sm:mb-3 font-light">
            {story.tagline}
          </p>

          <p className="text-[#b4a9b0] text-[12px] sm:text-[14px] leading-relaxed max-w-[56ch] mb-4 sm:mb-6 font-light">
            {story.narrative}
          </p>

          {/* Facts Grid (.facts) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3.5 border-t border-b border-[#3a2f40] py-2 sm:py-3.5 mb-5 sm:mb-8">
            <div>
              <small className="block text-[9.5px] sm:text-[11px] tracking-[0.12em] text-[#d9b8a3] uppercase mb-0.5 font-medium">
                Venue
              </small>
              <span className="text-[11.5px] sm:text-sm text-[#f3eee8] font-light">
                {story.location}
              </span>
            </div>
            <div>
              <small className="block text-[9.5px] sm:text-[11px] tracking-[0.12em] text-[#d9b8a3] uppercase mb-0.5 font-medium">
                Coverage
              </small>
              <span className="text-[11.5px] sm:text-sm text-[#f3eee8] font-light">
                {story.coverage}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <small className="block text-[9.5px] sm:text-[11px] tracking-[0.12em] text-[#d9b8a3] uppercase mb-0.5 font-medium">
                Collection
              </small>
              <span className="text-[11.5px] sm:text-sm text-[#f3eee8] font-light">
                {story.collection}
              </span>
            </div>
          </div>

          {/* Gallery Layout
              For PC: 4 small images in one row, then 1 big panoramic image, then 4 small, then 1 big.
              For Mobile: 2 small images in one row, then 1 big image, then 2 small images, then 1 big, etc.
          */}

          {/* Desktop/PC View (md+) */}
          <div className="hidden md:flex flex-col gap-3.5 md:gap-4 mb-8 sm:mb-10">
            {/* Row 1: 4 small images */}
            <div className="grid grid-cols-4 gap-3.5 md:gap-4">
              {story.galleryImages.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative overflow-hidden bg-[#1f1824] border border-[#3a2f40]/70 hover:border-[#debca6]/60 p-0 cursor-zoom-in text-left aspect-[4/3] w-full transition-all duration-300"
                  aria-label={`Open photograph ${idx + 1}`}
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2.5 sm:p-3">
                    <span className="text-[10px] sm:text-[11px] text-[#f3eee8] tracking-wider bg-[#17111a]/85 px-2 py-0.5 rounded">
                      Frame {idx + 1}
                    </span>
                    <span className="text-[10.5px] text-[#debca6] truncate max-w-[160px]">
                      {img.caption}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Row 2: 1 Big Hero Image */}
            {story.galleryImages[4] && (
              <button
                onClick={() => setLightboxIndex(4)}
                className="group relative overflow-hidden bg-[#1f1824] border border-[#3a2f40]/80 hover:border-[#debca6]/70 p-0 cursor-zoom-in text-left aspect-[21/9] sm:aspect-[2.4/1] w-full transition-all duration-300 shadow-md"
                aria-label="Open photograph 5 (Feature)"
              >
                <img
                  src={story.galleryImages[4].url}
                  alt={story.galleryImages[4].caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out filter brightness-[0.98]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end justify-between p-4 sm:p-5">
                  <div>
                    <span className="text-[10px] sm:text-[11.5px] uppercase tracking-widest text-[#debca6] bg-[#17111a]/85 px-2.5 py-1 rounded inline-block mb-1.5 font-medium">
                      Frame 5 · Feature
                    </span>
                    <p className="text-xs sm:text-sm text-[#f3eee8] font-light max-w-xl">
                      {story.galleryImages[4].caption}
                    </p>
                  </div>
                  <span className="text-xs text-[#debca6] border border-[#debca6]/40 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    View Fullscreen ↗
                  </span>
                </div>
              </button>
            )}

            {/* Row 3: 4 small images */}
            {story.galleryImages.length > 5 && (
              <div className="grid grid-cols-4 gap-3.5 md:gap-4">
                {story.galleryImages.slice(5, 9).map((img, i) => {
                  const idx = 5 + i;
                  return (
                    <button
                      key={idx}
                      onClick={() => setLightboxIndex(idx)}
                      className="group relative overflow-hidden bg-[#1f1824] border border-[#3a2f40]/70 hover:border-[#debca6]/60 p-0 cursor-zoom-in text-left aspect-[4/3] w-full transition-all duration-300"
                      aria-label={`Open photograph ${idx + 1}`}
                    >
                      <img
                        src={img.url}
                        alt={img.caption}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2.5 sm:p-3">
                        <span className="text-[10px] sm:text-[11px] text-[#f3eee8] tracking-wider bg-[#17111a]/85 px-2 py-0.5 rounded">
                          Frame {idx + 1}
                        </span>
                        <span className="text-[10.5px] text-[#debca6] truncate max-w-[160px]">
                          {img.caption}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Row 4: 1 Big Closing Hero Image */}
            {story.galleryImages[9] && (
              <button
                onClick={() => setLightboxIndex(9)}
                className="group relative overflow-hidden bg-[#1f1824] border border-[#3a2f40]/80 hover:border-[#debca6]/70 p-0 cursor-zoom-in text-left aspect-[21/9] sm:aspect-[2.4/1] w-full transition-all duration-300 shadow-md"
                aria-label="Open photograph 10 (Finale)"
              >
                <img
                  src={story.galleryImages[9].url}
                  alt={story.galleryImages[9].caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out filter brightness-[0.98]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end justify-between p-4 sm:p-5">
                  <div>
                    <span className="text-[10px] sm:text-[11.5px] uppercase tracking-widest text-[#debca6] bg-[#17111a]/85 px-2.5 py-1 rounded inline-block mb-1.5 font-medium">
                      Frame 10 · Finale
                    </span>
                    <p className="text-xs sm:text-sm text-[#f3eee8] font-light max-w-xl">
                      {story.galleryImages[9].caption}
                    </p>
                  </div>
                  <span className="text-xs text-[#debca6] border border-[#debca6]/40 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    View Fullscreen ↗
                  </span>
                </div>
              </button>
            )}
          </div>

          {/* Mobile View (< md): 2 small images in one row, then 1 big image, then 2 small images, then 1 big, etc. */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:hidden mb-6">
            {/* Row 1: 2 small images (0 & 1) */}
            {story.galleryImages.slice(0, 2).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="group relative overflow-hidden bg-[#1f1824] border border-[#3a2f40]/70 hover:border-[#debca6]/60 p-0 cursor-zoom-in text-left aspect-[4/3] w-full col-span-1"
                aria-label={`Open photograph ${idx + 1}`}
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-[9.5px] text-[#f3eee8] bg-[#17111a]/85 px-1.5 py-0.5 rounded">
                    Frame {idx + 1}
                  </span>
                </div>
              </button>
            ))}

            {/* Row 2: 1 big image (Index 4) */}
            {story.galleryImages[4] && (
              <button
                onClick={() => setLightboxIndex(4)}
                className="group relative overflow-hidden bg-[#1f1824] border border-[#3a2f40]/80 hover:border-[#debca6]/70 p-0 cursor-zoom-in text-left aspect-[16/9] w-full col-span-2 my-0.5"
                aria-label="Open photograph 5 (Feature)"
              >
                <img
                  src={story.galleryImages[4].url}
                  alt={story.galleryImages[4].caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end justify-between p-2.5">
                  <span className="text-[10px] text-[#debca6] bg-[#17111a]/85 px-2 py-0.5 rounded font-medium">
                    Frame 5 · Feature
                  </span>
                  <span className="text-[10px] text-[#f3eee8] truncate max-w-[170px]">
                    {story.galleryImages[4].caption}
                  </span>
                </div>
              </button>
            )}

            {/* Row 3: 2 small images (Index 2 & 3) */}
            {[2, 3].map((idx) => {
              const img = story.galleryImages[idx];
              if (!img) return null;
              return (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative overflow-hidden bg-[#1f1824] border border-[#3a2f40]/70 hover:border-[#debca6]/60 p-0 cursor-zoom-in text-left aspect-[4/3] w-full col-span-1"
                  aria-label={`Open photograph ${idx + 1}`}
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                    <span className="text-[9.5px] text-[#f3eee8] bg-[#17111a]/85 px-1.5 py-0.5 rounded">
                      Frame {idx + 1}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Row 4: 1 big image (Index 9) */}
            {story.galleryImages[9] && (
              <button
                onClick={() => setLightboxIndex(9)}
                className="group relative overflow-hidden bg-[#1f1824] border border-[#3a2f40]/80 hover:border-[#debca6]/70 p-0 cursor-zoom-in text-left aspect-[16/9] w-full col-span-2 my-0.5"
                aria-label="Open photograph 10 (Finale)"
              >
                <img
                  src={story.galleryImages[9].url}
                  alt={story.galleryImages[9].caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end justify-between p-2.5">
                  <span className="text-[10px] text-[#debca6] bg-[#17111a]/85 px-2 py-0.5 rounded font-medium">
                    Frame 10 · Finale
                  </span>
                  <span className="text-[10px] text-[#f3eee8] truncate max-w-[170px]">
                    {story.galleryImages[9].caption}
                  </span>
                </div>
              </button>
            )}

            {/* Row 5: 2 small images (Index 5 & 6) */}
            {[5, 6].map((idx) => {
              const img = story.galleryImages[idx];
              if (!img) return null;
              return (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative overflow-hidden bg-[#1f1824] border border-[#3a2f40]/70 hover:border-[#debca6]/60 p-0 cursor-zoom-in text-left aspect-[4/3] w-full col-span-1"
                  aria-label={`Open photograph ${idx + 1}`}
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                    <span className="text-[9.5px] text-[#f3eee8] bg-[#17111a]/85 px-1.5 py-0.5 rounded">
                      Frame {idx + 1}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Row 6: 2 small images (Index 7 & 8) */}
            {[7, 8].map((idx) => {
              const img = story.galleryImages[idx];
              if (!img) return null;
              return (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative overflow-hidden bg-[#1f1824] border border-[#3a2f40]/70 hover:border-[#debca6]/60 p-0 cursor-zoom-in text-left aspect-[4/3] w-full col-span-1"
                  aria-label={`Open photograph ${idx + 1}`}
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                    <span className="text-[9.5px] text-[#f3eee8] bg-[#17111a]/85 px-1.5 py-0.5 rounded">
                      Frame {idx + 1}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Pullquote (.sv-q) */}
          <div className="my-5 sm:my-8 p-3 sm:p-5 bg-[#1f1824] border-l-2 border-[#d9b8a3]">
            <p className="font-serif text-[14.5px] sm:text-[19px] md:text-[23px] leading-[1.35] text-[#f3eee8] mb-1.5 font-light">
              “{story.quote.text}”
            </p>
            <cite className="text-[10.5px] sm:text-xs text-[#b4a9b0] not-italic block font-light">
              {story.quote.author} · ★★★★★ Google review
            </cite>
          </div>

          {/* Next & Action Footer (.sv-next) */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5 sm:gap-3.5 border-t border-[#3a2f40] pt-4 sm:pt-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  onCheckDateClick(story.collection);
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#d9b8a3] text-[#17111a] text-[11px] sm:text-xs uppercase tracking-[0.14em] font-medium hover:bg-[#f3eee8] transition-colors"
              >
                Check your date
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 sm:px-5 sm:py-2.5 border border-[#d9b8a3] text-[#f3eee8] text-[11px] sm:text-xs uppercase tracking-[0.14em] hover:bg-[#d9b8a3] hover:text-[#17111a] transition-colors"
              >
                Message on WhatsApp
              </a>
            </div>

            <button
              onClick={() => onSelectStory(nextIndex)}
              className="text-xs uppercase tracking-[0.16em] text-[#d9b8a3] hover:text-[#f3eee8] border-b border-[#d9b8a3] pb-0.5 transition-colors cursor-pointer"
            >
              Next: {nextStory.couple} →
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Viewer matching #lb */}
      {lightboxIndex !== null && (
        <div
          id="lb"
          className="fixed inset-0 z-[90] bg-[#0a060c]/96 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxIndex(null);
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-3 right-3 text-[#f3eee8] text-3xl sm:text-4xl p-2 hover:text-[#d9b8a3] transition-colors cursor-pointer"
            aria-label="Close"
          >
            ×
          </button>

          {/* Prev button */}
          <button
            onClick={() =>
              setLightboxIndex((prev) => (prev! - 1 + story.galleryImages.length) % story.galleryImages.length)
            }
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 text-[#f3eee8] text-3xl sm:text-5xl p-2 hover:text-[#d9b8a3] transition-colors cursor-pointer"
            aria-label="Previous photograph"
          >
            ‹
          </button>

          {/* Active Image */}
          <div className="w-[min(1000px,94vw)] h-[min(80vh,700px)] flex flex-col items-center justify-center">
            <img
              src={story.galleryImages[lightboxIndex].url}
              alt={story.galleryImages[lightboxIndex].caption}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-full object-contain shadow-2xl"
            />
            <p className="text-[11px] sm:text-xs text-[#b4a9b0] mt-2.5 italic text-center font-light">
              {story.galleryImages[lightboxIndex].caption}
            </p>
          </div>

          {/* Next button */}
          <button
            onClick={() =>
              setLightboxIndex((prev) => (prev! + 1) % story.galleryImages.length)
            }
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 text-[#f3eee8] text-3xl sm:text-5xl p-2 hover:text-[#d9b8a3] transition-colors cursor-pointer"
            aria-label="Next photograph"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
};
