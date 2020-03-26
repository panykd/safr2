import { hot } from "react-hot-loader/root";
import * as React from "react";
import { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";

// State
import { AppState } from "../store";
import * as Profiles from "../store/persona";
import * as ProfilesThunks from "../store/persona/thunks";

// Components
import Header from "./header";
import ProfileCard from "./profile";



const Safr : FunctionComponent = () => {

    const dispatch = useDispatch();
    const profiles = useSelector<AppState, Profiles.State>(store => store.profiles);

    const handleOnClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(ProfilesThunks.createProfile());
    }

    let profileCards = profiles.ids.map(id => <ProfileCard key={id} profileId={id} />)

    return (
        <>
            <div>
                <Header />
            </div>
            <div>
                {profileCards}
            </div>
            <div>
                <button onClick={handleOnClick}>Add Profile</button>
            </div>
        </>
    )
}

export default hot(Safr);