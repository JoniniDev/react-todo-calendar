import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isOpened: boolean;
  id: string;
}

const initialState: ModalState = {
  isOpened: true,
  id: "none"
};

interface PayloadObject {
  id: string;
}

const modalSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<PayloadObject>) {
      state.id = action.payload.id
      state.isOpened = true;
    },
    closeModal(state, action: PayloadAction<PayloadObject>) {
      state.id = action.payload.id
      state.isOpened = false;
    },
    toggleModal(state, action: PayloadAction<PayloadObject>) {
      state.id = action.payload.id
      state.isOpened = !state.isOpened;
    },
  },
});

export const { openModal, closeModal, toggleModal } = modalSlice.actions;

export default modalSlice.reducer;