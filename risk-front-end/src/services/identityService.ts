import axios from "axios";

export function register (username: string, email: string, password: string) {
    axios.post("/api/player/register", {username: username, email: email, password: password})
}