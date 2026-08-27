import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, Calendar, User, Tag, Download, Share2 } from 'lucide-react';
import { DiaryPhoto } from '../../types';

interface LightboxModalProps {
  photo: DiaryPhoto | null;
  onClose: () => void;
}

export default function LightboxModal({ photo, onClose }: LightboxModalProps) {
  if (!photo) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
        {/* Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 cursor-pointer"
        />

        {/* Polaroid Scrapbook Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: photo.rotation ? photo.rotation / 2 : 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-2xl w-full bg-[#ffffff] p-4 sm:p-6 rounded-xl shadow-2xl z-10 border border-[#e5dfd2] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#1c1d22] hover:bg-[#000000] text-white flex items-center justify-center shadow-lg cursor-pointer transition-colors z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Photo frame */}
          <div className="relative aspect-4/3 sm:aspect-16/10 w-full bg-[#ebe5d9] rounded-lg overflow-hidden border border-[#ded5c5]">
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-xs text-xs font-sans-clean font-medium text-white">
              {photo.category}
            </div>
          </div>

          {/* Polaroid handwritten & typed details */}
          <div className="pt-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#807666] font-sans-clean mb-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {photo.date}
                </span>
                {photo.author && (
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {photo.author}
                  </span>
                )}
              </div>

              <h3 className="font-serif-heading font-bold text-xl sm:text-2xl text-[#1a1b20]">
                {photo.title}
              </h3>

              <p className="font-handwriting text-lg sm:text-xl text-[#4a4437] mt-1">
                “{photo.caption}”
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#f0ece2] flex items-center justify-between text-xs text-[#736c5f] font-sans-clean">
              <span>Motihari College of Engineering Photo Archive</span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-[#27292f] hover:bg-[#18191d] text-white font-medium cursor-pointer transition-colors"
              >
                Back to Scrapbook
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
