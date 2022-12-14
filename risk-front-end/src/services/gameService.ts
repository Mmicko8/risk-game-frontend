import axios from "axios";
import {GameModel} from "../model/GameModel";

export async function getGameState(gameId: number) {
    const response = await axios.get<GameModel>(`/api/game/${gameId}`);
    return response.data;
}

export async function getActiveGames(username: string | null) {
    if (!username) return null;
    const response = await axios.get(`/api/game/activeOfPlayer`);
    return response.data;
}

export const Phases = {
    REINFORCEMENT: "REINFORCEMENT",
    ATTACK: "ATTACK",
    FORTIFICATION: "FORTIFICATION"
};

export const GameActionType = {
    REINFORCEMENT: Phases.REINFORCEMENT,
    ATTACK: Phases.ATTACK,
    FORTIFICATION: Phases.FORTIFICATION,
    RESET_TERRITORY_STATE: "RESET TERRITORY STATE",
    CLOSE_TROOP_SELECTOR: "CLOSE TROOP SELECTOR",
    CLOSE_ERROR_TOAST: "OPEN ERROR TOAST",
    ANNEXATION_FORTIFICATION: "ANNEXATION FORTIFICATION"
}

export function getPhaseNumber(phase: string) {
    if (phase === Phases.REINFORCEMENT) return 0;
    if (phase === Phases.ATTACK) return 1;
    else return 2;
}

export function getPhaseFromNumber(phaseNr: number) {
    if (phaseNr === 0) return Phases.REINFORCEMENT;
    if (phaseNr === 1) return Phases.ATTACK;
    else return Phases.FORTIFICATION;
}