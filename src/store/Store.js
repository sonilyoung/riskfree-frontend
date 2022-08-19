import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userSlice } from '../slices/User';
import { loginManagement } from '../hooks/api/LoginManagement/LoginManagement';
import { userManagement } from '../hooks/api/UserManagement/UserManagement';
import { noticesManagement } from '../hooks/api/NoticesManagement/NoticesManagement';
import { improvementsManagement } from '../hooks/api/ImprovementsManagement/ImprovementsManagement';
import { accidentManagement } from '../hooks/api/AccidentManagement/AccidentManagement';
import { constructionManagement } from '../hooks/api/ConstructionManagement/ConstructionManagement';
import { companyManagement } from '../hooks/api/CompanyManagement/CompanyManagement';
import { subscribersManagement } from '../hooks/api/SubscribersManagement/SubscribersManagement';
import { commCodeManagement } from '../hooks/api/CommCodeManagement/CommCodeManagement';
import { lawImprovementsManagement } from '../hooks/api/LawImprovementsManagement/LawImprovementsManagement';

export const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [loginManagement.reducerPath]: loginManagement.reducer,
        [userManagement.reducerPath]: userManagement.reducer,
        [noticesManagement.reducerPath]: noticesManagement.reducer,
        [improvementsManagement.reducerPath]: improvementsManagement.reducer,
        [accidentManagement.reducerPath]: accidentManagement.reducer,
        [constructionManagement.reducerPath]: constructionManagement.reducer,
        [companyManagement.reducerPath]: companyManagement.reducer,
        [subscribersManagement.reducerPath]: subscribersManagement.reducer,
        [commCodeManagement.reducerPath]: commCodeManagement.reducer,
        [lawImprovementsManagement.reducerPath]: lawImprovementsManagement.reducer,
        devTools: process.env.NODE_ENV === 'development',
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(loginManagement.middleware)
        .concat(userManagement.middleware)
        .concat(noticesManagement.middleware)
        .concat(improvementsManagement.middleware)
        .concat(accidentManagement.middleware)
        .concat(constructionManagement.middleware)
        .concat(companyManagement.middleware)
        .concat(subscribersManagement.middleware)
        .concat(commCodeManagement.middleware)
        .concat(lawImprovementsManagement.middleware)

});

setupListeners(store.dispatch)