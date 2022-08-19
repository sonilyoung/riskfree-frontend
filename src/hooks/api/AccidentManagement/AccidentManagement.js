import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const accidentManagement = createApi({
    reducerPath: 'accidentManagement',
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
        accidentView: builder.mutation({
            query: (body) => ({
                url: 'accidents/view',
                method: 'POST',
                body: body,
            }),
        }),
        accidentUpdate: builder.mutation({
            query: (body) => ({
                url: 'accidents/update',
                method: 'POST',
                body: body
            })
        }),
        accidentSelect: builder.mutation({
            query: (body) => ({
                url: 'accidents/select',
                method: 'POST',
                body: body,
            })
        }),
        accidentOccurPlaceSelect: builder.mutation({
            query: (body) => ({
                url: 'accidents/occurPlace/select',
                method: 'POST',
                body: body,
            })
        }),
        accidentInsert: builder.mutation({
            query: (body) => ({
                url: 'accidents/insert',
                method: 'POST',
                body: body,
            })
        }),
        accidentDelete: builder.mutation({
            query: (body) => ({
                url: 'accidents/delete',
                method: 'POST',
                body: body,
            })
        }),
    }),
});

export const { useAccidentViewMutation, useAccidentUpdateMutation, useAccidentSelectMutation, useAccidentOccurPlaceSelectMutation, useAccidentInsertMutation, useAccidentDeleteMutation } = accidentManagement;