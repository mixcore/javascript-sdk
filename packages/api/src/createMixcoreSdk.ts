// SDK bootstrap entrypoint for Mixcore JavaScript SDK
// Usage: import { createMixcoreSdk } from '@mixcore/apis';
import { ApiService } from './api-services';
import type {
  ApiServiceConfig,
  UserServices,
  TemplateService,
  FileServices,
  ConfigurationServices
} from '@mixcore/shared';

export interface MixcoreSdkConfig extends ApiServiceConfig {}

export interface MixcoreSdkOptions {
  user: UserServices;
  template: TemplateService;
  file: FileServices;
  config: ConfigurationServices;
  // ...add other domain services here
}

export function createMixcoreSdk(
  config: MixcoreSdkConfig,
  services: MixcoreSdkOptions
) {
  const api = new ApiService(config);
  
  return {
    api,
    ...services
  };
}
