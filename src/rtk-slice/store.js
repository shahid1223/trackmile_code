import { configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import manualRunsheetReducer from './manualRunsheetSlice';
import globalReducer from './globalSlice';
import userManagementReducer from './userManagement';
import history from '../utils/history';
// import authReducer from '../utils/authReducer';

export const store = configureStore({
  reducer: {
    manualRunsheet: manualRunsheetReducer,
    globalReducer: globalReducer,
    userManagement: userManagementReducer,
    // authReducer: authReducer,
    router: connectRouter(history)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware(history)),
});
