import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CardType } from "./cardsSlice";
import { FETCH_LINK, RootState } from "./store";


export const fetchCardById = createAsyncThunk(
    "cards/fetchById",
    async (id: string) => {
        const response = await axios.get<CardType>(`${FETCH_LINK}${id}`)
        return response.data;
    }
)

const initialState = {
    isOpened: false,
    status: "",
    data: {
        title: "",
        description: "",
        image: "",
        id: ""
    }
};

export const fullCardSlice = createSlice({
    name: "fullCard",
    initialState,
    reducers: {
        openPopup: (state) => {
            state.isOpened = true;
        },
        closePopup: (state) => {
            state.isOpened = false;
            state.data = {
                title: "",
                description: "",
                image: "",
                id: ""
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCardById.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isOpened = true;
            state.status = "success";
        });
        builder.addCase(fetchCardById.pending, (state) => {
            state.status = "loading";
        });
    },
});

export const selectFullCardSlice = (state: RootState) => state.fullCardSlice;
export const { openPopup, closePopup } = fullCardSlice.actions;
export default fullCardSlice.reducer;