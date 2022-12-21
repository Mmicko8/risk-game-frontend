import {TerritoryModel} from "../model/territory/TerritoryModel";
import {getTerritoryData} from "./territoryService";
import axios from "axios";


export function getMaxTroopsForAttack(troopCount: number) {
    const MAX_ATTACK_TROOPS = 3;
    if (troopCount <= 1) throw Error("cannot attack with less than 2 troops");
    return Math.min(MAX_ATTACK_TROOPS, troopCount - 1);
}

export function hasTerritoryEnoughTroopsToAttack(territory: TerritoryModel) {
    const MIN_TROOPS_TO_ATTACK = 2;
    return territory.troops >= MIN_TROOPS_TO_ATTACK;
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

interface AttackModel {
    gameId: number;
    attackerTerritoryName: string;
    defenderTerritoryName: string;
    amountOfAttackers: number;
    amountOfDefenders: number;
}

export async function attack (attackData: AttackModel) {
    const response = await axios.put('/api/game/attack', attackData);
    return response.data;
}
