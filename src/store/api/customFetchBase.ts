import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import {Mutex} from 'async-mutex';
import {logout, setAccessToken} from "../slices/userSlice";
import {authResponse} from "../../models/response/authResponse";
import {RootState} from "../store";
import {HttpStatusCode} from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).userState.accessToken
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    },
})
const customFetchBase: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === HttpStatusCode.Unauthorized) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshResult = await baseQuery(
                    'auth/refresh',
                    api,
                    extraOptions
                )
                if (refreshResult.data) {
                    const data = refreshResult.data as authResponse
                    api.dispatch(setAccessToken(data.accessToken))
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    api.dispatch(logout)
                    window.location.href = window.location.href + "login"
                }
            } finally {
                // release must be called once the mutex should be released again.
                release()
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}

export default customFetchBase;
