import { CaseReducer, PayloadAction, createSlice, Dispatch } from "@reduxjs/toolkit";
import { Profiler } from "react";
import { AppState } from "..";

export interface Profile {
    id: string;
    givenName: string;
    familyName: string;
    email: string;
}

// State Definitions
interface State {
    byId: {
        [id: string]: Profile
    };

    ids: string[];
}

const initialState : State = {
    byId: {},
    ids: []
}

// Reducer Methods
const addProfile : CaseReducer<State, PayloadAction<{profile: Profile}>> = (state, action) => {

    const profile = action.payload.profile;

    return {
        ...state,
        byId: {
            ...state.byId,
            [profile.id]: profile
        },
        ids: [
            ...state.ids.concat(profile.id)
        ]
    }
}


const slice = createSlice({
    name: "profiles",
    initialState: initialState,
    reducers: {
        addProfile
    }
});

// Setup the Exports
export { State }
export const {actions, reducer} = slice;


