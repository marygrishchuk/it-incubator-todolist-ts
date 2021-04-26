import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {RequestStatusType} from "../../app/app-reducer";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm is called')
    const requestStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    //local state which is necessary only for this component
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onAddItemKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === "Enter") {
            onAddItemClick()
        }
    }

    const onAddItemClick = () => {
        if (title.trim()) {
            props.addItem(title.trim())
            if (requestStatus === 'succeeded') setTitle("")
        } else {
            setError("Title is required")
        }
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onAddItemKeyPress}
                error={!!error}
                label={"Title"}
                helperText={error}
                disabled={props.disabled}
            />
            <IconButton color={"primary"} onClick={onAddItemClick} disabled={props.disabled}><AddBox/></IconButton>
        </div>
    )
})