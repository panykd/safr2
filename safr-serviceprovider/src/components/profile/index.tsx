import * as React from "react"
import { FunctionComponent } from "react"
import { useSelector } from "react-redux"

import { AppState } from "../../store"
import { Profile } from "../../store/persona"

import Card from "@material-ui/core/Card"

interface Props {
    profileId: string
}

const ProfileCard : FunctionComponent<Props> = (props) => {

    const profile = useSelector<AppState, Profile>(state => state.profiles.byId[props.profileId]);

    return (
        <>
            <Card>
                <p>{profile.givenName}</p>
                <p>{profile.familyName}</p>
                <p>{profile.email}</p>
            </Card>
        </>
    )
}

export default ProfileCard