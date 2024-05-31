import {createAppSlice} from "../createAppSlice.ts";
import {PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser.ts";

interface UserState {
    user: IUser,
    accessToken: string
}

const initialState: UserState = {
    user: {
        name: ''
    },
    accessToken: ''
}

export const userSlice = createAppSlice({
    name: "user",
    initialState,
    reducers: {
        logout: () => {
            localStorage.removeItem("accessToken");
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            localStorage.setItem("accessToken", action.payload);
            state.accessToken = action.payload;
        },
    }
})

export default userSlice.reducer;

export const {
    logout,
    setUser,
    setAccessToken
} = userSlice.actions;
