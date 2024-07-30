import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//test url
//const URL = "/custom_web_template.html?object_id=7042022170616100726";
//prod url
const URL = "/custom_web_template.html?object_id=7054645342062408629";

export const searchPrograms = createAsyncThunk(
    "programs/searchPrograms",
    async(query, _thunkAPI) => {
        try{
            const response = await axios.get(`${URL}&method=get_program&search=${query}`);
            return response.data.programs;
        } catch(err) {
            return _thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const fetchProgramDetail = createAsyncThunk(
    "programs/fetchProgramDetails",
    async(programId, _thunkAPI) => {
        try {
            const response = await axios.get(`${URL}&method=get_detail&program_id=${programId}`);
            return response.data.program_info
        } catch(err) {
            return _thunkAPI.rejectWithValue(err.response.data);
        }
        
    }
)

const programSlice = createSlice({
    name: "programs",
    initialState: {
        programs: [],
        status: 'idle',
        error: null,
        programDetails: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchPrograms.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchPrograms.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.programs = action.payload;
            })
            .addCase(searchPrograms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchProgramDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProgramDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.programDetails = action.payload;
            })
            .addCase(fetchProgramDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default programSlice.reducer;