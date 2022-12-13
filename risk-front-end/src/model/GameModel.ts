import {PlayerInGame} from "./PlayerInGame";
import {Continent} from "./Continent";
import {Card} from "./Card";

export interface GameModel {
    gameId: number;
    continents: Continent[];
    playersInGame: PlayerInGame[];
    cards: Card[];
    turn: number;
    currentPlayerIndex: number;
    phase: string;
}