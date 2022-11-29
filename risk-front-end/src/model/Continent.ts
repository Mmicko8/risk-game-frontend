import {TerritoryModel} from "./TerritoryModel";

export interface Continent {
    continentId: number;
    territoryList: TerritoryModel[];
    bonusTroops: number;
    name: string;
}