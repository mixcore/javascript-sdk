// SDK bootstrap entrypoint for Mixcore JavaScript SDK
// Usage: import { createMixcoreSdk } from '@mixcore/apis';
import { UserServices } from './user/user-services';
import { TemplateService } from './template/template-service';
import { FileServices } from './file/file-services';
import { ConfigurationServices } from './config/configuration-services';
// ...import other domain services as needed

export interface MixcoreSdkConfig {
  [key: string]: any;
}

export function createMixcoreSdk(config: MixcoreSdkConfig) {
  return {
    user: new UserServices(config),
    template: new TemplateService(config),
    file: new FileServices(config),
    config: new ConfigurationServices(config),
    // ...add other domain services here
  };
}
