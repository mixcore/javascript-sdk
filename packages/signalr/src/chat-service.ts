import { SignalRService } from './signalr-service';
import { SignalRConfig, SignalRMessage, ChatMessage } from './types';

export interface ChatServiceConfig extends Omit<SignalRConfig, 'hubUrl'> {
  baseUrl?: string;
  hubPath?: string;
}

export class ChatService {
  private signalRService: SignalRService;
  private messageQueue: string[] = [];
  private isProcessing = false;

  constructor(config: ChatServiceConfig) {
    const baseUrl = config.baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://mixcore.net');
    const hubPath = config.hubPath || '/hub/llm_chat';
    
    const signalRConfig: SignalRConfig = {
      ...config,
      hubUrl: `${baseUrl}${hubPath}`,
    };

    this.signalRService = new SignalRService(signalRConfig);
    this.setupMessageHandlers();
  }

  private setupMessageHandlers(): void {
    this.signalRService.onMessage('receive_message', (message: SignalRMessage) => {
      // Process the message and convert to ChatMessage if needed
      this.handleIncomingMessage(message);
    });
  }

  private handleIncomingMessage(message: SignalRMessage): void {
    // Override this method in subclasses or provide callbacks for custom handling
    console.log('Received SignalR message:', message);
  }

  public async start(): Promise<void> {
    await this.signalRService.start();
  }

  public async stop(): Promise<void> {
    await this.signalRService.stop();
  }

  public async sendMessage(content: string): Promise<void> {
    if (!content.trim()) {
      throw new Error('Message content cannot be empty');
    }

    try {
      await this.signalRService.invoke('AskAI', content);
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  public async sendChatMessage(message: ChatMessage): Promise<void> {
    await this.sendMessage(message.content);
  }

  public onMessageReceived(handler: (message: SignalRMessage) => void): void {
    this.signalRService.onMessage('receive_message', handler);
  }

  public offMessageReceived(handler: (message: SignalRMessage) => void): void {
    this.signalRService.offMessage('receive_message', handler);
  }

  public onConnectionStateChange(handler: (state: string) => void): void {
    this.signalRService.onConnectionStateChange(handler);
  }

  public offConnectionStateChange(handler: (state: string) => void): void {
    this.signalRService.offConnectionStateChange(handler);
  }

  public onError(handler: (error: Error) => void): void {
    this.signalRService.onError(handler);
  }

  public offError(handler: (error: Error) => void): void {
    this.signalRService.offError(handler);
  }

  public isConnected(): boolean {
    return this.signalRService.isConnected();
  }

  public getConnectionState(): string {
    return this.signalRService.getConnectionState();
  }

  public dispose(): void {
    this.signalRService.dispose();
  }
}