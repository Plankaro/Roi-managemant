import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uniqBy } from "lodash";

// Define enums
export enum MessageStatus {
  Pending = "pending",
  Sent = "sent",
  Delivered = "delivered",
  Read = "read",
}

export enum HeaderType {
  Image = "Image",
  Video = "Video",
  Document = "Document",
}

export enum BodyType {
  Image = "image",
  Text = "text",
  Document = "document",
}

// Define Chat interface
interface Chat {
  id: string;
  chatId: string;
  senderPhoneNo: string;
  receiverPhoneNo: string;
  sendDate: Date;
  template_used: boolean;
  template_name?: string;
  header_type?: HeaderType;
  header_url?: string;
  body_type: BodyType;
  body_attachmentUrl: string[];
  body_text?: string;
  footer_included: boolean;
  footer_url?: string;
  footer_text?: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  Status: MessageStatus;
  prospectId?: string;
}

// Define Chat state
interface ChatState {
  chats: Chat[];
}

// Set initial state
const initialState: ChatState = {
  chats: [],
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
  },
});

// Export actions and reducer
export const { setChats } = chatSlice.actions;
export default chatSlice.reducer;
