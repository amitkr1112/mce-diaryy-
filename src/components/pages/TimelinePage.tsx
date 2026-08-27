import React from 'react';
import { motion } from 'motion/react';
import { Milestone } from 'lucide-react';
import { TIMELINE_EVENTS } from '../../data/diaryData';

export default function TimelinePage() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-5 sm:p-8 md:p-10 text-[#2D2D2D] select-text overflow-hidden">
      {/* Top Header in Geometric Balance */}
      <div className="border-b border-black/10 pb-3 mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#888888] uppercase tracking-[0.2em] font-sans font-bold">Chapter 05</span>
            <span className="text-black/20">•</span>
            <span className="text-[10px] text-[#888888] uppercase tracking-[0.2em] font-sans font-bold">Chronicles of Progress</span>
          </div>
          <h2 className="text-xl sm:text-2xl text-[#2D2D2D] font-bold tracking-tight uppercase font-sans mt-0.5">
            MCE Timeline
          </h2>
        </div>

        <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#666666] bg-white px-2.5 py-1 rounded-xs border border-black/5">
          1980 — Present
        </div>
      </div>

      {/* Timeline Scrollable Area */}
      <div className="flex-1 overflow-y-auto diary-scrollbar my-1 pr-2">
        <div className="relative border-l border-black/15 ml-4 sm:ml-6 my-2 space-y-5 sm:space-y-6">
          {TIMELINE_EVENTS.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="relative pl-6 sm:pl-8 group"
            >
              {/* Timeline Marker Node */}
              <div 
                className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-xs transition-all ${
                  event.highlight
                    ? 'bg-[#1a1a1a] ring-3 ring-black/10'
                    : 'bg-[#888888] group-hover:bg-[#1a1a1a]'
                }`}
              />

              {/* Event Card */}
              <div className={`p-3.5 sm:p-4 rounded-xs border transition-all ${
                event.highlight
                  ? 'bg-[#ffffff] border-black/15 shadow-xs'
                  : 'bg-[#FAF9F6] hover:bg-[#ffffff] border-black/5'
              }`}>
                {/* Year and tag */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-bold text-sm sm:text-base text-[#2D2D2D]">
                      {event.year}
                    </span>
                    {event.period && (
                      <span className="font-serif italic text-xs text-[#666666]">
                        ({event.period})
                      </span>
                    )}
                  </div>

                  <span className="px-2 py-0.5 rounded-xs text-[9px] font-sans font-bold uppercase tracking-wider bg-[#F0F0F0] text-[#555555]">
                    {event.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-sans font-bold text-xs sm:text-sm text-[#2D2D2D] uppercase tracking-tight leading-snug">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs sm:text-[13px] text-[#555555] mt-1.5 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[11px] text-[#666666] font-sans">
        <div className="flex items-center gap-1.5">
          <Milestone className="w-3.5 h-3.5 text-[#666666]" />
          <span>Four decades of engineering heritage in Motihari</span>
        </div>
        <span className="text-[10px] text-[#888888] uppercase tracking-wider">Est. 1980</span>
      </div>
    </div>
  );
}
