import { ApiService } from '@mixcore/api';
import { ConfigurationServices, ConfigurationUpload } from '../src/configuration-services';
import { Blob } from 'node:buffer';

describe('ConfigurationServices', () => {
  let api: ApiService;
  let configServices: ConfigurationServices;

  beforeEach(() => {
    api = new ApiService({ apiBaseUrl: 'http://localhost/api/' });
    configServices = new ConfigurationServices(api);
  });

  it('should instantiate', () => {
    expect(configServices).toBeInstanceOf(ConfigurationServices);
  });

  it('should throw if no file provided', async () => {
    await expect(configServices.uploadConfiguration({} as ConfigurationUpload)).rejects.toThrow('No file provided');
  });

  it('should call uploadConfiguration', async () => {
    const fakeFile = new Blob(['test'], { type: 'text/plain' }) as unknown as File;
    Object.defineProperty(fakeFile, 'name', { value: 'test.txt' });
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    const result = await configServices.uploadConfiguration({ file: fakeFile, folder: 'f', title: 't', description: 'd' });
    expect(result).toEqual({ success: true });
    expect(globalThis.fetch).toHaveBeenCalled();
  });
});
