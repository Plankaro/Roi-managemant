import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uniqBy } from "lodash";

// Define Prospect type
export type Prospect = {
  id: string;
  shopify_id?: string;
  name?: string;
  email?: string;
  image?: string;
  phoneNo: string;
  lead: string;
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
  name: "selectedProspect",
  initialState,
  reducers: {
    // Add a new prospect ensuring uniqueness
    addProspect: (state, action: PayloadAction<Prospect[]>) => {
      state.prospects = uniqBy([...state.prospects, ...action.payload], "id");
    },

    // Select a prospect (store it separately)
    selectProspect: (state, action: PayloadAction<Prospect | null>) => {
      state.selectedProspect = action.payload; // Assign the selected prospect
    },

    // Remove a specific prospect by ID
    removeProspect: (state, action: PayloadAction<string>) => {
      state.prospects = state.prospects.filter((p) => p.id !== action.payload);
      // If the removed prospect was selected, clear selection
      if (state.selectedProspect?.id === action.payload) {
        state.selectedProspect = null;
      }
    },

    // Clear all prospects
    clearSelectedProspects: (state) => {
      // state.prospects = [];
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
  updateLastChatTime 
} = ProspectSlice.actions;

export default ProspectSlice.reducer;
 