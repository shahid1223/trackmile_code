import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postData } from '../utils/api';
import config from '../constants/config';

const initialState = {
  addedDrivers: []
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getRunsheetSummary = createAsyncThunk(
  'manualRunsheet/getRunsheetSummary',
  async ({ postDataObj, headerData }) => {
    const url = config.baseUrl + config.getDateRangeRunsheets;
    const response = await postData(url, postDataObj, headerData);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getDateRangeRunsheets = createAsyncThunk(
  'manualRunsheet/getDateRangeRunsheets',
  async ({ postDataObj, headerData }) => {
    const url = config.baseUrl + config.getDateRangeRunsheets;
    const response = await postData(url, postDataObj, headerData);
    return response;
  }
);

export const removeRunsheets = createAsyncThunk(
  'manualRunsheet/removeRunsheets',
  async ({ postDataObj, headerData, driverUserId }) => {
    const url = config.baseUrl + config.deleteRunsheets;
    const response = await postData(url, postDataObj, headerData);
    response.userId = driverUserId;
    return response;
  }
);

export const submitRunsheet = createAsyncThunk(
  'manualRunsheet/submitRunsheet',
  async ({ postDataObj, headerData }) => {
    const url = config.baseUrl + config.submitRunsheet;
    const response = await postData(url, postDataObj, headerData);
    return response;
  }
);

export const saveRunsheet = createAsyncThunk(
  'manualRunsheet/saveRunsheet',
  async ({ postDataObj, headerData, runsheetIndex }) => {
    const url = config.baseUrl + config.saveOrUpdateRunsheet;
    const response = await postData(url, postDataObj, headerData);
    response.runsheetIndex = runsheetIndex;
    return response;
  }
);

export const approveRunsheet = createAsyncThunk(
  'manualRunsheet/approveRunsheet',
  async ({ postDataObj, headerData }) => {
    const url = config.baseUrl + config.approveRunsheet;
    const response = await postData(url, postDataObj, headerData);
    return response;
  }
);

export const getApprovedRunsheets = createAsyncThunk(
  'manualRunsheet/getApprovedRunsheets',
  async ({ postDataObj, headerData }) => {
    const url = config.baseUrl + config.getApprovedRunsheets;
    const response = await postData(url, postDataObj, headerData);
    return response;
  }
);

export const getVerifiedRunsheets = createAsyncThunk(
  'manualRunsheet/getVerifiedRunsheets',
  async ({ postDataObj, headerData }) => {
    const url = config.baseUrl + config.getVerifiedRunsheets;
    const response = await postData(url, postDataObj, headerData);
    return response;
  }
);

export const ManualRunsheetSlice = createSlice({
  name: 'manualRunsheet',
  initialState,
  reducers: {
    addDriver: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const found = state.addedDrivers.some(el => el.userId === action.payload.userId);
      if (!found) state.addedDrivers.push(action.payload);
    },
    addAllDrivers: (state, action) => {
      action.payload.forEach(driver => {
        const found = state.addedDrivers.some(el => el.userId === driver.userId);
        if (!found) state.addedDrivers.push(driver);
      });
    },
    removeAllDrivers: (state, action) => {
      state.addedDrivers = [];
    },
    addRunsheet: (state, action) => {
      const driverIndex = state.addedDrivers.findIndex(el => el.userId === action.payload);
      if (!state.addedDrivers[driverIndex].manualRunsheetDTOS?.length) {
        state.addedDrivers[driverIndex].manualRunsheetDTOS = [];
      }
      state.addedDrivers[driverIndex].manualRunsheetDTOS.push({});
    },
    addRunsheetRows: (state, action) => {
      state.addedDrivers.forEach((driver) => {
        if (!driver.manualRunsheetDTOS?.length) {
          driver.manualRunsheetDTOS = action.payload;
        } else {
          action.payload.forEach((dateObj) => {
            const found = driver.manualRunsheetDTOS.some(el => {
              return el.date === dateObj.date
            });
            if (!found) driver.manualRunsheetDTOS.push({ date: dateObj.date });
          })
        }

      })
    },
    deleteRunsheet: (state, action) => {
      const driverIndex = state.addedDrivers.findIndex(el => el.userId === action.payload);
      state.addedDrivers[driverIndex].manualRunsheetDTOS =
        state.addedDrivers[driverIndex].manualRunsheetDTOS.filter((runsheet) => !runsheet.selected);
    },
    editRunsheet: (state, action) => {
      const driverIndex = state.addedDrivers.findIndex(el => el.userId === action.payload.userId);
      state.addedDrivers[driverIndex].manualRunsheetDTOS[action.payload.runsheetIndex].editing = true;
    },
    selectRunsheet: (state, action) => {
      const driverIndex = state.addedDrivers.findIndex(el => el.userId === action.payload.userId);
      const selectedVal = state.addedDrivers[driverIndex].manualRunsheetDTOS[action.payload.runsheetIndex].selected;
      state.addedDrivers[driverIndex].manualRunsheetDTOS[action.payload.runsheetIndex].selected = !selectedVal;
    },
    selectDriver: (state, action) => {
      const driverIndex = state.addedDrivers.findIndex(el => el.userId === action.payload.userId);
      const selectedVal = state.addedDrivers[driverIndex].selected;
      state.addedDrivers[driverIndex].selected = !selectedVal;
    },
    removeDriver: (state, action) => {
      state.addedDrivers = state.addedDrivers.filter((driver) => driver.userId !== action.payload.userId);
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(saveRunsheet.fulfilled, (state, action) => {
        const driverIndex = state.addedDrivers.findIndex(el => el.userId === action.payload.data.userId);
        state.addedDrivers[driverIndex].manualRunsheetDTOS[action.payload.runsheetIndex] = action.payload.data;
      })
      .addCase(removeRunsheets.fulfilled, (state, action) => {
        const driverIndex = state.addedDrivers.findIndex(el => el.userId === action.payload.userId);
        if (state.addedDrivers[driverIndex].selected) {
          state.addedDrivers = state.addedDrivers.filter((driver, index) => index !== driverIndex);
        }
        state.addedDrivers[driverIndex].manualRunsheetDTOS =
          state.addedDrivers[driverIndex].manualRunsheetDTOS.filter((runsheet) => !runsheet.selected);
      })
      .addCase(getDateRangeRunsheets.fulfilled, (state, action) => {
        state.addedDrivers = action.payload.data.summaryDateRangeRunsheetDTOs;
      })
      .addCase(getRunsheetSummary.fulfilled, (state, action) => {
        state.summaryDateRangeRunsheetDTOs = action.payload.data.summaryDateRangeRunsheetDTOs;
        state.manualRunsheetDateRangeDTOs = action.payload.data.manualRunsheetDateRangeDTOs;
      })
      .addCase(getApprovedRunsheets.fulfilled, (state, action) => {
        state.approvedRunsheets = action.payload.data;
      })
      .addCase(getVerifiedRunsheets.fulfilled, (state, action) => {
        state.verifiedRunsheets = action.payload.data;
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.ManualRunsheet.value)`
export const getAddedDrivers = (state) => state.manualRunsheet.addedDrivers;
export const getSummaryDateRangeRunsheetDTOs = (state) => state.manualRunsheet.summaryDateRangeRunsheetDTOs;
export const getManualRunsheetDateRangeDTOs = (state) => state.manualRunsheet.manualRunsheetDateRangeDTOs;
export const getApprovedRunsheetsData = (state) => state.manualRunsheet.approvedRunsheets;
export const getVerifiedRunsheetsData = (state) => state.manualRunsheet.verifiedRunsheets;

export const { addDriver, addAllDrivers, removeAllDrivers, addRunsheet, editRunsheet, selectRunsheet, selectDriver, deleteRunsheet, addRunsheetRows, removeDriver } = ManualRunsheetSlice.actions;

export default ManualRunsheetSlice.reducer;
