import axios from "axios";

export function register (username: string, email: string, password: string) {
    axios.post("/api/player/register", {username: username, email: email, password: password})
}

export function login (username: string, password: string) {
    return axios.post("/api/player/login", {username: username, password: password})
}

export async function forgotPassword() {
    const response = await axios.post('/api/password/forgot')
    return response.data
}