import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { find, findIndex, merge } from "lodash";

// Define Prospect type
export type Chat = {
  id: string;
  chatId: string;
  senderPhoneNo: string;
  receiverPhoneNo: string;
  sendDate: Date;
  template_used: boolean;
  template_name?: string;
  header_type?: string;
  header_value?: string;
  body_text?: string;
  footer_included: boolean;
  footer_text?: string;
  Buttons: string[];
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  Status: string;
  prospectId: string; // Ensures each chat is linked to a prospect
};

// Updated Prospect type now includes one chat (optional)
export type Prospect = {
  id: string;
  shopify_id?: string;
  name?: string;
  email?: string;
  image?: string;
  phoneNo: string;
  lead: string;
  last_Online: Date;
  assignedToId?: string;
  businessId?: string;
  buisnessNo: string;
  is_blocked: boolean;
  created_at: string;
  updated_at: string;
  chats?: Chat[]; // Added property to store one chat (e.g., latest chat)
};

interface ProspectState {
  prospects: Prospect[]; // List of all prospects
  selectedProspect: Prospect | null; // Holds the selected prospect
  openMenuModal: boolean;

}

const initialState: ProspectState = {
  prospects: [],
  selectedProspect: null,
  openMenuModal: false,

};

const ProspectSlice = createSlice({
  name: "prospect",
  initialState,
  reducers: {
    // Add or update prospects based on id using lodash functions
    addProspect: (state, action: PayloadAction<Prospect[]>) => {
      action.payload.forEach((incomingProspect) => {
        // Locate the existing prospect in the array by id
        const index = findIndex(state.prospects, { id: incomingProspect.id });
        if (index !== -1) {
          // Merge incoming changes with the existing prospect
          state.prospects[index] = merge(
            {},
            state.prospects[index],
            incomingProspect
          );

          // If this prospect is selected, update the selected prospect as well
          if (
            state.selectedProspect &&
            state.selectedProspect.id === incomingProspect.id
          ) {
            state.selectedProspect = merge(
              {},
              state.selectedProspect,
              incomingProspect
            );
          }
        } else {
          // If not found, add it as a new prospect
          state.prospects.push(incomingProspect);
        }
      });
    },

    // Select a prospect
    selectProspect: (state, action: PayloadAction<Prospect | null>) => {
      state.selectedProspect = action.payload;
    },

    // Remove a specific prospect by ID
    removeProspect: (state, action: PayloadAction<string>) => {
      state.prospects = state.prospects.filter((p) => p.id !== action.payload);
      if (state.selectedProspect?.id === action.payload) {
        state.selectedProspect = null;
      }
    },

    // Clear selected prospect
    clearSelectedProspects: (state) => {
      state.selectedProspect = null;
    },

    // Toggle the menu modal
    toggleMenuModal: (state) => {
      state.openMenuModal = !state.openMenuModal;
    },

    // Update the last chat time
   
    updateLastChat: (state, action: PayloadAction<Chat>) => {
      const incomingChat = action.payload;
      const prospect = find(state.prospects, { id: incomingChat.prospectId });
      if (prospect) {
        // Replace the entire chats array with the incoming chat
        prospect.chats = [incomingChat];
      }
    },
    clearlastChat: (state, action: PayloadAction<string>) => {
      //console.log("clearlastChat called with payload:", action.payload);
      const prospect = find(state.prospects, { id: action.payload });
      if (prospect) {
        //console.log("Found prospect:", prospect);
        // Clear the chats array for the prospect
        prospect.chats = [];
        //console.log("Chats cleared for prospect:", prospect.id);
      } else {
        console.warn("No prospect found with id:", action.payload);
      }
    }
    
    
  },
});

export const {
  addProspect,
  selectProspect,
  removeProspect,
  clearSelectedProspects,
  toggleMenuModal,
  updateLastChat,
  clearlastChat
} = ProspectSlice.actions;

export default ProspectSlice.reducer;
