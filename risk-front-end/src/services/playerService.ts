import axios from "axios";
import {GameModel} from "../model/game/GameModel";
import {PlayerInGame} from "../model/player/PlayerInGame";
import {getAllTerritoriesFromGameState} from "./territoryService";

export async function getProfile() {
    const shopItem = await axios.get(`/api/player/profile`);
    return shopItem.data;
}

export async function getLoyaltyPoints() {
    const profileInfo = await getProfile()
    return profileInfo.loyaltyPoints;
}

export async function getLeaderboard() {
    const lobby = await axios.get(`/api/player/leaderboard`);
    return lobby.data;
}

export async function equipShopItem(playerId: number, shopItemId: number) {
    return await axios.put('/api/player/equip', {playerId, shopItemId});
}

export function getPlayerInGameStats(game: GameModel, playerInGame: PlayerInGame) {
    const territories = getAllTerritoriesFromGameState(game)
    let amountOfTerritories = 0, amountOfTroops = 0;
    for (const territory of territories) {
        if (territory.ownerId === playerInGame.playerInGameId) {
            amountOfTroops += territory.troops;
            amountOfTerritories++;
        }
    }
    return {
        amountOfTroops,
        amountOfTerritories,
        amountOfCards: playerInGame.playerCards.length
    }
}