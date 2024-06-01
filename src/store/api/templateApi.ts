import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase.ts";
import {Ranking} from "../../models/Ranking.ts";
import {Template} from "../../models/response/TemplateDto.ts";

export const templateApi = createApi({
    baseQuery: customFetchBase,
    reducerPath: 'template',
    tagTypes: ['Templates'],
    endpoints: (build) => ({
        getAllTemplates: build.query<Template[], void>({
            query() {
                return {
                    url: '/template/all',
                    method: 'GET'
                }
            },
            providesTags: ['Templates']
        }),
        addTemplate: build.mutation<void, Ranking>({
            query(data) {
                return {
                    url: '/template',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['Templates']
        }),
        changeTemplate: build.mutation<void, Ranking>({
            query(data) {
                return {
                    url: '/template',
                    method: 'PUT',
                    body: data
                }
            },
            invalidatesTags: ['Templates']
        }),
        deleteTemplate: build.mutation<void, string>({
            query(id) {
                return {
                    url: '/template',
                    method: 'DELETE',
                    params: {id}
                }
            },
            invalidatesTags: ['Templates']
        }),
    })
})

export const {
    useAddTemplateMutation,
    useDeleteTemplateMutation,
    useGetAllTemplatesQuery,
    useChangeTemplateMutation
} = templateApi