import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const initialSetupRequest = createAsyncThunk(
  'plans/initialSetupRequest',
  async data => {
    return data;
  },
);

export const allPlans = createAsyncThunk('plans/allPlans', async data => {
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

export const RecurringPlans = createAsyncThunk(
  'plans/RecurringPlans',
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

export const OneTimePlans = createAsyncThunk(
  'plans/OneTimePlans',
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

export const individualPlans = createAsyncThunk(
  'plans/IndividualPlans',
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
  recurringPlans: [],
  oneTimePlans: [],
  individualPlansData: [],
};

const planSlice = createSlice({
  name: 'plans',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // PLANS
    [allPlans.pending]: (state, action) => {
      state.status = 'loading';
      state.isLoadingRequest = true;
    },
    [allPlans.rejected]: (state, action) => {
      state.status = 'failed';
      state.isLoadingRequest = false;
      state.error = true;
      state.plansData = action.payload.isData;
    },
    [allPlans.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.plansData = action.payload.isData;
    },
    [RecurringPlans.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.recurringPlans = action.payload.isData;
    },
    [OneTimePlans.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.oneTimePlans = action.payload.isData;
    },
    [individualPlans.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.individualPlansData = action.payload.isData;
    },
    [clearPlans.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.plansData = undefined;
      state.recurringPlans = [];
      state.oneTimePlans = [];
      state.individualPlansData = [];
    },
  },
});

export default planSlice.reducer;
