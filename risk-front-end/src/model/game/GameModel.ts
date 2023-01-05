import {PlayerInGame} from "../player/PlayerInGame";
import {Continent} from "../territory/Continent";
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