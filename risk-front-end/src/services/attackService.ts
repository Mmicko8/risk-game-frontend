import {GameModel} from "../model/GameModel";
import {TerritoryModel} from "../model/TerritoryModel";
import {getTerritoriesWithNeighbors, getTerritoryData} from "./territoryService";


export function getMaxTroopsFromTroopCount(troopCount: number) {
    if (troopCount === 2) return 1;
    if (troopCount === 3) return 2;
    return 3;
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