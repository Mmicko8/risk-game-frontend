import {territoriesDrawData} from "../data/territoryDrawData";

export function getTerritoriesDrawData() {
    return territoriesDrawData;
}

export function getTerritoryData(name: string) {
    return territoriesDrawData[name];
}