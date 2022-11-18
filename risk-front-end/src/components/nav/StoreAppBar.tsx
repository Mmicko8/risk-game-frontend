import * as React from 'react';
import {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
import UserContext, {IUserContext} from "../../context/UserContext";
import Button from '@mui/material/Button';

type HeaderProps = {
    onOpenDrawer: () => void;
};
/**
 * App bar voor de applicatie
 */
export default function StoreAppBar({onOpenDrawer}: HeaderProps) {
    //hooks
    const {player, togglePlayer} = useContext<IUserContext>(UserContext);

    //appbar tonen op het scherm
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={onOpenDrawer}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Link style={{textDecoration: "none", color: "white"}} to={"/"}>
                            Risky Business
                        </Link>
                    </Typography>
                    <Link style={{textDecoration: 'none'}} to={`/register`}>
                        <Button
                            color="inherit">Register</Button>
                    </Link>
                    <Link style={{textDecoration: 'none'}} to={`/sign_in`}>
                        <Button
                            color="inherit">Sign in</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}