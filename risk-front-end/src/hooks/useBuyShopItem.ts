import {useMutation, useQueryClient} from "react-query";
import {buyShopItem} from "../services/shopItemService";
import {AxiosError, AxiosResponse} from "axios";

export default function useBuyShopItem() {
    const queryClient = useQueryClient();

    const {
        mutate,
        isError,
        error
    } = useMutation<AxiosResponse, AxiosError, number>(
        (itemId: number) => {
            return buyShopItem(itemId);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["shopItems"]);
            }
        }
    );

    return {
        buyShopItemMutation: mutate,
        isBuyError: isError,
        buyError: error
    }
}