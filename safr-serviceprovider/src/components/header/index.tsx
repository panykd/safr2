import * as React from "react";
import { FunctionComponent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store";
import LoginPrompt from "./login-prompt";
import LoggedInPrompt from "./logged-in-prompt";

import AppBar from "@material-ui/core/AppBar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Toolbar from "@material-ui/core/Toolbar";

interface StoreProps {
    isLoggedIn: boolean
}

const Header : FunctionComponent = () => {

    const store = useSelector<AppState, StoreProps>(store => { 
        return ({
            isLoggedIn: store.session.isLoggedIn
        });
    });

    return (
        <>
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <div style={{flexGrow: 1}} />
                    {store.isLoggedIn ? <LoggedInPrompt /> : <LoginPrompt /> }
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header;