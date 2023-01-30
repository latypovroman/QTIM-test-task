import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {FETCH_LINK, RootState} from "./store";
import axios from "axios";
import {fullCardSlice} from "./fullCardSlice";

export const fetchCards = createAsyncThunk(
    "cards/fetch",
    async () => {
        const response = await axios.get<CardType[]>(FETCH_LINK);
        return response.data;
    }
);


export type CardType = {
    id: string,
    image: string,
    title: string,
    description: string,
};

enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

interface ICards {
    cards: CardType[];
    limit: number
    status: Status | "";
}

const initialState: ICards = {
    cards: [],
    limit: 9,
    status: ""
};

export const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        changeLimit: (state, action) => {
            state.limit = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCards.pending, (state) => {
            state.status = Status.LOADING;
            state.cards = [];
        });
        builder.addCase(fetchCards.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.cards = action.payload;
        });
        builder.addCase(fetchCards.rejected, (state) => {
            state.status = Status.ERROR;
            state.cards = [];
        });
    },
});

export const { changeLimit } = cardsSlice.actions;
export const selectCardsSlice = (state: RootState) => state.cardsSlice;
export default cardsSlice.reducer;
