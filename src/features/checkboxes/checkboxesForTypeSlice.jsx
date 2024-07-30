import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  for_type: 0,
  spec: 0,
};

const checkboxForTypeSlice = createSlice({
  name: "checkboxesForType",
  initialState,
  reducers: {
    initialRender: (state, action) => {
      state[action.payload] = 1;
    },
    toggleCheckbox: (state, action) => {
      state[action.payload] = state[action.payload] === 1 ? 0 : 1;
    },
    resetCheckboxes: (state) => {
      return initialState;
    },
  },
});

export const { toggleCheckbox, resetCheckboxes, initialRender } = checkboxForTypeSlice.actions;
export const selectCheckboxes = (state) => state.checkboxesFortype;
export default checkboxForTypeSlice.reducer;
