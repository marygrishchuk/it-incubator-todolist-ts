import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from "./state/todolist-reducer";
import {AppRootStateType} from "./state/store";

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export function TodoList(props: PropsType) {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    let tasksForToDoList = tasks

    if (props.filter === "completed") {
        tasksForToDoList = tasks.filter(t => t.isDone === true)
    }
    if (props.filter === "active") {
        tasksForToDoList = tasks.filter(t => t.isDone === false)
    }

    let dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.id))
    }

    const changeTodoListTitle = (title: string) => {
        dispatch(changeTodoListTitleAC(props.id, title))
    }

    const removeTodoList = () => dispatch(removeTodoListAC(props.id))

    const onAllFilterClick = () => {
        dispatch(changeTodoListFilterAC(props.id, 'all'))
    }
    const onActiveFilterClick = () => {
        dispatch(changeTodoListFilterAC(props.id, 'active'))
    }
    const onCompletedFilterClick = () => {
        dispatch(changeTodoListFilterAC(props.id, 'completed'))
    }

    const tasksToRender = tasksForToDoList.map(t => {

            const onRemoveTaskClick = () => {
                dispatch(removeTaskAC(t.id, props.id))
            }
            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.id))
            }
            const changeTitle = (title: string) => {
                dispatch(changeTaskTitleAC(t.id, title, props.id))
            }

            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <Checkbox onChange={changeStatus} checked={t.isDone} color={"primary"}/>
                <EditableSpan title={t.title} changeTitle={changeTitle}/>
                <IconButton onClick={onRemoveTaskClick}><Delete/></IconButton>
            </li>
        }
    )

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", padding: "0"}}>
                {tasksToRender}
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
}