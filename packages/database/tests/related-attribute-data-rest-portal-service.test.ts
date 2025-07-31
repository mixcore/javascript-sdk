import { RelatedAttributeDataRestPortalService } from '../src/related-attribute-data-rest-portal-service';
import { ApiService } from '@mixcore/api';

describe('RelatedAttributeDataRestPortalService', () => {
  it('should instantiate with correct endpoint', () => {
    const api = new ApiService({ apiBaseUrl: 'http://localhost/api/' });
    const service = new RelatedAttributeDataRestPortalService(api);
    // @ts-expect-error endpoint is protected/private in base, this is a placeholder for real test
    expect(service.endpoint).toBe('mix-database-data-association/portal');
  });
});
