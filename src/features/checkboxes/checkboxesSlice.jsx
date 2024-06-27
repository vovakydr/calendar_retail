import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  spec: 0,
  boss: 0,
  registred: 0,
  free_places: 0,
  for_lectors: 0,
  subordinates: 0,
};

const checkboxSlice = createSlice({
  name: "checkboxes",
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

export const { toggleCheckbox, resetCheckboxes, initialRender } =
  checkboxSlice.actions;
export const selectCheckboxes = (state) => state.checkboxes;
export default checkboxSlice.reducer;
