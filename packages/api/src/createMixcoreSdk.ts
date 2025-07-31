// SDK bootstrap entrypoint for Mixcore JavaScript SDK
// Usage: import { createMixcoreSdk } from '@mixcore/apis';
import { UserServices } from '@mixcore/user';
import { TemplateService } from '@mixcore/template';
import { FileServices } from '@mixcore/file';
import { ConfigurationServices } from '@mixcore/config';
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
