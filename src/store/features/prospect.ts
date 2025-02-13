import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findIndex, merge } from "lodash";

// Define Prospect type
export type Prospect = {
  id: string;
  shopify_id?: string;
  name?: string;
  email?: string;
  image?: string;
  phoneNo: string;
  lead: string;
  last_Online:Date;
  assignedToId?: string;
  businessId?: string;
  buisnessNo: string;
  is_blocked: boolean;
  created_at: string;
  updated_at: string;
};

interface ProspectState {
  prospects: Prospect[]; // List of all prospects
  selectedProspect: Prospect | null; // Holds the selected prospect
  openMenuModal: boolean;
  lastchattime: string;
}

const initialState: ProspectState = {
  prospects: [],
  selectedProspect: null,
  openMenuModal: false,
  lastchattime: "",
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
          state.prospects[index] = merge({}, state.prospects[index], incomingProspect);
          
          // If this prospect is selected, update the selected prospect as well
          if (state.selectedProspect && state.selectedProspect.id === incomingProspect.id) {
            state.selectedProspect = merge({}, state.selectedProspect, incomingProspect);
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
    updateLastChatTime: (state, action: PayloadAction<string>) => {
      state.lastchattime = action.payload;
    },
  },
});

export const {
  addProspect,
  selectProspect,
  removeProspect,
  clearSelectedProspects,
  toggleMenuModal,
  updateLastChatTime,
} = ProspectSlice.actions;

export default ProspectSlice.reducer;
