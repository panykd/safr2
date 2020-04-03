import { CaseReducer, PayloadAction, createSlice, Dispatch } from "@reduxjs/toolkit";

// State Definitions
interface State {
    allowSignup: boolean;
    serverUrl: string
}

const initialState : State = {
    allowSignup: true,
    serverUrl: "http://localhost:5000"
}

// Reducer Methods

const slice = createSlice({
    name: "configuration",
    initialState: initialState,
    reducers: {
    }
});

// Setup the Exports
export { State }
export const {actions, reducer} = slice;