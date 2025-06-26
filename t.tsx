import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { demoFinList } from "./demo-data";
import type { finObject } from "./types"; // if you've moved types to a shared file

// Specify the type for the slice's state
const initialState: finObject[] = demoFinList;

const finSlice = createSlice({
    name: "finance",
    initialState,
    reducers: {
        // Add your reducer functions here, like:
        // addFinanceEntry: (state, action: PayloadAction<finObject>) => {
        //   state.push(action.payload);
        // }
    },
});

export const { } = finSlice.actions;
export default finSlice.reducer;
