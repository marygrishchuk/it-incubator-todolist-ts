import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "../components/TodoList/TodoList";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodoListTC, fetchTodolistsTC, TodolistDomainType} from "../state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {RequestStatusType} from "./app-reducer";

function AppWithRedux() {
    console.log('AppWithRedux is called')

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    let todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    let status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    let dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    return (
        <div className="App">
            <ErrorSnackbar/>
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
                {status === 'loading' && <LinearProgress color="secondary" />}
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "15px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {
                        todoLists.map(tl => {

                            return (
                                <Grid item key={tl.id}>
                                    <Paper elevation={5} style={{padding: "15px"}}>
                                        <TodoList
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            filter={tl.filter}
                                            entityStatus={tl.entityStatus}
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

export default AppWithRedux;
