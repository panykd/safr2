import { AppState } from "..";
import { Dispatch } from "@reduxjs/toolkit";
import { actions, Profile } from ".";

import * as Faker from "faker";

export const createFakeProfile = () => {
    return async function(dispatch: Dispatch, getStore: () => AppState) {

        const store = getStore();
        const id = `${store.profiles.ids.length}`

        let firstName = Faker.name.firstName();
        let lastName = Faker.name.lastName();

        let profile : Profile = {
            id,
            givenName: firstName,
            familyName: lastName,
            email: Faker.internet.email(firstName, lastName),
            age: Faker.random.number({min: 18, max: 28})
        }

        dispatch(actions.addProfile({profile}));
    }
}