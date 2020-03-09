import { CaseReducer, PayloadAction, createSlice, Dispatch } from "@reduxjs/toolkit";

// State Definitions
interface State {
    allowSignup: boolean;
}

const initialState : State = {
    allowSignup: true
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