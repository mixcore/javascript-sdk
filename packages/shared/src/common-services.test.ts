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

  it('sendMail should call getApiResult', async () => {
    await service.sendMail('Subject', 'Body');
    expect(config.getApiResult).toHaveBeenCalledWith({
      method: 'POST',
      url: '/portal/sendmail',
      data: { subject: 'Subject', body: 'Body' }
    });
  });

  it('getAllSettings should call getRestApiResult', async () => {
    await service.getAllSettings('en-US');
    expect(config.getRestApiResult).toHaveBeenCalledWith({
      method: 'GET',
      url: '/rest/shared/en-US/get-shared-settings'
    }, false, true);
  });

  it('generateSitemap should call getApiResult', async () => {
    await service.generateSitemap();
    expect(config.getApiResult).toHaveBeenCalledWith({
      method: 'GET',
      url: '/portal/sitemap'
    });
  });

  it('getPermissions should call getRestApiResult', async () => {
    await service.getPermissions();
    expect(config.getRestApiResult).toHaveBeenCalledWith({
      method: 'GET',
      url: '/rest/shared/permissions'
    });
  });
});
