import {PlayerInGame} from "./PlayerInGame";
import {Continent} from "./Continent";

export interface GameModel {
    gameId: number;
    continentList: Continent[];
    playersInGame: PlayerInGame[];
    turn: number;
    currentPlayer: number;
    phase: string;
}