import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, ZoomIn, Info, Filter, ArrowUpRight } from 'lucide-react';
import { DIARY_PHOTOS } from '../../data/diaryData';
import { DiaryPhoto } from '../../types';

interface PhotoDiaryPageProps {
  onSelectPhoto: (photo: DiaryPhoto) => void;
}

const CATEGORIES = ['All', 'Campus', 'Hostel Life', 'TechFest', 'Labs & Classrooms', 'Sports', 'Canteen & Hangouts'] as const;

export default function PhotoDiaryPage({ onSelectPhoto }: PhotoDiaryPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredPhotos = selectedCategory === 'All' 
    ? DIARY_PHOTOS 
    : DIARY_PHOTOS.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full h-full flex flex-col justify-between p-5 sm:p-8 md:p-10 text-[#2D2D2D] select-text overflow-hidden">
      {/* Top Page Header in Geometric Balance */}
      <div className="border-b border-black/10 pb-3 mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#888888] uppercase tracking-[0.2em] font-sans font-bold">Chapter 01</span>
            <span className="text-black/20">•</span>
            <span className="text-[10px] text-[#888888] uppercase tracking-[0.2em] font-sans font-bold">Visual Scrapbook</span>
          </div>
          <h2 className="text-xl sm:text-2xl text-[#2D2D2D] font-bold tracking-tight uppercase font-sans mt-0.5">
            Photo Diary
          </h2>
        </div>

        {/* Geometric label */}
        <span className="text-[10px] text-[#A0A0A0] uppercase tracking-[0.2em] font-sans font-bold">
          Scrapbook #{selectedCategory === 'All' ? '01' : selectedCategory.slice(0, 3).toUpperCase()}
        </span>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 diary-scrollbar">
        <Filter className="w-3.5 h-3.5 text-[#666666] shrink-0 mr-1" />
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-xs text-[11px] font-sans uppercase tracking-wider font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#1a1a1a] text-[#FAF9F6]'
                : 'bg-white/80 hover:bg-white text-[#555555] border border-black/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Scrapbook Polaroid Grid */}
      <div className="flex-1 overflow-y-auto diary-scrollbar my-2 pr-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 py-2">
          {filteredPhotos.map((photo, index) => {
            const tilt = photo.rotation || ((index % 3) - 1) * 2;
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="group relative cursor-pointer"
                onClick={() => onSelectPhoto(photo)}
              >
                {/* Simulated Minimal Washi Tape on top */}
                <div 
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-3.5 bg-white/50 backdrop-blur-xs border border-black/10 z-10 rotate-2 pointer-events-none" 
                />

                {/* Polaroid Frame with Geometric Balance */}
                <div 
                  className="polaroid-card p-3 rounded-xs bg-[#ffffff] border border-black/5 flex flex-col transition-all duration-300"
                  style={{
                    transform: `rotate(${tilt}deg)`,
                  }}
                >
                  {/* Image container */}
                  <div className="relative aspect-4/3 w-full bg-[#E5E5E5] overflow-hidden rounded-xs">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Hover Zoom overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-2 rounded-xs bg-white text-[#1a1a1a] shadow-md">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Category tag */}
                    <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-xs bg-black/70 backdrop-blur-xs text-[9px] text-white font-sans uppercase tracking-wider font-semibold">
                      {photo.category}
                    </div>
                  </div>

                  {/* Polaroid caption */}
                  <div className="pt-3 pb-1 flex flex-col justify-between">
                    <h3 className="font-sans font-bold text-xs text-[#2D2D2D] line-clamp-1 group-hover:text-black transition-colors uppercase tracking-tight">
                      {photo.title}
                    </h3>
                    <p className="font-sans italic text-xs text-[#666666] line-clamp-1 mt-0.5">
                      {photo.caption}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-[#888888] font-sans mt-2 pt-1.5 border-t border-black/5">
                      <span>{photo.date}</span>
                      <span>{photo.author}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer Scrapbook Note */}
      <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[11px] text-[#666666] font-sans">
        <div className="flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-[#666666]" />
          <span>Showing <strong>{filteredPhotos.length}</strong> college snapshots</span>
        </div>
        <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#888888] flex items-center gap-1.5">
          <span>Tap to enlarge</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
