import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link, useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import {useContext} from "react";
import AccessContext from "../../context/AccessContext";

function UserManagementButtons() {
    const navigate = useNavigate();

    const {username, logout} = useContext(AccessContext);
    if (!username)
        return <>
            <Button color="inherit" onClick={() => navigate("/register")}>Register</Button>
            <Button color="inherit" onClick={() => navigate("/sign_in")}>Sign in</Button>
        </>
    else {
        return <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <Typography variant="body2">{username}</Typography>
            <Button style={{marginLeft: "16px", color: "white"}} onClick={() => logout}>
                <Typography variant="body2">logout</Typography>
            </Button>
        </div>
    }
}


type HeaderProps = {
    onOpenDrawer: () => void;
};
/**
 * App bar voor de applicatie
 */
export default function NavBar({onOpenDrawer}: HeaderProps) {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={onOpenDrawer}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        <Link style={{textDecoration: "none", color: "white"}} to={"/"}>
                            Risky Business
                        </Link>
                    </Typography>
                    <UserManagementButtons/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}