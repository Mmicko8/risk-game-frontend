import {territories} from "../data/TerritoryData";


export function getTerritoryData(name: string) {
    return territories[name];
}