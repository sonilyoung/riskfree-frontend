import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const lawImprovementsManagement = createApi({
    reducerPath: 'lawImprovementsManagement',
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
        lawView: builder.mutation({
            query: (body) => ({
                url: `improvement/law/view?lawImproveId=${body}`,
                method: 'POST',
            }),
        }),
        lawUpdate: builder.mutation({
            query: (body) => ({
                url: 'improvement/law/update',
                method: 'POST',
                body: body
            })
        }),
        lawSelect: builder.mutation({
            query: (body) => ({
                url: 'improvement/law/select',
                method: 'POST',
                body: body,
            })
        }),
        lawIssueReassonSelect: builder.mutation({
            query: (body) => ({
                url: `improvement/law/issueReason/select?baselineId=${body}`,
                method: 'POST',
            })
        }),
        lawInsert: builder.mutation({
            query: (body) => ({
                url: 'improvement/law/insert',
                method: 'POST',
                body: body,
            })
        }),
        lawDelete: builder.mutation({
            query: (body) => ({
                url: `improvement/law/delete?lawImproveId=${body}`,
                method: 'POST',
            })
        }),
    }),
});

export const { useLawViewMutation, useLawUpdateMutation, useLawSelectMutation, useLawIssueReassonSelectMutation, useLawInsertMutation, useLawDeleteMutation } = lawImprovementsManagement;