import {Fab, Tooltip, CircularProgress, Alert, Container} from "@mui/material"
import AddIcon from "@mui/icons-material/Add";
import {useContext, useState} from "react";
import CreateLobby from "./dialogs/CreateLobby";
import AccessContext from "../context/AccessContext";
import {CreateLobbyData, CreateLobbyDataNoUsername} from "../model/CreateLobbyData";
import {createLobbyCall} from "../services/lobbyService";
import {useLobbies} from "../hooks/useLobbies";
import {OpenLobbies} from "./OpenLobbies";
import Typography from "@mui/material/Typography";
import * as React from "react";


export default function Home() {
    const [isCreateLobbyOpen, setIsCreateLobbyOpen] = useState(false);
    const {username} = useContext(AccessContext);
    //TODO: Request help with this magic => refresh gives all lobbies, then re-renders to correct lobbies that are not joined
    const {isLoading, isError, lobbies} = useLobbies(20, username);

    async function createLobby(data: CreateLobbyDataNoUsername) {
        if (username) {
            const createLobbyData: CreateLobbyData = {
                username: username,
                ...data
            }
            const lobbyId = await createLobbyCall(createLobbyData);
            console.log(lobbyId);
        }
    }

    if (isLoading) {
        return <CircularProgress sx={{position: "fixed", top: "50%", left: "50%"}}/>
    }
    if (isError) {
        return <Alert severity="error">Error loading lobbies</Alert>
    }

    return (
        <Container maxWidth="lg">
            {!username? "": <>
                    <h1>All joined or created lobbies</h1>
                    <div style={{position: "absolute", right: "20px", bottom: "20px"}}>
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
            <Typography component="h1" variant="h4" fontFamily="Courier" fontWeight="bolder">
                All open lobbies
            </Typography>
            <OpenLobbies lobbies={lobbies}/>
            <CreateLobby isOpen={isCreateLobbyOpen} onClose={() => setIsCreateLobbyOpen(false)} onSubmit={createLobby}/>
        </Container>
    );
}
