import { SignalRService } from '../src/signalr-service';
import { SignalRConfig } from '../src/types';

// Mock the SignalR HubConnectionBuilder
jest.mock('@microsoft/signalr', () => ({
  HubConnectionBuilder: jest.fn().mockImplementation(() => ({
    withUrl: jest.fn().mockReturnThis(),
    configureLogging: jest.fn().mockReturnThis(),
    withAutomaticReconnect: jest.fn().mockReturnThis(),
    build: jest.fn().mockReturnValue({
      onclose: jest.fn(),
      onreconnecting: jest.fn(),
      onreconnected: jest.fn(),
      on: jest.fn(),
      start: jest.fn().mockResolvedValue(undefined),
      stop: jest.fn().mockResolvedValue(undefined),
      invoke: jest.fn().mockResolvedValue(undefined),
      send: jest.fn().mockResolvedValue(undefined),
      state: 'Connected'
    })
  })),
  LogLevel: {
    Information: 'Information'
  }
}));

describe('SignalRService', () => {
  let service: SignalRService;
  let config: SignalRConfig;

  beforeEach(() => {
    config = {
      hubUrl: 'https://test.com/hub',
      accessTokenFactory: () => 'test-token'
    };
    service = new SignalRService(config);
  });

  afterEach(() => {
    service.dispose();
  });

  it('should create an instance', () => {
    expect(service).toBeInstanceOf(SignalRService);
  });

  it('should start connection successfully', async () => {
    await expect(service.start()).resolves.toBeUndefined();
  });

  it('should stop connection successfully', async () => {
    await expect(service.stop()).resolves.toBeUndefined();
  });

  it('should check if connected', () => {
    expect(service.isConnected()).toBe(true);
  });

  it('should get connection state', () => {
    expect(service.getConnectionState()).toBe('Connected');
  });
});