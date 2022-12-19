import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const initialSetupRequest = createAsyncThunk(
  'plans/initialSetupRequest',
  async data => {
    return data;
  },
);

export const _SOCKET_REF = createAsyncThunk('extra/_SOCKET_REF', async data => {
  try {
    return {
      status: 'success',
      error: false,
      message: 'Success! You are logged out!',
      location: data,
    };
  } catch (error) {
    return {
      status: 'failed',
      error: true,
      message: 'Oops! Something went wrong!',
      location: false,
    };
  }
});

const initialState = {
  isLoadingRequest: false,
  status: 'idle',
  error: false,
  errorMessage: '',
  plansData: undefined,
  dropOffLoc: undefined,
  vehicles: [],
  SOCKET_REF: undefined,
};

const extraSlice = createSlice({
  name: 'extra',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // PLANS

    [_SOCKET_REF.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.SOCKET_REF = action.payload.location;
    },
  },
});

export default extraSlice.reducer;
