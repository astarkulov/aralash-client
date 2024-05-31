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

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    userState: userReducer,
    fileState: fileReducer
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
        authApi.reducerPath,
        'user',
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
            authApi.middleware
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
