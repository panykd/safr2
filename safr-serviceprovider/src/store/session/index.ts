import { CaseReducer, PayloadAction, createSlice, Dispatch } from "@reduxjs/toolkit";

// State Definitions
interface State {
    jwt: string;

    isLoggedIn: boolean;
}

const initialState : State = {
    jwt: "",
    isLoggedIn: false
}

// Reducer Methods
const loggedIn : CaseReducer<State, PayloadAction<{}>> = (state, action) => { 
    return {
        ...state, 
        isLoggedIn: true
    }
}

const loggedOut : CaseReducer<State, PayloadAction<{}>> = (state, action) => { 
    return {
        ...state, 
        isLoggedIn: false
    }
}

const userSlice = createSlice({
    name: "session",
    initialState: initialState,
    reducers: { 
        loggedIn,
        loggedOut
    }
});

// Setup the Exports
export { State }
export const {actions, reducer} = userSlice;