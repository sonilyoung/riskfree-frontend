import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const improvementsManagement = createApi({
    reducerPath: 'improvementsManagement',
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
        improvementView: builder.mutation({
            query: (body) => ({
                url: `improvement/view?improveId=${body}`,
                method: 'POST',
            }),
        }),
        improvementUpdate: builder.mutation({
            query: (body) => ({
                url: 'improvement/update',
                method: 'POST',
                body: body
            }),
        }),
        improvementSelect: builder.mutation({
            query: (body) => ({
                url: 'improvement/select',
                method: 'POST',
                body: body
            }),
        }),
        improvementRequestersSelect: builder.mutation({
            query: (body) => ({
                url: 'improvement/reqUserName/select',
                method: 'POST',
                body: body
            }),
        }),
        improvementInsert: builder.mutation({
            query: (body) => ({
                url: 'improvement/insert',
                method: 'POST',
                body: body
            }),
        }),
        improvementDelete: builder.mutation({
            query: (body) => ({
                url: `improvement/delete?improveId=${body}`,
                method: 'POST',
            }),
        }),
        getGenerateKey: builder.mutation({
            query: () => ({
                url: 'improvement/getGenerateKey',
                method: 'POST'
            }),
        }),
    }),
});

export const { useGetGenerateKeyMutation, useImprovementViewMutation, useImprovementUpdateMutation, useImprovementSelectMutation, useImprovementRequestersSelectMutation, useImprovementInsertMutation, useImprovementDeleteMutation } = improvementsManagement;