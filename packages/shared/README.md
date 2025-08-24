# @mixcore/shared

Shared utilities and helpers for Mixcore SDK. Provides stateless TypeScript functions, constants and cross-domain helpers.

## Features

- **Utilities**: Common functions for crypto, translation, files, etc.
- **Constants**: Shared configuration values and defaults
- **Helpers**: Cross-cutting concerns and utilities
- **Framework-agnostic**: No UI/SPA dependencies
- **TypeScript-first**: Full type safety

## Installation

```bash
npm install @mixcore/shared
# or
pnpm add @mixcore/shared
```

## Usage

### Utility Functions

```typescript
import {
  formatCurrency,
  generateId,
  encryptData
} from '@mixcore/shared';

// Format money value
const formatted = formatCurrency(1234.56, 'USD');

// Generate unique ID
const id = generateId();

// Encrypt sensitive data
const encrypted = encryptData('secret', 'my-key');
```

### Constants

```typescript
import { DEFAULT_CONFIG } from '@mixcore/shared';

console.log(DEFAULT_CONFIG.apiBaseUrl);
```

## API Reference

All utilities and helper functions include comprehensive TSDoc/JSDoc documentation and auto-generated TypeScript declarations.

### Utility Functions

| Function | Description |
|----------|-------------|
| `formatCurrency()` | Formats money values |
| `generateId()` | Generates unique IDs |
| `encryptData()` | Encrypts sensitive data |
| `translate()` | Localization helper |

### Constants

| Constant | Description |
|----------|-------------|
| `DEFAULT_CONFIG` | Default configuration values |
| `SUPPORTED_LOCALES` | Available languages |
| `FILE_TYPES` | Supported file formats |

## Framework Integration

This package works with all JavaScript frameworks. See the [main README](../../README.md#framework-integration) for framework-specific integration examples.

### Package-specific Usage

```typescript
// Example: Using shared utilities in React
import { formatCurrency, encryptData } from '@mixcore/shared';

function ProductCard({ price }) {
  const formattedPrice = formatCurrency(price, 'USD');
  const encryptedId = encryptData(product.id, process.env.REACT_APP_ENCRYPT_KEY);

  return (
    <div>
      <p>Price: {formattedPrice}</p>
      <p>ID: {encryptedId}</p>
    </div>
  );
}
```

## Related Packages

- [@mixcore/api](https://github.com/mixcore/javascript-sdk/tree/main/packages/api): API client using these utilities
- [@mixcore/config](https://github.com/mixcore/javascript-sdk/tree/main/packages/config): Configuration management

## License

Mixcore Community License (MCL). See [LICENSE](../../LICENSE) for details.
