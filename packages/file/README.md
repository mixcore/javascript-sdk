# @mixcore/file

File handling utilities for Mixcore SDK. Provides services for file uploads, downloads and management.

## Features

- File upload/download operations
- File metadata handling
- Progress tracking
- TypeScript types for file operations
- Framework-agnostic implementation
- Secure configuration injection

## Installation

```bash
npm install @mixcore/file
# or
pnpm add @mixcore/file
```

## Usage

### Basic Example

```typescript
import { FileServices } from '@mixcore/file';
import { ApiService } from '@mixcore/api';

const fileService = new FileServices({
  api: new ApiService({
    apiBaseUrl: process.env.MIXCORE_API_URL, // Never hardcode URLs!
    apiKey: process.env.MIXCORE_API_KEY // Never hardcode secrets!
  })
});

// Upload a file
await fileService.uploadFile(file, {
  onProgress: (progress) => console.log(`Uploaded ${progress}%`)
});
```

### Security Note

- Never hardcode API endpoints or credentials
- Always inject configuration at runtime
- Validate file types and sizes before processing
- Use environment variables for sensitive values

## API Reference

### FileServices Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| uploadFile | `file: File`, `options?: UploadOptions` | `Promise<FileUploadResult>` | Uploads file with progress tracking |
| downloadFile | `id: string` | `Promise<Blob>` | Downloads file by ID |
| getFileMetadata | `id: string` | `Promise<FileMetadata>` | Gets file metadata |
| deleteFile | `id: string` | `Promise<void>` | Deletes file |

## Testing

Test coverage reports are generated in `coverage/` directory when running:

```bash
pnpm test
```

See test files in `tests/` directory for implementation details.

## Framework Integration

This package works with all JavaScript frameworks. See the [main README](../../README.md#framework-integration) for framework-specific integration examples.

### Package-specific Usage

```typescript
// Example: Using with Vue
import { FileServices } from '@mixcore/file';
import { ApiService } from '@mixcore/api';

const fileService = new FileServices({
  api: new ApiService({
    apiBaseUrl: import.meta.env.VITE_API_URL,
    apiKey: import.meta.env.VITE_API_KEY
  })
});

// Upload file in Vue component
const upload = async (file) => {
  await fileService.uploadFile(file);
};
```

## Related Packages

- [@mixcore/api](https://github.com/mixcore/javascript-sdk/tree/main/packages/api): API client foundation
- [@mixcore/database](https://github.com/mixcore/javascript-sdk/tree/main/packages/database): Database services

## License

Mixcore Community License (MCL). See [LICENSE](../../LICENSE) for details.
