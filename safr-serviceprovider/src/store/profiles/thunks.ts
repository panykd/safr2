import { AppState } from "..";
import { Dispatch } from "@reduxjs/toolkit";
import { actions, Profile } from ".";

import * as Faker from "faker";

export const createFakeProfile = () => {
    return async function(dispatch: Dispatch, getStore: () => AppState) {

        const store = getStore();
        const id = `${store.profiles.ids.length}`

        let profile : Profile = {
            id,
            givenName: Faker.name.firstName(),
            familyName: Faker.name.lastName(),
            email: Faker.internet.email()
        }

        dispatch(actions.addProfile({profile}));
    }
}

export const getFakeProfile = () => {
    return async function(dispatch: Dispatch, getStore: () => AppState) {

        const response = await fetch("http://localhost:5000/persona",
        {
            method: "get"
        });

        const profile = await response.json() as Profile;

        dispatch(actions.addProfile({profile}));
    }
}