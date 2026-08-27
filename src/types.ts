export interface DiaryPhoto {
  id: string;
  title: string;
  caption: string;
  category: 'Campus' | 'Hostel Life' | 'TechFest' | 'Labs & Classrooms' | 'Sports' | 'Canteen & Hangouts';
  date: string;
  imageUrl: string;
  rotation?: number; // degree for organic scrapbook tilt
  author?: string;
}

export interface DiaryVideo {
  id: string;
  title: string;
  duration: string;
  date: string;
  thumbnailUrl: string;
  youtubeId: string; // easily replaceable with any YouTube video ID
  description: string;
  category: string;
}

export interface CampusStory {
  id: string;
  title: string;
  date: string;
  author: string;
  batch?: string;
  preview: string;
  fullStory: string[];
  imageUrl?: string;
  tags: string[];
}

export interface TimelineEvent {
  year: string;
  period?: string;
  title: string;
  description: string;
  tag: 'Milestone' | 'Festival' | 'Academics' | 'Hostel' | 'Sports';
  highlight?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MemoryCardItem {
  id: number;
  name: string;
  iconName: string;
  description: string;
}

export interface WordPuzzleItem {
  scrambled: string;
  answer: string;
  clue: string;
  category: string;
}

export interface LocationGuessItem {
  id: number;
  locationName: string;
  imageUrl: string;
  clues: string[];
  options: string[];
  funFact: string;
}
