import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const loginManagement = createApi({
    reducerPath: 'loginManagement',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`,
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body: body,
            }),
            //transformResponse: (response, meta, arg) => response.RET_DATA,
        }),
        passwordConfirm: builder.mutation({
            query: (body) => ({
                url: 'login/passwd/confirm',
                method: 'POST',
                body: body
            })
        }),
        passwordReset: builder.mutation({
            query: (body) => ({
                url: 'login/passwd/reset',
                method: 'POST',
                body: body
            })
        })
    }),
});

export const { useLoginMutation, usePasswordConfirmMutation, usePasswordResetMutation } = loginManagement;