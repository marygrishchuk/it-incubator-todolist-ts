import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
    todoListId: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    id: string
}

export type ActionType = ChangeTodolistFilterActionType | ChangeTodolistTitleActionType | AddTodolistActionType |RemoveTodolistActionType

export const todoListReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)  //filter creates new array
            //To delete the tasks of the removed todoList, tasks-reducer.ts is used
        case 'ADD-TODOLIST':
            debugger
            const newTodoList: TodoListType = {
                id: action.todoListId, title: action.title, filter: "all"
            }
            return [newTodoList, ...state]

        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...state]
            }
            return state
        }
        case 'CHANGE-TODOLIST-FILTER':
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...state]
            }
            return state
        default:
            throw new Error ("I don't understand this type")  //soon it will be fixed to 'return state'

    }
}
//if we add empty cases there will be a TypeScript error: Object (inside test file) is possibly undefined.

export const removeTodoListAC = (todoListId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListId}
}
//we will make server requests from action creators!

export const addTodoListAC = (todoListTitle: string, todoListId:string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: todoListTitle, todoListId} //NEVER create IDs for new todolists in ActionCreators!
}

export const changeTodoListTitleAC = (todoListId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todoListId, title: title}
}

export const changeTodoListFilterAC = (todoListId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todoListId, filter: filter}
}