import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link} from "react-router-dom";
import {logIn} from "../../services/loginService";
import {useForm, Controller} from "react-hook-form";
import {SignInCredentials} from "../../model/SignInCredentials";
import {useContext} from "react";
import AccessContext from "../../context/AccessContext";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            Copyright © Risky Business {new Date().getFullYear()}.
        </Typography>
    );
}

export default function SignIn() {
    const {
        control,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            username: '',
            password: '',
        }
    })

    const {setAccessToken, setUsername} = useContext(AccessContext);

    const _onSubmit = async (data: SignInCredentials) => {
        const accessToken = await logIn(data.username, data.password);
        if (accessToken) {
            setAccessToken(accessToken);
            setUsername(data.username);
        }
        reset();
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
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(_onSubmit)} noValidate sx={{mt: 1}}>
                        <Controller
                            name="username"
                            control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoComplete="username"
                                    autoFocus
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            )}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to={`/reset_password`}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to={`/register`}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
    );
}
