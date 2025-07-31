import { RelatedAttributeSetRestPortalService } from './related-attribute-set-rest-portal-service';

describe('RelatedAttributeSetRestPortalService', () => {
  it('should instantiate with correct endpoint', () => {
    const service = new RelatedAttributeSetRestPortalService();
    // @ts-expect-error endpoint is protected/private in base, this is a placeholder for real test
    expect(service.endpoint).toBe('related-mix-database/portal');
  });
});
