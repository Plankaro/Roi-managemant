"use client";
import { createContext, useMemo, useContext, useEffect, ReactNode } from "react";
import io, { Socket } from "socket.io-client";


type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null);

interface SocketProviderProps {
  children: ReactNode;
}

const SocketProvider = ({ children }: SocketProviderProps) => {
  const socket = useMemo(() => io(process.env.NEXT_PUBLIC_API_URL, { 
    withCredentials: true,
    autoConnect: false, // Better connection control
    reconnectionAttempts: 3,
    reconnectionDelay: 3000
  }), []);

  // Automatically connect on mount
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
};

export { SocketProvider, useSocket };