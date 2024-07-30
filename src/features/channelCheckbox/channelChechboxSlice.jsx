import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ---TEST URL---
//const url = "/custom_web_template.html?object_id=7042022170616100717";
// ---PROD URL---
const url = "/custom_web_template.html?object_id=7042022170616100717";

export const fetchChannels = createAsyncThunk(
    "channelCheckbox/fetchChannels",
    async(_, thunkAPI) => {
        try{
            const response = await axios.get(url);
            if(response.data) {
                const data = response.data;
                const channels = data.channel.map((item) => ({
                    id: item.id,
                    name: item.name,
                    selected: false,
                }));
                return channels;
            }
        } catch(err){
            return thunkAPI.rejectWithValue(err.response);
        }
    }
);

const initialState ={
    channels: [],
    loading: 'idle',
    error: null,
};

const channelCheckboxSlice = createSlice({
    name: "channelCheckbox",
    initialState,
    reducers: {
        toggleChannel: (state, action) => {
            const channel = state.channels.find((c) => c.id === action.payload);
            if(channel){
                channel.selected = !channel.selected;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChannels.pending, (state) => {
                state.loading = 'loading';
                state.error = false;
            })
            .addCase(fetchChannels.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.channels = action.payload;
            })
            .addCase(fetchChannels.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { toggleChannel } = channelCheckboxSlice.actions;

export default channelCheckboxSlice.reducer;