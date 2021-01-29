export type todoListActionType = ReturnType<typeof removeTodoListAC> |
    ReturnType<typeof addTodoListAC> |
    ReturnType<typeof changeTodoListTitleAC> |
    ReturnType<typeof changeTodoListFilterAC>

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

let initialState: Array<TodoListType> = []

export const todoListReducer = (state: Array<TodoListType> = initialState, action: todoListActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)  //filter creates new array
            //To delete the tasks of the removed todoList, tasks-reducer.ts is used
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: action.todoListId, title: action.title, filter: "all"
            }
            return [newTodoList, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state

    }
}
//if we add empty cases there will be a TypeScript error: Object (inside test file) is possibly undefined.

export const removeTodoListAC = (todoListId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todoListId} as const
}
//we will make server requests from action creators!

export const addTodoListAC = (todoListTitle: string, todoListId:string) => {
    return {type: 'ADD-TODOLIST', title: todoListTitle, todoListId} as const //NEVER create IDs for new todolists in ActionCreators!
}

export const changeTodoListTitleAC = (todoListId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todoListId, title: title} as const
}

export const changeTodoListFilterAC = (todoListId: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todoListId, filter: filter} as const
}