import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase.ts";
import {Candidate} from "../../models/response/Candidate.ts";
import {ProcessedInfo} from "../../models/response/ProcessedInfo.ts";

export const processedResumeApi = createApi({
    baseQuery: customFetchBase,
    reducerPath: 'processedResume',
    endpoints: (build) => ({
        getProcessedList: build.query<Candidate[], void>({
            query() {
                return {
                    url: '/cv/analyse/list-processed',
                    method: 'GET',
                }
            }
        }),
        getProcessedInfo: build.query<ProcessedInfo, string>({
            query(id) {
                return {
                    url: '/cv/analyse/processed-info',
                    method: 'GET',
                    params: {id}
                }
            }
        })
    })
});

export const {
    useGetProcessedListQuery,
    useGetProcessedInfoQuery
} = processedResumeApi;