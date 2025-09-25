export interface Question {
  id: string;
  question: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  answer: string;
  keyPoints: string[];
  codeExample?: string;
  followUpQuestions?: string[];
  tags?: string[];
}

export interface QuestionSection {
  id: string;
  title: string;
  questions: Question[];
  description?: string;
  icon?: string;
}

export interface StudyProgress {
  questionId: string;
  completed: boolean;
  confidenceLevel: number;
  lastReviewedAt: string;
  reviewCount: number;
  nextReviewAt?: string;
}

export interface UserStats {
  totalStudyTime: number; // in minutes
  questionsCompleted: number;
  currentStreak: number; // days
  totalSessions: number;
  lastStudyDate: string | null;
  averageSessionTime?: number;
  weakAreas?: string[];
  strongAreas?: string[];
}

export interface FlashcardData {
  question: Question;
  isFlipped: boolean;
  confidenceLevel?: number;
}

export interface PracticeSession {
  id: string;
  startTime: string;
  endTime?: string;
  questionsAnswered: number;
  averageConfidence: number;
  timeSpent: number;
  sectionsStudied: string[];
}

export interface StudyGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number; // 0-100
  isCompleted: boolean;
}

export interface TopQuestion extends Question {
  importance: 'High' | 'Medium' | 'Low';
  frequency: number; // How often this appears in interviews
  companies?: string[]; // Companies known to ask this
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  requirements: string[];
  solution: string;
  explanation: string;
  timeLimit?: number; // in minutes
  tags: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  studyReminders: boolean;
  emailNotifications: boolean;
  preferredDifficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Mixed';
  dailyGoal: number; // questions per day
  focusAreas: string[];
}

export interface AnalyticsData {
  weeklyProgress: {
    week: string;
    questionsCompleted: number;
    timeSpent: number;
  }[];
  categoryBreakdown: {
    category: string;
    completed: number;
    total: number;
    accuracy: number;
  }[];
  difficultyProgress: {
    difficulty: string;
    completed: number;
    total: number;
  }[];
  streakData: {
    date: string;
    studied: boolean;
  }[];
}

export interface SpacedRepetitionData {
  questionId: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: string;
  lastReview: string;
}

// Supabase Database Types
export interface ProfileData {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  preferences: UserPreferences;
  created_at: string;
  updated_at: string;
}

export interface FlashcardProgress {
  id: string;
  user_id: string;
  question_id: string;
  confidence_level: number;
  review_count: number;
  last_reviewed_at: string;
  next_review_at?: string;
  spaced_repetition_data?: SpacedRepetitionData;
}

export interface StudySession {
  id: string;
  user_id: string;
  session_start: string;
  session_end?: string;
  questions_answered: number;
  time_spent: number; // in minutes
  avg_confidence: number;
  sections_studied: string[];
  session_type: 'flashcards' | 'practice' | 'quiz' | 'review';
}

// Component Props Types
export interface QuestionCardProps {
  question: Question;
  number: number;
  isCompleted: boolean;
  isBookmarked: boolean;
  onToggleComplete: (questionId: string) => void;
  onToggleBookmark: (questionId: string) => void;
  onOpenModal?: (questionId: string) => void;
  showActions?: boolean;
}

export interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onDifficultyFilter: (difficulty: string) => void;
  onCategoryFilter: (category: string) => void;
  categories: string[];
  currentDifficulty?: string;
  currentCategory?: string;
}

export interface ProgressStatsProps {
  completed: number;
  total: number;
  bookmarked: number;
  streakDays: number;
  studyTime: number;
}

export interface NavigationSidebarProps {
  sections: QuestionSection[];
  currentSection: string;
  onSectionChange: (sectionId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Hook Return Types
export interface UseProgressReturn {
  progress: StudyProgress[] | null;
  updateProgress: (questionId: string, completed: boolean, confidence?: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  removeValue: () => void;
}

export interface UseTimerReturn {
  time: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  formatTime: (seconds: number) => string;
}