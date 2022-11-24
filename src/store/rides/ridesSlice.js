import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Get} from '@axios/AxiosInterceptorFunction';
import {URL} from '@config/apiUrl';

export const initialSetupRequest = createAsyncThunk(
  'rides/initialSetupRequest',
  async data => {
    return data;
  },
);

export const newRides = createAsyncThunk('rides/newRides', async data => {
  try {
    const token = data;
    const newRidesURL = URL('rides/new');
    const response = await Get(newRidesURL, token);
    console.log('RESPONSE', response?.data);

    // if (response !== undefined) {
    //   return {
    //     status: 'success',
    //     error: false,
    //     message: 'Success!',
    //     rideData: response?.data,
    //   };
    // } else {
    //   return {
    //     status: 'success',
    //     error: true,
    //     message: 'Success!',
    //     rideData: undefined,
    //   };
    // }
  } catch (error) {
    console.log('ERROR SLICE', error);
    // return {
    //   status: 'failed',
    //   error: true,
    //   message: 'Oops! Something went wrong!',
    //   // rideData: undefined,
    // };
  }
});

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
};

const ridesSlice = createSlice({
  name: 'rides',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // [newRides.pending]: (state, action) => {
    //   state.status = 'pending';
    //   state.isLoadingRequest = true;
    // },
    // [newRides.rejected]: (state, action) => {
    //   state.status = 'rejected';
    //   state.isLoadingRequest = false;
    //   state.error = false;
    //   state.newRides = undefined;
    // },
    // [newRides.fulfilled]: (state, action) => {
    //   state.status = 'succeeded';
    //   state.isLoadingRequest = false;
    //   state.error = false;
    //   state.newRides = action.payload.rideData;
    // },
    [clearScheduleRides.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.scheduledRides = [];
    },
  },
});

export default ridesSlice.reducer;
