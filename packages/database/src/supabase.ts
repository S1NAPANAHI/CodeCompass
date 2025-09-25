import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  global: {
    headers: {
      'X-Client-Info': 'codecompass-platform@2.0.0'
    }
  }
});

// Database Types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          preferences: Record<string, any> | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          preferences?: Record<string, any> | null;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          preferences?: Record<string, any> | null;
          updated_at?: string;
        };
      };
      // CodeCompass Tables
      site_analyses: {
        Row: {
          id: string;
          user_id: string;
          url: string;
          title: string | null;
          analysis_data: Record<string, any>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          url: string;
          title?: string | null;
          analysis_data: Record<string, any>;
        };
        Update: {
          title?: string | null;
          analysis_data?: Record<string, any>;
          updated_at?: string;
        };
      };
      analysis_components: {
        Row: {
          id: string;
          analysis_id: string;
          name: string;
          type: string;
          html: string;
          css: string;
          react_code: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: {
          analysis_id: string;
          name: string;
          type: string;
          html: string;
          css: string;
          react_code?: string | null;
          description?: string | null;
        };
        Update: {
          name?: string;
          type?: string;
          html?: string;
          css?: string;
          react_code?: string | null;
          description?: string | null;
        };
      };
      user_projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          github_url: string | null;
          analysis_ids: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          name: string;
          description?: string | null;
          github_url?: string | null;
          analysis_ids?: string[];
        };
        Update: {
          name?: string;
          description?: string | null;
          github_url?: string | null;
          analysis_ids?: string[];
          updated_at?: string;
        };
      };
      // Interview Prep Tables
      flashcards: {
        Row: {
          id: string;
          category: string;
          question: string;
          answer: string;
          difficulty: string;
          code_example: string | null;
          key_points: string[];
          tags: string[];
          created_at: string;
        };
        Insert: {
          category: string;
          question: string;
          answer: string;
          difficulty: string;
          code_example?: string | null;
          key_points?: string[];
          tags?: string[];
        };
        Update: {
          category?: string;
          question?: string;
          answer?: string;
          difficulty?: string;
          code_example?: string | null;
          key_points?: string[];
          tags?: string[];
        };
      };
      user_flashcard_progress: {
        Row: {
          id: string;
          user_id: string;
          flashcard_id: string;
          confidence_level: number;
          review_count: number;
          last_reviewed_at: string;
          next_review_at: string | null;
          spaced_repetition_data: Record<string, any> | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          flashcard_id: string;
          confidence_level: number;
          review_count?: number;
          last_reviewed_at: string;
          next_review_at?: string | null;
          spaced_repetition_data?: Record<string, any> | null;
        };
        Update: {
          confidence_level?: number;
          review_count?: number;
          last_reviewed_at?: string;
          next_review_at?: string | null;
          spaced_repetition_data?: Record<string, any> | null;
        };
      };
      study_sessions: {
        Row: {
          id: string;
          user_id: string;
          session_start: string;
          session_end: string | null;
          questions_answered: number;
          time_spent: number;
          avg_confidence: number;
          sections_studied: string[];
          session_type: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          session_start: string;
          session_end?: string | null;
          questions_answered?: number;
          time_spent?: number;
          avg_confidence?: number;
          sections_studied?: string[];
          session_type: string;
        };
        Update: {
          session_end?: string | null;
          questions_answered?: number;
          time_spent?: number;
          avg_confidence?: number;
          sections_studied?: string[];
        };
      };
      // Portfolio Tables
      portfolio_projects: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          long_description: string | null;
          tech_stack: string[];
          github_url: string;
          live_url: string | null;
          image_url: string | null;
          featured: boolean;
          category: string;
          status: string;
          highlights: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          title: string;
          description: string;
          long_description?: string | null;
          tech_stack: string[];
          github_url: string;
          live_url?: string | null;
          image_url?: string | null;
          featured?: boolean;
          category: string;
          status: string;
          highlights?: string[];
        };
        Update: {
          title?: string;
          description?: string;
          long_description?: string | null;
          tech_stack?: string[];
          github_url?: string;
          live_url?: string | null;
          image_url?: string | null;
          featured?: boolean;
          category?: string;
          status?: string;
          highlights?: string[];
          updated_at?: string;
        };
      };
      skills: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          category: string;
          level: string;
          years: number;
          icon: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          name: string;
          category: string;
          level: string;
          years: number;
          icon?: string | null;
        };
        Update: {
          name?: string;
          category?: string;
          level?: string;
          years?: number;
          icon?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      calculate_next_review: {
        Args: {
          ease_factor: number;
          interval_days: number;
          repetitions: number;
          quality: number;
        };
        Returns: string;
      };
    };
  };
}

// Typed client
export type SupabaseClient = typeof supabase;

// Auth helpers
export const auth = {
  signUp: (email: string, password: string) => 
    supabase.auth.signUp({ email, password }),
  
  signIn: (email: string, password: string) => 
    supabase.auth.signInWithPassword({ email, password }),
  
  signOut: () => supabase.auth.signOut(),
  
  resetPassword: (email: string) => 
    supabase.auth.resetPasswordForEmail(email),
  
  updateUser: (updates: { email?: string; password?: string; data?: any }) => 
    supabase.auth.updateUser(updates),
  
  getSession: () => supabase.auth.getSession(),
  
  getUser: () => supabase.auth.getUser(),
  
  onAuthStateChange: (callback: (event: string, session: any) => void) => 
    supabase.auth.onAuthStateChange(callback)
};

// Database helpers
export const db = {
  // Profiles
  getProfile: (userId: string) => 
    supabase.from('profiles').select('*').eq('id', userId).single(),
  
  updateProfile: (userId: string, updates: Database['public']['Tables']['profiles']['Update']) => 
    supabase.from('profiles').update(updates).eq('id', userId),
  
  // Site Analyses
  getSiteAnalyses: (userId: string) => 
    supabase.from('site_analyses').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
  
  createSiteAnalysis: (analysis: Database['public']['Tables']['site_analyses']['Insert']) => 
    supabase.from('site_analyses').insert(analysis).select().single(),
  
  // Flashcard Progress
  getFlashcardProgress: (userId: string) => 
    supabase.from('user_flashcard_progress').select('*').eq('user_id', userId),
  
  updateFlashcardProgress: (progressId: string, updates: Database['public']['Tables']['user_flashcard_progress']['Update']) => 
    supabase.from('user_flashcard_progress').update(updates).eq('id', progressId),
  
  // Portfolio Projects
  getPortfolioProjects: (userId: string) => 
    supabase.from('portfolio_projects').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
  
  createPortfolioProject: (project: Database['public']['Tables']['portfolio_projects']['Insert']) => 
    supabase.from('portfolio_projects').insert(project).select().single()
};

export default supabase;