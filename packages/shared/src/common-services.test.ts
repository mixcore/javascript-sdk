import { CommonService } from './common-services';

describe('CommonService', () => {
  const config = {
    apiBaseUrl: 'https://mixcore.net',
    getApiResult: jest.fn(async (req) => ({ ok: true, ...req })),
    getRestApiResult: jest.fn(async (req) => ({ ok: true, ...req })),
    getAnonymousApiResult: jest.fn(async (req) => ({ ok: true, ...req })),
    onAlert: jest.fn(),
  };
  const service = new CommonService(config);

  it('loadJArrayData should call getAnonymousApiResult', async () => {
    await service.loadJArrayData('test');
    expect(config.getAnonymousApiResult).toHaveBeenCalled();
  });

  it('showAlertMsg should call onAlert', async () => {
    await service.showAlertMsg('Title', 'Message');
    expect(config.onAlert).toHaveBeenCalledWith('Title', 'Message');
  });
});
