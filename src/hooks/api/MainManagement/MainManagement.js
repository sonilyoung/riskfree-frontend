import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const mainManagement = createApi({
    reducerPath: 'mainManagement',
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
        getWorkplaceList: builder.mutation({
            query: (body) => ({
                url: 'main/getWorkplaceList',
                method: 'POST',
                body: body,
            }),
        }),
        getLoginInfo: builder.mutation({
            query: (body) => ({
                url: 'main/getLoginInfo',
                method: 'POST',
                body: body,
            }),
        })

    }),
});

export const { useGetWorkplaceListMutation, useGetLoginInfoMutation } = mainManagement;