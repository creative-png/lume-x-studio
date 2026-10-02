import React, { useState } from 'react';
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

export default function App() {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('The Signature');

  const handleOpenStory = (index: number) => {
    setActiveStoryIndex(index);
  };

  const handleCloseStory = () => {
    setActiveStoryIndex(null);
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

        {/* The Work / Portfolio (12-column asymmetric grid) */}
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

      {/* Fullscreen Story Reader & Lightbox Modal */}
      <StoryView
        storyIndex={activeStoryIndex}
        onClose={handleCloseStory}
        onSelectStory={handleOpenStory}
        onCheckDateClick={handleCheckDateClick}
      />

      {/* Floating Action Buttons (Ask Lumé, Call, WhatsApp) */}
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
