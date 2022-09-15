import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initialSetupRequest = createAsyncThunk(
  'auth/initialSetupRequest',
  async data => {
    return data;
  },
);

export const login = createAsyncThunk('auth/login', async data => {
  try {
    return {
      status: 'success',
      error: false,
      message: 'Success! You are logged in!',
      userAuth: true,
      userData: data?.data?.user,
      userToken: data?.data?.token,
    };
  } catch (error) {
    return {
      status: 'failed',
      error: true,
      message: 'Oops! Something went wrong!',
      userAuth: false,
      userData: undefined,
      userToken: undefined,
    };
  }
});

export const logOut = createAsyncThunk('auth/logOut', async () => {
  try {
    AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys));

    return {
      status: 'success',
      error: false,
      message: 'Success! You are logged out!',
      userAuth: false,
    };
  } catch (error) {
    return {
      status: 'failed',
      error: true,
      message: 'Oops! Something went wrong!',
      userAuth: false,
    };
  }
});

const initialState = {
  isLoadingRequest: false,
  status: 'idle',
  error: false,
  errorMessage: '',
  isAuth: false,
  user: undefined,
  userToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // LOGIN
    [login.pending]: (state, action) => {
      state.status = 'loading';
      state.isLoadingRequest = true;
    },

    [login.rejected]: (state, action) => {
      state.status = 'failed';
      state.isLoadingRequest = false;
      state.error = true;
      state.isAuth = action.payload.userAuth;
    },

    [login.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.isAuth = action.payload.userAuth;
      state.user = action.payload.userData;
      state.userToken = action.payload.userToken;
    },

    //LOGOUT
    [logOut.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.isAuth = action.payload.userAuth;
      state.user = undefined;
      state.userToken = '';
    },
  },
});

export default authSlice.reducer;
