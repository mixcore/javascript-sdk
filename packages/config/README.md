# @mixcore/config

Configuration management services for Mixcore SDK. Provides loading, validation and access to application configuration.

## Features

- Load configuration from multiple sources (files, env vars, etc.)
- Type-safe configuration access
- Schema validation
- Environment variable support
- Hot-reloading for development

## Installation

```bash
npm install @mixcore/config
# or
pnpm add @mixcore/config
```

## Usage

### Basic Example

```typescript
import { ConfigurationServices } from '@mixcore/config';

const configService = new ConfigurationServices();

// Load config from default location
const config = await configService.loadConfiguration();

// Access config values
console.log(config.apiBaseUrl);
```

### Custom Configuration Path

```typescript
const config = await configService.loadConfiguration('/path/to/config.json');
```

### Environment Variables

Configuration values can be overridden by environment variables prefixed with `MIXCORE_`:

```bash
MIXCORE_API_BASE_URL=https://api.mixcore.net npm start
```

## Configuration Schema

The expected configuration format:

```typescript
interface AppConfig {
  apiBaseUrl: string;
  apiKey?: string;
  debug?: boolean;
  // ...other app-specific settings
}
```

## API Reference

| Method | Description |
|--------|-------------|
| `loadConfiguration(path?)` | Loads and validates config |
| `getConfig()` | Returns current config |
| `watchForChanges()` | Enables hot-reloading |

## Related Packages

- [@mixcore/api](https://github.com/mixcore/javascript-sdk/tree/main/packages/api): API client using this config
- [@mixcore/base](https://github.com/mixcore/javascript-sdk/tree/main/packages/base): Base service classes

## License

Mixcore Community License (MCL). See [LICENSE](../../LICENSE) for details.
