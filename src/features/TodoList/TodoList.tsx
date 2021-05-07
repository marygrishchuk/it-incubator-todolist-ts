import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {addTaskTC, fetchTasksTC, removeTaskTC, TaskDomainType, updateTaskTC} from "../Task/tasks-reducer";
import {
    changeTodoListFilterAC,
    removeTodoListTC,
    TodolistDomainType,
    updateTodolistTitleTC
} from "./todolist-reducer";
import {AppRootStateType} from "../../state/store";
import {Task} from "../Task/Task";
import {TaskStatuses} from "../../api/todolist-api";

type PropsType = {
    todolist: TodolistDomainType
    demo?: boolean
}

export const TodoList = React.memo(({todolist, demo = false}: PropsType) => {
    console.log('TodoList is called')
    let dispatch = useDispatch()

    useEffect(() => {
        if (demo) return
        dispatch(fetchTasksTC(todolist.id))
    }, [])

    let tasks = useSelector<AppRootStateType, Array<TaskDomainType>>(state => state.tasks[todolist.id])

    let tasksForToDoList = tasks

    if (todolist.filter === "completed") {
        tasksForToDoList = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (todolist.filter === "active") {
        tasksForToDoList = tasks.filter(t => t.status === TaskStatuses.New)
    }

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(title, todolist.id))
    }, [dispatch, todolist.id])

    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(updateTodolistTitleTC(todolist.id, title))
    }, [dispatch, todolist.id])

    const removeTodoList = useCallback(() => {
        dispatch(removeTodoListTC(todolist.id))
    }, [dispatch, todolist.id])

    const onAllFilterClick = useCallback(() => {
        dispatch(changeTodoListFilterAC({todoListId: todolist.id, filter: 'all'}))
    }, [dispatch, todolist.id])
    const onActiveFilterClick = useCallback(() => {
        dispatch(changeTodoListFilterAC({todoListId: todolist.id, filter: 'active'}))
    }, [dispatch, todolist.id])
    const onCompletedFilterClick = useCallback(() => {
        dispatch(changeTodoListFilterAC({todoListId: todolist.id, filter: 'completed'}))
    }, [dispatch, todolist.id])

    const onRemoveTaskClick = useCallback((taskId: string) => {
        dispatch(removeTaskTC(taskId, todolist.id))
    }, [dispatch, todolist.id])
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(taskId, {status}, todolist.id))
    }, [dispatch, todolist.id])
    const changeTaskTitle = useCallback((taskId: string, title: string) => {
        dispatch(updateTaskTC(taskId, {title}, todolist.id))
    }, [dispatch, todolist.id])

    return (
        <div>
            <h3>
                <EditableSpan title={todolist.title} changeTitle={changeTodoListTitle}
                              disabled={todolist.entityStatus === 'loading'}/>
                <IconButton onClick={removeTodoList}
                            disabled={todolist.entityStatus === 'loading'}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={todolist.entityStatus === 'loading'}/>
            <ul style={{listStyle: "none", padding: "0"}}>
                {tasksForToDoList.map(t => <Task
                        key={t.id}
                        removeTask={onRemoveTaskClick}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        task={t}
                    />
                )}
            </ul>
            <div>
                <Button
                    style={{margin: "3px"}}
                    size={"small"}
                    variant={todolist.filter === "all" ? "contained" : "outlined"}
                    color={"primary"}
                    onClick={onAllFilterClick}>All
                </Button>
                <Button
                    style={{margin: "3px"}}
                    size={"small"}
                    variant={todolist.filter === "active" ? "contained" : "outlined"}
                    color={"primary"}
                    onClick={onActiveFilterClick}>Active
                </Button>
                <Button
                    style={{margin: "3px"}}
                    size={"small"}
                    variant={todolist.filter === "completed" ? "contained" : "outlined"}
                    color={"primary"}
                    onClick={onCompletedFilterClick}>Completed
                </Button>
            </div>
        </div>
    )
})

