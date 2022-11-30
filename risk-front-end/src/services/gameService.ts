import axios from "axios";
import {Game} from "../model/Game";

export async function getGameState(gameId: number) {
    const response = await axios.get<Game>(`/api/game/${gameId}`);
    return response.data;
}

export const Phases = {
    REINFORCEMENT: "REINFORCEMENT",
    ATTACK: "ATTACK",
    FORTIFY: "FORTIFY"
};