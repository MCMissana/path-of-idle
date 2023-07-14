import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

// reducers
import inventoryReducer from './inventory/inventorySlice';
import counterReducer from './counter/counterSlice';
import characterReducer from './character/characterSlice';
import gameReducer from './game/gameSlice';

// persist stuff
const persistConfig = {
  key: 'root',
  storage,
}

const combinedReducers = combineReducers({ 
    inventory: inventoryReducer,
    counter: counterReducer,
    character: characterReducer,
    game: gameReducer
})

const persistedReducer = persistReducer(persistConfig, combinedReducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store)
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;