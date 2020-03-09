import * as React from "react"
import { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithSimpleCredentials } from "../../store/session/thunks";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider";
import { AppState } from "../../store";


const LoginPrompt : FunctionComponent = () => {

    const dispatch = useDispatch();

    const allowSignup = useSelector<AppState, boolean>(state => state.configuration.allowSignup);

    const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        // event.preventDefault();

        dispatch(loginWithSimpleCredentials("", ""));
    }

    return (
        <>
            <form>
                <Grid container>
                    <Button color="inherit" onClick={handleLogin}>Sign In</Button>
                    {allowSignup 
                        ? <><Divider orientation="vertical" flexItem /><Button color="inherit">Sign Up</Button></>
                        : <></>}
                </Grid>
            </form>
        </>
    )
}

export default LoginPrompt