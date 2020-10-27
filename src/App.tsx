import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

function App() {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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
        const newTask: TaskType = {id: v1(), title: title, isDone: false};
        const todoList = tasks[todoListId]
        tasks[todoListId] = [newTask, ...todoList]
        setTasks({...tasks})
    }

    function removeTask(taskId: string, todoListId: string) {
        const todoList = tasks[todoListId]
        tasks[todoListId] = todoList.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        const todoList = tasks[todoListId]
        let newTask = todoList.find(t => t.id === taskId)
        if (newTask) {
            newTask.isDone = isDone
        }
        setTasks({...tasks})
    }

    function changeTaskTitle(taskId: string, title: string, todoListId: string) {
        const todoList = tasks[todoListId]
        const task = todoList.find(t => t.id === taskId)
        if (task) {
            task.title = title
        }
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID, title: title, filter: "all"
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({
            ...tasks, [newTodoListID]: []
        })
    }

    function changeTodoListTitle(todoListId: string, title: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
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

export default App;
