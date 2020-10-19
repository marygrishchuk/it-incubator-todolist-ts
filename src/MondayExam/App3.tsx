import React, {useState} from 'react';
import './App3.css';
import {Counter} from "./Counter";
import {Button} from "./Button";

function App() {

    const [digit, setDigit] = useState<number>(0)
    const [disabledInc, setDisabledInc] = useState<boolean>(false)
    const [disabledReset, setDisabledReset] = useState<boolean>(true)

    function disableButton (digit: number) {
        if (digit === 5) {
            setDisabledInc(true)
        } else if (digit === 0) {
            setDisabledInc(false)
            setDisabledReset(true)
        } else {
            setDisabledReset(false)
        }
    }

    function changeDigit(digit: number) {
        setDigit(digit)
        disableButton(digit)
    }

    return (
        <div className="App3">
            <Counter digit={digit}/>
            <div className="btnBlock">
                <Button title={"inc"} disabled={disabledInc} changeDigit={changeDigit} digit={digit}/>
                <Button title={"reset"} disabled={disabledReset} changeDigit={changeDigit} digit={digit}/>
            </div>
        </div>
    )
}

export default App;
