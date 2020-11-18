import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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
    //We don't need the old initial state any more because now it's in reducers:
    // const todoListId1 = v1()
    // const todoListId2 = v1()

    // const [todoLists, dispatchTodoLists] = useReducer(todoListReducer, [
    //     {id: todoListId1, title: "What to learn", filter: "all"},
    //     {id: todoListId2, title: "What to buy", filter: "all"}
    // ])
    //
    // const [tasks, dispatchTasks] = useReducer(tasksReducer, {
    //     [todoListId1]: [
    //         {id: v1(), title: "HTML", isDone: true},
    //         {id: v1(), title: "CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: false}
    //     ],
    //     [todoListId2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "Beer", isDone: true},
    //         {id: v1(), title: "Fish", isDone: false}
    //     ],
    // })

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    //by default useSelector receives state
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    let dispatch = useDispatch()

    function addTask(title: string, todoListId: string) {
        dispatch(addTaskAC(title, todoListId))
    }

    function removeTask(taskId: string, todoListId: string) {
        dispatch(removeTaskAC(taskId, todoListId))
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    function changeTaskTitle(taskId: string, title: string, todoListId: string) {
        dispatch(changeTaskTitleAC(taskId, title, todoListId))
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatch(changeTodoListFilterAC(todoListId, value))
    }

    function removeTodoList(todoListId: string) {
        dispatch(removeTodoListAC(todoListId))  //only 1 needed
    }

    function addTodoList(title: string) {
        const id = v1()
        dispatch(addTodoListAC(title, id))      //only 1 needed
    }

    function changeTodoListTitle(todoListId: string, title: string) {
        dispatch(changeTodoListTitleAC(todoListId, title))
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
