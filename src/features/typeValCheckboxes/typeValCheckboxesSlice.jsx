import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ---TEST URL---
const url = "/custom_web_template.html?object_id=7042022170616100717";

export const fetchCheckboxesTypeVal = createAsyncThunk(
  "typeValCheckboxes/fetchCheckboxesTypeVal",
  async(_, thunkAPI) => {
    try {
      const response = await axios.get(url);
      if (response.data) {
        const data = response.data;
        data.macro.forEach((item, index) => {
          console.log(`TypeVal item ${index}:`, item); // Выводим каждый объект отдельно
        });
        const checkboxesTypeVal = data.type_val.reduce((acc, item) => {
          acc[item.name] = item.id;
          return acc;
        }, {});
        console.log("checkboxesTypeVal - " +checkboxesTypeVal)
        return checkboxesTypeVal;
      }
    } catch (err) {
      console.log("@@@ err - " +err)
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

const initialState = {
  info: "Ценности",
  isOpen: false,
  TypeVal: "",
  checkboxesTypeVal: {},
  loading: 'idle',
  error: null,
};




const testData = {
    "Вовлеченность": "fa-heart][Вовлеченность",
    "Командный дух": "fa-lightbulb][Командный дух",
    "Клиент": "fa-user][Клиент",
    "Северо-Западный": "macroregion_4",
    "Инновации": "fa-handshake][Инновации",
    "Ответственность": "fa-check-circle][Ответственность"
};

const typeValSlice = createSlice({
  name: "typeVal",
  initialState,
  reducers: {
    toggleCheckboxesTypeVal: (state) => {
      state.isOpen = !state.isOpen;
    },
    selectTypeVal: (state, action) => {
      state.info = action.payload;
      state.isOpen = !state.isOpen;
      state.TypeVal = state.checkboxesTypeVal[action.payload] || "";
    },
    resetTypeVal: (state) => {
      state.info = "Ценности";
      state.TypeVal = "";
    },
    initialDirectionRenderTypeVal: (state, action) => {
      state.info = action.payload;
      state.TypeVal = state.checkboxesTypeVal[action.payload] || "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckboxesTypeVal.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchCheckboxesTypeVal.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.checkboxesTypeVal = action.payload;
      })
      .addCase(fetchCheckboxesTypeVal.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
        state.checkboxesTypeVal = testData;
      });
  },
});

export const { toggleCheckboxesTypeVal, selectTypeVal, resetTypeVal, initialDirectionRenderTypeVal  } =
fetchCheckboxesTypeVal.actions;

export default fetchCheckboxesTypeVal.reducer;
