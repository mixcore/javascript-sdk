export interface SignalRMessage {
  from?: string | null;
  title?: string | null;
  message?: string | null;
  deviceId?: string | null;
  action: string;
  type: string;
  data: {
    isSuccess: boolean;
    response: string;
    result: string;
  };
  createdDateTime: string;
}

export interface SignalRConfig {
  hubUrl: string;
  accessTokenFactory: () => string | null;
  logLevel?: number;
  automaticReconnect?: boolean;
  onConnected?: () => void;
  onDisconnected?: (error?: Error) => void;
  onReconnecting?: () => void;
  onReconnected?: () => void;
  onError?: (error: Error) => void;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: string;
  attachments?: string[];
  projectId?: string;
  metadata?: Record<string, any>;
}

export type MessageHandler = (message: SignalRMessage) => void;
export type ConnectionStateHandler = (state: string) => void;
export type ErrorHandler = (error: Error) => void;