import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase.ts";
import {HardSkillDto} from "../../models/requests/HardSkillDto.ts";
import {HardSkill} from "../../models/response/HardSkill.ts";
import {SpecializationDto} from "../../models/requests/SpecializationDto.ts";
import {Specialization} from "../../models/response/Specialization.ts";

export const criterionApi = createApi({
    baseQuery: customFetchBase,
    reducerPath: 'aralash',
    tagTypes: ['HardSkills', 'Specializations'],
    endpoints: (build) => ({
        addHardSkill: build.mutation<void, HardSkillDto>({
            query(data){
                return {
                    url: '/hardSkill',
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ['HardSkills']
        }),
        getHardSkillById: build.query<HardSkill, string>({
            query(id) {
                return {
                    url: '/hardSkill',
                    method: 'GET',
                    params: {id}
                }
            }
        }),
        getHardSkills: build.query<HardSkill[], void>({
            query() {
                return {
                    url: '/hardSkill/all',
                    method: 'GET',
                }
            },
            providesTags: ['HardSkills']
        }),
        changeHardSkill: build.mutation<void, HardSkill>({
            query(data){
                return {
                    url: '/hardSkill',
                    method: 'PUT',
                    body: data
                }
            },
            invalidatesTags: ['HardSkills']
        }),
        deleteHardSkill: build.mutation<void, string>({
            query(id){
                return {
                    url: '/hardSkill',
                    method: 'DELETE',
                    params: {id}
                }
            },
            invalidatesTags: ['HardSkills']
        }),
        addSpecialization: build.mutation<void, SpecializationDto>({
            query(data){
                return {
                    url: '/specialization',
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ['Specializations']
        }),
        getSpecializationById: build.query<Specialization, string>({
            query(id) {
                return {
                    url: '/specialization',
                    method: 'GET',
                    params: {id}
                }
            }
        }),
        getSpecializations: build.query<Specialization[], void>({
            query() {
                return {
                    url: '/specialization/all',
                    method: 'GET',
                }
            },
            providesTags: ['Specializations']
        }),
        changeSpecialization: build.mutation<void, Specialization>({
            query(data){
                return {
                    url: '/specialization',
                    method: 'PUT',
                    body: data
                }
            },
            invalidatesTags: ['Specializations']
        }),
        deleteSpecialization: build.mutation<void, string>({
            query(id){
                return {
                    url: '/specialization',
                    method: 'DELETE',
                    params: {id}
                }
            },
            invalidatesTags: ['Specializations']
        }),
    })
})

export const {
    useGetHardSkillByIdQuery,
    useGetHardSkillsQuery,
    useAddHardSkillMutation,
    useChangeHardSkillMutation,
    useDeleteHardSkillMutation,
    useGetSpecializationByIdQuery,
    useGetSpecializationsQuery,
    useAddSpecializationMutation,
    useChangeSpecializationMutation,
    useDeleteSpecializationMutation,
} = criterionApi;