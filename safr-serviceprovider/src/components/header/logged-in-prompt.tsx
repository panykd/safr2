import * as React from "react";
import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session/thunks";

import Button from "@material-ui/core/Button"
import Avatar from "@material-ui/core/Avatar";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const LoggedInPrompt : FunctionComponent = () => {

    const dispatch = useDispatch();

    const handleSignout = (event: React.FormEvent<HTMLLIElement>) => {
        event.preventDefault();

        dispatch(logout());
    }

    const [avatarMenu, setAvatarMenu] = React.useState<any>(null);

    const handleAvatarClick = (evt: React.MouseEvent<HTMLDivElement>) => {
        setAvatarMenu(evt.currentTarget)
    }

    const handleMenuClose = () => {
        setAvatarMenu(null);
      };

    return (
        <>
            <Avatar onClick={handleAvatarClick}>
            </Avatar>
            <Menu
                anchorEl={avatarMenu}
                open={Boolean(avatarMenu)}
                onClose={handleMenuClose}>
                <MenuItem onClick={handleSignout}>Sign Out</MenuItem>
            </Menu>
        </>
    );
}

export default LoggedInPrompt