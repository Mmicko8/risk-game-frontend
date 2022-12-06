import {PlayerInGame} from "./PlayerInGame";
import {Continent} from "./Continent";

export interface GameModel {
    gameId: number;
    continents: Continent[];
    playersInGame: PlayerInGame[];
    turn: number;
    currentPlayerIndex: number;
    phase: string;
}