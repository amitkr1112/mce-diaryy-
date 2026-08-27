import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { CAMPUS_STORIES } from '../../data/diaryData';
import { CampusStory } from '../../types';

interface CampusStoriesPageProps {
  onReadStory: (story: CampusStory) => void;
}

export default function CampusStoriesPage({ onReadStory }: CampusStoriesPageProps) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-5 sm:p-8 md:p-10 text-[#2D2D2D] select-text overflow-hidden">
      {/* Top Header in Geometric Balance */}
      <div className="border-b border-black/10 pb-3 mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#888888] uppercase tracking-[0.2em] font-sans font-bold">Chapter 03</span>
            <span className="text-black/20">•</span>
            <span className="text-[10px] text-[#888888] uppercase tracking-[0.2em] font-sans font-bold">Memoirs & Chronicles</span>
          </div>
          <h2 className="text-xl sm:text-2xl text-[#2D2D2D] font-bold tracking-tight uppercase font-sans mt-0.5">
            Campus Stories
          </h2>
        </div>

        <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#666666] bg-white px-2.5 py-1 rounded-xs border border-black/5">
          Memoirs & Lore
        </div>
      </div>

      {/* Stories Scrollable Area */}
      <div className="flex-1 overflow-y-auto diary-scrollbar my-1 pr-1 space-y-4">
        {CAMPUS_STORIES.map((story, index) => (
          <motion.article
            key={story.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.07 }}
            onClick={() => onReadStory(story)}
            className="group cursor-pointer p-4 sm:p-5 rounded-xs bg-[#ffffff] border border-black/5 hover:border-black/20 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 items-start relative"
          >
            {/* Optional Thumbnail */}
            {story.imageUrl && (
              <div className="w-full sm:w-36 sm:h-28 aspect-16/9 sm:aspect-auto rounded-xs bg-[#E5E5E5] overflow-hidden shrink-0 border border-black/5 shadow-xs">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* Story Text Excerpt */}
            <div className="flex-1 flex flex-col justify-between w-full">
              <div>
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#888888] font-sans uppercase tracking-wider mb-1">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3 h-3 text-[#666666]" />
                    {story.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-[#666666]" />
                    {story.author} {story.batch && <span className="text-[#888888]">({story.batch})</span>}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-sans font-bold text-sm sm:text-base text-[#2D2D2D] group-hover:text-black transition-colors uppercase tracking-tight leading-snug">
                  {story.title}
                </h3>

                {/* Excerpt */}
                <p className="font-serif italic text-xs sm:text-sm text-[#4A4A4A] mt-1.5 line-clamp-2 leading-relaxed">
                  “{story.preview}”
                </p>
              </div>

              {/* Tags & Read button */}
              <div className="mt-3 pt-2.5 border-t border-black/5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3 h-3 text-[#888888]" />
                  {story.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-xs bg-[#F0F0F0] text-[9px] text-[#555555] font-sans uppercase tracking-wider font-semibold">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#1a1a1a] group-hover:translate-x-0.5 transition-transform font-sans">
                  <span>Read Memoir</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[11px] text-[#666666] font-sans">
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-[#666666]" />
          <span><strong>{CAMPUS_STORIES.length}</strong> recorded memoirs in the diary</span>
        </div>
        <span className="text-[10px] text-[#888888] uppercase tracking-wider">The MCE Chronicles</span>
      </div>
    </div>
  );
}
