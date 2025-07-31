
# @mixcore/apis

Mixcore API client package. Provides TypeScript classes for all Mixcore REST endpoints, including modular, domain-driven services for posts, related attributes, and more.

## Usage

```ts
import { PostRestMvcService } from '@mixcore/apis';
const postService = new PostRestMvcService({ /* config */ });
```

## Services
- `PostRestMvcService`: REST client for `mix-post/mvc`
- `RelatedAttributeDataRestFormService`: REST client for `mix-database-data-association/form`
- `RelatedAttributeDataRestPortalService`: REST client for `mix-database-data-association/portal`
- `RelatedAttributeSetRestPortalService`: REST client for `related-mix-database/portal`

## Extensibility
All services are framework-agnostic and accept injectable config. Extend or compose as needed for your domain.

## License
SEE LICENSE IN LICENSE
