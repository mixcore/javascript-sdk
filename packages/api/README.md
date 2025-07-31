# @mixcore/api

API clients and endpoint wrappers for Mixcore SDK. Provides typed HTTP clients for interacting with Mixcore APIs.

## Features

- Typed API client with configurable base URL
- Automatic request/response serialization
- Built-in error handling
- Support for authentication headers
- Promise-based async operations
- Secure configuration injection
- Framework-agnostic implementation

## Installation

```bash
npm install @mixcore/api
# or
pnpm add @mixcore/api
```

## Usage

### Basic Example

```typescript
import { ApiService } from '@mixcore/api';

const api = new ApiService({
  apiBaseUrl: 'https://api.mixcore.net',
  apiKey: process.env.MIXCORE_API_KEY // Never hardcode secrets!
});

// Make API requests
const response = await api.get('/some-endpoint');
```

### SDK Entrypoint

```typescript
import { createMixcoreSdk } from '@mixcore/api';

const sdk = createMixcoreSdk(
  { apiBaseUrl: 'https://api.mixcore.net' },
  {
    api: new ApiService({ apiBaseUrl: 'https://api.mixcore.net' })
  }
);
```

### Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| apiBaseUrl | string | Yes | Base URL for API requests |
| apiKey? | string | No | API key for authentication |
| timeout? | number | No | Request timeout in ms |

### Security Note

- Never hardcode API keys or secrets in your code
- Always inject configuration at runtime
- Use environment variables for sensitive values

## API Reference

### ApiService Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| get | `endpoint: string`, `params?: Record<string, any>` | `Promise<ApiResult>` | Makes GET request |
| post | `endpoint: string`, `data: any`, `options?: { isFormData?: boolean }` | `Promise<ApiResult>` | Makes POST request |
| delete | `endpoint: string` | `Promise<ApiResult>` | Makes DELETE request |

## Testing

Test coverage reports are generated in `coverage/` directory when running:

```bash
pnpm test
```

## Framework Integration

This package works with all JavaScript frameworks. See the [main README](../../README.md#framework-integration) for framework-specific integration examples.

### Package-specific Usage

```typescript
// Example: Using with React
import { createMixcoreSdk } from '@mixcore/api';

const sdk = createMixcoreSdk(
  { apiBaseUrl: process.env.REACT_APP_API_URL },
  {
    api: new ApiService({
      apiBaseUrl: process.env.REACT_APP_API_URL,
      apiKey: process.env.REACT_APP_API_KEY
    })
  }
);
```

## Related Packages

- [@mixcore/database](https://github.com/mixcore/javascript-sdk/tree/main/packages/database): Database services using this API client
- [@mixcore/base](https://github.com/mixcore/javascript-sdk/tree/main/packages/base): Base service classes

## License

Mixcore Community License (MCL). See [LICENSE](../../LICENSE) for details.
