import {tasksReducer} from '../features/Task/tasks-reducer';
import {combineReducers} from 'redux';
import {todoListReducer} from "../features/TodoList/todolist-reducer";
import thunk from "redux-thunk";
import {appReducer} from "../app/app-reducer";
import {authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

// while uniting reducers with combineReducers,
// we create the structure of our single state object
const rootReducer = combineReducers({  //this is the state!
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
    auth: authReducer
})
// explicit store creation
// export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
});
// automatic type definition for the entire state
export type AppRootStateType = ReturnType<typeof rootReducer>

// needed to call store from browser console at any time
// @ts-ignore
window.store = store;
