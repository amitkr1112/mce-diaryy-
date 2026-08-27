import React from 'react';
import { motion } from 'motion/react';
import { Film, Play, Clock, Youtube, ArrowUpRight } from 'lucide-react';
import { DIARY_VIDEOS } from '../../data/diaryData';
import { DiaryVideo } from '../../types';

interface VideoDiaryPageProps {
  onPlayVideo: (video: DiaryVideo) => void;
}

export default function VideoDiaryPage({ onPlayVideo }: VideoDiaryPageProps) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-5 sm:p-8 md:p-10 text-[#2D2D2D] select-text overflow-hidden">
      {/* Top Header in Geometric Balance */}
      <div className="border-b border-black/10 pb-3 mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#888888] uppercase tracking-[0.2em] font-sans font-bold">Chapter 02</span>
            <span className="text-black/20">•</span>
            <span className="text-[10px] text-[#888888] uppercase tracking-[0.2em] font-sans font-bold">Motion Reels & Vlogs</span>
          </div>
          <h2 className="text-xl sm:text-2xl text-[#2D2D2D] font-bold tracking-tight uppercase font-sans mt-0.5">
            Video Diary
          </h2>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-[#666666] font-sans font-bold uppercase tracking-wider bg-white px-2.5 py-1 rounded-xs border border-black/5">
          <Youtube className="w-3.5 h-3.5 text-[#cc181e]" />
          <span>YouTube Archives</span>
        </div>
      </div>

      {/* Intro Note */}
      <div className="text-xs sm:text-sm text-[#666666] font-serif italic mb-2">
        “Static photos capture the moment; videos capture the heartbeats, cheers, and unscripted memories of our batch.”
      </div>

      {/* Video Cards Grid */}
      <div className="flex-1 overflow-y-auto diary-scrollbar my-1 pr-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 py-2">
          {DIARY_VIDEOS.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              onClick={() => onPlayVideo(video)}
              className="group cursor-pointer rounded-xs bg-[#ffffff] border border-black/5 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-16/9 w-full bg-[#181a1f] overflow-hidden">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:opacity-90"
                />

                {/* Film Reel minimal top markers */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-black/60 flex justify-between px-2 items-center pointer-events-none">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-1 h-0.5 bg-[#ffffff]/60 rounded-xs" />
                  ))}
                </div>

                {/* Centered Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-xs bg-white text-[#1a1a1a] group-hover:scale-105 transition-all shadow-md flex items-center justify-center pl-0.5">
                    <Play className="w-4 h-4 fill-current text-[#1a1a1a]" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-xs bg-black/75 backdrop-blur-xs text-[10px] text-white font-sans font-medium flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{video.duration}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded-xs bg-black/65 backdrop-blur-xs text-[9px] text-white font-sans uppercase tracking-wider font-semibold">
                  {video.category}
                </div>
              </div>

              {/* Video details */}
              <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-[#888888] font-sans uppercase tracking-wider mb-1">
                    <span>{video.date}</span>
                    <span className="font-mono">TAPE #0{idx + 1}</span>
                  </div>
                  <h3 className="font-sans font-bold text-xs sm:text-sm text-[#2D2D2D] group-hover:text-black transition-colors uppercase tracking-tight leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-xs text-[#666666] font-sans mt-1.5 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between text-xs text-[#2D2D2D] font-sans font-medium">
                  <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider font-bold">
                    Watch Reel <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] text-[#888888] font-mono">1080p HD</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[11px] text-[#666666] font-sans">
        <div className="flex items-center gap-1.5">
          <Film className="w-3.5 h-3.5 text-[#666666]" />
          <span><strong>{DIARY_VIDEOS.length}</strong> archived campus videos</span>
        </div>
        <span className="text-[10px] text-[#888888] uppercase tracking-wider">MCE Video Archive</span>
      </div>
    </div>
  );
}
