import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAreas, addArea, deleteArea } from './areaDataAPI';

const initialState = {
    areas: [],
    error: false
};

export const addAreaAsync = createAsyncThunk(
    'area/addArea',
    async (name) => {
        return addArea(name);
    }
);

export const fetchAreasAsync = createAsyncThunk(
    'area/fetchAreas',
    async () => {
        return fetchAreas();
    }
);

export const deleteAreaAsync = createAsyncThunk(
    'area/deleteArea',
    async (id) => {
        return deleteArea(id);
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
            .addCase(addAreaAsync.fulfilled, (state, action) => {
                state.areas = [...state.areas, action.payload];
            })
            .addCase(addAreaAsync.rejected, (state) => {
                state.error = true;
            })
            .addCase(deleteAreaAsync.fulfilled, (state, action) => {
                state.areas = state.areas.filter(area => area.id !== action.meta.arg);
            })
            .addCase(deleteAreaAsync.rejected, (state) => {
                state.error = true;
            })
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
export const selectAreasIsNotEmpty = (state) => state.area.areas.length > 0;

export default areaDataSlice.reducer;
