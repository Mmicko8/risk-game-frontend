import axios from "axios";
import {CreateLobbyData} from "../model/CreateLobbyData";

export async function getLobby (id: string) {
    const lobby = await axios.get(`/api/lobby/${id}`);
    return lobby.data;
}

export async function createLobbyCall (createLobbyData: CreateLobbyData) {
    const response = await axios.post("/api/lobby/create", {username: createLobbyData.username, maxPlayers: createLobbyData.amountOfPlayers});
    return response.data;
}

export async function getFirstNLobbies(n: number, username: string | null) {
    let lobbies;
    if (username !== null) {
        lobbies = await axios.get(`/api/lobby/openLobbies/${n}/${username}`);
    } else {
        lobbies = await axios.get(`/api/lobby/openLobbies/${n}`);
    }
    return lobbies.data;
}

export async function getJoinedLobbies(username: string | null) {
    if (!username) return null;
    const response = await axios.get(`/api/lobby/joinedNotStartedLobbies/${username}`);
    return response.data;
}