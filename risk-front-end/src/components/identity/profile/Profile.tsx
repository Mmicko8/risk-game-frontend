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
import {useTheme} from "@mui/material/styles";
import Divider from "@mui/material/Divider"

interface GameStatsProps {
    played: number;
    won: number;
    lost: number;
}
function GameStats({played, won, lost}: GameStatsProps) {
    const theme = useTheme();
    return <div>
        <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography variant="h4">{played}</Typography>
                <div style={{color: theme.palette.grey.A700}}>PLAYED</div>
            </div>

            <Divider orientation="vertical" flexItem/>

            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography variant="h4">{won}</Typography>
                <div style={{color: theme.palette.grey.A700}}>WON</div>
            </div>

            <Divider orientation="vertical" flexItem/>

            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography variant="h4">{lost}</Typography>
                <div style={{color: theme.palette.grey.A700}}>LOST</div>
            </div>
        </div>
    </div>
}

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
            <Grid item xs={12} md={6} style={{display: "flex", flexDirection: "column", justifyContent: "center", gap: "20px"}}>
                <div>
                    <Typography variant="h4"  sx={{display:"flex", justifyContent:"center", marginBottom: "20px"}}>
                        Statistics
                    </Typography>
                    <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                        {stats.map((stat, index) =>
                            <div key={index} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                {stat.icon}
                                <Typography variant="h4">{stat.amount}</Typography>
                                <div style={{color: theme.palette.grey.A700}}>{stat.text}</div>
                            </div>
                        )}
                    </div>
                </div>
                <Divider flexItem/>
                <GameStats played={profile.gamesPlayed} won={profile.gamesWon} lost={profile.gamesLost}/>
            </Grid>
            <Grid item xs={12} sx={{marginTop: "50px"}}>
                <Typography variant="h4" sx={{display:"flex", justifyContent:"center"}}>
                    Achievements
                </Typography>
            {/*    TODO achievements*/}
            </Grid>
        </Grid>
    </Container>
}