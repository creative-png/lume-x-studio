import React from 'react';
import { SITE_CONFIG, resolveImagePath } from '../data/weddingData';

export const Experience: React.FC = () => {
  const { why, collections } = SITE_CONFIG;
  const steps = Array.isArray(why?.steps) ? why.steps : [];
  const albumImage = resolveImagePath(collections?.packages?.[0]?.coverImage);

  return (
    <section id="experience" className="py-28 bg-[#0D0C0A] text-[#EDE8E1] border-t border-[#262420]/70">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-20 text-left">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-3 font-medium">
            {why?.kicker || 'The Experience'}
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#EDE8E1] mb-6 text-balance">
            {why?.title || 'A seamless, unobtrusive journey.'}
          </h2>
          {why?.conclusion && (
            <p className="text-sm sm:text-base text-[#A39D93] leading-relaxed font-light">
              {why.conclusion}
            </p>
          )}
        </div>

        {/* Chapters Grid */}
        {steps.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="p-8 bg-[#141311] border border-[#262420] flex flex-col justify-between hover:border-[#C5A880]/40 transition-colors text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#262420]">
                    <span className="font-serif text-2xl text-[#C5A880] font-light">
                      0{idx + 1}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#A39D93] font-medium">
                      Phase
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#EDE8E1] tracking-wide mb-4">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#A39D93] leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Fine Art Heirloom Album Banner */}
        {albumImage && (
          <div className="relative bg-[#161513] border border-[#262420] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center text-left">
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16">
              <div className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] mb-2 font-medium">
                Heirloom Tangibility
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#EDE8E1] mb-4">
                The Fine-Art Linen Album
              </h3>
              <p className="text-sm text-[#A39D93] leading-relaxed font-light mb-6">
                In a digital world of screens and ephemeral feeds, we believe your wedding photographs deserve a physical home. Handcrafted in raw linen with custom gold debossing and archival heavyweight cotton rag paper.
              </p>
            </div>

            <div className="lg:col-span-6 h-full min-h-[300px] lg:min-h-[400px] relative bg-[#1E1C18]">
              <img
                src={albumImage}
                alt="Handcrafted fine-art wedding album plinth"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.93] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#161513] via-transparent to-transparent opacity-40 lg:opacity-70" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
