import AsyncStorage from '@react-native-async-storage/async-storage';
import splashReducer from './Slices/splashSlice';
import userDataSlice from './Slices/userDataSlice';
import BleDataSlice from './Slices/BleSlice';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};
const reducer = combineReducers({
  splash: splashReducer,
  userData: userDataSlice,
  bleDevice: BleDataSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
