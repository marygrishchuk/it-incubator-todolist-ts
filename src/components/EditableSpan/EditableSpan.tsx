import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {RequestStatusType} from "../../app/app-reducer";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
    disabled?: boolean
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan is called')
    const requestStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const [editMode, seEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => {
        !props.disabled && seEditMode(true)
    }
    const offEditMode = () => {
        if (title.trim()) {
            props.changeTitle(title.trim())
        }
        if (requestStatus === 'succeeded') seEditMode(false)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onEnterKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (title.trim()) {
                props.changeTitle(title.trim())
            }
            if (requestStatus === 'succeeded') seEditMode(false)
        }
    }

    return (
        editMode
            ?
            <TextField
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={onChangeTitle}
                onKeyPress={onEnterKeyPress}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})