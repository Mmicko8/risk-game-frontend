import {territoriesDrawData} from "../data/territoryDrawData";
import {GameModel} from "../model/GameModel";
import {TerritoryModel} from "../model/TerritoryModel";

export function getTerritoryDrawData(name: string) {
    return territoriesDrawData[name];
}

export function getAllTerritoriesFromGameState(game: GameModel) {
    let territories = game.continents[0].territories;
    for (let i = 1; i < game.continents.length; i++) {
        territories = territories.concat(game.continents[i].territories);
    }
    return territories;
}

export function getOwnerOfTerritory(game: GameModel, territoryName: string) {
    const territory = getTerritoryData(getAllTerritoriesFromGameState(game), territoryName);
    return territory?.ownerId;
}

export function getTerritoryData(territories: TerritoryModel[], territoryName: string) {
    for (let i = 0; i < territories.length; i++) {
        if (territories[i].name === territoryName) {
            return territories[i];
        }
    }
    return null;
}

export function getAllAttackableTerritoryNamesFromGameState(game: GameModel, territory: TerritoryModel) {
    let territories = getAllTerritoriesFromGameState(game);
    let friendlyTerritoryNames = territories.filter(value => {return value.ownerId === territory.ownerId;})
        .map((t) => {return t.name})
    let attackableNeighborNameList: string[] = [];
    territory.neighbors.forEach((n) => {
        if (!friendlyTerritoryNames.includes(n.name)) {
            attackableNeighborNameList.push(n.name)
        }
    })
    return attackableNeighborNameList;
}