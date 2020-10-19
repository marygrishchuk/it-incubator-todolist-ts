import React from "react";

type PropsType = {
    title: "inc" | "reset"
    disabled: boolean
    changeDigit: (digit: number) => void
    digit: number
}

export function Button(props: PropsType) {

    let onClickHandler = () => {
        if (props.title === "inc") {
            props.changeDigit(props.digit + 1)
        } else if (props.title === "reset") {
            props.changeDigit(0)
        }
    }

    return (
        <button className={"btn"} disabled={props.disabled} onClick={onClickHandler}>
            {props.title}
        </button>
    )
}