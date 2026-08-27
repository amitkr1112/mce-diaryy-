import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  HelpCircle, 
  Layers, 
  Type, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy, 
  Sparkles, 
  Eye, 
  Award,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MCE_QUIZ_QUESTIONS, WORD_PUZZLES, LOCATION_GUESSES } from '../../data/diaryData';
import { playSuccessChime } from '../../utils/soundEffects';

type GameTab = 'quiz' | 'memory' | 'word' | 'location';

// Memory cards definitions
interface MemoryCard {
  id: number;
  symbol: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MEMORY_CARD_PAIRS = [
  { symbol: '🏛️', label: 'Main Block' },
  { symbol: '⚙️', label: 'Workshop' },
  { symbol: '🤖', label: 'TechFest' },
  { symbol: '☕', label: 'Canteen' },
  { symbol: '📚', label: 'Library' },
  { symbol: '🏏', label: 'Ground' },
];

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<GameTab>('quiz');

  // --- 1. MCE QUIZ STATE ---
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleQuizAnswer = (idx: number) => {
    if (selectedOption !== null) return; // already answered
    setSelectedOption(idx);
    const isCorrect = idx === MCE_QUIZ_QUESTIONS[currentQuizIndex].correctIndex;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      playSuccessChime();
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < MCE_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  const restartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  // --- 2. MEMORY GAME STATE ---
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryCompleted, setMemoryCompleted] = useState(false);

  const initMemoryGame = () => {
    const deck = [...MEMORY_CARD_PAIRS, ...MEMORY_CARD_PAIRS]
      .sort(() => Math.random() - 0.5)
      .map((item, idx) => ({
        id: idx,
        symbol: item.symbol,
        label: item.label,
        isFlipped: false,
        isMatched: false,
      }));
    setMemoryCards(deck);
    setFlippedIndices([]);
    setMemoryMoves(0);
    setMemoryCompleted(false);
  };

  useEffect(() => {
    if (activeTab === 'memory' && memoryCards.length === 0) {
      initMemoryGame();
    }
  }, [activeTab]);

  const handleFlipCard = (index: number) => {
    if (flippedIndices.length === 2) return;
    if (memoryCards[index].isFlipped || memoryCards[index].isMatched) return;

    const newCards = [...memoryCards];
    newCards[index].isFlipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves(prev => prev + 1);
      const [firstIdx, secondIdx] = newFlipped;
      if (newCards[firstIdx].label === newCards[secondIdx].label) {
        // Match found!
        newCards[firstIdx].isMatched = true;
        newCards[secondIdx].isMatched = true;
        setMemoryCards(newCards);
        setFlippedIndices([]);
        playSuccessChime();

        // Check if all matched
        if (newCards.every(c => c.isMatched)) {
          setMemoryCompleted(true);
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        }
      } else {
        // Not a match, flip back after 800ms
        setTimeout(() => {
          setMemoryCards(prevCards => {
            const resetCards = [...prevCards];
            resetCards[firstIdx].isFlipped = false;
            resetCards[secondIdx].isFlipped = false;
            return resetCards;
          });
          setFlippedIndices([]);
        }, 800);
      }
    }
  };

  // --- 3. WORD PUZZLE STATE ---
  const [wordPuzzleIndex, setWordPuzzleIndex] = useState(0);
  const [userWordGuess, setUserWordGuess] = useState('');
  const [wordFeedback, setWordFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [solvedWordCount, setSolvedWordCount] = useState(0);

  const handleWordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userWordGuess.trim()) return;

    const currentPuzzle = WORD_PUZZLES[wordPuzzleIndex];
    const isCorrect = userWordGuess.trim().toUpperCase() === currentPuzzle.answer.toUpperCase();

    if (isCorrect) {
      setWordFeedback('correct');
      setSolvedWordCount(prev => prev + 1);
      playSuccessChime();
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    } else {
      setWordFeedback('wrong');
    }
  };

  const handleNextWordPuzzle = () => {
    if (wordPuzzleIndex < WORD_PUZZLES.length - 1) {
      setWordPuzzleIndex(prev => prev + 1);
      setUserWordGuess('');
      setWordFeedback(null);
      setShowHint(false);
    } else {
      setWordPuzzleIndex(0);
      setUserWordGuess('');
      setWordFeedback(null);
      setShowHint(false);
    }
  };

  // --- 4. GUESS THE LOCATION STATE ---
  const [locIndex, setLocIndex] = useState(0);
  const [selectedLocOption, setSelectedLocOption] = useState<string | null>(null);
  const [locScore, setLocScore] = useState(0);
  const [cluesRevealed, setCluesRevealed] = useState(1);
  const [locFinished, setLocFinished] = useState(false);

  const currentLoc = LOCATION_GUESSES[locIndex];

  const handleGuessLocation = (opt: string) => {
    if (selectedLocOption !== null) return;
    setSelectedLocOption(opt);
    if (opt === currentLoc.options[0]) {
      setLocScore(prev => prev + 1);
      playSuccessChime();
    }
  };

  const handleNextLocation = () => {
    if (locIndex < LOCATION_GUESSES.length - 1) {
      setLocIndex(prev => prev + 1);
      setSelectedLocOption(null);
      setCluesRevealed(1);
    } else {
      setLocFinished(true);
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
    }
  };

  const restartLocationGame = () => {
    setLocIndex(0);
    setSelectedLocOption(null);
    setLocScore(0);
    setCluesRevealed(1);
    setLocFinished(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-7 md:p-9 text-[#2c2b29] select-text overflow-hidden">
      {/* Top Header in Geometric Balance */}
      <div className="border-b border-black/10 pb-2.5 mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#888888] uppercase tracking-[0.2em] font-sans font-bold">Chapter 04</span>
            <span className="text-black/20">•</span>
            <span className="text-[10px] text-[#888888] uppercase tracking-[0.2em] font-sans font-bold">Interactive Recreation</span>
          </div>
          <h2 className="text-xl sm:text-2xl text-[#2D2D2D] font-bold tracking-tight uppercase font-sans mt-0.5">
            Campus Playground
          </h2>
        </div>

        <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xs border border-black/5">
          <Gamepad2 className="w-3.5 h-3.5 text-[#555555]" />
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#666666]">4 Mini-Games</span>
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-3 py-2 rounded-xs text-[11px] font-sans font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'quiz'
              ? 'bg-[#1a1a1a] text-[#FAF9F6]'
              : 'bg-white/80 text-[#555555] hover:bg-white border border-black/5'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>MCE Quiz</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('memory');
            if (memoryCards.length === 0) initMemoryGame();
          }}
          className={`px-3 py-2 rounded-xs text-[11px] font-sans font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'memory'
              ? 'bg-[#1a1a1a] text-[#FAF9F6]'
              : 'bg-white/80 text-[#555555] hover:bg-white border border-black/5'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Memory Match</span>
        </button>

        <button
          onClick={() => setActiveTab('word')}
          className={`px-3 py-2 rounded-xs text-[11px] font-sans font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'word'
              ? 'bg-[#1a1a1a] text-[#FAF9F6]'
              : 'bg-white/80 text-[#555555] hover:bg-white border border-black/5'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>Word Puzzle</span>
        </button>

        <button
          onClick={() => setActiveTab('location')}
          className={`px-3 py-2 rounded-xs text-[11px] font-sans font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'location'
              ? 'bg-[#1a1a1a] text-[#FAF9F6]'
              : 'bg-white/80 text-[#555555] hover:bg-white border border-black/5'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Guess Location</span>
        </button>
      </div>

      {/* Main Game Arena Container */}
      <div className="flex-1 overflow-y-auto diary-scrollbar bg-[#ffffff] rounded-xs border border-black/5 p-4 sm:p-5 shadow-xs">
        <AnimatePresence mode="wait">
          {/* TAB 1: MCE QUIZ */}
          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="h-full flex flex-col justify-between"
            >
              {!quizFinished ? (
                <div>
                  <div className="flex items-center justify-between text-[10px] text-[#888888] font-sans uppercase tracking-wider mb-3 border-b border-black/5 pb-2">
                    <span className="font-bold text-[#2D2D2D]">
                      Question {currentQuizIndex + 1} of {MCE_QUIZ_QUESTIONS.length}
                    </span>
                    <span>Score: <strong>{quizScore}</strong> pts</span>
                  </div>

                  <h3 className="font-sans font-bold text-sm sm:text-base text-[#2D2D2D] uppercase tracking-tight mb-4">
                    {MCE_QUIZ_QUESTIONS[currentQuizIndex].question}
                  </h3>

                  <div className="space-y-2">
                    {MCE_QUIZ_QUESTIONS[currentQuizIndex].options.map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === MCE_QUIZ_QUESTIONS[currentQuizIndex].correctIndex;
                      let btnStyle = 'bg-[#FAF9F6] border-black/10 text-[#2D2D2D] hover:bg-white';

                      if (selectedOption !== null) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-red-50 border-red-400 text-red-700';
                        } else {
                          btnStyle = 'opacity-50 bg-[#FAF9F6] border-black/5 text-[#888888]';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={selectedOption !== null}
                          onClick={() => handleQuizAnswer(idx)}
                          className={`w-full p-3 rounded-xs border text-left text-xs sm:text-sm font-sans transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <span>{option}</span>
                          {selectedOption !== null && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {selectedOption !== null && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedOption !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 rounded-xs bg-[#FAF9F6] border border-black/10 text-xs text-[#555555] font-sans flex flex-col gap-2"
                    >
                      <p>💡 {MCE_QUIZ_QUESTIONS[currentQuizIndex].explanation}</p>
                      <button
                        onClick={handleNextQuiz}
                        className="self-end px-4 py-1.5 rounded-xs bg-[#1a1a1a] text-white text-xs font-sans font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1"
                      >
                        <span>{currentQuizIndex < MCE_QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 rounded-xs bg-[#FAF9F6] border border-black/10 flex items-center justify-center text-[#2D2D2D]">
                    <Trophy className="w-6 h-6 text-[#2D2D2D]" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-[#2D2D2D] uppercase tracking-tight">Quiz Finished</h3>
                  <p className="text-xs font-sans text-[#666666]">
                    You scored <strong className="text-[#1a1a1a] text-sm">{quizScore}</strong> out of {MCE_QUIZ_QUESTIONS.length}
                  </p>
                  <button
                    onClick={restartQuiz}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xs bg-[#1a1a1a] text-white text-xs font-sans font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Play Again</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: MEMORY MATCH */}
          {activeTab === 'memory' && (
            <motion.div
              key="memory"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="h-full flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[10px] text-[#888888] font-sans uppercase tracking-wider mb-3 border-b border-black/5 pb-2">
                <span>Match Landmark Pairs</span>
                <span>Moves: <strong>{memoryMoves}</strong></span>
              </div>

              {!memoryCompleted ? (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-2.5 my-auto">
                  {memoryCards.map((card, idx) => {
                    const showFace = card.isFlipped || card.isMatched;
                    return (
                      <button
                        key={card.id}
                        onClick={() => handleFlipCard(idx)}
                        disabled={showFace}
                        className={`aspect-square rounded-xs flex flex-col items-center justify-center p-1.5 transition-all transform duration-300 cursor-pointer ${
                          card.isMatched
                            ? 'bg-emerald-50 border-2 border-emerald-400 text-emerald-800'
                            : showFace
                            ? 'bg-[#ffffff] border-2 border-[#1a1a1a] shadow-sm'
                            : 'bg-[#F5F5F5] hover:bg-[#EAEAEA] border border-black/10'
                        }`}
                      >
                        {showFace ? (
                          <>
                            <span className="text-xl sm:text-2xl">{card.symbol}</span>
                            <span className="text-[9px] font-sans font-bold uppercase text-[#2D2D2D] mt-0.5 truncate w-full text-center">
                              {card.label}
                            </span>
                          </>
                        ) : (
                          <div className="w-full h-full rounded-xs border border-dashed border-black/20 flex items-center justify-center">
                            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#888888]">MCE</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4 flex flex-col items-center justify-center space-y-2">
                  <div className="w-12 h-12 rounded-xs bg-[#FAF9F6] border border-black/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-sans font-bold text-base text-[#2D2D2D] uppercase tracking-tight">Pairs Solved</h3>
                  <p className="text-xs font-sans text-[#666666]">
                    Matched all landmarks in <strong>{memoryMoves}</strong> moves
                  </p>
                  <button
                    onClick={initMemoryGame}
                    className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-xs bg-[#1a1a1a] text-white text-xs font-sans font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Shuffle & Replay</span>
                  </button>
                </div>
              )}

              <div className="pt-2 text-right">
                <button
                  onClick={initMemoryGame}
                  className="text-[10px] font-sans uppercase tracking-wider text-[#888888] hover:underline flex items-center gap-1 justify-end ml-auto cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Cards
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 3: WORD PUZZLE */}
          {activeTab === 'word' && (
            <motion.div
              key="word"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="h-full flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[10px] text-[#888888] font-sans uppercase tracking-wider mb-2 border-b border-black/5 pb-2">
                <span>Puzzle {wordPuzzleIndex + 1} of {WORD_PUZZLES.length}</span>
                <span>Solved: <strong>{solvedWordCount}</strong></span>
              </div>

              <div className="text-center py-2 space-y-3">
                <span className="px-2.5 py-0.5 rounded-xs bg-[#F0F0F0] text-[9px] text-[#555555] font-sans uppercase tracking-wider font-bold">
                  {WORD_PUZZLES[wordPuzzleIndex].category}
                </span>

                <div className="font-mono text-2xl sm:text-3xl font-bold tracking-[0.3em] text-[#1a1a1a] bg-[#FAF9F6] p-3 rounded-xs border border-dashed border-black/15">
                  {WORD_PUZZLES[wordPuzzleIndex].scrambled}
                </div>

                <p className="font-serif italic text-xs sm:text-sm text-[#555555] max-w-sm mx-auto">
                  “{WORD_PUZZLES[wordPuzzleIndex].clue}”
                </p>

                {/* Form Input */}
                <form onSubmit={handleWordSubmit} className="max-w-xs mx-auto flex gap-2 pt-1">
                  <input
                    type="text"
                    value={userWordGuess}
                    onChange={(e) => setUserWordGuess(e.target.value)}
                    placeholder="Type un-scrambled word..."
                    className="flex-1 px-3 py-2 rounded-xs border border-black/15 bg-[#FAF9F6] text-xs uppercase tracking-wider font-semibold focus:outline-none focus:ring-1 focus:ring-[#1a1a1a]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xs bg-[#1a1a1a] text-white text-xs font-sans font-bold uppercase tracking-wider cursor-pointer hover:bg-black"
                  >
                    Solve
                  </button>
                </form>

                {/* Feedback */}
                {wordFeedback === 'correct' && (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="p-2.5 rounded-xs bg-emerald-50 border border-emerald-400 text-xs text-emerald-800 font-semibold flex items-center justify-between"
                  >
                    <span>🎉 Correct! The word was {WORD_PUZZLES[wordPuzzleIndex].answer}</span>
                    <button
                      onClick={handleNextWordPuzzle}
                      className="px-2.5 py-1 rounded-xs bg-emerald-700 text-white text-[10px] font-sans uppercase tracking-wider cursor-pointer"
                    >
                      Next Word →
                    </button>
                  </motion.div>
                )}

                {wordFeedback === 'wrong' && (
                  <p className="text-xs text-red-600 font-sans">
                    Not quite right! Try again or check the hint.
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-black/5 flex items-center justify-between text-xs text-[#888888] font-sans">
                <button
                  onClick={() => setShowHint(prev => !prev)}
                  className="text-[10px] uppercase tracking-wider hover:underline text-[#555555] flex items-center gap-1 cursor-pointer font-bold"
                >
                  <Eye className="w-3 h-3" /> {showHint ? 'Hide Hint' : 'Show Letter Hint'}
                </button>
                {showHint && (
                  <span className="font-mono text-[11px] text-[#1a1a1a]">
                    Starts: <strong>{WORD_PUZZLES[wordPuzzleIndex].answer[0]}</strong>, Ends: <strong>{WORD_PUZZLES[wordPuzzleIndex].answer.slice(-1)}</strong>
                  </span>
                )}
                <button
                  onClick={handleNextWordPuzzle}
                  className="text-[10px] uppercase tracking-wider hover:underline text-[#1a1a1a] font-bold cursor-pointer"
                >
                  Skip →
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 4: GUESS THE LOCATION */}
          {activeTab === 'location' && (
            <motion.div
              key="location"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="h-full flex flex-col justify-between"
            >
              {!locFinished ? (
                <div>
                  <div className="flex items-center justify-between text-[10px] text-[#888888] font-sans uppercase tracking-wider mb-2 border-b border-black/5 pb-1.5">
                    <span>Spot {locIndex + 1} of {LOCATION_GUESSES.length}</span>
                    <span>Score: <strong>{locScore}</strong></span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                    {/* Location Image with blur reveal */}
                    <div className="relative aspect-4/3 rounded-xs overflow-hidden bg-[#E5E5E5] border border-black/10">
                      <img
                        src={currentLoc.imageUrl}
                        alt="Mystery Campus Spot"
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          selectedLocOption ? 'filter-none' : 'filter blur-sm contrast-125'
                        }`}
                      />
                      {!selectedLocOption && (
                        <div className="absolute inset-0 bg-black/35 flex items-center justify-center text-white text-[11px] font-sans font-bold uppercase tracking-wider px-2 text-center">
                          🔎 Mystery MCE Spot
                        </div>
                      )}
                    </div>

                    {/* Clues & Options */}
                    <div className="space-y-2">
                      <div className="bg-[#FAF9F6] p-2.5 rounded-xs border border-black/10 text-xs space-y-1">
                        <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-[#2D2D2D] block">Campus Clues:</span>
                        {currentLoc.clues.slice(0, cluesRevealed).map((clue, idx) => (
                          <p key={idx} className="text-[#555555] font-serif italic text-xs">
                            • {clue}
                          </p>
                        ))}

                        {cluesRevealed < currentLoc.clues.length && (
                          <button
                            onClick={() => setCluesRevealed(prev => prev + 1)}
                            className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#1a1a1a] underline cursor-pointer pt-1"
                          >
                            + Reveal clue
                          </button>
                        )}
                      </div>

                      {/* 4 Location Options */}
                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        {currentLoc.options.map((opt, idx) => {
                          const isCorrect = opt === currentLoc.options[0];
                          const isSelected = selectedLocOption === opt;
                          let btnStyle = 'bg-[#FAF9F6] hover:bg-white text-[#2D2D2D] border-black/10';

                          if (selectedLocOption !== null) {
                            if (isCorrect) {
                              btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold';
                            } else if (isSelected) {
                              btnStyle = 'bg-red-50 border-red-400 text-red-700';
                            } else {
                              btnStyle = 'opacity-50 bg-[#FAF9F6] border-black/5 text-[#888888]';
                            }
                          }

                          return (
                            <button
                              key={idx}
                              disabled={selectedLocOption !== null}
                              onClick={() => handleGuessLocation(opt)}
                              className={`p-2 rounded-xs border text-xs font-sans truncate text-left transition-all cursor-pointer ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {selectedLocOption && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-2.5 rounded-xs bg-[#FAF9F6] border border-black/10 text-xs text-[#555555] flex items-center justify-between"
                    >
                      <p className="font-serif italic pr-2 text-xs">
                        ✨ <strong>{currentLoc.locationName}</strong>: {currentLoc.funFact}
                      </p>
                      <button
                        onClick={handleNextLocation}
                        className="shrink-0 px-3 py-1.5 rounded-xs bg-[#1a1a1a] text-white text-xs font-sans font-bold uppercase tracking-wider cursor-pointer"
                      >
                        {locIndex < LOCATION_GUESSES.length - 1 ? 'Next Spot →' : 'Finish →'}
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="text-center py-5 flex flex-col items-center justify-center space-y-2">
                  <div className="w-12 h-12 rounded-xs bg-[#FAF9F6] border border-black/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-[#2D2D2D]" />
                  </div>
                  <h3 className="font-sans font-bold text-base text-[#2D2D2D] uppercase tracking-tight">Spot Hunt Completed</h3>
                  <p className="text-xs font-sans text-[#666666]">
                    Recognized <strong>{locScore}</strong> of {LOCATION_GUESSES.length} spots
                  </p>
                  <button
                    onClick={restartLocationGame}
                    className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-xs bg-[#1a1a1a] text-white text-xs font-sans font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Play Again</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[11px] text-[#666666] font-sans">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#666666]" />
          <span>MCE Recreation Room</span>
        </span>
        <span className="text-[10px] text-[#888888] uppercase tracking-wider">MCE.Diaryy</span>
      </div>
    </div>
  );
}
