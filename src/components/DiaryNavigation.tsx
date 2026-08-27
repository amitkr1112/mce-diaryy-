import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookMarked, 
  Volume2, 
  VolumeX, 
  List, 
  X,
} from 'lucide-react';
import { playPageFlipSound } from '../utils/soundEffects';

interface DiaryNavigationProps {
  currentPage: number; // 1 to 8
  totalPages: number;  // 8
  onPageChange: (page: number) => void;
  soundActive: boolean;
  onToggleSound: () => void;
}

const PAGE_NAMES = [
  'Cover (MCE.Diaryy)',
  'Dear Diary',
  'Photo Diary',
  'Video Diary',
  'Campus Stories',
  'Playground & Games',
  'MCE Timeline',
  'About MCE.Diaryy',
];

export default function DiaryNavigation({
  currentPage,
  totalPages,
  onPageChange,
  soundActive,
  onToggleSound,
}: DiaryNavigationProps) {
  const [showIndex, setShowIndex] = useState(false);

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handlePrev = () => {
    if (canGoPrev) {
      playPageFlipSound();
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      playPageFlipSound();
      onPageChange(currentPage + 1);
    }
  };

  const handleJumpTo = (p: number) => {
    playPageFlipSound();
    onPageChange(p);
    setShowIndex(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 px-2 sm:px-4 flex flex-col items-center select-none z-20">
      {/* Table of Contents / Index Popup Modal in Geometric Theme */}
      {showIndex && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div 
            onClick={() => setShowIndex(false)}
            className="absolute inset-0 cursor-pointer"
          />
          <div className="relative max-w-md w-full bg-[#FAF9F6] p-6 rounded-sm shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border border-black/10 text-[#2D2D2D]">
            <div className="flex items-center justify-between border-b border-black/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-[#555555]" />
                <h3 className="font-serif italic font-bold text-lg text-[#2D2D2D]">
                  Table of Contents
                </h3>
              </div>
              <button
                onClick={() => setShowIndex(false)}
                className="w-6 h-6 rounded-sm bg-black/5 hover:bg-black/10 text-[#333333] flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1 max-h-80 overflow-y-auto diary-scrollbar pr-1">
              {PAGE_NAMES.map((name, index) => {
                const pageNum = index + 1;
                const isCurrent = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handleJumpTo(pageNum)}
                    className={`w-full p-2.5 rounded-xs text-left text-xs font-sans flex items-center justify-between transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#1a1a1a] text-[#FAF9F6] font-medium'
                        : 'bg-white hover:bg-[#f0eee6] text-[#4A4A4A] border border-black/5'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="font-mono text-[10px] text-[#888888]">
                        0{pageNum}
                      </span>
                      <span>{name}</span>
                    </span>
                    {isCurrent && <span className="text-[9px] uppercase tracking-widest text-[#A0A0A0]">Active</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Geometric Balance Navigation Bar */}
      <div 
        id="diary-navigation-bar"
        className="flex items-center justify-center gap-6 sm:gap-16 md:gap-24 w-full"
      >
        {/* Left: Previous Page Button */}
        <button
          id="prev-page-button"
          onClick={handlePrev}
          disabled={!canGoPrev}
          className={`flex items-center gap-2 text-xs font-sans uppercase tracking-[0.3em] transition-colors cursor-pointer ${
            canGoPrev
              ? 'text-[#888888] hover:text-white'
              : 'text-[#444444] cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev Page</span>
          <span className="sm:hidden">Prev</span>
        </button>

        {/* Center: Geometric Page Indicator with Table of Contents Click */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowIndex(true)}
            className="text-[#B8B8B8] font-sans text-xs tracking-[0.4em] sm:tracking-[0.5em] uppercase px-4 sm:px-8 py-2 border-x border-white/10 hover:text-white hover:border-white/25 transition-all cursor-pointer flex items-center gap-2"
            title="Open Table of Contents"
          >
            <span>Page {currentPage} / {totalPages}</span>
            <List className="w-3 h-3 opacity-60" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-1.5 rounded-sm text-[#777777] hover:text-white transition-colors cursor-pointer"
            title={soundActive ? 'Mute Page Turn Sound' : 'Enable Page Turn Sound'}
          >
            {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-[#ef4444]" />}
          </button>
        </div>

        {/* Right: Next Page Button */}
        <button
          id="next-page-button"
          onClick={handleNext}
          disabled={!canGoNext}
          className={`flex items-center gap-2 text-xs font-sans uppercase tracking-[0.3em] transition-colors cursor-pointer ${
            canGoNext
              ? 'text-[#888888] hover:text-white'
              : 'text-[#444444] cursor-not-allowed'
          }`}
        >
          <span className="hidden sm:inline">Next Page</span>
          <span className="sm:hidden">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Subtle Keyboard Hint */}
      <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#555555] font-sans mt-3">
        <span>Use <kbd className="px-1 py-0.5 rounded-xs bg-[#222222] text-[#888888] border border-white/5 font-mono text-[9px]">←</kbd> and <kbd className="px-1 py-0.5 rounded-xs bg-[#222222] text-[#888888] border border-white/5 font-mono text-[9px]">→</kbd> keys to turn</span>
      </div>
    </div>
  );
}
