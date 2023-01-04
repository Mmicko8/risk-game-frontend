import {useQuery} from "react-query";
import {getShopItems} from "../services/shopItemService";
import {getLoyaltyPoints} from "../services/playerService";

export function useShopItems() {
    const {
        isLoading: isLoadingItems,
        isError: isErrorItems,
        data: shopItems,
    } = useQuery(['shopItems'], () => getShopItems());

    const {
        isLoading: isLoadingLoyalty,
        isError: isErrorLoyalty,
        data: loyaltyPoints,
    } = useQuery(['loyaltyPoints'], () => getLoyaltyPoints());

    const isError = isErrorItems || isErrorLoyalty;
    const isLoading = isLoadingItems || isLoadingLoyalty;
    let errorMessage = "";
    if (isErrorItems) errorMessage = "Error loading the shop items";
    else if (isErrorLoyalty) errorMessage = "Error loading the loyalty points"

    return {
        isLoading,
        isError,
        errorMessage,
        shopItems,
        loyaltyPoints
    }
}