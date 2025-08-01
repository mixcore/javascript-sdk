# @mixcore/signalr

SignalR real-time communication services for Mixcore SDK.

## Features

- **Real-time Communication**: Full SignalR client implementation with connection management
- **Type Safety**: Complete TypeScript support with strongly typed interfaces
- **Chat Services**: High-level chat service abstraction for common messaging patterns
- **Connection Management**: Automatic reconnection, state management, and error handling
- **Security**: Token-based authentication with configurable access token factory
- **Framework Agnostic**: Can be used in any JavaScript/TypeScript environment

## Installation

```bash
npm install @mixcore/signalr
# or
yarn add @mixcore/signalr
# or
pnpm add @mixcore/signalr
```

## Usage

### Basic SignalR Service

```typescript
import { SignalRService } from '@mixcore/signalr';

const service = new SignalRService({
  hubUrl: 'https://your-hub-url/hub',
  accessTokenFactory: () => localStorage.getItem('access_token'),
  automaticReconnect: true,
  onConnected: () => console.log('Connected'),
  onDisconnected: (error) => console.log('Disconnected', error)
});

// Start connection
await service.start();

// Listen for messages
service.onMessage('receive_message', (message) => {
  console.log('Received:', message);
});

// Send messages
await service.invoke('SendMessage', 'Hello World');
```

### Chat Service

```typescript
import { ChatService } from '@mixcore/signalr';

const chatService = new ChatService({
  baseUrl: 'https://your-api-url',
  hubPath: '/hub/chat',
  accessTokenFactory: () => localStorage.getItem('access_token')
});

// Start chat service
await chatService.start();

// Send messages
await chatService.sendMessage('Hello, AI!');

// Listen for responses
chatService.onMessageReceived((message) => {
  if (message.data.response) {
    console.log('AI Response:', message.data.response);
  }
});
```

## API Reference

### SignalRService

Main service class for SignalR connections.

#### Constructor Options

- `hubUrl`: SignalR hub URL
- `accessTokenFactory`: Function that returns the access token
- `logLevel`: SignalR logging level (optional)
- `automaticReconnect`: Enable automatic reconnection (default: true)
- `onConnected`: Connection established callback
- `onDisconnected`: Connection lost callback
- `onReconnecting`: Reconnection started callback
- `onReconnected`: Reconnection completed callback
- `onError`: Error callback

#### Methods

- `start()`: Start the SignalR connection
- `stop()`: Stop the SignalR connection
- `invoke(method, ...args)`: Invoke a server method and wait for response
- `send(method, ...args)`: Send a message to server without waiting for response
- `onMessage(event, handler)`: Register message handler
- `offMessage(event, handler)`: Unregister message handler
- `isConnected()`: Check if connection is active
- `getConnectionState()`: Get current connection state
- `dispose()`: Clean up resources

### ChatService

High-level service for chat functionality.

#### Constructor Options

- `baseUrl`: Base URL for the SignalR hub (optional, defaults to current origin)
- `hubPath`: Hub path (optional, defaults to '/hub/llm_chat')
- All SignalRService options except `hubUrl`

#### Methods

- `sendMessage(content)`: Send a chat message
- `sendChatMessage(message)`: Send a structured chat message
- `onMessageReceived(handler)`: Listen for incoming messages
- `offMessageReceived(handler)`: Stop listening for messages
- All SignalRService methods

## Security Considerations

- Always use HTTPS in production
- Implement proper access token validation
- Sanitize all incoming messages
- Use environment variables for configuration
- Implement rate limiting on the server side

## Framework Integration

This package is framework-agnostic and can be used with:

- Vanilla JavaScript/TypeScript
- React
- Vue
- Angular
- Svelte/SvelteKit
- Node.js

## License

See LICENSE file in the repository root.