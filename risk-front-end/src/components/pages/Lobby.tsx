import {useNavigate, useParams} from "react-router-dom";
import {useLobby} from "../../hooks/useLobby";
import {CircularProgress, Stack, Chip} from "@mui/material";
import {Player} from "../../model/player/Player";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import StarRateIcon from '@mui/icons-material/StarRate';
import Container from "@mui/material/Container";
import * as React from "react";
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from "@mui/material/Button";
import {useContext, useState} from "react";
import AccessContext from "../../context/AccessContext";
import {Alert} from "../Alert";
import {invitePlayerWithEmail, invitePlayerWithUsername, startGameCall} from "../../services/lobbyService";
import {getAvatar} from "../../services/utilsService";
import EmailInvitationDialog from "../dialogs/EmailInvitationDialog";
import {EmailInvitation} from "../../model/lobby/EmailInvitation";

export function Lobby() {
    const navigate = useNavigate();
    const [isInviteScreenOpen, setIsInviteScreenOpen] = useState(false);
    const {username} = useContext(AccessContext);
    const {id} = useParams<{ id: string }>();
    const {isLoading, isError, lobby, addAi, errorAddingAi} = useLobby(id!);

    if (!username) {
        navigate("/sign_in")
    }

    if (isLoading) {
        return <CircularProgress sx={{position: "fixed", top: "50%", left: "50%"}}/>
    }
    if (isError || errorAddingAi) {
        return <Alert message={"Error loading the lobby"}/>
    }
    if (lobby.closed) {
        return <Alert severity={"info"} message={"Lobby is already closed"}/>
    }

    function startGame() {
        startGameCall(lobby.lobbyId).then((response) => {
            navigate(`/game/${response.data}`)
        }).catch(() => {
            //Other way of showing warning?
            console.warn("Something went wrong starting the game");
        })
    }

    function addAI() {
        addAi()
    }

    function invitePlayer(data: EmailInvitation) {
        if (data.type === 'username') {
            invitePlayerWithUsername(data.usernameOrEmail, parseInt(id!))
        }
        if (data.type === 'email') {
            invitePlayerWithEmail(data.usernameOrEmail, parseInt(id!))
        }
    }

    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" fontFamily="Courier" fontWeight="bolder">
                    Lobby: {lobby.lobbyId}
                </Typography>
                <Stack direction="row" spacing={4} sx={{mt: "20px"}}>
                    <Chip icon={<PersonIcon/>} color="success" label={`Amount of players: ${lobby.maxPlayers}`}/>
                    <Chip icon={<AccessTimeIcon/>} color="success" label={`Round timer: ${lobby.timer}s`}/>
                    {lobby.host.username === username?
                        <>
                            <Button disabled={lobby.players.length < 2} variant="contained" onClick={() => startGame()}>
                                Start game
                            </Button>
                            <Button disabled={lobby.players.length >= lobby.maxPlayers} variant="contained" onClick={() => addAI()}>
                                Add AI
                            </Button>
                        </>
                        :""}
                    <Button disabled={lobby.players.length >= lobby.maxPlayers} variant="contained" onClick={() => setIsInviteScreenOpen(true)}>
                        Send email invitation
                    </Button>
                </Stack>
                <div style={{display: "flex", flexDirection: "row"}}>
                    {lobby.players.map((player: Player, index: number) => {
                        return <Box key={index} className="playerFrameBox" sx={{borderRadius: 3, width:"15vw"}}>
                            <Avatar sx={{width: "6vw", height: "6vw", margin:"0.5vw"}}
                                    src={getAvatar(player.profilePicture)}/>
                            <Stack direction="column" spacing={2}>
                                {lobby.host.username === player.username? <Chip icon={<StarRateIcon/>} color="primary" label="Host"/>: ""}
                                <Typography>{player.username}</Typography>
                            </Stack>
                        </Box>
                    })}
                    {[...Array(lobby.maxPlayers - lobby.players.length)].map((value, index: number) => {
                        return <Box key={index} className="playerFrameBox" sx={{borderRadius: 3, width:"15vw"}}>
                            <Avatar sx={{width: "6vw", height: "6vw", margin:"0.5vw"}}/>
                            <Typography>Waiting for player...</Typography>
                        </Box>
                    })}
                </div>
            </Box>
            <EmailInvitationDialog isOpen={isInviteScreenOpen} onClose={() => setIsInviteScreenOpen(false)} onSubmit={invitePlayer}/>
        </Container>
    )
}