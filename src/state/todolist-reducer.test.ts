import {
    addTodoListAC,
    changeTodolistEntityStatusAC,
    FilterValuesType,
    removeTodoListAC,
    setTodolistsAC,
    TodolistDomainType,
    todoListReducer
} from './todolist-reducer';
import {v1} from 'uuid';
import {TodolistType} from "../api/todolist-api";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "succeeded"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "succeeded"}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoListReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolist = {id: "todolistId3", title: "New TodoList", addedDate: "", order: 0}

    const endState = todoListReducer(startState, addTodoListAC(newTodolist))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolist.title);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New TodoList";

    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const, //as const replaces the type import for this action
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todoListReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const, //as const replaces the type import for this action
        id: todolistId2,
        filter: newFilter
    };

    const endState = todoListReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists from server should be set into state', () => {
    let emptyState: Array<TodolistDomainType> = []
    let newTodolists: Array<TodolistType> = [
        {id: "todolistId1", title: "Work", addedDate: "", order: 0},
        {id: "todolistId2", title: "School", addedDate: "", order: 0},
        {id: "todolistId3", title: "Health", addedDate: "", order: 0},
    ]

    const endState = todoListReducer(emptyState, setTodolistsAC(newTodolists));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe("all");
    expect(endState[0].title).toBe("Work");
    expect(endState[1].title).toBe("School");
    expect(endState[2].title).toBe("Health");
});

test('the entityStatus of the specified todoList should be changed', () => {
    const action = changeTodolistEntityStatusAC(todolistId1, "loading")

    const endState = todoListReducer(startState, action)

    expect(endState[0].entityStatus).toBe("loading");
    expect(endState[1].entityStatus).toBe("succeeded");
});