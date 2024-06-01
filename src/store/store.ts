import {Action, combineReducers, ThunkAction} from "@reduxjs/toolkit"
import {configureStore} from "@reduxjs/toolkit"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {authApi} from "./api/authApi.ts";
import userReducer from "./slices/userSlice.ts";
import fileReducer from './slices/fileSlice.ts';
import {criterionApi} from "./api/criterionApi.ts";
import {templateApi} from "./api/templateApi.ts";
import {processedResumeApi} from "./api/processedResumeApi.ts";
import {cvAnalyseApi} from "./api/cvAnalyseApi.ts";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [criterionApi.reducerPath]: criterionApi.reducer,
    [templateApi.reducerPath]: templateApi.reducer,
    [processedResumeApi.reducerPath]: processedResumeApi.reducer,
    [cvAnalyseApi.reducerPath]: cvAnalyseApi.reducer,
    userState: userReducer,
    fileState: fileReducer
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
        authApi.reducerPath,
        criterionApi.reducerPath,
        templateApi.reducerPath,
        processedResumeApi.reducerPath,
        cvAnalyseApi.reducerPath,
        'file'
    ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([
            authApi.middleware,
            criterionApi.middleware,
            templateApi.middleware,
            processedResumeApi.middleware,
            cvAnalyseApi.middleware
        ]),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>
