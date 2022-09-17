import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData, getData, deleteData } from '../utils/api';
import config from '../constants/config';
import { successToast } from '../utils/toastFunc';

const initialState = {
    loading: true,
    profileList: [],
    driverGroup: [],
    usersData: []
};

/* Creating a thunk that will be used to get the list of profiles. */
export const getProfileList = createAsyncThunk(
    'globalReducer/getProfileList',
    async (headers) => {
        const url = config.baseUrl + config.getProfileList;
        const response = await getData(url, headers);
        return response;
    }
);

/* Creating a thunk that will be used to get the list of driver groups. */
export const getDriverGroup = createAsyncThunk(
    'globalReducer/getDriverGroup',
    async (headers) => {
        const url = config.baseUrl + config.getDriverGroupList;
        const response = await getData(url, headers);
        // console.log("runed")
        return response;
    }
);

/* Creating a thunk that will be used to get the list of users. */
export const getUsersData = createAsyncThunk(
    'globalReducer/getUsersData',
    async (headers) => {
        const url = config.baseUrl + config.getUserList;
        const response = await postData(url, { userId: "" }, headers);
        return response;
    }
);

/* Creating a thunk that will be used to delete a user. */
export const deleteUserById = createAsyncThunk(
    'globalReducer/deleteUserById',
    async (data) => {
        const url = config.baseUrl + config.deleteUser+"/"+data.id;
        const response = await deleteData(url, data.headers);
        return response;
    }
);



export const userManagementSlice = createSlice({
    name: 'userManagement',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // deleteUser: (state,action)=>{
        //     state.usersData = state.usersData.filter(user=> user.userId !== action.payload)
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfileList.fulfilled, (state, action) => {
                state.profileList = action.payload;
                state.loading = false
            })
            .addCase(getDriverGroup.fulfilled, (state, action) => {
                state.driverGroup = action.payload;
                state.loading = false
            })
            .addCase(getUsersData.fulfilled, (state, action) => {
                state.usersData = action.payload;
                state.loading = false
            })
            .addCase(deleteUserById.fulfilled, (state, action) => {
                // state.usersData = state.usersData.filter(user=> user.userId !== action.payload)
                state.loading = false
                successToast({mes:"Deleted User successfully"})
            })
            
    },
});

// export const { deleteUser } = userManagementSlice.actions;

export const getProfiles = (state) => state.userManagement.profileList;
export const getDriverGroups = (state) => state.userManagement.driverGroup;
export const getUsers = (state) => state.userManagement.usersData;
export const getLoading = (state) => state.userManagement.loading;

export default userManagementSlice.reducer;
