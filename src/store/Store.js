import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userSlice } from '../slices/User';
import { mainSelectionSlice } from '../slices/selections/MainSelection';
import { loginManagement } from '../hooks/api/LoginManagement/LoginManagement';
import { userManagement } from '../hooks/api/UserManagement/UserManagement';
import { noticesManagement } from '../hooks/api/NoticesManagement/NoticesManagement';
import { improvementsManagement } from '../hooks/api/ImprovementsManagement/ImprovementsManagement';
import { accidentManagement } from '../hooks/api/AccidentManagement/AccidentManagement';
import { constructionManagement } from '../hooks/api/ConstructionManagement/ConstructionManagement';
import { mainManagement } from '../hooks/api/MainManagement/MainManagement';
import { subscribersManagement } from '../hooks/api/SubscribersManagement/SubscribersManagement';
import { commCodeManagement } from '../hooks/api/CommCodeManagement/CommCodeManagement';
import { lawImprovementsManagement } from '../hooks/api/LawImprovementsManagement/LawImprovementsManagement';
import { relatedLawManagement } from '../hooks/api/RelatedLawManagement/RelatedLawManagement';
import { safeWorkManagement } from '../hooks/api/SafeWorkManagement/SafeWorkManagement';
import { fileManagement } from '../hooks/api/FileManagement/FIleManagement';

export const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [mainSelectionSlice.name]: mainSelectionSlice.reducer,
        [loginManagement.reducerPath]: loginManagement.reducer,
        [userManagement.reducerPath]: userManagement.reducer,
        [noticesManagement.reducerPath]: noticesManagement.reducer,
        [improvementsManagement.reducerPath]: improvementsManagement.reducer,
        [accidentManagement.reducerPath]: accidentManagement.reducer,
        [constructionManagement.reducerPath]: constructionManagement.reducer,
        [mainManagement.reducerPath]: mainManagement.reducer,
        [subscribersManagement.reducerPath]: subscribersManagement.reducer,
        [commCodeManagement.reducerPath]: commCodeManagement.reducer,
        [lawImprovementsManagement.reducerPath]: lawImprovementsManagement.reducer,
        [relatedLawManagement.reducerPath]: relatedLawManagement.reducer,
        [safeWorkManagement.reducerPath]: safeWorkManagement.reducer,
        [fileManagement.reducerPath]: fileManagement.reducer,
        devTools: process.env.NODE_ENV === 'development',
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(loginManagement.middleware)
        .concat(userManagement.middleware)
        .concat(noticesManagement.middleware)
        .concat(improvementsManagement.middleware)
        .concat(accidentManagement.middleware)
        .concat(constructionManagement.middleware)
        .concat(mainManagement.middleware)
        .concat(subscribersManagement.middleware)
        .concat(commCodeManagement.middleware)
        .concat(lawImprovementsManagement.middleware)
        .concat(relatedLawManagement.middleware)
        .concat(safeWorkManagement.middleware)
        .concat(fileManagement.middleware)

});

setupListeners(store.dispatch)