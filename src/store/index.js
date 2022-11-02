import {configureStore, combineReducers, compose} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

import authReducer from './auth/authSlice';
import scheduleReducer from './scheduleRides/scheduleSlice';
import userReducer from './user/userSlice';
import commonReducer from './common/commonSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  schedule: scheduleReducer,
  user: userReducer,
  common: commonReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['auth', 'schedule', 'user', 'common'],
  // Blacklist (Don't Save Specific Reducers)
  // blacklist: ['setting', 'upload']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
