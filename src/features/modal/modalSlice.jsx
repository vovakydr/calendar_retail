// src/features/modal/modalSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCreateEventModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openCreateEventModal: (state) => {
      state.isCreateEventModalOpen = true;
    },
    closeCreateEventModal: (state) => {
      state.isCreateEventModalOpen = false;
    },
  },
});

export const { openCreateEventModal, closeCreateEventModal } = modalSlice.actions;

export default modalSlice.reducer;
