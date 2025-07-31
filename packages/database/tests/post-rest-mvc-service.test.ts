import { PostRestMvcService } from '../src/post-rest-mvc-service';

describe('PostRestMvcService', () => {
  it('should instantiate with correct endpoint', () => {
    const service = new PostRestMvcService({});
    expect((service as any).endpoint).toBe('mix-post/mvc');
  });
});
