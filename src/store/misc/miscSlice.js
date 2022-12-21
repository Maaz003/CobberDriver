import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const initialSetupRequest = createAsyncThunk(
  'misc/initialSetupRequest',
  async data => {
    return data;
  },
);

export const setFcmToken = createAsyncThunk('misc/setFcmToken', async data => {
  try {
    return {
      status: 'success',
      userData: data,
    };
  } catch (error) {
    return {
      status: 'failed',
      error: true,
      message: error.code,
    };
  }
});

const initialState = {
  isLoadingRequest: false,
  status: 'idle',
  error: false,
  fcmToken: undefined,
};

const miscSlice = createSlice({
  name: 'misc',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // UPDATE USER
    [setFcmToken.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.fcmToken = action.payload.userData;
    },
  },
});

export default miscSlice.reducer;
