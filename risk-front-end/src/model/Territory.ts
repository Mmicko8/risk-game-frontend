import {PlayerInGame} from "./PlayerInGame";

export interface Territory {
    territoryId: number;
    name: string;
    owner: PlayerInGame;
    troops: number;

}
