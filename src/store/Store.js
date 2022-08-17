import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userSlice } from '../slices/User';
import { loginManagement } from '../hooks/api/LoginManagement/LoginManagement';
import { userManagement } from '../hooks/api/UserManagement/UserManagement';

export const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [loginManagement.reducerPath]: loginManagement.reducer,
        [userManagement.reducerPath]: userManagement.reducer,
        devTools: process.env.NODE_ENV === 'development',
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(loginManagement.middleware)
        .concat(userManagement.middleware)
});

setupListeners(store.dispatch)