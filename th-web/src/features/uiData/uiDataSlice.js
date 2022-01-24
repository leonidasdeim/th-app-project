import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    values: [],
    doShow: false,
    headText: ""
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
        setHeadText(state, action) {
            state.headText = action.payload;
        },
    },
});

export const { addValue, removeValues, setHeadText } = uiDataSlice.actions;


export const selectValues = (state) => state.uidata.values;
export const selectDoShow = (state) => state.uidata.doShow;
export const selectHeadText = (state) => state.uidata.headText;

export default uiDataSlice.reducer;
