import React, { useState, useEffect } from 'react';
import { STUDIO_INFO, SITE_CONFIG } from '../data/weddingData';

interface InquirySectionProps {
  selectedPackage?: string;
}

export const InquirySection: React.FC<InquirySectionProps> = ({ selectedPackage }) => {
  const { contact, owner } = SITE_CONFIG;

  const [names, setNames] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [collection, setCollection] = useState('Not sure yet');
  const [about, setAbout] = useState('');

  useEffect(() => {
    if (selectedPackage) {
      setCollection(selectedPackage);
    }
  }, [selectedPackage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi ${owner.name}! We're ${names || 'a couple'}. Wedding date: ${date || 'TBD'}. Venue: ${venue || 'TBD'}. Collection: ${collection}. ${about}`;
    window.open(`https://wa.me/${owner.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="contact" className="py-8 sm:py-12 md:py-18 bg-[#1f1824] text-[#f3eee8] text-center">
      <div className="max-w-[1100px] mx-auto px-3.5 sm:px-6">
        <p className="text-sm sm:text-base uppercase tracking-[0.18em] text-[#d9b8a3] mb-2 font-medium inline-block border-b-2 border-[#d9b8a3] pb-0.5">
          {contact.kicker}
        </p>

        <h2 className="font-serif text-[24px] sm:text-[34px] md:text-[42px] font-light leading-[1.12] max-w-[16ch] text-[#f3eee8] mx-auto mb-3 sm:mb-4">
          {contact.title}
        </h2>

        <p className="text-[#b4a9b0] text-[13px] sm:text-[15px] leading-relaxed max-w-[46ch] mx-auto mb-5 sm:mb-7 font-light">
          {contact.lead}
        </p>

        {/* Clean Compact Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-[650px] mx-auto mb-5 sm:mb-7 text-left"
        >
          <div>
            <label htmlFor="n" className="text-[12px] sm:text-[13px] tracking-[0.08em] text-[#b4a9b0] block mb-1 font-light">
              Your names
            </label>
            <input
              id="n"
              type="text"
              required
              value={names}
              onChange={(e) => setNames(e.target.value)}
              placeholder="e.g. Amara & Veer"
              className="w-full bg-[#17111a] border border-[#3a2f40] text-[#f3eee8] p-2.5 text-[13.5px] sm:text-sm rounded-none focus:outline-none focus:border-[#d9b8a3] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="d" className="text-[12px] sm:text-[13px] tracking-[0.08em] text-[#b4a9b0] block mb-1 font-light">
              Wedding date
            </label>
            <input
              id="d"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#17111a] border border-[#3a2f40] text-[#f3eee8] p-2.5 text-[13.5px] sm:text-sm rounded-none focus:outline-none focus:border-[#d9b8a3] transition-colors font-sans"
            />
          </div>

          <div>
            <label htmlFor="v" className="text-[12px] sm:text-[13px] tracking-[0.08em] text-[#b4a9b0] block mb-1 font-light">
              Destination or venue
            </label>
            <input
              id="v"
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="e.g. Udaipur, Goa, Mumbai"
              className="w-full bg-[#17111a] border border-[#3a2f40] text-[#f3eee8] p-2.5 text-[13.5px] sm:text-sm rounded-none focus:outline-none focus:border-[#d9b8a3] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="p" className="text-[12px] sm:text-[13px] tracking-[0.08em] text-[#b4a9b0] block mb-1 font-light">
              Collection
            </label>
            <select
              id="p"
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              className="w-full bg-[#17111a] border border-[#3a2f40] text-[#f3eee8] p-2.5 text-[13.5px] sm:text-sm rounded-none focus:outline-none focus:border-[#d9b8a3] transition-colors cursor-pointer"
            >
              <option value="Not sure yet">Not sure yet</option>
              <option value="The Signature">The Signature</option>
              <option value="The Editorial">The Editorial</option>
              <option value="The Intimate">The Intimate</option>
            </select>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label htmlFor="t" className="text-[12px] sm:text-[13px] tracking-[0.08em] text-[#b4a9b0] block mb-1 font-light">
              About your celebration
            </label>
            <textarea
              id="t"
              rows={2}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Guest count, multi-day schedule, atmosphere..."
              className="w-full bg-[#17111a] border border-[#3a2f40] text-[#f3eee8] p-2.5 text-[13.5px] sm:text-sm rounded-none focus:outline-none focus:border-[#d9b8a3] transition-colors resize-none"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#d9b8a3] text-[#17111a] text-[11.5px] sm:text-xs uppercase tracking-[0.14em] font-medium hover:bg-[#f3eee8] transition-colors cursor-pointer"
            >
              Send on WhatsApp
            </button>
          </div>
        </form>

        {/* Direct CTA Buttons */}
        <div className="flex flex-row items-center justify-center gap-3 flex-wrap">
          <a
            href={`mailto:${owner.email}`}
            className="px-4 py-2 border border-[#d9b8a3] text-[#f3eee8] text-[11.5px] sm:text-xs tracking-[0.08em] hover:bg-[#d9b8a3] hover:text-[#17111a] transition-colors"
          >
            {owner.email}
          </a>
          <a
            href={STUDIO_INFO.phoneUrl}
            className="px-4 py-2 border border-[#d9b8a3] text-[#f3eee8] text-[11.5px] sm:text-xs tracking-[0.08em] hover:bg-[#d9b8a3] hover:text-[#17111a] transition-colors"
          >
            {owner.phone}
          </a>
        </div>
      </div>
    </section>
  );
};
