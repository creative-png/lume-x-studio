import React from 'react';
import { SITE_CONFIG } from '../data/weddingData';

export const Reviews: React.FC = () => {
  const { reviews } = SITE_CONFIG;

  if (!reviews || !Array.isArray(reviews.list) || reviews.list.length === 0) return null;

  const subtitle = reviews.subtitle || (reviews.totalCount ? `Based on ${reviews.totalCount} Google reviews` : '');

  return (
    <section id="reviews" className="py-8 sm:py-12 md:py-18 bg-[#1f1824] text-[#f3eee8]">
      <div className="max-w-[1100px] mx-auto px-3.5 sm:px-6">
        {reviews.kicker && (
          <div className="text-left mb-3 sm:mb-4">
            <p className="text-sm sm:text-base uppercase tracking-[0.18em] text-[#d9b8a3] font-medium inline-block border-b-2 border-[#d9b8a3] pb-0.5">
              {reviews.kicker}
            </p>
          </div>
        )}

        {/* Rating Block (.rating) */}
        {(reviews.rating || reviews.stars || subtitle) && (
          <div className="flex items-baseline gap-2.5 sm:gap-3.5 flex-wrap mb-5 sm:mb-6">
            {reviews.rating && (
              <b className="font-serif text-[32px] sm:text-[44px] md:text-[50px] font-light leading-none text-[#f3eee8]">
                {reviews.rating}
              </b>
            )}
            {reviews.stars && (
              <span className="text-[#d9b8a3] tracking-[0.16em] text-base sm:text-lg font-serif">
                {reviews.stars}
              </span>
            )}
            {subtitle && (
              <span className="text-xs sm:text-sm text-[#b4a9b0] font-light">
                {subtitle}
              </span>
            )}
          </div>
        )}

        {/* Reviews Grid: dynamically renders all reviews from reviews.list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 md:gap-5">
          {reviews.list.map((rev, index) => (
            <div
              key={rev.id || index}
              className="p-3 sm:p-5 md:p-6 bg-[#17111a] border border-[#3a2f40]/80 rounded-lg sm:rounded-xl text-left flex flex-col justify-between shadow-sm hover:border-[#debca6]/50 transition-colors"
            >
              <div>
                {/* Quotation icon */}
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-[#debca6] mb-1.5 sm:mb-3 opacity-90"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                {rev.text && (
                  <p className="font-serif text-[11px] sm:text-[14px] md:text-[15.5px] leading-[1.38] text-[#f3eee8] mb-2 sm:mb-3 font-light">
                    {rev.text}
                  </p>
                )}
              </div>

              {(rev.name || rev.timeAgo) && (
                <cite className="not-italic text-[9.5px] sm:text-[12px] text-[#debca6] font-light block tracking-wide pt-1">
                  {[rev.name, rev.timeAgo].filter(Boolean).join(' · ')}
                </cite>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
