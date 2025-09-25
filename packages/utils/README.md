# Utils Package - Shared Utilities

Shared utility functions and helpers used across all CodeCompass applications.

## Modules

### Authentication
- `auth.ts` - Authentication helpers
- `session.ts` - Session management
- `permissions.ts` - Role-based access control

### Data Management
- `api.ts` - API client helpers
- `cache.ts` - Caching utilities
- `validation.ts` - Form validation helpers
- `formatting.ts` - Data formatting functions

### UI Helpers
- `theme.ts` - Theme management
- `responsive.ts` - Responsive design helpers
- `animations.ts` - Animation utilities
- `keyboard.ts` - Keyboard shortcut handling

### Analytics
- `tracking.ts` - Event tracking
- `performance.ts` - Performance monitoring
- `progress.ts` - Progress calculation

### File Operations
- `upload.ts` - File upload handling
- `download.ts` - File download helpers
- `image.ts` - Image processing utilities

### Algorithm Helpers
- `spaced-repetition.ts` - SM-2 algorithm implementation
- `search.ts` - Search and filtering utilities
- `sorting.ts` - Sorting algorithms

## Usage

```typescript
import { formatDate, validateEmail, trackEvent } from '@codecompass/utils';

// Format a date
const formatted = formatDate(new Date());

// Validate email
const isValid = validateEmail('user@example.com');

// Track user action
trackEvent('button_click', { component: 'header' });
```

## Constants

Shared constants, enums, and configuration values used across applications.
