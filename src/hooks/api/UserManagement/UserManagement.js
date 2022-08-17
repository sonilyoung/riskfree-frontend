import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const userManagement = createApi({
    reducerPath: 'userManagement',
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
        view: builder.mutation({
            query: () => ({
                url: 'users/view',
                method: 'POST',
            }),
        }),
    }),
  });

  export const { useViewMutation } = userManagement;