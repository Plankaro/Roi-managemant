/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uniqBy } from "lodash";


// Define enums
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
  Prospect?: Prospect;
  prospectId?: string;
};

export enum MessageStatus {
  PENDING = "pending",
  SENT = "sent",
  DELIVERED = "delivered",
  READ = "read",
  FAILED = "failed",
}

export enum HeaderType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  DOCUMENT = "DOCUMENT",
  TEXT = "TEXT",
}

export enum BodyType {
  IMAGE = "image",
  TEXT = "text",
  DOCUMENT = "document",
}

export type Prospect = {
  id: string;
  name: string;
  phoneNo: string;
  email?: string;
};


// Define Chat state
interface ChatState {
  chats: Chat[];
  selectedTemplates:any
}

// Set initial state
const initialState: ChatState = {
  chats: [],
  selectedTemplates:null
};

// Replace with actual phone number
const myPhoneNo = "15551365364";

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      const filteredChats = action.payload.filter(
        (chat) => chat.senderPhoneNo === myPhoneNo || chat.receiverPhoneNo === myPhoneNo
      );

      filteredChats.forEach((newChat) => {
        const existingChat = state.chats.find((chat) => chat.chatId === newChat.chatId);

        if (existingChat) {
          // Update status if message exists
          existingChat.Status = newChat.Status;
        } else {
          // Add new unique chat
          state.chats.push(newChat);
        }
      });

      // Ensure uniqueness after all modifications
      state.chats = uniqBy(state.chats, "chatId");
    },
    setSelectedTemplates: (state, action: PayloadAction<any>) => {
      state.selectedTemplates = action.payload;
    },
  },
});

// Export actions and reducer
export const { setChats,setSelectedTemplates } = chatSlice.actions;
export default chatSlice.reducer;
