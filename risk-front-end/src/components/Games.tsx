import {Avatar, Box, Chip, Stack} from "@mui/material";
import {Lobby} from "../model/Lobby";
import PersonIcon from "@mui/icons-material/Person";
import StarRateIcon from "@mui/icons-material/StarRate";
import GroupsIcon from "@mui/icons-material/Groups";
import {Player} from "../model/Player";
import Button from "@mui/material/Button";
import * as React from "react";
import {Item} from "./Lobbies"

interface GamesProps {
    lobbies: Lobby[]
}

export function Games({lobbies}: GamesProps) {
    return (
        <Box sx={{width: '100%'}}>
            <Stack spacing={1}>
                {lobbies.map((lobby: Lobby) => {
                    return <Item key={lobby.lobbyId} sx={{display: "flex", flexDirection: "row", justifyContent:"space-between", alignItems: "center"}}>
                        <Stack direction="row" spacing={1}>
                            <Chip
                                avatar={<Avatar alt="RiskIcon" src="../../riskIcon.png"/>}
                                label={`Lobby: ${lobby.lobbyId}`}
                                size="small"
                                color="success"
                            />
                            <Chip icon={<PersonIcon/>} size="small" color="success"
                                  label={`Maximum amount of players: ${lobby.maxPlayers}`}/>
                            <Chip icon={<StarRateIcon/>} size="small" color="success"
                                  label={`Host: ${lobby.host.username}`}/>
                            <Chip
                                icon={<GroupsIcon/>}
                                size="small"
                                color="success"
                                label={"Players: "+lobby.players.map((player: Player, index) => {
                                    if (index + 1 === lobby.players.length) return " "+player.username
                                    return ` ${player.username}`
                                })}/>
                        </Stack>
                        <Button size="small" variant="contained">Go to game</Button>
                    </Item>
                })}
            </Stack>
        </Box>
    )
}