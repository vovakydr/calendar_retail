import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ---TEST URL---
const url = "/custom_web_template.html?object_id=7042022170616100717";

export const fetchDropDownMacros = createAsyncThunk(
  "macrosDropdown/fetchDropDownMacros",
  async(_, thunkAPI) => {
    try {
      const response = await axios.get(url);
      if (response.data) {
        const data = response.data;
        data.macro.forEach((item, index) => {
          console.log(`Macro item ${index}:`, item); // Выводим каждый объект отдельно
        });
        const dropDownMacros = data.macro.reduce((acc, item) => {
          acc[item.name] = item.id;
          return acc;
        }, {});
        console.log("dropDownMacros - " +dropDownMacros)
        return dropDownMacros;
      }
    } catch (err) {
      console.log("@@@ err - " +err)
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

const initialState = {
  info: "Макрорегион",
  isOpen: false,
  macroValue: "",
  dropDownMacros: {},
  loading: 'idle',
  error: null,
};




const testData = {
    "Сибирский1": "macroregion_1][Сибирский",
    "Дальневосточный": "macroregion_2][Дальневосточный",
    "Московский": "macroregion_3",
    "Северо-Западный": "macroregion_4",
    "Центр-Юг": "macroregion_7",
    "Волга-Урал": "macroregion_8"
};

const macrosDropdownSlice = createSlice({
  name: "macrosDropdown",
  initialState,
  reducers: {
    toggleDropdownMacros: (state) => {
      state.isOpen = !state.isOpen;
    },
    selectMacros: (state, action) => {
      state.info = action.payload;
      state.isOpen = !state.isOpen;
      state.macroValue = state.dropDownMacros[action.payload] || "";
    },
    resetMacros: (state) => {
      state.info = "Макрорегион";
      state.macroValue = "";
    },
    initialDirectionRenderMacros: (state, action) => {
      state.info = action.payload;
      state.macroValue = state.dropDownMacros[action.payload] || "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDropDownMacros.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchDropDownMacros.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.dropDownMacros = action.payload;
      })
      .addCase(fetchDropDownMacros.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
        state.dropDownMacros = testData;
      });
  },
});

export const { toggleDropdownMacros, selectMacros, resetMacros, initialDirectionRenderMacros  } =
  macrosDropdownSlice.actions;

export default macrosDropdownSlice.reducer;
