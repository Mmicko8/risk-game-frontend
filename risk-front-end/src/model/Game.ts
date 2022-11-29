import {PlayerInGame} from "./PlayerInGame";
import {Continent} from "./Continent";

export interface Game {
    gameId: number;
    continentList: Continent[];
    playersInGame: PlayerInGame[];
    turn: number;
    currentPlayer: number;
}