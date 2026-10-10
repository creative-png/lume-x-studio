import React, { useState } from 'react';
import { SITE_CONFIG } from '../data/weddingData';
import { X, CheckCircle, MessageCircle } from 'lucide-react';

interface DateCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledLocation?: string;
  prefilledPackage?: string;
}

export const DateCheckerModal: React.FC<DateCheckerModalProps> = ({
  isOpen,
  onClose,
  prefilledLocation = '',
}) => {
  const [date, setDate] = useState('');
  const [destination, setDestination] = useState(prefilledLocation || 'Udaipur, Rajasthan');
  const [coupleNames, setCoupleNames] = useState('');
  const [checked, setChecked] = useState(false);

  if (!isOpen) return null;

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setChecked(true);
  };

  const owner = SITE_CONFIG.owner;
  const studioName = owner?.name || 'LUMÉ STUDIO';
  const whatsappNumber = owner?.whatsappNumber || '918638683167';

  const handleWhatsAppBooking = () => {
    const text = `Hi ${studioName}, I'm checking availability for our wedding on ${date || 'the upcoming season'} in ${destination}. Couple: ${coupleNames || 'Two of us'}. Could you let us know if you have dates open?`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070605]/95 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#141311] border border-[#262420] p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#A39D93] hover:text-[#EDE8E1] transition-colors cursor-pointer"
          aria-label="Close date checker"
        >
          <X size={20} />
        </button>

        <div className="mb-6 text-left">
          <div className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] mb-2 font-medium">
            Calendar Exclusivity
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#EDE8E1]">
            Check Your Date
          </h3>
          <p className="text-xs text-[#A39D93] mt-2 font-light leading-relaxed">
            We photograph a strictly limited number of celebrations each year. Check if our team is open for your weekend.
          </p>
        </div>

        {checked ? (
          <div className="space-y-6 animate-in fade-in duration-300 text-left">
            <div className="p-4 bg-[#181613] border border-[#C5A880]/40 flex items-start gap-3">
              <CheckCircle size={18} className="text-[#C5A880] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="text-[#EDE8E1] font-medium block mb-1">
                  Preliminary Date Open
                </span>
                <span className="text-[#A39D93] leading-relaxed block">
                  Our team has an open booking slot around <span className="text-[#EDE8E1]">{date || 'your selected dates'}</span> for celebrations in <span className="text-[#EDE8E1]">{destination}</span>.
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A39D93] font-light leading-relaxed">
              To hold the date and receive our full visual proposal, reach our studio producer:
            </p>

            <div className="space-y-3">
              <button
                onClick={handleWhatsAppBooking}
                className="w-full py-3.5 bg-[#25D366] text-black font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#2ee06e] transition-colors cursor-pointer"
              >
                <MessageCircle size={16} /> Confirm Availability on WhatsApp
              </button>

              <button
                onClick={() => {
                  setChecked(false);
                  onClose();
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 border border-[#262420] text-xs uppercase tracking-wider text-[#EDE8E1] hover:bg-[#262420] transition-colors cursor-pointer"
              >
                Fill Detailed Inquiry Form
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCheck} className="space-y-4 text-left">
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-[#A39D93] mb-1.5 font-medium">
                Wedding / Event Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#1C1A17] border border-[#262420] text-xs text-[#EDE8E1] focus:outline-none focus:border-[#C5A880] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-[#A39D93] mb-1.5 font-medium">
                Destination / City *
              </label>
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Udaipur, Jodhpur, Goa, Mumbai..."
                className="w-full px-4 py-2.5 bg-[#1C1A17] border border-[#262420] text-xs text-[#EDE8E1] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-[#A39D93] mb-1.5 font-medium">
                Couple Names (Optional)
              </label>
              <input
                type="text"
                value={coupleNames}
                onChange={(e) => setCoupleNames(e.target.value)}
                placeholder="e.g. Amara & Veer"
                className="w-full px-4 py-2.5 bg-[#1C1A17] border border-[#262420] text-xs text-[#EDE8E1] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-[#C5A880] text-[#0D0C0A] hover:bg-[#DFCAAB] text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer shadow-md"
              >
                Check Real-Time Availability
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
