/* eslint-disable @typescript-eslint/no-explicit-any */
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
  assignedTo?: {
    id: string;
    name: string;
  };
  assignedToId?: string;
  businessId?: string;
  buisnessNo: string;
  is_blocked: boolean;
  created_at: string;
  updated_at: string;
  chats?: Chat[]; // Added property to store one chat (e.g., latest chat)
};

enum ConversationStatus {
  READ = "read",
  UNREAD = "unread",
}

enum AssignmentStatus {
  ASSIGNED = "assigned",
  UNASSIGNED = "unassigned",
}

export enum Lead {
  LEAD = "LEAD",
  LOST = "LOST",
  NEGOTIATION = "NEGOTIATION",
  OTHER = "OTHER",
}


export interface Filters {
  conversation_status: ConversationStatus[]
  Agents : string[]
  assignment_status: AssignmentStatus[]
  broadcast  : string[]
  campaigns   : string[]
  engagement_status: string[]
  tags: string[]

}

interface ProspectState {
  prospects: Prospect[]; // List of all prospects
  selectedProspect: Prospect | null; // Holds the selected prospect
  openMenuModal: boolean;
  filters : Filters

}

const initialState: ProspectState = {
  prospects: [],
  selectedProspect: null,
  openMenuModal: false,
  filters: {
    tags: [],
    conversation_status: [],
    Agents: [],
    assignment_status: [],
    broadcast: [],
    campaigns: [],
    engagement_status: []
  }
  


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

    setProspect: (state, action: PayloadAction<Prospect[]>) => {
      state.prospects = action.payload;
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
    },
    markLastChatAsRead: (state) => {
      const selectedProspect = state.selectedProspect;
      // Only proceed if selectedProspect exists and has a non-empty chats array
     
    
      // Only try to find and update the prospect if selectedProspect exists
      if (selectedProspect) {
        const prospect = find(state.prospects, { id: selectedProspect.id });
        // Ensure prospect exists and its chats array is defined and non-empty
        if (prospect && prospect.chats && prospect.chats.length > 0) {
          prospect.chats[0].Status = "read";
        }
      }
    },
    
    
    
    

    // Update filters
    toggleFilterOption: (state, action: PayloadAction<{ filterKey: keyof Filters; value: string }>) => {
      const { filterKey, value } = action.payload

      // Special handling for filters that should only allow one selection
      if (filterKey === "assignment_status" || filterKey === "conversation_status") {
        const currentValues = state.filters[filterKey] as string[]

        // If the value is already selected, deselect it
        if (currentValues.includes(value)) {
          state.filters[filterKey] = [] as any
        } else {
          // Otherwise, replace the entire array with just this value
          state.filters[filterKey] = [value] as any
        }
      } else {
        // For other filters, keep the existing multi-select behavior
        const currentValues = state.filters[filterKey] as string[]

        if (currentValues.includes(value)) {
          state.filters[filterKey] = currentValues.filter((v) => v !== value) as any
        } else {
          state.filters[filterKey] = [...currentValues, value] as any
        }
      }
    },


    
    clearAllFilters: (state) => {
      state.filters = {
        tags: [],
        conversation_status: [],
        Agents: [],
        assignment_status: [],
        broadcast: [],
        campaigns: [],
        engagement_status: [],
      }
    },
    
    
  },
});

export const {
  addProspect,
  selectProspect,
  removeProspect,
  clearSelectedProspects,
  toggleMenuModal,
  updateLastChat,
  clearlastChat,
  toggleFilterOption,
  clearAllFilters,
  setProspect,
  markLastChatAsRead
} = ProspectSlice.actions;

export default ProspectSlice.reducer;
