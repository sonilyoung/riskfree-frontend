import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const mainManagement = createApi({
    reducerPath: 'mainManagement',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`,
        prepareHeaders: (headers) => {
            const MonitorView = window.sessionStorage.getItem('MonitorView');
            const jwtToken = localStorage.getItem('userToken');
            if (MonitorView){
                headers.set('authorization', `Bearer ${MonitorView}`)
            } else {
                if (jwtToken) {
                    headers.set('authorization', `Bearer ${jwtToken}`)
                }
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
        }),
        getImprovementList: builder.mutation({
            query: (body) => ({
                url: 'main/getImprovementList',
                method: 'POST',
                body: body,
            }),
        }),
        getLeaderImprovementList: builder.mutation({
            query: (body) => ({
                url: 'main/getLeaderImprovementList',
                method: 'POST',
                body: body,
            }),
        }),
        getAccidentTotal: builder.mutation({
            query: (body) => ({
                url: 'main/getAccidentTotal',
                method: 'POST',
                body: body,
            }),
        }),
        getSafeWorkHistoryList: builder.mutation({
            query: (body) => ({
                url: 'main/getSafeWorkHistoryList',
                method: 'POST',
                body: body,
            }),
        }),
        getDayInfo: builder.mutation({
            query: (body) => ({
                url: 'main/getDayInfo',
                method: 'POST',
                body: body,
            }),
        }),
        getNoticeList: builder.mutation({
            query: (body) => ({
                url: 'main/getNoticeList',
                method: 'POST',
                body: body,
            }),
        }),
        getBaselineList: builder.mutation({
            query: (body) => ({
                url: 'main/getBaselineList',
                method: 'POST',
                body: body,
            }),
        }),
        getBaseline: builder.mutation({
            query: (body) => ({
                url: 'main/getBaseline',
                method: 'POST',
                body: body,
            }),
        }),
        getNoticeHotList: builder.mutation({
            query: (body) => ({
                url: 'main/getNoticeHotList',
                method: 'POST',
                body: body,
            }),
        }),
        getEssentialRate: builder.mutation({
            query: (body) => ({
                url: 'main/getEssentialRate',
                method: 'POST',
                body: body,
            }),
        }),
        getAccidentsPrevention: builder.mutation({
            query: (body) => ({
                url: 'main/getAccidentsPrevention',
                method: 'POST',
                body: body,
            }),
        }),
        getImprovementLawOrder: builder.mutation({
            query: (body) => ({
                url: 'main/getImprovemetLawOrder',
                method: 'POST',
                body: body,
            }),
        }),
        getRelatedLawRate: builder.mutation({
            query: (body) => ({
                url: 'main/getRelatedLawRate',
                method: 'POST',
                body: body,
            }),
        }),
        getDutyDetailList: builder.mutation({
            query: (body) => ({
                url: 'main/getDutyDetailList',
                method: 'POST',
                body: body,
            }),
        }),
        getInspectiondocs: builder.mutation({
            query: (body) => ({
                url: 'main/getInspectiondocs',
                method: 'POST',
                body: body,
            }),
        }),
        getDutyCycle: builder.mutation({
            query: (body) => ({
                url: 'main/getDutyCyle',
                method: 'POST',
                body: body,
            }),
        }),
        getDutyAssigned: builder.mutation({
            query: (body) => ({
                url: 'main/getDutyAssigned',
                method: 'POST',
                body: body,
            }),
        }),
        getRelatedArticle: builder.mutation({
            query: (body) => ({
                url: 'main/getRelatedArticle',
                method: 'POST',
                body: body,
            }),
        }),
        updateRelatedArticle: builder.mutation({
            query: (body) => ({
                url: 'main/updateRelatedArticle',
                method: 'POST',
                body: body,
            }),
        }),
        getGuideLine: builder.mutation({
            query: (body) => ({
                url: 'main/getGuideLine',
                method: 'POST',
                body: body,
            }),
        }),
        getCompanyInfo: builder.mutation({
            query: (body) => ({
                url: 'main/getCompanyInfo',
                method: 'POST',
                body: body,
            }),
        }),
        getTitleReport: builder.mutation({
            query: (body) => ({
                url: 'main/getTitleReport',
                method: 'POST',
                body: body,
            }),
        }),
        getBaseLineReport: builder.mutation({
            query: (body) => ({
                url: 'main/getBaseLineReport',
                method: 'POST',
                body: body,
            }),
        }),
        insertBaseline: builder.mutation({
            query: (body) => ({
                url: 'main/insertBaseline',
                method: 'POST',
                body: body,
            }),
        }),
        insertBaseLineDataCopy: builder.mutation({
            query: (body) => ({
                url: 'main/insertBaseLineDataCopy',
                method: 'POST',
                body: body,
            }),
        }),
        insertBaseLineDataUpdate: builder.mutation({
            query: (body) => ({
                url: 'main/insertBaseLineDataUpdate',
                method: 'POST',
                body: body,
            }),
        }),
        close: builder.mutation({
            query: (body) => ({
                url: 'main/close',
                method: 'POST',
                body: body,
            }),
        }),
        getWeather: builder.mutation({
            query: (body) => ({
                url: 'main/getWeather',
                method: 'POST',
                body: body,
            }),
        }),
        updateUserCompany: builder.mutation({
            query: (body) => ({
                url: 'main/updateUserCompany',
                method: 'POST',
                body: body,
            }),
        }),
        getEssentialDutyVersion: builder.mutation({
            query: () => ({
                url: 'main/getEssentialDutyVersion',
                method: 'POST',
            })
        }),
        updateSafetyFile: builder.mutation({
            query: (body) => ({
                url: 'main/updateSafetyFile',
                method: 'POST',
                body: body,
            }),
        }),
        updateScore: builder.mutation({
            query: (body) => ({
                url: 'main/updateScore',
                method: 'POST',
                body: body,
            }),
        }),
        getAccidentsPreventionReport: builder.mutation({
            query: (body) => ({
                url: 'main/getAccidentsPreventionReport',
                method: 'POST',
                body: body,
            }),
        }),
        getImprovemetLawOrderReport: builder.mutation({
            query: (body) => ({
                url: 'main/getImprovemetLawOrderReport',
                method: 'POST',
                body: body,
            }),
        }),
        getBaseLineReportGraph: builder.mutation({
            query: (body) => ({
                url: 'main/getBaseLineReportGraph',
                method: 'POST',
                body: body,
            }),
        }),
        getUserDutyUpload: builder.mutation({
            query: (body) => ({
                url: 'common/excel/userDutyExcel',
                method: 'POST',
                body: body,
                contentType: 'multipart/form-data'
            }),
        }),          
        deleteBaseline: builder.mutation({
            query: (body) => ({
                url: 'main/deleteBaseline',
                method: 'POST',
                body: body,
            }),
        }),        
    }),
});
export const { useUpdateScoreMutation, useUpdateSafetyFileMutation, useGetWorkplaceListMutation, useGetLoginInfoMutation
            , useGetAccidentTotalMutation, useGetImprovementListMutation, useGetSafeWorkHistoryListMutation
            , useGetLeaderImprovementListMutation, useGetDayInfoMutation, useGetNoticeListMutation, useGetBaselineMutation
            , useGetBaselineListMutation, useGetNoticeHotListMutation, useGetAccidentsPreventionMutation, useGetEssentialRateMutation
            , useGetImprovementLawOrderMutation, useGetRelatedLawRateMutation, useGetDutyDetailListMutation, useGetInspectiondocsMutation
            , useGetDutyCycleMutation, useGetDutyAssignedMutation, useGetRelatedArticleMutation, useUpdateRelatedArticleMutation
            , useGetGuideLineMutation, useGetTitleReportMutation, useGetCompanyInfoMutation, useGetBaseLineReportMutation
            , useCloseMutation, useInsertBaseLineDataCopyMutation, useInsertBaselineMutation, useGetWeatherMutation
            , useInsertBaseLineDataUpdateMutation, useUpdateUserCompanyMutation, useGetAccidentsPreventionReportMutation
            , useGetImprovemetLawOrderReportMutation, useGetEssentialDutyVersionMutation, useGetBaseLineReportGraphMutation 
            , useGetUserDutyUploadMutation, useDeleteBaselineMutation} = mainManagement;