import axios from "axios";
import {GameModel} from "../model/GameModel";

export async function getGameState(gameId: number) {
    const response = await axios.get<GameModel>(`/api/game/${gameId}`);
    return response.data;
}

export enum Phase {
    REINFORCEMENT= "REINFORCEMENT",
    ATTACK = "ATTACK",
    FORTIFICATION = "FORTIFICATION"
}

export function getPhaseNumber(phase: string) {
    if (phase === Phase.REINFORCEMENT) return 0;
    if (phase === Phase.ATTACK) return 1;
    else return 2;
}