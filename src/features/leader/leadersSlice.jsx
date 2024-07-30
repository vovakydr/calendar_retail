import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

//test url
//const url = "/custom_web_template.html?object_id=7042022170616100720";
//prod url
const url = "/custom_web_template.html?object_id=7046837683945305260";


export const fetchLeadersData = createAsyncThunk('leaders/fetchLeadersData', async () => {
    const response = await axios.get(url);
    return response.data;
});

export const searchLeaders = createAsyncThunk(
    "leaders/searcgLeaders",
    async (query) => {
        const response = await axios.get(`${url}&search=${query}`);
        return response.data;
    }
);

const initialState = {
    defaultLeader: null,
    allLeaders: [],
    status: 'idle',
    error: null,
};

const leadersSlice = createSlice({
    name: "leaders",
    initialState,
    reducers:{
        // Опциональные редюсеры, если нужно будет управление состоянием вручную
        cleanLeaders: (state) => {
            state.allLeaders = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeadersData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLeadersData.fulfilled, (state, action) => {
                state.defaultLeader = action.payload.defaultLeader;
                //state.allLeaders = action.payload.allLeaders;
                state.status = 'succeeded';
            })
            .addCase(fetchLeadersData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(searchLeaders.pending, (state) => {
                state.status = "loading";
            })
            .addCase(searchLeaders.fulfilled, (state, action) => {
                console.log("Search results:", action.payload);
                if (action.payload && Array.isArray(action.payload.allLeaders)) {
                    state.allLeaders = action.payload.allLeaders;
                } else {
                    state.allLeaders = [];  // fallback to empty array if payload is not as expected
                }
                state.status = "succeeded";
            })
            .addCase(searchLeaders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { cleanLeaders } = leadersSlice.actions

export default leadersSlice.reducer;