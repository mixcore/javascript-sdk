# @mixcore/database

Database domain services and types for Mixcore SDK. Provides data access, querying, and persistence services.

## Features

- REST API clients for Mixcore database operations
- TypeScript interfaces for database models
- Data validation and transformation
- Modular service architecture

## Installation

```bash
npm install @mixcore/database
# or
pnpm add @mixcore/database
```

## Usage

### Basic Example

```typescript
import { ModuleDataService } from '@mixcore/database';
import { ApiService } from '@mixcore/api';

const api = new ApiService({ apiBaseUrl: 'https://api.mixcore.net' });
const dataService = new ModuleDataService({ api });

// Fetch data items
const result = await dataService.fetchDataItems('module-id');
```

### Services

- `ModuleDataService`: Core data operations
- `MixDatabaseDataRestPortalService`: Portal-specific data services
- `RelatedAttributeDataRestPortalService`: Related attribute services

## API Reference

See [API Documentation](API.md) for detailed method signatures and types.

## Related Packages

- [@mixcore/api](https://github.com/mixcore/javascript-sdk/tree/main/packages/api): API client foundation
- [@mixcore/base](https://github.com/mixcore/javascript-sdk/tree/main/packages/base): Base service classes

## License

Mixcore Community License (MCL). See [LICENSE](../../LICENSE) for details.
