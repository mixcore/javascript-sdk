# Mixcore JavaScript SDK

![Mixcore Logo](https://mixcore.net/images/logo.svg)

Modular, framework-agnostic SDK for Mixcore projects. Built with TypeScript and distributed as ESM/CJS modules.

## Features

- **Modular architecture**: Import only what you need
- **TypeScript-first**: Full type safety and autocompletion
- **Framework-agnostic**: Works with any JavaScript framework
- **Production-ready**: Well-tested and documented

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

### Usage Example

```typescript
import { ApiService } from '@mixcore/api';
import { ModuleDataService } from '@mixcore/database';

const api = new ApiService({ apiBaseUrl: 'https://api.mixcore.net' });
const dataService = new ModuleDataService({ api });

// Use services...
```

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

## Contributing

Contributions welcome! Please see our [Contribution Guidelines](CONTRIBUTING.md).

## License

Mixcore Community License (MCL). See [LICENSE](LICENSE) for details.
