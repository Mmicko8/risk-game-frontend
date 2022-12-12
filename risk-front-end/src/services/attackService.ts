import {GameModel} from "../model/GameModel";
import {TerritoryModel} from "../model/TerritoryModel";
import {getTerritoriesWithNeighbors, getTerritoryData} from "./territoryService";


export function getMaxTroopsForAttack(troopCount: number) {
    const MAX_ATTACK_TROOPS = 3;
    if (troopCount <= 1) throw Error("cannot attack with less than 2 troops");
    return Math.min(MAX_ATTACK_TROOPS, troopCount - 1);
}

export async function getAllAttackableTerritoryNamesFromGameState(game: GameModel, territory: TerritoryModel) {
    let territories = await getTerritoriesWithNeighbors(game.gameId);
    let friendlyTerritoryNames = territories
        .filter(value => {return value.ownerId === territory.ownerId;})
        .map((t) => {return t.name})
    let attackableNeighborNameList: string[] = [];

    territory.neighbors = getTerritoryData(territories, territory.name)!.neighbors;
    territory.neighbors.forEach((n) => {
        if (!friendlyTerritoryNames.includes(n.name)) {
            attackableNeighborNameList.push(n.name)
        }
    })
    return attackableNeighborNameList;
}

export function getAttackableTerritoryNames(territoriesWithNeighbors: TerritoryModel[], startTerritory: TerritoryModel) {
    let friendlyTerritoryNames = territoriesWithNeighbors
        .filter(t => {return t.ownerId === startTerritory.ownerId;})
        .map((t) => {return t.name});

    let attackableNeighborNameList: string[] = [];
    const startTerritoryWithNeighbors = getTerritoryData(territoriesWithNeighbors, startTerritory.name)
    if (!startTerritoryWithNeighbors) throw Error("startTerritory cannot be found in given territories list");

    startTerritoryWithNeighbors.neighbors.forEach((n) => {
        if (!friendlyTerritoryNames.includes(n.name)) {
            attackableNeighborNameList.push(n.name)
        }
    })
    return attackableNeighborNameList;
}