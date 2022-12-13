import {Fab, Tooltip, CircularProgress, Alert} from "@mui/material"
import AddIcon from "@mui/icons-material/Add";
import {useContext, useState} from "react";
import CreateLobby from "./dialogs/CreateLobby";
import AccessContext from "../context/AccessContext";
import {CreateLobbyData, CreateLobbyDataNoUsername} from "../model/CreateLobbyData";
import {useLobby} from "../hooks/useLobby";


export default function Home() {
    const {createLobbyMutate, isCreatingLobby, isErrorCreatingLobby} = useLobby("")
    const [isCreateLobbyOpen, setIsCreateLobbyOpen] = useState(false);
    const {username} = useContext(AccessContext);

    function createLobby(data: CreateLobbyDataNoUsername) {
        if (username) {
            const createLobbyData: CreateLobbyData = {
                username: username,
                ...data
            }
            createLobbyMutate({...createLobbyData})
        }
    }

    if (isCreatingLobby) {
        return <CircularProgress sx={{position: "fixed", top: "50%", left: "50%"}}/>
    }
    if (isErrorCreatingLobby) {
        return <Alert severity="error">Error creating the lobby</Alert>
    }

    return (
        <>
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
            <h1>All open lobbies</h1>
            <CreateLobby isOpen={isCreateLobbyOpen} onClose={() => setIsCreateLobbyOpen(false)} onSubmit={createLobby}/>
        </>
    );
}
