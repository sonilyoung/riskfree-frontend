import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const safeWorkManagement = createApi({
    reducerPath: 'safeWorkManagement',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`,
        prepareHeaders: (headers) => {
            const jwtToken = localStorage.getItem('userToken');

            if (jwtToken) {
                headers.set('authorization', `Bearer ${jwtToken}`);
            }

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getSafeWork: builder.mutation({
            query: (body) => ({
                url: 'work/getSafeWork',
                method: 'POST',
                body: body,
            })
        }),
        getSafeWorkFile: builder.mutation({
            query: (body) => ({
                url: 'work/getSafeWorkFile',
                method: 'POST',
                body: body,
            })
        }),
        getSafeWorkFileTopInfo: builder.mutation({
            query: (body) => ({
                url: 'work/getSafeWorkFileTopInfo',
                method: 'POST',
                body: body,
            })
        }),
    })
});

export const { useGetSafeWorkMutation, useGetSafeWorkFileMutation, useGetSafeWorkFileTopInfoMutation } = safeWorkManagement;