import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

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
            task={{id: "1", title: "CSS", isDone: true}}
        />
        <Task
            removeTask={removeTaskCallback}
            changeTaskStatus={changeStatusCallback}
            changeTaskTitle={changeTitleCallback}
            task={{id: "2", title: "JS", isDone: false}}
        />
    </>
}