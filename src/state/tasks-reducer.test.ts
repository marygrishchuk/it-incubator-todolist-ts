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

let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todoListId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
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
    expect(endState["todoListId2"][0].isDone).toBe(false);
});

test('the status of the specified task should be changed', () => {
    const action = changeTaskStatusAC("2", false, "todoListId2")

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId2"][1].isDone).toBeFalsy();
    expect(endState["todoListId1"][1].isDone).toBeTruthy();
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