import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    baselineId: 0,
    workplaceId: null,
}

export const mainSelectionSlice = createSlice({
    name: 'mainSelection',
    initialState,
    reducers: {
        setBaselineId: (state, action) => {
            state.baselineId = action.payload;
        },
        setWorkplaceId: (state, action) => {
            state.workplaceId = action.payload;
        }
    }
});

export const selectBaselineId = (state) => state.mainSelection.baselineId;
export const selectWorkplaceId = (state) => state.mainSelection.workplaceId;

export const { setBaselineId,  setWorkplaceId } = mainSelectionSlice.actions;
export default mainSelectionSlice.reducer;