import { SignalRService } from "./signalr-service";
import {
  SignalRConfig,
  SignalRMessage,
  ChatMessage,
  StreamingMessage,
  StreamingChatState,
  StreamingMessageHandler,
  StreamingStateHandler,
} from "./types";

export interface ChatServiceConfig extends Omit<SignalRConfig, "hubUrl"> {
  baseUrl?: string;
  hubPath?: string;
}

export class ChatService {
  private signalRService: SignalRService;
  private messageQueue: string[] = [];
  private isProcessing = false;
  private streamingState: StreamingChatState = {
    isStreaming: false,
    currentMessage: "",
  };
  private streamingHandlers: StreamingMessageHandler[] = [];
  private streamingStateHandlers: StreamingStateHandler[] = [];
  private regularMessageHandlers: ((message: any) => void)[] = [];

  constructor(config: ChatServiceConfig) {
    const baseUrl =
      config.baseUrl ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "https://mixcore.net");
    const hubPath = config.hubPath || "/hub/llm_chat";

    const signalRConfig: SignalRConfig = {
      ...config,
      hubUrl: `${baseUrl}${hubPath}`,
    };

    this.signalRService = new SignalRService(signalRConfig);
    this.setupMessageHandlers();
  }

  private setupMessageHandlers(): void {
    this.signalRService.onMessage(
      "receive_message",
      (message: SignalRMessage) => {
        // Process the message and convert to ChatMessage if needed
        this.handleIncomingMessage(message);
      }
    );
  }

  private handleIncomingMessage(message: SignalRMessage): void {
    console.log("🔍 Raw incoming message:", message);
    console.log("🔍 Message keys:", Object.keys(message || {}));
    console.log("🔍 Message action:", message?.action);
    console.log("🔍 Message data keys:", Object.keys(message?.data || {}));
    // Check if this is a streaming format message
    if (this.isStreamingMessage(message)) {
      console.log("✅ Detected as streaming format message");
      this.appendStreamingChunk(message.data.response, message.data.role);
      return;
    }
    // Handle based on action like AngularJS code
    if (message?.action) {
      console.log("🎯 Processing action-based message:", message.action);
      switch (message.action) {
        case "NewMessage":
          this.handleNewMessage(message);
          break;
        case "NewStreamingMessage":
          this.handleNewStreamingMessage(message);
          break;
        default:
          console.log("⚠️ Unknown action:", message.action);
      }
    } else {
      console.log("📄 Processing as regular message (no action)");
      // Fallback for regular SignalR messages
      this.handleRegularMessage(message);
    }
  }

  private handleNewMessage(message: SignalRMessage): void {
    console.log("📤 Handling NewMessage:", message);
    console.log("🔍 Current streaming state:", this.streamingState.isStreaming);

    if (this.streamingState.isStreaming) {
      console.log(
        "🏁 NewMessage received during streaming - treating as completion signal"
      );
      // Use NewMessage as the completion trigger for streaming
      this.completeStreaming();
      return;
    }

    if (message?.data?.response) {
      console.log(
        "✅ Processing NewMessage as regular message (no streaming was active)"
      );
      // Reset streaming data and add final message (like AngularJS)
      this.streamingState.isStreaming = false;
      this.streamingState.currentMessage = "";
      this.notifyStreamingStateChange();

      // Emit as regular message
      this.emitRegularMessage({
        id: Date.now().toString(),
        content: message.data.response,
        role: message.data.role,
        timestamp: new Date().toISOString(),
      });
    }
  }

  private handleNewStreamingMessage(message: SignalRMessage): void {
    console.log("🌊 Handling NewStreamingMessage:", message);
    if (message?.data?.response) {
      console.log("✅ Found response data:", message.data.response);
      // Accumulate streaming content (like AngularJS)
      this.appendStreamingChunk(message.data.response, message.data.role);
    } else {
      console.log("❌ No response data found in streaming message");
    }
  }

  private handleRegularMessage(message: SignalRMessage): void {
    console.log("📄 Handling regular message - this bypasses streaming");
    console.log("📄 Streaming state:", this.streamingState.isStreaming);

    // Only process if not currently streaming
    if (!this.streamingState.isStreaming && message?.data?.response) {
      console.log(
        "✅ Processing regular message response:",
        message.data.response
      );

      let content = "";
      if (typeof message.data.response === "string") {
        content = message.data.response;
        console.log("📝 String content:", content);
      } else if (
        typeof message.data.response === "object" &&
        message.data.response !== null
      ) {
        const responseObj = message.data.response as any;
        if (responseObj.content) {
          content = responseObj.content;
        } else if (responseObj.data) {
          content = responseObj.data;
        } else if (responseObj.message) {
          content = responseObj.message;
        } else {
          content = JSON.stringify(message.data.response, null, 2);
        }
        console.log("📝 Object content extracted:", content);
      } else {
        content = String(message.data.response);
        console.log("📝 Converted content:", content);
      }

      if (
        content.trim() &&
        !content.includes('"type":1') &&
        !content.includes('"type":3')
      ) {
        console.log("🚀 Emitting regular message with content:", content);
        this.emitRegularMessage({
          id: Date.now().toString(),
          content: content,
          role: "assistant" as const,
          timestamp: new Date().toISOString(),
        });
      } else {
        console.log("❌ Content filtered out or contains streaming markers");
      }
    } else {
      console.log(
        "❌ Regular message skipped - streaming active or no response"
      );
    }
  }

  private isStreamingMessage(message: any): boolean {
    // Check for action-based pattern (like AngularJS)
    if (message?.action === "NewStreamingMessage") {
      return true;
    }

    // Check direct streaming format (type 1/3 pattern)
    if (
      typeof message === "object" &&
      typeof message.type === "number" &&
      typeof message.target === "string" &&
      Array.isArray(message.arguments)
    ) {
      return true;
    }

    // Check if it's a SignalR message containing streaming data
    if (message?.data?.response && typeof message.data.response === "string") {
      // Check if response contains streaming JSON pattern
      const response = message.data.response;
      return (
        (response.includes('"type":1') &&
          response.includes('"target":"receive_message"')) ||
        response.includes('"type":3') ||
        response.includes('"action":"NewStreamingMessage"')
      );
    }

    return false;
  }

  private handleStreamingMessage(rawMessage: any): void {
    try {
      let streamingMessage: StreamingMessage;

      // If it's wrapped in SignalR format, extract the streaming data
      if (
        rawMessage?.data?.response &&
        typeof rawMessage.data.response === "string"
      ) {
        const response = rawMessage.data.response;
        console.log("Parsing streaming response:", response);

        // Split by }{ pattern to handle concatenated JSON objects
        const jsonChunks = response.split("}{").map((chunk, index, array) => {
          if (index === 0 && array.length > 1) {
            return chunk + "}";
          } else if (index === array.length - 1 && array.length > 1) {
            return "{" + chunk;
          } else if (array.length > 1) {
            return "{" + chunk + "}";
          }
          return chunk;
        });

        for (const jsonChunk of jsonChunks) {
          try {
            const parsed = JSON.parse(jsonChunk);
            if (parsed.type === 1 || parsed.type === 3) {
              console.log("Processing streaming chunk:", parsed);
              this.processStreamingMessage(parsed);
            }
          } catch (e) {
            console.warn("Failed to parse streaming chunk:", jsonChunk, e);
          }
        }
        return;
      }

      // Direct streaming message format
      streamingMessage = rawMessage as StreamingMessage;
      this.processStreamingMessage(streamingMessage);
    } catch (error) {
      console.error("Error handling streaming message:", error);
    }
  }

  private processStreamingMessage(streamingMessage: StreamingMessage): void {
    console.log("Processing streaming message:", streamingMessage);

    // Handle streaming data messages (type 1)
    if (
      streamingMessage.type === 1 &&
      streamingMessage.target === "receive_message"
    ) {
      for (const arg of streamingMessage.arguments) {
        if (arg.action === "NewStreamingMessage" && arg.data.isSuccess) {
          console.log("Appending chunk:", arg.data.response);
          this.appendStreamingChunk(arg.data.response);
        }
      }
    }

    // Handle completion messages (type 3)
    if (streamingMessage.type === 3) {
      console.log("Completing streaming");
      this.completeStreaming();
    }
  }

  private appendStreamingChunk(chunk: string, role?: string): void {
    if (chunk == "[DONE]") {
      console.log("📝 completing streaming:");
      this.completeStreaming();
      return;
    }
    if (role === "system") {
      return;
    }
    console.log("📝 Appending streaming chunk:", chunk);

    if (!this.streamingState.isStreaming) {
      console.log("🚀 Starting new stream");
      this.streamingState.isStreaming = true;
      this.streamingState.currentMessage = "";
      this.notifyStreamingStateChange();
    }

    this.streamingState.currentMessage += chunk;
    console.log(
      "📄 Current streaming message:",
      this.streamingState.currentMessage
    );

    // Notify streaming handlers
    this.streamingHandlers.forEach((handler) => {
      try {
        console.log("🔔 Calling streaming handler with chunk:", chunk);
        handler(chunk, false);
      } catch (error) {
        console.error("Error in streaming handler:", error);
      }
    });
  }

  private completeStreaming(): void {
    console.log("🏁 Completing streaming...");
    console.log(
      "📄 Final streaming content:",
      this.streamingState.currentMessage
    );

    if (this.streamingState.isStreaming) {
      // Notify completion to UI handlers first
      console.log("📢 Notifying streaming handlers of completion");
      this.streamingHandlers.forEach((handler) => {
        try {
          handler("", true); // Empty chunk with isComplete = true
        } catch (error) {
          console.error("Error in streaming completion handler:", error);
        }
      });

      // Reset streaming state
      console.log("🔄 Resetting streaming state");
      this.streamingState.isStreaming = false;
      const finalMessage = this.streamingState.currentMessage;
      this.streamingState.currentMessage = "";

      this.notifyStreamingStateChange();

      console.log(
        "✅ Streaming completed. Final message length:",
        finalMessage.length
      );
    } else {
      console.log("⚠️ completeStreaming called but streaming was not active");
    }
  }

  private notifyStreamingStateChange(): void {
    this.streamingStateHandlers.forEach((handler) => {
      try {
        handler({ ...this.streamingState });
      } catch (error) {
        console.error("Error in streaming state handler:", error);
      }
    });
  }

  private emitRegularMessage(message: any): void {
    console.log("Emitting regular message:", message);
    if (message.role === "system") {
      console.log(`✅ Not emitting ${message.role} message`);
      return; // Skip system messages
    }
    this.regularMessageHandlers.forEach((handler) => {
      try {
        handler(message);
      } catch (error) {
        console.error("Error in regular message handler:", error);
      }
    });
  }

  public onRegularMessage(handler: (message: any) => void): void {
    this.regularMessageHandlers.push(handler);
  }

  public offRegularMessage(handler: (message: any) => void): void {
    const index = this.regularMessageHandlers.indexOf(handler);
    if (index > -1) {
      this.regularMessageHandlers.splice(index, 1);
    }
  }

  public async start(): Promise<void> {
    await this.signalRService.start();
  }

  public async stop(): Promise<void> {
    await this.signalRService.stop();
  }

  public async sendMessage(content: string): Promise<void> {
    if (!content.trim()) {
      throw new Error("Message content cannot be empty");
    }

    try {
      await this.signalRService.invoke("AskAI", content);
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    }
  }

  public async sendChatMessage(message: ChatMessage): Promise<void> {
    await this.sendMessage(message.content);
  }

  public onMessageReceived(handler: (message: SignalRMessage) => void): void {
    this.signalRService.onMessage("receive_message", handler);
  }

  public offMessageReceived(handler: (message: SignalRMessage) => void): void {
    this.signalRService.offMessage("receive_message", handler);
  }

  public onStreaming(handler: StreamingMessageHandler): void {
    console.log(
      "📋 Registering streaming handler. Current handlers:",
      this.streamingHandlers.length
    );
    this.streamingHandlers.push(handler);
    console.log(
      "📋 After registration, total handlers:",
      this.streamingHandlers.length
    );
  }

  public offStreaming(handler: StreamingMessageHandler): void {
    const index = this.streamingHandlers.indexOf(handler);
    if (index > -1) {
      this.streamingHandlers.splice(index, 1);
    }
  }

  public onStreamingStateChange(handler: StreamingStateHandler): void {
    this.streamingStateHandlers.push(handler);
  }

  public offStreamingStateChange(handler: StreamingStateHandler): void {
    const index = this.streamingStateHandlers.indexOf(handler);
    if (index > -1) {
      this.streamingStateHandlers.splice(index, 1);
    }
  }

  public getStreamingState(): StreamingChatState {
    return { ...this.streamingState };
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
    this.streamingHandlers.length = 0;
    this.streamingStateHandlers.length = 0;
    this.regularMessageHandlers.length = 0;
    this.signalRService.dispose();
  }
}
