import {useProfile} from "../../../hooks/useProfile";
import Loading from "../../Loading";
import {Alert} from "../../Alert";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import EditProfile from "./EditProfile";
import {useContext} from "react";
import AccessContext from "../../../context/AccessContext";

export default function Profile() {
    const {isLoading, isError, profile} = useProfile();
    const {username} = useContext(AccessContext);

    if (isLoading) {
        return <Loading/>
    }
    if (isError) {
        return <Alert message={"Error loading the profile"}/>
    }

    // Instellen en bekijken van nickname, avatar, password reset, stats (# spelletjes, #gewonnen…),...
    console.log(profile)

    return <Container>
        <Grid container sx={{marginTop: "10vh"}}>
            <Grid item xs={12} md={6}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Avatar sx={{width: "120px", height: "120px"}} src="/testAvatar.jpg"/>
                    <EditProfile id={profile.id} username={username!} email={profile.email}/>
                </div>
            </Grid>
            <Grid item xs={12} md={6}>

            </Grid>
        </Grid>
    </Container>
}