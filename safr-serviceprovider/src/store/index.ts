import thunkMiddleware from "redux-thunk"
import { configureStore, getDefaultMiddleware, AnyAction, Reducer } from "@reduxjs/toolkit"

import * as Session from "./session"

export interface AppState {
    session: Session.State;
}

type Reducers<T> = {
    [P in keyof T] : Reducer<T[P], AnyAction>
}

const reducer : Reducers<AppState> = {
    session: Session.reducer
}

const middleware = [...getDefaultMiddleware(), thunkMiddleware]

export const store = configureStore({
    reducer,
    middleware,
    devTools: true
});