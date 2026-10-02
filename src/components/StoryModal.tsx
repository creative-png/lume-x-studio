import React, { useEffect, useState } from 'react';
import { WeddingStory } from '../types/wedding';
import { STUDIO_INFO } from '../data/weddingData';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Users, MessageCircle } from 'lucide-react';

interface StoryModalProps {
  story: WeddingStory | null;
  onClose: () => void;
  onCheckDate: (location: string) => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ story, onClose, onCheckDate }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [story]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!story) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % story.galleryImages.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + story.galleryImages.length) % story.galleryImages.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [story, onClose]);

  if (!story) return null;

  const currentImage = story.galleryImages[activeImageIndex] || story.galleryImages[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070605]/95 backdrop-blur-md p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#12110F] border border-[#262420] flex flex-col overflow-hidden shadow-2xl">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#262420] bg-[#0E0D0B]">
          <div className="flex items-center gap-3">
            <span className="font-serif text-sm tracking-widest text-[#C5A880]">{story.number}</span>
            <span className="text-[#A39D93] text-xs">/</span>
            <span className="font-serif text-lg tracking-wider text-[#EDE8E1]">{story.couple}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onCheckDate(story.location)}
              className="hidden sm:inline-flex text-xs uppercase tracking-[0.16em] px-3.5 py-1.5 bg-[#C5A880] text-[#0D0C0A] font-medium hover:bg-[#DFCAAB] transition-colors"
            >
              Inquire This Aesthetic
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#A39D93] hover:text-[#EDE8E1] transition-colors cursor-pointer"
              aria-label="Close story viewer"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Modal Main Body (Scrollable) */}
        <div className="overflow-y-auto flex-grow flex flex-col lg:flex-row">
          {/* Main Visual Frame (Left/Top) */}
          <div className="lg:w-2/3 bg-[#0A0908] flex flex-col justify-center items-center relative min-h-[380px] lg:min-h-[580px] p-4 sm:p-8">
            <div className="relative w-full max-h-[540px] flex items-center justify-center">
              <img
                src={currentImage.url}
                alt={currentImage.caption}
                referrerPolicy="no-referrer"
                className="max-h-[520px] w-auto max-w-full object-contain shadow-2xl filter brightness-[0.96]"
              />

              {/* Prev / Next controls */}
              {story.galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev - 1 + story.galleryImages.length) % story.galleryImages.length)
                    }
                    className="absolute left-2 p-2.5 rounded-full bg-[#0D0C0A]/70 text-[#EDE8E1] hover:bg-[#C5A880] hover:text-[#0D0C0A] transition-all cursor-pointer backdrop-blur-sm"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev + 1) % story.galleryImages.length)}
                    className="absolute right-2 p-2.5 rounded-full bg-[#0D0C0A]/70 text-[#EDE8E1] hover:bg-[#C5A880] hover:text-[#0D0C0A] transition-all cursor-pointer backdrop-blur-sm"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Caption & index indicator */}
            <div className="mt-4 text-center max-w-lg">
              <p className="text-xs text-[#A39D93] italic font-light mb-1">
                {currentImage.caption}
              </p>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880]/80">
                Frame {activeImageIndex + 1} of {story.galleryImages.length}
              </span>
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto max-w-full pb-2">
              {story.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-10 shrink-0 overflow-hidden border transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#C5A880] scale-105' : 'border-[#262420] opacity-50 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Editorial Notes (Right/Bottom) */}
          <div className="lg:w-1/3 p-6 sm:p-8 bg-[#141311] border-t lg:border-t-0 lg:border-l border-[#262420] flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#C5A880] mb-2 font-medium">
                Wedding Narrative
              </div>
              <h3 className="font-serif text-3xl font-light text-[#EDE8E1] mb-2">
                {story.couple}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-[#A39D93] mb-6">
                <MapPin size={13} className="text-[#C5A880]" />
                {story.location}
              </div>

              {/* Tagline */}
              <p className="font-serif italic text-lg text-[#DFCAAB] mb-5 leading-snug">
                “{story.tagline}”
              </p>

              {/* Story Narrative */}
              <p className="text-sm text-[#A39D93] leading-relaxed mb-6 font-light">
                {story.description}
              </p>

              {/* Metadata Details */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#262420] text-xs mb-6">
                <div>
                  <span className="text-[#A39D93] block mb-1 uppercase tracking-wider text-[10px]">Celebration</span>
                  <span className="text-[#EDE8E1] font-medium">{story.duration}</span>
                </div>
                <div>
                  <span className="text-[#A39D93] block mb-1 uppercase tracking-wider text-[10px]">Guest Gathering</span>
                  <span className="text-[#EDE8E1] font-medium">{story.guests}</span>
                </div>
              </div>

              {/* Couple quote */}
              <div className="p-4 bg-[#0E0D0B] border border-[#262420] mb-6">
                <p className="text-xs text-[#D1CBC1] italic leading-relaxed mb-2 font-light">
                  “{story.quote.text}”
                </p>
                <div className="text-[10px] uppercase tracking-widest text-[#C5A880]">
                  — {story.quote.author}
                </div>
              </div>
            </div>

            {/* Direct inquiry buttons */}
            <div className="flex flex-col gap-2 pt-4">
              <button
                onClick={() => onCheckDate(story.location)}
                className="w-full py-3 text-xs uppercase tracking-[0.2em] font-medium bg-[#EDE8E1] text-[#0D0C0A] hover:bg-[#C5A880] transition-colors text-center"
              >
                Check Date For {story.couple.split('&')[0].trim()} Style
              </button>
              <a
                href={`https://wa.me/919876543210?text=Hi%20Lum%C3%A9%20Studio%2C%20I%20loved%20the%20wedding%20story%20of%20${encodeURIComponent(story.couple)}%20at%20${encodeURIComponent(story.location)}.%20Are%20you%20available%20for%20our%20celebration%3F`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-xs uppercase tracking-[0.16em] border border-[#262420] text-[#EDE8E1] hover:border-[#25D366] hover:text-[#25D366] transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={15} /> WhatsApp Inquire
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
