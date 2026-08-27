import React, { useState, useEffect, useCallback } from 'react';
import DiaryBook from './components/DiaryBook';
import DiaryNavigation from './components/DiaryNavigation';
import LightboxModal from './components/modals/LightboxModal';
import VideoPlayerModal from './components/modals/VideoPlayerModal';
import StoryReaderModal from './components/modals/StoryReaderModal';
import { DiaryPhoto, DiaryVideo, CampusStory } from './types';
import { playPageFlipSound, toggleSound, isSoundEnabled } from './utils/soundEffects';
import { BookOpen, Sparkles, Instagram, Compass, Volume2, VolumeX } from 'lucide-react';
import { DIARY_METADATA } from './data/diaryData';

const TOTAL_PAGES = 8;

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [soundActive, setSoundActive] = useState<boolean>(true);

  // Modals state
  const [selectedPhoto, setSelectedPhoto] = useState<DiaryPhoto | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<DiaryVideo | null>(null);
  const [selectedStory, setSelectedStory] = useState<CampusStory | null>(null);

  // Handle page turn with boundary check
  const handlePageChange = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= TOTAL_PAGES) {
      setCurrentPage(newPage);
    }
  }, []);

  // Keyboard navigation (← and → arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger page turn if typing in an input (e.g. word puzzle) or modal is open
      if (
        ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName) ||
        selectedPhoto ||
        selectedVideo ||
        selectedStory
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        if (currentPage < TOTAL_PAGES) {
          playPageFlipSound();
          handlePageChange(currentPage + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentPage > 1) {
          playPageFlipSound();
          handlePageChange(currentPage - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, handlePageChange, selectedPhoto, selectedVideo, selectedStory]);

  const handleSoundToggle = () => {
    const nextState = toggleSound();
    setSoundActive(nextState);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] geometric-dot-grid text-[#e2e8f0] flex flex-col justify-between py-3 sm:py-6 px-2 sm:px-4 selection:bg-[#333333] selection:text-white relative overflow-x-hidden font-sans">
      {/* Top Ambient Geometric Header Bar */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between px-3 sm:px-6 py-2.5 border-b border-white/10 z-20">
        <div 
          onClick={() => {
            playPageFlipSound();
            setCurrentPage(1);
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-7 h-7 rounded-sm bg-[#222222] border border-white/10 flex items-center justify-center text-[#B8B8B8] group-hover:border-white/30 transition-colors">
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-serif text-sm sm:text-base font-bold tracking-wider text-[#FAF9F6]">
              MCE.Diaryy
            </span>
            <span className="hidden sm:inline-block text-[10px] text-[#888888] ml-2 tracking-widest uppercase font-sans">
              Motihari College of Engineering
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={DIARY_METADATA.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#222222] hover:bg-[#2a2a2a] border border-white/10 text-[10px] sm:text-xs text-[#B8B8B8] uppercase tracking-wider font-sans transition-colors cursor-pointer"
          >
            <Instagram className="w-3.5 h-3.5 text-[#e1306c]" />
            <span>@mce.diaryy</span>
          </a>
        </div>
      </header>

      {/* Main Physical Diary Canvas with Geometric Balance */}
      <main className="flex-1 flex flex-col items-center justify-center my-2 sm:my-4 z-10">
        <DiaryBook
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onSelectPhoto={setSelectedPhoto}
          onPlayVideo={setSelectedVideo}
          onReadStory={setSelectedStory}
        />

        {/* Geometric Balance Style Bottom Navigation Bar */}
        <DiaryNavigation
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onPageChange={handlePageChange}
          soundActive={soundActive}
          onToggleSound={handleSoundToggle}
        />
      </main>

      {/* Modals for full-screen interactions */}
      <LightboxModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />

      <VideoPlayerModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      <StoryReaderModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />

      {/* Subtle Footer with campus credits */}
      <footer className="w-full max-w-4xl mx-auto text-center py-2 text-[11px] text-[#666666] font-sans flex flex-col sm:flex-row items-center justify-between gap-1 px-4 z-10">
        <span>MCE.Diaryy • Preserving campus life & memories of MCE Motihari</span>
        <span className="uppercase tracking-widest text-[10px]">Est. 1980 — Dedicated to the Batches of MCE</span>
      </footer>

      {/* Ambient Geometric Watermark */}
      <div className="fixed bottom-4 right-8 opacity-20 pointer-events-none select-none hidden lg:block z-0">
        <span className="text-[#FAF9F6] text-[80px] font-bold leading-none font-serif">MCE.</span>
      </div>
    </div>
  );
}
