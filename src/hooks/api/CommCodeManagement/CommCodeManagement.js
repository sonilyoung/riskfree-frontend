import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const commCodeManagement = createApi({
    reducerPath: 'commCodeManagement',
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
        getCommCodeList: builder.mutation({
            query: (body) => ({
                url: 'commCode/getCommCodeList',
                method: 'POST',
                body: body,
            })
        }),
        getCSCCodeList: builder.mutation({
            query: (body) => ({
                url: 'commCode/getCSCCodeList',
                method: 'POST',
                body: body,
            })
        })
    }),
});

export const { useGetCommCodeListMutation, useGetCSCCodeListMutation } = commCodeManagement;