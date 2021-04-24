import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {addTaskTC, fetchTasksTC, removeTaskTC, updateTaskTC} from "./state/tasks-reducer";
import {
    changeTodoListFilterAC,
    FilterValuesType,
    removeTodoListTC,
    updateTodolistTitleTC
} from "./state/todolist-reducer";
import {AppRootStateType} from "./state/store";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolist-api";

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const TodoList = React.memo((props: PropsType) => {
    console.log('TodoList is called')

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    let tasksForToDoList = tasks

    if (props.filter === "completed") {
        tasksForToDoList = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (props.filter === "active") {
        tasksForToDoList = tasks.filter(t => t.status === TaskStatuses.New)
    }

    let dispatch = useDispatch()

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(title, props.id))
    }, [dispatch, props.id])

    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(updateTodolistTitleTC(props.id, title))
    }, [dispatch, props.id])

    const removeTodoList = useCallback(() => {
        dispatch(removeTodoListTC(props.id))
    }, [dispatch, props.id])

    const onAllFilterClick = useCallback(() => {
        dispatch(changeTodoListFilterAC(props.id, 'all'))
    }, [dispatch, props.id])
    const onActiveFilterClick = useCallback(() => {
        dispatch(changeTodoListFilterAC(props.id, 'active'))
    }, [dispatch, props.id])
    const onCompletedFilterClick = useCallback(() => {
        dispatch(changeTodoListFilterAC(props.id, 'completed'))
    }, [dispatch, props.id])

    const onRemoveTaskClick = useCallback((taskId: string) => {
        dispatch(removeTaskTC(taskId, props.id))
    }, [dispatch, props.id])
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(taskId, {status}, props.id))
    }, [dispatch, props.id])
    const changeTaskTitle = useCallback((taskId: string, title: string) => {
        dispatch(updateTaskTC(taskId, {title}, props.id))
    }, [dispatch, props.id])

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", padding: "0"}}>
                { tasksForToDoList.map(t => <Task
                        key={t.id}
                        removeTask={onRemoveTaskClick}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        task={t}
                    />
                ) }
            </ul>
            <div>
                <Button
                    style={{margin: "3px"}}
                    size={"small"}
                    variant={props.filter === "all" ? "contained" : "outlined"}
                    color={"primary"}
                    onClick={onAllFilterClick}>All
                </Button>
                <Button
                    style={{margin: "3px"}}
                    size={"small"}
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    color={"primary"}
                    onClick={onActiveFilterClick}>Active
                </Button>
                <Button
                    style={{margin: "3px"}}
                    size={"small"}
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    color={"primary"}
                    onClick={onCompletedFilterClick}>Completed
                </Button>
            </div>
        </div>
    )
})

