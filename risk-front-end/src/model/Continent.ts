import {Territory} from "./Territory";

export interface Continent {
    continentId: number;
    territoryList: Territory[];
    bonusTroops: number;
    name: string;
}