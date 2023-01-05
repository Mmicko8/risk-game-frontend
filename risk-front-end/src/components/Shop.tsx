import {useShopItems} from "../hooks/useShopItems";
import * as React from "react";
import {ShopItemModel} from "../model/ShopItemModel";
import {CircularProgress, Grid} from "@mui/material";
import {ShopItem} from "./ShopItem";
import Container from "@mui/material/Container";
import {Alert} from "./Alert";


export function Shop() {
    const {isLoading, isError, errorMessage, shopItems, loyaltyPoints, buyShopItemMutation} = useShopItems();
    function buyShopItem(itemId: number) {
        buyShopItemMutation(itemId);
    }

    if (isLoading) {
        return <CircularProgress sx={{position: "fixed", top: "50%", left: "50%"}}/>
    }
    return (
        <>
            { isError ? <Alert message={errorMessage}/> : ""}
            <Container>
                <h1>Shop</h1>
                {/*TODO make prettier*/}
                <p>Remaining loyalty points: {loyaltyPoints}</p>
                <Grid container>
                    {shopItems.map((item: ShopItemModel) => (
                        <Grid item key={item.shopItemId}>
                            <ShopItem item={item} buyItem={buyShopItem}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}
