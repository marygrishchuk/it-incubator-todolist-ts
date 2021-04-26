import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";

export default {
    title: 'Task Component',
    component: Task
}

const changeStatusCallback = action("Status has been changed")
const changeTitleCallback = action("Title has been changed")
const removeTaskCallback = action("Task has been removed")

export const TaskBaseExample = () => {
    return <>
        <Task
            removeTask={removeTaskCallback}
            changeTaskStatus={changeStatusCallback}
            changeTaskTitle={changeTitleCallback}
            task={{
                id: "1", title: "CSS", status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '', entityStatus: "succeeded"
            }}
        />
        <Task
            removeTask={removeTaskCallback}
            changeTaskStatus={changeStatusCallback}
            changeTaskTitle={changeTitleCallback}
            task={{
                id: "2", title: "JS", status: TaskStatuses.New,
                todoListId: "todolistId2",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '', entityStatus: "succeeded"
            }}
        />
    </>
}