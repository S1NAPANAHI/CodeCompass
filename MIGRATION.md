# Migration Guide 🚀

**Step-by-step guide to consolidate your three repositories into the unified CodeCompass platform**

## Overview

This guide will help you migrate content from:
- `S1NAPANAHI/portfolio` → `apps/portfolio/`
- `S1NAPANAHI/react-nextjs-interview-prep` → `apps/interview-prep/`
- Current `frontend/` → `apps/codecompass/`

## 🗂 Pre-Migration Checklist

### 1. Backup Your Repositories
```bash
# Clone your existing repositories to backup folder
mkdir ~/codecompass-backup
cd ~/codecompass-backup

git clone https://github.com/S1NAPANAHI/portfolio.git
git clone https://github.com/S1NAPANAHI/react-nextjs-interview-prep.git
```

### 2. Create Local Branch
```bash
# Switch to the unified-platform branch
git checkout unified-platform
git pull origin unified-platform
```

## 📚 Phase 1: Interview Prep Migration

### Content to Migrate

#### 📁 **Core Files**
```bash
# Copy these files from react-nextjs-interview-prep/
app.js                    → apps/interview-prep/src/components/
data-integrated-app.js    → apps/interview-prep/src/data/
enhanced-organized-app.js → apps/interview-prep/src/components/
style.css                → apps/interview-prep/src/styles/
enhanced-organized-styles.css → apps/interview-prep/src/styles/
```

#### 📊 **Data Files**
```bash
# Question banks and content
config/                   → apps/interview-prep/src/config/
js/                      → apps/interview-prep/src/utils/
utils/                   → apps/interview-prep/src/utils/
supabase/                → packages/database/migrations/interview-prep/
```

### Conversion Steps

#### 1. Convert Vanilla JS to React Components

**Example: Flashcard Component**
```javascript
// Old: Pure JavaScript
function createFlashcard(question, answer) {
    return `<div class="flashcard">${question}</div>`;
}

// New: React Component
interface FlashcardProps {
  question: string;
  answer: string;
  onAnswer: (confidence: number) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer, onAnswer }) => {
  return (
    <div className="flashcard">
      <h3>{question}</h3>
      <p>{answer}</p>
      <div className="confidence-buttons">
        {[1,2,3,4,5].map(level => (
          <button key={level} onClick={() => onAnswer(level)}>
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};
```

#### 2. Migrate Data Structures

**Questions Data**
```typescript
// Create: apps/interview-prep/src/data/questions.ts
export interface Question {
  id: string;
  category: 'react' | 'nextjs' | 'javascript' | 'hooks' | 'system-design';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  answer: string;
  codeExample?: string;
  keyPoints: string[];
  tags: string[];
}

export const reactQuestions: Question[] = [
  // Migrate your existing questions here
];
```

#### 3. State Management Integration

**Progress Tracking**
```typescript
// Create: apps/interview-prep/src/hooks/useProgress.ts
import { useState, useEffect } from 'react';
import { supabase } from '@codecompass/database';

export const useProgress = (userId: string) => {
  const [progress, setProgress] = useState(null);
  
  // Sync with Supabase
  useEffect(() => {
    const fetchProgress = async () => {
      const { data } = await supabase
        .from('user_flashcard_progress')
        .select('*')
        .eq('user_id', userId);
      
      setProgress(data);
    };
    
    fetchProgress();
  }, [userId]);
  
  return { progress, updateProgress: setProgress };
};
```

## 💼 Phase 2: Portfolio Migration

### Content Structure
```bash
# Migrate from portfolio/ to apps/portfolio/
src/                     → apps/portfolio/src/
public/                  → apps/portfolio/public/
supabase/               → packages/database/migrations/portfolio/
package.json dependencies → apps/portfolio/package.json
```

### Next.js to React Conversion

#### 1. Convert Pages to Components
```typescript
// Old: pages/index.tsx (Next.js)
export default function Home() {
  return <div>Portfolio Home</div>;
}

// New: apps/portfolio/src/pages/Home.tsx (React)
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="portfolio-home">
      {/* Portfolio content */}
    </div>
  );
};

export default Home;
```

#### 2. Convert API Routes to Shared Backend
```typescript
// Old: pages/api/projects.ts (Next.js API)
export default function handler(req, res) {
  res.json({ projects: [] });
}

// New: backend/routes/portfolio.js (Express)
router.get('/portfolio/projects', async (req, res) => {
  const { data } = await supabase
    .from('portfolio_projects')
    .select('*');
  
  res.json(data);
});
```

### Portfolio Data Structure
```typescript
// Create: apps/portfolio/src/data/projects.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl: string;
  featured: boolean;
  category: 'fullstack' | 'frontend' | 'backend' | 'mobile';
}

export const projects: Project[] = [
  {
    id: 'codecompass',
    title: 'CodeCompass Platform',
    description: 'Unified development platform with site analysis, interview prep, and portfolio.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Supabase'],
    githubUrl: 'https://github.com/S1NAPANAHI/CodeCompass',
    liveUrl: 'https://codecompass.dev',
    featured: true,
    category: 'fullstack'
  }
  // Add your other projects
];
```

## 🔍 Phase 3: CodeCompass Migration

### Current Frontend Integration
```bash
# Move current frontend/ to apps/codecompass/
frontend/src/           → apps/codecompass/src/
frontend/public/        → apps/codecompass/public/
frontend/package.json   → apps/codecompass/package.json
```

### Update Import Paths
```typescript
// Update all imports to use shared packages
// Old:
import Button from '../components/Button';

// New:
import { Button } from '@codecompass/ui';
import { formatDate } from '@codecompass/utils';
import { supabase } from '@codecompass/database';
```

## 🗄️ Phase 4: Database Consolidation

### 1. Create Unified Schema
```sql
-- Create: packages/database/migrations/001_unified_schema.sql

-- Core user system (shared across all apps)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- CodeCompass specific
CREATE TABLE site_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  url TEXT NOT NULL,
  title TEXT,
  analysis_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Interview Prep specific  
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  difficulty TEXT DEFAULT 'beginner'
);

CREATE TABLE user_flashcard_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  flashcard_id UUID REFERENCES flashcards(id),
  confidence_level INTEGER DEFAULT 1,
  last_reviewed_at TIMESTAMP DEFAULT NOW(),
  review_count INTEGER DEFAULT 0
);

-- Portfolio specific
CREATE TABLE portfolio_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT[],
  github_url TEXT,
  live_url TEXT,
  featured BOOLEAN DEFAULT false
);
```

### 2. Data Migration Scripts
```sql
-- Create: packages/database/migrations/002_migrate_existing_data.sql

-- Migrate interview prep data
INSERT INTO flashcards (category, question, answer, difficulty)
VALUES 
  ('react', 'What is JSX?', 'JSX is a syntax extension...', 'beginner'),
  -- Add your existing questions
;

-- Migrate portfolio projects  
INSERT INTO portfolio_projects (title, description, tech_stack)
VALUES
  ('CodeCompass', 'Unified development platform', ARRAY['React', 'Node.js']),
  -- Add your existing projects
;
```

## 🚀 Phase 5: Deployment Setup

### 1. Update Vercel Configuration
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    { "src": "/codecompass/(.*)", "dest": "/apps/codecompass/$1" },
    { "src": "/portfolio/(.*)", "dest": "/apps/portfolio/$1" },
    { "src": "/interview-prep/(.*)", "dest": "/apps/interview-prep/$1" },
    { "src": "/(.*)", "dest": "/index.html" }
  ],
  "env": {
    "VITE_SUPABASE_URL": "@supabase_url",
    "VITE_SUPABASE_ANON_KEY": "@supabase_anon_key"
  }
}
```

### 2. Environment Variables
```bash
# .env.example
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# API
VITE_API_URL=https://your-api.railway.app

# GitHub (for CodeCompass)
VITE_GITHUB_TOKEN=your-github-token

# Analytics (optional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## ✅ Migration Checklist

### Pre-Migration
- [ ] Backup existing repositories
- [ ] Set up Supabase project
- [ ] Create unified-platform branch

### Interview Prep Migration
- [ ] Copy core JavaScript files
- [ ] Convert to React components
- [ ] Migrate question data
- [ ] Implement progress tracking
- [ ] Test spaced repetition algorithm

### Portfolio Migration  
- [ ] Convert Next.js pages to React
- [ ] Move API routes to backend
- [ ] Migrate project data
- [ ] Update styling to shared system

### CodeCompass Migration
- [ ] Move frontend to apps/codecompass
- [ ] Update import paths
- [ ] Integrate with shared packages

### Database Setup
- [ ] Run unified schema migrations
- [ ] Migrate existing data
- [ ] Set up row-level security
- [ ] Test cross-app data sharing

### Final Integration
- [ ] Test unified navigation
- [ ] Verify authentication flow
- [ ] Test theme consistency
- [ ] Deploy to staging
- [ ] Performance testing
- [ ] Deploy to production

## 🎯 Testing Strategy

### 1. Local Testing
```bash
# Test each app individually
npm run dev:codecompass
npm run dev:portfolio  
npm run dev:interview-prep

# Test unified platform
npm run dev
```

### 2. Integration Testing
- [ ] User authentication across apps
- [ ] Shared state management
- [ ] Navigation between apps
- [ ] Theme persistence
- [ ] Data synchronization

### 3. Performance Testing
- [ ] Bundle size analysis
- [ ] Loading time benchmarks
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

## 🆘 Troubleshooting

### Common Issues

**Import Path Errors**
```bash
# Solution: Update tsconfig.json paths
{
  "compilerOptions": {
    "paths": {
      "@codecompass/ui": ["packages/ui/src"],
      "@codecompass/utils": ["packages/utils/src"],
      "@codecompass/database": ["packages/database/src"]
    }
  }
}
```

**Supabase Connection Issues**
```typescript
// Solution: Check environment variables and RLS policies
const { data, error } = await supabase
  .from('profiles')
  .select('*');
  
if (error) {
  console.error('Database error:', error.message);
}
```

**Build Errors**
```bash
# Solution: Clear cache and reinstall
npm run clean
npm install
npm run build
```

## 🚀 Next Steps

Once migration is complete:

1. **Archive old repositories** (don't delete, just archive)
2. **Update README files** in archived repos to redirect to CodeCompass
3. **Update portfolio links** to point to new unified platform
4. **Notify users** of the new integrated experience
5. **Plan Phase 2 features** based on user feedback

---

**Need help with migration? Open an issue or reach out!** 💬