import {TerritoryModel} from "../model/territory/TerritoryModel";
import {getTerritoryData} from "./territoryService";
import axios from "axios";
import {AttackResult} from "../model/AttackResult";


export function isTerritoryConquered(defender: TerritoryModel,
                                     attackResult: AttackResult) {
    console.log("is territory Conquered? ", defender, attackResult, defender.troops - attackResult.defenderDices.length <= 0 &&
        attackResult.amountOfSurvivingTroopsDefender === 0);
    return defender.troops - attackResult.defenderDices.length <= 0 &&
    attackResult.amountOfSurvivingTroopsDefender === 0;
}

export function attackerCanStillAttack(attacker: TerritoryModel, attackResult: AttackResult) {
    const maxCasualties = Math.min(attackResult.attackerDices.length, attackResult.defenderDices.length);
    console.log("Attacker can still attack? ", attacker, attackResult, attacker.troops - maxCasualties > 1 ||
        attackResult.amountOfSurvivingTroopsAttacker > 0);
    return attacker.troops - maxCasualties > 1 ||
        attackResult.amountOfSurvivingTroopsAttacker > 0;
}

export function getMaxTroopsForAttack(troopCount: number) {
    const MAX_ATTACK_TROOPS = 3;
    if (troopCount <= 1) throw Error("cannot attack with less than 2 troops");
    return Math.min(MAX_ATTACK_TROOPS, troopCount - 1);
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
