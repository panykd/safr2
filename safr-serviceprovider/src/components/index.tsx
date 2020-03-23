import { hot } from "react-hot-loader/root";
import * as React from "react";
import { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";

// State
import { AppState } from "../store";
import * as Profiles from "../store/profiles";
import * as ProfilesThunks from "../store/profiles/thunks";

// Components

import AppBar from "@material-ui/core/AppBar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Toolbar from "@material-ui/core/Toolbar";

import Container from "@material-ui/core/Container"

interface StoreProps {
    isLoggedIn: boolean
}

const Index : FunctionComponent = () => {

    const store = useSelector<AppState, StoreProps>(store => { 
        return ({
            isLoggedIn: store.session.isLoggedIn
        });
    });

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" >
                        <MenuIcon />
                    </IconButton>
                    <div style={{flexGrow: 1}} />
                    {store.isLoggedIn ? "Logged In" : "Log In" }
                </Toolbar>
            </AppBar>
            <Container>
                
            </Container>
        </>
    )
}

export default hot(Index);