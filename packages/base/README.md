# @mixcore/base

Mixcore SDK base abstractions. Provides core TypeScript classes and interfaces for all SDK packages.

## Features

- **BaseService**: Abstract service class with common functionality
- **BaseRestService**: REST API client base class
- **Injectable configuration**: Flexible service configuration
- **Framework-agnostic**: No UI/SPA dependencies

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

### Using BaseRestService

```typescript
import { BaseRestService } from '@mixcore/base';

class MyRestService extends BaseRestService {
  constructor(baseUrl: string) {
    super({ apiBaseUrl: baseUrl });
  }

  async fetchItems() {
    return this.get('/items');
  }
}
```

## API Reference

### BaseService

| Method | Description |
|--------|-------------|
| `execute(fn)` | Wraps operations with error handling |
| `getConfig()` | Returns current configuration |

### BaseRestService

| Method | Description |
|--------|-------------|
| `get(path)` | Makes GET request |
| `post(path, data)` | Makes POST request |
| `put(path, data)` | Makes PUT request |
| `delete(path)` | Makes DELETE request |

## Related Packages

- [@mixcore/api](https://github.com/mixcore/javascript-sdk/tree/main/packages/api): API client implementation
- [@mixcore/database](https://github.com/mixcore/javascript-sdk/tree/main/packages/database): Database services extending these base classes

## License

Mixcore Community License (MCL). See [LICENSE](../../LICENSE) for details.
