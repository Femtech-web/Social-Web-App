/* eslint-disable no-unused-vars */

import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messages: []
    },
    reducers: {
        addMessages: (state, action) => {
            state.messages.push(action.payload);
        },

        populateMessages: (state, action) => {
            state.messages = action.payload;
        }
    }
})

export const { addMessages, populateMessages } = messageSlice.actions
export default messageSlice.reducer;
