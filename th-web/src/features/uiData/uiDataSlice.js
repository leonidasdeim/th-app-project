import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    values: [],
    doShow: false
};

export const uiDataSlice = createSlice({
    name: 'uidata',
    initialState,
    reducers: {
        addValue(state, action) {
            state.values.push(action.payload);
            state.doShow = true;
        },
        removeValues(state) {
            state.values = [];
            state.doShow = false;
        },
    },
});

export const { addValue, removeValues } = uiDataSlice.actions;


export const selectValues = (state) => state.uidata.values;
export const selectDoShow = (state) => state.uidata.doShow;

export default uiDataSlice.reducer;
