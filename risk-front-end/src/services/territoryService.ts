import {territoriesDrawData} from "../data/territoryDrawData";
import {Game} from "../model/Game";

export function getTerritoriesDrawData() {
    return territoriesDrawData;
}

export function getTerritoryData(name: string) {
    return territoriesDrawData[name];
}

export function getAllTerritoriesFromGameState(game: Game) {
    let territories = game.continentList[0].territoryList;
    for (let i = 1; i < game.continentList.length; i++) {
        territories = territories.concat(game.continentList[i].territoryList);
    }
    return territories;
}