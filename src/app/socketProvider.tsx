/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { addProspect, updateLastChat } from "@/store/features/prospect";
import { setChats } from "@/store/features/chatSlice";
import { createContext, useMemo, useContext, useEffect, ReactNode,} from "react";
import { useDispatch } from "react-redux";
import io, { Socket } from "socket.io-client";
import { useSession } from "next-auth/react";
import { addNotification } from "@/store/features/notificationslice";
type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null);

interface SocketProviderProps {
  children: ReactNode;
}

const SocketProvider = ({ children }: SocketProviderProps) => {

  const session:any = useSession();
  //console.log(session)

const user = session?.data?.user?.user
const dispatch = useDispatch()

  const socket = useMemo(() => io(process.env.NEXT_PUBLIC_API_URL, { 
    withCredentials: true,
    autoConnect: false, // Prevent auto-connection before setup
    reconnectionAttempts: 3,
    reconnectionDelay: 3000,
  }), []);

  useEffect(() => {
    //console.log("Connecting to WebSocket...");
    socket.connect();

    socket.on("connect", () => {
      //console.log("✅ WebSocket Connected!");
      
      // Subscribe automatically (replace with dynamic phone number if needed)
      const buisnessId = user?.buisness?.id??"";
      const userId = user?.id??""
      //console.log(user)
      //console.log(phoneNumber) // Replace with dynamic number if necessary
      socket.emit("subscribe", buisnessId);
      console.log(`🔔 Subscribed to ${buisnessId}`);

      socket.emit("subscribe", userId);
      console.log(`🔔 Subscribed to ${userId}`);
    });

    // Listen for incoming messages
    socket.on("messages", (data) => {
      //console.log("📩 New Messages:", data);
      dispatch(setChats([data]));
      dispatch(updateLastChat(data));
     ; // Append new messages
    });

    // Listen for new prospect events
    socket.on("prospect", (data) => {
      //console.log("👤 New Prospect Created:", data);
      dispatch(addProspect([data]));
      
      
    });

    socket.on("notification", (data) => {
      dispatch(addNotification([data]));
    })


    return () => {
      //console.log("❌ Disconnecting WebSocket...");
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
