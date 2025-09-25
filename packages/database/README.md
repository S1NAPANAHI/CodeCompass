# Database Package - Supabase Integration

Shared database schema, migrations, and Supabase configuration for all CodeCompass applications.

## Structure

### Migrations
- `migrations/` - SQL migration files
- `seed/` - Initial data seeding scripts
- `types/` - TypeScript type definitions

### Schemas

#### Core User System
```sql
profiles              -- User profiles and preferences
user_sessions         -- Session management
user_settings         -- Application settings
```

#### CodeCompass Features
```sql
site_analyses         -- Website analysis history
analysis_components   -- Extracted components
generated_code        -- Generated React code
user_projects         -- User's analysis projects
```

#### Interview Prep Features
```sql
flashcards           -- Interview questions
categories           -- Question categories
user_progress        -- Study progress tracking
study_sessions       -- Session history
spaced_repetition    -- Algorithm data
challenges           -- Coding challenges
```

#### Portfolio Features
```sql
portfolio_projects   -- Showcase projects
skills              -- Technical skills
achievements        -- Certifications/awards
testimonials        -- Client feedback
```

## Configuration

### Environment Variables
```bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Row Level Security (RLS)
All tables implement RLS policies to ensure data privacy and security.

## Usage

```typescript
import { supabase } from '@codecompass/database';
import type { Profile, Flashcard } from '@codecompass/database/types';

// Get user profile
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single();
```

## Real-time Features

Supports real-time subscriptions for:
- Progress updates
- Study session synchronization
- Multi-device state sync
