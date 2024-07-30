import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "/custom_web_template.html?object_id=7042022170616100717";

export const fetchSkillTypes = createAsyncThunk(
    "skillTypes/fetchSkillTypes",
    async(_, thunkAPI) => {
        try {
            const response = await axios.get(url);
            if(response.data) {
                const data = response.data;
                const dropdownSkillTypes = data.skillType.map(item => ({
                    id: item.id,
                    name: item.name
                }));
                return dropdownSkillTypes;
            }
        }catch(err){
            return thunkAPI.rejectWithValue(err.response);
        }
    }
);

const skillTypeSlice = createSlice({
    name: 'skillTypes',
    initialState: {
        skillTypes: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSkillTypes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSkillTypes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.skillTypes = action.payload;
            })
            .addCase(fetchSkillTypes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default skillTypeSlice.reducer;