import { Dispatch } from "@reduxjs/toolkit";
import { AppState } from "..";

import {actions} from "."

export const loginWithSimpleCredentials = (username: string, password: string) => {
    return async function(dispatch: Dispatch, getStore: () => AppState) {
        
        await delay();
        dispatch(actions.loggedIn({}));
    }
}

export const logout = () => {
    return async function(dispatch: Dispatch, getStore: () => AppState) {
        dispatch(actions.loggedOut({}));
    }
}

const delay = async (duration: number = 1000) => {
    return await new Promise(resolve => setTimeout(resolve, duration));
}