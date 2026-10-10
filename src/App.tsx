import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { StoryView } from './components/StoryView';
import { Reviews } from './components/Reviews';
import { WhyLume } from './components/WhyLume';
import { Collections } from './components/Collections';
import { Faq } from './components/Faq';
import { InquirySection } from './components/InquirySection';
import { Footer } from './components/Footer';
import { StickyContactBar } from './components/StickyContactBar';
import { AiChatbot } from './components/AiChatbot';
import { SITE_CONFIG } from './data/weddingData';

export default function App() {
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const defaultPackage = SITE_CONFIG.collections?.packages?.[0]?.name || 'The Signature';
  const [selectedPackage, setSelectedPackage] = useState<string>(defaultPackage);

  // Sync with URL hash for story routing (#story/:id)
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#story/')) {
        const id = hash.replace('#story/', '').trim();
        if (id) {
          setActiveStoryId(id);
          return;
        }
      }
      setActiveStoryId(null);
    };

    // Check initial hash
    checkHash();

    // Listen to hash changes (back / forward navigation)
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleOpenStory = (id: string) => {
    setActiveStoryId(id);
    window.location.hash = `#story/${id}`;
  };

  const handleCloseStory = () => {
    setActiveStoryId(null);
    if (window.location.hash.startsWith('#story/')) {
      // Remove hash without jumping page
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleCheckDateClick = (packageName?: string) => {
    if (packageName) {
      setSelectedPackage(packageName);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#17111a] text-[#f3eee8] font-sans antialiased selection:bg-[#d9b8a3]/30 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        onOpenDateChecker={() => handleCheckDateClick()}
        onOpenAiChat={() => setIsChatOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <Hero onCheckDateClick={() => handleCheckDateClick()} />

        {/* The Work / Portfolio (Dynamic from JSON) */}
        <Portfolio onOpenStory={handleOpenStory} />

        {/* Google Reviews */}
        <Reviews />

        {/* Why Lumé ("Not just the big moments") */}
        <WhyLume />

        {/* Collections ("Three ways to be photographed") */}
        <Collections onSelectPackage={(pkg) => handleCheckDateClick(pkg)} />

        {/* FAQ ("Good to know") */}
        <Faq />

        {/* Check Your Date & WhatsApp Form */}
        <InquirySection selectedPackage={selectedPackage} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Dedicated Story Inner Page & Lightbox View */}
      <StoryView
        storyId={activeStoryId}
        onClose={handleCloseStory}
        onSelectStory={handleOpenStory}
        onCheckDateClick={handleCheckDateClick}
      />

      {/* Floating Action Buttons */}
      <StickyContactBar
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        isChatOpen={isChatOpen}
      />

      {/* AI Concierge Chat Drawer */}
      <AiChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}
