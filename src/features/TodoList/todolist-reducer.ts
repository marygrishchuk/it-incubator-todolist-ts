import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType, RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

let initialState: Array<TodolistDomainType> = []

export const todoListReducer = (state: Array<TodolistDomainType> = initialState, action: TodoListActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)  //filter creates new array
        //the tasks of the removed todoList will be removed using tasks-reducer.ts
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all',
                entityStatus: "succeeded"
            }))
        }
        case 'ADD-TODOLIST':
            const newTodoList: TodolistDomainType = {...action.todoList, filter: 'all', entityStatus: "succeeded"}
            return [newTodoList, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state

    }
}

//action creators
export const removeTodoListAC = (todoListId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todoListId} as const
}

export const addTodoListAC = (todoList: TodolistType) => {
    return {type: 'ADD-TODOLIST', todoList} as const //NEVER create IDs for new todolists in ActionCreators!
}

export const changeTodoListTitleAC = (todoListId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todoListId, title: title} as const
}

export const changeTodoListFilterAC = (todoListId: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todoListId, filter: filter} as const
}

export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}

export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus} as const
}

//thunks
export const fetchTodolistsTC = () => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}

export const removeTodoListTC = (todoListId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todoListId, 'loading'))
    todolistAPI.deleteTodolist(todoListId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoListAC(todoListId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}

export const addTodoListTC = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const todoList = res.data.data.item
                dispatch(addTodoListAC(todoList))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}

export const updateTodolistTitleTC = (todoListId: string, title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todoListId, 'loading'))
    todolistAPI.updateTodolistTitle(todoListId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(todoListId, title))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodolistEntityStatusAC(todoListId, 'succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTodolistEntityStatusAC(todoListId, 'failed'))
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
        dispatch(changeTodolistEntityStatusAC(todoListId, 'failed'))
    })
}

//types
export type TodoListActionType =
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

type ThunkDispatch = Dispatch<TodoListActionType | AppActionsType>