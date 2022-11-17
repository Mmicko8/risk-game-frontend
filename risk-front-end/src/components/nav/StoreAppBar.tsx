import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";

type HeaderProps = {
    onOpenDrawer: () => void;
};
/**
 * App bar voor de applicatie
 */
export default function StoreAppBar({onOpenDrawer}: HeaderProps) {
    //hooks


    //appbar tonen op het scherm
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={onOpenDrawer}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Link style={{textDecoration: "none", color: "white"}} to={"/departments"}>
                            StoreManager
                        </Link>
                    </Typography>

                </Toolbar>
            </AppBar>
        </Box>
    );
}