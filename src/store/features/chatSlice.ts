/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { find, uniqBy } from "lodash";

// Define Chat Type
export type Chat = {
  id: string;
  chatId: string;
  senderPhoneNo: string;
  receiverPhoneNo: string;
  sendDate: Date;
  template_used: boolean;
  template_name?: string;
  header_type?: HeaderType;
  header_value?: string;
  body_text?: string;
  footer_included: boolean;
  footer_text?: string;
  Buttons: string[];
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  Status: MessageStatus;
  prospectId: string; // Ensures each chat is linked to a prospect
};


// Define Enums
export enum MessageStatus {
  PENDING = "pending",
  SENT = "sent",
  DELIVERED = "delivered",
  READ = "read",
  FAILED = "failed",
  SKIPPED = "skipped",
}

export enum HeaderType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  DOCUMENT = "DOCUMENT",
  TEXT = "TEXT",
}

// Define Grouped Chats State
interface GroupedChat {
  prospectId: string;
  chats: Chat[];
}

// Define Chat State
interface ChatState {
  chats: GroupedChat[];
}

// Initial State
const initialState: ChatState = {
  chats: [],
};

// Replace with actual user phone number
// const myPhoneNo = "15551365364";

// Chat Slice
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      action.payload.forEach((newChat) => {
        // Find the prospect's chat group
        let prospectChatGroup = state.chats.find(
          (group) => group.prospectId === newChat.prospectId
        );

        if (!prospectChatGroup) {
          // Create a new group if it doesn't exist
          prospectChatGroup = {
            prospectId: newChat.prospectId,
            chats: [],
          };
          state.chats.push(prospectChatGroup);
        }

        // Check if the message already exists
        const existingChatIndex = prospectChatGroup.chats.findIndex(
          (chat) => chat.chatId === newChat.chatId
        );

        if (existingChatIndex !== -1) {
      
          prospectChatGroup.chats[existingChatIndex] = {
            ...prospectChatGroup.chats[existingChatIndex],
            Status: newChat.Status, // Update status safely
          };
        } else {
          // Add new chat for this prospect
          prospectChatGroup.chats.push(newChat);
        }

        // Ensure unique chats within this group
        prospectChatGroup.chats = uniqBy(prospectChatGroup.chats, "chatId");
      });
    },

    clearChats: (state, action: PayloadAction<string>) => {
      console.log("Clearing chats for prospect:", action.payload);
      const prospectChatGroup = find(state.chats, { prospectId: action.payload });
      console.log("delete",prospectChatGroup);
      if (prospectChatGroup) {
        prospectChatGroup.chats = [];
      }
    },
  },
});

// Export actions and reducer
export const { setChats, clearChats } = chatSlice.actions;
export default chatSlice.reducer;
