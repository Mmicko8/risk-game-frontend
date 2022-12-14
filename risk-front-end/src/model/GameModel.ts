import {PlayerInGame} from "./PlayerInGame";
import {Continent} from "./Continent";
import {GameCard} from "./GameCard";

export interface GameModel {
    gameId: number;
    continents: Continent[];
    playersInGame: PlayerInGame[];
    gameCards: GameCard[];
    turn: number;
    currentPlayerIndex: number;
    phase: string;
}