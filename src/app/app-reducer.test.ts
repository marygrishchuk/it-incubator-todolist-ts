import {appReducer, InitialAppStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: InitialAppStateType

beforeEach(() => {
    startState = {
        status: 'loading',
        error: null
    }
})

test('app status should be changed', () => {
    const action = setAppStatusAC('succeeded')

    const endState = appReducer(startState, action)

    expect(endState.status).toBe('succeeded');
    expect(endState.error).toBe(null);
});

test('the error message should be set', () => {
    const action = setAppErrorAC('Line is too long')

    const endState = appReducer(startState, action)

    expect(endState.error).toBe('Line is too long');
    expect(endState.status).toBe('loading');
});