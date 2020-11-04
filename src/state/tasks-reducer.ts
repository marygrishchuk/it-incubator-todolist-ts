import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";

export type RemoveTaskACType = {
    type: "REMOVE_TASK"
    taskId: string
    todoListId: string
}
export type AddTaskACType = {
    type: "ADD_TASK"
    title: string
    todoListId: string
}

export type ChangeTaskStatusACType = {
    type: "CHANGE_TASK_STATUS"
    taskId: string
    isDone: boolean
    todoListId: string
}

export type ChangeTaskTitleACType = {
    type: "CHANGE_TASK_TITLE"
    taskId: string
    title: string
    todoListId: string
}

export type ActionType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType
    | ChangeTaskTitleACType | AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case 'ADD_TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false};
            const tasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = [newTask, ...tasks]
            return stateCopy
        }
        case 'CHANGE_TASK_STATUS': {
            let task = state[action.todoListId].find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
                return {...state}
            }
            return state
        }
        case 'CHANGE_TASK_TITLE':
            let task = state[action.todoListId].find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
                return {...state}
            }
            return state
        case 'ADD-TODOLIST':
            debugger
            return {...state, [action.todoListId]: []}
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")  //soon it will be fixed to 'return state'

    }
}
//if we add empty cases there will be a TypeScript error: Object (inside test file) is possibly undefined.

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskACType => {
    return {type: 'REMOVE_TASK', taskId, todoListId}  //if key = value, no need to write both 'todoListId: todoListId'
}
//we will make server requests from action creators!

export const addTaskAC = (title: string, todoListId: string): AddTaskACType => {
    return {type: 'ADD_TASK', title, todoListId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusACType => {
    return {type: 'CHANGE_TASK_STATUS', taskId, isDone, todoListId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleACType => {
    return {type: 'CHANGE_TASK_TITLE', taskId, title, todoListId}
}