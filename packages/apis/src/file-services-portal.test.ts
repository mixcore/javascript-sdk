import { ApiService } from './api-services';
import { FileServicesPortal } from './file-services-portal';

describe('FileServicesPortal', () => {
  let api: ApiService;
  let fileServices: FileServicesPortal;

  beforeEach(() => {
    api = new ApiService({ apiBaseUrl: 'http://localhost/api/' });
    fileServices = new FileServicesPortal(api);
  });

  it('should instantiate', () => {
    expect(fileServices).toBeInstanceOf(FileServicesPortal);
  });

  it('should call getFile', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ file: 'data' }) });
    const result = await fileServices.getFile('folder', 'file.txt');
    expect(result).toEqual({ file: 'data' });
  });

  it('should call saveFile', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    const result = await fileServices.saveFile({ name: 'file.txt' });
    expect(result).toEqual({ success: true });
  });

  // Add more tests for other methods as needed
});
