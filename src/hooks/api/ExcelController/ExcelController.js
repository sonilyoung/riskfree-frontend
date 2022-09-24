import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const excelController = createApi({
    reducerPath: 'excelController',
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
        excelUpload: builder.mutation({
            query: (body) => ({
                url: 'common/excel/excelUpload',
                method: 'POST',
                body: body,
                contentType: 'multipart/form-data',
            })
        }),
    }),
});

export const { useExcelUploadMutation } = excelController