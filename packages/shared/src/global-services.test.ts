import { loadFacebookSdk, loadGoogleAnalyticsEmbedApi, loadFacebookCustomerChat } from './global-services';

describe('global-services', () => {
  it('should throw for loadFacebookSdk', () => {
    expect(() => loadFacebookSdk()).toThrow('Facebook SDK integration must be handled by the consumer app.');
  });

  it('should throw for loadGoogleAnalyticsEmbedApi', () => {
    expect(() => loadGoogleAnalyticsEmbedApi()).toThrow('Google Analytics integration must be handled by the consumer app.');
  });

  it('should throw for loadFacebookCustomerChat', () => {
    expect(() => loadFacebookCustomerChat()).toThrow('Facebook Customer Chat integration must be handled by the consumer app.');
  });
});
