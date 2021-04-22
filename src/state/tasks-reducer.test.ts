import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from "./tasks-reducer";
import {addTodoListAC, removeTodoListAC} from "./todolist-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todoListId1": [
            {id: "1", title: "CSS", status: TaskStatuses.New,
                todoListId: "todolistId1",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: ''},
            {id: "2", title: "JS", status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: ''},
            {id: "3", title: "React", status: TaskStatuses.New,
                todoListId: "todolistId1",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: ''}
        ],
        "todoListId2": [
            {id: "1", title: "bread", status: TaskStatuses.New,
                todoListId: "todolistId2",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: ''},
            {id: "2", title: "milk", status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: ''},
            {id: "3", title: "tea", status: TaskStatuses.New,
                todoListId: "todolistId1",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: ''}
        ],
    }
})

test('correct task should be deleted from a correct array', () => {
    const action = removeTaskAC("2", "todoListId2")

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(2);
    expect(endState["todoListId2"].every(t => t.id != "2")).toBeTruthy(); //every task id should not be "2"
});

test('correct task should be added to a correct array', () => {
    const action = addTaskAC("juice", "todoListId2")

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(4);
    expect(endState["todoListId2"][0].id).toBeDefined();
    expect(endState["todoListId2"][0].title).toBe("juice");
    expect(endState["todoListId2"][0].status).toBe(TaskStatuses.New);
});

test('the status of the specified task should be changed', () => {
    const action = changeTaskStatusAC("2", TaskStatuses.New, "todoListId2")

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todoListId1"][1].status).toBe(TaskStatuses.Completed);
});

test('the title of the specified task should be changed', () => {
    const action = changeTaskTitleAC("2", "Milkyway", "todoListId2")

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId2"][1].title).toBe("Milkyway");
    expect(endState["todoListId1"][1].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {
    const action = addTodoListAC("new todolist", v1())

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)  //creating an array of todolists' IDs(keys)
    const newKey = keys.find(k => k != "todoListId1" && k != "todoListId2")
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]); //toBeEqual cannot be used 'cause 2 arrays are never equal
});

test('property with todolist ID should be deleted', () => {
    const action = removeTodoListAC("todoListId2")

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)  //creating an array of todolists' IDs(keys)

    expect(keys.length).toBe(1);
    expect(endState["todoListId2"]).toBeUndefined();
});