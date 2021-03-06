import {tasksReducer} from './tasks-reducer';
import {combineReducers, createStore} from 'redux';
import {todoListReducer} from "./todolist-reducer";

// while uniting reducers with combineReducers,
// we create the structure of our single state object
const rootReducer = combineReducers({  //this is the state!
    tasks: tasksReducer,
    todoLists: todoListReducer
})
// explicit store creation
export const store = createStore(rootReducer);
// automatic type definition for the entire state
export type AppRootStateType = ReturnType<typeof rootReducer>

// needed to call store from browser console at any time
// @ts-ignore
window.store = store;
