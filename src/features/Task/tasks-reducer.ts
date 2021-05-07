import {addTodoListAC, removeTodoListAC, setTodolistsAC} from "../TodoList/todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../state/store";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

let initialState: TasksStateType = {}   //associative array

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTaskAC(stateDraft, action: PayloadAction<{ taskId: string, todoListId: string }>) {
            const tasks = stateDraft[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(stateDraft, action: PayloadAction<TaskType>) {
            stateDraft[action.payload.todoListId].unshift({...action.payload, entityStatus: "succeeded"})
        },
        updateTaskAC(stateDraft, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todoListId: string }>) {
            const tasks = stateDraft[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC(stateDraft, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            stateDraft[action.payload.todolistId] = action.payload.tasks.map(t => ({...t, entityStatus: "succeeded"}))
        },
        changeTaskEntityStatusAC(stateDraft, action: PayloadAction<{ taskId: string, todolistId: string, entityStatus: RequestStatusType }>) {
            const tasks = stateDraft[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], entityStatus: action.payload.entityStatus}
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodoListAC, (stateDraft, action) => {
            stateDraft[action.payload.id] = []
        })
        builder.addCase(removeTodoListAC, (stateDraft, action) => {
            delete stateDraft[action.payload]
        })
        builder.addCase(setTodolistsAC, (stateDraft, action) => {
            action.payload.forEach((tl) => {
                stateDraft[tl.id] = []
            })
        })
    }
})

export const tasksReducer = slice.reducer

//action creators
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC, changeTaskEntityStatusAC} = slice.actions

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC({tasks, todolistId}))
            dispatch(setAppStatusAC('succeeded'))
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC({taskId, todolistId, entityStatus: 'loading'}))
    todolistAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC({taskId, todoListId: todolistId}))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
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
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
            dispatch(changeTaskEntityStatusAC({taskId, todolistId, entityStatus: 'loading'}))
            todolistAPI.updateTask(todolistId, taskId, apiModel)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC({taskId, model: domainModel, todoListId: todolistId}))
                        dispatch(setAppStatusAC('succeeded'))
                        dispatch(changeTaskEntityStatusAC({taskId, todolistId, entityStatus: 'succeeded'}))
                    } else {
                        handleServerAppError(res.data, dispatch)
                        dispatch(changeTaskEntityStatusAC({taskId, todolistId, entityStatus: 'failed'}))
                    }
                }).catch(error => {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTaskEntityStatusAC({taskId, todolistId, entityStatus: 'failed'}))
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

type UpdateDomainTaskModelType = {
    deadline?: string
    description?: string
    priority?: TaskPriorities
    startDate?: string
    status?: TaskStatuses
    title?: string
}