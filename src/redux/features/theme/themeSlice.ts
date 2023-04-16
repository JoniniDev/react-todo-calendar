import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  isDarkMode: boolean;
}

const initialState: ThemeState = {
  isDarkMode: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDarkMode(state) {
      state.isDarkMode = true;
    },
    setLightMode(state) {
      state.isDarkMode = false;
    },
    toggleMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { setDarkMode, setLightMode, toggleMode } = themeSlice.actions;

export default themeSlice.reducer;