import { AppState } from "..";
import { Dispatch } from "@reduxjs/toolkit";
import { actions, Profile } from ".";

export const createProfile = () => {
    return async function(dispatch: Dispatch, getStore: () => AppState) {

        const urlBase = getStore().configuration.serverUrl;

        const response = await fetch(`${urlBase}/persona`,
        {
            method: "post"
        });

        const payload : {id: string} = await response.json();

        getProfile(payload.id)(dispatch, getStore);
    }
}

export const getProfile = (id: string) => {
    return async function(dispatch: Dispatch, getStore: () => AppState) {

        const urlBase = getStore().configuration.serverUrl;

        const response = await fetch(`${urlBase}/persona/${id}`,
        {
            method: "get"
        });

        const profile = await response.json() as Profile;

        dispatch(actions.addProfile({profile}));
    }
}