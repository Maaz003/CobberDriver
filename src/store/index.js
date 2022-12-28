import {configureStore, combineReducers, compose} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import commonReducer from './common/commonSlice';
import ridesReducer from './rides/ridesSlice';
import miscReducer from './misc/miscSlice';
import rideReducer from './ride/rideSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  common: commonReducer,
  rides: ridesReducer,
  misc: miscReducer,
  ride: rideReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['auth', 'user', 'common', 'rides', 'misc', 'ride'],
  // Blacklist (Don't Save Specific Reducers)
  // blacklist: ['setting', 'upload']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
