import {Fab, Tooltip} from "@mui/material"
import AddIcon from "@mui/icons-material/Add";
import {useContext, useState} from "react";
import CreateLobby from "./dialogs/CreateLobby";
import AccessContext from "../context/AccessContext";


export default function Home() {
    const [isCreateLobbyOpen, setIsCreateLobbyOpen] = useState(false);
    const {username} = useContext(AccessContext);

    return (
        <>
            {!username? "": <>
                    <h1>All joined or created lobbies</h1>
                    <div style={{position: "absolute", right: "20px", bottom: "20px"}}>
                        <Tooltip title="Create lobby">
                            <Fab
                                size="large"
                                color="secondary"
                                aria-label="createLobby"
                                onClick={() => setIsCreateLobbyOpen(true)}
                            >
                                <AddIcon/>
                            </Fab>
                        </Tooltip>
                    </div>
                </>}
            <h1>All open lobbies</h1>
            <CreateLobby isOpen={isCreateLobbyOpen} onClose={() => setIsCreateLobbyOpen(false)}/>
        </>
    );
}
