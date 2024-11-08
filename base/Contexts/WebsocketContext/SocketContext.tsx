// SocketContext.tsx
import React, { createContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import SocketSingleton from "./SocketSingleton";

// Define the context type
export interface SocketContextType {
  socket: Socket | null;
  emit: (event: string, data: any) => void;
  on: (event: string, callback: (...args: any[]) => void) => void;
}

// Create the context with the default value of null
export const SocketContext = createContext<SocketContextType | null>(null);

// SocketProvider component to provide the socket instance
interface SocketProviderProps {
  url: string;
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children, url }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = SocketSingleton.getInstance(url).getSocket();

    setSocket(socketInstance);

    // Cleanup: Disconnect socket on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  // Emit and on methods are passed to children via context
  const emit = (event: string, data: any) => {
    socket?.emit(event, data);
  };

  const on = (event: string, callback: (...args: any[]) => void) => {
    socket?.on(event, callback);
  };

  return <SocketContext.Provider value={{ socket, emit, on }}>{children}</SocketContext.Provider>;
};
