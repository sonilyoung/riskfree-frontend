import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const companyManagement = createApi({
    reducerPath: 'companyManagement',
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
        companyView: builder.mutation({
            query: (body) => ({
                url: 'company/view',
                method: 'POST',
                body: body,
            }),
        }),
        companyUpdate: builder.mutation({
            query: (body) => ({
                url: 'company/update',
                method: 'POST',
                body: body
            })
        }),
        companyWorkspaceView: builder.mutation({
            query: (body) => ({
                url: 'company/workspaces/view',
                method: 'POST',
                body: body,
            }),
        }),
        companyWorkspaceUpdate: builder.mutation({
            query: (body) => ({
                url: 'company/workspaces/update',
                method: 'POST',
                body: body,
            }),
        }),
        companyWorkspaceInsert: builder.mutation({
            query: (body) => ({
                url: 'company/workspaces/insert',
                method: 'POST',
                body: body,
            }),
        }),
        companyWorkspaceDelete: builder.mutation({
            query: (body) => ({
                url: 'company/workspaces/delete',
                method: 'POST',
                body: body,
            }),
        }),
        companyWorkspaceSelect: builder.mutation({
            query: (body) => ({
                url: 'company/workspaces/select',
                method: 'POST',
                body: body,
            }),
        }),
        companyBaselineView: builder.mutation({
            query: (body) => ({
                url: 'company/baselines/view',
                method: 'POST',
                body: body,
            }),
        }),
        companyBaselineUpdate: builder.mutation({
            query: (body) => ({
                url: 'company/baselines/update',
                method: 'POST',
                body: body,
            }),
        }),
        companyBaselineInsert: builder.mutation({
            query: (body) => ({
                url: 'company/baselines/insert',
                method: 'POST',
                body: body,
            }),
        }),
        companyBaselineDelete: builder.mutation({
            query: (body) => ({
                url: 'company/baselines/delete',
                method: 'POST',
                body: body,
            }),
        }),
        companyBaselineSelect: builder.mutation({
            query: (body) => ({
                url: 'company/baselines/select',
                method: 'POST',
                body: body,
            }),
        }),
        companyBaselineClose: builder.mutation({
            query: (body) => ({
                url: 'company/baselines/close',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const { useCompanyViewMutation, useCompanyUpdateMutation, useCompanyWorkspaceViewMutation, useCompanyWorkspaceUpdateMutation, useCompanyWorkspaceSelectMutation, useCompanyWorkspaceInsertMutation, useCompanyWorkspaceDeleteMutation, useCompanyBaselineViewMutation, useCompanyBaselineUpdateMutation, useCompanyBaselineSelectMutation, useCompanyBaselineInsertMutation, useCompanyBaselineDeleteMutation, useCompanyBaselineCloseMutation } = companyManagement;