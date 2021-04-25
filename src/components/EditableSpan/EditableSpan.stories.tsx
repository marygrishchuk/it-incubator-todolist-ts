import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";

export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}

const changeTitleCallback = action("Title has been changed")

export const EditableSpanBaseExample = () => {
    return <EditableSpan title={"Start value"} changeTitle={changeTitleCallback}/>
}