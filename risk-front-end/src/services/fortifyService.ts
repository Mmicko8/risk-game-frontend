import {TerritoryModel} from "../model/TerritoryModel";
import {GameModel} from "../model/GameModel";
import {unionArrays} from "./utilsService";
import {getTerritoriesWithNeighbors, getTerritoryData} from "./territoryService";



export async function getAllConnectedTerritories(startTerritory: TerritoryModel, game: GameModel) {
    const territories = await getTerritoriesWithNeighbors(game.gameId);
    let connectedTerritories = getConnectedTerritories(startTerritory, [startTerritory], territories);
    connectedTerritories = connectedTerritories.filter(value => value.territoryId === startTerritory.territoryId);
    return connectedTerritories;
}

export function getConnectedTerritories(startTerritory: TerritoryModel,
                                        connectedTerritories: TerritoryModel[],
                                        allTerritories: TerritoryModel[])
    : TerritoryModel[] {
    let territory: TerritoryModel | null;
    const newConnectedTerritories: TerritoryModel[] = [];

    for (const n of startTerritory.neighbors) {
        territory = getTerritoryData(allTerritories, n.name);
        if (!territory) throw Error("startTerritory not in allTerritories list");

        if (territory.ownerId === startTerritory.ownerId && !connectedTerritories.includes(territory))
            newConnectedTerritories.push(territory);
    }

    connectedTerritories = connectedTerritories.concat(newConnectedTerritories)
    for (const newConnectedTerritory of newConnectedTerritories) {
        const result = getConnectedTerritories(newConnectedTerritory, connectedTerritories, allTerritories);
        connectedTerritories = unionArrays(connectedTerritories, result);
    }
    return connectedTerritories;
}