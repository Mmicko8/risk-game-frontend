import {Controller, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import {editPlayerUsername} from "../../../services/identityService";
import {useContext} from "react";
import AccessContext from "../../../context/AccessContext";
import {useNavigate} from "react-router-dom";

interface EditProfileProps {
    id: number,
    username: string;
    email: string;
}

export default function EditProfile({id, username, email}: EditProfileProps) {
    const navigate = useNavigate();
    const {removeUsername, removeAccessToken} = useContext(AccessContext);
    const {
        control,
        handleSubmit,
        reset,
        setError,
        formState: {errors}
    } = useForm({
        defaultValues: {
            username
        }
    });

    const _onSubmit = async (data: {username: string}) => {
        editPlayerUsername(id, data.username).then(() => {
            removeUsername();
            removeAccessToken();
            navigate("/sign_in");
        }).catch(() => {
            setError('username', {
                type: "server",
                message: "Something went wrong updating the user"
            })
        });
        reset();
    };

    return <Box component="form" onSubmit={handleSubmit(_onSubmit)} noValidate sx={{mt: 1}}>
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
                />
            )}
        />

        <TextField
            name="email"
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            defaultValue={email}
            disabled
        />
        <div style={{color:"red"}}>{errors.username?.message}</div>

        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
        >
            Update and log out
        </Button>
    </Box>
}