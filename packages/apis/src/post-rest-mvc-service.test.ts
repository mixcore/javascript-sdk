import { PostRestMvcService } from './post-rest-mvc-service';

describe('PostRestMvcService', () => {
  it('should instantiate with correct endpoint', () => {
    const service = new PostRestMvcService();
    expect(service.endpoint).toBe('mix-post/mvc');
  });
});
