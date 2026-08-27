import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CoverPage from './pages/CoverPage';
import DearDiaryPage from './pages/DearDiaryPage';
import PhotoDiaryPage from './pages/PhotoDiaryPage';
import VideoDiaryPage from './pages/VideoDiaryPage';
import CampusStoriesPage from './pages/CampusStoriesPage';
import PlaygroundPage from './pages/PlaygroundPage';
import TimelinePage from './pages/TimelinePage';
import AboutPage from './pages/AboutPage';
import { DiaryPhoto, DiaryVideo, CampusStory } from '../types';

interface DiaryBookProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  onSelectPhoto: (photo: DiaryPhoto) => void;
  onPlayVideo: (video: DiaryVideo) => void;
  onReadStory: (story: CampusStory) => void;
}

export default function DiaryBook({
  currentPage,
  onPageChange,
  onSelectPhoto,
  onPlayVideo,
  onReadStory,
}: DiaryBookProps) {
  // Track page turn direction for realistic left/right page flip
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [prevPage, setPrevPage] = useState(currentPage);

  useEffect(() => {
    if (currentPage > prevPage) {
      setDirection('forward');
    } else if (currentPage < prevPage) {
      setDirection('backward');
    }
    setPrevPage(currentPage);
  }, [currentPage, prevPage]);

  // Touch swipe support for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentPage < 8) {
      onPageChange(currentPage + 1);
    }
    if (isRightSwipe && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Render the active page component
  const renderCurrentPageContent = () => {
    switch (currentPage) {
      case 1:
        return <CoverPage onOpenDiary={() => onPageChange(2)} />;
      case 2:
        return <DearDiaryPage onTurnToPhotos={() => onPageChange(3)} />;
      case 3:
        return <PhotoDiaryPage onSelectPhoto={onSelectPhoto} />;
      case 4:
        return <VideoDiaryPage onPlayVideo={onPlayVideo} />;
      case 5:
        return <CampusStoriesPage onReadStory={onReadStory} />;
      case 6:
        return <PlaygroundPage />;
      case 7:
        return <TimelinePage />;
      case 8:
        return <AboutPage onCloseDiary={() => onPageChange(1)} />;
      default:
        return <CoverPage onOpenDiary={() => onPageChange(2)} />;
    }
  };

  const isCover = currentPage === 1;

  // Animation variants for page turn
  const pageVariants = {
    initial: (dir: string) => ({
      opacity: 0,
      rotateY: dir === 'forward' ? 18 : -18,
      scale: 0.98,
      x: dir === 'forward' ? 20 : -20,
    }),
    animate: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.42,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: (dir: string) => ({
      opacity: 0,
      rotateY: dir === 'forward' ? -18 : 18,
      scale: 0.98,
      x: dir === 'forward' ? -20 : 20,
      transition: {
        duration: 0.3,
        ease: [0.25, 1, 0.5, 1],
      },
    }),
  };

  return (
    <div 
      className="w-full max-w-5xl mx-auto flex items-center justify-center p-2 sm:p-4 perspective-[1400px]"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Physical Book Container with Geometric Balance */}
      <div 
        className={`relative w-full aspect-[4/5] sm:aspect-[16/11] min-h-[580px] max-h-[820px] rounded-sm transition-all duration-700 flex ${
          isCover
            ? 'diary-cover-texture border border-[#333336] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)]'
            : 'bg-[#FAF9F6] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] border border-black/10'
        }`}
      >
        {/* Central Geometric Spine Crease & Shadow (when diary is open on desktop/tablet) */}
        {!isCover && (
          <>
            <div className="absolute left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-20 shadow-[0_0_15px_rgba(0,0,0,0.3)] hidden sm:block pointer-events-none" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-black/10 z-30 hidden sm:block pointer-events-none" />
          </>
        )}

        {/* Subtle Noise Texture on pages */}
        {!isCover && (
          <div 
            className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none z-10"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
            }}
          />
        )}

        {/* Minimal Bookmark Ribbon */}
        {!isCover && (
          <div className="absolute -top-3 left-12 sm:left-20 w-4 h-10 bg-[#333333] rounded-t-xs shadow-md z-30 flex items-end justify-center pb-1">
            <div className="w-1 h-1 rounded-full bg-white/40" />
          </div>
        )}

        {/* The Actual Paper Page / Inside Leaf */}
        <div 
          className={`relative w-full h-full rounded-xs overflow-hidden flex flex-col z-10 ${
            isCover ? 'bg-transparent' : 'paper-texture'
          }`}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full flex flex-col overflow-hidden"
            >
              {renderCurrentPageContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
