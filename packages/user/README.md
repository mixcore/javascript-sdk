# @mixcore/user

Authentication and user management services for Mixcore SDK. Provides login, session handling and user profile management.

## Features

- Email/password authentication
- Social login (Google, Facebook, etc.)
- Session management
- User profile CRUD operations
- Permission checking
- Framework-agnostic implementation

## Installation

```bash
npm install @mixcore/user
# or
pnpm add @mixcore/user
```

## Usage

### Basic Authentication

```typescript
import { AuthServices } from '@mixcore/user';

const authService = new AuthServices();

// Login
const user = await authService.login('user@example.com', 'password');

// Check session
const isLoggedIn = await authService.checkSession();

// Logout
await authService.logout();
```

### User Management

```typescript
import { UserServices } from '@mixcore/user';

const userService = new UserServices();

// Get current user
const profile = await userService.getProfile();

// Update profile
await userService.updateProfile({ name: 'New Name' });
```

## API Reference

### AuthServices

| Method | Description |
|--------|-------------|
| `login(email, password)` | Authenticates user |
| `logout()` | Ends session |
| `checkSession()` | Verifies active session |
| `register(userData)` | Creates new account |

### UserServices

| Method | Description |
|--------|-------------|
| `getProfile()` | Gets user profile |
| `updateProfile(data)` | Updates profile |
| `hasPermission(perm)` | Checks permission |

## Related Packages

- [@mixcore/api](https://github.com/mixcore/javascript-sdk/tree/main/packages/api): API client foundation
- [@mixcore/navigation](https://github.com/mixcore/javascript-sdk/tree/main/packages/navigation): Route guards using auth

## License

Mixcore Community License (MCL). See [LICENSE](../../LICENSE) for details.
