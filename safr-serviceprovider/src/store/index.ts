import thunkMiddleware from "redux-thunk"
import { configureStore, getDefaultMiddleware, AnyAction, Reducer } from "@reduxjs/toolkit"

import * as Session from "./session";
import * as Configuration from "./configuration";
import * as Profiles from "./persona";

export interface AppState {
    session: Session.State;
    configuration: Configuration.State;
    profiles : Profiles.State;
}

type Reducers<T> = {
    [P in keyof T] : Reducer<T[P], AnyAction>
}

const reducer : Reducers<AppState> = {
    session: Session.reducer,
    configuration: Configuration.reducer,
    profiles: Profiles.reducer
}

const middleware = [...getDefaultMiddleware(), thunkMiddleware]

export const store = configureStore({
    reducer,
    middleware,
    devTools: true
});