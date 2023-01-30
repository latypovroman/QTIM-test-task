import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cardsSlice from "./cardsSlice";
import fullCardSlice from "./fullCardSlice";
export const FETCH_LINK = "https://6082e3545dbd2c001757abf5.mockapi.io/qtim-test-work/posts/"

export const store = configureStore({
    reducer: {
        cardsSlice,
        fullCardSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();