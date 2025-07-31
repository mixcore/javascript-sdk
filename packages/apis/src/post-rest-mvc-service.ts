// post-rest-mvc-service.ts
// Migrated from legacy RestMvcPostService (mix-post/mvc)
import { BaseRestService } from '../../base/src';

/**
 * REST client for Mixcore Post MVC endpoints.
 * Endpoint: mix-post/mvc
 */
export class PostRestMvcService extends BaseRestService {
  constructor(config?: any) {
    super('mix-post/mvc', config);
  }
  // Add additional methods as needed
}
