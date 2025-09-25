-- CodeCompass Platform Unified Database Schema
-- This migration creates all tables needed for the three applications

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- CORE USER SYSTEM (Shared across all apps)
-- =============================================================================

-- User profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to handle profile updates
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- =============================================================================
-- CODECOMPASS - SITE ANALYSIS TABLES
-- =============================================================================

-- Site analyses storage
CREATE TABLE site_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  title TEXT,
  analysis_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_site_analyses_user_id ON site_analyses(user_id);
CREATE INDEX idx_site_analyses_url ON site_analyses(url);
CREATE INDEX idx_site_analyses_created_at ON site_analyses(created_at DESC);

-- Extracted components from site analysis
CREATE TABLE analysis_components (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  analysis_id UUID REFERENCES site_analyses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  html TEXT NOT NULL,
  css TEXT NOT NULL,
  react_code TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_analysis_components_analysis_id ON analysis_components(analysis_id);
CREATE INDEX idx_analysis_components_type ON analysis_components(type);

-- User projects (collections of analyses)
CREATE TABLE user_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  github_url TEXT,
  analysis_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_user_projects_user_id ON user_projects(user_id);

-- Triggers for updated_at
CREATE TRIGGER update_site_analyses_updated_at
  BEFORE UPDATE ON site_analyses
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER update_user_projects_updated_at
  BEFORE UPDATE ON user_projects
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- =============================================================================
-- INTERVIEW PREP TABLES
-- =============================================================================

-- Categories for organizing flashcards
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Flashcards/Questions
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  code_example TEXT,
  key_points TEXT[] DEFAULT '{}',
  follow_up_questions TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  importance TEXT DEFAULT 'Medium' CHECK (importance IN ('Low', 'Medium', 'High')),
  frequency INTEGER DEFAULT 50,
  companies TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_flashcards_category ON flashcards(category);
CREATE INDEX idx_flashcards_difficulty ON flashcards(difficulty);
CREATE INDEX idx_flashcards_tags ON flashcards USING GIN(tags);

-- User progress on flashcards
CREATE TABLE user_flashcard_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  flashcard_id UUID REFERENCES flashcards(id) ON DELETE CASCADE,
  confidence_level INTEGER DEFAULT 1 CHECK (confidence_level BETWEEN 1 AND 5),
  review_count INTEGER DEFAULT 0,
  last_reviewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  next_review_at TIMESTAMP WITH TIME ZONE,
  spaced_repetition_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, flashcard_id)
);

CREATE INDEX idx_user_flashcard_progress_user_id ON user_flashcard_progress(user_id);
CREATE INDEX idx_user_flashcard_progress_next_review ON user_flashcard_progress(next_review_at);

-- Study sessions tracking
CREATE TABLE study_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_end TIMESTAMP WITH TIME ZONE,
  questions_answered INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0, -- in minutes
  avg_confidence DECIMAL(3,2) DEFAULT 0,
  sections_studied TEXT[] DEFAULT '{}',
  session_type TEXT NOT NULL DEFAULT 'general' CHECK (session_type IN ('flashcards', 'practice', 'quiz', 'review', 'general')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_study_sessions_user_id ON study_sessions(user_id);
CREATE INDEX idx_study_sessions_session_start ON study_sessions(session_start DESC);

-- Coding challenges
CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  category TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  solution TEXT NOT NULL,
  explanation TEXT NOT NULL,
  time_limit INTEGER, -- in minutes
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_challenges_difficulty ON challenges(difficulty);
CREATE INDEX idx_challenges_category ON challenges(category);

-- User progress on challenges
CREATE TABLE user_challenge_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  completion_time INTEGER, -- in minutes
  attempts INTEGER DEFAULT 0,
  last_attempt_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, challenge_id)
);

-- =============================================================================
-- PORTFOLIO TABLES
-- =============================================================================

-- Portfolio projects
CREATE TABLE portfolio_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  github_url TEXT NOT NULL,
  live_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  category TEXT NOT NULL DEFAULT 'fullstack' CHECK (category IN ('fullstack', 'frontend', 'backend', 'mobile', 'tool')),
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'in-progress', 'planning')),
  highlights TEXT[] DEFAULT '{}',
  challenges TEXT[] DEFAULT '{}',
  learnings TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_portfolio_projects_user_id ON portfolio_projects(user_id);
CREATE INDEX idx_portfolio_projects_featured ON portfolio_projects(featured);
CREATE INDEX idx_portfolio_projects_category ON portfolio_projects(category);

-- User skills
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('frontend', 'backend', 'database', 'tools', 'languages')),
  level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  years INTEGER DEFAULT 0,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_skills_user_id ON skills(user_id);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_level ON skills(level);

-- Experience entries
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  duration TEXT NOT NULL,
  description TEXT,
  responsibilities TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Triggers for updated_at on portfolio tables
CREATE TRIGGER update_portfolio_projects_updated_at
  BEFORE UPDATE ON portfolio_projects
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_flashcard_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenge_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Site analyses policies
CREATE POLICY "Users can view own analyses" ON site_analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own analyses" ON site_analyses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own analyses" ON site_analyses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own analyses" ON site_analyses FOR DELETE USING (auth.uid() = user_id);

-- Analysis components policies
CREATE POLICY "Users can view own analysis components" ON analysis_components FOR SELECT 
  USING (EXISTS (SELECT 1 FROM site_analyses WHERE id = analysis_id AND user_id = auth.uid()));
CREATE POLICY "Users can insert analysis components" ON analysis_components FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM site_analyses WHERE id = analysis_id AND user_id = auth.uid()));

-- User projects policies
CREATE POLICY "Users can manage own projects" ON user_projects FOR ALL USING (auth.uid() = user_id);

-- Interview prep policies
CREATE POLICY "Users can view own flashcard progress" ON user_flashcard_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own flashcard progress" ON user_flashcard_progress FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own study sessions" ON study_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own study sessions" ON study_sessions FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own challenge progress" ON user_challenge_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own challenge progress" ON user_challenge_progress FOR ALL USING (auth.uid() = user_id);

-- Portfolio policies
CREATE POLICY "Users can manage own portfolio projects" ON portfolio_projects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own skills" ON skills FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own experience" ON experience FOR ALL USING (auth.uid() = user_id);

-- Public read policies for portfolio (for public portfolio viewing)
CREATE POLICY "Portfolio projects are publicly viewable" ON portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Skills are publicly viewable" ON skills FOR SELECT USING (true);
CREATE POLICY "Experience is publicly viewable" ON experience FOR SELECT USING (true);

-- Flashcards and challenges are publicly readable (common questions)
CREATE POLICY "Flashcards are publicly viewable" ON flashcards FOR SELECT USING (true);
CREATE POLICY "Challenges are publicly viewable" ON challenges FOR SELECT USING (true);
CREATE POLICY "Categories are publicly viewable" ON categories FOR SELECT USING (true);

-- =============================================================================
-- FUNCTIONS FOR SPACED REPETITION
-- =============================================================================

CREATE OR REPLACE FUNCTION calculate_next_review(
  ease_factor DECIMAL DEFAULT 2.5,
  interval_days INTEGER DEFAULT 1,
  repetitions INTEGER DEFAULT 0,
  quality INTEGER DEFAULT 3
)
RETURNS TIMESTAMP WITH TIME ZONE AS $$
DECLARE
  new_ease_factor DECIMAL;
  new_interval INTEGER;
  next_review TIMESTAMP WITH TIME ZONE;
BEGIN
  -- SM-2 Algorithm implementation
  IF quality < 3 THEN
    -- Reset if quality is poor
    new_interval := 1;
    repetitions := 0;
    new_ease_factor := ease_factor;
  ELSE
    -- Calculate new ease factor
    new_ease_factor := ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    new_ease_factor := GREATEST(new_ease_factor, 1.3);
    
    -- Calculate new interval
    IF repetitions = 0 THEN
      new_interval := 1;
    ELSIF repetitions = 1 THEN
      new_interval := 6;
    ELSE
      new_interval := ROUND(interval_days * new_ease_factor);
    END IF;
  END IF;
  
  -- Calculate next review date
  next_review := NOW() + (new_interval || ' days')::INTERVAL;
  
  RETURN next_review;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- INITIAL DATA SEEDING
-- =============================================================================

-- Insert default categories
INSERT INTO categories (name, description, icon, color) VALUES
  ('React Fundamentals', 'Core React concepts and principles', '⚛️', '#61DAFB'),
  ('React Hooks', 'Modern React with hooks and functional components', '🎣', '#61DAFB'),
  ('JavaScript Core', 'Essential JavaScript concepts', '🟨', '#F7DF1E'),
  ('Next.js', 'Next.js framework and features', '▲', '#000000'),
  ('System Design', 'Architecture and scalability concepts', '🏗️', '#4F46E5'),
  ('Performance', 'Optimization and performance techniques', '⚡', '#10B981');

-- Insert sample flashcards (you can expand this with your full question set)
INSERT INTO flashcards (category, question, answer, difficulty, key_points, tags) VALUES
  (
    'React Fundamentals',
    'What is React and why would you use it?',
    'React is a JavaScript library developed by Facebook for building user interfaces, particularly single-page applications. It uses a component-based architecture, Virtual DOM for efficient updates, and follows a declarative programming paradigm.',
    'Beginner',
    ARRAY['Virtual DOM for performance', 'Component-based architecture', 'Strong ecosystem and community', 'Backed by Meta (Facebook)'],
    ARRAY['fundamentals', 'introduction', 'virtual-dom']
  ),
  (
    'React Fundamentals',
    'What is JSX and how does it work?',
    'JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript. It makes React components more readable and easier to write. JSX gets transpiled by tools like Babel into React.createElement() calls.',
    'Beginner',
    ARRAY['Syntax extension for JavaScript', 'HTML-like syntax in JS', 'Transpiled to React.createElement', 'Supports JavaScript expressions'],
    ARRAY['jsx', 'syntax', 'transpilation']
  ),
  (
    'React Hooks',
    'What is useState hook and how does it work?',
    'useState is a React Hook that lets you add state variables to functional components. It returns an array with two elements: the current state value and a function to update it. When state changes, the component re-renders.',
    'Beginner',
    ARRAY['Adds state to functional components', 'Returns [value, setter] array', 'Triggers re-renders on state change', 'Supports functional updates'],
    ARRAY['hooks', 'state', 'functional-components']
  );

-- Insert sample coding challenges
INSERT INTO challenges (title, description, difficulty, category, requirements, solution, explanation, time_limit, tags) VALUES
  (
    'Counter Component with Hooks',
    'Build a counter component that can increment, decrement, and reset to zero using React hooks.',
    'Easy',
    'React Hooks',
    ARRAY['Use useState hook for state management', 'Implement increment, decrement, and reset functionality', 'Display current count value', 'Handle negative numbers properly'],
    'function Counter() { const [count, setCount] = useState(0); const increment = () => setCount(prev => prev + 1); const decrement = () => setCount(prev => prev - 1); const reset = () => setCount(0); return (<div className="counter"><h2>Count: {count}</h2><div className="controls"><button onClick={increment}>+</button><button onClick={decrement}>-</button><button onClick={reset}>Reset</button></div></div>); }',
    'This solution uses useState to manage the counter state and provides three functions for state updates with proper functional updates for the increment function.',
    15,
    ARRAY['hooks', 'useState', 'event-handling', 'beginner']
  ),
  (
    'Todo List with Local Storage',
    'Create a todo list component that persists data in localStorage and includes add, toggle, and delete functionality.',
    'Medium',
    'State Management',
    ARRAY['Use useState for todos state', 'Implement useEffect for localStorage sync', 'Add, toggle, and delete functionality', 'Persist data across browser sessions'],
    'function TodoList() { const [todos, setTodos] = useState(() => { const saved = localStorage.getItem("todos"); return saved ? JSON.parse(saved) : []; }); const [input, setInput] = useState(""); useEffect(() => { localStorage.setItem("todos", JSON.stringify(todos)); }, [todos]); const addTodo = () => { if (input.trim()) { setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]); setInput(""); } }; const toggleTodo = (id) => { setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo )); }; const deleteTodo = (id) => { setTodos(todos.filter(todo => todo.id !== id)); }; return (<div><div className="input-section"><input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && addTodo()} placeholder="Add new todo..." /><button onClick={addTodo}>Add</button></div><ul>{todos.map(todo => (<li key={todo.id} className={todo.completed ? "completed" : ""}><span onClick={() => toggleTodo(todo.id)}>{todo.completed ? "✅" : "⭕"} {todo.text}</span><button onClick={() => deleteTodo(todo.id)}>Delete</button></li>))}</ul></div>); }',
    'This solution demonstrates state management, localStorage integration, and common todo operations. The useState initializer function ensures data persistence across browser sessions.',
    30,
    ARRAY['state-management', 'localStorage', 'useEffect', 'intermediate']
  );

-- =============================================================================
-- HELPFUL VIEWS
-- =============================================================================

-- User study statistics view
CREATE VIEW user_study_stats AS
SELECT 
  p.id as user_id,
  p.email,
  COUNT(DISTINCT ufp.flashcard_id) as questions_completed,
  COUNT(DISTINCT ss.id) as total_sessions,
  COALESCE(SUM(ss.time_spent), 0) as total_study_time,
  COUNT(DISTINCT DATE(ss.session_start)) as study_days,
  AVG(ufp.confidence_level) as avg_confidence
FROM profiles p
LEFT JOIN user_flashcard_progress ufp ON p.id = ufp.user_id
LEFT JOIN study_sessions ss ON p.id = ss.user_id
GROUP BY p.id, p.email;

-- Questions due for review view
CREATE VIEW questions_due_for_review AS
SELECT 
  ufp.user_id,
  ufp.flashcard_id,
  f.question,
  f.category,
  ufp.confidence_level,
  ufp.next_review_at
FROM user_flashcard_progress ufp
JOIN flashcards f ON ufp.flashcard_id = f.id
WHERE ufp.next_review_at <= NOW()
ORDER BY ufp.next_review_at ASC;

-- =============================================================================
-- FUNCTIONS FOR AUTOMATIC PROFILE CREATION
-- =============================================================================

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================

-- Composite indexes for common queries
CREATE INDEX idx_flashcard_progress_user_confidence ON user_flashcard_progress(user_id, confidence_level);
CREATE INDEX idx_study_sessions_user_date ON study_sessions(user_id, session_start DESC);
CREATE INDEX idx_portfolio_projects_user_featured ON portfolio_projects(user_id, featured DESC);

-- Full-text search indexes (for future search functionality)
CREATE INDEX idx_flashcards_search ON flashcards USING gin(to_tsvector('english', question || ' ' || answer));
CREATE INDEX idx_portfolio_projects_search ON portfolio_projects USING gin(to_tsvector('english', title || ' ' || description));

COMMENT ON TABLE profiles IS 'User profiles extending Supabase auth.users';
COMMENT ON TABLE site_analyses IS 'CodeCompass website analysis results';
COMMENT ON TABLE flashcards IS 'Interview preparation questions and answers';
COMMENT ON TABLE portfolio_projects IS 'User portfolio projects and work samples';
COMMENT ON FUNCTION calculate_next_review IS 'SM-2 spaced repetition algorithm for optimizing review scheduling';