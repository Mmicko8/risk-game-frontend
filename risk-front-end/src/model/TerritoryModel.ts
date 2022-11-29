import {PlayerInGame} from "./PlayerInGame";

export interface TerritoryModel {
    territoryId: number;
    name: string;
    owner: PlayerInGame;
    troops: number;

}
