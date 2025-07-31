import { RelatedAttributeDataRestFormService } from './related-attribute-data-rest-form-service';

describe('RelatedAttributeDataRestFormService', () => {
  it('should instantiate with correct endpoint', () => {
    const service = new RelatedAttributeDataRestFormService();
    // @ts-expect-error endpoint is protected/private in base, this is a placeholder for real test
    expect(service.endpoint).toBe('mix-database-data-association/form');
  });
});
