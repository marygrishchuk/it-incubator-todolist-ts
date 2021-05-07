import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {authAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatusAC(stateDraft, action: PayloadAction<RequestStatusType>){
            stateDraft.status = action.payload
        },
        setAppErrorAC(stateDraft, action: PayloadAction<string | null>){
            stateDraft.error = action.payload
        },
        setIsInitializedAC(stateDraft, action: PayloadAction<boolean>){
            stateDraft.isInitialized = action.payload
        }
    }
})

export const appReducer = slice.reducer

//action creators
export const {setAppStatusAC, setAppErrorAC, setIsInitializedAC} = slice.actions

//thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(setIsInitializedAC(true))
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}

//types
export type InitialAppStateType = typeof initialState

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'