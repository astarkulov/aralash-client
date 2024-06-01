import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase.ts";
import {CareerPoints} from "../../models/response/CareerPoints.ts";
import {RankingCriteria} from "../../models/response/RankingCriteria.ts";

export const cvAnalyseApi = createApi({
    baseQuery: customFetchBase,
    reducerPath: 'cvAnalyse',
    endpoints: build => ({
        startFlow: build.mutation<void, FormData>({
            query(data) {
                return {
                    url: '/cv/analyse/start-flow',
                    method: 'POST',
                    body: data,
                    headers: {
                        contentType: 'multipart/form-data',
                    },
                }
            }
        }),
        getCareerPoints: build.mutation<CareerPoints, string>({
            query(resumeId) {
                return {
                    url: '/career/career-points',
                    method: 'GET',
                    params: {resumeId}
                }
            }
        }),
        getEvaluateResume: build.mutation<RankingCriteria, string>({
            query(candidateId) {
                return {
                    url: '/cv/analyse/processed-evaluates',
                    method: 'GET',
                    params: {candidateId}
                }
            }
        })
    })
});

export const {
    useStartFlowMutation,
    useGetCareerPointsMutation,
    useGetEvaluateResumeMutation
} = cvAnalyseApi;