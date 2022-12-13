import axios from "axios";


export async function createLobby (username: string, maxPlayers: number) {
    await axios.post("/api/lobby/create", {username: username, maxPlayers: maxPlayers});
}