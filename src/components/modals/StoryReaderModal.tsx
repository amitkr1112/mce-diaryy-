import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, BookOpen, Quote, Tag, Share2 } from 'lucide-react';
import { CampusStory } from '../../types';

interface StoryReaderModalProps {
  story: CampusStory | null;
  onClose: () => void;
}

export default function StoryReaderModal({ story, onClose }: StoryReaderModalProps) {
  if (!story) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-2xl w-full max-h-[90vh] bg-[#FAF7F0] p-6 sm:p-8 rounded-2xl shadow-2xl z-10 border border-[#ded5c5] flex flex-col text-[#2c2b29] paper-texture"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#1c1d22] hover:bg-black text-white flex items-center justify-center shadow-lg cursor-pointer transition-colors z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="border-b border-[#e5dfd2] pb-4 mb-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#807666] font-sans-clean mb-2">
              <span className="flex items-center gap-1 font-semibold text-[#4e483d]">
                <Calendar className="w-3.5 h-3.5" />
                {story.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {story.author} {story.batch && <span>({story.batch})</span>}
              </span>
            </div>

            <h2 className="font-serif-heading font-bold text-2xl sm:text-3xl text-[#1a1b20] leading-tight">
              {story.title}
            </h2>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto diary-scrollbar space-y-4 pr-2">
            {story.imageUrl && (
              <div className="aspect-16/9 rounded-xl overflow-hidden bg-[#ebe4d7] border border-[#ded5c5] shadow-xs">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="font-serif-display text-base sm:text-lg text-[#38342c] leading-relaxed space-y-4 pt-2">
              {story.fullStory.map((paragraph, idx) => (
                <p key={idx} className="first-letter:font-serif-heading first-letter:text-2xl first-letter:font-bold first-letter:text-[#181a1e]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Handwritten note at the bottom */}
            <div className="mt-6 p-4 rounded-xl bg-[#f4eee2] border-l-3 border-[#736c5d]">
              <p className="font-handwriting text-xl text-[#3e392f] leading-snug">
                “Memories recorded with care so future MCEians can cherish the ground we once walked upon.”
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-[#e5dfd2] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {story.tags.map(t => (
                <span key={t} className="px-2 py-0.5 rounded bg-[#eee7db] text-[11px] text-[#615a4c] font-sans-clean font-medium">
                  #{t}
                </span>
              ))}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#27292f] hover:bg-[#18191e] text-white text-xs font-sans-clean font-medium cursor-pointer transition-colors"
            >
              Close Journal
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
