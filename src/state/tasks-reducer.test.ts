import {addTaskAC, removeTaskAC, setTasksAC, tasksReducer, TasksStateType, updateTaskAC} from "./tasks-reducer";
import {addTodoListAC, removeTodoListAC, setTodolistsAC} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todoListId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New,
                todoListId: "todoListId1",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '', entityStatus: "succeeded"
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed,
                todoListId: "todoListId1",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '', entityStatus: "succeeded"
            },
            {
                id: "3", title: "React", status: TaskStatuses.New,
                todoListId: "todoListId1",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '', entityStatus: "succeeded"
            }
        ],
        "todoListId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New,
                todoListId: "todoListId2",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '', entityStatus: "succeeded"
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed,
                todoListId: "todoListId2",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '', entityStatus: "succeeded"
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New,
                todoListId: "todoListId2",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '', entityStatus: "succeeded"
            }
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
    let newTask = {
        id: "4", title: "juice", status: TaskStatuses.New,
        todoListId: "todoListId2",
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: ''
    }
    const action = addTaskAC(newTask)

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(4);
    expect(endState["todoListId2"][0].id).toBeDefined();
    expect(endState["todoListId2"][0].title).toBe("juice");
    expect(endState["todoListId2"][0].status).toBe(TaskStatuses.New);
});

test('the status of the specified task should be changed', () => {
    const action = updateTaskAC("2", {status: TaskStatuses.New}, "todoListId2")

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todoListId1"][1].status).toBe(TaskStatuses.Completed);
});

test('the title of the specified task should be changed', () => {
    const action = updateTaskAC("2", {title: "Milkyway"}, "todoListId2")

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId2"][1].title).toBe("Milkyway");
    expect(endState["todoListId1"][1].title).toBe("JS");
});

test('new array for tasks should be added when a new todolist is added', () => {
    let newTodolist = {id: "todoListId3", title: "New TodoList", addedDate: "", order: 0}

    const endState = tasksReducer(startState, addTodoListAC(newTodolist))

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

test('empty arrays for tasks should be added when todolists from server are set into state', () => {
    let startState: TasksStateType = {}

    let newTodolists = [
        {id: "todolistId1", title: "Work", addedDate: "", order: 0},
        {id: "todolistId2", title: "School", addedDate: "", order: 0},
        {id: "todolistId3", title: "Health", addedDate: "", order: 0},
    ]

    const endState = tasksReducer(startState, setTodolistsAC(newTodolists));

    const keys = Object.keys(endState)  //creating an array of todolists' IDs(keys)

    expect(keys.length).toBe(3);
    expect(keys[1]).toBe("todolistId2");
    expect(endState[keys[0]]).toStrictEqual([]); //toBeEqual cannot be used 'cause 2 arrays are never equal
    expect(endState[keys[1]]).toStrictEqual([]); //toBeEqual cannot be used 'cause 2 arrays are never equal
    expect(endState[keys[2]]).toStrictEqual([]); //toBeEqual cannot be used 'cause 2 arrays are never equal
});

test('tasks should be added to a correct empty todolist', () => {
    let newTasks: Array<TaskType> = [
        {
            id: "4", title: "HTML", status: TaskStatuses.New,
            todoListId: "todoListId1",
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: ''
        },
        {
            id: "5", title: "Redux", status: TaskStatuses.Completed,
            todoListId: "todoListId1",
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: ''
        }
    ]

    const endState = tasksReducer({
        "todoListId2": [],
        "todoListId1": [],
        "todoListId3": []
    }, setTasksAC(newTasks, "todoListId1"));

    expect(endState["todoListId1"].length).toBe(2);
    expect(endState["todoListId2"].length).toBe(0);
    expect(endState["todoListId3"].length).toBe(0);
});