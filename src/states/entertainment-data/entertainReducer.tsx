import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { demoMovieList } from "./demo-data";
import type { movieObject } from "./demo-data";

const initialState: movieObject[] = demoMovieList;

const entertainSlice = createSlice({
    //following name will be the name will be how we get access to this slice "state.whatever_name_you_put_down_here"
    name: "entertainment",
    initialState,
    //following will conatin reducer functions that will work on current state
    reducers: {
        addMovieEntry: (state, action: PayloadAction<movieObject>) => {
            // Check if entry already exists for this month/year
            const existingIndex = state.findIndex(
                entry => entry.title === action.payload.title
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
                if (a.title !== b.title) return a.title.localeCompare(b.title);
                return a.rating.localeCompare(b.rating);
            });
        }
    }
})

export const { addMovieEntry } = entertainSlice.actions;
export default entertainSlice.reducer;
