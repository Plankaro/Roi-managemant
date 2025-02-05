/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface SelectedProspectState {
  selectedProspect: any | null; // Holds the selected prospect
  openMenuModal: boolean;
  lastchattime:string; //
}

const initialState: SelectedProspectState = {
  selectedProspect: null, 
  openMenuModal: false,
  lastchattime: ""
};

const selectedProspectSlice = createSlice({
  name: "selectedProspect",
  initialState,
  reducers: {
    // Action to select a prospect
    selectProspect: (state, action: PayloadAction<any>) => {
      state.selectedProspect = action.payload; // Update the selected prospect
    },
    // Action to clear the selected prospect
    clearProspect: (state) => {
      state.selectedProspect = null;
    },

    toggleMenuModal: (state) => {
      state.openMenuModal =!state.openMenuModal;
    },
    updateLastChatTime: (state, action: PayloadAction<string>) => {
      state.lastchattime = action.payload;
    },
    // Add more reducers here if needed...

  },
});

export const { selectProspect, clearProspect, toggleMenuModal,updateLastChatTime } = selectedProspectSlice.actions;

export default selectedProspectSlice.reducer;
