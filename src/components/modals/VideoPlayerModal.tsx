import { motion, AnimatePresence } from 'motion/react';
import { X, Youtube, Clock, Calendar, Film } from 'lucide-react';
import { DiaryVideo } from '../../types';

interface VideoPlayerModalProps {
  video: DiaryVideo | null;
  onClose: () => void;
}

export default function VideoPlayerModal({ video, onClose }: VideoPlayerModalProps) {
  if (!video) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-3xl w-full bg-[#181a1f] p-4 sm:p-6 rounded-2xl shadow-2xl z-10 border border-[#333842] flex flex-col text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#2c303a] hover:bg-[#3f4553] text-white flex items-center justify-center shadow-lg cursor-pointer transition-colors z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Embedded Video Iframe */}
          <div className="relative aspect-16/9 w-full bg-black rounded-xl overflow-hidden shadow-inner border border-[#2b2e37]">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Video Information */}
          <div className="pt-4 flex flex-col justify-between">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#9ba3af] font-sans-clean mb-1.5">
              <span className="px-2 py-0.5 rounded bg-[#2a2d36] text-[#cbd5e1] font-medium">
                {video.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {video.duration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {video.date}
              </span>
            </div>

            <h3 className="font-serif-heading font-bold text-lg sm:text-xl text-[#f3f4f6]">
              {video.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#9ca3af] font-sans-clean mt-1 leading-relaxed">
              {video.description}
            </p>

            <div className="mt-4 pt-3 border-t border-[#2a2d36] flex items-center justify-between text-xs text-[#94a3b8]">
              <span className="flex items-center gap-1.5">
                <Youtube className="w-4 h-4 text-[#ef4444]" />
                <span>MCE Video Diary Archives</span>
              </span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-[#2e323d] hover:bg-[#3b404d] text-white font-medium cursor-pointer transition-colors"
              >
                Close Player
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
