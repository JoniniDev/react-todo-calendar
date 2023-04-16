import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import calendarSlice from './features/calendar/calnendarSlice';
import themeSlice from './features/theme/themeSlice';
import modalSlice from './features/modal/modalSlice';
import languageSlice from './features/language/languageSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  calendar: calendarSlice,
  theme: themeSlice,
  modal: modalSlice,
  language: languageSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const customMiddleware = createSerializableStateInvariantMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: [...getDefaultMiddleware(), customMiddleware],
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };