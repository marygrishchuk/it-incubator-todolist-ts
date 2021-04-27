import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {authAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

export const appReducer = (state: InitialAppStateType = initialState, action: AppActionsType): InitialAppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

//action creators
export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}
export const setAppErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}

export const setIsInitializedAC = (isInitialized: boolean) => {
    return {type: 'APP/SET-INITIALIZED', isInitialized} as const
}

//thunk
export const initializeAppTC = () => (dispatch: ThunkDispatch) => {
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

export type AppActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setIsInitializedAC>

type ThunkDispatch = Dispatch<ReturnType<typeof setIsLoggedInAC> | AppActionsType>