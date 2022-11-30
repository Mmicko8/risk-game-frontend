import axios from "axios";
import {GameModel} from "../model/GameModel";

export async function getGameState(gameId: number) {
    const response = await axios.get<GameModel>(`/api/game/${gameId}`);
    return response.data;
}

export const Phases = {
    REINFORCEMENT: "REINFORCEMENT",
    ATTACK: "ATTACK",
    FORTIFY: "FORTIFY"
};