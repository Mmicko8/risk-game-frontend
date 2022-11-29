import axios from "axios";


export async function createLobby () {
    await axios.post("/api/lobby/create", {playerEmail: "kdgUser1@student.kdg.be", maxPlayers: 5});
}