import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, register, logout, getUser } from './authAPI';

const initialState = {
    user: [],
    registeredSucessfully: false,
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
    async (user) => {
        return register(user);
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
            });
    },
});

export const { logoutUser, checkForUser } = authSlice.actions;

export const selectUser = (state) => {
    return state.auth.user
};

export const selectRegistered = (state) => {
    return state.auth.registered
};

export const selectIsLoggedIn = (state) => {
    return state.auth.isLoggedIn
};

export default authSlice.reducer;
