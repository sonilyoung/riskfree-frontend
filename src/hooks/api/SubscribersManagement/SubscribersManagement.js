import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const subscribersManagement = createApi({
    reducerPath: 'subscribersManagement',
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
        subscribersView: builder.mutation({
            query: (body) => ({
                url: 'subscribers/viwe',
                method: 'POST',
                body: body,
            }),
        }),
        subscribersUpdate: builder.mutation({
            query: (body) => ({
                url: 'subscribers/update',
                method: 'POST',
                body: body
            })
        }),
        subscribersSelect: builder.mutation({
            query: (body) => ({
                url: 'subscribers/select',
                method: 'POST',
                body: body,
            })
        }),
        subscribersInsert: builder.mutation({
            query: (body) => ({
                url: 'subscribers/insert',
                method: 'POST',
                body: body,
            })
        }),
        subscribersWorkplaceSelect: builder.mutation({
            query: (body) => ({
                url: 'subscribers/workplace/select',
                method: 'POST',
                body: body,
            })
        }),
    }),
});

export const { useSubscribersViewMutation, useSubscribersUpdateMutation, useSubscribersSelectMutation, useSubscribersInsertMutation, useSubscribersWorkplaceSelectMutation } = subscribersManagement;