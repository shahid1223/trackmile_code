import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData, getData } from '../utils/api';
import { successToast } from '../utils/toastFunc';

import config from '../constants/config';

const initialState = {
  driverList: []
};

export const getDriverList = createAsyncThunk(
  'globalReducer/getDriverList',
  async (headers) => {
    const url = config.baseUrl + config.getDriverList;
    const response = await getData(url, headers);
    return response;
  }
);
export const getVehicleTypeList = createAsyncThunk(
  'globalReducer/getVehicleTypeList',
  async (headers) => {
    const url = config.baseUrl + config.getVehicleTypeList;
    const response = await getData(url, headers);
    return response;
  }
);


export const doLogin = createAsyncThunk(
  'globalReducer/doLogin',
  async ({username,password}) => {
    const url = `${config.baseUrl}${config.login}?username=${username}&password=${password}`;
    const response = await postData(url, {});
    return response;
  }
);

export const globalSlice = createSlice({
  name: 'globalReducer',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDriverList.fulfilled, (state, action) => {
        state.driverList = action.payload;
      })
      .addCase(doLogin.fulfilled, (state, action) => {
        successToast({mes:"Logged in successfully"})
        state.userData = action.payload;
      })
      .addCase(getVehicleTypeList.fulfilled, (state, action) => {
        state.vehicleTypeList = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = globalSlice.actions;

export const getDrivers = (state) => state.globalReducer.driverList.data;
export const getUserData = (state) => state.globalReducer.userData;
export const getVehicles = (state) => state.globalReducer.vehicleTypeList

export default globalSlice.reducer;
