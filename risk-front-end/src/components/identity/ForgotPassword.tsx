import {Controller, useForm} from "react-hook-form";
import {useContext} from "react";
import AccessContext from "../../context/AccessContext";
import {useNavigate} from "react-router-dom";
import {SignInCredentials} from "../../model/player/SignInCredentials";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            Copyright © Risky Business {new Date().getFullYear()}.
        </Typography>
    );
}

export function ForgotPassword() {
    const {
        control,
        handleSubmit,
        reset,
        setError,
        formState: {errors}
    } = useForm({
        defaultValues: {
            username: '',
            password: '',
        }
    })

    const {setResetPasswordToken} = useContext(AccessContext);
    const navigate = useNavigate()

    const _onSubmit = async (data: SignInCredentials) => {
        // login(data.username, data.password)
        //     .then((response) => {
        //         setAccessToken(response?.headers?.authorization!);
        //         setUsername(data.username);
        //         navigate('/');
        //     })
        //     .catch(() => {
        //         setError('password', {
        //             type: "server",
        //             message: "The username or password was incorrect"
        //         })
        //     })
        // reset();
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <HelpOutlineIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot password
                </Typography>
                <Box component="form" onSubmit={handleSubmit(_onSubmit)} noValidate sx={{mt: 1}}>
                    <Controller
                        name="username"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                margin="normal"
                                fullWidth
                                id="username"
                                label="Username"
                                autoComplete="username"
                                autoFocus
                            />
                        )}
                    />
                    <div style={{color:"red"}}>{errors.password?.message}</div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Request new password
                    </Button>
                </Box>
            </Box>
            <Copyright sx={{mt: 8, mb: 4}}/>
        </Container>
    );
}