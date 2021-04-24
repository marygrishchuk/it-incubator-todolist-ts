import React, {useEffect, useState} from 'react'
import {TaskPriorities, TaskStatuses, todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            }).catch(err => console.warn(err))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")

    const createTodolist = () => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            }).catch(err => console.warn(err))
    }

    return <div> {JSON.stringify(state)}
        <div><input placeholder="title" value={title} onChange={(e => setTitle(e.currentTarget.value))}/></div>
        <button onClick={createTodolist}>create todolist</button>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>("")

    const updateTodolistTitle = () => {
        todolistAPI.updateTodolistTitle(todolistId, title)
            .then((res) => {
                setState(res.data)
            }).catch(err => console.warn(err))
    }

    return <div> {JSON.stringify(state)}
        <div><input placeholder="todolistId" value={todolistId} onChange={(e => setTodolistId(e.currentTarget.value))}/>
            <input placeholder="title" value={title} onChange={(e => setTitle(e.currentTarget.value))}/></div>
        <button onClick={updateTodolistTitle}>update todolist title</button>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            }).catch(err => console.warn(err))
    }

    return <div> {JSON.stringify(state)}
        <div><input placeholder="todolistId" value={todolistId} onChange={(e => setTodolistId(e.currentTarget.value))}/>
        </div>
        <button onClick={deleteTodolist}>delete todolist</button>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data.items)
            }).catch(err => console.warn(err))
    }

    return <div> {JSON.stringify(state)}
        <div><input placeholder="todolistId" value={todolistId} onChange={(e => setTodolistId(e.currentTarget.value))}/>
        </div>
        <button onClick={getTasks}>get tasks</button>
    </div>
}

export const AddTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>("")

    const addTask = () => {
        todolistAPI.addTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            }).catch(err => console.warn(err))
    }

    return <div> {JSON.stringify(state)}
        <div><input placeholder="todolistId" value={todolistId} onChange={(e => setTodolistId(e.currentTarget.value))}/>
            <input placeholder="title" value={title} onChange={(e => setTitle(e.currentTarget.value))}/></div>
        <button onClick={addTask}>add task</button>
    </div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>("")

    const updateTaskTitle = () => {
        todolistAPI.updateTask(todolistId, taskId, {
            title,
            status: TaskStatuses.New,
            deadline: "",
            description: "",
            priority: TaskPriorities.Low,
            startDate: ""
        })
            .then((res) => {
                debugger
                setState(res.data)
            }).catch(err => console.warn(err))
    }

    return <div> {JSON.stringify(state)}
        <div><input placeholder="todolistId" value={todolistId} onChange={(e => setTodolistId(e.currentTarget.value))}/>
            <input placeholder="taskId" value={taskId} onChange={(e => setTaskId(e.currentTarget.value))}/>
            <input placeholder="title" value={title} onChange={(e => setTitle(e.currentTarget.value))}/></div>
        <button onClick={updateTaskTitle}>update task title</button>
    </div>
}

export const UpdateTaskStatus = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [status, setStatus] = useState<number>(0)

    const updateTaskStatus = () => {
        todolistAPI.updateTask(todolistId, taskId, {
            title,
            status,
            deadline: "",
            description: "",
            priority: TaskPriorities.Low,
            startDate: ""
        })
            .then((res) => {
                setState(res.data)
            }).catch(err => console.warn(err))
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder="todolistId" value={todolistId} onChange={(e => setTodolistId(e.currentTarget.value))}/>
            <input placeholder="taskId" value={taskId} onChange={(e => setTaskId(e.currentTarget.value))}/>
            <input placeholder="title" value={title} onChange={(e => setTitle(e.currentTarget.value))}/>
            <label> status:</label><input placeholder="status" type={'number'} value={status}
                                          onChange={(e => setStatus(+e.currentTarget.value))}/>
        </div>
        <button onClick={updateTaskStatus}>update task status (number)</button>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            }).catch(err => console.warn(err))
    }

    return <div> {JSON.stringify(state)}
        <div><input placeholder="todolistId" value={todolistId} onChange={(e => setTodolistId(e.currentTarget.value))}/>
            <input placeholder="taskId" value={taskId} onChange={(e => setTaskId(e.currentTarget.value))}/></div>
        <button onClick={deleteTask}>delete task</button>
    </div>
}