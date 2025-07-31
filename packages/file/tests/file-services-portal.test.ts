import { ApiService } from '@mixcore/api';
import { FileServicesPortal } from '../src/file-services';

describe('FileServicesPortal', () => {
  let api: ApiService;
  let fileServices: FileServicesPortal;

  beforeEach(() => {
    api = new ApiService({ apiBaseUrl: 'https://mixcore.net/api/' });
    fileServices = new FileServicesPortal(api);
  });

  it('should instantiate', () => {
    expect(fileServices).toBeInstanceOf(FileServicesPortal);
  });

  it('should call getFile', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ file: 'data' }) });
    const result = await fileServices.getFile('folder', 'file.txt');
    expect(result).toEqual({
      isSucceed: true,
      data: { file: 'data' }
    });
  });

  it('should call saveFile', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    const result = await fileServices.saveFile({ name: 'file.txt' });
    expect(result).toEqual({
      isSucceed: true,
      data: { success: true }
    });
  });

  // Add more tests for other methods as needed
});
