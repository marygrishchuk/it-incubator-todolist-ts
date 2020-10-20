import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    //local state which is necessary only for this component
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onAddItemKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            onAddItemClick()
        }
    }

    const onAddItemClick = () => {
        if (title.trim()) {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    return (
        <div>
            <input
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onAddItemKeyPress}
                className={error ? "error" : ""}
            />
            <button onClick={onAddItemClick}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}