import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase.ts";
import {Login} from "../../models/requests/Login.ts";
import {Register} from "../../models/requests/Register.ts";
import {authResponse} from "../../models/response/authResponse.ts";

export const authApi = createApi({
    baseQuery: customFetchBase,
    reducerPath: 'auth',
    endpoints: (build) => ({
        login: build.mutation<authResponse, Login>({
            query(data){
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: data
                }
            }
        }),
        register: build.mutation<authResponse, Register>({
            query(data){
                return {
                    url: '/auth/register',
                    method: 'POST',
                    body: data
                }
            }
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation
} = authApi;