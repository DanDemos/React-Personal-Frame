import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { slice, loadingSlice, AccessTokenSlice } from '../reducers/reducer';
import CustomSlice  from '../../helper/customSlice';
import whitelist_arr from '../../helper/persist_whitelist'
// Combine the reducers from the 'slice' object

const obj = {
  [AccessTokenSlice.name]: AccessTokenSlice.reducer,
  ...Object.fromEntries(Object.entries(slice).map(([key, { reducer }]) => [key, reducer])),
  ...Object.fromEntries(Object.entries(CustomSlice).map(([key, { reducer }]) => [key, reducer])),
  [loadingSlice.name]: loadingSlice.reducer,
}

const rootReducers = combineReducers(
  obj
);

// Configuration for redux-persist
const persistConfig = {
  key: 'root', // Key for the persisted state
  devTools: process.env.NODE_ENV !== 'production', // Enable dev tools only in non-production environment
  storage: storage, // Storage engine for persisting the state (redux-persist uses 'localStorage' by default)
  whitelist: whitelist_arr, // List of reducers to be persisted
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducers);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer, // Set the root reducer as the persisted reducer
  middleware: [thunk], // Apply Redux thunk middleware
});

// Create the persisted store
export const persist = persistStore(store);
