import {addTodoListAC, removeTodoListAC, setTodolistsAC} from "../TodoList/todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../state/store";
import {AppActionsType, RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

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
            stateCopy[action.todolistId] = action.tasks.map(t => ({...t, entityStatus: "succeeded"}))
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
            stateCopy[action.task.todoListId] = [{...action.task, entityStatus: "succeeded"}, ...tasks];
            return stateCopy;
        }
        case 'UPDATE_TASK': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = tasks.map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            return stateCopy
        }
        case 'ADD-TODOLIST':
            return {...state, [action.todoList.id]: []}
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'CHANGE-TASK-ENTITY-STATUS':
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {
                ...t,
                entityStatus: action.entityStatus
            } : t)
            return stateCopy
        default:
            return state
    }
}

//action creators
export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {type: 'REMOVE_TASK', taskId, todoListId} as const  //if key = value, no need to write both 'todoListId: todoListId'
}

export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD_TASK', task} as const
}

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todoListId: string) => {
    return {type: 'UPDATE_TASK', taskId, model, todoListId} as const
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET_TASKS', tasks, todolistId} as const
}

export const changeTaskEntityStatusAC = (taskId: string, todolistId: string, entityStatus: RequestStatusType) => {
    return {type: 'CHANGE-TASK-ENTITY-STATUS', taskId, todolistId, entityStatus} as const
}

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(taskId, todolistId, 'loading'))
    todolistAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.addTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            const apiModel: UpdateTaskModelType = {
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                status: task.status,
                title: task.title,
                ...domainModel
            }
            dispatch(setAppStatusAC('loading'))
            dispatch(changeTaskEntityStatusAC(taskId, todolistId, 'loading'))
            todolistAPI.updateTask(todolistId, taskId, apiModel)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC(taskId, domainModel, todolistId))
                        dispatch(setAppStatusAC('succeeded'))
                        dispatch(changeTaskEntityStatusAC(taskId, todolistId, 'succeeded'))
                    } else {
                        handleServerAppError(res.data, dispatch)
                        dispatch(changeTaskEntityStatusAC(taskId, todolistId, 'failed'))
                    }
                }).catch(error => {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTaskEntityStatusAC(taskId, todolistId, 'failed'))
            })
        }
    }
}

//types
export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}

export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}

export type TaskActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTaskEntityStatusAC>

type UpdateDomainTaskModelType = {
    deadline?: string
    description?: string
    priority?: TaskPriorities
    startDate?: string
    status?: TaskStatuses
    title?: string
}

type ThunkDispatch = Dispatch<TaskActionType | AppActionsType>