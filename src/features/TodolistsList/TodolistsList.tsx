import React, {useCallback, useEffect} from "react";
import {addTodoListTC, fetchTodolistsTC, TodolistDomainType} from "../TodoList/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {RequestStatusType} from "../../app/app-reducer";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "../TodoList/TodoList";
import {Redirect} from "react-router-dom";

type TodolistsListPropsType = {
    demo?: boolean
}
export const TodolistsList = React.memo(({demo = false}: TodolistsListPropsType) => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (demo || !isLoggedIn) return
        dispatch(fetchTodolistsTC())
    }, [])

    let todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)

    let dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    if (!isLoggedIn) return <Redirect to={'/login'}/>

    return <>
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
                                    todolist={tl}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })
            }
        </Grid>
    </>
})