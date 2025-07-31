# @mixcore/database

Database domain services and types for Mixcore SDK. Provides data access, querying, and persistence services.

## Features

- REST API clients for Mixcore database operations
- TypeScript interfaces for database models
- Data validation and transformation
- Modular service architecture
- Secure configuration injection

## Installation

```bash
npm install @mixcore/database
# or
pnpm add @mixcore/database
```

## Usage

### Basic Example

```typescript
import { createMixcoreSdk } from '@mixcore/api';
import { ModuleDataService } from '@mixcore/database';

const sdk = createMixcoreSdk(
  { apiBaseUrl: 'https://api.mixcore.net' },
  {
    database: new ModuleDataService({
      api: new ApiService({
        apiBaseUrl: 'https://api.mixcore.net',
        apiKey: process.env.MIXCORE_API_KEY // Never hardcode secrets!
      })
    })
  }
);

// Fetch data items
const result = await sdk.database.fetchDataItems('module-id');
```

### Security Note

- Never hardcode API keys or secrets
- Always inject configuration at runtime
- Use environment variables for sensitive values

## API Reference

### ModuleDataService Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| fetchDataItems | `moduleId: string`, `options?: FetchOptions` | `Promise<DataItem[]>` | Fetches data items for module |
| createDataItem | `moduleId: string`, `data: DataItem` | `Promise<DataItem>` | Creates new data item |
| updateDataItem | `moduleId: string`, `id: string`, `data: Partial<DataItem>` | `Promise<DataItem>` | Updates existing data item |
| deleteDataItem | `moduleId: string`, `id: string` | `Promise<void>` | Deletes data item |

## Testing

Test coverage reports are generated in `coverage/` directory when running:

```bash
pnpm test
```

See individual test files in `tests/` directory for implementation details.

## Related Packages

- [@mixcore/api](https://github.com/mixcore/javascript-sdk/tree/main/packages/api): API client foundation
- [@mixcore/base](https://github.com/mixcore/javascript-sdk/tree/main/packages/base): Base service classes

## License

Mixcore Community License (MCL). See [LICENSE](../../LICENSE) for details.
