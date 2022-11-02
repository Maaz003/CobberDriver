import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const initialSetupRequest = createAsyncThunk(
  'plans/initialSetupRequest',
  async data => {
    return data;
  },
);

export const scheduledRides = createAsyncThunk(
  'schedule/scheduledRides',
  async data => {
    try {
      return {
        status: 'success',
        error: false,
        message: 'Success!',
        rideData: data,
      };
    } catch (error) {
      return {
        status: 'failed',
        error: true,
        message: 'Oops! Something went wrong!',
        isData: undefined,
      };
    }
  },
);

export const clearPlans = createAsyncThunk('plans/clearPlans', async data => {
  try {
    return {
      status: 'success',
      error: false,
      message: 'Success!',
      isData: data,
    };
  } catch (error) {
    return {
      status: 'failed',
      error: true,
      message: 'Oops! Something went wrong!',
      isData: undefined,
    };
  }
});

const initialState = {
  isLoadingRequest: false,
  status: 'idle',
  error: false,
  errorMessage: '',
  plansData: undefined,
  scheduledRides: [],
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // PLANS
    [scheduledRides.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.scheduledRides = action.payload.rideData;
    },
    [clearPlans.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.scheduledRides = [];
    },
  },
});

export default scheduleSlice.reducer;
