import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const initialSetupRequest = createAsyncThunk(
  'common/initialSetupRequest',
  async data => {
    return data;
  },
);

export const onBoardPresent = createAsyncThunk(
  'common/onBoardPresent',
  async data => {
    try {
      return {
        status: 'success',
        error: false,
        message: 'Success! You are logged out!',
        pagePresent: data,
      };
    } catch (error) {
      return {
        status: 'failed',
        error: true,
        message: 'Oops! Something went wrong!',
        pagePresent: false,
      };
    }
  },
);

export const authLocationCoords = createAsyncThunk(
  'common/authLocationCoords',
  async data => {
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
  },
);

export const MAPRef = createAsyncThunk('common/MAPRef', async data => {
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

export const SLIDE_REF = createAsyncThunk('common/SLIDE_REF', async data => {
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

export const firstTimeAnimate = createAsyncThunk(
  'common/firstTimeAnimate',
  async data => {
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
  },
);

export const tempRidesSet = createAsyncThunk(
  'common/tempRidesSet',
  async data => {
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
  },
);

export const firstTimeReduxSet = createAsyncThunk(
  'common/firstTimeReduxSet',
  async data => {
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
  },
);

export const clearCommon = createAsyncThunk(
  'common/clearCommon',
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
  isStep1: false,
  isStep2: false,
  authCoordinates: undefined,
  mapRef: undefined,
  slideRef: undefined,
  firstAnimate: true,
  firstReduxSet: false,
  tempRides: [],
};

const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    //LOGOUT
    [onBoardPresent.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      if (action.payload.pagePresent === '1') {
        state.isStep1 = true;
      } else {
        state.isStep2 = true;
      }
    },

    [authLocationCoords.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.authCoordinates = action.payload.location;
    },
    [MAPRef.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.mapRef = action.payload.location;
    },
    [SLIDE_REF.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.slideRef = action.payload.location;
    },
    [firstTimeAnimate.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.firstAnimate = action.payload.location;
    },
    [firstTimeReduxSet.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.firstReduxSet = action.payload.location;
    },
    [tempRidesSet.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.tempRides = action.payload.location;
    },
    [clearCommon.fulfilled]: (state, action) => {
      state.isLoadingRequest = false;
      state.status = 'idle';
      state.error = false;
      state.errorMessage = '';
      state.isStep1 = false;
      state.isStep2 = false;
      state.authCoordinates = undefined;
      state.mapRef = undefined;
      state.slideRef = undefined;
      state.firstAnimate = true;
    },
  },
});

export default commonSlice.reducer;
