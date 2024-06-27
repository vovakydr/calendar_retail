import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ---TEST URL---
const url = "/custom_web_template.html?object_id=7042022170616100717";

export const fetchDropDownTypes = createAsyncThunk(
  "typesDropdown/fetchDropDownTypes",
  async(_, thunkAPI) => {
    try {
      const response = await axios.get(url);
      if (response.data) {
        const data = response.data;

        const dropDownTypes = data.category.reduce((acc, item) => {
          acc[item.name] = item.id;
          return acc;
        }, {});
        return dropDownTypes;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

const initialState = {
  info: "Категория",
  isOpen: false,
  typeValue: "",
  dropDownTypes: {},
  loading: 'idle',
  error: null,
};

const testData = {
  "Коучинг. Командные мероприятия": "category_9",
  "Обучение для всех": "category_8",
  "Обучение для действующих руководителей и сотрудников": "category_7",
  "Обучение для новых руководителей": "category_6",
  "Обучение для новых сотрудников": "category_5"
};

const typesDropdownSlice = createSlice({
  name: "typesDropdown",
  initialState,
  reducers: {
    toggleDropdown: (state) => {
      state.isOpen = !state.isOpen;
    },
    selectType: (state, action) => {
      state.info = action.payload;
      state.isOpen = !state.isOpen;
      state.typeValue = state.dropDownTypes[action.payload] || "";
    },
    resetType: (state) => {
      state.info = "Направление";
      state.typeValue = "";
    },
    initialDirectionRender: (state, action) => {
      state.info = action.payload;
      state.typeValue = state.dropDownTypes[action.payload] || "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDropDownTypes.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchDropDownTypes.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.dropDownTypes = action.payload;
      })
      .addCase(fetchDropDownTypes.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
        state.dropDownTypes = testData;
      });
  },
});

export const { toggleDropdown, selectType, resetType, initialDirectionRender } =
  typesDropdownSlice.actions;

export default typesDropdownSlice.reducer;
