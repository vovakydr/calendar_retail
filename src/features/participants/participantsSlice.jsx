import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//test url
//const URL = "/custom_web_template.html?object_id=7042022170616100726";
//prod url
const URL = "/custom_web_template.html?object_id=7054645342062408629";

export const searchEmployees = createAsyncThunk(
    'participants/searchEmployees',
    async(query, _thunkAPI) => {
        try{
            const response = await axios.get(`${URL}&method=find_coll&search_coll=${query}`);
            const data = response.data.coll_info;
            return Array.isArray(data) ? data : [data];
        } catch(err) {
            return _thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

const participantsSlice = createSlice({
    name: 'participants',
    initialState: {
        searchResults: [],
        selectedParticipants: [],
        loading: 'idle',
        error: null,
    },
    reducers: {
        addParticipants: (state, action) => {
            state.selectedParticipants.push(action.payload);
        },
        removeParticipant: (state, action) => {
            state.selectedParticipants = state.selectedParticipants.filter(
                (participant) => participant.id !== action.payload
            );
        },
        addParticipantsFromExcel: (state, action) => {
            state.selectedParticipants = [
                ...state.selectedParticipants,
                ...action.payload,
            ];
        },
        resetParticipants: (state) => {
            state.selectedParticipants = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchEmployees.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(searchEmployees.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.searchResults = action.payload;
            })
            .addCase(searchEmployees.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload;
            });
    },
});

export const { addParticipants, removeParticipant, addParticipantsFromExcel, resetParticipants } = participantsSlice.actions;

export default participantsSlice.reducer;