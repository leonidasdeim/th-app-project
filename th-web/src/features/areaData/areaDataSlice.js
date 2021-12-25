import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAreas } from './areaDataAPI';

const initialState = {
    areas: [],
    error: false
};

export const fetchAreasAsync = createAsyncThunk(
    'area/fetchAreas',
    async () => {
        return fetchAreas();
    }
);

export const areaDataSlice = createSlice({
    name: 'area',
    initialState,
    reducers: {
        resetAreasError(state) {
            state.error = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAreasAsync.fulfilled, (state, action) => {
                state.areas = action.payload;
            })
            .addCase(fetchAreasAsync.rejected, (state) => {
                state.error = true;
            })
    },
});

export const { resetAreasError } = areaDataSlice.actions;


export const selectAreas = (state) => state.area.areas;
export const selectAreasError = (state) => state.area.error;

export default areaDataSlice.reducer;
