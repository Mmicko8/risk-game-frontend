import axios from "axios";

export async function getShopItems() {
    const shopItem = await axios.get(`/api/shopItem/forPlayer`);
    console.log(shopItem.data);
    return shopItem.data;
}
export async function buyShopItem(shopItemId: number) {
    return  await axios.post(`/api/shopItem/buyItem/${shopItemId}`);
}