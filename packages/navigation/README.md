# @mixcore/navigation

Routing and navigation services for Mixcore SDK. Provides declarative routing and programmatic navigation utilities.

## Features

- Declarative route configuration
- Programmatic navigation
- Route guards and permissions
- Navigation events
- Framework-agnostic implementation

## Installation

```bash
npm install @mixcore/navigation
# or
pnpm add @mixcore/navigation
```

## Usage

### Basic Example

```typescript
import { NavigationService } from '@mixcore/navigation';

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/admin', component: AdminPage, requiresAuth: true }
];

const navService = new NavigationService({ routes });

// Navigate programmatically
navService.navigate('/about');
```

### Route Guards

```typescript
const routes = [
  {
    path: '/admin',
    component: AdminPage,
    canActivate: [() => checkAdminPermissions()]
  }
];
```

## API Reference

| Method | Description |
|--------|-------------|
| `navigate(path)` | Navigates to specified path |
| `goBack()` | Navigates back |
| `getCurrentRoute()` | Returns current route info |
| `onNavigationStart(cb)` | Navigation event listener |

## Related Packages

- [@mixcore/api](https://github.com/mixcore/javascript-sdk/tree/main/packages/api): API client integration
- [@mixcore/user](https://github.com/mixcore/javascript-sdk/tree/main/packages/user): User/auth services for route guards

## License

Mixcore Community License (MCL). See [LICENSE](../../LICENSE) for details.
