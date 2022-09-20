import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fileManagement = createApi({
    reducerPath: 'fileManagement',
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
        attachDetailList: builder.mutation({
            query: (atchFileId) => ({
                url: `file/attachDetailList/${atchFileId}`,
                method: 'GET',
                contentType: 'multipart/form-data',
            }),
        }),
        deleteFile: builder.mutation({
            query: (body) => ({
                url: 'file/deleteFile',
                method: 'POST',
                body: body
            })
        }),
        fileDown: builder.mutation({
            query: (atchFileId, fileSn) => ({
                url: `file/fileDown?atchFileId=${atchFileId}&fileSn${fileSn}`,
                method: 'GET',
                contentType: 'multipart/form-data',
            })
        }),
        fileDownload: builder.mutation({
            query: (body) => ({
                url: `file/fileDownload`,
                method: 'POST',
                body: body,
                contentType: 'multipart/form-data',
            })
        }),
        fileUpload: builder.mutation({
            query: (body) => ({
                url: 'file/fileUpload',
                method: 'POST',
                body: body,
            })
        }),
        getImg: builder.mutation({
            query: (imagePath) => ({
                url: `file/getImg?imgPath=${imagePath}`,
                method: 'GET',
            })
        }),
    }),
});

export const { useAttachDetailListMutation, useDeleteFileMutation, useFileDownMutation, useFileDownloadMutation, useFileUploadMutation, useGetImgMutation } = fileManagement;