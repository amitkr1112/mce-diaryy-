import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Instagram, 
  Heart, 
  Send, 
  BookMarked, 
  MapPin, 
  ExternalLink,
  RotateCcw,
  Check
} from 'lucide-react';
import { DIARY_METADATA } from '../../data/diaryData';

interface AboutPageProps {
  onCloseDiary: () => void;
}

export default function AboutPage({ onCloseDiary }: AboutPageProps) {
  const [copiedInsta, setCopiedInsta] = useState(false);

  const handleCopyInsta = () => {
    navigator.clipboard?.writeText(DIARY_METADATA.instagramHandle);
    setCopiedInsta(true);
    setTimeout(() => setCopiedInsta(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-5 sm:p-8 md:p-10 text-[#2D2D2D] select-text overflow-hidden">
      {/* Top Header in Geometric Balance */}
      <div className="border-b border-black/10 pb-3 mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#888888] uppercase tracking-[0.2em] font-sans font-bold">Epilogue</span>
            <span className="text-black/20">•</span>
            <span className="text-[10px] text-[#888888] uppercase tracking-[0.2em] font-sans font-bold">About the Initiative</span>
          </div>
          <h2 className="text-xl sm:text-2xl text-[#2D2D2D] font-bold tracking-tight uppercase font-sans mt-0.5">
            About MCE.Diaryy
          </h2>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-white border border-black/5 text-[10px] text-[#666666] font-sans font-bold uppercase tracking-wider">
          <MapPin className="w-3 h-3 text-[#666666]" />
          <span>Motihari, Bihar</span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="flex-1 overflow-y-auto diary-scrollbar space-y-4 pr-1">
        {/* Purpose & Manifesto Card */}
        <div className="p-4 sm:p-5 rounded-xs bg-[#ffffff] border border-black/5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#888888] font-sans">
            <BookMarked className="w-3.5 h-3.5 text-[#555555]" />
            <span>The Purpose Behind This Diary</span>
          </div>

          <p className="font-serif text-sm sm:text-base text-[#2D2D2D] leading-relaxed">
            <strong>MCE.Diaryy</strong> was born out of deep affection for <span className="font-semibold underline decoration-black/30 underline-offset-4">{DIARY_METADATA.collegeName}</span>. While curricula update and batches graduate, the candid photographs, late-night hostel debates, chai breaks at the gate, and TechFest triumphs deserve a timeless home.
          </p>

          <p className="font-sans text-xs sm:text-[13px] text-[#555555] leading-relaxed">
            MCE.Diaryy is handcrafted with the tactile warmth of parchment paper, refined serif typography, and realistic page turns — evoking the nostalgic joy of opening a real physical college diary.
          </p>
        </div>

        {/* Social Instagram Card */}
        <div className="p-4 sm:p-5 rounded-xs bg-[#FAF9F6] border border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xs bg-[#1a1a1a] flex items-center justify-center text-white shrink-0">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-xs sm:text-sm text-[#2D2D2D] uppercase tracking-tight">
                Join the Community on Instagram
              </h4>
              <p className="text-xs text-[#666666] font-sans mt-0.5">
                Official memories, fest updates, campus highlights & reels:
              </p>
              <div className="font-mono text-xs font-semibold text-[#1a1a1a] mt-1 inline-flex items-center gap-1.5">
                <span>{DIARY_METADATA.instagramHandle}</span>
                <button
                  onClick={handleCopyInsta}
                  className="text-[10px] text-[#888888] hover:underline font-sans cursor-pointer inline-flex items-center gap-0.5 font-bold uppercase tracking-wider"
                >
                  {copiedInsta ? <Check className="w-3 h-3 text-emerald-600" /> : 'Copy handle'}
                </button>
              </div>
            </div>
          </div>

          <a
            href={DIARY_METADATA.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xs bg-[#1a1a1a] hover:bg-black text-[#FAF9F6] text-xs font-bold uppercase tracking-wider font-sans transition-colors cursor-pointer whitespace-nowrap"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Visit @mce.diaryy</span>
            <ExternalLink className="w-3 h-3 text-[#888888]" />
          </a>
        </div>

        {/* Submission & Batch Contribution note */}
        <div className="p-3.5 rounded-xs bg-[#FAF9F6] border border-black/10 text-xs text-[#555555] font-sans flex items-start gap-2.5">
          <Send className="w-4 h-4 text-[#1a1a1a] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#2D2D2D] uppercase tracking-wider text-[10px] block mb-0.5">Have Photographs or Stories to Add?</span>
            <span>
              DM your batch photos, hostel vlogs, or memoirs to <strong className="text-[#1a1a1a]">{DIARY_METADATA.instagramHandle}</strong> to be featured.
            </span>
          </div>
        </div>
      </div>

      {/* Footer & Close Diary Action */}
      <div className="pt-3 border-t border-black/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-[#666666] font-sans">
          <Heart className="w-3.5 h-3.5 text-red-600 fill-current" />
          <span>Dedicated to every past, present & future engineer of MCE.</span>
        </div>

        <button
          onClick={onCloseDiary}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xs bg-[#1a1a1a] hover:bg-black text-[#ffffff] text-xs font-bold font-sans uppercase tracking-wider transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#cbd5e1]" />
          <span>Close Diary</span>
        </button>
      </div>
    </div>
  );
}
