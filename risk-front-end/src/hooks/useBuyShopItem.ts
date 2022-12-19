import {useMutation, useQueryClient} from "react-query";
import {ShopItem} from "../model/ShopItem";
import {buyShopItem} from "../services/shopItemService";

export default function useBuyShopItem() {
    const queryClient = useQueryClient();

    const {
        mutate,
        isLoading: isAddingItem,
        isError: isErrorAddingItem,
    } = useMutation(
        (itemId: number) => {
            return buyShopItem(itemId);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["shopItems"]);
            },
        }
    );

    return {
        buyShopItemMutation: mutate,
        isAddingItem,
        isErrorAddingItem,
    }
}