import { RelatedAttributeSetRestPortalService } from '../src/related-attribute-set-rest-portal-service';
import { ApiService } from '@mixcore/api';

describe('RelatedAttributeSetRestPortalService', () => {
  it('should instantiate with correct endpoint', () => {
    const api = new ApiService({ apiBaseUrl: 'https://mixcore.net' });
    const service = new RelatedAttributeSetRestPortalService(api);
    // @ts-expect-error endpoint is protected/private in base, this is a placeholder for real test
    expect(service.endpoint).toBe('related-mix-database/portal');
  });
});
