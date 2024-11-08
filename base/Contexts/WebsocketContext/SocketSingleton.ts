// SocketSingleton.ts
import { io, Socket } from 'socket.io-client';

// Define a Singleton class to manage a single instance of the WebSocket connection
class SocketSingleton {
  private static instance: SocketSingleton;
  private socket: Socket;
  private url: string;

  private constructor(url: string) {
    this.url = url;
    this.socket = io(url);  // Create a new socket instance

    // Event Handlers (can be customized)
    this.socket.on('connect', () => {
      console.log('Connected to server:', this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.socket.on('message', (data) => {
      console.log('Message received:', data);
    });
  }

  // Ensure only one instance of the socket is created
  public static getInstance(url: string): SocketSingleton {
    if (!SocketSingleton.instance) {
      SocketSingleton.instance = new SocketSingleton(url);
    }
    return SocketSingleton.instance;
  }

  // Get the socket instance
  public getSocket(): Socket {
    return this.socket;
  }

  // Emit an event with data
  public emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  // Listen to an event
  public on(event: string, callback: (...args: any[]) => void): void {
    this.socket.on(event, callback);
  }

  // Disconnect the socket
  public disconnect(): void {
    this.socket.disconnect();
  }
}

export default SocketSingleton;
