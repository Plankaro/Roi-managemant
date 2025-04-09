import { createSlice } from '@reduxjs/toolkit';
import { subDays } from 'date-fns';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

// Set default to last 14 days
const today = new Date();
const initialState: DateRange = {
  startDate: subDays(today, 14),
  endDate: today,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
  },
});

export const { setDateRange } = analyticsSlice.actions;

export default analyticsSlice.reducer;
