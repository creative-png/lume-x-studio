import React from 'react';
import { SITE_CONFIG } from '../data/weddingData';

interface CollectionsProps {
  onSelectPackage: (packageName: string) => void;
}

export const Collections: React.FC<CollectionsProps> = ({ onSelectPackage }) => {
  const { collections } = SITE_CONFIG;

  const handleEnquire = (packageName: string) => {
    onSelectPackage(packageName);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="collections" className="py-8 sm:py-12 md:py-18 bg-[#1f1824] text-[#f3eee8]">
      <div className="max-w-[1100px] mx-auto px-3.5 sm:px-6 text-left">
        <p className="text-sm sm:text-base uppercase tracking-[0.18em] text-[#d9b8a3] mb-2 font-medium inline-block border-b-2 border-[#d9b8a3] pb-0.5">
          {collections.kicker}
        </p>

        <h2 className="font-serif text-[24px] sm:text-[32px] md:text-[40px] font-light leading-[1.12] max-w-[18ch] text-[#f3eee8] mb-5 sm:mb-7">
          {collections.title}
        </h2>

        {/* Collections Grid: 2 cards in one row on mobile matching previous sections */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5 mt-4 sm:mt-6">
          {collections.packages.map((pkg, index) => {
            const isLastOdd = index === 2;

            return (
              <div
                key={pkg.name}
                className={`group ${
                  isLastOdd ? 'col-span-2 md:col-span-1' : 'col-span-1'
                } p-2.5 sm:p-4 md:p-5 overflow-hidden flex flex-col justify-between border transition-all ${
                  pkg.featured
                    ? 'border-[#debca6] bg-[#17111a] shadow-lg'
                    : 'border-[#3a2f40] bg-[#1f1824]'
                }`}
              >
                <div>
                  {/* Artwork Thumbnail */}
                  <div
                    className={`relative -mx-2.5 -mt-2.5 sm:-mx-4 sm:-mt-4 md:-mx-5 md:-mt-5 mb-2.5 sm:mb-3.5 overflow-hidden bg-[#17111a] ${
                      isLastOdd ? 'aspect-[16/9] sm:aspect-[2/1] md:aspect-[4/3]' : 'aspect-[16/10] sm:aspect-[4/3]'
                    }`}
                  >
                    <img
                      src={pkg.coverImage}
                      alt={pkg.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter brightness-100 contrast-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#17111a] via-transparent to-transparent opacity-45" />
                  </div>

                  <h3 className="font-serif text-[15px] sm:text-[20px] md:text-[24px] font-light text-[#f3eee8] mb-0.5">
                    {pkg.name}
                  </h3>

                  <div className="font-serif text-[13px] sm:text-[17px] md:text-[20px] text-[#d9b8a3] my-0.5 mb-2 font-light">
                    {pkg.price}
                  </div>

                  {/* Features list */}
                  <ul className="list-none p-0 m-0 mb-3 text-[#b4a9b0] flex-1">
                    {pkg.items.map((item, i) => (
                      <li
                        key={i}
                        className="py-0.5 sm:py-1 border-b border-[#3a2f40] text-[10.5px] sm:text-[12px] md:text-[13px] text-[#b4a9b0] font-light"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Enquire button */}
                <button
                  onClick={() => handleEnquire(pkg.name)}
                  className={`w-full py-1.5 sm:py-2.5 px-2.5 text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.14em] font-medium transition-colors text-center cursor-pointer ${
                    pkg.featured
                      ? 'bg-[#debca6] text-[#17111a] hover:bg-[#f8f5f0]'
                      : 'border border-[#debca6] text-[#f8f5f0] hover:bg-[#debca6] hover:text-[#17111a]'
                  }`}
                >
                  Enquire
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-[#b4a9b0] mt-4 sm:mt-5 text-[12px] sm:text-[14px] font-light">
          {collections.note}
        </p>
      </div>
    </section>
  );
};
