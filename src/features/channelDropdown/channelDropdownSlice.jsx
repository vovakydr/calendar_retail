import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ---TEST URL---
const url = "/custom_web_template.html?object_id=7042022170616100717";

export const fetchDropDownChannels = createAsyncThunk(
  "channelsDropdown/fetchDropDownChannels",
  async(_, thunkAPI) => {
    try {
      const response = await axios.get(url);
      if (response.data) {
        const data = response.data;

        const dropDownChannels = data.channel.reduce((acc, item) => {
          acc[item.name] = item.id;
          return acc;
        }, {});
        return dropDownChannels;
      }
    } catch (err) {
        console.error("Error fetching drop-down channels:", err); 
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

const initialState = {
  info: "Канал",
  isOpen: false,
  channelValue: "",
  dropDownChannels: {},
  loading: 'idle',
  error: null,
};




const testData = {
    "Фронт": "channel_1",
    "Премиум": "channel_2",
    "МБ": "channel_3",
    "РБ Дом": "channel_4",
    "Payroll": "channel_5",
    "DSA": "channel_6"
};

const channelsDropdownSlice = createSlice({
  name: "channelsDropdown",
  initialState,
  reducers: {
    toggleDropdownChannels: (state) => {
      state.isOpen = !state.isOpen;
    },
    selectChannels: (state, action) => {
      state.info = action.payload;
      state.isOpen = !state.isOpen;
      state.channelValue = state.dropDownChannels[action.payload] || "";
    },
    resetChannels: (state) => {
      state.info = "Канал";
      state.channelValue = "";
    },
    initialDirectionRenderChannels: (state, action) => {
      state.info = action.payload;
      state.channelValue = state.dropDownChannels[action.payload] || "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDropDownChannels.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchDropDownChannels.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.dropDownChannels = action.payload;
      })
      .addCase(fetchDropDownChannels.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
        state.dropDownChannels = testData;
      });
  },
});

export const { toggleDropdownChannels, selectChannels, resetChannels, initialDirectionRenderChannels  } =
  channelsDropdownSlice.actions;

export default channelsDropdownSlice.reducer;
