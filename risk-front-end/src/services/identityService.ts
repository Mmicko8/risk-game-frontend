import axios from "axios";

export async function logIn (username: string, password: string) {
    const response = await axios.post("/api/player/login", {userName: username, password});
    return response?.headers?.authorization;
}

export function register (username: string, email: string, password: string) {
    axios.post("/api/player/register", {userName: username, email: email, password: password})
}