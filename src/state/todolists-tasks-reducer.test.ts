import {TasksStateType, TodoListType} from "../AppWithRedux";
import {addTodoListAC, todoListReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {v1} from "uuid";

test("ids should be equal", () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodoListType> = []

    const action = addTodoListAC("new todolist", v1())

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)  //creating an array of todolists' IDs(keys)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todoListId)
    expect(idFromTodoLists).toBe(action.todoListId)
})