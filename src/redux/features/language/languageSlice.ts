import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
    langType: string;
}

const initialState: LanguageState = {
    langType: "ua"
};

interface PayloadObject {
    langType: string;
}

const langSlice = createSlice({
    name: 'Language',
    initialState,
    reducers: {
        setLanguage(state, action: PayloadAction<PayloadObject>) {
            state.langType = action.payload.langType;
        }
    },
});

export const { setLanguage } = langSlice.actions;

export default langSlice.reducer;