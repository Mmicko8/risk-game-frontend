import {Avatar, Box, Chip, Stack} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import TimelineIcon from '@mui/icons-material/Timeline';
import Button from "@mui/material/Button";
import * as React from "react";
import {Item} from "./Lobbies"
import {GameInfo} from "../model/GameInfo";
import {useNavigate} from "react-router-dom";

interface GamesProps {
    games: GameInfo[]
}

export function Games({games}: GamesProps) {
    const navigate = useNavigate();
    return (
        <Box sx={{width: '100%'}}>
            <Stack spacing={1}>
                {games.map((game: GameInfo) => {
                    return <Item key={game.gameId} sx={{display: "flex", flexDirection: "row", justifyContent:"space-between", alignItems: "center"}}>
                        <Stack direction="row" spacing={1}>
                            <Chip
                                avatar={<Avatar alt="RiskIcon" src="../../riskIcon.png"/>}
                                label={`Game: ${game.gameId}`}
                                size="small"
                                color="success"
                            />
                            <Chip icon={<AutorenewIcon/>} size="small" color="success"
                                  label={`Turn: ${game.turn}`}/>
                            <Chip icon={<PersonIcon/>} size="small" color="success"
                                  label={`Current player: ${game.currentPlayerIndex+1}`}/>
                            <Chip icon={<TimelineIcon/>} size="small" color="success"
                                  label={`Current phase: ${game.phase}`}/>
                        </Stack>
                        <Button size="small" variant="contained" onClick={() => navigate(`/game/${game.gameId}`)}>
                            Go to game
                        </Button>
                    </Item>
                })}
            </Stack>
        </Box>
    )
}