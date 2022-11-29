import axios from "axios";

export async function logIn (username: string, password: string) {
    const response = await axios.post("/api/player/login", {userName: username, password});
    return response?.headers?.authorization;
}