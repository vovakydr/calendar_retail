import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ---TEST URL---
const url = "/custom_web_template.html?object_id=7042022170616100717";

export const fetchMacros = createAsyncThunk(
    "macroCheckbox/fetchMacros",
    async(_, thunkAPI) => {
        try{
            const response = await axios.get(url);
            if(response.data) {
                const data = response.data;
                const macros = data.macro.map((item) => ({
                    id: item.id,
                    name: item.name,
                    selected: false,
                }));
                return macros;
            }
        }catch(err){
            return thunkAPI.rejectWithValue(err.response);
        }
    }
);

const initialState = {
    macros: [],
    loading: 'idle',
    error: null,
};

const macroCheckboxSlice = createSlice({
    name: "macroCheckbox",
    initialState,
    reducers: {
        toggleMacro: (state, action) => {
            const macro = state.macros.find((m) => m.id === action.payload);
            if(macro) {
                macro.selected = !macro.selected;
            }
        },
        selectAllMacros: (state) => {
            state.macros.forEach((macro) => {
                macro.selected = true;
            });
        },
        deselectAllMacros: (state) => {
            state.macros.forEach((macro) => {
                macro.selected = false;
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMacros.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(fetchMacros.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.macros = action.payload;
            })
            .addCase(fetchMacros.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { toggleMacro, selectAllMacros, deselectAllMacros } = macroCheckboxSlice.actions;

export default macroCheckboxSlice.reducer;