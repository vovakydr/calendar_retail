import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ---TEST URL---
const url = "/custom_web_template.html?object_id=7042022170616100717";

export const fetchDropdownFormatEducation = createAsyncThunk(
    "formatEducation/fetchDropdownFormatEducation",
    async(_, thunkAPI) => {
        try {
            const response = await axios.get(url);
            if(response.data){
                const data = response.data;
                const dropdownFormatEducation = data.format_education.reduce((acc,item) => {
                    acc[item.name] = item.id;
                    return acc;
                },{});
                return dropdownFormatEducation;
            }
        }catch(err){
            return thunkAPI.rejectWithValue(err.response);
        }
    }
);

const initialState = {
    info: "Формат обучения",
    isOpen: false,
    typeValue: "",
    dropdownFormatEducation: {},
    loading: 'idle',
    error: null,
};

const testData = {
    "Очный тренинг":"format_1][Очный тренинг",
    "Digital тренинг":"format_2][Digital тренинг",
    "Полевой визит":"format_3][Полевой визит",
    "Бизнес-игра":"format_4][Бизнес-игра",
    "Онлайн тренинг":"format_5][Онлайн тренинг",
    "Опрос":"format_6][Опрос",
    "Экзамен":"format_7][Экзамен",
    "Тест":"format_8][Тест"
};

const formatEducationSlice = createSlice({
    name:"formatEducation",
    initialState,
    reducers: {
        toggleDropdown: (state) => {
            state.isOpen = !state.isOpen;
        },
        selectType: (state, action) => {
            state.info = action.payload;
            state.isOpen = !state.isOpen;
            state.typeValue = state.dropdownFormatEducation[action.payload] || ";"
        },
        resetType: (state) => {
            state.info = "Формат обучения";
            state.typeValue = "";
        },
        initialDirectionRender: (state, action) => {
            state.info = action.payload;
            state.typeValue = state.dropdownFormatEducation[action.payload] || ";"
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDropdownFormatEducation.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(fetchDropdownFormatEducation.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.dropdownFormatEducation = action.payload;
            })
            .addCase(fetchDropdownFormatEducation.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message;
                state.dropdownFormatEducation = testData;
            });
    },
});

export const { toggleDropdown, selectType, resetType, initialDirectionRender } = formatEducationSlice.actions;

export default formatEducationSlice.reducer;