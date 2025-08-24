# @mixcore/base

Mixcore SDK base abstractions. Provides core TypeScript classes and interfaces for all SDK packages.

## Features

- **BaseService**: Abstract service class with common functionality
- **BaseRestService**: REST API client base class
- **Injectable configuration**: Flexible service configuration
- **Framework-agnostic**: No UI/SPA dependencies
- **Secure by design**: Configuration injection prevents hardcoded secrets

## Installation

```bash
npm install @mixcore/base
# or
pnpm add @mixcore/base
```

## Usage

### Extending BaseService

```typescript
import { BaseService } from '@mixcore/base';

class MyService extends BaseService {
  constructor(config: MyConfig) {
    super(config);
  }

  async getData() {
    return this.execute(() => {
      // Your implementation
    });
  }
}
```

### Security Note

- Never hardcode secrets in configuration
- Always inject configuration at runtime
- Use environment variables for sensitive values

## API Reference

All base classes and interfaces include comprehensive TSDoc/JSDoc documentation and auto-generated TypeScript declarations.

### BaseService Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| execute | `fn: () => Promise<T>` | `Promise<T>` | Wraps operations with error handling |
| getConfig | None | `ConfigType` | Returns current configuration |

### BaseRestService Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| get | `path: string`, `params?: Record<string, any>` | `Promise<ApiResult>` | Makes GET request |
| post | `path: string`, `data: any`, `options?: { isFormData?: boolean }` | `Promise<ApiResult>` | Makes POST request |
| put | `path: string`, `data: any` | `Promise<ApiResult>` | Makes PUT request |
| delete | `path: string` | `Promise<ApiResult>` | Makes DELETE request |

## Testing

Test coverage reports are generated in `coverage/` directory when running:

```bash
pnpm test
```

See test files in `tests/` directory for implementation details.

## Related Packages

## Framework Integration

This package works with all JavaScript frameworks. See the [main README](../../README.md#framework-integration) for framework-specific integration examples.

### Package-specific Usage

```typescript
// Example: Using with Angular
import { Injectable } from '@angular/core';
import { BaseRestService } from '@mixcore/base';

@Injectable({ providedIn: 'root' })
export class MyRestService extends BaseRestService {
  constructor() {
    super({
      apiBaseUrl: environment.apiUrl,
      apiKey: environment.apiKey
    });
  }
}
```

## Related Packages

- [@mixcore/api](https://github.com/mixcore/javascript-sdk/tree/main/packages/api): API client implementation
- [@mixcore/database](https://github.com/mixcore/javascript-sdk/tree/main/packages/database): Database services extending these base classes

## License

Mixcore Community License (MCL). See [LICENSE](../../LICENSE) for details.
