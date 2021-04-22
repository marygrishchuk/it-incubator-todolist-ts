import {addTodoListAC, removeTodoListAC, setTodolistsAC} from "./todolist-reducer";
import {TaskStatuses, TaskType, todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type TaskActionType = ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskStatusAC> |
    ReturnType<typeof changeTaskTitleAC> |
    ReturnType<typeof removeTodoListAC> |
    ReturnType<typeof addTodoListAC> |
    ReturnType<typeof setTodolistsAC> |
    ReturnType<typeof setTasksAC>

let initialState: TasksStateType = {}   //associative array

export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET_TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case 'ADD_TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            stateCopy[action.task.todoListId] = [action.task, ...tasks];
            return stateCopy;
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
            return {...state, [action.todoList.id]: []}
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

export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD_TASK', task} as const
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListId: string) => {
    return {type: 'CHANGE_TASK_STATUS', taskId, status, todoListId} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => {
    return {type: 'CHANGE_TASK_TITLE', taskId, title, todoListId} as const
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET_TASKS', tasks, todolistId} as const
}

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
        })
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(taskId, todolistId))
            }
        }).catch(err => console.warn(err))
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.addTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
            }
        }).catch(err => console.warn(err))
}

export const updateTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(t => t.id === taskId)
    if (task) {
        todolistAPI.updateTaskStatus(todolistId, taskId, task.title, status)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskStatusAC(taskId, status, todolistId))
                }
            }).catch(err => console.warn(err))
    }
}

export const updateTaskTitleTC = (taskId: string, title: string, todoListId: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTaskTitle(todoListId, taskId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskTitleAC(taskId, title, todoListId))
                }
            }).catch(err => console.warn(err))
}
