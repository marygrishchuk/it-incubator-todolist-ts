import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListReducer
} from "./state/todolist-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export type FilterValuesType = "all" | "completed" | "active";

function AppWithReducers() {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, dispatchTodoLists] = useReducer(todoListReducer, [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Fish", isDone: false}
        ],
    })

    function addTask(title: string, todoListId: string) {
        dispatchTasks(addTaskAC(title, todoListId))
    }

    function removeTask(taskId: string, todoListId: string) {
        dispatchTasks(removeTaskAC(taskId, todoListId))
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatchTasks(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    function changeTaskTitle(taskId: string, title: string, todoListId: string) {
        dispatchTasks(changeTaskTitleAC(taskId, title, todoListId))
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatchTodoLists(changeTodoListFilterAC(todoListId, value))
    }

    function removeTodoList(todoListId: string) {
        dispatchTodoLists(removeTodoListAC(todoListId))
        dispatchTasks(removeTodoListAC(todoListId))
    }

    function addTodoList(title: string) {
        const id = v1()
        dispatchTodoLists(addTodoListAC(title, id))
        dispatchTasks(addTodoListAC(title, id))
        //let action = addTodoListAC(title, id) // we generate one id in AC
        //dispatchTodoLists(action)
        //dispatchTasks(action)
    }

    function changeTodoListTitle(todoListId: string, title: string) {
        dispatchTodoLists(changeTodoListTitleAC(todoListId, title))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Notes
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "15px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {
                        todoLists.map(tl => {

                            let tasksForToDoList = tasks[tl.id];
                            if (tl.filter === "completed") {
                                tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true)
                            }
                            if (tl.filter === "active") {
                                tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false)
                            }

                            return (
                                <Grid item>
                                    <Paper elevation={5} style={{padding: "15px"}}>
                                        <TodoList
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForToDoList}
                                            addTask={addTask}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            changeTaskStatus={changeTaskStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            filter={tl.filter}
                                            removeTodoList={removeTodoList}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
