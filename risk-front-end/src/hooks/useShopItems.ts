import {useQuery} from "react-query";
import {getShopItems} from "../services/shopItemService";

export function useShopItems() {
    const {
        isLoading,
        isError,
        data: shopItems,
    } = useQuery(['shopItems'], () => getShopItems());

    return {
        isLoading,
        isError,
        shopItems
    }
}