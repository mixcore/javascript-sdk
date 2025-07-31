import { RelatedAttributeDataRestPortalService } from './related-attribute-data-rest-portal-service';

describe('RelatedAttributeDataRestPortalService', () => {
  it('should instantiate with correct endpoint', () => {
    const service = new RelatedAttributeDataRestPortalService();
    // @ts-expect-error endpoint is protected/private in base, this is a placeholder for real test
    expect(service.endpoint).toBe('mix-database-data-association/portal');
  });
});
