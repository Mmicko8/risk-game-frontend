import axios from "axios";

export function logIn (username: string, password: string) {
    const playerDetails = axios.post("/api/player/login", {username, password});
    console.log(playerDetails)
}