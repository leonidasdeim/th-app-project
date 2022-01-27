import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, register, logout, getUser } from './authAPI';

const initialState = {
    user: [],
    registerStatus: { status: false, error: false, reason: "" },
    isLoggedIn: false
};

export const loginAsync = createAsyncThunk(
    'auth/login',
    async (user) => {
        return login(user);
    }
);

export const registerAsync = createAsyncThunk(
    'auth/register',
    async (user, { rejectWithValue }) => {
        const response = await register(user);
        if (!response.ok) {
            return rejectWithValue(await response.json());
        }
        const data = await response.json();
        return data;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser(state) {
            logout();
            state.isLoggedIn = false;
            state.user = [];
        },
        checkForUser(state) {
            let savedUser = getUser();
            if (savedUser !== null) {
                state.isLoggedIn = true;
                state.user = savedUser;
            }
        },
        clearRegisterData(state) {
            state.registerStatus = { status: false, error: false, reason: "" };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.registerStatus = { status: true, error: false, reason: action.payload.hasOwnProperty('message') ? action.payload.message : "" };
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.registerStatus = { status: false, error: true, reason: action.payload.hasOwnProperty('message') ? action.payload.message : "Error" };
            })
    },
});

export const { logoutUser, checkForUser, clearRegisterData } = authSlice.actions;

export const selectUser = (state) => {
    return state.auth.user
};

export const selectRegisterStatus = (state) => {
    return state.auth.registerStatus
};

export const selectIsLoggedIn = (state) => {
    return state.auth.isLoggedIn
};

export default authSlice.reducer;
