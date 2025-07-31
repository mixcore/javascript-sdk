# Mixcore JavaScript SDK

![Mixcore Logo](https://mixcore.net/images/logo.svg)

Modular, framework-agnostic SDK for Mixcore projects. Built with TypeScript and distributed as ESM/CJS modules.

## Features

- **Modular architecture**: Import only what you need
- **TypeScript-first**: Full type safety and autocompletion
- **Framework-agnostic**: Works with any JavaScript framework
- **Production-ready**: Well-tested and documented
- **Secure by design**: Configuration injection prevents hardcoded secrets
- **Extensible**: Plugin/adapter architecture for custom implementations

## Packages

| Package | Description |
|--------|-------------|
| [@mixcore/shared](packages/shared) | Shared utilities, helpers and constants |
| [@mixcore/base](packages/base) | Base classes, abstract models and interfaces |
| [@mixcore/api](packages/api) | API clients and endpoint wrappers |
| [@mixcore/config](packages/config) | Configuration management |
| [@mixcore/database](packages/database) | Database domain services |
| [@mixcore/file](packages/file) | File handling utilities |
| [@mixcore/user](packages/user) | User/auth services |
| [@mixcore/template](packages/template) | Template rendering services |

## Getting Started

### Installation

```bash
npm install @mixcore/api @mixcore/database # or whichever packages you need
```

### SDK Initialization

```typescript
import { createMixcoreSdk } from '@mixcore/api';
import { ApiService } from '@mixcore/api';
import { ModuleDataService } from '@mixcore/database';

// Initialize SDK with configuration
const sdk = createMixcoreSdk(
  { apiBaseUrl: 'https://api.mixcore.net' },
  {
    api: new ApiService({ apiBaseUrl: 'https://api.mixcore.net' }),
    database: new ModuleDataService({ api: new ApiService({ apiBaseUrl: 'https://api.mixcore.net' }) })
    // Add other domain services as needed
  }
);

// Use services through SDK instance
const data = await sdk.database.fetchDataItems('module-id');
```

### Security Note

- Never hardcode secrets in your application
- Always inject configuration (API keys, URLs) at runtime
- Use environment variables for sensitive values

## API Reference

### Core SDK Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `createMixcoreSdk` | `config: MixcoreSdkConfig`, `services: MixcoreSdkOptions` | `MixcoreSdkInstance` | Creates configured SDK instance |

### Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `apiBaseUrl` | string | Yes | Base URL for API requests |
| `apiKey` | string | No | API key for authentication |
| `timeout` | number | No | Request timeout in ms |

## Development

### Prerequisites

- Node.js 18+
- pnpm

### Setup

```bash
git clone https://github.com/mixcore/javascript-sdk.git
cd javascript-sdk
pnpm install
```

### Building

```bash
pnpm build
```

### Testing

```bash
pnpm test
```

Test coverage reports are generated in `coverage/` directory.

## CI/CD Pipeline

The SDK uses GitHub Actions for continuous integration and deployment:

1. **Validate**: Runs linting and type checking
2. **Test**: Runs unit tests with coverage reporting via Codecov
3. **Publish**: Automatically publishes to npm on main branch merges

### Publishing Requirements

- All packages must pass tests with minimum 80% coverage
- Version numbers must follow semantic versioning
- NPM_TOKEN secret must be configured in GitHub

## Contributing

Contributions welcome! Please see our [Contribution Guidelines](CONTRIBUTING.md).

## Framework Integration

The SDK is framework-agnostic but here are guidelines for popular frameworks:

### React

```typescript
// Create a context/provider for the SDK
import { createContext } from 'react';
import { createMixcoreSdk } from '@mixcore/api';

const SdkContext = createContext(null);

function App() {
  const sdk = createMixcoreSdk(
    { apiBaseUrl: process.env.REACT_APP_API_URL },
    { /* services */ }
  );

  return (
    <SdkContext.Provider value={sdk}>
      {/* Your app */}
    </SdkContext.Provider>
  );
}
```

### Vue

```typescript
// Provide SDK instance via Vue's provide/inject
import { createApp } from 'vue';
import { createMixcoreSdk } from '@mixcore/api';

const app = createApp(App);

app.provide('mixcoreSdk', createMixcoreSdk(
  { apiBaseUrl: import.meta.env.VITE_API_URL },
  { /* services */ }
));
```

### Angular

```typescript
// Create an injectable service wrapper
import { Injectable } from '@angular/core';
import { createMixcoreSdk } from '@mixcore/api';

@Injectable({ providedIn: 'root' })
export class MixcoreService {
  sdk = createMixcoreSdk(
    { apiBaseUrl: environment.apiUrl },
    { /* services */ }
  );
}
```

### Svelte/SvelteKit

```typescript
// Use Svelte stores for SDK instance
import { writable } from 'svelte/store';
import { createMixcoreSdk } from '@mixcore/api';

export const sdk = writable(createMixcoreSdk(
  { apiBaseUrl: import.meta.env.VITE_API_URL },
  { /* services */ }
));
```

## License

Mixcore Community License (MCL). See [LICENSE](LICENSE) for details.
