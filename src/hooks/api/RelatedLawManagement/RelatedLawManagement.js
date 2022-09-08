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
                url: 'relatedLaw/getRelatedRawButton',
                method: 'POST',
                body: body,
            })
        }),
        insertDutyButton: builder.mutation({
            query: (body) => ({
                url: 'relatedLaw/insertDutyButton',
                method: 'POST',
                body: body,
            })
        }),
        getRelatedRaw: builder.mutation({
            query: (body) => ({
                url: 'relatedLaw/getRelatedRaw',
                method: 'POST',
                body: body,
            })
        }),
        updateRelatedRaw: builder.mutation({
            query: (body) => ({
                url: 'relatedLaw/updateRelatedRaw',
                method: 'POST',
                body: body,
            })
        }),

    })
});

export const { useGetRelatedRawMutation, useGetRelatedRawButtonMutation, useUpdateRelatedRawMutation, useInsertDutyButtonMutation } = relatedLawManagement;