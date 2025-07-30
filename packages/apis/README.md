# @mixcore/apis

Framework-agnostic API clients for Mixcore modules.

## Usage

```ts
import { ApiService, ModuleArticleService, ModuleDataService, ModuleGalleryService } from '@mixcore/apis';

const api = new ApiService({ apiBaseUrl: 'https://api.example.com' });
const articles = new ModuleArticleService({ apiBaseUrl: 'https://api.example.com' });
```

## Features
- TypeScript-native
- Injectable configuration
- No SPA dependencies

## License
Mixcore Community License (MCL)
