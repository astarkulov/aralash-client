import {PayloadAction} from "@reduxjs/toolkit";
import {createAppSlice} from "../createAppSlice.ts";
import {RootState} from "../store.ts";

interface FileState {
    fileInProcess: File[]
}

const initialState: FileState = {
    fileInProcess: []
}

export const fileSlice = createAppSlice({
    name: "file",
    initialState,
    reducers: {
        setFileInProcess: (state, action: PayloadAction<File[]>) => {
            state.fileInProcess = action.payload;
        }
    }
})

export default fileSlice.reducer;

export const {
    setFileInProcess
} = fileSlice.actions

export const selectFileInProcess = (state: RootState) => {
    return state.fileState.fileInProcess;
}