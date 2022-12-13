import {Box, Chip, Stack, Avatar} from "@mui/material";
import {Lobby} from "../model/Lobby";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from '@mui/icons-material/Groups';
import * as React from "react";
import {Player} from "../model/Player";
import Button from "@mui/material/Button";

interface OpenLobbiesProps {
    lobbies: Lobby[]
}

export function OpenLobbies({lobbies}: OpenLobbiesProps) {
    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'rgba(143,143,143,0.63)',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

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
                            <Chip
                                icon={<GroupsIcon/>}
                                size="small"
                                color="success"
                                label={lobby.players.map((player: Player, index) => {
                                    if (index + 1 === lobby.players.length) return player.username
                                    return `${player.username},`
                                })}/>
                        </Stack>
                        <Button size="small" variant="contained">Join lobby</Button>
                    </Item>
                })}
            </Stack>
        </Box>
    )
}