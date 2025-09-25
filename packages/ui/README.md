# UI Package - Shared Components

Shared UI components used across all CodeCompass applications.

## Components

### Layout
- `Header` - Unified navigation header
- `Sidebar` - Collapsible navigation sidebar
- `Footer` - Common footer component
- `AppShell` - Main application wrapper

### Forms
- `Input` - Styled input component
- `Button` - Button with variants
- `Select` - Dropdown select
- `Checkbox` - Checkbox component
- `Form` - Form wrapper with validation

### Display
- `Card` - Content card component
- `Modal` - Modal dialog
- `Tooltip` - Hover tooltip
- `Badge` - Status badge
- `Avatar` - User avatar

### Navigation
- `Tabs` - Tab navigation
- `Breadcrumbs` - Breadcrumb navigation
- `Pagination` - Page navigation

### Feedback
- `Toast` - Notification toast
- `Progress` - Progress indicators
- `Spinner` - Loading spinner
- `Alert` - Alert messages

## Usage

```typescript
import { Button, Card, Input } from '@codecompass/ui';

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

## Theming

All components support the unified theme system with light/dark mode and customizable colors.
