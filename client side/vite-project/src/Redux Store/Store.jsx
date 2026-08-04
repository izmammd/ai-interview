import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./Slice.jsx"

export const store = configureStore({
    reducer : {
        user : useReducer
    }
})