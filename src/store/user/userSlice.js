import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const initialSetupRequest = createAsyncThunk(
  'user/initialSetupRequest',
  async data => {
    return data;
  },
);

export const getUserData = createAsyncThunk('auth/getUserData', async data => {
  try {
    return {
      status: 'success',
      error: false,
      message: 'Success! You are logged in!',
      userData: data?.data?.user,
      userToken: data?.data?.token,
    };
  } catch (error) {
    return {
      status: 'failed',
      error: true,
      message: 'Oops! Something went wrong!',
      userData: undefined,
      userToken: undefined,
    };
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async data => {
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

export const updateUserToken = createAsyncThunk(
  'user/updateUserToken',
  async data => {
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
  },
);

export const refreshList = createAsyncThunk('auth/refreshList', async data => {
  try {
    return {
      status: 'success',
      classesData: data,
    };
  } catch (error) {
    return {
      status: 'failed',
      error: true,
      message: error.code,
      classesData: undefined,
    };
  }
});

export const confirmPickUp = createAsyncThunk(
  'user/confirmPickUp',
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

export const confirmDropOff = createAsyncThunk(
  'user/confirmDropOff',
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

export const rideDistance = createAsyncThunk(
  'user/rideDistance',
  async data => {
    try {
      return {
        status: 'success',
        error: false,
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

export const rideTime = createAsyncThunk('user/rideTime', async data => {
  try {
    return {
      status: 'success',
      error: false,
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

export const pinLocation = createAsyncThunk('user/pinLocation', async data => {
  try {
    return {
      status: 'success',
      error: false,
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

export const locationLoader = createAsyncThunk(
  'user/locationLoader',
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

export const scheduledRideTime = createAsyncThunk(
  'user/scheduledRideTime',
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

export const rideSession = createAsyncThunk('user/rideSession', async data => {
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
});

export const clearUser = createAsyncThunk('user/clearUser', async data => {
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
  user: undefined,
  userToken: '',
  refList: null,
  pickupLoc: undefined,
  dropOffLoc: undefined,
  distance: 0,
  Eta: 0,
  locationLoader: true,
  scheduledTime: undefined,
  pinLoc: false,
  inRide: 'finished',
  rideSession: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getUserData.pending]: (state, action) => {
      state.status = 'loading';
      state.isLoadingRequest = true;
    },

    [getUserData.rejected]: (state, action) => {
      state.status = 'failed';
      state.isLoadingRequest = false;
      state.error = true;
    },

    [getUserData.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;

      state.user = action.payload.userData;
      state.userToken = action.payload.userToken;
    },
    // UPDATE USER
    [updateUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.user = action.payload.userData;
    },
    // UPDATE USER TOKEN
    [updateUserToken.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.userToken = action.payload.userData;
    },
    [confirmPickUp.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.pickupLoc = action.payload.location;
    },
    [confirmDropOff.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.dropOffLoc = action.payload.location;
    },
    [rideDistance.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.distance = action.payload.location;
    },
    [rideTime.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.Eta = action.payload.location;
    },
    //PREVIOUS LIVE LOCATION
    [pinLocation.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.pinLoc = action.payload.location;
    },
    //SCHEDULED TIME
    [scheduledRideTime.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.scheduledTime = action.payload.isData;
    },

    ///REFRESH LIST
    [refreshList.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.refList = action.payload.classesData;
    },
    [locationLoader.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.locationLoader = action.payload.isData;
    },
    [rideSession.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.inRide = action.payload.isData;
      state.rideSession = action.payload.rideData;
    },

    [clearUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.user = undefined;
      state.userToken = '';
      state.refList = null;
      state.pickupLoc = undefined;
      state.dropOffLoc = undefined;
      state.distance = 0;
      state.Eta = 0;
      state.locationLoader = true;
      state.errorMessage = '';
      state.scheduledTime = undefined;
      state.pinLoc = false;
    },
  },
});

export default userSlice.reducer;
