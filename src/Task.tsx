import {TaskType} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {

    const onRemoveTaskClick = useCallback(() => {
        props.removeTask(props.task.id)
    }, [props.removeTask, props.task.id])
    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked)
    }, [props.changeTaskStatus, props.task.id])
    const changeTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title)
    }, [props.changeTaskTitle, props.task.id])


    return <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox onChange={changeStatus} checked={props.task.isDone} color={"primary"}/>
        <EditableSpan title={props.task.title} changeTitle={changeTitle}/>
        <IconButton onClick={onRemoveTaskClick}><Delete/></IconButton>
    </li>
})