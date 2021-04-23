import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type todoListActionType = ReturnType<typeof removeTodoListAC> |
    ReturnType<typeof addTodoListAC> |
    ReturnType<typeof changeTodoListTitleAC> |
    ReturnType<typeof changeTodoListFilterAC> |
    ReturnType<typeof setTodolistsAC>

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

let initialState: Array<TodolistDomainType> = []

export const todoListReducer = (state: Array<TodolistDomainType> = initialState, action: todoListActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)  //filter creates new array
        //To delete the tasks of the removed todoList, tasks-reducer.ts is used
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }
        case 'ADD-TODOLIST':
            const newTodoList: TodolistDomainType = {...action.todoList, filter: 'all'}
            return [newTodoList, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state

    }
}
//if we add empty cases there will be a TypeScript error: Object (inside test file) is possibly undefined.

export const removeTodoListAC = (todoListId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todoListId} as const
}
//we will make server requests from action creators!

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

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        }).catch(err => console.warn(err))
}

export const removeTodoListTC = (todoListId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todoListId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoListAC(todoListId))
            }
        }).catch(err => console.warn(err))
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const todoList = res.data.data.item
                dispatch(addTodoListAC(todoList))
            }
        }).catch(err => console.warn(err))
}

export const updateTodolistTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolistTitle(todoListId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(todoListId, title))
            }
        }).catch(err => console.warn(err))
}