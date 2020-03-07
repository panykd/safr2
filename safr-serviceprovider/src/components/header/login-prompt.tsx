import * as React from "react"
import { FunctionComponent, useState } from "react";
import { useDispatch } from "react-redux";
import { loginWithSimpleCredentials } from "../../store/session/thunks";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider";


const LoginPrompt : FunctionComponent = () => {

    const dispatch = useDispatch();

    const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        // event.preventDefault();

        dispatch(loginWithSimpleCredentials("", ""));
    }

    return (
        <>
            <form>
                <Grid container>
                    <Button color="inherit" onClick={handleLogin}>Sign In</Button>
                    <Divider color="inherit"  orientation="vertical" flexItem />
                    <Button color="inherit">Sign Up</Button>
                </Grid>
            </form>
        </>
    )
}

export default LoginPrompt