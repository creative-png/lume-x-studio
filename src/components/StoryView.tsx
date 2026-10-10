import React, { useState, useEffect } from 'react';
import { SITE_CONFIG, resolveImagePath } from '../data/weddingData';

interface StoryViewProps {
  storyId: string | null;
  onClose: () => void;
  onSelectStory: (id: string) => void;
  onCheckDateClick: (packageName?: string) => void;
}

export const StoryView: React.FC<StoryViewProps> = ({
  storyId,
  onClose,
  onSelectStory,
  onCheckDateClick,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isOpen = storyId !== null;
  const stories = SITE_CONFIG.work?.stories || [];

  // Find story by ID
  const currentIndex = stories.findIndex((s) => s.id === storyId);
  const story = currentIndex !== -1 ? stories[currentIndex] : null;

  // Next story for cyclic navigation
  const nextIndex = currentIndex !== -1 ? (currentIndex + 1) % stories.length : 0;
  const nextStory = stories.length > 0 ? stories[nextIndex] : null;

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

  // Keyboard navigation for lightbox & close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) setLightboxIndex(null);
        else if (isOpen) onClose();
      }
      if (lightboxIndex !== null && story && story.galleryImages && story.galleryImages.length > 0) {
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

  if (!isOpen) return null;

  // Friendly "Story Not Found" page for unknown ID
  if (!story) {
    return (
      <div
        id="sv-not-found"
        className="fixed inset-0 z-50 bg-[#17111a] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Story not found"
      >
        <div className="max-w-md p-8 bg-[#1f1824] border border-[#3a2f40] rounded shadow-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[#d9b8a3] mb-3 font-medium">
            LUMÉ STUDIO ARCHIVE
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#f3eee8] font-light mb-4">
            Story Not Found
          </h2>
          <p className="text-sm text-[#b4a9b0] font-light leading-relaxed mb-6">
            The wedding story you are looking for does not exist or may have been updated in our collections.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#d9b8a3] text-[#17111a] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#f3eee8] transition-colors cursor-pointer"
          >
            ← Back to all stories
          </button>
        </div>
      </div>
    );
  }

  const gallery = Array.isArray(story.galleryImages) ? story.galleryImages : [];
  const coverUrl = resolveImagePath(story.coverImage);
  const ownerName = SITE_CONFIG.owner?.name || 'LUMÉ STUDIO';
  const ownerShortName = ownerName.split(' ')[0] || 'LUMÉ';
  const whatsappNumber = SITE_CONFIG.owner?.whatsappNumber || '918638683167';
  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi ${ownerName}! I loved the ${story.couple || 'wedding'} story and would like to inquire about availability.`)}`;

  return (
    <>
      {/* Fullscreen Story Reader */}
      <div
        id="sv"
        className="fixed inset-0 z-50 bg-[#17111a] overflow-y-auto overflow-x-hidden animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-label={`Story: ${story.couple}`}
      >
        {/* Sticky Top Navigation Bar */}
        <div className="sticky top-0 z-30 flex justify-between items-center px-3 sm:px-6 py-2 sm:py-2.5 bg-[#17111a]/95 backdrop-blur-md border-b border-[#3a2f40]">
          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-1 sm:py-1.5 border border-[#3a2f40] rounded-full text-xs sm:text-sm text-[#f3eee8] hover:border-[#d9b8a3] hover:text-[#d9b8a3] transition-colors cursor-pointer"
          >
            ← Back to work
          </button>

          <span className="font-serif text-base sm:text-lg tracking-[0.2em] text-[#f3eee8] uppercase font-light">
            {ownerShortName}
          </span>

          {nextStory && (
            <button
              onClick={() => onSelectStory(nextStory.id)}
              className="px-3 sm:px-4 py-1 sm:py-1.5 border border-[#3a2f40] rounded-full text-xs sm:text-sm text-[#f3eee8] hover:border-[#d9b8a3] hover:text-[#d9b8a3] transition-colors cursor-pointer"
            >
              Next story →
            </button>
          )}
        </div>

        {/* Hero Section */}
        <div className="relative h-[28vh] sm:h-[44vh] max-h-[480px] overflow-hidden bg-[#1f1824] flex items-end">
          {coverUrl && (
            <img
              src={coverUrl}
              alt={story.couple || 'Story cover'}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#17111a] via-[#17111a]/40 to-transparent" />

          <div className="max-w-[1100px] w-full mx-auto px-3.5 sm:px-6 pb-4 sm:pb-7 relative z-10 text-left">
            {story.couple && (
              <h2 className="font-serif text-[24px] sm:text-[40px] md:text-[54px] font-light leading-none text-[#f3eee8] mb-1 tracking-tight">
                {story.couple}
              </h2>
            )}
            {story.location && (
              <div className="text-[11px] sm:text-[12.5px] tracking-[0.12em] text-[#d9b8a3] font-light">
                {story.location}
              </div>
            )}
          </div>
        </div>

        {/* Narrative & Body Details */}
        <div className="max-w-[1100px] mx-auto px-3.5 sm:px-6 py-5 sm:py-10 text-left">
          {story.tagline && (
            <p className="font-serif text-[15px] sm:text-[21px] md:text-[25px] leading-[1.35] max-w-[34ch] text-[#f3eee8] mb-2.5 sm:mb-3 font-light">
              {story.tagline}
            </p>
          )}

          {story.narrative && (
            <p className="text-[#b4a9b0] text-[12px] sm:text-[14px] leading-relaxed max-w-[56ch] mb-4 sm:mb-6 font-light">
              {story.narrative}
            </p>
          )}

          {/* Facts Grid (Hides empty fields automatically) */}
          {(story.location || story.coverage || story.collection) && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3.5 border-t border-b border-[#3a2f40] py-2 sm:py-3.5 mb-5 sm:mb-8">
              {story.location && (
                <div>
                  <small className="block text-[9.5px] sm:text-[11px] tracking-[0.12em] text-[#d9b8a3] uppercase mb-0.5 font-medium">
                    Venue
                  </small>
                  <span className="text-[11.5px] sm:text-sm text-[#f3eee8] font-light">
                    {story.location}
                  </span>
                </div>
              )}
              {story.coverage && (
                <div>
                  <small className="block text-[9.5px] sm:text-[11px] tracking-[0.12em] text-[#d9b8a3] uppercase mb-0.5 font-medium">
                    Coverage
                  </small>
                  <span className="text-[11.5px] sm:text-sm text-[#f3eee8] font-light">
                    {story.coverage}
                  </span>
                </div>
              )}
              {story.collection && (
                <div className="col-span-2 sm:col-span-1">
                  <small className="block text-[9.5px] sm:text-[11px] tracking-[0.12em] text-[#d9b8a3] uppercase mb-0.5 font-medium">
                    Collection
                  </small>
                  <span className="text-[11.5px] sm:text-sm text-[#f3eee8] font-light">
                    {story.collection}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Gallery Layout:
              Dynamically renders every item in galleryImages regardless of array length.
              Every 5th image (idx % 5 === 4) is featured wide.
          */}
          {gallery.length > 0 && (
            <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-4">
                {gallery.map((img, idx) => {
                  const isFeature = idx % 5 === 4;
                  const imgUrl = resolveImagePath(img.url);

                  return (
                    <button
                      key={idx}
                      onClick={() => setLightboxIndex(idx)}
                      className={`group relative overflow-hidden bg-[#1f1824] border border-[#3a2f40]/70 hover:border-[#debca6]/60 p-0 cursor-zoom-in text-left transition-all duration-300 ${
                        isFeature
                          ? 'col-span-2 md:col-span-4 aspect-[16/9] sm:aspect-[2.2/1] my-1'
                          : 'col-span-1 md:col-span-1 aspect-[4/3]'
                      }`}
                      aria-label={`Open photograph ${idx + 1}`}
                    >
                      <img
                        src={imgUrl}
                        alt={img.caption || `Photograph ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2.5 sm:p-3">
                        <span className="text-[10px] sm:text-[11px] text-[#f3eee8] tracking-wider bg-[#17111a]/85 px-2 py-0.5 rounded">
                          Frame {idx + 1}
                        </span>
                        {img.caption && (
                          <span className="text-[10.5px] text-[#debca6] truncate max-w-[200px]">
                            {img.caption}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pullquote (Safely rendered only if quote.text exists) */}
          {story.quote && story.quote.text && (
            <div className="my-5 sm:my-8 p-3.5 sm:p-5 bg-[#1f1824] border-l-2 border-[#d9b8a3]">
              <p className="font-serif text-[14.5px] sm:text-[19px] md:text-[23px] leading-[1.35] text-[#f3eee8] mb-1.5 font-light">
                “{story.quote.text}”
              </p>
              {story.quote.author && (
                <cite className="text-[10.5px] sm:text-xs text-[#b4a9b0] not-italic block font-light">
                  {story.quote.author} · ★★★★★ Google review
                </cite>
              )}
            </div>
          )}

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 border-t border-[#3a2f40] pt-4 sm:pt-6">
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

            {nextStory && (
              <button
                onClick={() => onSelectStory(nextStory.id)}
                className="text-xs uppercase tracking-[0.16em] text-[#d9b8a3] hover:text-[#f3eee8] border-b border-[#d9b8a3] pb-0.5 transition-colors cursor-pointer"
              >
                Next: {nextStory.couple} →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Viewer */}
      {lightboxIndex !== null && gallery[lightboxIndex] && (
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
            aria-label="Close lightbox"
          >
            ×
          </button>

          {/* Prev button */}
          {gallery.length > 1 && (
            <button
              onClick={() =>
                setLightboxIndex((prev) => (prev! - 1 + gallery.length) % gallery.length)
              }
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 text-[#f3eee8] text-3xl sm:text-5xl p-2 hover:text-[#d9b8a3] transition-colors cursor-pointer"
              aria-label="Previous photograph"
            >
              ‹
            </button>
          )}

          {/* Active Image */}
          <div className="w-[min(1000px,94vw)] h-[min(80vh,700px)] flex flex-col items-center justify-center">
            <img
              src={resolveImagePath(gallery[lightboxIndex].url)}
              alt={gallery[lightboxIndex].caption || 'Gallery photograph'}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-full object-contain shadow-2xl"
            />
            {gallery[lightboxIndex].caption && (
              <p className="text-[11px] sm:text-xs text-[#b4a9b0] mt-2.5 italic text-center font-light">
                {gallery[lightboxIndex].caption}
              </p>
            )}
          </div>

          {/* Next button */}
          {gallery.length > 1 && (
            <button
              onClick={() =>
                setLightboxIndex((prev) => (prev! + 1) % gallery.length)
              }
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 text-[#f3eee8] text-3xl sm:text-5xl p-2 hover:text-[#d9b8a3] transition-colors cursor-pointer"
              aria-label="Next photograph"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
};
