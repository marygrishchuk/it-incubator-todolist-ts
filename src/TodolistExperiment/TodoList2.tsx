import React, {useState} from "react";
import {FilterValuesType, TaskType} from "./App2";
import {ChangeEvent, KeyboardEvent} from 'react';

export type PropsType = {
    title: string,
    tasks: Array<TaskType>
    addTask: (title: string, checked: boolean) => void
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType, checked: boolean) => void
    checked?: boolean
}

export function TodoList2(props: PropsType) {

    const [title, setTitle] = useState <string>("")

    const addTask = () => {
        props.addTask(title, checked)
        setTitle("")
    }
    const onChecked = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked)
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}
    const onAddTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {if(e.key === "Enter"){addTask()}}
    const onAllFilterClick = () => {props.changeFilter('all', checkedState)}
    const onActiveFilterClick = () => {props.changeFilter('active', checkedState)}
    const onCompletedFilterClick = () => {props.changeFilter("completed", checkedState)}

    const disableBtn = (title: string) => {
        if(title === "") {
            return true;
        }
    }
    const [checkedState, setChecked] = useState(false);
    const checked = props.checked != null ? props.checked : checkedState;

    const tasks = props.tasks.map( t => {

            const onRemoveTaskClick = () => {props.removeTask(t.id)}

            return <li key={t.id}>
                <input type="checkbox" checked={checked}
                       onChange={onChecked}/> <span>{t.title}</span>
                <button onClick={ onRemoveTaskClick }>x</button>
            </li>
        }
    )

    return (
        <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={ onChangeTitle }
                onKeyPress={ onAddTaskKeyPress }
            />
            <button onClick={ addTask } disabled={disableBtn(title)}>+</button>
        </div>
        <ul>
            { tasks }
        </ul>
        <div>
            <button onClick={ onAllFilterClick }>All</button>
            <button onClick={ onActiveFilterClick }>Active</button>
            <button onClick={ onCompletedFilterClick }>Completed</button>
        </div>
    </div>
    )
}