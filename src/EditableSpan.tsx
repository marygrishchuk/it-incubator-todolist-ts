import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, seEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => {
        seEditMode(true)
    }
    const offEditMode = () => {
        seEditMode(false)
        if (title.trim()) {
            props.changeTitle(title.trim())
        }
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={onChangeTitle}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}