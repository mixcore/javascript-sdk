# @mixcore/file

File handling utilities for Mixcore SDK. Provides services for file uploads, downloads and management.

## Features

- File upload/download operations
- File metadata handling
- Progress tracking
- TypeScript types for file operations
- Framework-agnostic implementation

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

const fileService = new FileServices();

// Upload a file
await fileService.uploadFile(file, {
  onProgress: (progress) => console.log(`Uploaded ${progress}%`)
});

// Download a file
const downloaded = await fileService.downloadFile('file-id');
```

### Supported File Types

- Images (PNG, JPG, GIF, SVG)
- Documents (PDF, DOCX, XLSX)
- Archives (ZIP)
- Text files

## API Reference

| Method | Description |
|--------|-------------|
| `uploadFile(file, options)` | Uploads file with progress tracking |
| `downloadFile(id)` | Downloads file by ID |
| `getFileMetadata(id)` | Gets file metadata |
| `deleteFile(id)` | Deletes file |

## Error Handling

```typescript
try {
  await fileService.uploadFile(file);
} catch (error) {
  if (error.name === 'FileTooLargeError') {
    console.error('File exceeds maximum size');
  }
}
```

## Related Packages

- [@mixcore/api](https://github.com/mixcore/javascript-sdk/tree/main/packages/api): API client foundation
- [@mixcore/database](https://github.com/mixcore/javascript-sdk/tree/main/packages/database): Database services

## License

Mixcore Community License (MCL). See [LICENSE](../../LICENSE) for details.
