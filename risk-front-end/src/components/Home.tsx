import {Fab, Tooltip, Alert, Container} from "@mui/material"
import AddIcon from "@mui/icons-material/Add";
import {useContext, useState} from "react";
import CreateLobby from "./dialogs/CreateLobby";
import AccessContext from "../context/AccessContext";
import {CreateLobbyData, CreateLobbyDataNoUsername} from "../model/CreateLobbyData";
import {createLobbyCall, getJoinedLobbies} from "../services/lobbyService";
import {useLobbies} from "../hooks/useLobbies";
import {Lobbies} from "./Lobbies";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useQuery} from "react-query";
import Loading from "./Loading";
import {useNavigate} from "react-router-dom";
import {getActiveGames} from "../services/gameService";
import {Games} from "./Games";

export default function Home() {
    const navigate = useNavigate()
    const [isCreateLobbyOpen, setIsCreateLobbyOpen] = useState(false);
    const {username} = useContext(AccessContext);
    const {isLoading, isError, lobbies} = useLobbies(20);
    const {isLoading: loadingJoined, isError: errorJoined, data: joinedLobbies} = useQuery(['joinedLobbies', username],
        () => getJoinedLobbies(username));
    const {isLoading: loadingGames, isError: errorGettingGames, data: activeGames} = useQuery(['activeGames', username],
        () => getActiveGames(username));

    async function createLobby(data: CreateLobbyDataNoUsername) {
        if (username) {
            const createLobbyData: CreateLobbyData = {
                username: username,
                ...data
            }
            const lobbyId = await createLobbyCall(createLobbyData);
            navigate(`/lobby/${lobbyId}`)
        }
    }

    if (isLoading || loadingJoined || loadingGames) {
        return <Loading/>
    }
    if (isError || errorJoined) {
        return <Alert severity="error">Error loading lobbies</Alert>
    }
    if (errorGettingGames) {
        return <Alert severity="error">Error loading games</Alert>
    }

    return (
        <Container maxWidth="lg">
            {!username ? "" : <>
                <Typography component="h1" variant="h4" fontFamily="Courier" fontWeight="bolder" sx={{mt:"20px"}}>
                    Your games
                </Typography>
                {!activeGames ? <Loading/> : <Games games={activeGames}/>}
                <Typography component="h1" variant="h4" fontFamily="Courier" fontWeight="bolder" sx={{mt:"20px"}}>
                    Your lobbies
                </Typography>
                {!joinedLobbies ? <Loading/> : <Lobbies lobbies={joinedLobbies} action={"Go to lobby"}/>}
                <div style={{position: "fixed", right: "20px", bottom: "20px"}}>
                    <Tooltip title="Create lobby">
                        <Fab
                            size="large"
                            color="primary"
                            aria-label="createLobby"
                            onClick={() => setIsCreateLobbyOpen(true)}
                        >
                            <AddIcon/>
                        </Fab>
                    </Tooltip>
                </div>
            </>}
            <Typography component="h1" variant="h4" fontFamily="Courier" fontWeight="bolder" sx={{mt:"20px"}}>
                Open lobbies
            </Typography>
            <Lobbies lobbies={lobbies} action={"Join lobby"}/>
            <CreateLobby isOpen={isCreateLobbyOpen} onClose={() => setIsCreateLobbyOpen(false)} onSubmit={createLobby}/>
        </Container>
    );
}
