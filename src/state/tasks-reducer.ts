import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type TaskActionType = ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskStatusAC> |
    ReturnType<typeof changeTaskTitleAC> |
    ReturnType<typeof removeTodoListAC> |
    ReturnType<typeof addTodoListAC>

let initialState: TasksStateType = {}   //associative array

export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case 'ADD_TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todoListId,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: ''
            };
            const tasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = [newTask, ...tasks]
            return stateCopy
        }
        case 'CHANGE_TASK_STATUS': {
            const stateCopy = {...state}
            let task = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = task.map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            return stateCopy
        }
        case 'CHANGE_TASK_TITLE':
            const stateCopy = {...state}
            let task = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = task.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            return stateCopy
        case 'ADD-TODOLIST':
            return {...state, [action.todoListId]: []}
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}
//if we add empty cases there will be a TypeScript error: Object (inside test file) is possibly undefined.

export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {type: 'REMOVE_TASK', taskId, todoListId} as const  //if key = value, no need to write both 'todoListId: todoListId'
}
//we will make server requests from action creators!

export const addTaskAC = (title: string, todoListId: string) => {
    return {type: 'ADD_TASK', title, todoListId} as const
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListId: string) => {
    return {type: 'CHANGE_TASK_STATUS', taskId, status, todoListId} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => {
    return {type: 'CHANGE_TASK_TITLE', taskId, title, todoListId} as const
}