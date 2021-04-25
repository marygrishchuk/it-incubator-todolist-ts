export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type ActionsType = ReturnType<typeof setAppStatusAC> |
ReturnType<typeof setAppErrorAC>

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null
}

export type InitialAppStateType = typeof initialState

export const appReducer = (state: InitialAppStateType = initialState, action: ActionsType): InitialAppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}
export const setAppErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}