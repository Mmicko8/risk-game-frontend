import axios from "axios";

export function logIn (username: string, password: string) {
    axios.post("/api/player/login", {userName: username, password: password});
}

export function register (username: string, email: string, password: string) {
    axios.post("/api/player/register", {userName: username, email: email, password: password})
}