import React from 'react';
import { SITE_CONFIG } from '../data/weddingData';

interface PortfolioProps {
  onOpenStory: (storyIndex: number) => void;
}

// Visual themes matching Reference 1 & Reference 2
const STORY_THEMES = [
  {
    // Amara & Veer - Warm terracotta copper glow (Reference 1 & 2 Card 1)
    background: 'radial-gradient(120% 80% at 50% 0%, #874932 0%, #3a1e1a 45%, #180f15 80%, #140d13 100%)',
    borderColor: 'rgba(135, 73, 50, 0.45)',
    locationColor: '#d9b8a3',
  },
  {
    // Isha & Arjun - Monsoon coastal slate teal-blue glow (Reference 1 & 2 Card 2)
    background: 'radial-gradient(120% 80% at 50% 0%, #3d5a6b 0%, #1b2630 45%, #11171d 80%, #0d1216 100%)',
    borderColor: 'rgba(61, 90, 107, 0.45)',
    locationColor: '#b0c7d4',
  },
  {
    // Mira & Kabir - Lake Pichola ivory champagne glow (Reference 2 Card 3)
    background: 'radial-gradient(120% 80% at 50% 0%, #66523c 0%, #282017 45%, #151113 80%, #100d0f 100%)',
    borderColor: 'rgba(102, 82, 60, 0.45)',
    locationColor: '#d9b8a3',
  },
  {
    // Naina & Rishabh - Goa twilight dusk rose glow (Reference 2 Card 4)
    background: 'radial-gradient(120% 80% at 50% 0%, #684654 0%, #2b1b23 45%, #160e15 80%, #100c11 100%)',
    borderColor: 'rgba(104, 70, 84, 0.45)',
    locationColor: '#dcb8c6',
  }
];

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenStory }) => {
  const { work } = SITE_CONFIG;

  return (
    <section id="work" className="py-8 sm:py-12 md:py-18 bg-[#17111a] text-[#f3eee8]">
      <div className="max-w-[1100px] mx-auto px-3.5 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-3 sm:gap-5 mb-6 sm:mb-8 text-left">
          <div>
            <p className="text-sm sm:text-base uppercase tracking-[0.18em] text-[#d9b8a3] mb-2 font-medium inline-block border-b-2 border-[#d9b8a3] pb-0.5">
              {work.kicker}
            </p>
            <h2 className="font-serif text-[24px] sm:text-[34px] md:text-[42px] font-light leading-[1.12] max-w-[20ch] text-[#f3eee8]">
              {work.title}
            </h2>
          </div>
          <p className="max-w-[42ch] text-[#b4a9b0] text-[13px] sm:text-[15px] leading-relaxed font-light m-0">
            {work.lead}
          </p>
        </div>

        {/* Asymmetric Stories Grid matching Reference 2:
            Card 1 is WIDER (7 cols), Card 2 is LESS WIDE (5 cols) on both mobile and PC!
        */}
        <div className="grid grid-cols-12 gap-2.5 sm:gap-5 lg:gap-6">
          {work.stories.map((story, index) => {
            const theme = STORY_THEMES[index % STORY_THEMES.length];
            const isWide = index % 4 === 0 || index % 4 === 3;
            const colSpanClass = isWide ? 'col-span-7' : 'col-span-5';

            return (
              <div
                key={story.id}
                onClick={() => onOpenStory(index)}
                style={{
                  background: theme.background,
                  borderColor: theme.borderColor,
                }}
                className={`${colSpanClass} group border overflow-hidden cursor-pointer transition-all duration-300 text-left flex flex-col justify-between hover:shadow-2xl p-2.5 sm:p-4.5 md:p-5`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenStory(index);
                  }
                }}
                aria-label={`View story: ${story.couple}`}
              >
                <div>
                  {/* Photo Frame with 1px border matching Reference 1 & 2 */}
                  <div className="w-full h-[125px] sm:h-[220px] md:h-[270px] border border-white/75 overflow-hidden bg-black/30 mb-2.5 sm:mb-4">
                    <img
                      src={story.coverImage}
                      alt={story.couple}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-100 contrast-[1.02]"
                    />
                  </div>

                  {/* Text Details */}
                  <div>
                    <h3 className="font-serif text-[16px] sm:text-[24px] md:text-[29px] font-light text-[#f3eee8] leading-[1.15] mb-1 tracking-tight group-hover:text-white transition-colors">
                      {story.couple}
                    </h3>

                    <div
                      style={{ color: theme.locationColor }}
                      className="text-[11.5px] sm:text-[13px] tracking-wide mb-1.5 sm:mb-2 font-light"
                    >
                      {story.location}
                    </div>

                    <p className="text-[12px] sm:text-[13.5px] text-[#c4b8bf] leading-snug sm:leading-relaxed mb-3 sm:mb-4 font-light max-w-[42ch]">
                      {story.description}
                    </p>
                  </div>
                </div>

                {/* View story link */}
                <div className="pt-0.5">
                  <span className="inline-block text-[12px] sm:text-[13px] tracking-wide text-[#f3eee8] border-b border-[#f3eee8]/70 pb-0.5 group-hover:border-[#d9b8a3] group-hover:text-[#d9b8a3] transition-colors font-medium">
                    View story
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
