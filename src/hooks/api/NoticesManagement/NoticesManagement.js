import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const noticesManagement = createApi({
    reducerPath: 'noticesManagement',
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
        noticesView: builder.mutation({
            query: (body) => ({
                url: 'notices/view',
                method: 'POST',
                body: body,
            }),
        }),
        noticesUpdate: builder.mutation({
            query: (body) => ({
                url: 'notices/update',
                method: 'POST',
                body: body
            })
        }),
        noticesSelect: builder.mutation({
            query: (body) => ({
                url: 'notices/select',
                method: 'POST',
                body: body,
            })
        }),
        noticesInsert: builder.mutation({
            query: (body) => ({
                url: 'notices/insert',
                method: 'POST',
                body: body,
            })
        }),
        noticesDelete: builder.mutation({
            query: (body) => ({
                url: 'notices/delete',
                method: 'POST',
                body: body,
            })
        }),
    }),
});

export const { useNoticesViewMutation, useNoticesUpdateMutation, useNoticesSelectMutation, useNoticesInsertMutation, useNoticesDeleteMutation } = noticesManagement;