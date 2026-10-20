import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    
    initialState: {
        isAuthenticate: false,
        user: null
    },

    reducers: {
        addUser: (state, actions) => {
            state.isAuthenticate = true;
            state.user = actions.payload;
        },

        removeUser: (state, actions) => {
            state.isAuthenticate = false;
            state.user = null;
        },

        setUserFromServer: (state, actions) => {
            state.isAuthenticate = true;
            state.user = actions.payload;
        }
    }
})

export const { addUser, removeUser, setUserFromServer } = userSlice.actions;

export default userSlice.reducer

