import { createSlice } from '@reduxjs/toolkit';

let defaultBaselineId = localStorage.getItem('defaultBaselineId') ?? null;
let defaultIsClose = localStorage.getItem('defaultIsClose') ?? null;
const initialState = {
    baselineId: defaultBaselineId,
    isClose: defaultIsClose,
    workplaceId: null,
}

export const mainSelectionSlice = createSlice({
    name: 'mainSelection',
    initialState,
    reducers: {
        setBaselineId: (state, action) => {
            state.baselineId = action.payload;
        },
        setIsClose: (state, action) => {
            state.isClose = action.payload;
        },
        setWorkplaceId: (state, action) => {
            state.workplaceId = action.payload;
        }
    }
});

export const selectBaselineId = (state) => state.mainSelection.baselineId;
export const selectIsClose = (state) => state.mainSelection.isClose;
export const selectWorkplaceId = (state) => state.mainSelection.workplaceId;

export const { setBaselineId, setIsClose,  setWorkplaceId } = mainSelectionSlice.actions;
export default mainSelectionSlice.reducer;