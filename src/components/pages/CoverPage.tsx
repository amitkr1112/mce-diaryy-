import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Compass, ShieldCheck } from 'lucide-react';
import { playCoverOpenSound } from '../../utils/soundEffects';

interface CoverPageProps {
  onOpenDiary: () => void;
}

export default function CoverPage({ onOpenDiary }: CoverPageProps) {
  const handleOpen = () => {
    playCoverOpenSound();
    onOpenDiary();
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-6 sm:p-12 text-center select-none overflow-hidden">
      {/* Outer book cover geometric borders */}
      <div className="absolute inset-4 sm:inset-6 border border-white/10 rounded-xs pointer-events-none" />
      <div className="absolute inset-6 sm:inset-8 border border-white/5 rounded-xs pointer-events-none" />
      
      {/* Corner geometric markers */}
      <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-white/30 pointer-events-none" />
      <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-white/30 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-white/30 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-white/30 pointer-events-none" />

      {/* Diary Bookmark Ribbon Hanging from Top */}
      <div className="absolute top-0 right-14 sm:right-20 w-5 h-20 sm:h-28 bg-[#2d2d30] border-x border-b border-white/10 shadow-lg flex flex-col items-center justify-end pb-2 z-10">
        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
      </div>

      {/* Top Header / Crest */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-6 sm:pt-10 flex flex-col items-center space-y-1.5 z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#222224] border border-white/10 text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#A0A0A0] font-sans font-bold">
          <Compass className="w-3 h-3 text-[#CCCCCC]" />
          <span>Motihari College of Engineering</span>
        </div>
        <p className="text-[10px] sm:text-xs text-[#777777] tracking-[0.3em] uppercase font-sans">Est. 1980 • Champaran, Bihar</p>
      </motion.div>

      {/* Central Book Emblem & Title */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="my-auto py-8 flex flex-col items-center max-w-md z-10"
      >
        {/* Geometric Shield Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xs bg-[#1f1f22] border border-white/10 shadow-2xl flex items-center justify-center mb-6 relative">
          <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-[#CCCCCC]" />
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FAF9F6] drop-shadow-md">
          MCE.Diaryy
        </h1>

        {/* Subtitle in elegant italic */}
        <p className="font-serif italic text-xl sm:text-2xl text-[#B8B8B8] mt-3 tracking-wide">
          “A diary of campus life”
        </p>

        {/* Geometric hairline divider */}
        <div className="h-[1px] w-16 bg-white/20 my-5" />

        <p className="font-sans text-xs sm:text-sm text-[#888888] max-w-xs leading-relaxed">
          Preserving photographs, stories, videos, and timeless engineering memories.
        </p>
      </motion.div>

      {/* Bottom Open Diary Button */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="pb-4 sm:pb-8 z-10 flex flex-col items-center space-y-3"
      >
        <button
          id="open-diary-button"
          onClick={handleOpen}
          className="group inline-flex items-center gap-3 px-8 sm:px-10 py-3 sm:py-3.5 rounded-xs text-xs sm:text-sm font-sans uppercase tracking-[0.25em] font-bold text-[#1a1a1a] bg-[#FAF9F6] hover:bg-white transition-all cursor-pointer shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-white/20 active:scale-98"
        >
          <BookOpen className="w-4 h-4 text-[#1a1a1a]" />
          <span>OPEN DIARY</span>
        </button>

        <span className="text-[10px] text-[#666666] font-sans uppercase tracking-widest">
          Click to enter the archive
        </span>
      </motion.div>
    </div>
  );
}
