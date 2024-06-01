import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {selectCurrentUser, setAccessToken} from "../store/slices/userSlice.ts";
import {useMemo} from "react";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser)
    if(!user.accessToken){
        const token = localStorage.getItem("accessToken")
        dispatch(setAccessToken(token!))
    }

    return useMemo(() => ({ user }), [user])
}