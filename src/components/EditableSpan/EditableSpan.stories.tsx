import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";
import {ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";

export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
    decorators: [ReduxStoreProviderDecorator]
}

const changeTitleCallback = action("Title has been changed")

export const EditableSpanBaseExample = () => {
    return <EditableSpan title={"Start value"} changeTitle={changeTitleCallback}/>
}

export const EditableSpanDisabledExample = () => {
    return <EditableSpan title={"Start value"} changeTitle={changeTitleCallback} disabled={true}/>
}