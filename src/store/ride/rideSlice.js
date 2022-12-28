import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const initialSetupRequest = createAsyncThunk(
  'rides/initialSetupRequest',
  async data => {
    return data;
  },
);

export const createRideSession = createAsyncThunk(
  'user/createRideSession',
  async data => {
    try {
      return {
        status: 'success',
        error: false,
        message: 'Success!',
        isData: data.inRide,
        rideData: data.data,
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

export const clearScheduleRides = createAsyncThunk(
  'plans/clearScheduleRides',
  async data => {
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
  },
);

const initialState = {
  isLoadingRequest: false,
  status: 'idle',
  error: false,
  errorMessage: '',
  newRides: [],
  inRide: 'finished',
  rideSession: undefined,
};

const rideSlice = createSlice({
  name: 'rides',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [createRideSession.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.inRide = action.payload.isData;
      state.rideSession = action.payload.rideData;
    },
    [clearScheduleRides.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.scheduledRides = [];
    },
  },
});

export default rideSlice.reducer;
