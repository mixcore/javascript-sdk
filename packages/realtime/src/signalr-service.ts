import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { SignalRMessage, SignalRConfig, MessageHandler, ConnectionStateHandler, ErrorHandler } from './types';

export class SignalRService {
  private connection: HubConnection | null = null;
  private config: SignalRConfig;
  private messageHandlers: Map<string, MessageHandler[]> = new Map();
  private connectionStateHandlers: ConnectionStateHandler[] = [];
  private errorHandlers: ErrorHandler[] = [];

  constructor(config: SignalRConfig) {
    this.config = config;
    this.initializeConnection();
  }

  private initializeConnection(): void {
    const builder = new HubConnectionBuilder()
      .withUrl(this.config.hubUrl, {
        accessTokenFactory: this.config.accessTokenFactory,
      })
      .configureLogging(this.config.logLevel ?? LogLevel.Information);

    if (this.config.automaticReconnect !== false) {
      builder.withAutomaticReconnect();
    }

    this.connection = builder.build();
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    if (!this.connection) return;

    this.connection.onclose((error) => {
      this.notifyConnectionStateChange('Disconnected');
      if (error) {
        this.notifyError(error);
      }
      this.config.onDisconnected?.(error);
    });

    this.connection.onreconnecting(() => {
      this.notifyConnectionStateChange('Reconnecting');
      this.config.onReconnecting?.();
    });

    this.connection.onreconnected(() => {
      this.notifyConnectionStateChange('Connected');
      this.config.onReconnected?.();
    });

    // Register the main message handler
    this.connection.on('receive_message', (msg: string | SignalRMessage) => {
      try {
        const parsedMessage = this.parseMessage(msg);
        if (parsedMessage) {
          this.notifyMessageHandlers('receive_message', parsedMessage);
        }
      } catch (error) {
        console.warn('Failed to parse SignalR message:', error);
        this.notifyError(error as Error);
      }
    });
  }

  private parseMessage(msg: string | SignalRMessage): SignalRMessage | null {
    if (!msg) return null;

    let parsedMsg: SignalRMessage;

    if (typeof msg === 'string') {
      if (msg.indexOf('{') === 0) {
        parsedMsg = JSON.parse(msg);
      } else {
        return null;
      }
    } else {
      parsedMsg = msg;
    }

    // Validate and sanitize the message structure
    return {
      from: parsedMsg.from ?? null,
      title: parsedMsg.title ?? null,
      message: parsedMsg.message ?? null,
      deviceId: parsedMsg.deviceId ?? null,
      action: parsedMsg.action ?? '',
      type: parsedMsg.type ?? '',
      data: {
        isSuccess: parsedMsg.data?.isSuccess ?? false,
        response: parsedMsg.data?.response ?? '',
        result: parsedMsg.data?.result ?? '',
        role: parsedMsg.data?.role ?? '',
      },
      createdDateTime: parsedMsg.createdDateTime ?? new Date().toISOString(),
    };
  }

  public async start(): Promise<void> {
    if (!this.connection) {
      throw new Error('SignalR connection not initialized');
    }

    try {
      await this.connection.start();
      this.notifyConnectionStateChange('Connected');
      this.config.onConnected?.();
    } catch (error) {
      this.notifyError(error as Error);
      throw error;
    }
  }

  public async stop(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      this.notifyConnectionStateChange('Disconnected');
    }
  }

  public async invoke(methodName: string, ...args: any[]): Promise<any> {
    if (!this.connection || this.connection.state !== 'Connected') {
      throw new Error('SignalR connection is not active');
    }

    try {
      return await this.connection.invoke(methodName, ...args);
    } catch (error) {
      this.notifyError(error as Error);
      throw error;
    }
  }

  public async send(methodName: string, ...args: any[]): Promise<void> {
    if (!this.connection || this.connection.state !== 'Connected') {
      throw new Error('SignalR connection is not active');
    }

    try {
      await this.connection.send(methodName, ...args);
    } catch (error) {
      this.notifyError(error as Error);
      throw error;
    }
  }

  public onMessage(event: string, handler: MessageHandler): void {
    if (!this.messageHandlers.has(event)) {
      this.messageHandlers.set(event, []);
    }
    this.messageHandlers.get(event)!.push(handler);
  }

  public offMessage(event: string, handler: MessageHandler): void {
    const handlers = this.messageHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  public onConnectionStateChange(handler: ConnectionStateHandler): void {
    this.connectionStateHandlers.push(handler);
  }

  public offConnectionStateChange(handler: ConnectionStateHandler): void {
    const index = this.connectionStateHandlers.indexOf(handler);
    if (index > -1) {
      this.connectionStateHandlers.splice(index, 1);
    }
  }

  public onError(handler: ErrorHandler): void {
    this.errorHandlers.push(handler);
  }

  public offError(handler: ErrorHandler): void {
    const index = this.errorHandlers.indexOf(handler);
    if (index > -1) {
      this.errorHandlers.splice(index, 1);
    }
  }

  public getConnectionState(): string {
    return this.connection?.state ?? 'Disconnected';
  }

  public isConnected(): boolean {
    return this.connection?.state === 'Connected';
  }

  private notifyMessageHandlers(event: string, message: SignalRMessage): void {
    const handlers = this.messageHandlers.get(event);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(message);
        } catch (error) {
          console.error('Error in message handler:', error);
        }
      });
    }
  }

  private notifyConnectionStateChange(state: string): void {
    this.connectionStateHandlers.forEach(handler => {
      try {
        handler(state);
      } catch (error) {
        console.error('Error in connection state handler:', error);
      }
    });
  }

  private notifyError(error: Error): void {
    this.errorHandlers.forEach(handler => {
      try {
        handler(error);
      } catch (error) {
        console.error('Error in error handler:', error);
      }
    });
  }

  public dispose(): void {
    this.stop();
    this.messageHandlers.clear();
    this.connectionStateHandlers.length = 0;
    this.errorHandlers.length = 0;
    this.connection = null;
  }
}