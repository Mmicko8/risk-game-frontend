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
import AchievementIcon from '@mui/icons-material/MilitaryTech';
import LoyaltyPointsIcon from '@mui/icons-material/MonetizationOn';
import ShopItemIcon from '@mui/icons-material/ShoppingBag';
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import {useTheme} from "@mui/material/styles";

export default function Profile() {
    const {isLoading, isError, profile} = useProfile();
    const {username} = useContext(AccessContext);
    const theme = useTheme();

    if (isLoading) {
        return <Loading/>
    }
    if (isError) {
        return <Alert message={"Error loading the profile"}/>
    }

    // Instellen en bekijken van nickname, avatar, password reset, stats (# spelletjes, #gewonnen…),...
    console.log(profile)
    console.log(theme.palette)

    const statSx = {color: theme.palette.primary.main, fontSize: "80px"}
    const stats = [
        {icon: <AchievementIcon sx={statSx}/>, amount: profile.achievements.length, text: "Achievements"},
        {icon: <LoyaltyPointsIcon sx={statSx}/>, amount: profile.loyaltyPoints, text: "Loyalty Points"},
        {icon: <ShopItemIcon sx={statSx}/>, amount: profile.shopItems.length, text: "Owned Items"}
    ]


    return <Container>
        <Grid container sx={{marginTop: "10vh"}}>
            <Grid item xs={12} md={6}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Avatar sx={{width: "120px", height: "120px"}} src="/testAvatar.jpg"/>
                    <EditProfile id={profile.id} username={username!} email={profile.email}/>
                </div>
            </Grid>
            <Grid item xs={12} md={6} sx={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                {stats.map((stat, index) =>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        {stat.icon}
                        <Typography variant="h4">{stat.amount}</Typography>
                        <div style={{color: theme.palette.grey.A700}}>{stat.text}</div>
                        <Divider orientation="vertical" flexItem/>
                    </div>
                )}
            </Grid>
        </Grid>
    </Container>
}