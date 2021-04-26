import {Provider} from "react-redux";
import {AppRootStateType} from "../state/store";
import React from "react";
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {tasksReducer} from '../state/tasks-reducer'
import {todoListReducer} from '../state/todolist-reducer'
import {v1} from 'uuid'
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {appReducer} from "../app/app-reducer";
import thunk from "redux-thunk";
import {HashRouter} from "react-router-dom";
import {authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "succeeded"},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "loading"}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '', entityStatus: "succeeded"
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '', entityStatus: "succeeded"
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '', entityStatus: "succeeded"
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '', entityStatus: "succeeded"
            }
        ]
    },
    app: {
        status: "succeeded",
        error: null
    },
    auth: {
        isLoggedIn: true
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}><HashRouter>{storyFn()}</HashRouter></Provider>
}