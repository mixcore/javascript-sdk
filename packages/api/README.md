# @mixcore/api

API clients and endpoint wrappers for Mixcore SDK. Provides typed HTTP clients for interacting with Mixcore APIs.

## Features

- Typed API client with configurable base URL
- Automatic request/response serialization
- Built-in error handling
- Support for authentication headers
- Promise-based async operations

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
  apiKey: 'your-api-key' // optional
});

// Make API requests
const response = await api.get('/some-endpoint');
```

### Configuration Options

| Option | Type | Description |
|--------|------|-------------|
| apiBaseUrl | string | Base URL for API requests |
| apiKey? | string | API key for authentication |
| timeout? | number | Request timeout in ms |

### Authentication

```typescript
// With API key
const api = new ApiService({
  apiBaseUrl: 'https://api.mixcore.net',
  apiKey: 'your-api-key-here'
});

// Requests will include Authorization: Bearer header
```

## Error Handling

The API client throws structured errors for:

- Network failures
- Invalid responses (non-2xx status codes)
- Timeouts

```typescript
try {
  await api.get('/some-endpoint');
} catch (error) {
  console.error('API request failed:', error.message);
  if (error.response) {
    console.error('Status:', error.response.status);
  }
}
```

## Related Packages

- [@mixcore/database](https://github.com/mixcore/javascript-sdk/tree/main/packages/database): Database services using this API client
- [@mixcore/base](https://github.com/mixcore/javascript-sdk/tree/main/packages/base): Base service classes

## License

Mixcore Community License (MCL). See [LICENSE](../../LICENSE) for details.
