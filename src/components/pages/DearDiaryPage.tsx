import React from 'react';
import { motion } from 'motion/react';
import { Feather, Camera, Film, BookMarked, Sparkles } from 'lucide-react';
import { DIARY_METADATA } from '../../data/diaryData';

interface DearDiaryPageProps {
  onTurnToPhotos: () => void;
}

export default function DearDiaryPage({ onTurnToPhotos }: DearDiaryPageProps) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 text-[#2D2D2D] select-text">
      {/* Top Header info (Clean Geometric Header) */}
      <div className="flex items-center justify-between border-b border-black/10 pb-3 mb-4">
        <div className="flex items-center gap-2 text-[10px] text-[#888888] font-sans font-bold uppercase tracking-[0.2em]">
          <Feather className="w-3.5 h-3.5 text-[#666666]" />
          <span>Campus Log • Motihari, Bihar</span>
        </div>
        <div className="font-serif italic text-sm sm:text-base text-[#666666] tracking-wide">
          November 12th, Forever Memory
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-4 sm:space-y-5 overflow-y-auto diary-scrollbar pr-1 flex-1">
        {/* Main Heading in Classic Georgia Serif with Hairline separator */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#2D2D2D] italic font-serif" style={{ fontFamily: 'Georgia, serif' }}>
            Dear Diary,
          </h2>
          <div className="h-[1px] w-16 bg-[#2D2D2D]/20 mt-3" />
        </motion.div>

        {/* Nostalgic introductory letter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-sans text-[#4A4A4A] leading-relaxed text-sm sm:text-base space-y-3"
        >
          <p>
            Welcome to <strong className="font-semibold text-[#1a1a1a]">MCE.Diaryy</strong> — a living chronicle and sacred archive dedicated to preserving the laughter, late nights, lab experiments, and lifelong friendships of <span className="border-b border-black/20 pb-0.5">{DIARY_METADATA.collegeName}</span>.
          </p>

          <p className="text-sm sm:text-[15px] text-[#4A4A4A] leading-relaxed">
            From the early morning walks through the main gate to late-night exam prep in the hostels, every photograph, story, and memory shared here builds the eternal legacy of MCE Motihari.
          </p>
        </motion.div>

        {/* Feature Highlights / What this diary holds */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
        >
          <div className="p-3.5 rounded-xs bg-white/80 border border-black/5 flex items-start gap-3 shadow-xs">
            <div className="p-2 rounded-xs bg-black/5 text-[#333333]">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#2D2D2D]">Photo Scrapbook</h4>
              <p className="text-xs text-[#666666] font-sans mt-0.5">Candid polaroids, department snapshots, and hostel nostalgia.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xs bg-white/80 border border-black/5 flex items-start gap-3 shadow-xs">
            <div className="p-2 rounded-xs bg-black/5 text-[#333333]">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#2D2D2D]">Video Archives</h4>
              <p className="text-xs text-[#666666] font-sans mt-0.5">Cinematic drone sweeps, fest reels, and batch farewells.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xs bg-white/80 border border-black/5 flex items-start gap-3 shadow-xs">
            <div className="p-2 rounded-xs bg-black/5 text-[#333333]">
              <BookMarked className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#2D2D2D]">Campus Stories</h4>
              <p className="text-xs text-[#666666] font-sans mt-0.5">True tales from 2 AM exam revisions to rain soaked lawns.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xs bg-white/80 border border-black/5 flex items-start gap-3 shadow-xs">
            <div className="p-2 rounded-xs bg-black/5 text-[#333333]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#2D2D2D]">Playground & Lore</h4>
              <p className="text-xs text-[#666666] font-sans mt-0.5">Interactive MCE trivia, memory cards, and campus location hunt.</p>
            </div>
          </div>
        </motion.div>

        {/* Poetic quote */}
        <div className="p-3.5 bg-white/60 border-l-2 border-[#2D2D2D]/40 rounded-r-xs">
          <p className="font-serif italic text-[#4A4A4A] text-xs sm:text-sm">
            “Years will pass, seasons will shift, but the footsteps we left in the corridors of Motihari will echo forever in our hearts.”
          </p>
        </div>
      </div>

      {/* Footer & Signature with wax seal stamp */}
      <div className="pt-4 border-t border-black/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xs bg-[#2D2D2D] text-[#FAF9F6] flex items-center justify-center shadow-inner font-serif text-xs font-bold">
            MCE
          </div>
          <div>
            <p className="font-serif italic text-base sm:text-lg text-[#2D2D2D]">
              Yours in Engineering,
            </p>
            <p className="text-[10px] text-[#888888] font-sans uppercase tracking-widest">The MCE Chronicles • Est. 1980</p>
          </div>
        </div>

        <button
          onClick={onTurnToPhotos}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xs bg-[#1a1a1a] hover:bg-[#333333] text-[#FAF9F6] text-xs font-sans uppercase tracking-[0.2em] transition-colors cursor-pointer"
        >
          <span>Explore</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
