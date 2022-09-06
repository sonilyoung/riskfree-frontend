import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    companyId: null,
    companyName: "",
    email: "",
    loginDt: null,
    loginId: "",
    loginIp: "",
    loginPw: "",
    name: "",
    roleCd: "",
    roleName: "",
    userId: null,
    workplaceId: null,
    workplaceName: "",
    redirectPath: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
});

export const selectUser = (state) => state.user;
export const { setUser } = userSlice.actions;
export default userSlice.reducer;