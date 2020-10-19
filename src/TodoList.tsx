import React, {useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent} from 'react';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListsId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}

export function TodoList(props: PropsType) {

    const [title, setTitle] = useState <string>("")
    const [error, setError] = useState <string | null>(null)

    const addTask = () => {
        //можно вставлять доп.проверки на нецензурные слова:
        //if (title.trim() === "kakashka") {
        //     return;         //выход из функции addTask, чтоб дальше не выполнилась
        // }
        if (title.trim()) {
            props.addTask(title.trim(), props.id)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    const onAddTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(e.key === "Enter") {
            addTask()
        }
    }

    const removeTodoList = () => props.removeTodoList(props.id)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}
    const onAllFilterClick = () => {props.changeFilter('all', props.id)}
    const onActiveFilterClick = () => {props.changeFilter('active', props.id)}
    const onCompletedFilterClick = () => {props.changeFilter('completed', props.id)}

    const tasks = props.tasks.map( t => {

            const onRemoveTaskClick = () => {props.removeTask(t.id, props.id)}
            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)}

            return <li key={t.id} className={t.isDone? "is-done" : ""}>
                <input type="checkbox" onChange={changeStatus} checked={t.isDone}/> <span>{t.title}</span>
                <button onClick={ onRemoveTaskClick }>x</button>
            </li>
        }
    )

    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoList}>x</button></h3>
        <div>
            <input
                value={title}
                onChange={ onChangeTitle }
                onKeyPress={ onAddTaskKeyPress }
                className={error ? "error" : ""}
            />
            <button onClick={ addTask }>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
        <ul>
            { tasks }
        </ul>
        <div>
            <button className={props.filter === "all" ? "active" : ""}
                onClick={ onAllFilterClick }>All</button>
            <button className={props.filter === "active" ? "active" : ""}
                onClick={ onActiveFilterClick }>Active</button>
            <button className={props.filter === "completed" ? "active" : ""}
                onClick={ onCompletedFilterClick }>Completed</button>
        </div>
    </div>
    )
}