import React, {useEffect} from 'react';
import s from './App.module.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "../features/Login/Login";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    console.log('App is called')

    let status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    return (
        <div>
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
                {status === 'loading' && <div className={s.progress}><LinearProgress color="secondary"/></div>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={ () => <h1>404: PAGE NOT FOUND</h1> }/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
    );
}

export default App;

