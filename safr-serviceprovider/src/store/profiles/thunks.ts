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