import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

let initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todoLists',
    initialState,
    reducers: {
        removeTodoListAC(stateDraft, action: PayloadAction<string>) {
            const index = stateDraft.findIndex(tl => tl.id === action.payload)
            if (index > -1) {
                stateDraft.splice(index, 1)
            }
        },
        addTodoListAC(stateDraft, action: PayloadAction<TodolistType>) {
            stateDraft.unshift({...action.payload, filter: 'all', entityStatus: "succeeded"})
        },
        changeTodoListTitleAC(stateDraft, action: PayloadAction<{ todoListId: string, title: string }>) {
            const index = stateDraft.findIndex(tl => tl.id === action.payload.todoListId)
            stateDraft[index].title = action.payload.title
        },
        changeTodoListFilterAC(stateDraft, action: PayloadAction<{ todoListId: string, filter: FilterValuesType }>) {
            const index = stateDraft.findIndex(tl => tl.id === action.payload.todoListId)
            stateDraft[index].filter = action.payload.filter
        },
        setTodolistsAC(stateDraft, action: PayloadAction<Array<TodolistType>>) {
            return action.payload.map(tl => ({
                ...tl,
                filter: 'all',
                entityStatus: "succeeded"
            }))
        },
        changeTodolistEntityStatusAC(stateDraft, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            const index = stateDraft.findIndex(tl => tl.id === action.payload.id)
            stateDraft[index].entityStatus = action.payload.entityStatus
        },
    }
})

export const todoListReducer = slice.reducer

//action creators
export const {
    removeTodoListAC,
    addTodoListAC,
    changeTodoListTitleAC,
    changeTodoListFilterAC,
    setTodolistsAC,
    changeTodolistEntityStatusAC
} = slice.actions

//thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}

export const removeTodoListTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC({id: todoListId, entityStatus: 'loading'}))
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

export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
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

export const updateTodolistTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC({id: todoListId, entityStatus: 'loading'}))
    todolistAPI.updateTodolistTitle(todoListId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC({todoListId, title}))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodolistEntityStatusAC({id: todoListId, entityStatus: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTodolistEntityStatusAC({id: todoListId, entityStatus: 'failed'}))
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
        dispatch(changeTodolistEntityStatusAC({id: todoListId, entityStatus: 'failed'}))
    })
}

//types

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}