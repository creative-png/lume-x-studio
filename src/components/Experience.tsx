import React from 'react';
import { IMAGES } from '../data/weddingData';

export const Experience: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'BEFORE',
      summary: 'We get to know your story, your people and the atmosphere you\'re imagining.',
      details: 'Through quiet conversations and a shared visual moodboard, we discover what matters most to you—the key family dynamics, your architectural aesthetic, and how you want the weekend to feel.'
    },
    {
      num: '02',
      title: 'DURING',
      summary: 'We photograph naturally, stepping in only when direction genuinely adds something.',
      details: 'No rigid posing scripts or interrupting real hugs. We flow with the natural rhythm of your celebration, stepping forward during brief portrait windows when the light is sublime.'
    },
    {
      num: '03',
      title: 'AFTER',
      summary: 'Every photograph is carefully selected, colour-finished and curated into a visual story.',
      details: 'Within 72 hours you receive an initial highlight edit. The full gallery is individually color-graded to our signature film tonal curve, paired with handcrafted archival linen albums.'
    }
  ];

  return (
    <section id="experience" className="py-28 bg-[#0D0C0A] text-[#EDE8E1] border-t border-[#262420]/70">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-3 font-medium">
            The Experience
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#EDE8E1] mb-6 text-balance">
            A seamless, unobtrusive <span className="italic text-[#DFCAAB]">journey.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A39D93] leading-relaxed font-light">
            Working with Lumé is intentionally low-stress. We take care of timeline coordination, light planning, and family portraits with calm efficiency so you never feel rushed.
          </p>
        </div>

        {/* 3 Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-8 bg-[#141311] border border-[#262420] flex flex-col justify-between hover:border-[#C5A880]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#262420]">
                  <span className="font-serif text-2xl text-[#C5A880] font-light">
                    {step.num}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#A39D93] font-medium">
                    Phase
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#EDE8E1] tracking-wide mb-4">
                  {step.title}
                </h3>

                <p className="font-serif italic text-base text-[#DFCAAB] mb-4 leading-relaxed">
                  “{step.summary}”
                </p>

                <p className="text-xs text-[#A39D93] leading-relaxed font-light">
                  {step.details}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Fine Art Heirloom Album Banner */}
        <div className="relative bg-[#161513] border border-[#262420] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16">
            <div className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] mb-2 font-medium">
              Heirloom Tangibility
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#EDE8E1] mb-4">
              The Fine-Art Linen Album
            </h3>
            <p className="text-sm text-[#A39D93] leading-relaxed font-light mb-6">
              In a digital world of screens and ephemeral feeds, we believe your wedding photographs deserve a physical home. Handcrafted in raw Japanese linen with custom gold debossing and archival heavyweight cotton rag paper.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#C5A880]">
              <span>300gsm Cotton Rag</span>
              <span aria-hidden="true">·</span>
              <span>Lay-flat Binding</span>
              <span aria-hidden="true">·</span>
              <span>Generational Guarantee</span>
            </div>
          </div>

          <div className="lg:col-span-6 h-full min-h-[300px] lg:min-h-[400px] relative bg-[#1E1C18]">
            <img
              src={IMAGES.fineAlbum}
              alt="Handcrafted fine-art wedding album plinth"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-[0.93] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#161513] via-transparent to-transparent opacity-40 lg:opacity-70" />
          </div>
        </div>
      </div>
    </section>
  );
};
