import { configureStore, combineReducers } from '@reduxjs/toolkit';
import equipmentReducer from '../slices/equipmentSlice';
import exercisesReducer from '../slices/chosenExercisesSlice';
import intensityReducer from '../slices/intensitySlice';
import userReducer from '../slices/userSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  equipment: equipmentReducer,
  exercises: exercisesReducer,
  intensity: intensityReducer,
  loggedInUser: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

export { persistor };

export default store;
