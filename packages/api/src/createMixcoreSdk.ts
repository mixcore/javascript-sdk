// SDK bootstrap entrypoint for Mixcore JavaScript SDK
// Usage: import { createMixcoreSdk } from '@mixcore/apis';
import { ApiService } from './api-services';
import { UserServices } from '@mixcore/user';
import { TemplateService } from '@mixcore/template';
import { FileServices } from '@mixcore/shared';
import { FileServicesPortal } from '@mixcore/file';
import { ConfigurationServices } from '@mixcore/config';
// ...import other domain services as needed

export interface MixcoreSdkConfig {
  apiBaseUrl: string;
  apiKey?: string;
  [key: string]: any;
}

export function createMixcoreSdk(config: MixcoreSdkConfig) {
  const api = new ApiService(config);
  
  return {
    api,
    user: new UserServices(api),
    template: new TemplateService(api),
    file: new FileServicesPortal(api),
    config: new ConfigurationServices(api),
    // ...add other domain services here
  };
}
