import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    
    initialState: {
        isAuthenticate: false,
    },

    reducers: {
        addUser: (state, actions) => {
            state.isAuthenticate = true
        },

        removeUser: (state, actions) => {
            state.isAuthenticate = false
        }
    }
})

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer