import {addTodoListAC, TodolistDomainType, todoListReducer} from "./todolist-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {v1} from "uuid";

test("ids should be equal", () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodolistDomainType> = []

    let newTodolist = {id: "todolistId3", title: "New Todolist", addedDate: "", order: 0}

    const action = addTodoListAC(newTodolist)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)  //creating an array of todolists' IDs(keys)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todoList.id)
    expect(idFromTodoLists).toBe(action.todoList.id)
})