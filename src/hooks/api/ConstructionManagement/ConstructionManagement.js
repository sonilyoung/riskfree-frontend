import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const constructionManagement = createApi({
    reducerPath: 'constructionManagement',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`,
        prepareHeaders: (headers) => {
            const jwtToken = localStorage.getItem('userToken');

            if (jwtToken) {
                headers.set('authorization', `Bearer ${jwtToken}`)
            }

            return headers
        },
    }),
    endpoints: (builder) => ({
        constructionHistorySelect: builder.mutation({
            query: (body) => ({
                url: 'construction-history/select',
                method: 'POST',
                body: body,
            })
        }),
    }),
});

export const { useConstructionHistorySelectMutation } = constructionManagement;