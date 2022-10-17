import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const relatedLawManagement = createApi({
    reducerPath: 'relatedLawManagement',
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
        getRelatedRawButton: builder.mutation({
            query: (body) => ({
                url: 'relatedlaw/getRelatedRawButton',
                method: 'POST',
                body: body,
            })
        }),
        insertDutyButton: builder.mutation({
            query: (body) => ({
                url: 'relatedlaw/insertDutyButton',
                method: 'POST',
                body: body,
            })
        }),
        getRelatedRaw: builder.mutation({
            query: (body) => ({
                url: 'relatedlaw/getRelatedRaw',
                method: 'POST',
                body: body,
            })
        }),
        updateRelatedRaw: builder.mutation({
            query: (body) => ({
                url: 'relatedlaw/updateRelatedRaw',
                method: 'POST',
                body: body,
            })
        }),
        deleteDutyButton: builder.mutation({
            query: (body) => ({
                url: 'relatedlaw/deleteButton',
                method: 'POST',
                body: body,
            })
        })

    })
});

export const { useGetRelatedRawMutation, useGetRelatedRawButtonMutation, useUpdateRelatedRawMutation, useInsertDutyButtonMutation, useDeleteDutyButtonMutation } = relatedLawManagement;