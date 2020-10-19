import React, {useState} from 'react';
import './App.css';
import {TodoList2} from "./TodoList2";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    checked: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App2() {   //JSX
    const arraySet = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", checked: false},
        {id: v1(), title: "CSS", checked: false},
        {id: v1(), title: "JS", checked: false},
        {id: v1(), title: "Redux", checked: false},
        {id: v1(), title: "Rest API", checked: false}
    ]);  //более длинная запись (из 3 переменных)
    const tasks = arraySet[0];
    const setTasks = arraySet[1];

    let [filter, setFilter] = useState<FilterValuesType>("all"); //более короткая запись массива

    function addTask(title: string, checked: boolean) {
        const newTask = {id: v1(), title: title, checked: checked};
        setTasks([newTask, ...tasks]);
    }

    function removeTask(taskId: string) {
        const filteredTasks = tasks.filter(t => t.id !== taskId);
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForToDoList = tasks;   //вариант для "all"
    if (filter === "completed") {   //вариант для "completed"
        tasksForToDoList = tasks.filter(t => t.checked === true)
    }
    if (filter === "active") {      //вариант для "active"
        tasksForToDoList = tasks.filter(t => t.checked === false)
    }

    return (
        <div className="App">
            <TodoList2 title={"What to learn"}
                      tasks={tasksForToDoList}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App2;
