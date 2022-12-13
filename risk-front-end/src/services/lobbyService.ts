import axios from "axios";

export async function getLobby (id: string) {
    const lobby = await axios.get(`/api/lobby/${id}`)
    return lobby.data
}

export async function createLobby (username: string, maxPlayers: number) {
    await axios.post("/api/lobby/create", {username: username, maxPlayers: maxPlayers});
}