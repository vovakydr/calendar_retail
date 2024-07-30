import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "/custom_web_template.html?object_id=7042022170616100717";

export const fetchEventFormats = createAsyncThunk(
    "eventFormats/fetchEventFormats",
    async(_, thunkAPI) => {
        try {
            const response = await axios.get(url);
            if (response.data) {
                const data = response.data;
                const dropdownFormats = data.event_form.event_form.map(item => ({
                    id: item.id,
                    name: item.name
                }));
                return dropdownFormats;
            }
        } catch (err) {
            console.log("@@@ err - " +err)
            return thunkAPI.rejectWithValue(err.response);
        }
    }
);

const eventFormatSlice = createSlice({
    name: 'eventFormats',
    initialState: {
        eventFormats: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEventFormats.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEventFormats.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.eventFormats = action.payload;
            })
            .addCase(fetchEventFormats.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default eventFormatSlice.reducer;