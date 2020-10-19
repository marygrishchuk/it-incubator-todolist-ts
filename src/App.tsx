import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export type FilterValuesType = "all" | "completed" | "active";

function App() {   //этот стейт нам уже не нужен (вместо него сделаем 2)
                   // const [tasks, setTasks] = useState<Array<TaskType>>([
                   //     {id: v1(), title: "HTML", isDone: true},
                   //     {id: v1(), title: "CSS", isDone: true},
                   //     {id: v1(), title: "JS", isDone: false},
                   //     {id: v1(), title: "Redux", isDone: false},
                   //     {id: v1(), title: "Rest API", isDone: false}
                   // ]);

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Fish", isDone: false}
        ],
    })

    // console.log(tasks[todoListId1][0].title)  // в консоли будет HTML

    function addTask(title: string, todoListId: string) {
        const newTask: TaskType = {id: v1(), title: title, isDone: false};
        const todoList = tasks[todoListId]
        tasks[todoListId] = [newTask, ...todoList]
        setTasks({...tasks})
    }

    function removeTask(taskId: string, todoListId: string) {
        const todoList = tasks[todoListId]
        tasks[todoListId] = todoList.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        const todoList = tasks[todoListId]
        let newTask = todoList.find(t => t.id === taskId)
        if (newTask) {
            newTask.isDone = isDone
        }
        setTasks({...tasks})
    }
//Альтернатива с .map:
    // function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
    //     const todoList = tasks[todoListId]
    //     let newTodoList = todoList.map(t => {
    //         if (t.id === taskId) {
    //             return {...t, isDone: isDone}
    //         }
    //         return t
    //     })
    //     tasks[todoListId] = newTodoList
    //     setTasks({...tasks})
    // }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
        // setFilter(value);
    }
    
    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks}) //перерисовка после удаления тасок удаленного тодолиста необязательна!
    }

    return (
        <div className="App">
            {
                todoLists.map(tl => {

                    let tasksForToDoList = tasks[tl.id];   //вариант для "all". И "tl.id" = todoListId1 либо todoListId2 (он же - Массив)
                    if (tl.filter === "completed") {   //вариант для "completed"
                        tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true)
                    }
                    if (tl.filter === "active") {      //вариант для "active"
                        tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false)
                    }

                    return (
                        <TodoList
                            key={tl.id}   //"tl.id" = todoListId1 либо todoListId2 (он же - Массив)
                            id={tl.id}    //"tl.id" = todoListId1 либо todoListId2 (он же - Массив)
                            title={tl.title}
                            tasks={tasksForToDoList}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            changeTaskStatus={changeTaskStatus}
                            filter={tl.filter}  //нельзя просто filter, т.к. не будет меняться стиль кнопок фильтра
                            removeTodoList={removeTodoList}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
