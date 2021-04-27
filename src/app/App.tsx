import React, {useCallback, useEffect} from 'react';
import s from './App.module.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {InitialAppStateType, initializeAppTC} from "./app-reducer";
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/auth-reducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    console.log('App is called')

    let {status, isInitialized} = useSelector<AppRootStateType, InitialAppStateType>(state => state.app)
    let isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logout = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div>
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        {isLoggedIn && <Button color="inherit" onClick={logout}>Log out</Button>}
                    </Typography>
                    {status === 'loading' && <div className={s.progress}><LinearProgress color="secondary"/></div>}
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
    );
}

export default App;

