import {Player} from "./Player";
import {Card} from "./Card";


export interface PlayerInGame {
    playerInGameId: number;
    color: string;
    player: Player
    remainingTroopsToReinforce: number;
    cards: Card[]
}