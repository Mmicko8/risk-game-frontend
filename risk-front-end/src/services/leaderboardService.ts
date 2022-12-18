import axios from "axios";

export async function getLeaderboard() {
    const lobby = await axios.get(`/api/player/leaderboard`);
    return lobby.data;
}