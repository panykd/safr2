import * as React from "react";
import { FunctionComponent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../store";
import { loginWithSimpleCredentials, logout } from "../store/session/thunks";


interface StoreProps {
    isLoggedIn: boolean
}


const LoginPrompt : FunctionComponent = () => {

    const dispatch = useDispatch();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(loginWithSimpleCredentials(username, password));
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <input id="username" type="text" placeholder="Username" autoComplete="username" onChange={e => setUsername(e.target.value)} />
                <input id="password" type="password" placeholder="Password" autoComplete="current-password" onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Sign In</button>
            </form>
        </>
    )
}

const LoggedInPrompt : FunctionComponent = () => {

    const dispatch = useDispatch();

    const handleLogout = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(logout());
    }

    return (
        <>
            <form onSubmit={handleLogout}>
                <span></span>
                <button type="submit">Sign Out</button>
            </form>
        </>
    );
}

const Header : FunctionComponent = () => {

    const store = useSelector<AppState, StoreProps>(store => { 
        return ({
            isLoggedIn: store.session.isLoggedIn
        });
    });


    return (
        <>
            {store.isLoggedIn ? <LoggedInPrompt /> : <LoginPrompt /> }
        </>
    )
}

export default Header;