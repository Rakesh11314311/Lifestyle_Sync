import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { demoFinList } from "./demo-data";
import type { finObject } from "./demo-data";

const initialState: finObject[] = demoFinList;

const finSlice = createSlice({
    //following name will be the name will be how we get access to this slice "state.whatever_name_you_put_down_here"
    name: "finance",
    initialState,
    //following will conatin reducer functions that will work on current state
    reducers: {
        addFinanceEntry: (state, action: PayloadAction<finObject>) => {
            // Check if entry already exists for this month/year
            const existingIndex = state.findIndex(
                entry => entry.month === action.payload.month && entry.year === action.payload.year
            );

            if (existingIndex !== -1) {
                // Update existing entry
                state[existingIndex] = action.payload;
            } else {
                // Add new entry
                state.push(action.payload);
            }

            // Sort by year and month
            state.sort((a, b) => {
                if (a.year !== b.year) return a.year - b.year;
                return a.month - b.month;
            });
        }
    }
})

export const { addFinanceEntry } = finSlice.actions;
export default finSlice.reducer;
