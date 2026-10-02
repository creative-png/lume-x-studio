import React from 'react';
import { SITE_CONFIG } from '../data/weddingData';

export const WhyLume: React.FC = () => {
  const { why } = SITE_CONFIG;

  return (
    <section id="why" className="py-8 sm:py-12 md:py-18 bg-[#17111a] text-[#f3eee8]">
      <div className="max-w-[1100px] mx-auto px-3.5 sm:px-6 text-left">
        <p className="text-sm sm:text-base uppercase tracking-[0.18em] text-[#d9b8a3] mb-2.5 font-medium inline-block border-b-2 border-[#d9b8a3] pb-0.5">
          {why.kicker}
        </p>

        <h2 className="font-serif text-[24px] sm:text-[32px] md:text-[40px] font-light leading-[1.12] max-w-[18ch] text-[#f3eee8] mb-4 sm:mb-6">
          {why.title}
        </h2>

        {/* Moments List */}
        <ul className="list-none p-0 my-4 sm:my-6 font-serif italic text-[16px] sm:text-[20px] md:text-[24px] leading-[1.45] text-[#b4a9b0] font-light">
          {why.moments.map((moment, idx) => (
            <li key={idx} className="border-b border-[#3a2f40] py-1.5 sm:py-2">
              {moment}
            </li>
          ))}
        </ul>

        {/* Climax line */}
        <p className="text-[13.5px] sm:text-[15px] text-[#f3eee8] mb-5 sm:mb-7 font-light">
          {why.conclusion}
        </p>

        {/* The 3 steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-5 sm:mt-7 pt-1">
          {why.steps.map((step, idx) => (
            <div key={idx}>
              <h3 className="font-serif text-[20px] sm:text-[24px] text-[#d9b8a3] font-light mb-1.5">
                <span className="inline-block border-b border-[#d9b8a3] pb-0.5">{step.title}</span>
              </h3>
              <p className="m-0 text-[#b4a9b0] text-[12.5px] sm:text-[13.5px] leading-relaxed font-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
