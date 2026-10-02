import React from 'react';
import { SITE_CONFIG } from '../data/weddingData';

export const Faq: React.FC = () => {
  const { faq } = SITE_CONFIG;

  return (
    <section id="faq" className="py-8 sm:py-12 md:py-18 bg-[#17111a] text-[#f3eee8]">
      <div className="max-w-[1100px] mx-auto px-3.5 sm:px-6 text-left">
        <p className="text-sm sm:text-base uppercase tracking-[0.18em] text-[#d9b8a3] mb-2 font-medium inline-block border-b-2 border-[#d9b8a3] pb-0.5">
          {faq.kicker}
        </p>

        <h2 className="font-serif text-[24px] sm:text-[32px] md:text-[40px] font-light leading-[1.12] max-w-[18ch] text-[#f3eee8] mb-5 sm:mb-7">
          {faq.title}
        </h2>

        <div className="mt-5 sm:mt-7 max-w-[820px]">
          {faq.questions.map((item, index) => (
            <details
              key={index}
              className="group border-b border-[#3a2f40] py-2.5 sm:py-3 transition-colors"
            >
              <summary className="cursor-pointer font-serif text-[17px] sm:text-[20px] md:text-[22px] text-[#f3eee8] list-none flex justify-between items-center select-none font-light">
                <span>{item.q}</span>
                <span className="text-[#d9b8a3] text-lg font-mono ml-2 group-open:hidden">+</span>
                <span className="text-[#d9b8a3] text-lg font-mono ml-2 hidden group-open:inline">–</span>
              </summary>
              <p className="text-[#b4a9b0] text-[13px] sm:text-[14.5px] leading-relaxed mt-2 max-w-[60ch] font-light">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
