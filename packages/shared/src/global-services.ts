// global-services.ts
// Migrated from legacy global.js. This file provides framework-agnostic SDK hooks for third-party analytics and social integrations.
// NOTE: All DOM-coupled logic is commented out and must be handled by the consumer app, not the SDK.

/**
 * SDK placeholder for Facebook SDK integration.
 * Consumer apps should load Facebook SDK as needed.
 */
export function loadFacebookSdk(options?: { locale?: string }) {
  // Example (to be used in consumer app, not SDK):
  // (function (d, s, id) {
  //   var js, fjs = d.getElementsByTagName(s)[0];
  //   if (d.getElementById(id)) return;
  //   js = d.createElement(s); js.id = id;
  //   js.src = `https://connect.facebook.net/${options?.locale || 'en_US'}/sdk.js`;
  //   fjs.parentNode.insertBefore(js, fjs);
  // })(document, 'script', 'facebook-jssdk');
  throw new Error('Facebook SDK integration must be handled by the consumer app.');
}

/**
 * SDK placeholder for Google Analytics Embed API integration.
 * Consumer apps should load Google Analytics as needed.
 */
export function loadGoogleAnalyticsEmbedApi() {
  // Example (to be used in consumer app, not SDK):
  // (function (w, d, s, g, js, fs) {
  //   g = w.gapi || (w.gapi = {});
  //   g.analytics = { q: [], ready: function (f) { this.q.push(f); } };
  //   js = d.createElement(s); fs = d.getElementsByTagName(s)[0];
  //   js.src = 'https://apis.google.com/js/platform.js';
  //   fs.parentNode.insertBefore(js, fs);
  //   js.onload = function () { g.load('analytics'); };
  // })(window, document, 'script');
  throw new Error('Google Analytics integration must be handled by the consumer app.');
}

/**
 * SDK placeholder for Facebook Customer Chat integration.
 * Consumer apps should load Facebook Customer Chat as needed.
 */
export function loadFacebookCustomerChat(locale: string = 'vi_VN') {
  // Example (to be used in consumer app, not SDK):
  // (function (d, s, id) {
  //   var js, fjs = d.getElementsByTagName(s)[0];
  //   if (d.getElementById(id)) return;
  //   js = d.createElement(s); js.id = id;
  //   js.src = `https://connect.facebook.net/${locale}/sdk/xfbml.customerchat.js`;
  //   fjs.parentNode.insertBefore(js, fjs);
  // })(document, 'script', 'facebook-jssdk');
  throw new Error('Facebook Customer Chat integration must be handled by the consumer app.');
}
