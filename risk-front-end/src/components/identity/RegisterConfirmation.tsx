import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import DoneIcon from '@mui/icons-material/Done';
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

export default function RegisterConfirmation() {
    const navigate = useNavigate()

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'success.main'}}>
                    <DoneIcon/>
                </Avatar>
                <Typography component="p" sx={{fontSize:"large"}}>
                    Registration successful! Email confirmation has been sent to your inbox, confirm and then sign in to access your account
                </Typography>
                <Button
                    variant="contained"
                    sx={{mt: 3, mb: 2, width: "40%"}}
                    onClick={() => navigate('/sign_in')}
                >
                    Sign In
                </Button>
            </Box>
        </Container>
    );
}