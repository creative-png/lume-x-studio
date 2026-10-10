import React, { useState, useRef, useEffect } from 'react';
import { SITE_CONFIG } from '../data/weddingData';

interface Message {
  role: 'bot' | 'me';
  text: string;
}

interface AiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiChatbot: React.FC<AiChatbotProps> = ({ isOpen, onClose }) => {
  const { owner, collections } = SITE_CONFIG;
  const studioName = owner?.name || 'LUMÉ STUDIO';
  const shortName = studioName.split(' ')[0] || 'Lumé';
  const phone = owner?.phone || '+91 8638683167';
  const email = owner?.email || 'ash2k21x@gmail.com';
  const whatsappNumber = owner?.whatsappNumber || '918638683167';
  const locations = owner?.locations || 'Mumbai, Goa, Rajasthan & worldwide';

  const packagesDesc = (collections?.packages || [])
    .map((p) => `${p.name} (${p.price})`)
    .join(', ');

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: `Hello, I'm the ${shortName} concierge. Ask me about collections, dates or travel.`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const chips = ['Pricing', 'Check availability', 'Destination weddings', 'Contact the team'];

  const quickKnowledge: [RegExp, string][] = [
    [/price|cost|package|collection|rate|budget|₹/i, `Our curated collections include: ${packagesDesc || 'custom tailored collections'}. Reach our team for a bespoke quote.`],
    [/date|available|book|slot/i, `We accept a limited number of celebrations each year. Use the 'Check your date' section below, or message us on WhatsApp with your date and venue to confirm availability.`],
    [/travel|destination|abroad|worldwide|goa|udaipur|jodhpur/i, `Yes, we document weddings across ${locations}. Destination coverage is available on request with travel included.`],
    [/film|video|cinema/i, "Cinematic wedding films with authentic vows audio are featured in our premier collections or available as an addition."],
    [/album|print/i, "Fine-art handcrafted heirloom albums and archival prints are included across our signature collections."],
    [/gallery|deliver|receive|how long|time/i, "Every celebration includes a private online gallery. Photographs are hand-finished individually, with preview highlights delivered within 72 hours."],
    [/photographer|team|style|candid/i, "Our style is documentary and editorial: capturing authentic emotion without stiff, artificial posing."],
    [/contact|call|phone|email|whatsapp|talk/i, `Reach us directly at ${phone} or ${email}, or message us on WhatsApp at +${whatsappNumber}.`]
  ];

  const handleSend = async (userText: string) => {
    const text = userText.trim();
    if (!text || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'me', text }]);
    setLoading(true);

    // Call server Gemini API route, with fast client fallback
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: text })
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'bot', text: data.reply }]);
        setLoading(false);
        return;
      }
    } catch (e) {
      console.warn('API error, using client concierge:', e);
    }

    // Graceful match from knowledge base
    const hit = quickKnowledge.find(([regex]) => regex.test(text));
    const replyText = hit
      ? hit[1]
      : `I'd love to help with that. Message us on WhatsApp at ${phone} or check your date below and the team will reply personally.`;

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'bot', text: replyText }]);
      setLoading(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      id="chat"
      className="fixed right-4 sm:right-5 bottom-24 sm:bottom-28 z-50 w-[min(370px,calc(100vw-32px))] h-[min(520px,70vh)] bg-[#1f1824] border border-[#d9b8a3] flex flex-col shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200"
      role="dialog"
      aria-label="Chat"
    >
      {/* Header */}
      <header className="px-4.5 py-3.5 border-b border-[#3a2f40] flex justify-between items-center bg-[#17111a]">
        <span className="font-serif text-[22px] font-light text-[#f3eee8]">
          {shortName} concierge
        </span>
        <button
          onClick={onClose}
          className="text-2xl text-[#f3eee8] hover:text-[#d9b8a3] cursor-pointer p-1"
          aria-label="Close"
        >
          ×
        </button>
      </header>

      {/* Message Log */}
      <div
        ref={logRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5 text-[15px] leading-relaxed text-left"
      >
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`p-2.5 px-3.5 max-w-[88%] text-[14px] sm:text-[15px] ${
              m.role === 'me'
                ? 'bg-[#d9b8a3] text-[#17111a] self-end rounded-sm font-normal'
                : 'bg-[#17111a] text-[#f3eee8] self-start border-l-2 border-[#d9b8a3] font-light'
            }`}
          >
            {m.text}
          </div>
        ))}

        {loading && (
          <div className="bg-[#17111a] text-[#b4a9b0] p-2.5 px-3.5 border-l-2 border-[#d9b8a3] self-start text-xs font-light">
            Consulting studio...
          </div>
        )}
      </div>

      {/* Quick Chips */}
      <div className="flex gap-1.5 flex-wrap px-4 pb-2.5">
        {chips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="bg-none border border-[#3a2f40] text-[#f3eee8] px-3 py-1 rounded-[20px] text-[13px] hover:border-[#d9b8a3] hover:text-[#d9b8a3] transition-colors cursor-pointer"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="flex border-t border-[#3a2f40] m-0"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about pricing, dates, travel…"
          autoComplete="off"
          className="flex-1 bg-transparent border-0 px-3.5 py-2.5 text-sm text-[#f3eee8] placeholder:text-[#b4a9b0]/60 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#d9b8a3] text-[#17111a] border-0 px-4.5 font-medium text-sm hover:bg-[#f3eee8] transition-colors cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
};
