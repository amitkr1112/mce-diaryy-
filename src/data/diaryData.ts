import { DiaryPhoto, DiaryVideo, CampusStory, TimelineEvent, QuizQuestion, WordPuzzleItem, LocationGuessItem } from '../types';

/**
 * ============================================================================
 * MCE.Diaryy Data Repository
 * ----------------------------------------------------------------------------
 * Easy customization note:
 * To replace placeholders with your own MCE college photographs, YouTube URLs,
 * stories or timeline milestones, simply modify the entries below!
 * ============================================================================
 */

export const DIARY_METADATA = {
  collegeName: 'Motihari College of Engineering',
  location: 'Motihari, East Champaran, Bihar',
  established: 1980,
  tagline: 'A diary of campus life & memories',
  instagramHandle: '@mce.diaryy',
  instagramUrl: 'https://instagram.com/mce.diaryy', // Replace with your active Instagram page
};

export const DIARY_PHOTOS: DiaryPhoto[] = [
  {
    id: 'p1',
    title: 'The Iconic Main Academic Block',
    caption: 'Where every morning lecture begins and engineering dreams take shape.',
    category: 'Campus',
    date: 'Autumn Session',
    imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1000&q=80',
    rotation: -2,
    author: 'Campus Chronicle',
  },
  {
    id: 'p2',
    title: 'Late Night Hostel Chitchats',
    caption: 'Maggi, chai, exam night revisions, and lifelong brotherhood.',
    category: 'Hostel Life',
    date: 'Hostel Block A',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80',
    rotation: 3,
    author: 'Final Year Batch',
  },
  {
    id: 'p3',
    title: 'Annual TechFest & Robotics Arena',
    caption: 'Bots clashing, code compiling, and adrenaline rushing on the stage.',
    category: 'TechFest',
    date: 'TechFest Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80',
    rotation: -1,
    author: 'Tech Club MCE',
  },
  {
    id: 'p4',
    title: 'Mechanical Workshop & Foundry',
    caption: 'Smell of lathe cutting oil and sparks flying during manufacturing lab.',
    category: 'Labs & Classrooms',
    date: 'Workshop Wing',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    rotation: 2,
    author: 'ME Dept',
  },
  {
    id: 'p5',
    title: 'The Serene Central Library',
    caption: 'Silent wooden aisles, stacks of IEEE journals, and end-semester hustle.',
    category: 'Campus',
    date: 'Library 2nd Floor',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80',
    rotation: -3,
    author: 'MCE Library Club',
  },
  {
    id: 'p6',
    title: 'Annual Cricket & Sports Championship',
    caption: 'The thunderous roar of the crowd on the MCE ground during finals.',
    category: 'Sports',
    date: 'Sports Meet',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1000&q=80',
    rotation: 1.5,
    author: 'Sports Committee',
  },
  {
    id: 'p7',
    title: 'College Canteen Tapri & Samosas',
    caption: 'The birthplace of startup ideas, batch gossip, and unending laughter.',
    category: 'Canteen & Hangouts',
    date: 'Evening Chai',
    imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80',
    rotation: -2,
    author: 'Chai Enthusiasts',
  },
  {
    id: 'p8',
    title: 'Cultural Night & Flash Mob',
    caption: 'Lights, beats, acoustic guitars, and dance under the starlit sky.',
    category: 'TechFest',
    date: 'Annual Fest',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    rotation: 2.5,
    author: 'Cultural Wing',
  },
  {
    id: 'p9',
    title: 'The Convocation & Farewell Caps',
    caption: 'Tears of joy, black gowns, and stepping into the real world with MCE pride.',
    category: 'Campus',
    date: 'Convocation Day',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80',
    rotation: -1.5,
    author: 'Alumni Cell',
  },
];

export const DIARY_VIDEOS: DiaryVideo[] = [
  {
    id: 'v1',
    title: 'MCE Campus Tour & Cinematic Walkthrough',
    duration: '04:12',
    date: '2024',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80',
    youtubeId: 'dQw4w9WgXcQ', // Replace with your YouTube Video ID (e.g. from youtube.com/watch?v=YOUR_ID)
    description: 'A nostalgic drone and ground tour gliding through the academic blocks, lush green lawns, hostels, and lab corridors.',
    category: 'Campus Tour',
  },
  {
    id: 'v2',
    title: 'TechFest Highlights & Battle of Bots',
    duration: '03:45',
    date: '2023',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
    youtubeId: 'L_LUpnjgPso', // Replace with your YouTube Video ID
    description: 'The electrifying moments, hackathon sprints, guest speeches, and robotics arena clashes from the annual college festival.',
    category: 'Festival',
  },
  {
    id: 'v3',
    title: 'Hostel Life Diaries: After 2 AM Revisions',
    duration: '02:50',
    date: '2023',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
    youtubeId: '3JZ_D3ELwOQ', // Replace with your YouTube Video ID
    description: 'Candid vlogs capturing group study sessions, birthday celebrations, corridor guitar jams, and hostel banter.',
    category: 'Memories',
  },
  {
    id: 'v4',
    title: 'Farewell Nostalgia & Senior Batch Montage',
    duration: '05:20',
    date: '2024',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
    youtubeId: 'kJQP7kiw5Fk', // Replace with your YouTube Video ID
    description: 'A poignant compilation of heartfelt speeches, hug-filled goodbyes, and timeless memories created in 4 transformative years.',
    category: 'Farewell',
  },
];

export const CAMPUS_STORIES: CampusStory[] = [
  {
    id: 's1',
    title: 'The Night Before Engineering Mechanics Exam',
    date: 'December 14, 2023',
    author: 'Aman Kumar',
    batch: 'ECE Batch (2021-25)',
    preview: 'It was 2:30 AM in Hostel 2. Five of us were crowded around Rahul’s single study desk with two whiteboards...',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    fullStory: [
      'It was 2:30 AM in Hostel 2. Five of us were crowded around Rahul’s single study desk with two makeshift whiteboards.',
      'None of us had understood Mohr’s circle in class. But Rahul, with his cup of instant dark coffee and unmatched patience, started from the first principle. By 4:00 AM, the entire corridor had joined in.',
      'We walked into the exam hall with bleary eyes, greeted by the cool Champaran morning mist. When question 3 turned out to be the exact bending moment calculation we solved at 3:45 AM, we exchanged glances across the hall. That unsaid bond is what MCE gave us.',
    ],
    tags: ['Hostel', 'Exam Nights', 'Camaraderie'],
  },
  {
    id: 's2',
    title: 'The First Rain on MCE Main Ground',
    date: 'July 18, 2022',
    author: 'Priya Sharma',
    batch: 'CSE Batch (2020-24)',
    preview: 'The smell of petrichor rising from the Motihari soil when the first monsoon shower hit the campus green lawn...',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    fullStory: [
      'The smell of petrichor rising from the Motihari soil when the first monsoon shower hit the campus green lawn is unforgettable.',
      'Lectures were over. Instead of rushing to our rooms, half the college stood on the verandah, watching the drizzle soak the Gulmohar trees. Someone brought an acoustic guitar from Room 104.',
      'For two hours, no one spoke about internships, placements, or backlogs. We simply sang old melodies while sipping hot elaichi tea from the gate tapri. Time stood still.',
    ],
    tags: ['Campus Life', 'Monsoon', 'Nostalgia'],
  },
  {
    id: 's3',
    title: 'Building Our First Line-Follower Robot',
    date: 'March 05, 2023',
    author: 'Vikash & Team Spark',
    batch: 'ME & EE Joint Project',
    preview: 'Three blown capacitors, two burnt Arduino boards, and 48 continuous hours without sleep in the electrical lab...',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    fullStory: [
      'Three blown capacitors, two burnt Arduino boards, and 48 continuous hours without sleep in the electrical lab.',
      'When our bot finally tracked the black track curve at the inter-college TechFest without tumbling over, the whole auditorium erupted. Our professor patted our shoulders with a proud smile.',
      'MCE taught us that failure is just raw telemetry data leading to the eventual triumph.',
    ],
    tags: ['Robotics', 'TechFest', 'Innovation'],
  },
  {
    id: 's4',
    title: 'The Canteen Adda: Where Startups & Songs Were Born',
    date: 'February 10, 2024',
    author: 'Rohan Verma',
    batch: 'Civil Batch (2019-23)',
    preview: 'Two chairs, one creaky wooden table, and endless rounds of samosas with green chutney...',
    imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    fullStory: [
      'Two chairs, one creaky wooden table, and endless rounds of samosas with spicy green chutney.',
      'If those canteen walls could talk, they would tell stories of hackathon ideas sketched on tissue napkins, cricket arguments settled over ludo, and promises made to meet at every silver jubilee.',
      'Leaving MCE wasn’t hard because of the degree; it was hard because we were leaving the sanctuary of that canteen corner.',
    ],
    tags: ['Canteen', 'Friendships', 'Memories'],
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '1980',
    period: 'Foundation',
    title: 'Establishment of MCE Motihari',
    description: 'Motihari College of Engineering was established by the Government of Bihar, laying the cornerstone of technical excellence in Champaran.',
    tag: 'Milestone',
    highlight: true,
  },
  {
    year: '2008',
    period: 'Revival & Expansion',
    title: 'Academic Rejuvenation & Infrastructure Upgrade',
    description: 'State government reinforced cutting-edge labs, upgraded faculty corps, and initiated modern B.Tech branches in CSE, ECE, ME, and Civil.',
    tag: 'Academics',
  },
  {
    year: '2016',
    period: 'Technological Leap',
    title: 'Inauguration of Advanced Computing & Robotics Labs',
    description: 'High-speed fiber connectivity, AI & IoT workstations, and modern workshop machinery established for student innovation.',
    tag: 'Milestone',
  },
  {
    year: '2019',
    period: 'Campus Fest',
    title: 'Grand Launch of Annual Cultural & TechFest',
    description: 'Over 2,000 students from across Eastern India gathered for competitive coding, Robo-wars, rock bands, and hackathons.',
    tag: 'Festival',
    highlight: true,
  },
  {
    year: '2021',
    period: 'Green Initiative',
    title: 'Eco-Campus & Solar Grid Installation',
    description: 'MCE campus transformed with sustainable solar energy installations, lush tree-planting drives, and clean-energy labs.',
    tag: 'Milestone',
  },
  {
    year: '2023',
    period: 'Alumni & Research',
    title: 'National Research Grants & Alumni Mentorship Cell',
    description: 'Multiple student projects received state patents and alumni mentorship network spanned across global tech giants.',
    tag: 'Academics',
  },
  {
    year: 'Present',
    period: 'The Living Legacy',
    title: 'MCE.Diaryy Digital Preservation',
    description: 'Preserving every laugh, lecture, match, and milestone of Motihari College of Engineering for generations of engineers to come.',
    tag: 'Milestone',
    highlight: true,
  },
];

export const MCE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'In which historic and culturally vibrant city is Motihari College of Engineering located?',
    options: ['Patna', 'Motihari (East Champaran)', 'Muzaffarpur', 'Darbhanga'],
    correctIndex: 1,
    explanation: 'MCE is situated in Motihari, the historic headquarters of East Champaran district, renowned for Mahatma Gandhi’s Champaran Satyagraha.',
  },
  {
    id: 2,
    question: 'What is the primary motto and spirit celebrated in MCE.Diaryy?',
    options: [
      'Purely theoretical physics',
      'Preserving campus memories, friendships, and engineering journeys',
      'Corporate corporate marketing only',
      'Online attendance tracking'
    ],
    correctIndex: 1,
    explanation: 'MCE.Diaryy is crafted as a living diary to preserve photographs, video moments, stories, and the timeless engineering camaraderie.',
  },
  {
    id: 3,
    question: 'Which of the following is famously known as the late-night fuel during exam preparation in MCE hostels?',
    options: ['Midnight Maggi & Chai', 'Green Smoothie', 'Protein Shakes', 'Gourmet Truffles'],
    correctIndex: 0,
    explanation: 'Nothing fuels group revision and all-nighters at MCE hostels quite like steaming hot Maggi and roadside tapri chai!',
  },
  {
    id: 4,
    question: 'What discipline brings students together for Robo-Wars and Hackathons during college fests?',
    options: ['Literature Quiz', 'TechFest & Robotics Wing', 'Gardening Club', 'Chess Match only'],
    correctIndex: 1,
    explanation: 'The annual TechFest unites mechanical, electrical, and computer engineering students to test their automated bots and algorithms.',
  },
];

export const WORD_PUZZLES: WordPuzzleItem[] = [
  {
    scrambled: 'TOIHMRIA',
    answer: 'MOTIHARI',
    clue: 'The sacred land of Champaran where our engineering campus resides.',
    category: 'Location',
  },
  {
    scrambled: 'ENIRNGNEIEG',
    answer: 'ENGINEERING',
    clue: 'The 4-year craft of building solutions, debugging code, and shaping the future.',
    category: 'Academics',
  },
  {
    scrambled: 'ROLPDAOI',
    answer: 'POLAROID',
    clue: 'The vintage photo aesthetic taped inside our digital memory book.',
    category: 'Diary Theme',
  },
  {
    scrambled: 'STEHOLLIFE',
    answer: 'HOSTEL LIFE',
    clue: 'Where roommates become family through midnight laughs and endless memories.',
    category: 'Campus Life',
  },
];

export const LOCATION_GUESSES: LocationGuessItem[] = [
  {
    id: 1,
    locationName: 'The Main Academic Administrative Block',
    imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1000&q=80',
    clues: [
      'The monumental front facade seen by every freshman on their first day.',
      'Hosts the Principal’s office, Dean’s desk, and primary seminar halls.',
      'Features the iconic porch and landscaped front lawns.',
    ],
    options: ['Main Academic Block', 'Hostel Mess Hall', 'Sports Pavilion', 'Power Substation'],
    funFact: 'Every graduation batch gathers on these front steps for the official convocation photograph.',
  },
  {
    id: 2,
    locationName: 'The Central Engineering Workshop',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    clues: [
      'Echoes with the sound of metal hammers, lathe machines, and carpentry saws.',
      'Where first-year students master filing, welding, and fitting.',
      'Aprons are mandatory before stepping through its double doors.',
    ],
    options: ['Central Workshop', 'Computer Centre', 'Language Lab', 'Auditorium'],
    funFact: 'The manual steel cube filing project is every engineering student’s rite of passage!',
  },
  {
    id: 3,
    locationName: 'The College Canteen Corner (Adda)',
    imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80',
    clues: [
      'The scent of fresh samosas, kachoris, and hot milk tea fills the air.',
      'The undisputed capital of college gossip, fest planning, and birthday treats.',
      'Packed right after third period and late evening.',
    ],
    options: ['College Canteen', 'Chemistry Lab', 'Exam Control Room', 'Library Archive'],
    funFact: 'More startup ideas and cultural fest names were born here than in formal conference rooms.',
  },
];
