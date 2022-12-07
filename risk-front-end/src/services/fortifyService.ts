import {TerritoryModel} from "../model/TerritoryModel";
import {GameModel} from "../model/GameModel";
import {unionArrays} from "./utilsService";
import {getTerritoriesWithNeighbors, getTerritoryData} from "./territoryService";



export async function getAllFortifiableTerritories(startTerritory: TerritoryModel, game: GameModel) {
    const territories = await getTerritoriesWithNeighbors(game.gameId);
    startTerritory.neighbors = getTerritoryData(territories, startTerritory.name)!.neighbors;
    let connectedTerritories = getFortifiableTerritories(startTerritory, [startTerritory.name], territories);
    connectedTerritories = connectedTerritories.filter(value => value !== startTerritory.name);
    return connectedTerritories;
}

export function getFortifiableTerritories(startTerritory: TerritoryModel,
                                          connectedTerritoryNames: string[],
                                          allTerritories: TerritoryModel[])
    : string[] {
    let territory: TerritoryModel | null;
    const newConnectedTerritories: TerritoryModel[] = [];

    for (const n of startTerritory.neighbors) {
        territory = getTerritoryData(allTerritories, n.name);
        if (!territory) throw Error("startTerritory not in allTerritories list");

        if (territory.ownerId === startTerritory.ownerId && !connectedTerritoryNames.includes(territory.name))
            newConnectedTerritories.push(territory);
    }

    const newConnectedTerritoryNames = newConnectedTerritories.map(t => t.name);
    connectedTerritoryNames = connectedTerritoryNames.concat(newConnectedTerritoryNames)
    for (const newConnectedTerritory of newConnectedTerritories) {
        const result = getFortifiableTerritories(newConnectedTerritory, connectedTerritoryNames, allTerritories);
        connectedTerritoryNames = unionArrays(connectedTerritoryNames, result);
    }
    return connectedTerritoryNames;
}