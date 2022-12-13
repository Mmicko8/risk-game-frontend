import {useParams} from "react-router-dom";
import {useLobby} from "../hooks/useLobby";
import {Alert, CircularProgress} from "@mui/material";
import {Player} from "../model/Player";

export function Lobby() {
    const {id} = useParams<{ id: string }>()
    const {isLoading, isError, lobby} = useLobby(id!)

    if (isLoading) {
        return <CircularProgress sx={{position: "fixed", top: "50%", left: "50%"}}/>
    }
    if (isError) {
        return <Alert severity="error">Error loading the lobby</Alert>
    }

    console.log(lobby.closed)
    return (
        <div>
            <div>id: {lobby.lobbyId}</div>
            <div>maxplayers: {lobby.maxPlayers}</div>
            {lobby.players.map((player: Player) => {
                return <div key={player.username}>player: {player.username} </div>
            })}
            <div>host: {lobby.host.username}</div>
            <div>timer: {lobby.timer}</div>
            <div>closed: {lobby.closed}</div>
        </div>
    )
}