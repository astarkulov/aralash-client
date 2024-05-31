import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase.ts";

export const authApi = createApi({
    baseQuery: customFetchBase,
    reducerPath: 'auth',
    endpoints: () => ({

    })
})