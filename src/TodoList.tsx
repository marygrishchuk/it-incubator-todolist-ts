import React from "react";
import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListsId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
}

export function TodoList(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }

    const removeTodoList = () => props.removeTodoList(props.id)

    // const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}

    const onAllFilterClick = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveFilterClick = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedFilterClick = () => {
        props.changeFilter('completed', props.id)
    }

    debugger

    const tasks = props.tasks.map(t => {

            const onRemoveTaskClick = () => {
                props.removeTask(t.id, props.id)
            }
            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
            }
            const changeTitle = (title: string) => {
                props.changeTaskTitle(t.id, title, props.id)
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
                {tasks}
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