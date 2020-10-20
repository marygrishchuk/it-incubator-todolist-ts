import React from "react";
import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
                <input type="checkbox" onChange={changeStatus} checked={t.isDone}/>
               <EditableSpan title={t.title} changeTitle={changeTitle}/>
                {/*<span>{t.title}</span>*/}
                <button onClick={onRemoveTaskClick}>x</button>
            </li>
        }
    )

    return (
        <div>
            <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active" : ""}
                        onClick={onAllFilterClick}>All
                </button>
                <button className={props.filter === "active" ? "active" : ""}
                        onClick={onActiveFilterClick}>Active
                </button>
                <button className={props.filter === "completed" ? "active" : ""}
                        onClick={onCompletedFilterClick}>Completed
                </button>
            </div>
        </div>
    )
}