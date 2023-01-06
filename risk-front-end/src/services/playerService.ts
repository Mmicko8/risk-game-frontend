import axios from "axios";

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