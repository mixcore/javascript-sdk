# @mixcore/config

Configuration management services for Mixcore SDK. Provides loading, validation and access to application configuration.

## Features

- Load configuration from multiple sources (files, env vars, etc.)
- Type-safe configuration access
- Schema validation
- Environment variable support
- Hot-reloading for development
- Secure by design: Prevents hardcoded secrets

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

// Load config from environment variables
const config = await configService.loadConfiguration({
  apiBaseUrl: process.env.MIXCORE_API_URL,
  apiKey: process.env.MIXCORE_API_KEY // Never hardcode secrets!
});

// Access config values
console.log(config.apiBaseUrl);
```

### Security Best Practices

- Never commit configuration files with secrets
- Use environment variables for sensitive values
- Validate configuration schema in production
- Rotate secrets regularly

## Configuration Schema

```typescript
interface AppConfig {
  apiBaseUrl: string; // Required
  apiKey?: string; // Optional
  debug?: boolean; // Optional
  // ...other app-specific settings
}
```

## API Reference

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| loadConfiguration | `config?: Partial<AppConfig>` | `Promise<AppConfig>` | Loads and validates config |
| getConfig | None | `AppConfig` | Returns current config |
| watchForChanges | None | `void` | Enables hot-reloading |

## Testing

Test coverage reports are generated in `coverage/` directory when running:

```bash
pnpm test
```

See test files in `tests/` directory for implementation details.

## Related Packages

- [@mixcore/api](https://github.com/mixcore/javascript-sdk/tree/main/packages/api): API client using this config
- [@mixcore/base](https://github.com/mixcore/javascript-sdk/tree/main/packages/base): Base service classes

## License

Mixcore Community License (MCL). See [LICENSE](../../LICENSE) for details.
