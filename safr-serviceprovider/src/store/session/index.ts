import { CaseReducer, PayloadAction, createSlice, Dispatch } from "@reduxjs/toolkit";

// State Definitions
interface State {
    jwt: string;
}

const initialState : State = {
    jwt: ""
}

// Reducer Methods
const setJwt : CaseReducer<State, PayloadAction<{jwt: string}>> = (state, action) => { 
    return {
        ...state, 
        jwt: action.payload.jwt
    }
}

const userSlice = createSlice({
    name: "session",
    initialState: initialState,
    reducers: { }
});

// Setup the Exports
export { State }
export const {actions, reducer} = userSlice;
export const thunks = { }